#!/usr/bin/env node
/**
 * Product Image Extractor (adapted from DEEPLOOK Research Agent)
 *
 * Downloads product images from a product page URL into a target directory.
 * Adapted for the `/produccion-anuncios` skill — takes an explicit output
 * directory instead of a "client" name.
 *
 * Usage:
 *   node extract-product-images.js --url "<product-page-url>" --out-dir "<output-folder>" [--limit 3]
 *
 * Output:
 *   <out-dir>/product-01.<ext>, product-02.<ext>, …  (unique, highest-res, size-ranked)
 *   Names are NEUTRAL on purpose — file size can't tell a front from a close-up.
 *   Deduplicates exact copies AND the same image in another format/size (keeps the
 *   sharpest). The vision gate (Paso 9) classifies + renames each by what it ACTUALLY is.
 *   JSON summary printed to stdout for the skill orchestrator to consume.
 *
 * Sources scanned (priority order):
 *   T1: og:image, twitter:image, JSON-LD, Shopify CDN, WooCommerce
 *   T2: srcset (highest resolution per <img>)
 *   T3: <img src> fallback
 */

const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { fetchUrl, decodeHtmlEntities, CONFIG } = require('./utils');

// ─── Parse Arguments ─────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const params = { url: null, outDir: null, limit: 3 };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--url':     params.url = args[++i]; break;
      case '--out-dir': params.outDir = args[++i]; break;
      case '--limit':   params.limit = parseInt(args[++i], 10); break;
    }
  }

  if (!params.url) { console.error('ERROR: --url is required'); process.exit(1); }
  if (!params.outDir) { console.error('ERROR: --out-dir is required'); process.exit(1); }

  return params;
}

// ─── Upgrade CDN URL to high resolution ──────────────────────
function upgradeToHighRes(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    const pathname = u.pathname.toLowerCase();

    if (host.includes('shopify.com') || pathname.includes('/cdn/shop/')) {
      // Shopify supports two sizing schemes:
      //   1. Path-based: foo_1200x630.jpg, foo_grande.jpg, foo_master.jpg
      //   2. Query param: ?width=2048
      // Path-based wins over query param, so we MUST strip path sizing first.
      if (u.pathname.match(/_\d+x\d+\.(jpg|jpeg|png|webp)$/i) ||
          u.pathname.match(/_(grande|large|medium|small|thumb)\.(jpg|jpeg|png|webp)$/i)) {
        u.pathname = u.pathname.replace(/_(\d+x\d+|grande|large|medium|small|thumb)\.(jpg|jpeg|png|webp)$/i, '_master.$2');
      }
      u.searchParams.set('width', '2048');
      return u.toString();
    }
    if (host.includes('cloudinary.com') || host.includes('res.cloudinary.com')) {
      return url.replace(/\/w_\d+/g, '/w_2048').replace(/\/h_\d+/g, '/h_2048');
    }
    if (host.includes('imgix.net')) {
      if (u.searchParams.has('w')) u.searchParams.set('w', '2048');
      if (u.searchParams.has('h')) u.searchParams.delete('h');
      return u.toString();
    }
    if (pathname.match(/-\d+x\d+\.(jpg|jpeg|png|webp)$/)) {
      return url.replace(/-\d+x\d+\.(jpg|jpeg|png|webp)/i, '.$1');
    }

    const widthParams = ['width', 'w'];
    for (const param of widthParams) {
      if (u.searchParams.has(param)) {
        const val = u.searchParams.get(param);
        if (/^\d+$/.test(val) && parseInt(val, 10) < 1500) {
          u.searchParams.set(param, '2048');
        }
        if (/^\d+x\d+$/.test(val)) {
          u.searchParams.set(param, '2048x2048');
        }
        return u.toString();
      }
    }

    return url;
  } catch (_) {
    return url;
  }
}

// ─── Extract image URLs from HTML ────────────────────────────
function extractImageUrls(html, baseUrl) {
  const tier1 = new Set();
  const tier2 = new Set();
  const tier3 = new Set();
  const skipPattern = /icon|logo|pixel|\.svg|data:image|1x1|spacer|placeholder|badge|rating|star|arrow|chevron|banner|promo|sale|flash|hero-banner|cta-bg|press-/i;

  // OpenGraph
  const ogMatches = html.match(/<meta[^>]+(?:property=["']og:image["'][^>]+content=["']([^"']+)["']|content=["']([^"']+)["'][^>]+property=["']og:image["'])/gi);
  if (ogMatches) for (const m of ogMatches) {
    const c = m.match(/content=["']([^"']+)["']/i);
    if (c && !skipPattern.test(c[1])) tier1.add(c[1]);
  }

  // Twitter card
  const twMatches = html.match(/<meta[^>]+(?:name=["']twitter:image["'][^>]+content=["']([^"']+)["']|content=["']([^"']+)["'][^>]+name=["']twitter:image["'])/gi);
  if (twMatches) for (const m of twMatches) {
    const c = m.match(/content=["']([^"']+)["']/i);
    if (c && !skipPattern.test(c[1])) tier1.add(c[1]);
  }

  // JSON-LD
  const jsonLdMatches = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (jsonLdMatches) for (const block of jsonLdMatches) {
    const j = block.match(/>([\s\S]*?)<\/script>/i);
    if (j) try {
      const data = JSON.parse(j[1]);
      if (data.image) {
        const imgs = Array.isArray(data.image) ? data.image : [data.image];
        for (const img of imgs) {
          const src = typeof img === 'string' ? img : img.url;
          if (src && !skipPattern.test(src)) tier1.add(src);
        }
      }
    } catch (_) {}
  }

  // Shopify CDN
  const shopifyCdnPattern = /(?:https?:)?\/\/[^"'\s]+\/cdn\/shop\/(?:files|products)\/[^"'\s?]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\s]*)?/gi;
  const shopifyCdnMatches = html.match(shopifyCdnPattern);
  if (shopifyCdnMatches) for (let url of shopifyCdnMatches) {
    if (url.startsWith('//')) url = 'https:' + url;
    if (!skipPattern.test(url)) {
      try {
        const u = new URL(url);
        u.searchParams.set('width', '2048');
        tier1.add(u.toString());
      } catch (_) { tier1.add(url); }
    }
  }

  // Shopify product JSON
  const shopifyJsonPattern = /"featured_image"\s*:\s*"([^"]+)"|"src"\s*:\s*"(https?:\/\/[^"]*cdn[^"]*\.(?:jpg|jpeg|png|webp)[^"]*)"/gi;
  let sjm;
  while ((sjm = shopifyJsonPattern.exec(html)) !== null) {
    const url = sjm[1] || sjm[2];
    if (url && !skipPattern.test(url)) {
      const clean = url.replace(/\\\//g, '/');
      tier1.add(clean.startsWith('//') ? 'https:' + clean : clean);
    }
  }

  // WooCommerce
  const wooPattern = /(?:https?:)?\/\/[^"'\s]+\/wp-content\/uploads\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi;
  const wooMatches = html.match(wooPattern);
  if (wooMatches) for (let url of wooMatches) {
    if (url.startsWith('//')) url = 'https:' + url;
    const fullRes = url.replace(/-\d+x\d+\.(jpg|jpeg|png|webp)/i, '.$1');
    if (!skipPattern.test(fullRes)) tier1.add(fullRes);
  }

  const wooLargeImage = html.match(/data-large_image=["']([^"']+)["']/gi);
  if (wooLargeImage) for (const m of wooLargeImage) {
    const um = m.match(/data-large_image=["']([^"']+)["']/i);
    if (um && !skipPattern.test(um[1])) tier1.add(um[1]);
  }

  const wooDataSrc = html.match(/data-src=["'](https?:\/\/[^"']+\/wp-content\/uploads\/[^"']+)["']/gi);
  if (wooDataSrc) for (const m of wooDataSrc) {
    const um = m.match(/data-src=["']([^"']+)["']/i);
    if (um && !skipPattern.test(um[1])) {
      tier1.add(um[1].replace(/-\d+x\d+\.(jpg|jpeg|png|webp)/i, '.$1'));
    }
  }

  // srcset
  const srcsetMatches = html.match(/srcset=["']([^"']+)["']/gi);
  if (srcsetMatches) for (const m of srcsetMatches) {
    const sm = m.match(/srcset=["']([^"']+)["']/i);
    if (sm) {
      const entries = sm[1].split(',').map(e => e.trim());
      let best = null, bestW = 0;
      for (const entry of entries) {
        const parts = entry.split(/\s+/);
        const w = parseInt(parts[1], 10) || 0;
        if (w >= bestW) { bestW = w; best = parts[0]; }
      }
      if (best && !skipPattern.test(best)) tier2.add(best);
    }
  }

  // <img src>
  const imgMatches = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*/gi);
  if (imgMatches) for (const m of imgMatches) {
    const sm = m.match(/src=["']([^"']+)["']/i);
    if (sm && !skipPattern.test(sm[1])) tier3.add(sm[1]);
  }

  function resolveAndFilter(urlSet) {
    const resolved = [];
    for (let rawUrl of urlSet) {
      rawUrl = decodeHtmlEntities(rawUrl);
      try {
        const abs = new URL(rawUrl, baseUrl).toString();
        const lower = abs.toLowerCase();
        if ((lower.includes('.jpg') || lower.includes('.jpeg') || lower.includes('.png') ||
             lower.includes('.webp') || lower.includes('image') || lower.includes('cdn')) &&
            !lower.includes('.svg') && !lower.includes('icon') && !lower.includes('logo')) {
          resolved.push(upgradeToHighRes(abs));
        }
      } catch (_) {}
    }
    return resolved;
  }

  const seen = new Set();
  function dedupeKey(url) {
    try {
      const u = new URL(url);
      u.searchParams.delete('width');
      u.searchParams.delete('w');
      u.searchParams.delete('v');
      // Normalize protocol so http:// and https:// collapse to the same key
      return u.hostname + u.pathname;
    } catch (_) { return url; }
  }

  // Extract product slug from baseUrl (e.g. "/products/dean-oxford" → "dean-oxford")
  // Used to score images: those whose path includes the slug rank higher (defends against
  // cross-sell / "you may also like" image bleeding into product page scrapes).
  // Un solo extractor de handle en el archivo (`shopifyHandleFromUrl`) — antes había dos
  // regex distintos, con normalizaciones distintas, para el mismo dato.
  const _handle = shopifyHandleFromUrl(baseUrl);
  const productSlug = _handle ? _handle.replace(/[-_]/g, '') : null;

  function matchesSlug(url) {
    if (!productSlug) return false;
    const cleanUrl = url.toLowerCase().replace(/[-_]/g, '');
    return cleanUrl.includes(productSlug);
  }

  const result = [];
  const slugMatched = [];
  for (const tier of [resolveAndFilter(tier1), resolveAndFilter(tier2), resolveAndFilter(tier3)]) {
    for (const url of tier) {
      const key = dedupeKey(url);
      if (!seen.has(key)) {
        seen.add(key);
        if (matchesSlug(url)) slugMatched.push(url);
        else result.push(url);
      }
    }
  }

  // Slug-matched images come FIRST (most likely to be the actual product)
  return [...slugMatched, ...result];
}

// ─── Download image ──────────────────────────────────────────
async function downloadImage(url, destPath) {
  const buffer = await fetchUrl(url);
  if (buffer.length < 1000) {
    const peek = buffer.toString('utf-8', 0, Math.min(200, buffer.length)).toLowerCase();
    if (peek.includes('<html') || peek.includes('<!doctype')) {
      throw new Error('Response is an HTML page, not an image');
    }
  }
  fs.writeFileSync(destPath, buffer);
  return buffer.length;
}

function getExtension(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    if (pathname.endsWith('.png') || pathname.match(/\.png[?#]/)) return '.png';
    if (pathname.endsWith('.webp') || pathname.match(/\.webp[?#]/)) return '.webp';
    if (pathname.endsWith('.jpeg') || pathname.match(/\.jpeg[?#]/)) return '.jpeg';
    return '.jpg';
  } catch (_) { return '.jpg'; }
}

// ─── Catálogo de Shopify: la fuente CORRECTA cuando existe ───────────────────
// El scrape de HTML tiene dos defectos estructurales que causaron la Ley 19:
//   (a) rankea por PESO de archivo, así que un macro de textura le gana a la vista
//       completa de la prenda, y
//   (b) su defensa anti-cross-sell busca el slug del producto DENTRO del nombre del
//       archivo, algo que no ocurre en tiendas cuyo CDN sirve `DSC9089.jpg`.
// Resultado: un pool mezclado de varios productos donde alguno queda representado solo
// por un recorte, y el modelo le inventa la silueta.
//
// `/products.json` de Shopify no tiene ninguno de esos problemas: devuelve los productos
// con su título, precio y su lista de imágenes YA AGRUPADA y EN EL ORDEN DE LA TIENDA
// (la primera es la principal, casi siempre la vista completa). Verificado en
// julianasanchez.co: 250 productos con sus imágenes correctamente separadas.
// Si la tienda no es Shopify o el endpoint no responde, se cae al scrape de HTML.
const CATALOG_NAME = '_catalog.json';

function shopifyHandleFromUrl(u) {
  try {
    const m = new URL(u).pathname.match(/\/products?\/([^/?#]+)/i);
    return m ? decodeURIComponent(m[1]).toLowerCase() : null;
  } catch (_) { return null; }
}

async function fetchJson(url) {
  try {
    return JSON.parse(await fetchUrl(url, { encoding: 'utf-8' }));
  } catch (_) { return null; }   // no es Shopify, endpoint cerrado, o JSON inválido
}

// Un solo producto: 19 KB en vez de los 1,49 MB del catálogo completo.
async function fetchShopifyProduct(origin, handle) {
  const data = await fetchJson(`${origin}/products/${encodeURIComponent(handle)}.json`);
  return (data && data.product) || null;
}

async function fetchShopifyCatalog(origin) {
  const data = await fetchJson(`${origin}/products.json?limit=250`);
  return (data && Array.isArray(data.products) && data.products.length) ? data.products : null;
}

function shopifyProductImages(product) {
  // Orden de la tienda, tal cual: la primera imagen es la principal.
  // `upgradeToHighRes` en vez de pegar `width=2048` a mano: en Shopify el dimensionado por
  // PATH (`_1024x1024.jpg`) le gana al parámetro de query, así que concatenarlo dejaba
  // bajando imágenes chicas sin que nada avisara.
  return (product.images || [])
    .map(im => (typeof im === 'string' ? im : im && im.src))
    .filter(Boolean)
    .map(upgradeToHighRes);
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  const params = parseArgs();

  if (!fs.existsSync(params.outDir)) fs.mkdirSync(params.outDir, { recursive: true });

  process.stderr.write(`\n  Product Image Extractor\n`);
  process.stderr.write(`  ──────────────────────\n`);
  process.stderr.write(`  URL:     ${params.url}\n`);
  process.stderr.write(`  Out dir: ${params.outDir}\n`);
  process.stderr.write(`  Limit:   ${params.limit}\n\n`);

  // ── Camino preferente: Shopify ───────────────────────────────────────────────
  // El scrape de HTML rankea por PESO de archivo (un macro de textura le gana a la vista
  // completa) y su defensa anti-cross-sell busca el slug DENTRO del nombre del archivo,
  // algo que no pasa en tiendas cuyo CDN sirve `DSC9089.jpg`. Resultado: pool mezclado de
  // varios productos, con alguno representado solo por un recorte → el modelo le inventa
  // la silueta. Shopify expone la agrupación real y el orden de la tienda. Ver Ley 19.
  let origin = null;
  try { origin = new URL(params.url).origin; } catch (_) {}
  const handle = shopifyHandleFromUrl(params.url);

  let imageUrls = null;
  let fromShopify = false;

  if (origin && handle) {
    const product = await fetchShopifyProduct(origin, handle);
    if (product) {
      imageUrls = shopifyProductImages(product);
      fromShopify = true;
      process.stderr.write(`  ✓ Shopify: "${product.title}" — ${imageUrls.length} imagen(es) SUYAS, en orden de tienda\n`);
      process.stderr.write(`    (agrupación autoritativa: sin mezcla de productos, sin ranking por peso)\n`);
    }
  }

  // Sin handle (home o colección) pero la tienda ES Shopify: NO scrapeamos el pool mezclado
  // teniendo la fuente correcta en la mano. Se escribe el catálogo y se corta. Antes esto
  // solo imprimía un warning y scrapeaba igual, así que el problema se detectaba en el
  // Paso 12 — después de autorar 30 conceptos sobre fotos equivocadas.
  if (!imageUrls && origin && !handle) {
    const catalog = await fetchShopifyCatalog(origin);
    if (catalog) {
      const index = catalog.map(p => ({
        title: p.title,
        handle: p.handle,
        price: (p.variants && p.variants[0] && p.variants[0].price) || null,
        imageCount: (p.images || []).length,
      }));
      fs.writeFileSync(path.join(params.outDir, CATALOG_NAME), JSON.stringify(index, null, 2));
      process.stderr.write(`\n  Shopify detectado: ${catalog.length} producto(s). Catálogo escrito en ${CATALOG_NAME}\n`);
      process.stderr.write(`  ✗ NO se bajaron imágenes a propósito: esta URL es una home/colección, y\n`);
      process.stderr.write(`    scrapearla MEZCLA productos (Ley 19). Abrí ${CATALOG_NAME}, elegí los productos\n`);
      process.stderr.write(`    hero por nombre y precio, y volvé a correr esto UNA VEZ POR PRODUCTO:\n`);
      process.stderr.write(`      --url "${origin}/products/<handle>" --out-dir "<...>/input/product-photos/<slug>"\n\n`);
      console.log(JSON.stringify({
        images: [], count: 0, success: false,
        sourceMode: 'shopify-catalog-only',
        catalogFile: CATALOG_NAME,
        productCount: catalog.length,
        nextStep: 'Elegí los productos en _catalog.json y corré una vez por cada /products/<handle>.',
      }, null, 2));
      process.exit(2);
    }
  }

  if (!imageUrls) {
    let html;
    try {
      const buf = await fetchUrl(params.url);
      html = buf.toString('utf-8');
    } catch (err) {
      console.error(`ERROR: Could not fetch ${params.url}: ${err.message}`);
      process.exit(1);
    }
    imageUrls = extractImageUrls(html, params.url);
  }
  process.stderr.write(`  Found ${imageUrls.length} candidate image(s) [${fromShopify ? 'shopify-product-json' : 'html-scrape'}]\n`);

  if (imageUrls.length === 0) {
    console.error('WARNING: No product images found. Manual upload required.');
    console.log(JSON.stringify({ images: [], count: 0, success: false }));
    process.exit(1);
  }

  // Download with TEMP names first so we can classify by size and rename.
  // Downloads are independent (different CDN URLs) — run concurrently; order
  // doesn't matter since tempSaved gets re-sorted by size right after anyway.
  // Bajamos MÁS de lo que se va a quedar: los extras van a `_candidates/` y son lo que
  // permite al gate de visión (Paso 9) encontrar la vista completa que falta, o descubrir
  // que el pool mezcla productos. Descargar es gratis; no tenerlas costó 5 celdas pagadas
  // (Ley 19). En Shopify pedimos más todavía, porque ahí todas pertenecen al mismo producto
  // y cada ángulo extra es directamente útil.
  const toDownload = imageUrls.slice(0, params.limit + (fromShopify ? 6 : 4));
  const downloaded = await Promise.allSettled(toDownload.map(async (url, i) => {
    const ext = getExtension(url);
    const filePath = path.join(params.outDir, `_temp-${i + 1}${ext}`);
    process.stderr.write(`  Downloading [${i + 1}/${toDownload.length}]: ${url.slice(0, 80)}...\n`);
    const size = await downloadImage(url, filePath);
    process.stderr.write(`    → Saved temp (${Math.round(size / 1024)}KB)\n`);
    return { tempPath: filePath, ext, source: url, sizeKB: Math.round(size / 1024) };
  }));
  const tempSaved = [];
  downloaded.forEach((r, i) => {
    if (r.status === 'fulfilled') tempSaved.push(r.value);
    else process.stderr.write(`    → Failed [${i + 1}]: ${r.reason.message}\n`);
  });

  if (tempSaved.length === 0) {
    console.error('ERROR: All downloads failed.');
    console.log(JSON.stringify({ images: [], count: 0, success: false }));
    process.exit(1);
  }

  // ── Deduplicate BEFORE naming ──────────────────────────────────────────────
  // Two kinds of duplicates poison the reference set:
  //   (a) exact byte copies (same image downloaded from two URLs)
  //   (b) the SAME image in another format/size (e.g. a 700px .png thumbnail of a
  //       1080px .webp). Different bytes, same picture.
  // We drop both, ALWAYS keeping the highest-resolution copy. Feeding the image
  // model the sharpest source = better renders; duplicates just waste a ref slot.
  const crypto = require('crypto');
  const sizeToken = /[_-](\d+x\d+|\d{3,4}|master|grande|large|medium|small|thumb|xl|lg|md|sm)$/i;
  function urlStem(u) {
    try {
      let p = new URL(u).pathname.toLowerCase().split('/').pop() || u;
      p = p.replace(/\.(jpe?g|png|webp)$/i, '');
      while (sizeToken.test(p)) p = p.replace(sizeToken, ''); // strip trailing size/format tokens
      return p;
    } catch (_) { return u; }
  }
  for (const t of tempSaved) {
    try { t.hash = crypto.createHash('sha1').update(fs.readFileSync(t.tempPath)).digest('hex'); }
    catch (_) { t.hash = t.tempPath; }
    t.stem = urlStem(t.source);
  }
  // Orden de supervivencia de los duplicados.
  // En modo HTML no hay ninguna señal de importancia, así que se ordena por tamaño para
  // quedarse con la mejor resolución de cada duplicado.
  // En modo Shopify NO se reordena: el orden de la tienda ES la señal — la primera imagen
  // del producto es la principal, que es casi siempre la vista completa de la prenda.
  // Ordenar por peso acá era justamente lo que hundía las vistas completas debajo de los
  // macros de textura (que pesan más porque comprimen mal). Ver Ley 19.
  if (fromShopify) {
    process.stderr.write(`  Orden de tienda preservado (la 1ª imagen es la principal)\n`);
  } else {
    tempSaved.sort((a, b) => b.sizeKB - a.sizeKB);
  }
  const seenHash = new Set(), seenStem = new Set();
  const unique = [], dropped = [];
  for (const t of tempSaved) {
    if (seenHash.has(t.hash) || seenStem.has(t.stem)) { dropped.push(t); continue; }
    seenHash.add(t.hash); seenStem.add(t.stem); unique.push(t);
  }
  for (const t of dropped) { try { fs.unlinkSync(t.tempPath); } catch (_) {} }
  if (dropped.length) process.stderr.write(`  Deduplicated: dropped ${dropped.length}, kept ${unique.length} unique image(s)\n`);

  // ── Name NEUTRALLY (product-01, product-02…) ────────────────────────────────
  // The old code named these shot/front/closeup by file SIZE — a lie: file size
  // says nothing about what the photo shows. WHAT each image is (front, back-print,
  // fabric close-up, flat-lay…) can only be known by LOOKING. That classification +
  // rename now happens in the VISION gate (Paso 9), where the correct photo is bound
  // to the correct cell. Here we only guarantee: unique, highest-res, honestly named.
  const saved = [];
  for (let i = 0; i < Math.min(params.limit, unique.length); i++) {
    const t = unique[i];
    const newName = `product-${String(i + 1).padStart(2, '0')}${t.ext}`;
    const newPath = path.join(params.outDir, newName);
    fs.renameSync(t.tempPath, newPath);
    saved.push({ file: newName, fullPath: newPath, source: t.source, sizeKB: t.sizeKB });
    process.stderr.write(`    → ${newName} (${t.sizeKB}KB)\n`);
  }

  // ── Images beyond the limit go to _candidates/, they are NOT deleted ─────────
  // They used to be unlinked here. That silently destroyed the only evidence that the
  // pool spanned SEVERAL products — and that one of those products had nothing but a
  // macro crop. Caso real (Juliana Sanchez, 2026-07-30): 7 images were downloaded from
  // a page holding 4 different products; `--limit 3` kept the 3 biggest and deleted the
  // rest. The kept trio left the olive overshirt represented ONLY by a texture crop, so
  // GPT Image 2 invented its silhouette (rendered a ribbed-collar sweatshirt) in 5 paid
  // cells. Nobody could catch it, because the discarded full-body shots were already gone.
  //
  // Same pattern `extract-logo.js` already uses with `logo-candidates/`: keep the pool,
  // let the Paso 9 vision gate decide with its eyes. Costs nothing — they are downloaded
  // either way.
  const candidates = [];
  if (unique.length > params.limit) {
    const candDir = path.join(params.outDir, '_candidates');
    fs.mkdirSync(candDir, { recursive: true });
    for (let i = params.limit; i < unique.length; i++) {
      const t = unique[i];
      const candName = `cand-${String(i + 1).padStart(2, '0')}${t.ext}`;
      const candPath = path.join(candDir, candName);
      try {
        fs.renameSync(t.tempPath, candPath);
        candidates.push({ file: `_candidates/${candName}`, source: t.source, sizeKB: t.sizeKB });
      } catch (_) {
        try { fs.unlinkSync(t.tempPath); } catch (_) {}
      }
    }
    if (candidates.length) {
      process.stderr.write(`  Kept ${candidates.length} extra candidate(s) in _candidates/ — LOOK at them in Paso 9\n`);
    }
  }

  const summary = {
    images: saved,
    count: saved.length,
    candidates,
    candidateCount: candidates.length,
    sourceMode: fromShopify ? 'shopify-product-json' : 'html-scrape',
    success: saved.length >= 2,
    note: fromShopify
      ? 'Images come from Shopify /products.json for THIS product only — grouping is authoritative (no product mixing) and order is the store\'s own, so product-01 is the primary image (usually the full view). Still CLASSIFY by content and rename in the vision gate (Paso 9): order tells you which is primary, not what each photo shows.'
      : 'Filenames are provisional (product-NN by size — size says NOTHING about what the photo shows). CLASSIFY by content and rename in the vision gate (Paso 9) — never trust these names to mean front/back/closeup.',
    coverageWarning: fromShopify
      ? (candidates.length
          ? `${candidates.length} more image(s) of this same product are parked in _candidates/ — open them if you need another angle (e.g. a full view for a flat-lay or unboxing cell).`
          : null)
      : `HTML scrape: the kept images are ranked by FILE SIZE, and a macro crop of textured fabric usually outranks the full-garment shots. The pool may also span SEVERAL products. Open _candidates/ with Read before authoring: any product left with only a crop CANNOT be shown whole in a cell (its silhouette would be invented). Record "vista_completa" per product in ref-manifest.json under "_coverage". If the store is Shopify, prefer re-running this against each /products/<handle> URL — see _catalog.json.`,
  };
  console.log(JSON.stringify(summary, null, 2));

  process.stderr.write(`\n  Done! ${saved.length} image(s) in ${params.outDir}\n\n`);
}

main();
