/* Sintomatología · lógica de la interfaz y motor de coincidencias
 * © 2026 Agustín Vivanco. Todos los derechos reservados. */
(function () {
  'use strict';

  const { ZONES, SYMPTOMS, SOURCES, URGENCY, CONDITIONS } = window.SINTOMAS_DATA;
  const SYM = new Map(SYMPTOMS.map((s) => [s.id, s]));
  const INTENSITY = { 1: { label: 'Leve', f: 0.8 }, 2: { label: 'Moderada', f: 1 }, 3: { label: 'Intensa', f: 1.25 } };
  const SEV_LABEL = { 0: 'Contexto', 1: 'Leve', 2: 'Atención', 3: 'Alarma' };
  const DUR_ORDER = ['h', 'd', 's', 'm'];
  const DUR_LABEL = { h: 'horas', d: 'días', s: 'semanas', m: 'más de un mes' };
  const SEX_LABEL = { F: 'femenino', M: 'masculino', X: 'no indicado' };
  const STORE_KEY = 'sintomatologia:v1';
  const OWNER = 'Agustín Vivanco';
  const MAX_MAIN = 6;
  const MAX_EXTRA = 5;
  // Síntomas muy inespecíficos: por sí solos no bastan para sugerir una enfermedad con síntomas clave más específicos.
  const GENERIC = new Set(['fiebre', 'febricula', 'fatiga', 'dolor_cabeza', 'nauseas', 'vomitos', 'mareo', 'dolor_muscular',
    'escalofrios', 'dolor_abdominal', 'sudoracion', 'debilidad_general', 'inapetencia']);
  const specW = (id) => (GENERIC.has(id) ? 0.5 : 1);

  const state = {
    edad: null,
    sexo: null, // 'F' | 'M' | 'X'
    embarazo: null, // 'si' | 'no' | 'nose'
    duracion: null, // 'h' | 'd' | 's' | 'm'
    sel: new Map(), // id -> intensidad 1..3
    zona: ZONES[0].id,
    analizado: false
  };

  // ───────────────────────── utilidades
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const norm = (str) => String(str).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      }
    }
    (children || []).forEach((c) => c && node.append(c));
    return node;
  }

  // ───────────────────────── persistencia (solo en este navegador)
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        edad: state.edad, sexo: state.sexo, embarazo: state.embarazo, duracion: state.duracion,
        sel: Array.from(state.sel.entries()), zona: state.zona
      }));
    } catch (e) { /* sin almacenamiento disponible */ }
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      state.edad = Number.isFinite(d.edad) ? d.edad : null;
      state.sexo = d.sexo || null;
      state.embarazo = d.embarazo || null;
      state.duracion = d.duracion || null;
      state.zona = ZONES.some((z) => z.id === d.zona) ? d.zona : ZONES[0].id;
      (d.sel || []).forEach(([id, i]) => { if (SYM.has(id)) state.sel.set(id, [1, 2, 3].includes(i) ? i : 2); });
    } catch (e) { /* ignorar */ }
  }

  // ───────────────────────── visibilidad de síntomas según sexo
  function visible(s) {
    if (!s.sx) return true;
    if (state.sexo === 'F' || state.sexo === 'M') return s.sx === state.sexo;
    return true;
  }
  function pregnancyRelevant() {
    if (state.sexo !== 'F') return false;
    if (state.edad === null) return true;
    return state.edad >= 11 && state.edad <= 55;
  }

  // ───────────────────────── perfil
  function bindSegments() {
    $$('.seg').forEach((group) => {
      const name = group.dataset.name;
      group.addEventListener('click', (ev) => {
        const btn = ev.target.closest('button[data-value]');
        if (!btn) return;
        const val = btn.dataset.value;
        state[name] = state[name] === val ? null : val;
        if (name === 'sexo') {
          for (const id of Array.from(state.sel.keys())) if (!visible(SYM.get(id))) state.sel.delete(id);
          if (!pregnancyRelevant()) state.embarazo = null;
        }
        renderAll();
      });
    });
    const edad = $('#edad');
    edad.addEventListener('input', () => {
      const v = parseInt(edad.value, 10);
      state.edad = Number.isFinite(v) && v >= 0 && v <= 120 ? v : null;
      if (!pregnancyRelevant()) state.embarazo = null;
      renderProfile();
      afterChange();
    });
  }

  function renderProfile() {
    const edad = $('#edad');
    if (document.activeElement !== edad) edad.value = state.edad === null ? '' : state.edad;
    $$('.seg').forEach((group) => {
      const name = group.dataset.name;
      $$('button[data-value]', group).forEach((b) => b.setAttribute('aria-pressed', String(state[name] === b.dataset.value)));
    });
    $('#field-embarazo').hidden = !pregnancyRelevant();
    $('#nota-pediatrica').hidden = !(state.edad !== null && state.edad < 15);
  }

  // ───────────────────────── catálogo por zonas
  // Una zona se muestra solo si tiene síntomas visibles (p. ej. «Regla, mamas y embarazo» se oculta si el sexo es masculino).
  function visibleZones() { return ZONES.filter((z) => SYMPTOMS.some((s) => s.z === z.id && visible(s))); }

  function renderZones() {
    const wrap = $('#zonas');
    wrap.textContent = '';
    const zones = visibleZones();
    if (!zones.some((z) => z.id === state.zona)) state.zona = zones[0].id;
    zones.forEach((z) => {
      const count = SYMPTOMS.filter((s) => s.z === z.id && state.sel.has(s.id)).length;
      const btn = el('button', {
        type: 'button', role: 'tab', class: 'zone', id: 'tab-' + z.id,
        'aria-selected': String(state.zona === z.id), 'aria-controls': 'catalogo',
        tabindex: state.zona === z.id ? '0' : '-1',
        onclick: () => { state.zona = z.id; save(); renderZones(); renderCatalog(); }
      }, [document.createTextNode(z.n), count ? el('span', { class: 'zone-count', text: String(count) }) : null]);
      wrap.append(btn);
    });
  }

  function renderCatalog() {
    const wrap = $('#catalogo');
    wrap.textContent = '';
    wrap.setAttribute('aria-labelledby', 'tab-' + state.zona);
    SYMPTOMS.filter((s) => s.z === state.zona && visible(s)).forEach((s) => {
      const on = state.sel.has(s.id);
      wrap.append(el('button', {
        type: 'button', class: 'pill sev-' + s.sev, 'aria-pressed': String(on),
        title: SEV_LABEL[s.sev],
        onclick: () => toggle(s.id)
      }, [el('span', { class: 'dot', 'aria-hidden': 'true' }), el('span', { text: s.n }), el('span', { class: 'pill-check', 'aria-hidden': 'true', text: on ? '✓' : '+' })]));
    });
  }

  // ───────────────────────── seleccionados
  function renderSelected() {
    const wrap = $('#seleccionados');
    wrap.textContent = '';
    const items = Array.from(state.sel.entries()).map(([id, i]) => [SYM.get(id), i]);
    $('#sel-count').textContent = items.length ? `(${items.length})` : '';
    $('#sel-empty').hidden = items.length > 0;
    // orden: alarma primero
    items.sort((a, b) => (b[0].sev || 0) - (a[0].sev || 0));
    items.forEach(([s, i]) => {
      const intensity = s.sev === 0 ? el('span', { class: 'ctx-tag', text: 'Contexto' }) : el('div', { class: 'intensity', role: 'radiogroup', 'aria-label': 'Intensidad de ' + s.n },
        [1, 2, 3].map((n) => el('button', {
          type: 'button', role: 'radio', class: 'int int-' + n, 'aria-checked': String(i === n),
          onclick: () => { state.sel.set(s.id, n); renderSelected(); afterChange(); }
        }, [el('span', { class: 'bars', 'aria-hidden': 'true' }, [el('i'), el('i'), el('i')]), document.createTextNode(INTENSITY[n].label)])));
      wrap.append(el('div', { class: 'sel sev-' + s.sev }, [
        el('span', { class: 'dot', 'aria-hidden': 'true' }),
        el('div', { class: 'sel-main' }, [
          el('span', { class: 'sel-name', text: s.n }),
          el('span', { class: 'sel-sev', text: SEV_LABEL[s.sev] })
        ]),
        intensity,
        el('button', { type: 'button', class: 'x', 'aria-label': 'Quitar ' + s.n, title: 'Quitar', onclick: () => toggle(s.id) }, [document.createTextNode('×')])
      ]));
    });
    $('#analizar').disabled = items.length === 0;
  }

  function toggle(id) {
    if (state.sel.has(id)) state.sel.delete(id);
    else state.sel.set(id, 2);
    renderZones();
    renderCatalog();
    renderSelected();
    afterChange();
  }

  // ───────────────────────── buscador con autocompletado
  const INDEX = SYMPTOMS.map((s) => ({ s, name: norm(s.n), hay: norm([s.n].concat(s.syn).join(' | ')), syn: s.syn.map(norm) }));
  let suggestions = [];
  let active = -1;

  function search(q) {
    const nq = norm(q);
    if (nq.length < 2) return [];
    const tokens = nq.split(' ');
    const out = [];
    for (const it of INDEX) {
      if (!visible(it.s)) continue;
      if (!tokens.every((t) => it.hay.includes(t))) continue;
      let score = 1;
      if (it.name.startsWith(nq)) score = 5;
      else if (it.syn.some((x) => x.startsWith(nq))) score = 4;
      else if (it.name.split(' ').some((w) => w.startsWith(tokens[0]))) score = 3;
      else if (it.hay.includes(nq)) score = 2;
      out.push([score, it.s]);
    }
    out.sort((a, b) => b[0] - a[0] || a[1].n.localeCompare(b[1].n));
    return out.slice(0, 10).map((x) => x[1]);
  }

  function renderSuggestions() {
    const list = $('#sugerencias');
    const input = $('#buscar');
    list.textContent = '';
    const q = input.value;
    if (norm(q).length < 2) { list.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
    if (!suggestions.length) {
      list.append(el('li', { class: 'sug-empty', role: 'option', 'aria-disabled': 'true', text: 'No encontramos ese síntoma. Prueba con otras palabras o explora por zona.' }));
    }
    suggestions.forEach((s, idx) => {
      const on = state.sel.has(s.id);
      list.append(el('li', {
        role: 'option', id: 'sug-' + s.id, class: 'sug sev-' + s.sev + (idx === active ? ' active' : ''),
        'aria-selected': String(idx === active),
        onmousedown: (e) => { e.preventDefault(); pick(s); }
      }, [
        el('span', { class: 'dot', 'aria-hidden': 'true' }),
        el('span', { class: 'sug-name', text: s.n }),
        el('span', { class: 'sug-meta', text: on ? 'Agregado ✓' : SEV_LABEL[s.sev] })
      ]));
    });
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    input.setAttribute('aria-activedescendant', active >= 0 && suggestions[active] ? 'sug-' + suggestions[active].id : '');
  }

  function pick(s) {
    if (!state.sel.has(s.id)) toggle(s.id);
    const input = $('#buscar');
    input.value = '';
    suggestions = [];
    active = -1;
    renderSuggestions();
    state.zona = s.z;
    renderZones();
    renderCatalog();
    const tab = $('#tab-' + s.z);
    if (tab) tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    input.focus();
  }

  function bindSearch() {
    const input = $('#buscar');
    input.addEventListener('input', () => { suggestions = search(input.value); active = suggestions.length ? 0 : -1; renderSuggestions(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && suggestions.length) { e.preventDefault(); active = (active + 1) % suggestions.length; renderSuggestions(); }
      else if (e.key === 'ArrowUp' && suggestions.length) { e.preventDefault(); active = (active - 1 + suggestions.length) % suggestions.length; renderSuggestions(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (suggestions[active]) pick(suggestions[active]); }
      else if (e.key === 'Escape') { input.value = ''; suggestions = []; renderSuggestions(); }
    });
    input.addEventListener('blur', () => setTimeout(() => { $('#sugerencias').hidden = true; input.setAttribute('aria-expanded', 'false'); }, 120));
    input.addEventListener('focus', () => { if (input.value) { suggestions = search(input.value); renderSuggestions(); } });
  }

  // ───────────────────────── motor de coincidencias
  function ageFactor(c) {
    if (state.edad === null || !c.age) return 1;
    for (const [min, max, f] of c.age) if (state.edad >= min && state.edad <= max) return f;
    return 1;
  }

  function scoreCondition(c) {
    if (c.sex && (state.sexo === 'F' || state.sexo === 'M') && state.sexo !== c.sex) return null;
    if (c.ageRange && state.edad !== null && (state.edad < c.ageRange[0] || state.edad > c.ageRange[1])) return null;

    let matched = 0; let neg = 0; let keyTotal = 0; let keyHit = 0; let specKeyTotal = 0; let specKeyHit = 0;
    const hits = []; const against = []; const pos = [];
    for (const [id, w] of Object.entries(c.s)) {
      const isKey = w >= 3;
      const isSpec = isKey && !GENERIC.has(id);
      if (w > 0) pos.push(w);
      if (isKey) keyTotal++;
      if (isSpec) specKeyTotal++;
      if (!state.sel.has(id)) continue;
      const s = SYM.get(id);
      const f = s.sev === 0 ? 1 : INTENSITY[state.sel.get(id)].f;
      if (w > 0) { matched += w * f; hits.push(id); if (isKey) keyHit++; if (isSpec) specKeyHit++; }
      else { neg += -w; against.push(id); }
    }
    if (!hits.length) return null;

    pos.sort((a, b) => b - a);
    const denom = pos.slice(0, 6).reduce((a, b) => a + b, 0);
    const coverage = Math.min(1, matched / denom); // ¿cuánto del cuadro típico tienes?
    // ¿cuánto de lo tuyo explica este cuadro? Los síntomas inespecíficos pesan la mitad.
    let selW = 0;
    for (const id of state.sel.keys()) selW += specW(id);
    const explained = hits.reduce((a, id) => a + specW(id), 0) / selW;
    let score = Math.pow(coverage, 0.8) * (0.5 + 0.5 * explained);
    const notes = [];

    if (keyTotal && !keyHit) score *= 0.5;
    else if (specKeyTotal && !specKeyHit) score *= 0.6;
    const pregnancyKnown = c.preg && state.sexo === 'F' && state.embarazo === 'si';
    if (c.req && !c.req.some((id) => state.sel.has(id)) && !pregnancyKnown) {
      score *= c.reqF;
      const names = c.req.map((id) => SYM.get(id).n.toLowerCase());
      notes.push(names.length > 2 ? 'no marcaste síntomas clave como ' + names.slice(0, 2).join(' o ') : 'no marcaste ' + names.join(' ni '));
    }
    if (neg) { score *= Math.max(0.25, 1 - 0.15 * neg); notes.push('algunos síntomas no calzan con este cuadro'); }

    const af = ageFactor(c);
    score *= af;
    if (af > 1.05) notes.push('más frecuente a tu edad');
    else if (af < 0.95) notes.push('menos frecuente a tu edad');

    if (state.sexo === 'F' && c.sexF) { score *= c.sexF; if (c.sexF > 1) notes.push('más frecuente en mujeres'); }
    if (state.sexo === 'M' && c.sexM) { score *= c.sexM; if (c.sexM > 1) notes.push('más frecuente en hombres'); else notes.push('menos frecuente en hombres'); }

    if (c.preg && state.sexo === 'F') {
      if (state.embarazo === 'no') { score *= 0.15; notes.push('indicaste que no hay posibilidad de embarazo'); }
      else if (state.embarazo === 'si') { score *= 1.4; notes.push('indicaste posible embarazo'); }
    }

    if (state.duracion && c.dur) {
      const di = DUR_ORDER.indexOf(state.duracion);
      const dist = Math.min(...c.dur.map((d) => Math.abs(DUR_ORDER.indexOf(d) - di)));
      const df = dist === 0 ? 1 : dist === 1 ? 0.75 : 0.5;
      score *= df;
      if (df < 1) notes.push('la duración no es la habitual');
    }

    score *= c.prev || 1;
    return { c, score, hits, against, keyHit: specKeyHit || keyHit, notes };
  }

  function analyze() {
    const all = CONDITIONS.map(scoreCondition).filter(Boolean);
    all.sort((a, b) => b.score - a.score);
    const main = all.filter((r) => r.score >= 0.12).slice(0, MAX_MAIN);
    // Una emergencia con un síntoma clave específico nunca queda escondida: se agrega al final de la lista principal.
    all.filter((r) => !main.includes(r) && r.c.urg === 5 && r.keyHit && r.score >= 0.08).slice(0, 2).forEach((r) => main.push(r));
    const extra = all.filter((r) => !main.includes(r) && r.score >= 0.06).slice(0, MAX_EXTRA);
    return { main, extra };
  }

  // ───────────────────────── resultados
  // Escala suave: nunca llega a 100 % porque esto no es un diagnóstico.
  function pct(score) { return Math.max(3, Math.min(95, Math.round(100 * (1 - Math.exp(-2.2 * score))))); }
  function level(score) { const p = pct(score); return p >= 70 ? 'Alta' : p >= 45 ? 'Media' : 'Baja'; }

  function redFlags() { return Array.from(state.sel.keys()).map((id) => SYM.get(id)).filter((s) => s.sev === 3); }

  // Síntomas de alarma que nunca se rebajan, aunque los explique otra causa.
  const NEVER_DOWNGRADE = new Set(['ideas_suicidas']);

  function overallUrgency(main) {
    let u = main.length ? main[0].c.urg : 2;
    // otras causas casi tan probables como la primera también cuentan
    main.slice(1, 3).forEach((r) => { if (r.score >= 0.4 && r.score >= main[0].score * 0.8) u = Math.max(u, r.c.urg); });
    // una emergencia con coincidencia «Alta» entre las 3 primeras siempre sube la recomendación
    main.slice(0, 3).forEach((r) => { if (r.c.urg === 5 && pct(r.score) >= 70) u = 5; });
    const flags = redFlags();
    if (flags.length) {
      // Si la causa principal es clara y explica los síntomas de alarma, no se fuerza «Emergencia»:
      //  · cuadro agudo: el síntoma de alarma debe ser característico (p. ej. desmayo → desmayo vasovagal);
      //  · síntomas de semanas o meses: basta con que la causa principal lo incluya (p. ej. equilibrio → Parkinson).
      // El aviso rojo se muestra igual en ambos casos.
      const top = main[0];
      const chronic = state.duracion === 's' || state.duracion === 'm';
      const explained = top && flags.every((s) => !NEVER_DOWNGRADE.has(s.id) && (top.c.s[s.id] || 0) >= (chronic ? 1 : 3));
      const typicalOfTop = explained && top.score >= (chronic ? 0.6 : 0.75);
      u = typicalOfTop ? Math.max(u, 3) : Math.max(u, ...flags.map((s) => s.em));
    }
    else if (Array.from(state.sel.entries()).some(([id, i]) => SYM.get(id).sev === 2 && i === 3)) u = Math.max(u, 3);
    return u;
  }

  function sourceLinks(ids) {
    return el('ul', { class: 'src-list' }, ids.map((id) => {
      const [org, title, url] = SOURCES[id];
      return el('li', null, [el('a', { href: url, target: '_blank', rel: 'noopener', text: title }), el('span', { class: 'src-org', text: ' · ' + org })]);
    }));
  }

  function conditionCard(r, idx, compact) {
    const c = r.c;
    const bodyId = 'cond-body-' + c.id;
    const p = pct(r.score);
    const body = el('div', { class: 'cond-body', id: bodyId, hidden: true }, [
      el('div', { class: 'why' }, [
        el('span', { class: 'why-label', text: 'Coincide con lo que marcaste:' }),
        el('div', { class: 'chips' }, r.hits.map((id) => { const s = SYM.get(id); return el('span', { class: 'chip sev-' + s.sev }, [el('span', { class: 'dot', 'aria-hidden': 'true' }), document.createTextNode(s.n)]); })),
        r.against.length ? el('p', { class: 'why-against', text: 'No calza del todo: ' + r.against.map((id) => SYM.get(id).n.toLowerCase()).join(', ') + '.' }) : null,
        r.notes.length ? el('p', { class: 'why-notes', text: 'Ajustes: ' + r.notes.join(' · ') + '.' }) : null
      ]),
      c.nota ? el('p', { class: 'nota', text: c.nota }) : null,
      el('div', { class: 'block' }, [el('h4', { text: '¿Qué es?' }), el('p', { text: c.que })]),
      el('div', { class: 'block' }, [el('h4', { text: '¿Cómo se trata habitualmente?' }), el('p', { text: c.trat })]),
      el('div', { class: 'block' }, [el('h4', { text: '¿A qué especialista acudir?' }), el('p', { text: c.esp })]),
      c.ges ? el('p', { class: 'ges' }, [el('strong', { text: 'GES · ' }), document.createTextNode(c.ges)]) : null,
      el('div', { class: 'block warn' }, [el('h4', { text: 'Busca atención urgente si…' }), el('p', { text: c.alarma })]),
      el('div', { class: 'block sources' }, [el('h4', { text: 'Fuentes' }), sourceLinks(c.src)])
    ]);

    const head = el('button', {
      type: 'button', class: 'cond-head', 'aria-expanded': 'false', 'aria-controls': bodyId,
      onclick: (e) => {
        const open = e.currentTarget.getAttribute('aria-expanded') === 'true';
        e.currentTarget.setAttribute('aria-expanded', String(!open));
        body.hidden = open;
      }
    }, [
      el('div', { class: 'cond-top' }, [
        el('div', { class: 'cond-title' }, [
          el('h3', { text: c.n }),
          c.alt ? el('span', { class: 'cond-alt', text: c.alt }) : null
        ]),
        el('span', { class: 'badge urg-' + c.urg, text: URGENCY[c.urg].label })
      ]),
      compact ? null : el('div', { class: 'meter-row' }, [
        el('div', { class: 'meter', role: 'img', 'aria-label': `Coincidencia ${p}%` }, [el('span', { style: `width:${p}%` })]),
        el('span', { class: 'pct', text: `${p}% · ${level(r.score)}` })
      ]),
      el('span', { class: 'more', 'aria-hidden': 'true', text: 'Ver detalle' })
    ]);

    return el('article', { class: 'cond urg-' + c.urg + (compact ? ' compact' : ''), style: `--i:${idx}` }, [head, body]);
  }

  function renderResults() {
    const wrap = $('#resultados');
    wrap.textContent = '';
    if (!state.sel.size) { wrap.hidden = true; return; }
    const { main, extra } = analyze();
    const flags = redFlags();
    const suicide = state.sel.has('ideas_suicidas');
    const u = overallUrgency(main);

    wrap.append(el('div', { class: 'results-head' }, [
      el('h2', { text: 'Posibles causas' }),
      el('p', { text: 'Ordenadas según cuánto coinciden con lo que marcaste. El porcentaje indica coincidencia, no probabilidad de diagnóstico.' })
    ]));

    if (suicide) {
      wrap.append(el('div', { class: 'alert alert-lav', role: 'alert' }, [
        el('strong', { text: 'No estás solo/a. Hablar ayuda.' }),
        el('p', { html: 'Llama gratis al <a href="tel:*4141">*4141</a> (línea de prevención del suicidio del MINSAL, 24 horas, desde celulares) o al SAMU <a href="tel:131">131</a> si estás en peligro inmediato. También puedes acudir a cualquier servicio de urgencia.' })
      ]));
    }
    if (flags.length) {
      const call = flags.some((s) => s.em === 5);
      wrap.append(el('div', { class: 'alert alert-red', role: 'alert' }, [
        el('strong', { text: 'Marcaste síntomas de alarma' }),
        el('p', { text: flags.map((s) => s.n).join(' · ') }),
        el('p', {
          html: call
            ? 'Si aparecieron de golpe, son intensos o van empeorando, <b>llama al SAMU <a href="tel:131">131</a></b> o acude de inmediato al servicio de urgencia más cercano. No esperes a ver si pasa.'
            : 'Acude <b>de inmediato</b> a un servicio de urgencia (SAPU, SAR o urgencia hospitalaria). Si empeoran o aparecen otros síntomas de alarma, llama al SAMU <a href="tel:131">131</a>.'
        })
      ]));
    }

    wrap.append(el('div', { class: 'summary urg-' + u }, [
      el('span', { class: 'summary-label', text: 'Recomendación general' }),
      el('strong', { text: URGENCY[u].label }),
      el('p', { text: URGENCY[u].desc })
    ]));

    if (!main.length) {
      wrap.append(el('div', { class: 'empty-results' }, [
        el('p', { text: 'No encontramos una coincidencia clara con nuestra base de enfermedades. Agrega más síntomas o, si te sientes mal, consulta con un profesional de salud. Salud Responde (600 360 7777) puede orientarte las 24 horas.' })
      ]));
    } else {
      const list = el('div', { class: 'cond-list' });
      main.forEach((r, i) => list.append(conditionCard(r, i, false)));
      wrap.append(list);
    }

    if (extra.length) {
      const det = el('details', { class: 'extra' }, [el('summary', { text: `Otras posibilidades menos probables (${extra.length})` })]);
      const list = el('div', { class: 'cond-list' });
      extra.forEach((r, i) => list.append(conditionCard(r, i, true)));
      det.append(list);
      wrap.append(det);
    }

    wrap.append(el('div', { class: 'results-actions' }, [
      el('button', { type: 'button', class: 'btn soft', onclick: copySummary }, [document.createTextNode('Copiar resumen para tu médico')]),
      el('button', { type: 'button', class: 'btn ghost', onclick: () => window.print() }, [document.createTextNode('Imprimir')]),
      el('span', { class: 'copy-ok', id: 'copy-ok', role: 'status', 'aria-live': 'polite' })
    ]));

    wrap.append(el('p', { class: 'disclaimer', text: 'Sintomatología es una herramienta educativa de orientación. No entrega diagnósticos ni reemplaza la evaluación de un profesional de salud. Si tienes dudas, consulta.' }));
    wrap.hidden = false;
  }

  function summaryText() {
    const { main } = analyze();
    const lines = ['Resumen de síntomas (Sintomatología)'];
    const perfil = [];
    if (state.edad !== null) perfil.push(`Edad: ${state.edad}`);
    if (state.sexo) perfil.push(`Sexo: ${SEX_LABEL[state.sexo]}`);
    if (state.embarazo && pregnancyRelevant()) perfil.push(`Posible embarazo: ${{ si: 'sí', no: 'no', nose: 'no sé' }[state.embarazo]}`);
    if (state.duracion) perfil.push(`Inicio hace: ${DUR_LABEL[state.duracion]}`);
    if (perfil.length) lines.push(perfil.join(' · '));
    lines.push('', 'Síntomas:');
    Array.from(state.sel.entries()).forEach(([id, i]) => {
      const s = SYM.get(id);
      lines.push(`- ${s.n}${s.sev === 0 ? ' (contexto)' : ` (${INTENSITY[i].label.toLowerCase()})`}`);
    });
    if (main.length) {
      lines.push('', 'Posibles causas orientativas:');
      main.forEach((r) => lines.push(`- ${r.c.n} — ${pct(r.score)}% coincidencia`));
    }
    lines.push('', 'Generado como orientación; no es un diagnóstico.', `Sintomatología · © ${new Date().getFullYear() > 2026 ? '2026–' + new Date().getFullYear() : '2026'} ${OWNER}`);
    return lines.join('\n');
  }

  function copySummary() {
    const text = summaryText();
    const ok = () => { const o = $('#copy-ok'); if (o) { o.textContent = 'Copiado ✓'; setTimeout(() => { o.textContent = ''; }, 2400); } };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(ok, () => fallbackCopy(text, ok));
    } else fallbackCopy(text, ok);
  }
  function fallbackCopy(text, ok) {
    const ta = el('textarea', { style: 'position:fixed;opacity:0' });
    ta.value = text;
    document.body.append(ta);
    ta.select();
    try { document.execCommand('copy'); ok(); } catch (e) { /* nada */ }
    ta.remove();
  }

  // ───────────────────────── ciclo
  function afterChange() {
    save();
    if (state.analizado) renderResults();
  }
  function renderAll() {
    renderProfile();
    renderZones();
    renderCatalog();
    renderSelected();
    afterChange();
  }

  function renderSourcesIndex() {
    const byOrg = {};
    Object.values(SOURCES).forEach(([org]) => { byOrg[org] = (byOrg[org] || 0) + 1; });
    $('#fuentes-resumen').textContent = Object.entries(byOrg).map(([o, n]) => `${o} (${n})`).join(' · ');
    $('#stats').textContent = `${SYMPTOMS.length} síntomas · ${CONDITIONS.length} enfermedades · ${Object.keys(SOURCES).length} referencias`;
    $('#hero-stats').textContent = `${CONDITIONS.length} enfermedades · ${SYMPTOMS.length} síntomas · fuentes: OMS, OPS, MedlinePlus (NIH), Mayo Clinic, MINSAL y clínicas chilenas`;
  }

  function init() {
    load();
    const year = new Date().getFullYear();
    const cy = $('#copy-year');
    if (cy && year > 2026) cy.textContent = '2026–' + year;
    bindSegments();
    bindSearch();
    renderSourcesIndex();

    $('#analizar').addEventListener('click', () => {
      state.analizado = true;
      renderResults();
      const r = $('#resultados');
      r.focus({ preventScroll: true });
      r.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    });
    $('#reiniciar').addEventListener('click', () => {
      state.edad = null; state.sexo = null; state.embarazo = null; state.duracion = null;
      state.sel.clear(); state.analizado = false; state.zona = ZONES[0].id;
      $('#edad').value = '';
      $('#resultados').hidden = true;
      renderAll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // navegación con flechas entre pestañas de zonas
    $('#zonas').addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const zones = visibleZones();
      const i = zones.findIndex((z) => z.id === state.zona);
      const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + zones.length) % zones.length;
      state.zona = zones[n].id;
      save(); renderZones(); renderCatalog();
      $('#tab-' + state.zona).focus();
    });

    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
