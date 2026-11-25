// Pruebas de coincidencia: cada escenario debe dejar la enfermedad esperada en 1er lugar (o hasta maxPos).
// Uso: node dev/tests/run.js            → todos los escenarios
//      node dev/tests/run.js t01 t02    → solo esos archivos (más los escenarios base si se agrega "base")
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const serve = require('./serve');

(async () => {
  const dir = __dirname;
  const filtro = process.argv.slice(2);
  const files = fs.readdirSync(dir).filter((f) => /^escenarios-.*\.json$/.test(f)).sort()
    .filter((f) => !filtro.length || filtro.some((x) => f.includes(x)));
  const { server, url } = await serve();
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; const external = new Set();
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('request', (r) => { if (!r.url().startsWith(url)) external.add(r.url()); });
  await p.goto(url);
  let total = 0; let okTotal = 0; const fallos = [];
  for (const f of files) {
    const scenarios = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    let ok = 0;
    for (const sc of scenarios) {
      await p.evaluate((sc) => {
        sessionStorage.setItem('sintomatologia:acepta-terminos', '1');
        sessionStorage.setItem('sintomatologia:v1', JSON.stringify({ edad: sc.edad, sexo: sc.sexo, embarazo: sc.emb || null, duracion: sc.dur, sel: sc.syms, zona: 'general' }));
      }, sc);
      await p.reload({ waitUntil: 'domcontentloaded' });
      await p.click('#analizar');
      const out = await p.evaluate(() => ({
        items: Array.from(document.querySelectorAll('#resultados > .cond-list > .cond')).map((c) => ({
          id: c.querySelector('.cond-body').id.replace('cond-body-', ''),
          t: c.querySelector('h3').textContent + ' ' + (c.querySelector('.pct') ? c.querySelector('.pct').textContent : '') })),
        sum: (document.querySelector('.summary strong') || {}).textContent
      }));
      const pos = out.items.findIndex((i) => i.id === sc.expect) + 1;
      const okPos = pos >= 1 && pos <= (sc.maxPos || 1);
      const okSum = !sc.resumen || out.sum === sc.resumen;
      if (okPos && okSum) ok++;
      else fallos.push(`✗ [${f.replace(/^escenarios-|\.json$/g, '')}] ${sc.name} → esperada ${sc.expect} en ${pos || 'ninguna'}ª posición · ${out.sum} | ${out.items.slice(0, 3).map((i) => i.t).join(' · ')}`);
    }
    total += scenarios.length; okTotal += ok;
    console.log(`${f}: ${ok}/${scenarios.length}`);
  }
  fallos.forEach((x) => console.log(x));
  console.log(`TOTAL ${okTotal}/${total} · errores de consola: ${errs.length} · peticiones externas: ${external.size}`);
  errs.slice(0, 10).forEach((e) => console.log('  ' + e));
  [...external].slice(0, 10).forEach((e) => console.log('  externo: ' + e));
  await b.close(); server.close();
  process.exit(okTotal === total && !errs.length && !external.size ? 0 : 1);
})();
