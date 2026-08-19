#!/usr/bin/env node
/**
 * Logo Extractor v2 (produccion-anuncios)
 *
 * Extracts the brand logo from a website. Casts a WIDE net (lazy-load attrs,
 * srcset, inline data: SVGs, header/nav imgs, og:image), SCORES each candidate
 * by "logo-likeness", rejects decorative junk (country/language flags, favicons,
 * spinners, payment icons), and saves the RANKED candidates so the skill's
 * Paso 9 vision gate can confirm the real one with its own eyes.
 *
 * Why v2 (lessons from the CIE run, 2026-07-14):
 *   - The old version read only `src=`. On lazy-loaded sites `src` is a grey
 *     placeholder (data:image/svg+xml) and the REAL logo is in `data-src`.
 *   - It then fell through to the first http <img> that downloaded — which was
 *     `german.png` (a language-selector flag) — and reported "success": true.
 *   - It couldn't decode inline base64 SVG logos (data: URIs).
 *   NEVER trust the filename. Always look. This script now surfaces ranked
 *   candidates; the human/LLM picks the real one (mejor sin logo que uno falso).
 *
 * Usage:
 *   node extract-logo.js --url "<homepage-url>" --out-file "<abs>/logo.png"
 *
 * Output:
 *   <out-file>                          the top-ranked candidate (best guess)
 *   <out-dir>/logo-candidates/cand-NN.png   all viable candidates, ranked
 *   stdout JSON { success, file, candidates:[{file,score,source,url}] }
 *
 * Exit: 0 = at least one candidate saved (VISION-GATE it) · 1 = none found.
 */

const fs = require('fs');
const path = require('path');
const { URL } = require('url');
// sharp trae binarios POR PLATAFORMA y el paquete solo incluye `sharp-win32-x64`: en Mac o
// Linux este require reventaba el script entero al arrancar. `extract-brand-identity.js` ya
// degradaba así; acá faltaba, y era un crash de plataforma completa en el paquete público.
let sharp;
try { sharp = require('sharp'); } catch (_) { sharp = null; }
const { fetchUrl, decodeHtmlEntities } = require('./utils');

function parseArgs() {
  const args = process.argv.slice(2);
  const params = { url: null, outFile: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url') params.url = args[++i];
    else if (args[i] === '--out-file') params.outFile = args[++i];
  }
  if (!params.url) { console.error('ERROR: --url is required'); process.exit(1); }
  if (!params.outFile) { console.error('ERROR: --out-file is required'); process.exit(1); }
  return params;
}

// ── Junk / decorative tokens that are NOT the brand logo ─────────────────────
// Country/language flags (the CIE "german.png" case), favicons, UI chrome, etc.
const LANG_FLAG = /\b(afrikaans|albanian|amharic|arabic|armenian|azerbaijani|basque|belarusian|bengali|bosnian|brasilian|brazilian|bulgarian|catalan|chinese|croatia|croatian|czech|danish|dutch|england|english|estonian|filipino|finnish|finnland|french|galician|georgian|german|greece|greek|gujarati|hebrew|hindi|hungarian|icelandic|indonesian|iran|irish|italian|japanese|kannada|kazakh|korean|latvian|lithuanian|macedonian|malay|maltese|marathi|mongolian|nepali|norwegian|persian|polish|portuguese|punjabi|romanian|russian|serbian|slovak|slovenian|spanish|swahili|swedish|tamil|telugu|thai|turkish|ukrainian|urdu|uzbek|vietnamese|welsh)\b/i;
// Country-name flag filenames (e.g. CIE's italia.png / poland.png / portugal.png language switcher)
const COUNTRY_FLAG = /\b(argentina|australia|austria|belgium|bolivia|brasil|brazil|canada|chile|china|colombia|croatia|denmark|deutschland|ecuador|espana|finland|finnland|france|francia|germany|greece|holland|india|indonesia|iran|ireland|israel|italia|italy|japan|korea|mexico|nederland|netherlands|norway|peru|poland|polska|portugal|romania|russia|serbia|spain|sweden|switzerland|thailand|turkey|ukraine|uruguay|usa|venezuela|vietnam)\b/i;
const JUNK = /pixel|1x1|spacer|placeholder|sprite|favicon|spinner|loader|preloader|emoji|avatar|badge|rating|\bstar\b|arrow|chevron|payment|visa|mastercard|amex|paypal|stripe|afterpay|klarna|cart|search|menu|hamburger|close|social|whatsapp|facebook|instagram|tiktok|linkedin|youtube|twitter|thumbnail|thumb\b/i;
const POS = /logo|wordmark|isotipo|imagotipo|brand[-_ ]?mark|site[-_ ]?logo|header[-_ ]?logo|sin[-_ ]?fondo|marca/i;

function attr(tag, name) {
  const m = tag.match(new RegExp(name + '\\s*=\\s*["\']([^"\']+)["\']', 'i'));
  return m ? decodeHtmlEntities(m[1]) : null;
}

// Return every candidate src on an <img>, widest lazy-load net first.
function imgSources(tag) {
  const out = [];
  for (const a of ['data-src', 'data-lazy-src', 'data-lazysrc', 'data-original', 'data-lazy', 'data-image', 'src']) {
    const v = attr(tag, a);
    if (v) out.push(v);
  }
  for (const a of ['data-srcset', 'srcset']) {
    const v = attr(tag, a);
    if (!v) continue;
    // take the LAST (usually largest) url in the srcset list
    const urls = v.split(',').map(s => s.trim().split(/\s+/)[0]).filter(Boolean);
    if (urls.length) out.push(urls[urls.length - 1]);
  }
  return out;
}

// A lazy-load placeholder SVG is a solid <rect> with no real art. Skip those.
function isPlaceholderSvg(svg) {
  const s = svg.toLowerCase();
  if (!s.includes('<svg')) return false;
  const hasArt = /<(path|text|circle|ellipse|polygon|polyline|image|use|g[\s>])/.test(s);
  const rectFill = /<rect[^>]*(100%|fill)/.test(s);
  return rectFill && !hasArt;               // solid rectangle, nothing else
}

function decodeDataUri(uri) {
  const m = uri.match(/^data:([^;,]*)(;base64)?,([\s\S]*)$/i);
  if (!m) return null;
  const mime = (m[1] || '').toLowerCase();
  const buf = m[2] ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3]), 'utf-8');
  return { mime, buf };
}

function scoreCandidate(c) {
  const hay = ((c.url || '') + ' ' + (c.context || '')).toLowerCase();
  let s = 0;
  if (POS.test(hay)) s += 60;
  if (c.inHeader) s += 25;
  if (c.tier === 1) s += 10;
  if (/\.svg(\?|#|$)/.test((c.url || '').toLowerCase())) s += 8;
  if (/\.(png|webp)(\?|#|$)/.test((c.url || '').toLowerCase())) s += 4;
  if (c.source === 'og-image') s -= 10;      // usually a social share card, not the logo
  if (LANG_FLAG.test(hay) || COUNTRY_FLAG.test(hay)) s -= 90;   // country/language flag → almost never the logo
  if (JUNK.test(hay)) s -= 45;
  if (/\bicon\b|icon[-_]/.test(hay)) s -= 18;
  return s;
}

function collectCandidates(html, baseUrl) {
  const cands = [];
  const push = (url, o) => { if (url) cands.push(Object.assign({ url }, o)); };
  const abs = (raw) => { try { return new URL(raw, baseUrl).toString(); } catch (_) { return null; } };

  // Which <img> tags sit inside <header>/<nav>?
  const headerRegions = [];
  const hnRe = /<(?:header|nav)[^>]*>([\s\S]*?)<\/(?:header|nav)>/gi;
  let hm; while ((hm = hnRe.exec(html)) !== null) headerRegions.push(hm[1]);
  const inHeader = (tag) => headerRegions.some(r => r.includes(tag));

  // All <img> tags
  const imgs = html.match(/<img[^>]+>/gi) || [];
  for (const tag of imgs) {
    const context = [attr(tag, 'alt'), attr(tag, 'class'), attr(tag, 'id')].filter(Boolean).join(' ');
    const header = inHeader(tag);
    const hinted = POS.test(tag.toLowerCase());
    for (const raw of imgSources(tag)) {
      const url = raw.startsWith('data:') ? raw : abs(raw);   // keep data: URI (decoded at download)
      push(url, { source: header ? 'header-img' : (hinted ? 'img-logo' : 'img'), inHeader: header, context, tier: (hinted || header) ? 1 : 3 });
    }
  }

  // Inline <svg> inside a logo-classed wrapper
  const svgRe = /<(?:a|div|span|button)[^>]*(?:class|id)=["'][^"']*logo[^"']*["'][^>]*>\s*(<svg[\s\S]*?<\/svg>)/gi;
  let sm; while ((sm = svgRe.exec(html)) !== null) {
    cands.push({ url: 'data:image/svg+xml;utf8,' + encodeURIComponent(sm[1]), source: 'inline-svg', inHeader: true, context: 'logo', tier: 1 });
  }

  // <link rel="apple-touch-icon"> and og:image (low priority fallbacks)
  for (const tag of (html.match(/<link[^>]+rel=["']apple-touch-icon[^"']*["'][^>]*>/gi) || [])) {
    const href = attr(tag, 'href'); if (href) push(abs(href), { source: 'apple-touch-icon', tier: 4 });
  }
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
  if (og) { const c = attr(og[0], 'content'); if (c) push(abs(c), { source: 'og-image', tier: 5 }); }

  // Dedup by url, score, sort desc
  const seen = new Set();
  const uniq = cands.filter(c => (seen.has(c.url) ? false : (seen.add(c.url), true)));
  uniq.forEach(c => { c.score = scoreCandidate(c); });
  uniq.sort((a, b) => b.score - a.score || (a.tier || 9) - (b.tier || 9));
  return uniq;
}

async function materialize(c) {
  if (c.url.startsWith('data:')) {
    const d = decodeDataUri(c.url);
    if (!d) return null;
    if (/svg/.test(d.mime) && isPlaceholderSvg(d.buf.toString('utf-8'))) return null; // lazy placeholder
    return d.buf;
  }
  return await fetchUrl(c.url);
}

async function toPng(buffer, url) {
  const peek = buffer.toString('utf-8', 0, Math.min(200, buffer.length)).toLowerCase();
  if (peek.includes('<html') || peek.includes('<!doctype')) return null;      // got an HTML error page
  const isSvg = peek.includes('<svg') || /\.svg(\?|#|$)/.test((url || '').toLowerCase());
  if (!sharp) {
    // Sin sharp no se puede normalizar ni medir. Se guarda el original tal como vino y se
    // deja que el GATE DE VISIÓN del Paso 8 decida con los ojos, que es quien decide igual.
    if (isSvg) return null;                                                   // un SVG sin rasterizar no sirve como ref i2i
    return { data: buffer, info: { width: null, height: null, _noSharp: true } };
  }
  const pipe = isSvg
    ? sharp(buffer, { density: 300 }).resize(600, 600, { fit: 'inside', withoutEnlargement: false, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    : sharp(buffer).resize(600, 600, { fit: 'inside', withoutEnlargement: true });
  const res = await pipe.png().toBuffer({ resolveWithObject: true });
  const { width, height } = res.info;
  if (Math.max(width, height) < 48) return null;                              // too small to be a usable logo
  return res;
}

async function main() {
  const params = parseArgs();
  const outDir = path.dirname(params.outFile);
  const candDir = path.join(outDir, 'logo-candidates');
  fs.mkdirSync(candDir, { recursive: true });

  const log = (m) => process.stderr.write(m + '\n');
  log('\n  Logo Extractor v2');
  log('  ─────────────────');
  log(`  URL:      ${params.url}`);
  log(`  Out file: ${params.outFile}\n`);

  let html;
  try { html = (await fetchUrl(params.url)).toString('utf-8'); }
  catch (err) { console.error(`ERROR: ${err.message}`); process.exit(1); }

  const ranked = collectCandidates(html, params.url);
  log(`  ${ranked.length} candidate(s) found; downloading the best (higher score = more logo-like)…\n`);

  const saved = [];
  for (const c of ranked) {
    if (saved.length >= 6) break;
    try {
      const buf = await materialize(c);
      if (!buf) continue;
      const png = await toPng(buf, c.url);
      if (!png) continue;
      const idx = String(saved.length + 1).padStart(2, '0');
      const file = path.join(candDir, `cand-${idx}.png`);
      fs.writeFileSync(file, png.data);
      const rec = { file, score: c.score, source: c.source, dims: `${png.info.width}x${png.info.height}`, url: c.url.startsWith('data:') ? '(inline data URI)' : c.url };
      saved.push(rec);
      log(`  [score ${String(c.score).padStart(3)}] cand-${idx}.png  ${png.info.width}x${png.info.height}  ${c.source}  ${rec.url.slice(0, 70)}`);
    } catch (err) { log(`  skip (${c.source}): ${err.message.slice(0, 60)}`); }
  }

  if (!saved.length) {
    console.error('WARNING: no usable logo candidate found — ask the user to upload the logo manually.');
    console.log(JSON.stringify({ success: false, candidates: [] }));
    process.exit(1);
  }

  // Best guess → out-file. But it MUST be vision-gated (Paso 9) before use.
  fs.copyFileSync(saved[0].file, params.outFile);
  log(`\n  Best guess → ${path.basename(params.outFile)} (score ${saved[0].score}, ${saved[0].source}).`);
  log(`  ⚠ VISION-GATE (Paso 9): open ${path.relative(outDir, candDir)}/ and CONFIRM which cand-NN.png is the`);
  log(`    real brand logo with your own eyes. NEVER trust the filename/score alone (a country flag can`);
  log(`    outrank the logo). Copy the correct one over logo.png; if none is the real logo, delete logo.png`);
  log(`    (better no logo than a wrong one in all 30 ads).\n`);

  console.log(JSON.stringify({ success: true, file: params.outFile, needsVisionGate: true, candidates: saved }));
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
