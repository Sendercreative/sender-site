// Site-wide behaviour: reveal-on-scroll, lazy videos, menu, logo spin, smooth scrolling.
// The homepage adds its hero choreography on top (home.ts) and owns the s1/docked classes there.

const R = document.documentElement;
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isHome = !!document.getElementById('stage');

if (!isHome) {
  R.classList.add('s1', 's3');
  const dock = () => R.classList.toggle('docked', scrollY > 30);
  addEventListener('scroll', dock, { passive: true });
  dock();
}

/* ── Reveal on scroll ── */
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: 0.15 },
);
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

/* ── Below-the-fold videos: only download and play while on screen ── */
// A pause only counts as the visitor's choice if it happens while the video is on screen.
// (The 'pause' event fires after the fact, so we track visibility instead of a flag.)
const userPaused = new WeakSet<HTMLVideoElement>();
const inView = new WeakSet<HTMLVideoElement>();
const vio = new IntersectionObserver((es) => es.forEach((e) => {
  const v = e.target as HTMLVideoElement;
  if (e.isIntersecting) { inView.add(v); if (!reduced && !userPaused.has(v)) v.play().catch(() => {}); }
  else { inView.delete(v); v.pause(); }
}), { threshold: 0.25 });
document.querySelectorAll<HTMLVideoElement>('video.lazyv').forEach((v) => {
  v.muted = true;
  vio.observe(v);
  v.addEventListener('pause', () => { if (inView.has(v) && !document.hidden) userPaused.add(v); });
  v.addEventListener('play', () => userPaused.delete(v));
});

/* ── Full-screen menu ── */
const ml = $('mlist'), ov = $('ov'), mb = $<HTMLButtonElement>('mbtn');
const menuLinks = [...ov.querySelectorAll<HTMLAnchorElement>('a')];
ml.querySelectorAll<HTMLAnchorElement>('.ml').forEach((a) => {
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

/* ── Logo mark spins with scroll velocity (only animates while moving) ── */
{
  const logo = $('logo');
  let lastY = scrollY, rot = 0, vel = 0, running = false;
  const spin = () => {
    const y = scrollY;
    vel += (y - lastY - vel) * 0.2;
    lastY = y;
    rot += vel * 0.35;
    logo.style.setProperty('--r', `${rot.toFixed(2)}deg`);
    if (Math.abs(vel) > 0.05) requestAnimationFrame(spin);
    else { running = false; vel = 0; }
  };
  addEventListener('scroll', () => { if (!running) { running = true; lastY = scrollY - 1; requestAnimationFrame(spin); } }, { passive: true });
}

/* ── Smoothed wheel scrolling + in-page anchor glide ── */
if (!reduced) {
  let tgt = scrollY, pos = scrollY, run = false;
  const max = () => document.documentElement.scrollHeight - innerHeight;
  const step = () => {
    pos += (tgt - pos) * 0.16;
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


