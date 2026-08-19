/**
 * Shared Utilities for Matriz Creativa
 * Centralizes duplicated functions and magic numbers used across pipeline scripts.
 *
 * Usage:
 *   const { fetchUrl, normalizeText, decodeHtmlEntities, autoDetectClient, CONFIG } = require('./utils');
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// ─── Pipeline Configuration (centralized magic numbers) ─────
const CONFIG = {
  // Gemini API
  GEMINI_CONCURRENCY: 2,
  GEMINI_TIMEOUT_MS: 240000,       // 4 minutes per image
  MAX_PRODUCT_IMAGES: 8,           // Cap to stay under Gemini's ~20MB payload limit

  // HTTP
  HTTP_TIMEOUT_MS: 15000,          // 15s for web fetches
  MAX_REDIRECTS: 5,

  // Image classification
  CLOSEUP_SIZE_THRESHOLD: 150 * 1024,  // 150KB — files larger than this are likely close-ups

  // Meta Ad Library
  MIN_DAYS_ACTIVE: 75,

  // Excel matrix
  EXCEL_IMAGE_ROW_HEIGHT: 280,

  // User agent for web scraping
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

// ─── Fetch URL content ──────────────────────────────────────
// Unified HTTP/HTTPS fetcher with redirect handling and timeout.
// Returns Buffer by default, or string if options.encoding is set.
//
// Replaces 3 separate implementations:
//   - extract-brand-assets.js (lines 67-93)
//   - extract-brand-identity.js (lines 76-102)
//   - extract-product-images.js (lines 68-94)
function fetchUrl(url, options = {}) {
  const maxRedirects = options.maxRedirects ?? CONFIG.MAX_REDIRECTS;
  const timeout = options.timeout ?? CONFIG.HTTP_TIMEOUT_MS;
  const encoding = options.encoding ?? null; // null = Buffer, 'utf-8' = string
  const accept = options.accept ?? 'text/html,application/xhtml+xml,image/*,*/*';

  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': CONFIG.USER_AGENT,
        'Accept': accept,
      },
      timeout,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, url).toString();
        return fetchUrl(redirectUrl, { ...options, maxRedirects: maxRedirects - 1 })
          .then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve(encoding ? buf.toString(encoding) : buf);
      });
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// ─── Normalize text for matching ────────────────────────────
// Removes accents, special chars, collapses spaces. Used for fuzzy matching.
//
// Replaces:
//   - meta-ads-scraper.js normalizeForMatch() (lines 251-259)
//   - verify-brand-consistency.js implicit normalization
function normalizeText(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[''`]/g, '')                             // remove apostrophes
    .replace(/[&]/g, ' and ')                          // expand ampersand
    .replace(/[^a-z0-9\s]/g, ' ')                      // special chars → space
    .replace(/\s+/g, ' ').trim();
}

// ─── Decode HTML entities ───────────────────────────────────
// Replaces identical implementations in extract-brand-assets.js and extract-product-images.js
function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => {
      const num = parseInt(code, 10);
      return num > 0 && num < 65536 ? String.fromCharCode(num) : '';
    });
}

// ─── Auto-detect client folder ──────────────────────────────
// Replaces identical parseArgs() client detection logic in 4+ scripts
function autoDetectClient(explicitClient) {
  if (explicitClient) return explicitClient;

  const outputDir = path.join(__dirname, '..', 'output');
  if (fs.existsSync(outputDir)) {
    const clients = fs.readdirSync(outputDir).filter(d =>
      fs.statSync(path.join(outputDir, d)).isDirectory()
    );
    if (clients.length === 1) {
      process.stderr.write(`  Auto-detected client: ${clients[0]}\n`);
      return clients[0];
    }
    if (clients.length > 1) {
      console.error('ERROR: Multiple clients found. Use --client [name]. Available: ' + clients.join(', '));
      process.exit(1);
    }
  }

  console.error('ERROR: --client is required');
  process.exit(1);
}

module.exports = {
  fetchUrl,
  normalizeText,
  decodeHtmlEntities,
  autoDetectClient,
  CONFIG,
};
