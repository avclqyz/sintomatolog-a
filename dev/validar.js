// Valida la base de conocimiento completa (data.js + ampliaciones).
// Uso: node dev/validar.js            → resumen y errores
//      node dev/validar.js --warn     → también advertencias
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const FILES = ['js/data.js', 'js/data-comunes.js', 'js/data-raras.js'];
const win = {};
for (const f of FILES) new Function('window', fs.readFileSync(path.join(ROOT, f), 'utf8'))(win);
const { ZONES, SYMPTOMS, SOURCES, URGENCY, CONDITIONS } = win.SINTOMAS_DATA;

const errors = []; const warns = [];
const err = (m) => errors.push(m); const warn = (m) => warns.push(m);
const zoneIds = new Set(ZONES.map((z) => z.id));

// síntomas
const sym = new Map();
for (const s of SYMPTOMS) {
  if (!/^[a-z0-9_]+$/.test(s.id)) err(`síntoma con id inválido: ${s.id}`);
  if (sym.has(s.id)) err(`síntoma duplicado: ${s.id}`);
  sym.set(s.id, s);
  if (!zoneIds.has(s.z)) err(`síntoma ${s.id}: zona inválida ${s.z}`);
  if (![0, 1, 2, 3].includes(s.sev)) err(`síntoma ${s.id}: gravedad inválida ${s.sev}`);
  if (s.sx !== null && s.sx !== 'F' && s.sx !== 'M') err(`síntoma ${s.id}: sexo inválido ${s.sx}`);
  if (!s.n || s.n.length < 3) err(`síntoma ${s.id}: nombre vacío`);
  if (!Array.isArray(s.syn) || s.syn.some((x) => typeof x !== 'string' || !x.trim())) err(`síntoma ${s.id}: sinónimos inválidos`);
  if (s.z === 'contexto' && s.sev !== 0) err(`síntoma ${s.id}: la zona contexto debe tener gravedad 0`);
}
const names = new Map();
for (const s of SYMPTOMS) { const k = s.n.toLowerCase(); if (names.has(k)) warn(`nombre de síntoma repetido: ${s.id} / ${names.get(k)}`); names.set(k, s.id); }

// fuentes
const urls = new Map();
for (const [k, v] of Object.entries(SOURCES)) {
  if (!Array.isArray(v) || v.length !== 3) { err(`fuente ${k}: formato inválido`); continue; }
  const [org, title, url] = v;
  if (!org || !title) err(`fuente ${k}: organización o título vacío`);
  if (!/^https?:\/\/[^\s]+$/.test(url || '')) err(`fuente ${k}: URL inválida ${url}`);
  else if (!url.startsWith('https://')) warn(`fuente ${k}: URL sin https ${url}`);
  if (/wikipedia\.org/i.test(url)) err(`fuente ${k}: no se permite Wikipedia`);
  if (urls.has(url)) warn(`URL repetida en ${k} y ${urls.get(url)}`);
  urls.set(url, k);
}

// enfermedades
const condIds = new Set(); const usedSym = new Set(); const usedSrc = new Set(); const condNames = new Map();
const DUR = new Set(['h', 'd', 's', 'm']);
for (const c of CONDITIONS) {
  const id = c.id;
  if (!/^[a-z0-9_]+$/.test(id || '')) err(`enfermedad con id inválido: ${id}`);
  if (condIds.has(id)) err(`enfermedad duplicada: ${id}`);
  condIds.add(id);
  const nk = (c.n || '').toLowerCase();
  if (condNames.has(nk)) warn(`nombre de enfermedad repetido: ${id} / ${condNames.get(nk)}`);
  condNames.set(nk, id);
  if (!URGENCY[c.urg]) err(`${id}: urgencia inválida ${c.urg}`);
  if (c.prev !== undefined && !(typeof c.prev === 'number' && c.prev >= 0.1 && c.prev <= 1.3)) err(`${id}: prev fuera de rango ${c.prev}`);
  if (!Array.isArray(c.dur) || !c.dur.length || c.dur.some((d) => !DUR.has(d))) err(`${id}: duración inválida`);
  if (c.age && (!Array.isArray(c.age) || c.age.some((a) => !Array.isArray(a) || a.length !== 3 || a[0] > a[1] || !(a[2] > 0)))) err(`${id}: age inválido`);
  if (c.ageRange && (!Array.isArray(c.ageRange) || c.ageRange.length !== 2 || c.ageRange[0] > c.ageRange[1])) err(`${id}: ageRange inválido`);
  if (c.sex && c.sex !== 'F' && c.sex !== 'M') err(`${id}: sexo inválido`);
  for (const k of ['sexF', 'sexM', 'reqF']) if (c[k] !== undefined && !(c[k] > 0 && c[k] <= 3)) err(`${id}: ${k} inválido`);
  if (!c.s || typeof c.s !== 'object') { err(`${id}: sin síntomas`); continue; }
  let pos = 0; let key = 0;
  for (const [sid, w] of Object.entries(c.s)) {
    if (!sym.has(sid)) { err(`${id}: síntoma inexistente ${sid}`); continue; }
    usedSym.add(sid);
    if (![-3, -2, -1, 1, 2, 3].includes(w)) err(`${id}: peso inválido ${sid}=${w}`);
    if (w > 0) pos++; if (w >= 3) key++;
    const sx = sym.get(sid).sx;
    if (c.sex && sx && sx !== c.sex && w > 0) err(`${id}: usa ${sid} (solo ${sx}) pero la enfermedad es ${c.sex}`);
  }
  if (!pos) err(`${id}: ningún síntoma positivo`);
  if (!key) warn(`${id}: sin síntoma clave (peso 3)`);
  if (c.req) {
    if (!Array.isArray(c.req) || !c.req.length) err(`${id}: req inválido`);
    else for (const r of c.req) { if (!sym.has(r)) err(`${id}: req inexistente ${r}`); else usedSym.add(r); }
    if (c.reqF === undefined) err(`${id}: req sin reqF`);
  }
  for (const k of ['n', 'que', 'trat', 'esp', 'alarma']) if (typeof c[k] !== 'string' || c[k].trim().length < 3) err(`${id}: campo ${k} vacío`);
  for (const k of ['alt', 'ges', 'nota']) if (c[k] !== undefined && (typeof c[k] !== 'string' || !c[k].trim())) err(`${id}: campo ${k} inválido`);
  if (!Array.isArray(c.src) || !c.src.length) err(`${id}: sin fuentes`);
  else for (const k of c.src) { if (!SOURCES[k]) err(`${id}: fuente inexistente ${k}`); else usedSrc.add(k); }
}
for (const s of SYMPTOMS) if (!usedSym.has(s.id)) warn(`síntoma sin uso: ${s.id}`);
for (const k of Object.keys(SOURCES)) if (!usedSrc.has(k)) warn(`fuente sin uso: ${k}`);

console.log(`síntomas ${SYMPTOMS.length} · enfermedades ${CONDITIONS.length} · fuentes ${Object.keys(SOURCES).length} · errores ${errors.length} · advertencias ${warns.length}`);
errors.forEach((e) => console.log('ERROR ' + e));
if (process.argv.includes('--warn')) warns.forEach((w) => console.log('aviso ' + w));
process.exit(errors.length ? 1 : 0);
