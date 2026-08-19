#!/usr/bin/env node
/**
 * parse-concepts.js — conceptos-30.md → matrix-data.json
 *
 * Single source of truth for the 30-cell matrix. build-jobs.py and generate-matrix.js
 * both read the matrix-data.json this produces (keyed by ad NUMBER — titles are unreliable).
 *
 * Usage:
 *   node parse-concepts.js <student-folder>
 *
 * Reads:  <student-folder>/conceptos-30.md   (authored by the skill, format in reference/ideation-image-prompt.md)
 *         <student-folder>/marca-cliente.json (optional, for brand name)
 * Writes: <student-folder>/matrix-data.json
 */

const fs = require('fs');
const path = require('path');

const studentArg = process.argv[2];
if (!studentArg) { console.error('Usage: node parse-concepts.js <student-folder>'); process.exit(1); }
const STUDENT = path.resolve(studentArg);
const mdPath = path.join(STUDENT, 'conceptos-30.md');
if (!fs.existsSync(mdPath)) { console.error(`ERROR: not found: ${mdPath}`); process.exit(1); }

const md = fs.readFileSync(mdPath, 'utf-8');

// Accent-insensitive label matcher: "- **Label:** value" (value runs to end of line).
// El último `[ \t]*` (NO `\s*`) antes del grupo es a propósito: `\s` incluye salto de
// línea, así que un campo vacío ("- **Hook Tactic:**" sin valor) haría que la captura
// "sangrara" a la línea siguiente y devolviera el valor del PRÓXIMO campo como si fuera
// el de este — corrompiendo el dato en silencio (sin disparar el warning de "falta X").
function field(block, ...labels) {
  for (const label of labels) {
    const re = new RegExp(`^\\s*[-*]\\s*\\*\\*\\s*${label}[ \\t]*:?[ \\t]*\\*\\*[ \\t]*:?[ \\t]*(.+?)\\s*$`, 'im');
    const m = block.match(re);
    if (m) return m[1].trim();
  }
  return '';
}

function toBool(s) {
  return /^(s[ií]|yes|true|1)$/i.test((s || '').trim());
}

// Strip wrapping quotes
function unquote(s) {
  return (s || '').replace(/^["'“”]+|["'“”]+$/g, '').trim();
}

// Split blocks on "### AD NN" headers
const parts = md.split(/(?=^###\s*AD\s*\d+)/im).filter(b => /^###\s*AD\s*\d+/im.test(b));

const cells = [];
for (const block of parts) {
  const numMatch = block.match(/^###\s*AD\s*(\d+)/im);
  if (!numMatch) continue;
  const num = parseInt(numMatch[1], 10);

  const hasProductRaw = field(block, 'Has Product', 'Tiene Producto', 'Producto Visible');
  const referenceRaw = field(block, 'Reference', 'Referencia', 'Refs');
  const reference = referenceRaw
    ? referenceRaw.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  // Secondary products (multi-product brands): "path @ zone; path2 @ zone2" (max 2)
  const secondaryRaw = field(block, 'Secondary', 'Secundarios', 'Secundario');
  const secondary = secondaryRaw
    ? secondaryRaw.split(';').map(s => s.trim()).filter(Boolean).map(entry => {
        const [path, zone] = entry.split('@').map(x => (x || '').trim());
        return { path, zone: zone || '' };
      }).filter(s => s.path)
    : [];

  cells.push({
    num,
    desire: field(block, 'Deseo', 'Desire'),
    profile: field(block, 'Perfil', 'Profile'),
    awareness: field(block, 'Nivel', 'Nivel de Consciencia', 'Awareness'),
    enfoque: field(block, 'Enfoque', 'Focus') || '',
    composition: field(block, 'Composici[oó]n', 'Composition'),
    hook_tactic: field(block, 'Hook Tactic', 'T[aá]ctica'),
    has_product: toBool(hasProductRaw),
    product: field(block, 'Producto', 'Product') || '',
    hook: unquote(field(block, 'Hook')),
    headline: unquote(field(block, 'Headline', 'Titular')),
    cta: unquote(field(block, 'CTA')),
    concept_en: field(block, 'Concept \\(EN\\)', 'Concepto \\(EN\\)', 'Concept', 'Concepto'),
    reference,
    secondary,
  });
}

cells.sort((a, b) => a.num - b.num);

// Brand name (optional)
let brand = '';
const marcaPath = path.join(STUDENT, 'marca-cliente.json');
if (fs.existsSync(marcaPath)) {
  try { brand = JSON.parse(fs.readFileSync(marcaPath, 'utf-8')).nombre_marca || ''; } catch (_) {}
}

const out = {
  brand,
  generatedFrom: 'conceptos-30.md',
  cellCount: cells.length,
  cells,
};

const outPath = path.join(STUDENT, 'matrix-data.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

console.log(`Parsed ${cells.length} cells → ${outPath}`);
if (cells.length !== 30) {
  console.warn(`WARNING: expected 30 cells, got ${cells.length}. Check conceptos-30.md headers (### AD NN).`);
}
// Quick field-completeness warnings
for (const c of cells) {
  const missing = [];
  if (!c.desire) missing.push('Deseo');
  if (!c.profile) missing.push('Perfil');
  if (!c.awareness) missing.push('Nivel');
  if (!c.composition) missing.push('Composición');
  if (!c.concept_en) missing.push('Concept (EN)');
  if (missing.length) console.warn(`  AD ${String(c.num).padStart(2, '0')}: missing ${missing.join(', ')}`);
}
