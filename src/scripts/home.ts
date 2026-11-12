// Homepage C — Send: interactions ported from the Claude Design file.
// State classes on <html>: s0/s1/s3 (intro sequence), docked, flyon, mopen; .hout/.hin on the headline during a dock swap.

type Hero = { word: string; lines: string[] };

const R = document.documentElement;
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const HERO: Hero[] = JSON.parse($('hero-data').textContent || '[]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Work panels ── */
const boxes = [...document.querySelectorAll<HTMLElement>('.box')];
boxes.forEach((b) => {
  b.addEventListener('mousemove', (e) => {
    const r = b.getBoundingClientRect();
    b.style.setProperty('--x', `${e.clientX - r.left}px`);
    b.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
});
const bio = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); bio.unobserve(e.target); } }),
  { threshold: 0.05 },
);
boxes.forEach((b) => bio.observe(b));

/* ── Hero background video: plays only while the hero is showing ── */
const hvid = document.getElementById('hvid') as HTMLVideoElement | null;
const syncVid = () => {
  if (!hvid) return;
  const show = R.classList.contains('flyon') && !document.hidden && !reduced;
  if (show && hvid.paused) hvid.play().catch(() => {});
  else if (!show && !hvid.paused) hvid.pause();
};
new MutationObserver(syncVid).observe(R, { attributes: true, attributeFilter: ['class'] });
document.addEventListener('visibilitychange', syncVid);
syncVid();

/* ── Hero headline that rewrites itself as you scroll ── */
const hblk = $('hblk'), lk = $('lk'), ag = $('ag'), lede = $('lede'), rail = $('rail');
const dots = [...rail.querySelectorAll('a')];
const vlabs = [...$('vlab').children];
const htxt = document.querySelector<HTMLElement>('.htxt')!;
let cur = 0, word = HERO[0].word, ready = false;
let swapT: ReturnType<typeof setTimeout> | undefined;
let docked = false, docking = false, dockTok = 0;

/* Docking: headline + lede slide down and fade, then slide back in from the left at docked size. */
function dockTo(d: boolean) {
  docked = d;
  const tok = ++dockTok;
  if (reduced || innerWidth <= 760) { R.classList.toggle('docked', d); fit(); placeFor(1400); return; }
  docking = true;
  const els = [hblk, lede];
  els.forEach((e) => { e.classList.remove('hin'); e.classList.add('hout'); });
  placeFor(600);
  setTimeout(() => {
    if (tok !== dockTok) return;
    R.classList.toggle('docked', d);
    fit();
    els.forEach((e) => { e.classList.add('hin'); e.classList.remove('hout'); });
    void hblk.offsetWidth;
    placeFor(1400);
    requestAnimationFrame(() => {
      els.forEach((e) => e.classList.remove('hin'));
      setTimeout(() => { if (tok === dockTok) docking = false; }, 400);
    });
  }, 500);
}

function setWord(w: string) {
  if (w === word) return;
  word = w;
  lk.innerHTML = [...w].map((c) => `<i>${c}</i>`).join('');
}

let _mw = 0, _mwK = '';
function maxW() {
  const k = `${innerWidth}x${innerHeight}`;
  if (_mw && _mwK === k) return _mw;
  const m = document.createElement('div');
  m.style.cssText = 'position:absolute;visibility:hidden;left:0;top:0;display:flex;flex-direction:column;align-items:flex-start';
  m.innerHTML = [...new Set(HERO.map((h) => h.word))].map((w) => `<span class="lk" style="display:block;width:max-content">${w}</span>`).join('')
    + HERO.flatMap((h) => h.lines).map((t) => `<span class="ag" style="display:block;width:max-content;margin:0">${t}</span>`).join('');
  hblk.parentNode!.appendChild(m);
  _mw = Math.max(hblk.offsetWidth, ...[...m.children].map((c) => (c as HTMLElement).offsetWidth));
  m.remove();
  _mwK = k;
  return _mw;
}

function fit() {
  hblk.style.transformOrigin = '';
  // Mobile: docked size comes from CSS (smaller, top-left, horizontal)
  if (!R.classList.contains('docked') || innerWidth <= 760) { hblk.style.transform = 'none'; return; }
  const pad = parseFloat(getComputedStyle(htxt).paddingLeft);
  const col = innerWidth - innerWidth * 0.56 - pad - 110;
  hblk.style.transform = `scale(${Math.min(0.7, col / maxW())})`;
}

function setLines(i: number) {
  setWord(HERO[i].word);
  if (i === cur) return;
  cur = i;
  ag.setAttribute('aria-label', `${HERO[i].word} ${HERO[i].lines.join(' ')}`);
  clearTimeout(swapT);
  if (docking) {
    ag.innerHTML = `<span class="sr-only">${HERO[i].word} ${HERO[i].lines.join(' ')}</span>` + HERO[i].lines.map((t) => `<span class="pop on" aria-hidden="true"><span>${t}</span></span>`).join('');
    return;
  }
  [...ag.children].forEach((o) => { o.classList.remove('on'); o.classList.add('out'); });
  swapT = setTimeout(() => {
    ag.innerHTML = `<span class="sr-only">${HERO[i].word} ${HERO[i].lines.join(' ')}</span>` + HERO[i].lines.map((t) => `<span class="pop" aria-hidden="true"><span>${t}</span></span>`).join('');
    fit();
    placeFor(1400);
    requestAnimationFrame(() => requestAnimationFrame(() => [...ag.children].forEach((c) => c.classList.add('on'))));
  }, 480);
}

let scrollQueued = false;
function onScroll() {
  if (!ready || scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => { scrollQueued = false; update(); });
}
function update() {
  const y = scrollY, d = y > 30;
  if (d !== docked) dockTo(d);
  let idx = -1;
  boxes.forEach((b, i) => { if (b.getBoundingClientRect().top < innerHeight * 0.55) idx = i; });
  let k = 0;
  const X = innerHeight * 0.25;
  boxes.forEach((b) => { const t = b.getBoundingClientRect().top - innerHeight * 0.55; k = Math.max(k, 1 - Math.abs(t) / X); });
  k = Math.min(1, Math.max(0, k));
  k = k * k * (3 - 2 * k);
  // Mobile: the cards scroll over the headline, so it stays on "look at our previous work"
  const mobile = innerWidth <= 760;
  if (mobile) k = 0;
  lk.style.filter = k > 0.005 ? `blur(${(k * 22).toFixed(1)}px)` : '';
  lk.style.opacity = (1 - k).toFixed(3);
  setLines(!d ? 0 : idx < 0 || mobile ? 1 : idx + 2);
  dots.forEach((a, i) => a.classList.toggle('on', i === idx));
  vlabs.forEach((s, i) => s.classList.toggle('on', i === idx));
  // Mobile: the hero text scrolls up and off with the page instead of docking
  const mob = innerWidth <= 760;
  // Mobile: the headline rides up with the page, then holds just under the nav bar
  if (mob) { hblk.style.translate = '0 0'; const rest = hblk.getBoundingClientRect().top; hblk.style.translate = `0 ${-Math.min(y, Math.max(0, rest - 74))}px`; }
  else hblk.style.translate = '';
  if (mob) place();
  R.classList.toggle('flyon', !d);
  rail.style.setProperty('--dy', `${-y * 0.5}px`);
}

/* Keep the lede tucked under the headline. Runs only while the headline is moving. */
let placeUntil = 0, placing = false;
function place() {
  const r = hblk.getBoundingClientRect();
  const o = lede.offsetParent ? (lede.offsetParent as HTMLElement).getBoundingClientRect().top : 0;
  lede.style.top = `${r.bottom - o + Math.max(16, innerHeight * 0.03)}px`;
  if (performance.now() < placeUntil) requestAnimationFrame(place); else placing = false;
}
function placeFor(ms: number) {
  placeUntil = Math.max(placeUntil, performance.now() + ms);
  if (!placing) { placing = true; requestAnimationFrame(place); }
}
placeFor(6500);
addEventListener('resize', () => placeFor(300));

/* Pause the hero's background animation once it has scrolled away */
new IntersectionObserver(([e]) => R.classList.toggle('hero-off', !e.isIntersecting)).observe($('stage'));

addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', fit);

/* ── Intro sequence ── */
document.fonts.ready.then(() => {
  const r = lk.getBoundingClientRect();
  const S = Math.min(1.6, innerWidth * 0.9 / r.width);
  const dx = innerWidth / 2 - (r.left + r.width / 2), dy = innerHeight / 2 - (r.top + r.height / 2);
  if (!reduced) {
    lk.style.transition = 'none';
    lk.style.transform = `translate(${dx}px,${dy}px) scale(${S})`;
    void lk.offsetWidth;
  }
  const T = reduced ? [0, 0, 0, 0] : [250, 2300, 3000, 3700];
  setTimeout(() => R.classList.add('s0'), T[0]);
  setTimeout(() => { lk.style.transition = 'transform 1.5s cubic-bezier(.7,0,.15,1)'; lk.style.transform = 'none'; R.classList.add('s1'); }, T[1]);
  setTimeout(() => [...ag.children].forEach((c) => c.classList.add('on')), T[2]);
  setTimeout(() => { R.classList.add('s3'); ready = true; update(); }, T[3]);
  setTimeout(() => R.classList.add('hero-rest'), reduced ? 0 : 10000);
});

/* ── "Marketing is complicated": scattered pieces fly into rows under the process steps ── */
(() => {
  const mess = document.getElementById('mess'), proc = document.getElementById('process');
  if (!mess || !proc || reduced) return;
  const src = [...mess.querySelectorAll<HTMLElement>('.mess-field .tk')];
  const dst = new Map([...proc.querySelectorAll<HTMLElement>('.slot')].map((el) => [el.dataset.k!, el]));
  const pairs = src.map((s, i) => {
    const t = dst.get(s.dataset.k!)!;
    const f = document.createElement('span');
    f.className = 'tk kfly';
    f.setAttribute('aria-hidden', 'true');
    f.innerHTML = s.innerHTML;
    f.style.display = 'none';
    document.body.appendChild(f);
    const rot = parseFloat(getComputedStyle(s).getPropertyValue('--r')) || 0;
    return { s, t, f, rot, d: ((i * 37) % 17) / 17 * 0.35 };
  }).filter((p) => p.t);
  R.classList.add('kfx');

  const ease = (x: number) => x * x * (3 - 2 * x);
  let on = false, q = false, until = 0;
  function frame() {
    q = false;
    const vh = innerHeight, span = innerWidth <= 760 ? 0.45 : 0.75;
    for (const p of pairs) {
      const tr = p.t.getBoundingClientRect();
      // 0 while the slot is well below the fold, 1 once it reaches ~62% of the screen
      const raw = 1 - (tr.top - vh * 0.62) / (vh * span);
      const k = Math.min(1, Math.max(0, (raw - p.d) / (1 - p.d)));
      const flying = k > 0 && k < 1;
      p.s.classList.toggle('kh', k > 0);
      p.t.classList.toggle('kh', k < 1);
      if (!flying) { if (p.f.style.display !== 'none') p.f.style.display = 'none'; continue; }
      const sr = p.s.getBoundingClientRect(), e = ease(k);
      const sx = sr.left + sr.width / 2, sy = sr.top + sr.height / 2;
      const tx = tr.left + tr.width / 2, ty = tr.top + tr.height / 2;
      const x = sx + (tx - sx) * e, y = sy + (ty - sy) * e - Math.sin(e * Math.PI) * 60;
      p.f.style.display = '';
      p.f.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(${p.rot * (1 - e)}deg)`;
    }
    // keep going briefly after scrolling stops, so reveal animations that move the slots are tracked
    if (performance.now() < until) { q = true; requestAnimationFrame(frame); }
  }
  const tick = () => { until = performance.now() + 1400; if (on && !q) { q = true; requestAnimationFrame(frame); } };
  new IntersectionObserver((es) => {
    on = es.some((e) => e.isIntersecting) || [mess, proc].some((el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
    if (on) tick(); else pairs.forEach((p) => (p.f.style.display = 'none'));
  }, { rootMargin: '200px 0px' }).observe(mess);
  new IntersectionObserver(() => { on = true; tick(); }, { rootMargin: '200px 0px' }).observe(proc);
  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick);
  frame();
})();

/* ── One system map: rows on the left light up their pieces on the right, linked by lines ── */
(() => {
  const map = document.getElementById('sysmap'), link = document.getElementById('smlink') as SVGSVGElement | null;
  const sec = document.getElementById('system');
  if (!map || !link || !sec) return;
  const rows = [...sec.querySelectorAll<HTMLElement>('.sys-row')];
  const anc = [...map.querySelectorAll<HTMLElement>('.sm-anc')];
  const parts = [...map.querySelectorAll<Element>('[data-g]')];
  const path = link.querySelector('path')!;
  const txt = sec.querySelector<HTMLElement>('.sys-text')!;
  document.body.appendChild(link); // fixed positioning must be relative to the viewport, not a transformed parent
  const desk = matchMedia('(min-width:1001px)');
  let q = false, last = -2;

  function frame() {
    if (!desk.matches) return;
    const vh = innerHeight, sr = sec!.getBoundingClientRect();
    if (sr.bottom < 0 || sr.top > vh) { link!.classList.remove('on'); return; }
    // current row: the last one whose title has passed 55% of the screen
    let cur = -1;
    rows.forEach((r, i) => { if (r.querySelector('h3')!.getBoundingClientRect().top < vh * 0.55) cur = i; });
    if (reduced && cur >= 0) cur = rows.length - 1;
    if (cur !== last) {
      last = cur;
      parts.forEach((el) => {
        const g = +(el as HTMLElement).dataset.g!;
        el.classList.toggle('on', g <= cur);
        el.classList.toggle('cur', g === cur);
      });
      rows.forEach((r, i) => r.classList.toggle('cur', i === cur));
      map!.classList.toggle('done', cur === rows.length - 1);
    }
    // line from the current title to its hub on the map
    const t = cur >= 0 ? rows[cur]!.querySelector('.t')!.getBoundingClientRect() : null;
    const a = cur >= 0 ? anc[cur]!.getBoundingClientRect() : null;
    if (!t || !a || t.bottom < 0 || t.top > vh) { link!.classList.remove('on'); return; }
    // run straight along the title's line to the edge of the text column, then curve to the hub
    const h = rows[cur]!.querySelector('h3')!.getBoundingClientRect();
    const x1 = t.right + 14, y1 = h.top + h.height * 0.55, x2 = a.left + a.width / 2, y2 = a.top + a.height / 2;
    const gx = Math.max(x1, txt.getBoundingClientRect().right + 16);
    const k = Math.max(40, (x2 - gx) * 0.5);
    path.setAttribute('d', `M${x1} ${y1}H${gx}C${gx + k} ${y1} ${x2 - k} ${y2} ${x2} ${y2}`);
    link!.classList.add('on');
  }
  // keep following for a moment after scrolling stops: the rows' reveal animation is still moving them
  let until = 0;
  const loop = () => { frame(); if (performance.now() < until) requestAnimationFrame(loop); else q = false; };
  const tick = () => { until = performance.now() + 1500; if (!q) { q = true; requestAnimationFrame(loop); } };
  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick);
  desk.addEventListener('change', tick);
  frame();
})();

/* ── Converge: as "Your system, your call." arrives, every piece flies into the Sender S ── */
(() => {
  const target = document.getElementById('picks'), map = document.getElementById('sysmap');
  const sec = document.getElementById('system');
  if (!target || !sec || reduced) return;
  R.classList.add('cvx');
  const desk = matchMedia('(min-width:1001px)');
  const lines = map?.querySelector<SVGElement>('.sm-lines');
  type P = { s: HTMLElement; f: HTMLElement; d: number };
  let pairs: P[] = [], mode = '';
  function build() {
    const m = desk.matches ? 'd' : 'm';
    if (m === mode) return;
    mode = m;
    pairs.forEach((p) => p.f.remove());
    const srcs = [...sec!.querySelectorAll<HTMLElement>(m === 'd' ? '.sm-n' : '.sys-ico .tk')];
    pairs = srcs.map((s, i) => {
      const f = document.createElement('span');
      f.className = 'tk cvfly';
      f.setAttribute('aria-hidden', 'true');
      f.innerHTML = s.innerHTML;
      f.style.display = 'none';
      document.body.appendChild(f);
      return { s, f, d: ((i * 29) % 13) / 13 * 0.3 };
    });
  }
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  function frame() {
    build();
    const vh = innerHeight, tr = target!.getBoundingClientRect();
    // 0 while the S spot is near the bottom of the screen, 1 once it reaches ~40% up
    const raw = Math.min(1, Math.max(0, (vh * 0.95 - tr.top) / (vh * 0.55)));
    const tx = tr.left + tr.width / 2, ty = tr.top + tr.height / 2;
    target!.style.setProperty('--so', String(Math.max(0, (raw - 0.75) / 0.25)));
    if (lines) lines.style.opacity = String(1 - Math.min(1, raw * 2.5));
    for (const p of pairs) {
      const k = Math.min(1, Math.max(0, (raw - p.d) / (1 - p.d) / 0.85));
      p.s.style.visibility = k > 0 ? 'hidden' : '';
      if (k <= 0 || k >= 1) { p.f.style.display = 'none'; continue; }
      const sr = p.s.getBoundingClientRect(), e = ease(k);
      const sx = sr.left + sr.width / 2, sy = sr.top + sr.height / 2;
      const x = sx + (tx - sx) * e, y = sy + (ty - sy) * e;
      p.f.style.display = '';
      p.f.style.opacity = String(k < 0.8 ? 1 : (1 - k) / 0.2);
      p.f.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) scale(${1 - e * 0.6})`;
    }
  }
  let q = false;
  const tick = () => { if (!q) { q = true; requestAnimationFrame(() => { q = false; frame(); }); } };
  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick);
  frame();
})();
