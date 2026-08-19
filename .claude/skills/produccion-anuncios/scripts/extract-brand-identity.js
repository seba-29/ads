#!/usr/bin/env node
/**
 * Brand Identity Detector  (ported from DEEPLOOK Research Agent, adapted for produccion-anuncios)
 * Extracts brand colors + fonts from website CSS/HTML and validates against product images.
 *
 * Usage:
 *   node scripts/extract-brand-identity.js --url "https://example.com" --out-dir "<brand-dir>" [--product-dir "<photos-dir>"]
 *
 * Options:
 *   --url          Brand homepage URL (required)
 *   --out-dir      Brand folder where detected-colors.json + screenshots/ are written (required)
 *   --product-dir  Optional flat folder of product photos for Source B validation
 *
 * Output:
 *   <out-dir>/detected-colors.json — up to 8 ranked colors (hex + name + confidence + sources + score) + fonts
 *   <out-dir>/screenshots/*.png    — visual verification (only if Puppeteer available)
 *   <out-dir>/color-evidence/*     — brand's own images, for a vision model to confirm the hexes
 *
 * Sources (in order of trust):
 *   A) Website CSS/HTML — Shopify theme JSON, CSS variables, meta theme-color, inline styles
 *   B) Product images — dominant colors via sharp pixel analysis (validation only)
 *   C) Rendered page — Puppeteer headless browser reads computed styles like ColorZilla
 *   D) Brand's own images (og:image, hero, logo) downloaded so an LLM can SEE whether each
 *      hex from A is actually visible. A/C only prove a color is DECLARED, never that it is
 *      used: julianasanchez.co declares magenta #fb5184 + coral #e0002a at HIGH confidence
 *      and both sit on that brand's explicit NEVER list. Needs no browser and no deps.
 *
 * Notes:
 *   - Puppeteer + sharp are OPTIONAL. If missing, the script still produces colors from CSS/HTML
 *     (Source A) and exits 0 — it never hard-fails the pipeline.
 *   - CSS colors = HIGH confidence, Rendered = HIGH confidence, Images = MEDIUM
 */

const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { fetchUrl, decodeHtmlEntities } = require('./utils');
const crypto = require('crypto');

let sharp;
try { sharp = require('sharp'); } catch (_) { sharp = null; }

let puppeteer;
try { puppeteer = require('puppeteer'); } catch (_) {
  try { puppeteer = require('puppeteer-core'); } catch (_) { puppeteer = null; }
}

// ─── Parse Arguments ─────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const params = { url: null, outDir: null, productDir: null };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--url':         params.url = args[++i]; break;
      case '--out-dir':     params.outDir = args[++i]; break;
      case '--product-dir': params.productDir = args[++i]; break;
    }
  }

  if (!params.url) { console.error('ERROR: --url is required'); process.exit(1); }
  if (!params.outDir) { console.error('ERROR: --out-dir is required'); process.exit(1); }

  return params;
}

// fetchUrl imported from ./utils (use { encoding: 'utf-8' } for string responses)

// ─── Color Utilities ─────────────────────────────────────────

// Common CSS named colors (subset)
const CSS_NAMED_COLORS = {
  red: '#ff0000', blue: '#0000ff', green: '#008000', navy: '#000080',
  pink: '#ffc0cb', coral: '#ff7f50', yellow: '#ffff00', purple: '#800080',
  teal: '#008080', orange: '#ffa500', cyan: '#00ffff', magenta: '#ff00ff',
  lime: '#00ff00', maroon: '#800000', olive: '#808000', gold: '#ffd700',
  salmon: '#fa8072', tomato: '#ff6347', indigo: '#4b0082', violet: '#ee82ee',
  beige: '#f5f5dc', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa',
  turquoise: '#40e0d0', chocolate: '#d2691e', crimson: '#dc143c',
};

/**
 * Normalize any CSS color to 6-digit lowercase hex, or null if invalid/filtered
 */
function normalizeHex(raw) {
  if (!raw) return null;
  let s = raw.trim().toLowerCase();

  // Skip non-colors
  if (['transparent', 'inherit', 'currentcolor', 'initial', 'unset', 'none'].includes(s)) return null;

  // Named CSS color
  if (CSS_NAMED_COLORS[s]) s = CSS_NAMED_COLORS[s];

  // Hex: #rgb, #rrggbb, #rrggbbaa
  if (s.startsWith('#')) {
    s = s.replace('#', '');
    if (s.length === 3) s = s[0]+s[0]+s[1]+s[1]+s[2]+s[2];
    if (s.length === 8) s = s.slice(0, 6); // drop alpha
    if (s.length === 6 && /^[0-9a-f]{6}$/.test(s)) return '#' + s;
    return null;
  }

  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = Math.min(255, parseInt(rgbMatch[1]));
    const g = Math.min(255, parseInt(rgbMatch[2]));
    const b = Math.min(255, parseInt(rgbMatch[3]));
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  // hsl(h, s%, l%) or hsla(h, s%, l%, a)
  const hslMatch = s.match(/hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/);
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]) / 360;
    const sat = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;
    const { r, g, b } = hslToRgb(h, sat, l);
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  return null;
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = Math.round(l * 255);
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
    g = Math.round(hue2rgb(p, q, h) * 255);
    b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
  }
  return { r, g, b };
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/**
 * sRGB → CIELAB (through XYZ D65)
 */
function rgbToLab(r, g, b) {
  // Linearize sRGB
  let lr = r / 255, lg = g / 255, lb = b / 255;
  lr = lr > 0.04045 ? Math.pow((lr + 0.055) / 1.055, 2.4) : lr / 12.92;
  lg = lg > 0.04045 ? Math.pow((lg + 0.055) / 1.055, 2.4) : lg / 12.92;
  lb = lb > 0.04045 ? Math.pow((lb + 0.055) / 1.055, 2.4) : lb / 12.92;

  // sRGB → XYZ (D65)
  let x = (lr * 0.4124564 + lg * 0.3575761 + lb * 0.1804375) / 0.95047;
  let y = (lr * 0.2126729 + lg * 0.7151522 + lb * 0.0721750) / 1.00000;
  let z = (lr * 0.0193339 + lg * 0.1191920 + lb * 0.9503041) / 1.08883;

  // XYZ → Lab
  const f = t => t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + 16/116;
  x = f(x); y = f(y); z = f(z);

  return { L: (116 * y) - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

function hexToLab(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToLab(r, g, b);
}

/**
 * CIE76 color difference — simple Euclidean in Lab space
 */
function deltaE(lab1, lab2) {
  return Math.sqrt(
    Math.pow(lab1.L - lab2.L, 2) +
    Math.pow(lab1.a - lab2.a, 2) +
    Math.pow(lab1.b - lab2.b, 2)
  );
}

/**
 * Filter out near-black, near-white, and grays
 */
function isFilteredColor(hex) {
  const lab = hexToLab(hex);
  const chroma = Math.sqrt(lab.a * lab.a + lab.b * lab.b);

  if (lab.L < 12) return true;  // near-black
  if (lab.L > 95) return true;  // near-white
  if (chroma < 5 && lab.L > 12 && lab.L < 95) return true; // gray

  return false;
}

/**
 * Name a color based on HSL hue, saturation, lightness
 */
function nameColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }

  const hDeg = h * 360;
  const prefix = l < 0.3 ? 'Dark ' : l > 0.75 ? 'Light ' : '';

  if (s < 0.12) return prefix + 'Gray';

  if (hDeg < 15 || hDeg >= 345) {
    if (l > 0.6) return 'Pink';
    if (l > 0.4) return prefix + 'Coral';
    return prefix + 'Red';
  }
  if (hDeg < 35) return prefix + 'Orange';
  if (hDeg < 55) return prefix + 'Gold';
  if (hDeg < 70) return prefix + 'Yellow';
  if (hDeg < 160) {
    if (l > 0.6) return 'Mint';
    return prefix + 'Green';
  }
  if (hDeg < 200) {
    if (l > 0.6) return 'Cyan';
    return prefix + 'Teal';
  }
  if (hDeg < 260) {
    if (l < 0.35) return 'Navy';
    if (l > 0.6) return 'Light Blue';
    return prefix + 'Blue';
  }
  if (hDeg < 300) return prefix + 'Purple';
  return prefix + 'Magenta';
}

// ─── Shared Helpers ──────────────────────────────────────────

/** Extract color values from a CSS text string (background-color, color, etc.) */
const CSS_COLOR_DECL_PATTERN = /(?:background-color|background|(?<![\w-])color|border-color|fill|stroke)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/gi;

function extractColorsFromCss(text, source, addColor) {
  const matches = text.match(CSS_COLOR_DECL_PATTERN);
  if (!matches) return;
  for (const decl of matches) {
    const valMatch = decl.match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/i);
    if (valMatch) addColor(valMatch[1], source, 1);
  }
}

/** Deduplicate colors by deltaE threshold, keeping higher-count entries first */
function deduplicateColors(colors, threshold = 5) {
  const deduped = [];
  for (const color of colors) {
    const lab = color.lab || hexToLab(color.hex);
    const isDupe = deduped.some(existing => deltaE(existing.lab || hexToLab(existing.hex), lab) < threshold);
    if (!isDupe) {
      color.lab = lab;
      deduped.push(color);
    }
  }
  return deduped;
}

// ─── Fetch External Stylesheets ──────────────────────────────

async function fetchExternalCss(html, baseUrl) {
  // Find <link rel="stylesheet"> URLs
  const linkPattern = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi;
  const linkPattern2 = /<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]+rel=["']stylesheet["']/gi;

  const urls = new Set();
  let m;
  while ((m = linkPattern.exec(html)) !== null) urls.add(m[1]);
  while ((m = linkPattern2.exec(html)) !== null) urls.add(m[1]);

  // Fetch up to 5 stylesheets in parallel
  const toFetch = [...urls].slice(0, 5).map(href => {
    const absUrl = new URL(href, baseUrl).toString();
    process.stderr.write(`    Fetching stylesheet: ${absUrl.slice(0, 80)}...\n`);
    return fetchUrl(absUrl, { encoding: 'utf-8' }).catch(err => {
      process.stderr.write(`    Skipped stylesheet: ${err.message}\n`);
      return '';
    });
  });
  const results = await Promise.all(toFetch);
  return results.filter(Boolean).join('\n');
}

// ─── Source A: CSS/HTML Color Extraction ─────────────────────

function extractCssColors(html, externalCss) {
  // Combine inline HTML + external CSS for full coverage
  const fullSource = html + '\n' + (externalCss || '');
  const colorMap = new Map(); // hex → { sources: Set, count: number }

  function addColor(raw, source, boost = 1) {
    const hex = normalizeHex(raw);
    if (!hex || isFilteredColor(hex)) return;
    if (!colorMap.has(hex)) {
      colorMap.set(hex, { sources: new Set(), count: 0 });
    }
    const entry = colorMap.get(hex);
    entry.sources.add(source);
    entry.count += boost;
  }

  // (a) Shopify theme settings JSON
  const shopifySettingsPatterns = [
    /"(color_[^"]*?)"\s*:\s*"(#[0-9a-fA-F]{3,8})"/gi,
    /"(accent[^"]*?)"\s*:\s*"(#[0-9a-fA-F]{3,8})"/gi,
    /"(gradient[^"]*?)"\s*:\s*"([^"]*#[0-9a-fA-F]{3,8}[^"]*)"/gi,
    /"(background|foreground|text|button|primary|secondary|solid_button_label|outline_button|shadow)"\s*:\s*"(#[0-9a-fA-F]{3,8})"/gi,
  ];

  for (const pattern of shopifySettingsPatterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const value = match[2];
      const hexValues = value.match(/#[0-9a-fA-F]{3,8}/g);
      if (hexValues) {
        for (const hv of hexValues) {
          addColor(hv, 'shopify-theme', 3);
        }
      }
    }
  }

  // (b) CSS custom properties (--variable-name: #color) — search HTML + external CSS
  const cssVarPattern = /--([\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/gi;
  let varMatch;
  while ((varMatch = cssVarPattern.exec(fullSource)) !== null) {
    const varName = varMatch[1].toLowerCase();
    const isSemantic = /color|bg|primary|secondary|accent|brand|button|cta|link|heading|text|foreground|background/.test(varName);
    addColor(varMatch[2], 'css-variable', isSemantic ? 3 : 1);
  }

  // (c) meta theme-color
  const themeColorMatch = html.match(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']theme-color["']/i);
  if (themeColorMatch) {
    addColor(themeColorMatch[1], 'meta-theme-color', 4);
  }

  // (d) Inline style color values
  const inlineStylePattern = /style=["']([^"']+)["']/gi;
  let inlineMatch;
  while ((inlineMatch = inlineStylePattern.exec(html)) !== null) {
    extractColorsFromCss(inlineMatch[1], 'inline-style', addColor);
  }

  // (e) Style block declarations
  const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  if (styleBlocks) {
    for (const block of styleBlocks) {
      extractColorsFromCss(block.replace(/<\/?style[^>]*>/gi, ''), 'style-block', addColor);
    }
  }

  // (f) Button/CTA element inline colors
  const buttonPattern = /<(?:button|a)[^>]*class=["'][^"']*(?:btn|cta|button|add-to-cart|checkout)[^"']*["'][^>]*style=["']([^"']+)["']/gi;
  let btnMatch;
  while ((btnMatch = buttonPattern.exec(html)) !== null) {
    extractColorsFromCss(btnMatch[1], 'button-cta', addColor);
  }

  // (g) External CSS color declarations
  if (externalCss) {
    extractColorsFromCss(externalCss, 'external-css', addColor);
  }

  // Convert Map to array and deduplicate close colors
  const colors = [];
  for (const [hex, data] of colorMap) {
    colors.push({ hex, sources: [...data.sources], count: data.count });
  }

  colors.sort((a, b) => b.count - a.count);
  return deduplicateColors(colors, 5);
}

// ─── Font Extraction ─────────────────────────────────────────

function extractFonts(html, externalCss) {
  const fullFontSource = html + '\n' + (externalCss || '');
  const fonts = { heading: null, body: null, all: [] };
  const seen = new Set();

  function addFont(family, source, usage) {
    family = family.replace(/['"]+/g, '').replace(/\+/g, ' ').trim();
    if (!family || family.length < 3) return;
    if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw)?$/.test(family)) return;
    if (/^(inherit|sans-serif|serif|monospace|system-ui|cursive|fantasy|var\(|normal|bold|italic|uppercase|lowercase|none|auto|initial|unset)/.test(family)) return;
    if (/^(Arial|Helvetica|Times New Roman|Georgia|Verdana|Tahoma|Trebuchet MS|Courier)$/i.test(family)) return;
    if (/px$|rem$|em$|%$|vh$|vw$/.test(family)) return;

    const key = family.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);

    const entry = { family, source };
    fonts.all.push(entry);

    if (usage === 'heading' && !fonts.heading) fonts.heading = entry;
    if (usage === 'body' && !fonts.body) fonts.body = entry;
  }

  // (1) Google Fonts <link> tags
  const gfPattern = /fonts\.googleapis\.com\/css2?\?family=([^"'&]+)/gi;
  let gfMatch;
  while ((gfMatch = gfPattern.exec(html)) !== null) {
    const families = decodeURIComponent(gfMatch[1]).split('&family=');
    for (const fam of families) {
      const name = fam.split(':')[0].replace(/\+/g, ' ');
      addFont(name, 'google-fonts', 'unknown');
    }
  }

  // (2) Shopify theme font JSON
  const shopifyFontPatterns = [
    /"type_header_font"\s*:\s*"([^"]+)"/i,
    /"type_body_font"\s*:\s*"([^"]+)"/i,
    /"heading_font"\s*:\s*"([^"]+)"/i,
    /"body_font"\s*:\s*"([^"]+)"/i,
  ];
  for (const pattern of shopifyFontPatterns) {
    const match = html.match(pattern);
    if (match) {
      const fontName = match[1].split('_')[0].replace(/\+/g, ' ').trim();
      const isHeading = /header|heading/i.test(pattern.source);
      addFont(fontName, 'shopify-theme', isHeading ? 'heading' : 'body');
    }
  }

  // (3) CSS font-family declarations in style blocks + external CSS
  const inlineStyles = (html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [])
    .map(b => b.replace(/<\/?style[^>]*>/gi, '')).join('\n');
  const styleContent = inlineStyles + '\n' + (externalCss || '');

  const headingFontMatch = styleContent.match(/(?:h[1-3]|\.heading|\.title)[^{]*\{[^}]*font-family\s*:\s*["']?([^"';,}]+)/i);
  if (headingFontMatch) addFont(headingFontMatch[1], 'css-rule', 'heading');

  const bodyFontMatch = styleContent.match(/(?:body|\.body|p|\.text)[^{]*\{[^}]*font-family\s*:\s*["']?([^"';,}]+)/i);
  if (bodyFontMatch) addFont(bodyFontMatch[1], 'css-rule', 'body');

  // (4) CSS custom properties for font families only
  const fontFamilyVarPattern = /--(?:font-family|heading-font|body-font|type-header-font|type-body-font)[^:]*:\s*["']?([^"';,}]+)/gi;
  let fontVarMatch;
  while ((fontVarMatch = fontFamilyVarPattern.exec(fullFontSource)) !== null) {
    addFont(fontVarMatch[1], 'css-variable', 'unknown');
  }

  // (5) @font-face declarations (HTML + external CSS)
  const fontFacePattern = /@font-face\s*\{[^}]*font-family\s*:\s*["']?([^"';,}]+)/gi;
  let ffMatch;
  while ((ffMatch = fontFacePattern.exec(fullFontSource)) !== null) {
    addFont(ffMatch[1], 'font-face', 'unknown');
  }

  if (!fonts.heading && fonts.all.length > 0) {
    fonts.heading = fonts.all[0];
  }
  if (!fonts.body && fonts.all.length > 1) {
    fonts.body = fonts.all[1];
  } else if (!fonts.body && fonts.all.length === 1) {
    fonts.body = fonts.all[0];
  }

  return fonts;
}

// ─── Source B: Product Image Color Extraction ────────────────
// Adapted: reads a FLAT product-photos folder (skill convention),
// not output/[client]/images/product/[sub]/ subfolders.

async function extractImageColors(productDir) {
  if (!sharp) {
    process.stderr.write('  sharp not available — skipping image color analysis\n');
    return [];
  }
  if (!productDir || !fs.existsSync(productDir)) return [];

  const files = fs.readdirSync(productDir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .filter(f => /product|shot|front|packaging|closeup|hero/i.test(f))
    .map(f => path.join(productDir, f));

  if (files.length === 0) return [];

  process.stderr.write(`  Analyzing ${files.length} product image(s)...\n`);

  const BIN_SIZE = 32;
  const binCounts = new Map();

  for (const file of files) {
    try {
      const { data } = await sharp(file)
        .resize(50, 50, { fit: 'cover' })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      for (let i = 0; i < data.length; i += 3) {
        const r = Math.round(data[i] / BIN_SIZE) * BIN_SIZE;
        const g = Math.round(data[i+1] / BIN_SIZE) * BIN_SIZE;
        const b = Math.round(data[i+2] / BIN_SIZE) * BIN_SIZE;
        const key = `${r},${g},${b}`;
        binCounts.set(key, (binCounts.get(key) || 0) + 1);
      }
    } catch (err) {
      process.stderr.write(`    Skipped ${path.basename(file)}: ${err.message}\n`);
    }
  }

  const sorted = [...binCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);

  const colors = [];
  for (const [key, count] of sorted) {
    const [r, g, b] = key.split(',').map(Number);
    const hex = '#' + [r, g, b].map(c => Math.min(255, c).toString(16).padStart(2, '0')).join('');
    if (!isFilteredColor(hex)) colors.push({ hex, source: 'product-image', count });
  }

  return deduplicateColors(colors, 10).slice(0, 10);
}

// ─── Source C: Puppeteer Rendered Colors (ColorZilla mode) ───

async function extractRenderedColors(url, html, screenshotDir) {
  if (!puppeteer) {
    process.stderr.write('  Puppeteer not available — skipping rendered color analysis\n');
    return { colors: [], screenshotPaths: [] };
  }

  const urlsToCheck = [{ url, name: 'home' }];

  const collectionsMatch = html.match(/href=["'](\/collections\/[^"'?#]+)/i);
  if (collectionsMatch) {
    try {
      urlsToCheck.push({ url: new URL(collectionsMatch[1], url).toString(), name: 'collection' });
    } catch (_) {}
  }

  const productLinkPattern = /href=["'](\/products\/[^"'?#]+)/gi;
  const seenSlugs = new Set();
  let plMatch;
  let productIndex = 1;
  while ((plMatch = productLinkPattern.exec(html)) !== null && seenSlugs.size < 3) {
    const slug = plMatch[1];
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      try {
        urlsToCheck.push({ url: new URL(slug, url).toString(), name: 'product-' + productIndex++ });
      } catch (_) {}
    }
  }

  let browser;
  try {
    process.stderr.write('  Launching headless browser...\n');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const allRenderedColors = [];
    const screenshotPaths = [];

    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    for (const { url: pageUrl, name: pageName } of urlsToCheck) {
      process.stderr.write(`  Navigating to ${pageUrl.slice(0, 80)}...\n`);
      try {
        await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 20000 });
      } catch (err) {
        process.stderr.write(`    Navigation failed: ${err.message}\n`);
        continue;
      }

      await new Promise(r => setTimeout(r, 750));

      const screenshotPath = path.join(screenshotDir, `${pageName}.png`);
      try {
        await page.screenshot({ path: screenshotPath, fullPage: false });
        screenshotPaths.push(screenshotPath);
        process.stderr.write(`    Screenshot saved: ${pageName}.png\n`);
      } catch (err) {
        process.stderr.write(`    Screenshot failed: ${err.message}\n`);
      }

      const renderedColors = await page.evaluate(() => {
        const colors = [];
        const seen = new Set();

        function addColor(element, label) {
          const style = window.getComputedStyle(element);
          const props = [
            ['background-color', style.backgroundColor],
            ['color', style.color],
            ['border-color', style.borderColor],
          ];
          for (const [prop, value] of props) {
            if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)') continue;
            const key = value + '|' + prop;
            if (seen.has(key)) continue;
            seen.add(key);
            colors.push({ value, prop, label });
          }
        }

        addColor(document.body, 'body');
        addColor(document.documentElement, 'html');

        const header = document.querySelector('header') || document.querySelector('nav');
        if (header) addColor(header, 'header');

        const main = document.querySelector('main') || document.querySelector('[role="main"]');
        if (main) addColor(main, 'main');

        document.querySelectorAll('section, .shopify-section, [class*="section"]').forEach((el, i) => {
          if (i < 15) addColor(el, 'section-' + i);
        });

        document.querySelectorAll('[class*="product"], [class*="collection"], [class*="page-width"], [class*="template"]').forEach((el, i) => {
          if (i < 10) addColor(el, 'container-' + i);
        });

        document.querySelectorAll('button, a.btn, .button, [class*="btn"], [class*="cta"], [type="submit"]').forEach((el, i) => {
          if (i < 10) addColor(el, 'button-' + i);
        });

        document.querySelectorAll('a').forEach((el, i) => {
          if (i < 5) addColor(el, 'link-' + i);
        });

        document.querySelectorAll('h1, h2, h3').forEach((el, i) => {
          if (i < 5) addColor(el, 'heading-' + i);
        });

        const footer = document.querySelector('footer');
        if (footer) addColor(footer, 'footer');

        const topBar = document.querySelector('.announcement-bar, .top-bar, [class*="announcement"]');
        if (topBar) addColor(topBar, 'announcement-bar');

        return colors;
      });

      allRenderedColors.push(...renderedColors);
    } // end for urlsToCheck

    await browser.close();
    browser = null;

    const colorMap = new Map();
    for (const { value, prop, label } of allRenderedColors) {
      const rgbMatch = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if (!rgbMatch) continue;

      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');

      if (isFilteredColor(hex)) continue;

      if (!colorMap.has(hex)) {
        colorMap.set(hex, { hex, sources: new Set(), count: 0, labels: [] });
      }
      const entry = colorMap.get(hex);
      entry.sources.add('rendered-' + prop.replace('-color', '').replace('background', 'bg'));
      entry.count += (prop === 'background-color' ? 3 : 1);
      entry.labels.push(label);
    }

    const colors = [...colorMap.values()]
      .map(c => ({ hex: c.hex, sources: [...c.sources], count: c.count, labels: c.labels }))
      .sort((a, b) => b.count - a.count);

    return { colors: deduplicateColors(colors, 5).slice(0, 15), screenshotPaths };
  } catch (err) {
    process.stderr.write(`  Puppeteer error: ${err.message}\n`);
    if (browser) try { await browser.close(); } catch (_) {}
    return { colors: [], screenshotPaths: [] };
  }
}

// ─── Color evidence (produces NO colors — only images to verify with) ────────
//
// POR QUÉ EXISTE
// Sources A y C leen colores DECLARADOS (variables CSS, JSON del tema de Shopify, estilos
// computados). Ninguna puede saber si un color se VE en la página: un hex que quedó en la
// paleta por defecto de un tema sale con confianza HIGH igual que el color real de la marca.
// Caso real (julianasanchez.co): devuelve magenta #fb5184 y coral #e0002a con HIGH, y los
// dos están en la lista NEVER de la dirección de arte de esa marca — al mirar el logo y las
// fotos de producto, ninguno de los dos aparece en ningún lado.
//
// Esto NO es una cuarta Source: no alimenta mergeAndScore ni produce un solo color. Baja
// unas pocas imágenes que la propia web expone para que un modelo con visión las MIRE y
// confirme o descarte cada hex. Solo builtins + utils (esta copia del script corre en
// escanear-marca, que se instala SIN node_modules).
//
// ⚠️ Los archivos van a brand/color-evidence/, NUNCA sueltos en brand/: build-jobs.py
// elige el logo por nombre de archivo exacto (logo.png/webp/jpg/jpeg) y el Paso 6 corre
// ANTES del Paso 8, así que un brand/logo.png escrito acá se adoptaría como logo de las 30
// imágenes saltándose la compuerta de visión. Y archivos sueltos en brand/ caen en el
// alcance de ref-manifest.json, que puede hacer fallar la compuerta del Paso 12.

const EVIDENCE_DIR = 'color-evidence';
const MAX_EVIDENCE = 3;
const EVIDENCE_DEADLINE_MS = 30000;
const MAX_PX = 2000;          // más ancho que esto estorba cuando un LLM lo lee
const TARGET_PX = 1200;       // a lo que se reescribe el width de la URL
const MAX_BYTES = 5 * 1024 * 1024;

// Basura decorativa que no dice nada de la marca. Copiado de extract-logo.js a propósito:
// los dos scripts viajan por separado (este también va dentro de la skill escanear-marca,
// que no lleva node_modules), así que no pueden compartir el constante vía require.
const EV_JUNK = /pixel|1x1|spacer|placeholder|sprite|favicon|spinner|loader|preloader|emoji|avatar|badge|rating|\bstar\b|arrow|chevron|payment|visa|mastercard|amex|paypal|stripe|afterpay|klarna|cart|search|menu|hamburger|close|social|whatsapp|facebook|instagram|tiktok|linkedin|youtube|twitter|thumbnail|thumb\b/i;
const EV_LOGO = /logo|wordmark|isotipo|imagotipo|brand[-_ ]?mark|site[-_ ]?logo|header[-_ ]?logo|sin[-_ ]?fondo|marca/i;
const EV_GOOD = /product|producto|hero|banner|lookbook|collection|coleccion|shop|editorial/i;
const EV_CDN  = /(^|\.)(shopify|shopifycdn|myshopify|wixstatic|squarespace-cdn|sqspcdn|cloudinary|imgix|webflow|bigcommerce|sirv|contentful|prismic|akamaized|cloudfront)\./i;
const EV_BAD_HOST = /(google|gstatic|doubleclick|facebook|fbcdn|clarity|hotjar|paypalobjects|stripe|segment|analytics)\./i;

// Todos los pesos en un solo lugar: repartidos entre el llamador y el acumulador, el orden
// real de prioridad era imposible de leer (un <img> ancho above-the-fold le ganaba a og:image
// sin que se viera en ninguna línea).
const EV_ORIGIN_SCORE = { 'og:image': 100, 'twitter:image': 55, image_src: 50, img: 15, icon: 5 };

const evUrl = (u, base) => { try { return new URL(u, base); } catch (_) { return null; } };

// El set de nombres de atributo es fijo y chico: compilar el regex una vez por nombre en vez
// de una vez por llamada (se invoca ~2.500 veces en una home con 200 <img>).
const EV_ATTR_RX = new Map();
function evAttr(tag, name) {
  let rx = EV_ATTR_RX.get(name);
  if (!rx) { rx = new RegExp(name + '\\s*=\\s*["\']([^"\']+)["\']', 'i'); EV_ATTR_RX.set(name, rx); }
  const m = tag.match(rx);
  // decodeHtmlEntities acá es CRÍTICO: sin él, el `&amp;width=500` de un src de Shopify da un
  // parámetro llamado "amp;width", el ancho no se lee y el recorte de tamaño no hace nada.
  return m ? decodeHtmlEntities(m[1]) : null;
}

// Todas las src candidatas de un <img>, incluyendo lazy-load y srcset. Sin esto, los temas
// con lazy-load dan un placeholder diminuto y se pierde la foto real.
function evImgSources(tag) {
  const out = [];
  for (const a of ['data-src', 'data-lazy-src', 'data-lazysrc', 'data-original', 'data-lazy', 'data-image', 'src']) {
    const v = evAttr(tag, a);
    if (v) out.push({ url: v, w: null });
  }
  for (const a of ['data-srcset', 'srcset']) {
    const v = evAttr(tag, a);
    if (!v) continue;
    let best = null;
    for (const part of v.split(',')) {
      const bits = part.trim().split(/\s+/);
      if (!bits[0]) continue;
      const wd = (bits[1] || '').match(/^(\d+)w$/);
      const w = wd ? parseInt(wd[1], 10) : null;
      if (!best || (w || 0) > (best.w || 0)) best = { url: bits[0], w };
    }
    if (best) out.push(best);
  }
  return out;
}

// Ancho declarado: descriptor del srcset, parámetro de query, o atributo width.
// OJO: width="100%" / "auto" NO deben parsearse como número.
function evDeclaredWidth(u, tag, srcsetW) {
  if (srcsetW) return srcsetW;
  for (const k of ['width', 'w', 'maxwidth', 'max-w']) {
    const v = u.searchParams.get(k);
    if (v && /^\d+$/.test(v)) return parseInt(v, 10);
  }
  if (tag) {
    const a = evAttr(tag, 'width');
    if (a && /^\d+$/.test(a.trim())) return parseInt(a, 10);
  }
  return null;
}

// Pedir la imagen ya recortada: evita bajar un 3000px para después descartarlo.
// Los CDN tipo Shopify también dimensionan por tokens en el PATH (…_2048x2048.jpg), que el
// parámetro de query no puede sobreescribir — por eso se reescriben los dos.
function evCapUrl(u) {
  const c = new URL(u.href);
  c.pathname = c.pathname.replace(/_(\d{3,4})x(\d{3,4})?(?=\.[a-z0-9]+$)/i,
    (m, w) => (parseInt(w, 10) > TARGET_PX ? `_${TARGET_PX}x` : m));
  let touched = false;
  for (const k of ['width', 'w']) {
    const v = c.searchParams.get(k);
    if (v && /^\d+$/.test(v) && parseInt(v, 10) > TARGET_PX) { c.searchParams.set(k, String(TARGET_PX)); touched = true; }
  }
  // Comportamiento documentado de los CDN tipo Shopify; si lo ignora, no molesta.
  if (!touched && !c.searchParams.has('width') && !c.searchParams.has('w') && EV_CDN.test(c.hostname)) {
    c.searchParams.set('width', String(TARGET_PX));
  }
  return c.href;
}

// Un vector es inútil como evidencia: el modelo leería los fill= del XML, que es EXACTAMENTE
// el error de "declarado, no observado" que esto viene a evitar.
const evIsVector = (buf) => /^\s*(<\?xml|<svg)/i.test(buf.toString('latin1', 0, 200));

// Formato + dimensiones por magic bytes, solo raster. fetchUrl devuelve un Buffer pelado y
// descarta los headers, así que no hay Content-Type que mirar — y sniffear es mejor que
// confiar en él: de una pasada da formato, dimensiones y detección de 1x1.
function evSniff(buf) {
  if (!buf || buf.length < 24) return null;
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) {           // JPEG
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xFF) { i++; continue; }
      const m = buf[i + 1];
      if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
        return { ext: 'jpg', height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      if (m >= 0xD0 && m <= 0xD9) { i += 2; continue; }                  // 0xD8 (SOI) incluido
      const len = buf.readUInt16BE(i + 2);
      if (len < 2) break;
      i += 2 + len;
    }
    return { ext: 'jpg' };
  }
  if (buf.toString('latin1', 0, 8) === '\x89PNG\r\n\x1a\n') {
    return { ext: 'png', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.toString('latin1', 0, 4) === 'GIF8') {
    return { ext: 'gif', width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  if (buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') {
    const chunk = buf.toString('latin1', 12, 16);
    try {
      if (chunk === 'VP8X') return { ext: 'webp', width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
      if (chunk === 'VP8 ') return { ext: 'webp', width: buf.readUInt16LE(26) & 0x3FFF, height: buf.readUInt16LE(28) & 0x3FFF };
      if (chunk === 'VP8L') {
        const b = buf.readUInt32LE(21);
        return { ext: 'webp', width: (b & 0x3FFF) + 1, height: ((b >> 14) & 0x3FFF) + 1 };
      }
    } catch (_) {}
    return { ext: 'webp' };
  }
  return null;
}

// Stem sin query ni tokens de tamaño — atrapa la misma foto pedida a dos anchos, que la
// dedupe por sha1 no puede ver porque los bytes difieren. Mismos tokens que el urlStem de
// extract-product-images.js, y en bucle: "hero_2048x2048_large" tiene que perder los dos.
function evStem(u) {
  let p = u.pathname.toLowerCase().replace(/\.[a-z0-9]+$/, '');
  for (;;) {
    const next = p.replace(/[-_](\d+x\d+|\d{3,4}|\d{2,4}w|master|grande|large|medium|small|thumb|xl|lg|md|sm)$/, '');
    if (next === p) return p;
    p = next;
  }
}

function evCollect(html, baseUrl) {
  const pool = [];
  const seen = new Set();
  const base = evUrl(baseUrl, undefined);
  const brandHost = base ? base.hostname.toLowerCase() : '';
  const apex = brandHost.split('.').slice(-2).join('.');

  // origin, tag y alt describen el TAG; url/srcsetW describen el candidato. Los tres tests de
  // regex sobre el tag se hacen UNA vez por tag en el llamador, no una vez por candidato.
  const push = ({ raw, origin, tag = null, srcsetW = null, alt = null, above = false, tagIsLogo = false, tagIsGood = false }) => {
    if (!raw) return;
    const clean = String(raw).trim();
    if (!clean || /^data:/i.test(clean)) return;
    const u = evUrl(clean, baseUrl);
    if (!u) return;
    if (seen.has(u.href)) return;
    seen.add(u.href);
    const host = u.hostname.toLowerCase();
    if (EV_BAD_HOST.test(host)) return;
    if (!(host === brandHost || (apex && host.endsWith('.' + apex))) && !EV_CDN.test(host)) return;
    if (/\.svg(\?|$)/i.test(u.pathname + u.search)) return;
    const urlHay = u.href + ' ' + (alt || '');
    if (EV_JUNK.test(urlHay)) return;
    const w = evDeclaredWidth(u, tag, srcsetW);
    if (w !== null && w <= 64) return;                    // favicons y spacers
    const isLogo = tagIsLogo || EV_LOGO.test(urlHay);
    const score = (EV_ORIGIN_SCORE[origin] || 0)
      + (above ? 15 : 0)
      + (w === null ? 10 : w >= 600 ? 60 : w >= 300 ? 40 : 0)
      + (isLogo ? 50 : 0)
      + (tagIsGood || EV_GOOD.test(urlHay) ? 10 : 0);
    pool.push({ u, origin, score, alt, isLogo });
  };

  // Meta: la imagen que la propia marca eligió para representarse. El dedupe por URL absoluta
  // ya cubre el caso og === twitter, que es lo normal.
  let ogAlt = null;
  for (const t of html.match(/<meta[^>]+>/gi) || []) {
    const prop = (evAttr(t, 'property') || evAttr(t, 'name') || '').toLowerCase();
    const content = evAttr(t, 'content');
    if (prop === 'og:image' || prop === 'og:image:secure_url') push({ raw: content, origin: 'og:image' });
    else if (prop === 'twitter:image' || prop === 'twitter:image:src') push({ raw: content, origin: 'twitter:image' });
    else if (prop === 'og:image:alt') ogAlt = content;
  }
  if (ogAlt) { const f = pool.find(p => p.origin === 'og:image'); if (f) f.alt = ogAlt; }

  // <img> del documento. matchAll da el índice gratis: sin él había que buscar cada tag con
  // indexOf sobre todo el HTML (O(n·m)), y encima un tag repetido heredaba la posición del
  // primero, así que el bonus de above-the-fold caía en la instancia equivocada.
  const cut = html.length * 0.4;
  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0];
    const alt = evAttr(tag, 'alt');
    const tagHay = tag + ' ' + (alt || '');
    if (EV_JUNK.test(tagHay)) continue;                   // descarta el tag entero, no 8 veces
    const tagIsLogo = EV_LOGO.test(tagHay);
    const shared = { origin: 'img', tag, alt, above: m.index < cut, tagIsLogo, tagIsGood: EV_GOOD.test(tagHay) };
    for (const cand of evImgSources(tag)) push({ ...shared, raw: cand.url, srcsetW: cand.w });
  }

  // Iconos: último recurso. Un touch-icon es la marca sobre un fondo plano — casi no aporta
  // mundo visual, así que solo entra si no hay nada mejor.
  for (const t of html.match(/<link[^>]+>/gi) || []) {
    const rel = (evAttr(t, 'rel') || '').toLowerCase();
    if (/apple-touch-icon|(^|\s)icon(\s|$)|shortcut icon/.test(rel)) push({ raw: evAttr(t, 'href'), origin: 'icon', tag: t });
    else if (rel === 'image_src') push({ raw: evAttr(t, 'href'), origin: 'image_src', tag: t });
  }

  // Diversidad por encima de resolución: 3 recortes de la misma remera no ayudan a juzgar un
  // color. Máx 1 logo y máx 1 icono. Se devuelve la lista COMPLETA: cortarla acá solo podía
  // perder al único candidato usable si los primeros fallaban al bajar.
  pool.sort((a, b) => b.score - a.score);
  const picked = [];
  const stems = new Set();
  let logos = 0, icons = 0;
  for (const c of pool) {
    if (c.isLogo && logos >= 1) continue;
    if (c.origin === 'icon' && icons >= 1) continue;
    const st = evStem(c.u);
    if (stems.has(st)) continue;
    stems.add(st);
    if (c.isLogo) logos++;
    if (c.origin === 'icon') icons++;
    picked.push(c);
  }
  return picked;
}

async function downloadBrandImages(html, baseUrl, brandDir) {
  const out = (extra) => ({
    dir: null, count: 0, files: [], skipped: [], reason: null,
    colorsVerified: false, notForReference: true,
    note: 'Los colors[] de este archivo estan DECLARADOS en el CSS/HTML, no vistos. Ver "COMPUERTA DE COLOR" en el SKILL.md: hay que MIRAR estas imagenes, poner visualCheck en VISIBLE o NOT_VISIBLE por color, y GUARDAR este archivo con el veredicto. Evidencia de color unicamente: nunca citar como Reference de i2i.',
    ...extra,
  });
  let cands;
  try { cands = evCollect(html, baseUrl); }
  catch (err) { return out({ reason: 'collect-error: ' + err.message }); }
  if (!cands.length) return out({ reason: 'no-candidates' });

  const outDir = path.join(brandDir, EVIDENCE_DIR);
  const files = [];
  const skipped = [];
  const hashes = new Set();
  const oversize = [];          // se guardan como último recurso, ver abajo
  const started = Date.now();

  const write = (buf, sniff, c, flags) => {
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const name = `evidence-${String(files.length + 1).padStart(2, '0')}.${sniff.ext}`;
    fs.writeFileSync(path.join(outDir, name), buf);
    files.push({
      file: `${EVIDENCE_DIR}/${name}`, source: c.u.href,
      origin: c.isLogo && c.origin === 'img' ? 'logo-img' : c.origin,
      width: sniff.width ?? null, height: sniff.height ?? null, bytes: buf.length, alt: c.alt, ...flags,
    });
  };

  for (const c of cands) {
    if (files.length >= MAX_EVIDENCE) break;
    if (Date.now() - started > EVIDENCE_DEADLINE_MS) { skipped.push({ source: c.u.href, reason: 'deadline' }); break; }
    try {
      const buf = await fetchUrl(evCapUrl(c.u), { timeout: 8000 });
      if (!buf || !buf.length) { skipped.push({ source: c.u.href, reason: 'empty' }); continue; }
      if (buf.length > MAX_BYTES) { skipped.push({ source: c.u.href, reason: 'too-heavy' }); continue; }
      if (buf.length < 2048) { skipped.push({ source: c.u.href, reason: 'too-small' }); continue; }
      if (evIsVector(buf)) { skipped.push({ source: c.u.href, reason: 'svg' }); continue; }
      const sniff = evSniff(buf);
      if (!sniff) { skipped.push({ source: c.u.href, reason: 'not-an-image' }); continue; }
      if (sniff.width && sniff.width < 100) { skipped.push({ source: c.u.href, reason: 'tiny' }); continue; }
      // Única capa que atrapa la misma foto servida a dos anchos distintos.
      const h = crypto.createHash('sha1').update(buf).digest('hex');
      if (hashes.has(h)) { skipped.push({ source: c.u.href, reason: 'duplicate' }); continue; }
      hashes.add(h);
      // Ancho excesivo BAJA de prioridad, no descarta: si se descartaba, una marca cuyas
      // únicas fotos buenas son grandes terminaba en count 0 y la compuerta se apagaba sola
      // justo en las marcas con hero grande. Se guarda y se usa solo si no queda nada mejor.
      const tooBig = (sniff.width && sniff.width > MAX_PX) || (sniff.height && sniff.height > MAX_PX * 2);
      if (tooBig) { oversize.push({ buf, sniff, c }); continue; }
      write(buf, sniff, c, {});
    } catch (err) {
      skipped.push({ source: c.u.href, reason: 'fetch-failed: ' + err.message });
    }
  }

  for (const o of oversize) {
    if (files.length >= MAX_EVIDENCE) { skipped.push({ source: o.c.u.href, reason: `oversize-${o.sniff.width}` }); continue; }
    write(o.buf, o.sniff, o.c, { oversize: true });
  }

  if (!files.length) {
    const kinds = [...new Set(skipped.map(s => s.reason.split(/[-:]/)[0]))];
    return out({ reason: `no-usable-images (${kinds.join(',') || 'none'})`, skipped });
  }
  return out({ dir: EVIDENCE_DIR, count: files.length, files, skipped });
}


// ─── Ad Language Detection ───────────────────────────────────
// El idioma del ad = idioma del MERCADO de la marca (no del estudiante).
// Señales: <html lang>, TLD del dominio, hints de moneda. Devuelve un GUESS
// que la skill confirma con Santiago (la detección puede fallar en .com mixtos).
function detectAdLanguage(html, url) {
  const signals = [];
  let guess = 'unknown';

  const langAttr = (html.match(/<html[^>]+lang=["']([a-z]{2})/i) || [])[1];
  if (langAttr) {
    signals.push(`html-lang=${langAttr}`);
    if (langAttr === 'en') guess = 'English';
    else if (langAttr === 'es') guess = 'Spanish';
  }

  // TLD: dominios LATAM/ES fuertes → Spanish (override de lang ambiguo)
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (/\.(es|mx|ar|co|pe|cl|ec|gt|uy|bo|py|ve|do)$|\.com\.(mx|ar|co|pe)$/.test(host)) {
      signals.push(`tld=${host.split('.').slice(-2).join('.')}`);
      guess = 'Spanish';
    }
  } catch (_) {}

  // Moneda como desempate suave si seguimos en unknown
  if (guess === 'unknown') {
    if (/\bUSD\b|US\$/.test(html)) { guess = 'English'; signals.push('currency=USD'); }
    else if (/\b(COP|MXN|ARS|CLP|PEN)\b/.test(html)) { guess = 'Spanish'; signals.push('currency=LATAM'); }
  }

  return { guess, signals };
}

// ─── Merge & Score ───────────────────────────────────────────

function mergeAndScore(sourceA, sourceB, sourceC) {
  const results = [];

  for (const color of sourceA) {
    const baseScore = Math.min(90, 70 + color.count * 2);
    const entry = {
      hex: color.hex,
      name: nameColor(color.hex),
      confidence: 'HIGH',
      sources: [...color.sources],
      score: baseScore,
    };

    const lab = hexToLab(color.hex);
    for (const imgColor of sourceB) {
      if (deltaE(lab, hexToLab(imgColor.hex)) < 15) {
        entry.sources.push('product-image');
        entry.score = Math.min(99, entry.score + 10);
        entry.confidence = 'CONFIRMED';
        break;
      }
    }

    results.push(entry);
  }

  const sourceC_safe = sourceC || [];
  for (const color of sourceC_safe) {
    const lab = hexToLab(color.hex);
    const nearExisting = results.find(r => deltaE(hexToLab(r.hex), lab) < 10);
    if (nearExisting) {
      if (!nearExisting.sources.includes('rendered')) nearExisting.sources.push('rendered');
      nearExisting.score = Math.min(99, nearExisting.score + 10);
      nearExisting.confidence = 'CONFIRMED';
    } else {
      results.push({
        hex: color.hex,
        name: nameColor(color.hex),
        confidence: 'HIGH',
        sources: [...color.sources],
        score: Math.min(95, 75 + color.count * 2),
      });
    }
  }

  for (const imgColor of sourceB) {
    const lab = hexToLab(imgColor.hex);
    const nearExisting = results.some(r => deltaE(hexToLab(r.hex), lab) < 15);
    if (!nearExisting) {
      results.push({
        hex: imgColor.hex,
        name: nameColor(imgColor.hex),
        confidence: 'MEDIUM',
        sources: ['product-image'],
        score: Math.min(55, 40 + imgColor.count),
      });
    }
  }

  results.sort((a, b) => b.score - a.score);

  const final = [];
  for (const color of results) {
    const lab = hexToLab(color.hex);
    const existing = final.find(f => deltaE(hexToLab(f.hex), lab) < 10);
    if (existing) {
      for (const s of color.sources) {
        if (!existing.sources.includes(s)) existing.sources.push(s);
      }
      existing.score = Math.max(existing.score, color.score);
    } else {
      final.push(color);
    }
  }

  return final.slice(0, 8);
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  const params = parseArgs();
  const brandDir = params.outDir;

  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }

  process.stderr.write(`\n  Brand Identity Detector\n`);
  process.stderr.write(`  ──────────────────────\n`);
  process.stderr.write(`  URL:     ${params.url}\n`);
  process.stderr.write(`  Out:     ${brandDir}\n\n`);

  // Fetch HTML
  process.stderr.write(`  Fetching website...\n`);
  let html;
  try {
    html = await fetchUrl(params.url, { encoding: 'utf-8' });
  } catch (err) {
    console.error(`ERROR: Could not fetch ${params.url}: ${err.message}`);
    process.exit(1);
  }

  // Fetch external stylesheets
  process.stderr.write(`  Fetching external stylesheets...\n`);
  const externalCss = await fetchExternalCss(html, params.url);
  process.stderr.write(`  External CSS: ${externalCss.length > 0 ? Math.round(externalCss.length / 1024) + 'KB fetched' : 'none found'}\n\n`);

  // Source A: CSS/HTML colors
  process.stderr.write(`  Extracting CSS/HTML colors...\n`);
  const sourceA = extractCssColors(html, externalCss);
  process.stderr.write(`  Source A (CSS/HTML): ${sourceA.length} color(s) found\n`);
  for (const c of sourceA.slice(0, 8)) {
    process.stderr.write(`    ${c.hex}  ${nameColor(c.hex).padEnd(12)} [${c.sources.join(', ')}] (count: ${c.count})\n`);
  }

  // Font extraction
  process.stderr.write(`\n  Extracting fonts...\n`);
  const fonts = extractFonts(html, externalCss);
  if (fonts.heading) process.stderr.write(`    Heading: ${fonts.heading.family} [${fonts.heading.source}]\n`);
  if (fonts.body) process.stderr.write(`    Body:    ${fonts.body.family} [${fonts.body.source}]\n`);

  // Source D: imágenes de la marca para verificar los colores con visión.
  // Va ANTES de B y C a propósito: Source C (Puppeteer) es el paso más lento — hasta 4
  // cargas de página — y si un timeout mata el proceso ahí, se perdería justo lo único que
  // permite descartar un color declarado-pero-nunca-visto.
  process.stderr.write(`\n  Downloading brand images for vision verification...\n`);
  const brandImages = await downloadBrandImages(html, params.url, brandDir);
  process.stderr.write(`  Source D (Vision evidence): ${brandImages.count} file(s)`
    + (brandImages.count ? ` in ${brandImages.dir}/\n` : ` — los colores quedan SIN VERIFICAR (${brandImages.reason})\n`));

  // Source B: Product image colors (flat product-dir)
  process.stderr.write(`\n  Extracting product image colors...\n`);
  const sourceB = await extractImageColors(params.productDir);
  process.stderr.write(`  Source B (Images): ${sourceB.length} color(s) found\n`);

  // Source C: Puppeteer rendered colors + screenshots (optional)
  process.stderr.write(`\n  Extracting rendered colors + screenshots (Puppeteer)...\n`);
  const screenshotDir = path.join(brandDir, 'screenshots');
  const { colors: sourceC, screenshotPaths } = await extractRenderedColors(params.url, html, screenshotDir);
  process.stderr.write(`  Source C (Rendered): ${sourceC.length} color(s) found\n`);

  // Merge
  process.stderr.write(`\n  Merging sources...\n`);
  const merged = mergeAndScore(sourceA, sourceB, sourceC);

  process.stderr.write(`\n  Final Colors:\n`);
  process.stderr.write(`  ${'─'.repeat(70)}\n`);
  for (let i = 0; i < merged.length; i++) {
    const c = merged[i];
    process.stderr.write(`  ${String(i+1).padStart(2)}. ${c.hex}  ${c.name.padEnd(12)} ${c.confidence.padEnd(9)} score:${String(c.score).padStart(2)}  [${c.sources.join(', ')}]\n`);
  }

  // Ad language guess (brand market language, not student location)
  const adLang = detectAdLanguage(html, params.url);
  process.stderr.write(`\n  Ad language guess: ${adLang.guess} [${adLang.signals.join(', ') || 'no signals'}]\n`);

  // Build output (screenshots as relative-to-brandDir paths)
  const output = {
    detectedAt: new Date().toISOString(),
    url: params.url,
    adLanguageGuess: adLang.guess,
    adLanguageSignals: adLang.signals,
    colors: merged,
    fonts: {
      heading: fonts.heading || null,
      body: fonts.body || null,
      all: fonts.all,
    },
    screenshots: screenshotPaths.map(p => path.relative(brandDir, p)),
    // Evidencia visual para la compuerta de color (Source D). Los hex de arriba están
    // DECLARADOS, no vistos: brandImages.instruction explica qué hacer con ellos.
    brandImages,
    puppeteerUsed: !!puppeteer,
    sharpUsed: !!sharp,
  };
  // Slot explícito para que el modelo lo complete, en vez de pedirle que lo invente.
  for (const c of output.colors) c.visualCheck = brandImages.count ? 'PENDING' : 'UNVERIFIED';

  // Write file
  const outPath = path.join(brandDir, 'detected-colors.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  process.stderr.write(`\n  Saved: ${outPath}\n\n`);

  // Stdout for agent consumption
  console.log(JSON.stringify(output, null, 2));
}

main();
