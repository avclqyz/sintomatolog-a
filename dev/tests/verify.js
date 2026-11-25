// Verificación general: CSP, tipografías, consentimiento, avisos de alarma, páginas legales y móvil.
// Uso: node dev/tests/verify.js [carpeta-para-capturas]
'use strict';
const { chromium, devices } = require('playwright');
const os = require('os');
const serve = require('./serve');
(async () => {
  const { server, url: BASE } = await serve();
  const SHOTS = process.argv[2] || os.tmpdir();
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  const errs = [], reqs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  p.on('request', r => reqs.push(r.url()));
  // legacy localStorage purge
  await p.goto(BASE);
  await p.evaluate(() => localStorage.setItem('sintomatologia:v1', '{"sel":[["fiebre",2]]}'));
  await p.reload();
  console.log('legacy purged:', await p.evaluate(() => localStorage.getItem('sintomatologia:v1') === null));
  await p.evaluate(() => document.fonts.ready);
  console.log('fonts:', await p.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight).join(', ')));
  // select a symptom via search
  await p.fill('#buscar', 'dolor de pecho');
  await p.waitForTimeout(200);
  const firstOpt = await p.$('#sugerencias li, #sugerencias button, .sugg button, .sugg li');
  console.log('suggest found:', !!firstOpt);
  // set state directly with alarm symptom but without consent
  await p.evaluate(() => { sessionStorage.clear(); sessionStorage.setItem('sintomatologia:v1', JSON.stringify({ edad: 60, sexo: 'M', duracion: 'h', sel: [['dolor_pecho_opresivo',3]], zona: 'general' })); });
  await p.reload();
  console.log('analizar disabled w/o consent:', await p.$eval('#analizar', e => e.disabled), '| hint:', await p.$eval('#analizar-hint', e => e.hidden ? '(hidden)' : e.textContent));
  console.log('sel-alarma visible w/o consent:', await p.$eval('#sel-alarma', e => !e.hidden), '|', await p.$eval('#sel-alarma', e => e.textContent.slice(0, 140)));
  await p.check('#acepto');
  console.log('analizar enabled after consent:', await p.$eval('#analizar', e => !e.disabled), '| stored:', await p.evaluate(() => sessionStorage.getItem('sintomatologia:acepta-terminos')));
  await p.click('#analizar');
  console.log('results shown:', await p.$$eval('#resultados .cond', c => c.length), '| summary:', await p.$eval('.summary strong', e => e.textContent));
  console.log('meter inline style:', await p.$eval('#resultados .cond [style]', e => e.getAttribute('style')).catch(() => 'none'));
  await p.screenshot({ path: SHOTS + '/v-results.png' });
  await p.uncheck('#acepto');
  console.log('results hidden after uncheck:', await p.$eval('#resultados', e => e.hidden || e.closest('[hidden]') !== null || getComputedStyle(e).display === 'none' || e.children.length === 0));
  // reiniciar
  await p.check('#acepto');
  p.once('dialog', d => d.accept());
  await p.click('#reiniciar');
  await p.waitForTimeout(200);
  console.log('after reiniciar storage:', await p.evaluate(() => JSON.stringify(Object.keys(sessionStorage))), '| acepto checked:', await p.$eval('#acepto', e => e.checked));
  // ideas suicidas
  await p.evaluate(() => sessionStorage.setItem('sintomatologia:v1', JSON.stringify({ edad: 30, sexo: 'F', duracion: 's', sel: [['ideas_suicidas',2]], zona: 'mente' })));
  await p.reload();
  console.log('4141 notice:', await p.$eval('#sel-alarma', e => !e.hidden && e.textContent.includes('4141')));
  // footer links
  console.log('footer links:', await p.$$eval('.legal-links a', a => a.map(x => x.getAttribute('href')).join(' ')));
  await p.screenshot({ path: SHOTS + '/v-footer.png', fullPage: false, clip: undefined });
  for (const page of ['terminos.html', 'privacidad.html']) {
    await p.goto(BASE + page);
    await p.evaluate(() => document.fonts.ready);
    const info = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, secs: document.querySelectorAll('section').length, toc: [...document.querySelectorAll('.doc-toc a')].every(a => document.querySelector(a.getAttribute('href'))), overflow: document.documentElement.scrollWidth > innerWidth }));
    console.log(page, JSON.stringify(info));
    await p.screenshot({ path: SHOTS + '/v-' + page.replace('.html','') + '.png' });
  }
  const external = [...new Set(reqs.filter(u => !u.startsWith(BASE)))];
  console.log('external requests:', external);
  // mobile
  const m = await b.newContext({ ...devices['iPhone 13'] });
  const mp = await m.newPage();
  mp.on('pageerror', e => errs.push('m pageerror: ' + e.message));
  mp.on('console', x => { if (x.type() === 'error') errs.push('m: ' + x.text()); });
  for (const page of ['', 'terminos.html', 'privacidad.html']) {
    await mp.goto(BASE + page);
    if (!page) { await mp.evaluate(() => { sessionStorage.setItem('sintomatologia:acepta-terminos','1'); sessionStorage.setItem('sintomatologia:v1', JSON.stringify({ edad: 30, sexo: 'F', duracion: 'd', sel: [['fiebre',2],['dolor_garganta_un_lado',3]], zona: 'general' })); }); await mp.reload(); await mp.click('#analizar'); }
    console.log('mobile', page || 'index', 'overflow:', await mp.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1));
  }
  await mp.goto(BASE);
  await mp.evaluate(() => { sessionStorage.removeItem('sintomatologia:acepta-terminos'); });
  await mp.reload();
  const cb = await mp.$('.consent'); await cb.scrollIntoViewIfNeeded();
  await mp.screenshot({ path: SHOTS + '/v-m-consent.png' });
  await mp.goto(BASE + 'privacidad.html');
  await mp.screenshot({ path: SHOTS + '/v-m-priv.png' });
  console.log('ERRORS:', errs);
  await b.close(); server.close();
})();
