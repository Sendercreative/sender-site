// Homepage C — Send: interactions ported from the Claude Design file.
// State classes on <html>: s0/s1/s3 (intro sequence), docked, flyon, vline, mopen.

type Hero = { word: string; lines: string[] };

const R = document.documentElement;
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const HERO: Hero[] = JSON.parse($('hero-data').textContent || '[]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Reveal on scroll ── */
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: 0.15 },
);
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

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

/* ── Below-the-fold videos: only download and play while on screen ── */
const vio = new IntersectionObserver((es) => es.forEach((e) => {
  const v = e.target as HTMLVideoElement;
  if (e.isIntersecting) { if (!reduced) v.play().catch(() => {}); } else v.pause();
}), { rootMargin: '200px 0px' });
document.querySelectorAll<HTMLVideoElement>('video.lazyv').forEach((v) => vio.observe(v));

/* ── Floating card deck beside the hero ── */
const fly = document.querySelector<HTMLElement>('.fly')!;
const FC = [...fly.querySelectorAll<HTMLElement>('.fc')];
const ord = FC.map((_, i) => i);
const lay = () => ord.forEach((c, p) => { FC[c].style.setProperty('--p', String(Math.min(p, 4))); FC[c].classList.toggle('hide', p > 3); });
lay();
if (!reduced) {
  setInterval(() => {
    if (!R.classList.contains('flyon') || document.hidden) return;
    const t = FC[ord[0]];
    t.classList.add('off');
    setTimeout(() => {
      ord.push(ord.shift()!);
      t.style.transition = 'none';
      lay();
      t.classList.remove('off');
      void t.offsetWidth;
      t.style.transition = '';
    }, 900);
  }, 3200);
}
addEventListener('pointermove', (e) => {
  fly.style.setProperty('--mx', (e.clientX / innerWidth * 2 - 1).toFixed(3));
  fly.style.setProperty('--my', (e.clientY / innerHeight * 2 - 1).toFixed(3));
}, { passive: true });

/* ── Hero headline that rewrites itself as you scroll ── */
const hblk = $('hblk'), lk = $('lk'), ag = $('ag'), lede = $('lede'), rail = $('rail');
const dots = [...rail.querySelectorAll('a')];
const htxt = document.querySelector<HTMLElement>('.htxt')!;
let cur = 0, word = HERO[0].word, ready = false;
let swapT: ReturnType<typeof setTimeout> | undefined;

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
  R.classList.toggle('vline', R.classList.contains('docked') && innerWidth <= 760);
  if (!R.classList.contains('docked')) { hblk.style.transformOrigin = ''; hblk.style.transform = 'none'; return; }
  if (innerWidth <= 760) {
    const w = hblk.offsetWidth, h = hblk.offsetHeight;
    const thick = innerWidth * 0.22 - 14, len = innerHeight * 0.8;
    const sc = Math.min(1, thick / h, len / w);
    const X = 8 - hblk.offsetLeft, Y = (innerHeight + w * sc) / 2 - hblk.offsetTop;
    hblk.style.transformOrigin = '0 0';
    hblk.style.transform = `translate(${X}px,${Y}px) rotate(-90deg) scale(${sc})`;
    return;
  }
  hblk.style.transformOrigin = '';
  const pad = parseFloat(getComputedStyle(htxt).paddingLeft);
  const col = innerWidth - innerWidth * 0.56 - pad - 110;
  hblk.style.transform = `scale(${Math.min(1, col / maxW())})`;
}

function setLines(i: number) {
  setWord(HERO[i].word);
  if (i === cur) return;
  cur = i;
  ag.setAttribute('aria-label', `${HERO[i].word} ${HERO[i].lines.join(' ')}`);
  clearTimeout(swapT);
  [...ag.children].forEach((o) => { o.classList.remove('on'); o.classList.add('out'); });
  swapT = setTimeout(() => {
    ag.innerHTML = HERO[i].lines.map((t) => `<span class="pop" aria-hidden="true"><span>${t}</span></span>`).join('');
    fit();
    requestAnimationFrame(() => requestAnimationFrame(() => [...ag.children].forEach((c) => c.classList.add('on'))));
  }, 480);
}

function onScroll() {
  if (!ready) return;
  const y = scrollY, d = y > 30;
  if (d !== R.classList.contains('docked')) { R.classList.toggle('docked', d); fit(); }
  let idx = -1;
  boxes.forEach((b, i) => { if (b.getBoundingClientRect().top < innerHeight * 0.55) idx = i; });
  let k = 0;
  const X = innerHeight * 0.25;
  boxes.forEach((b) => { const t = b.getBoundingClientRect().top - innerHeight * 0.55; k = Math.max(k, 1 - Math.abs(t) / X); });
  k = Math.min(1, Math.max(0, k));
  k = k * k * (3 - 2 * k);
  lk.style.filter = k > 0.005 ? `blur(${(k * 22).toFixed(1)}px)` : '';
  lk.style.opacity = (1 - k).toFixed(3);
  setLines(!d ? 0 : idx < 0 ? 1 : idx + 2);
  dots.forEach((a, i) => a.classList.toggle('on', i === idx));
  R.classList.toggle('flyon', !d);
  rail.style.setProperty('--dy', `${-y * 0.5}px`);
}

(function place() {
  const r = hblk.getBoundingClientRect();
  const o = lede.offsetParent ? (lede.offsetParent as HTMLElement).getBoundingClientRect().top : 0;
  lede.style.top = `${r.bottom - o + Math.max(16, innerHeight * 0.03)}px`;
  requestAnimationFrame(place);
})();
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', fit);

/* ── Full-screen menu ── */
const ml = $('mlist'), mp = $('mprev'), ov = $('ov'), mb = $<HTMLButtonElement>('mbtn');
const menuLinks = [...ov.querySelectorAll<HTMLAnchorElement>('a')];
ml.querySelectorAll<HTMLAnchorElement>('.ml').forEach((a) => {
  a.addEventListener('mouseenter', () => {
    mp.querySelector('b')!.textContent = a.dataset.title || '';
    mp.querySelector('span')!.textContent = a.dataset.blurb || '';
    mp.classList.add('on');
  });
  a.addEventListener('mouseleave', () => mp.classList.remove('on'));
  a.addEventListener('click', () => toggleMenu(false));
});
function toggleMenu(o: boolean) {
  const r = mb.querySelector('.ic')!.getBoundingClientRect();
  ov.style.setProperty('--cx', `${r.left + r.width / 2}px`);
  ov.style.setProperty('--cy', `${r.top + r.height / 2}px`);
  if (!o && R.classList.contains('mopen')) { ov.classList.add('closing'); setTimeout(() => ov.classList.remove('closing'), 1100); }
  R.classList.toggle('mopen', o);
  ov.setAttribute('aria-hidden', String(!o));
  mb.setAttribute('aria-expanded', String(o));
  mb.setAttribute('aria-label', o ? 'Close menu' : 'Menu');
  menuLinks.forEach((a) => a.setAttribute('tabindex', o ? '0' : '-1'));
  if (o) setTimeout(() => (ml.querySelector('a') as HTMLElement | null)?.focus({ preventScroll: true }), 400);
  if (!o) ml.querySelectorAll<HTMLElement>('i').forEach((i) => {
    const d = i.style.transitionDelay;
    i.style.transitionDelay = '0s';
    setTimeout(() => (i.style.transitionDelay = d), 1100);
  });
}
mb.addEventListener('click', () => toggleMenu(!R.classList.contains('mopen')));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && R.classList.contains('mopen')) { toggleMenu(false); mb.focus(); } });

/* ── Logo mark spins with scroll velocity ── */
{
  const logo = $('logo');
  let lastY = scrollY, rot = 0, vel = 0;
  (function spin() {
    const y = scrollY;
    vel += (y - lastY - vel) * 0.2;
    lastY = y;
    rot += vel * 0.35;
    logo.style.setProperty('--r', `${rot}deg`);
    requestAnimationFrame(spin);
  })();
}

/* ── Smoothed wheel scrolling + in-page anchor glide ── */
if (!reduced) {
  let tgt = scrollY, pos = scrollY, run = false;
  const max = () => document.documentElement.scrollHeight - innerHeight;
  const step = () => {
    pos += (tgt - pos) * 0.085;
    if (Math.abs(tgt - pos) < 0.4) { pos = tgt; run = false; }
    scrollTo(0, pos);
    if (run) requestAnimationFrame(step);
  };
  const go = (t: number) => {
    tgt = Math.max(0, Math.min(max(), t));
    if (!run) { run = true; pos = scrollY; requestAnimationFrame(step); }
  };
  addEventListener('wheel', (e) => {
    if (R.classList.contains('mopen')) { e.preventDefault(); return; }
    if (e.ctrlKey) return;
    e.preventDefault();
    go((run ? tgt : scrollY) + e.deltaY * (e.deltaMode === 1 ? 32 : 1));
  }, { passive: false });
  addEventListener('scroll', () => { if (!run) tgt = pos = scrollY; }, { passive: true });
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
    if (!a) return;
    const hash = a.getAttribute('href')!.replace(/^\//, '');
    if (hash.length < 2) return;
    const el = document.querySelector<HTMLElement>(hash);
    if (el) {
      e.preventDefault();
      go(el.getBoundingClientRect().top + scrollY - (el.classList.contains('box') ? innerHeight * 0.3 : 0));
    }
  });
}

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
  setTimeout(() => { R.classList.add('s3'); ready = true; onScroll(); }, T[3]);
});
