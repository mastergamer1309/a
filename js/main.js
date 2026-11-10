/* Sala de la Memoria Nacional · interfaz */
(() => {
  'use strict';

  const { ERAS, PEOPLE, TIMELINE } = window.SALA;
  const Art = window.SalaArt;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const byId = Object.fromEntries(PEOPLE.map(p => [p.id, p]));
  const eraOf = id => ERAS.find(e => e.id === id);
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const TYPE_LABEL = { martir: 'Mártir', influencia: 'Influencia' };
  const FLAME = '<svg viewBox="0 0 24 32" aria-hidden="true"><path d="M12 1C12 9 20 12 20 21a8 8 0 0 1-16 0C4 14 10 11 12 1z"/></svg>';

  /* ---------------------------------------------------------------
     Velas encendidas (se guardan en el navegador)
     --------------------------------------------------------------- */
  const KEY = 'sala-memoria:velas';
  const loadLit = () => {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]').filter(id => byId[id])); }
    catch { return new Set(); }
  };
  const saveLit = () => { try { localStorage.setItem(KEY, JSON.stringify([...lit])); } catch { /* sin almacenamiento */ } };
  const lit = loadLit();

  /* ---------------------------------------------------------------
     Portada: título letra por letra
     --------------------------------------------------------------- */
  const heroTitle = $('#heroTitle');
  (function splitTitle() {
    let i = 0;
    $$('[data-split]', heroTitle).forEach(line => {
      const text = line.textContent.trim();
      line.setAttribute('aria-hidden', 'true');
      line.textContent = '';
      text.split(' ').forEach((word, w, all) => {
        const span = document.createElement('span');
        span.className = 'word';
        for (const chr of word) {
          const c = document.createElement('span');
          c.className = 'ch';
          c.style.setProperty('--i', i++);
          c.textContent = chr;
          span.appendChild(c);
        }
        line.appendChild(span);
        if (w < all.length - 1) line.appendChild(document.createTextNode(' '));
      });
    });
    heroTitle.classList.add('split');
  })();

  /* ---------------------------------------------------------------
     Luciérnagas (canvas)
     --------------------------------------------------------------- */
  (function fireflies() {
    const canvas = $('#fireflies');
    const ctx = canvas.getContext('2d');
    if (!ctx || reduceMotion) { canvas.remove(); return; }

    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const sc = sprite.getContext('2d');
    const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,240,170,1)');
    g.addColorStop(.22, 'rgba(255,205,100,.6)');
    g.addColorStop(1, 'rgba(255,170,60,0)');
    sc.fillStyle = g;
    sc.fillRect(0, 0, 64, 64);

    let w = 0, h = 0, flies = [], last = 0;
    const spawn = (anywhere = true) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 20,
      r: 5 + Math.random() * 13,
      vy: -(5 + Math.random() * 15),
      vx: (Math.random() - .5) * 10,
      ph: Math.random() * 6.28,
      sp: .5 + Math.random() * 1.3,
      a: .35 + Math.random() * .6
    });
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(clamp(w * h / 26000, 18, 70));
      while (flies.length < n) flies.push(spawn());
      flies.length = n;
    }
    function frame(t) {
      const dt = Math.min(.05, (t - last) / 1000 || 0);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        f.ph += dt * f.sp;
        f.x += (f.vx + Math.sin(f.ph * 1.7) * 14) * dt;
        f.y += f.vy * dt;
        if (f.y < -30 || f.x < -30 || f.x > w + 30) Object.assign(f, spawn(false));
        const tw = .5 + .5 * Math.sin(f.ph * 2.2);
        ctx.globalAlpha = f.a * (.25 + .75 * tw);
        ctx.drawImage(sprite, f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
      }
      requestAnimationFrame(frame);
    }
    resize();
    addEventListener('resize', resize);
    requestAnimationFrame(frame);
  })();

  /* ---------------------------------------------------------------
     Scroll: progreso, nav, parallax, línea del tiempo
     --------------------------------------------------------------- */
  const nav = $('#nav');
  const progress = $('#progress');
  const layers = $$('.layer[data-near]');
  const heroContent = $('#heroContent');
  const timeline = $('#timeline');
  let mx = 0, my = 0, ticking = false;

  function update() {
    ticking = false;
    const sy = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--sp', max > 0 ? (sy / max).toFixed(4) : 0);
    nav.classList.toggle('solid', sy > 40);

    if (sy < innerHeight * 1.2 && !reduceMotion) {
      layers.forEach(l => {
        const near = +l.dataset.near;
        const x = -mx * near * 26;
        const y = sy * (0.5 - near * 0.45) - my * near * 12;
        l.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      const k = clamp(sy / (innerHeight * .7), 0, 1);
      heroContent.style.opacity = (1 - k).toFixed(3);
      heroContent.style.transform = `translateY(${(sy * .22).toFixed(1)}px)`;
    }

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = clamp((innerHeight * .6 - r.top) / r.height, 0, 1);
      timeline.style.setProperty('--p', p.toFixed(4));
    }
  }
  const schedule = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);

  if (finePointer) {
    const spot = $('.spot');
    addEventListener('pointermove', e => {
      spot.style.setProperty('--mx', e.clientX + 'px');
      spot.style.setProperty('--my', e.clientY + 'px');
      mx = e.clientX / innerWidth - .5;
      my = e.clientY / innerHeight - .5;
      if (scrollY < innerHeight) schedule();
    }, { passive: true });
  }

  /* aparición al entrar en pantalla */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  const observeReveals = (root = document) => $$('.reveal:not(.in), .tl:not(.in)', root).forEach(el => revealIO.observe(el));

  /* enlace activo del menú */
  const links = $$('.link');
  const secIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const id = en.target.id === 'entrada' ? 'inicio' : en.target.id;
      links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['inicio', 'entrada', 'galeria', 'tiempo', 'velas'].forEach(id => { const el = document.getElementById(id); if (el) secIO.observe(el); });

  /* ---------------------------------------------------------------
     Estadísticas con cuenta animada
     --------------------------------------------------------------- */
  (function stats() {
    const martires = PEOPLE.filter(p => p.tipo === 'martir').length;
    const infl = PEOPLE.length - martires;
    const rows = [
      [martires, 'mártires y memoriales'],
      [infl, 'influencias nacionales'],
      [ERAS.length, 'épocas de la historia'],
      [500, 'años de historia', '+']
    ];
    const ul = $('#stats');
    ul.innerHTML = rows.map(([n, label, suf = '']) =>
      `<li class="reveal" style="--d:${rows.indexOf(rows.find(r => r[1] === label)) + 4}"><b data-count="${n}" data-suf="${suf}">0${suf}</b><span>${label}</span></li>`).join('');
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const b = $('b', en.target);
        const target = +b.dataset.count, suf = b.dataset.suf;
        if (reduceMotion) { b.textContent = target + suf; return; }
        const t0 = performance.now(), dur = 1600;
        const step = t => {
          const k = clamp((t - t0) / dur, 0, 1);
          b.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suf;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: .6 });
    $$('li', ul).forEach(li => io.observe(li));
  })();

  /* ---------------------------------------------------------------
     Galería
     --------------------------------------------------------------- */
  const state = { type: 'todos', era: 0, q: '' };
  let visible = [];

  // chips de época
  const eraChips = $('#eraChips');
  eraChips.innerHTML =
    `<button class="chip" type="button" data-era="0" aria-pressed="true">Todas las épocas</button>` +
    ERAS.map(e => `<button class="chip" type="button" data-era="${e.id}" aria-pressed="false" title="${e.rango}">${e.nombre}</button>`).join('');

  const seg = $('#seg');
  function moveThumb() {
    const on = $('button[aria-pressed="true"]', seg);
    if (!on) return;
    seg.style.setProperty('--x', on.offsetLeft + 'px');
    seg.style.setProperty('--w', on.offsetWidth + 'px');
  }

  const matches = p => {
    if (state.type !== 'todos' && p.tipo !== state.type) return false;
    if (state.era && p.era !== state.era) return false;
    if (state.q) {
      const hay = norm([p.nombre, p.rol, p.resumen, p.anios, p.bio.join(' ')].join(' '));
      if (!state.q.split(/\s+/).every(w => hay.includes(w))) return false;
    }
    return true;
  };

  function nicheHTML(p, i) {
    return `<li class="niche reveal" data-type="${p.tipo}" style="--h:${p.hue};--d:${i % 4}">
      <button class="niche__btn${lit.has(p.id) ? ' is-lit' : ''}" type="button" data-id="${p.id}" aria-label="Abrir la ficha de ${p.nombre}">
        <span class="niche__frame">
          <span class="niche__flame" aria-hidden="true">${FLAME}</span>
          <span class="niche__window">${Art.portrait(p)}<span class="niche__sum">${p.resumen}</span></span>
        </span>
        <span class="niche__plaque">
          <span class="niche__type">${TYPE_LABEL[p.tipo]}</span>
          <strong class="niche__name">${p.nombre}</strong>
          <span class="niche__years">${p.anios}</span>
        </span>
      </button>
    </li>`;
  }

  function renderGallery() {
    const list = PEOPLE.filter(matches);
    visible = [];
    ['martir', 'influencia'].forEach(tipo => {
      const hall = $('#hall-' + tipo);
      const items = list.filter(p => p.tipo === tipo);
      hall.hidden = items.length === 0;
      $('.niches', hall).innerHTML = items.map((p, i) => nicheHTML(p, i)).join('');
      visible.push(...items);
    });
    $('#empty').hidden = list.length > 0;
    $('#count').textContent = list.length === PEOPLE.length
      ? `${PEOPLE.length} personas y memoriales en la sala`
      : `Mostrando ${list.length} de ${PEOPLE.length}`;
    observeReveals($('#galeria'));
  }

  // filtros
  seg.addEventListener('click', e => {
    const b = e.target.closest('button[data-type]');
    if (!b) return;
    state.type = b.dataset.type;
    $$('button', seg).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    moveThumb();
    renderGallery();
  });
  eraChips.addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (!b) return;
    state.era = +b.dataset.era;
    $$('.chip', eraChips).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderGallery();
  });
  let qTimer;
  $('#q').addEventListener('input', e => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { state.q = norm(e.target.value.trim()); renderGallery(); }, 160);
  });
  addEventListener('resize', moveThumb);

  // clic e inclinación 3D (delegación)
  const gallery = $('#galeria');
  gallery.addEventListener('click', e => {
    const b = e.target.closest('.niche__btn');
    if (b) openDialog(b.dataset.id);
  });
  if (finePointer && !reduceMotion) {
    gallery.addEventListener('pointermove', e => {
      const b = e.target.closest('.niche__btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      b.style.setProperty('--rx', ((.5 - y) * 11).toFixed(2) + 'deg');
      b.style.setProperty('--ry', ((x - .5) * 13).toFixed(2) + 'deg');
      b.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      b.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });
    gallery.addEventListener('pointerout', e => {
      const b = e.target.closest('.niche__btn');
      if (b && !b.contains(e.relatedTarget)) { b.style.removeProperty('--rx'); b.style.removeProperty('--ry'); }
    });
  }

  /* ---------------------------------------------------------------
     Línea del tiempo
     --------------------------------------------------------------- */
  timeline.innerHTML = TIMELINE.map(ev => `
    <article class="tl" data-type="${ev.tipo}">
      <span class="tl__dot"></span>
      <div class="tl__card">
        <span class="tl__year">${ev.anio}</span>
        <h3>${ev.titulo}</h3>
        <p>${ev.texto}</p>
        ${ev.personas && ev.personas.length ? `<div class="tl__chips">${ev.personas.map(id => `<button class="chip" type="button" data-open="${id}">${byId[id].corto}</button>`).join('')}</div>` : ''}
      </div>
    </article>`).join('') + '<div class="timeline__fill" aria-hidden="true"></div>';
  timeline.addEventListener('click', e => {
    const b = e.target.closest('[data-open]');
    if (b) openDialog(b.dataset.open);
  });

  /* ---------------------------------------------------------------
     Altar de velas
     --------------------------------------------------------------- */
  const candles = $('#candles');
  candles.innerHTML = PEOPLE.map(p => `
    <button class="candle${lit.has(p.id) ? ' lit' : ''}" type="button" data-id="${p.id}" aria-pressed="${lit.has(p.id)}" aria-label="Vela por ${p.nombre}">
      <span class="candle__body"><span class="cflame"></span></span>
      <span class="candle__label">${p.corto}</span>
    </button>`).join('');
  candles.addEventListener('click', e => {
    const b = e.target.closest('.candle');
    if (b) setLit(b.dataset.id, !lit.has(b.dataset.id));
  });

  const litAll = $('#litAll');
  litAll.addEventListener('click', () => {
    if (lit.size === PEOPLE.length) {
      PEOPLE.forEach(p => setLit(p.id, false));
      return;
    }
    PEOPLE.filter(p => !lit.has(p.id)).forEach((p, i) => setTimeout(() => setLit(p.id, true), reduceMotion ? 0 : i * 110));
  });

  function updateAltar() {
    const n = lit.size;
    $('#litCount').textContent = n;
    $('#altar').style.setProperty('--glow', (n / PEOPLE.length).toFixed(3));
    litAll.textContent = n === PEOPLE.length ? 'Apagar todas' : 'Encender todas';
    $('#altarMsg').textContent = n === PEOPLE.length
      ? 'Hoy, cada llama recuerda a quienes hicieron Nicaragua.'
      : n === 0 ? '' : 'Cada vela es un gracias.';
  }

  function setLit(id, on) {
    if (on) lit.add(id); else lit.delete(id);
    saveLit();
    $$(`.niche__btn[data-id="${id}"]`).forEach(b => b.classList.toggle('is-lit', on));
    const c = $(`.candle[data-id="${id}"]`);
    if (c) { c.classList.toggle('lit', on); c.setAttribute('aria-pressed', String(on)); }
    if (dlg.open && dlgIndex >= 0 && navList[dlgIndex].id === id) syncLightButton();
    updateAltar();
  }

  /* ---------------------------------------------------------------
     Ficha (diálogo)
     --------------------------------------------------------------- */
  const dlg = $('#dlg');
  let navList = PEOPLE;
  let dlgIndex = -1;
  let tourOn = false;
  let tourTimer = null;
  const TOUR_MS = 14000;

  function openDialog(id) {
    navList = visible.some(p => p.id === id) ? visible : PEOPLE;
    dlgIndex = navList.findIndex(p => p.id === id);
    if (dlgIndex < 0) return;
    fillDialog();
    if (!dlg.open) dlg.showModal();
  }

  function fillDialog() {
    const p = navList[dlgIndex];
    const era = eraOf(p.era);
    let k = 0;
    dlg.innerHTML = `
      <div class="dlg" style="--h:${p.hue}">
        ${tourOn ? `<div class="dlg__tour" aria-hidden="true"><i style="--t:${TOUR_MS}ms"></i></div>` : ''}
        <button class="round dlg__close" type="button" data-act="close" aria-label="Cerrar ficha">
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="dlg__grid">
          <div class="dlg__art">
            <span class="niche__frame"><span class="niche__window">${Art.portrait(p)}</span></span>
          </div>
          <div class="dlg__body">
            <p class="dlg__badge ${p.tipo}" style="--k:${k++}"><i></i>${TYPE_LABEL[p.tipo]} · ${era.nombre}</p>
            <h3 class="dlg__title" id="dlgTitle" style="--k:${k++}">${p.nombre}</h3>
            <p class="dlg__meta" style="--k:${k++}">${p.anios} · ${p.rol}</p>
            <p class="dlg__lead" style="--k:${k++}">${p.resumen}</p>
            <div class="dlg__bio" style="--k:${k++}">${p.bio.map(t => `<p>${t}</p>`).join('')}</div>
            <dl class="facts" style="--k:${k++}">${p.datos.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
            ${p.frase ? `<blockquote class="dlg__quote" style="--k:${k++}">«${p.frase.t}»<cite>${p.frase.a}</cite></blockquote>` : ''}
            <div class="dlg__actions" style="--k:${k++}">
              <button class="btn btn--flame" type="button" data-act="light" id="lightBtn" aria-pressed="false"></button>
              <button class="btn btn--ghost" type="button" data-act="tour" aria-pressed="${tourOn}">${tourOn ? 'Detener recorrido' : 'Recorrido automático'}</button>
            </div>
          </div>
        </div>
        <div class="dlg__bar">
          <button class="round" type="button" data-act="prev" aria-label="Anterior"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
          <span class="dlg__count">${dlgIndex + 1} / ${navList.length}</span>
          <button class="round" type="button" data-act="next" aria-label="Siguiente"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
        </div>
      </div>`;
    syncLightButton();
    dlg.querySelector('.dlg').scrollTop = 0;
    clearTimeout(tourTimer);
    if (tourOn) tourTimer = setTimeout(() => step(1), TOUR_MS);
  }

  function syncLightButton() {
    const btn = $('#lightBtn');
    if (!btn) return;
    const on = lit.has(navList[dlgIndex].id);
    btn.setAttribute('aria-pressed', String(on));
    btn.innerHTML = `${FLAME}${on ? 'Vela encendida' : 'Encender una vela'}`;
  }

  function step(dir) {
    dlgIndex = (dlgIndex + dir + navList.length) % navList.length;
    fillDialog();
  }

  function closeDialog() {
    tourOn = false;
    clearTimeout(tourTimer);
    if (dlg.open) dlg.close();
  }

  function sparks(btn) {
    if (reduceMotion) return;
    for (let i = 0; i < 16; i++) {
      const s = document.createElement('i');
      s.className = 'spark';
      const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 60;
      s.style.setProperty('--dx', Math.cos(a) * d + 'px');
      s.style.setProperty('--dy', Math.sin(a) * d - 20 + 'px');
      s.style.animationDelay = Math.random() * .12 + 's';
      btn.appendChild(s);
      setTimeout(() => s.remove(), 1100);
    }
  }

  dlg.addEventListener('click', e => {
    if (e.target === dlg) return closeDialog();
    const b = e.target.closest('[data-act]');
    if (!b) return;
    switch (b.dataset.act) {
      case 'close': closeDialog(); break;
      case 'prev': step(-1); break;
      case 'next': step(1); break;
      case 'light': {
        const id = navList[dlgIndex].id;
        const turnOn = !lit.has(id);
        setLit(id, turnOn);
        if (turnOn) sparks($('#lightBtn'));
        break;
      }
      case 'tour':
        tourOn = !tourOn;
        fillDialog();
        break;
    }
  });
  dlg.addEventListener('close', () => { tourOn = false; clearTimeout(tourTimer); });
  addEventListener('keydown', e => {
    if (!dlg.open) return;
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  });

  /* ---------------------------------------------------------------
     Arranque
     --------------------------------------------------------------- */
  renderGallery();
  updateAltar();
  observeReveals();
  document.fonts && document.fonts.ready.then(moveThumb);
  moveThumb();
  update();
})();
