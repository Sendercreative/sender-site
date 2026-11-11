import type { ImageMetadata } from 'astro';
import gutterSleeve from '../assets/work/gutter-sleeve.png';
import gutterSleeveWhite from '../assets/work/gutter-sleeve-white.png';
import venture from '../assets/work/venture.png';
import ventureWhite from '../assets/work/venture-white.png';
import noble from '../assets/work/noble.png';
import nobleMarkWhite from '../assets/work/noble-mark-white.png';
import lindys from '../assets/work/lindys.png';
import jbControls from '../assets/work/jb-controls.png';
import sixDaysWhite from '../assets/work/six-days-white.svg';

export const CONTACT = {
  email: 'hello@sendercreative.ca',
  location: 'Ontario, Canada',
  instagram: '#',
  linkedin: '#',
};

export type WorkItem = {
  name: string;
  tag: string;
  year: string;
  /** Logo on a light tile */
  img?: ImageMetadata;
  /** Inverse logo, used on dark tiles */
  inv?: ImageMetadata;
  /** Self-hosted video (path under /public) */
  video?: { src: string; poster: string };
  /** YouTube URL — rendered as a muted autoplay loop */
  youtube?: string;
  /** Placeholder label until a screenshot exists */
  ph?: string;
};

export const WORK: Record<'logos' | 'videos' | 'websites', WorkItem[]> = {
  logos: [
    { name: 'Gutter Sleeve', tag: 'Identity', year: '2025', img: gutterSleeve, inv: gutterSleeveWhite },
    { name: 'Venture Gutter Services', tag: 'Identity', year: '2025', img: venture, inv: ventureWhite },
    { name: 'Noble Woodworks', tag: 'Identity', year: '2024', img: noble, inv: nobleMarkWhite },
    { name: "Lindy's Flowers", tag: 'Identity', year: '2024', img: lindys },
    { name: 'JB Controls', tag: 'Identity', year: '2024', img: jbControls },
    { name: '6 Days', tag: 'Identity', year: '2025', inv: sixDaysWhite },
  ],
  videos: [
    { name: 'Sender Reel', tag: 'Edit + Motion', year: '2026', video: { src: '/media/reel.mp4', poster: '/media/reel-poster.jpg' } },
  ],
  websites: [
    { name: 'Venture Gutter Services', tag: 'Design + Build', year: '2026', ph: 'Website screenshot' },
    { name: 'Noble Woodworks', tag: 'Design + Build', year: '2025', ph: 'Website screenshot' },
    { name: 'Gutter Sleeve', tag: 'Design + Build', year: '2025', ph: 'Website screenshot' },
  ],
};

/** The three glass panels that scroll past the hero. */
export const BOXES = [
  { key: 'logos', label: 'Branding' },
  { key: 'videos', label: 'Video' },
  { key: 'websites', label: 'Websites' },
] as const;

/** Hero headline: [word, line 1, line 2] for the intro, the docked state, then each panel. */
export const HERO = [
  { word: 'look', lines: ['as good as', 'your work.'] },
  { word: 'look', lines: ['at our', 'previous work.'] },
  { word: 'logos', lines: ['branding projects', 'that stand out.'] },
  { word: 'videos', lines: ['videos that', 'hold attention.'] },
  { word: 'web', lines: ['websites that', 'bring in the call.'] },
];

export const SERVICES = [
  { title: 'Logos & Branding', kind: 'Identity', blurb: 'A logo is the start. We build the whole system around it, so your truck, your site and your quote all look like the same company.', tags: ['Logo design', 'Brand guidelines', 'Naming', 'Business cards', 'Signage', 'Vehicle wraps', 'Apparel'] },
  { title: 'Websites & Lead Capture', kind: 'Web', blurb: 'Sites that make you look established before the first call, with a quote form that lands straight in your inbox.', tags: ['Website design + build', 'Landing pages', 'Quote + booking forms', 'Hosting + care', 'Copywriting'] },
  { title: 'Search & Local SEO', kind: 'Growth', blurb: 'Show up when someone nearby searches for what you do. Profile, listings and reviews, set up properly.', tags: ['Google Business Profile', 'On-page SEO', 'Local listings', 'Reviews strategy', 'Monthly reporting'] },
  { title: 'Paid Advertising', kind: 'Growth', blurb: 'Google and Meta campaigns aimed at the jobs you actually want, tracked to the enquiry.', tags: ['Google Ads', 'Meta Ads', 'Retargeting', 'Ad creative', 'Campaign tracking'] },
  { title: 'Social Media', kind: 'Content', blurb: 'Your finished projects, posted consistently. We plan it, shoot it and schedule it.', tags: ['Content calendars', 'Post design', 'Captions + scheduling', 'Community management'] },
  { title: 'Photo & Video', kind: 'Content', blurb: 'Shot and edited in-house. Brand films, reels and project photography that sell the work for you.', tags: ['Brand films', 'Social reels', 'Drone', 'Project + team photography', 'Editing + motion'] },
  { title: 'Graphic Design & Print', kind: 'Design', blurb: 'Proposals, brochures, signage and trade show graphics, all drawn from one brand.', tags: ['Brochures + flyers', 'Proposals + decks', 'Trade show', 'Packaging', 'Email templates'] },
  { title: 'Marketing Management', kind: 'Ongoing', blurb: 'We run your marketing month to month, so it gets done while you run the job site.', tags: ['Strategy + planning', 'Monthly retainer', 'Email marketing', 'Analytics + reporting'] },
  { title: 'Consultation', kind: 'Strategy', blurb: 'A clear plan before you spend a dollar. Where you stand, where you want to be, and what to do first.', tags: ['Brand + marketing audit', 'Positioning', 'Competitor review', '90-day plan'] },
];

export const PAGES = [
  { title: 'Work', href: '/#work', blurb: 'Logos, videos and websites for the people who build things.' },
  { title: 'Services', href: '/#services', blurb: 'Branding, web, photo + video, design and management.' },
  { title: 'About', href: '/#', blurb: 'A small studio in Ontario. Brand, web, photo and video under one roof.' },
  { title: 'Contact', href: '/#contact', blurb: "Tell us what you're working on. We'll take it from there." },
];
