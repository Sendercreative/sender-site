/**
 * "Marketing is complicated" pieces. Each one starts scattered around the
 * headline and flies into a neat row under the process step it belongs to.
 * `step` is 0–3 (Book a visit, Check what's working, Build the system, Your call).
 * A piece is either a generic icon (`icon`) or a small word (`word`).
 */
import { siGoogle, siInstagram, siFacebook, siMailchimp, siTiktok } from 'simple-icons';

/** Brand marks (filled), from Simple Icons. */
export const BRANDS = {
  google: siGoogle.path,
  instagram: siInstagram.path,
  facebook: siFacebook.path,
  mailchimp: siMailchimp.path,
  tiktok: siTiktok.path,
} as const;

export type Piece = { step: 0 | 1 | 2 | 3; icon?: keyof typeof ICONS; brand?: keyof typeof BRANDS; word?: string; label: string };

/** Simple 24×24 stroke icons (generic, no brand marks). */
export const ICONS = {
  pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  phone: '<path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/>',
  clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 14h7M8.5 18h4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
  bars: '<path d="M4 20h16M7 20v-6M12 20V8M17 20v-9"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z"/>',
  camera: '<path d="M4 8h3.5l1.5-2.5h6L16.5 8H20v11H4z"/><circle cx="12" cy="13" r="3.3"/>',
  play: '<rect x="3.5" y="5.5" width="17" height="13" rx="3"/><path d="M10.5 9.5v5l4-2.5z"/>',
  pen: '<path d="M14.5 5.5l4 4L9 19H5v-4z"/><path d="M12.5 7.5l4 4"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
  megaphone: '<path d="M4 10v4h3l8 4V6l-8 4z"/><path d="M7 14l1.5 5h2.5L10 15"/><path d="M18 9.5a3.5 3.5 0 0 1 0 5"/>',
  thumb: '<path d="M8 11v9H4.5v-9zM8 11l3.5-7c1.5 0 2.5 1 2.5 2.5V10h5a1.5 1.5 0 0 1 1.5 1.8l-1.5 6.7A2 2 0 0 1 17 20H8"/>',
  hash: '<path d="M9 4L7.5 20M16.5 4L15 20M4.5 9h16M3.5 15h16"/>',
  chat: '<path d="M4 5.5h16v10H9.5L5 19.5v-4H4z"/>',
  image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 3.5 3 3-2.5 4.5 4"/>',
  cursor: '<path d="M6 3.5l12 7-5.3 1.5L10 17.5z"/><path d="M12.7 12l4.3 6"/>',
  printer: '<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="7.5" rx="1.5"/><path d="M7 14h10v6.5H7z"/>',
  truck: '<path d="M3 6.5h11v10H3zM14 10h4l3 3.5v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  at: '<circle cx="12" cy="12" r="3.5"/><path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.5 6.9"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8.5-8.5M16.5 6.5l2 2M14.5 8.5l1.5 1.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
  cycle: '<path d="M19 8.5A7.5 7.5 0 0 0 5.5 9M5 15.5A7.5 7.5 0 0 0 18.5 15"/><path d="M19.5 4v4.5H15M4.5 20v-4.5H9"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  inbox: '<path d="M3.5 13.5l2.5-8h12l2.5 8V19h-17z"/><path d="M3.5 13.5h5l1 2h5l1-2h5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  trend: '<path d="M3.5 17l5.5-5.5 4 4 7.5-8"/><path d="M15 7.5h5.5V13"/>',
  check: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.3l2.7 2.7L16 9.5"/>',
} as const;

export const PIECES: Piece[] = [
  // 01 Book a visit
  { step: 0, icon: 'pin', label: 'Service area' },
  { step: 0, icon: 'calendar', label: 'Booking' },
  { step: 0, icon: 'phone', label: 'Calls' },
  { step: 0, icon: 'clipboard', label: 'Goals' },
  { step: 0, icon: 'target', label: 'Strategy' },
  // 02 Check what's working
  { step: 1, icon: 'search', label: 'Search' },
  { step: 1, icon: 'bars', label: 'Analytics' },
  { step: 1, icon: 'star', label: 'Reviews' },
  { step: 1, icon: 'gauge', label: 'Speed' },
  { step: 1, brand: 'google', label: 'Google' },
  { step: 1, icon: 'trend', label: 'SEO' },
  // 03 Build the system
  { step: 2, icon: 'globe', label: 'Website' },
  { step: 2, icon: 'pen', label: 'Logo + brand' },
  { step: 2, icon: 'camera', label: 'Photo' },
  { step: 2, icon: 'play', label: 'Video' },
  { step: 2, icon: 'image', label: 'Content' },
  { step: 2, icon: 'thumb', label: 'Social' },
  { step: 2, icon: 'hash', label: 'Hashtags' },
  { step: 2, icon: 'megaphone', label: 'Ads' },
  { step: 2, icon: 'mail', label: 'Email' },
  { step: 2, icon: 'printer', label: 'Print' },
  { step: 2, icon: 'truck', label: 'Vehicle wraps' },
  { step: 2, brand: 'instagram', label: 'Instagram' },
  { step: 2, brand: 'facebook', label: 'Facebook' },
  { step: 2, brand: 'mailchimp', label: 'Mailchimp' },
  { step: 2, brand: 'tiktok', label: 'TikTok' },
  // 04 Your call
  { step: 3, icon: 'key', label: 'Your accounts' },
  { step: 3, icon: 'gear', label: 'Automation' },
  { step: 3, icon: 'cycle', label: 'Ongoing care' },
  { step: 3, icon: 'bell', label: 'Follow-ups' },
  { step: 3, icon: 'inbox', label: 'Leads' },
  { step: 3, icon: 'chat', label: 'Replies' },
  { step: 3, icon: 'check', label: 'Done' },
];

/** Scatter positions (% of the field), kept out of the headline's band. Deterministic so builds match. */
export function scatter(wide: boolean[], seed = 7) {
  const n = wide.length;
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const out: { x: number; y: number; r: number }[] = [];
  let guard = 0;
  while (out.length < n && guard++ < 5000) {
    const x = 3 + rnd() * 94, y = 4 + rnd() * 92;
    const w = wide[out.length];
    if (w && (x < 9 || x > 91)) continue; // words stay inside the edges
    if (x > 6 && x < 94 && y > 30 && y < 70) continue; // headline band
    // words need more room sideways than icons
    if (out.some((p, j) => Math.abs(p.x - x) < (w || wide[j] ? 15 : 7) && Math.abs(p.y - y) < (w || wide[j] ? 5 : 7))) continue;
    out.push({ x, y, r: Math.round((rnd() - 0.5) * (w ? 24 : 40)) });
  }
  return out;
}
