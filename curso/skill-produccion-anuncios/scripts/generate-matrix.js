#!/usr/bin/env node
/**
 * generate-matrix.js — matrix-data.json + rendered PNGs → matriz-creativa.xlsx
 * (adapted from DEEPLOOK Research Agent for the leaner 3×2×5 cells[] schema)
 *
 * Usage:
 *   node generate-matrix.js <student-folder> [images-subdir]
 *   (images-subdir default "static-ads"; pass e.g. "static-ads-nano" for a model variant)
 *
 * Reads:  <student>/matrix-data.json   (cells[], single source of truth)
 *         <student>/<images-subdir>/ad-NN.png  (rendered images, indexed by ad NUMBER)
 * Writes: <student>/matriz-creativa[-<suffix>].xlsx  (Sheet "Matriz" grid + Sheet "Conceptos" index)
 */

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const studentArg = process.argv[2];
if (!studentArg) { console.error('Usage: node generate-matrix.js <student-folder>'); process.exit(1); }
const STUDENT = path.resolve(studentArg);

const dataPath = path.join(STUDENT, 'matrix-data.json');
if (!fs.existsSync(dataPath)) { console.error(`ERROR: not found: ${dataPath}`); process.exit(1); }
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const cells = data.cells || [];

const imagesSubdir = process.argv[3] || 'static-ads';
const imagesDir = path.join(STUDENT, imagesSubdir);
const xlsxSuffix = imagesSubdir === 'static-ads' ? '' : '-' + imagesSubdir.replace(/^static-ads-?/, '');
const outputPath = path.join(STUDENT, `matriz-creativa${xlsxSuffix}.xlsx`);

const COLORS = {
  headerBg: '1B3A5C', dolorBg: 'C0392B', gananciaBg: '27AE60',
  dolorCellBg: 'FADBD8', gananciaCellBg: 'D5F5E3',
  white: 'FFFFFF', black: '000000', grayBorder: 'BDC3C7',
};

// Mantener en sync con LEVELS en validate-payload.py (versión sin acentos).
const AWARENESS = ['Inconsciente', 'Problema', 'Solución', 'Producto', 'Decisión'];
const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

// First-appearance order for desires + profiles
function ordered(values) {
  const seen = new Set(); const out = [];
  for (const v of values) { const k = norm(v); if (v && !seen.has(k)) { seen.add(k); out.push(v); } }
  return out;
}
const desires = ordered(cells.map(c => c.desire));
const profiles = ordered(cells.map(c => c.profile));

// Image index by ad number (PNG)
function buildImageIndex(dir) {
  const index = new Map();
  if (!fs.existsSync(dir)) return index;
  for (const file of fs.readdirSync(dir)) {
    const m = file.match(/^ad-(\d+)\.png$/i);
    if (m) index.set(parseInt(m[1], 10), path.join(dir, file));
  }
  return index;
}

function findCell(desire, profile, awareness) {
  return cells.find(c =>
    norm(c.desire) === norm(desire) &&
    norm(c.profile) === norm(profile) &&
    norm(c.awareness) === norm(awareness)
  );
}

async function buildMatrizSheet(workbook) {
  const ws = workbook.addWorksheet('Matriz');
  ws.getColumn(1).width = 18;
  ws.getColumn(2).width = 24;
  for (let c = 3; c <= 7; c++) ws.getColumn(c).width = 34;

  // Row 1: SEGMENTO | DOLOR | GANANCIA
  ws.getRow(1).height = 24;
  const band = (range, text, bg) => {
    ws.mergeCells(range);
    const cell = ws.getCell(range.split(':')[0]);
    cell.value = text;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
    cell.font = { bold: true, color: { argb: COLORS.white }, size: 11 };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  };
  band('A1:B1', 'SEGMENTO', COLORS.headerBg);
  band('C1:D1', 'DOLOR / EVITAR', COLORS.dolorBg);
  band('E1:G1', 'GANANCIA / LOGRAR', COLORS.gananciaBg);

  // Row 2: column headers
  ws.getRow(2).height = 20;
  ['Deseo', 'Perfil', ...AWARENESS].forEach((h, i) => {
    const cell = ws.getCell(2, i + 1);
    cell.value = h;
    cell.font = { bold: true, color: { argb: COLORS.white }, size: 10 };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.fill = { type: 'pattern', pattern: 'solid',
      fgColor: { argb: i < 2 ? COLORS.headerBg : i < 4 ? COLORS.dolorBg : COLORS.gananciaBg } };
  });

  const imageIndex = buildImageIndex(imagesDir);
  const stats = { embedded: 0, missing: [] };
  const placedNums = new Set();
  const thick = { style: 'thick', color: { argb: COLORS.black } };
  let row = 3;

  for (const desire of desires) {
    ws.mergeCells(row, 1, row + Math.max(profiles.length - 1, 0), 1);
    const dCell = ws.getCell(row, 1);
    dCell.value = desire;
    dCell.font = { bold: true, size: 11 };
    dCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    dCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F2F3F4' } };

    for (let p = 0; p < profiles.length; p++) {
      const profile = profiles[p];
      const r = row + p;
      ws.getRow(r).height = 210;
      const pCell = ws.getCell(r, 2);
      pCell.value = profile;
      pCell.font = { size: 10 };
      pCell.alignment = { horizontal: 'center', vertical: 'top', wrapText: true };

      for (let a = 0; a < AWARENESS.length; a++) {
        const colIdx = a + 3;
        const cell = ws.getCell(r, colIdx);
        cell.fill = { type: 'pattern', pattern: 'solid',
          fgColor: { argb: a < 2 ? COLORS.dolorCellBg : COLORS.gananciaCellBg } };
        cell.alignment = { vertical: 'top', wrapText: true };
        cell.border = {
          top: p === 0 ? thick : { style: 'thin', color: { argb: COLORS.grayBorder } },
          bottom: p === profiles.length - 1 ? thick : { style: 'thin', color: { argb: COLORS.grayBorder } },
          left: { style: 'thin', color: { argb: COLORS.grayBorder } },
          right: { style: 'thin', color: { argb: COLORS.grayBorder } },
        };

        const match = findCell(desire, profile, AWARENESS[a]);
        if (!match) continue;
        placedNums.add(match.num);
        cell.value = `Ad ${match.num}\n\n"${match.hook || match.headline || ''}"`;
        cell.font = { size: 9 };

        const imgPath = imageIndex.get(match.num);
        if (imgPath && fs.existsSync(imgPath)) {
          const imageId = workbook.addImage({ buffer: fs.readFileSync(imgPath), extension: 'png' });
          ws.addImage(imageId, {
            tl: { col: colIdx - 1 + 0.05, row: r - 1 + 0.35 },
            ext: { width: 110, height: 196 }, // ~9:16
          });
          stats.embedded++;
        } else {
          stats.missing.push(match.num);
        }
      }
    }
    row += profiles.length;
  }
  stats.total = placedNums.size;
  stats.unplaced = cells.filter(c => !placedNums.has(c.num)).map(c => c.num);
  return stats;
}

function buildConceptosSheet(workbook) {
  const ws = workbook.addWorksheet('Conceptos');
  const cols = [
    ['#', 6], ['Deseo', 16], ['Perfil', 24], ['Nivel', 14], ['Composición', 20],
    ['Prod', 6], ['Hook', 50], ['Headline', 28], ['CTA', 18],
  ];
  cols.forEach(([h, w], i) => {
    ws.getColumn(i + 1).width = w;
    const cell = ws.getCell(1, i + 1);
    cell.value = h;
    cell.font = { bold: true, color: { argb: COLORS.white } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.headerBg } };
  });
  let r = 2;
  for (const c of [...cells].sort((a, b) => a.num - b.num)) {
    ws.getCell(r, 1).value = c.num;
    ws.getCell(r, 2).value = c.desire;
    ws.getCell(r, 3).value = c.profile;
    ws.getCell(r, 4).value = c.awareness;
    ws.getCell(r, 5).value = c.composition;
    ws.getCell(r, 6).value = c.has_product ? 'sí' : 'no';
    ws.getCell(r, 7).value = c.hook;
    ws.getCell(r, 8).value = c.headline;
    ws.getCell(r, 9).value = c.cta;
    ws.getRow(r).alignment = { wrapText: true, vertical: 'top' };
    r++;
  }
}

async function main() {
  console.log(`\n  Matrix Generator — ${data.brand || path.basename(STUDENT)}`);
  console.log(`  Cells: ${cells.length} | Desires: ${desires.join(', ')} | Profiles: ${profiles.length}`);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'produccion-anuncios';
  const stats = await buildMatrizSheet(workbook);
  buildConceptosSheet(workbook);
  await workbook.xlsx.writeFile(outputPath);

  console.log(`\n  Images: ${stats.embedded}/${stats.total} embedded`);
  if (stats.missing.length) console.log(`  Missing renders for ads: ${stats.missing.join(', ')}`);
  if (stats.unplaced.length) console.warn(`  WARNING: ${stats.unplaced.length} cell(s) NOT placed in the grid (duplicate or unmatched desire/profile/level): ads ${stats.unplaced.join(', ')}`);
  console.log(`  Saved: ${outputPath}\n`);
}

main().catch(err => { console.error(`ERROR: ${err.message}`); process.exit(1); });
