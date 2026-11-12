/**
 * "One system. Every piece connected." map (desktop only).
 * Each SYSTEM row (same order as SYSTEM in site.ts) gets a hub point on a ring
 * around the centre, with its icons fanned out around it. Positions are in %
 * of a square panel and computed at build time.
 */
import { ICONS, BRANDS } from './mess';

type Node = { icon?: keyof typeof ICONS; brand?: keyof typeof BRANDS; label: string };

const GROUPS: Node[][] = [
  // Strategy
  [{ icon: 'target', label: 'Strategy' }, { icon: 'pin', label: 'Service area' }, { icon: 'clipboard', label: 'Goals' }],
  // Brand & Content
  [{ icon: 'pen', label: 'Logo + brand' }, { icon: 'camera', label: 'Photo' }, { icon: 'play', label: 'Video' }, { icon: 'image', label: 'Content' }],
  // Website
  [{ icon: 'globe', label: 'Website' }, { icon: 'cursor', label: 'Quote forms' }, { icon: 'check', label: 'Care' }],
  // Get Found
  [
    { brand: 'google', label: 'Google' }, { icon: 'search', label: 'Local SEO' }, { icon: 'thumb', label: 'Social' },
    { brand: 'instagram', label: 'Instagram' }, { brand: 'facebook', label: 'Facebook' }, { brand: 'tiktok', label: 'TikTok' },
    { icon: 'megaphone', label: 'Ads' }, { icon: 'hash', label: 'Hashtags' }, { icon: 'printer', label: 'Print' }, { icon: 'truck', label: 'Vehicle wraps' },
  ],
  // Follow-up
  [{ icon: 'mail', label: 'Email' }, { brand: 'mailchimp', label: 'Mailchimp' }, { icon: 'bell', label: 'Follow-ups' }, { icon: 'star', label: 'Reviews' }, { icon: 'chat', label: 'Replies' }],
  // Hiring & Sales
  [{ icon: 'inbox', label: 'Job posts' }, { icon: 'phone', label: 'Sales calls' }, { icon: 'key', label: 'Proposals' }],
  // Tracking
  [{ icon: 'bars', label: 'Scoreboard' }, { icon: 'gauge', label: 'Cost per lead' }, { icon: 'trend', label: 'Growth' }],
];

const C = 50, RING = 25;
const r1 = (n: number) => Math.round(n * 10) / 10;

export const SYSMAP = GROUPS.map((nodes, g) => {
  const a = ((-90 + (g * 360) / GROUPS.length) * Math.PI) / 180;
  const ax = C + Math.cos(a) * RING, ay = C + Math.sin(a) * RING;
  const span = Math.min(150, 34 * (nodes.length - 1)) * (Math.PI / 180);
  const items = nodes.map((n, i) => {
    const t = nodes.length === 1 ? 0 : i / (nodes.length - 1) - 0.5;
    const r = nodes.length > 5 ? (i % 2 ? 20 : 13) : 14; // big groups get two rows
    const b = a + t * span;
    return { ...n, x: r1(ax + Math.cos(b) * r), y: r1(ay + Math.sin(b) * r) };
  });
  return { x: r1(ax), y: r1(ay), items };
});
