#!/usr/bin/env node
/**
 * validate-setup.js — "doctor" de entorno para estudiantes (no técnicos).
 *
 * Modelo de entrega: el paquete público se instala como 3 skills locales en
 * `.claude/skills/` (copiando las 3 carpetas a mano, igual en Windows/Mac/Linux) y corre
 * en **Claude Code**, en la MÁQUINA del estudiante. También sigue funcionando si la skill
 * llega por el MCP de Felipe. Este script revisa el entorno y, por cada requisito que
 * falte, imprime **el comando exacto para instalarlo según el SO**, para que el asistente
 * lo corra (con permiso del estudiante) o lo copie/pegue.
 *
 * Uso:  node validate-setup.js
 * Exit: 0 si todo lo REQUERIDO pasa; 1 si falta algo requerido.
 *       Puppeteer NO es requerido y NO advierte: es una línea informativa (ver punto 4).
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PLAT = process.platform;                        // 'win32' | 'darwin' | 'linux'
const OSNAME = PLAT === 'win32' ? 'Windows' : PLAT === 'darwin' ? 'macOS' : 'Linux';
const ok   = m => console.log(`  ✓ ${m}`);
const warn = m => console.log(`  ⚠ ${m}`);
// Informativo: NO es un problema. Se usa para cosas que el paquete no trae a propósito,
// así el doctor no le grita al estudiante por una instalación perfectamente sana.
const info = m => console.log(`  · ${m}`);

const missing = [];                                   // {label, install:{win,mac,linux}, note}
const bad = (label, install, note) => { console.log(`  ✗ ${label}`); missing.push({ label, install, note }); };

console.log(`\n  Validate Setup — produccion-anuncios  (SO: ${OSNAME})\n  ` + '─'.repeat(46));

// 1. Node >= 18 (si corre este script, node existe; validamos versión)
const major = parseInt(process.versions.node.split('.')[0], 10);
if (major >= 18) ok(`Node ${process.versions.node}`);
else bad(`Node ${process.versions.node} (se requiere >=18)`, { win: 'winget install -e --id OpenJS.NodeJS.LTS', mac: 'brew install node', linux: 'sudo apt install -y nodejs npm' });

// 2. CLI tools del pipeline de render (bash + python + jq)
function checkCmd(cmd, label, install, note) {
  try { execSync(cmd, { stdio: 'ignore' }); ok(label); return true; }
  catch { bad(label, install, note); return false; }
}

// En Windows, bash y jq casi nunca están en el PATH de cmd/PowerShell aunque SÍ existan:
// Git NO agrega bash al PATH a propósito (evita pisar comandos de Windows), y jq suele
// vivir en ~/bin, que solo ve Git Bash. Pero `run-all-ads.sh` corre BAJO bash — así que
// la pregunta real es "¿bash puede correr esto?", no "¿cmd lo encuentra?".
// Sin esta doble verificación el doctor da falsos negativos y manda a reinstalar Git
// (que ya está) — un callejón sin salida para el estudiante.
function findBashWin() {
  const cands = [
    'C:\\Program Files\\Git\\bin\\bash.exe',
    'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs', 'Git', 'bin', 'bash.exe'),
    process.env.ProgramW6432 && path.join(process.env.ProgramW6432, 'Git', 'bin', 'bash.exe'),
  ];
  return cands.find(p => p && fs.existsSync(p)) || null;
}

let BASH = null;                                      // ruta usable de bash, si la hay
try { execSync('bash --version', { stdio: 'ignore' }); BASH = 'bash'; ok('bash (corre run-all-ads + kie_build_layered_prompt)'); }
catch {
  BASH = PLAT === 'win32' ? findBashWin() : null;
  if (BASH) ok(`bash — vía Git Bash (${BASH}); no está en el PATH de Windows, pero es el que usa Claude Code`);
  else bad('bash (corre run-all-ads + kie_build_layered_prompt)',
    { win: 'winget install -e --id Git.Git', mac: '(ya viene con macOS)', linux: '(ya viene)' },
    PLAT === 'win32' ? 'En Windows, bash VIENE CON Git — instalá Git y usá "Git Bash".' : null);
}

checkCmd(PLAT === 'win32' ? 'python --version' : 'python3 --version', 'python (build-jobs / validate-payload)',
  { win: 'winget install -e --id Python.Python.3.12', mac: 'brew install python', linux: 'sudo apt install -y python3' });

// jq: si no está en el PATH del sistema, preguntarle a bash — es el entorno donde se usa.
try { execSync('jq --version', { stdio: 'ignore' }); ok('jq (run-all-ads)'); }
catch {
  let viaBash = false;
  if (BASH) {
    try { execSync(`"${BASH}" -lc "command -v jq"`, { stdio: 'ignore' }); viaBash = true; } catch { /* no está */ }
  }
  if (viaBash) ok('jq — visible desde bash (no desde cmd/PowerShell, pero es donde se usa)');
  else bad('jq (run-all-ads)', { win: 'winget install -e --id jqlang.jq', mac: 'brew install jq', linux: 'sudo apt install -y jq' });
}

// 3. Deps node del skill (sharp + exceljs)
let depsOk = true;
for (const dep of ['sharp', 'exceljs']) {
  try { require.resolve(dep); ok(`dependencia ${dep}`); }
  catch { depsOk = false; }
}
if (!depsOk) bad('dependencias node (sharp/exceljs)', { win: 'cd scripts && npm install', mac: 'cd scripts && npm install', linux: 'cd scripts && npm install' }, 'Correr dentro de <SKILL_DIR>/scripts/.');

// 4. Puppeteer — informativo, NUNCA warning.
// El paquete NO lo trae a propósito: arrastra Chromium (170-300 MB) y no vale ese peso
// para un extra. O sea que "ausente" es el estado NORMAL: si esto fuera un ⚠, le sonaría
// al 100% de los estudiantes en una instalación sana, y a alguien no técnico eso le parece
// que algo está roto. La ruta de color sin Puppeteer (CSS/HTML) es la ruta esperada.
// Y no cambia las imágenes finales: la paleta de los anuncios la decide el Paso 10a/10b
// mirando producto/packaging/IG, no el CSS del sitio (Leyes 7 y 14).
try { require.resolve('puppeteer'); ok('puppeteer (suma colores renderizados)'); }
catch {
  try { require.resolve('puppeteer-core'); ok('puppeteer-core (suma colores renderizados)'); }
  catch { info('los colores salen del CSS/HTML del sitio. Para leerlos ya renderizados hace falta Playwright MCP o Puppeteer — ninguno viene en el paquete, y no hace falta: la paleta final la define el Paso 10a con producto y packaging.'); }
}

// 5. KIE_API_KEY (env o .env hacia arriba) — NO es instalación: el estudiante la PEGA en el chat
function hasKieKey() {
  if (process.env.KIE_API_KEY) return true;
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const env = path.join(dir, '.env');
    if (fs.existsSync(env) && /KIE_API_KEY\s*=\s*\S/.test(fs.readFileSync(env, 'utf-8'))) return true;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return false;
}
const kieOk = hasKieKey();
if (kieOk) ok('KIE_API_KEY presente');
else bad('KIE_API_KEY no encontrada (env o .env)', null, 'NO se instala: pedile al estudiante que PEGUE su clave de Kie.ai en el chat y guardala como KIE_API_KEY=... en un .env en su carpeta de trabajo. Necesita cuenta de Kie.ai CON SALDO.');

// 6. Helper del render
const bundled = path.join(__dirname, '..', 'lib', 'kie-api-helpers.sh');
fs.existsSync(bundled) ? ok('kie-api-helpers.sh') : warn('kie-api-helpers.sh no hallado en lib/ (se baja con el bootstrap del skill en el 1er uso).');

// ── Reporte + guía de instalación por SO ─────────────────────────────────────
console.log('  ' + '─'.repeat(46));
if (!missing.length) { console.log('  ✓ Entorno listo. Podés generar.\n'); process.exit(0); }

const key = PLAT === 'win32' ? 'win' : PLAT === 'darwin' ? 'mac' : 'linux';
console.log(`\n  Falta(n) ${missing.length} cosa(s). Cómo resolver en ${OSNAME}:\n`);
for (const m of missing) {
  console.log(`  • ${m.label}`);
  if (m.install && m.install[key]) console.log(`      instalar:  ${m.install[key]}`);
  if (m.note) console.log(`      nota:      ${m.note}`);
}
if (PLAT === 'win32' && missing.some(m => m.install && /winget/.test(m.install.win || ''))) {
  console.log('\n  (Tras instalar con winget, CERRÁ y reabrí Claude Code para que tome el PATH nuevo.)');
}
console.log('');
process.exit(1);
