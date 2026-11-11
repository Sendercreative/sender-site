import { SERVICES as SERVICES_DATA } from './services';
import type { ImageMetadata } from 'astro';
import { PROJECTS, projectHref } from './projects';

export const CONTACT = {
  email: 'hello@sendercreative.ca',
  phone: '905-517-4522',
  phoneHref: '+19055174522',
  location: 'Ontario, Canada',
  areas: 'Hamilton, Haldimand & Norfolk',
  instagram: '#',
  linkedin: '#',
  /** Until a booking tool is chosen, "Book a visit" opens an email. */
  booking: 'mailto:hello@sendercreative.ca?subject=Book%20a%20visit',
};

export type WorkItem = {
  name: string;
  tag: string;
  /** Logo on a light tile */
  img?: ImageMetadata;
  /** Inverse logo, used on dark tiles */
  inv?: ImageMetadata;
  /** Self-hosted video (path under /public) */
  video?: { src: string; poster?: string };
  /** YouTube URL — rendered as a muted autoplay loop */
  youtube?: string;
  /** Placeholder label until a real image exists */
  ph?: string;
  /** Dark placeholder tile */
  dark?: boolean;
  /** Website screenshot, shown full-bleed */
  shot?: ImageMetadata;
  /** Where the tile links (case study) */
  href?: string;
  year?: string;
};

const GS_EXPLAINER: WorkItem = { name: 'Gutter Sleeve explainer', tag: 'Explainer video', year: '2025', youtube: 'https://www.youtube.com/watch?v=E5VHcj4wQM8' };

/** Work page Video section (and the Photo & Video service page) */
export const VIDEO_LIBRARY: WorkItem[] = [
  { name: 'Dicam overview', tag: 'Overview video', video: { src: 'https://cdn.capturestudio.ca/Dicam/Dicam-overview.mp4' } },
  GS_EXPLAINER,
];

export const WORK: Record<'logos' | 'videos' | 'websites', WorkItem[]> = {
  logos: PROJECTS.map((p) => ({
    name: p.name, tag: 'Logo + brand', href: projectHref(p),
    img: p.images?.logoLight, inv: p.images?.logoDark, ph: 'Logo',
  })),
  /** Homepage Video panel */
  videos: [GS_EXPLAINER],
  websites: PROJECTS.map((p) => ({
    name: p.name, tag: p.status === 'soon' ? 'Website · Soon' : 'Website', href: projectHref(p),
    shot: p.images?.desktop, ph: 'Website screenshot', dark: true,
  })),
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

export const PROCESS = [
  { title: 'Book a visit', blurb: 'We come to you. We see your shop, your space or your job site, and learn what you want more of.' },
  { title: "Check what's working", blurb: "Your brand, site, Google profile and socials. We keep what works and fix what doesn't." },
  { title: 'Build the system', blurb: 'Around what you already have, or from scratch. Every piece set up in your name, working together.' },
  { title: 'Your call', blurb: 'Take the keys and run it yourself, or we keep it running for you.' },
];

/** What the system is made of. Each row opens to show its parts. */
export const SYSTEM = [
  { title: 'Strategy', blurb: 'Who you serve, the jobs you want more of, and where. It all starts with a visit.', tags: ['On-site visit', 'Current setup check', 'Service area', 'Goals + priorities'] },
  { title: 'Brand & Content', blurb: 'Your look, refined or rebuilt, plus real photo and video of your work to fuel everything else.', tags: ['Logo + brand', 'Brand guidelines', 'Photography', 'Video + reels', 'Drone'] },
  { title: 'Website', blurb: 'Informs, assists and converts. A site that keeps working when you’re not, with quotes landing straight in your inbox.', tags: ['Design + build', 'Quote + booking forms', 'Copywriting', 'Hosting + care'] },
  { title: 'Get Found', blurb: 'Show up when someone nearby needs you, and stay seen by the right people the rest of the time.', tags: ['Google Business Profile', 'Local SEO', 'Social media', 'Google + Meta ads', 'Print', 'Signage + vehicle wraps'] },
  { title: 'Follow-up', blurb: 'No lead slips through. Quick replies, quote follow-ups and review requests, plus updates to the customers you already have.', tags: ['Auto-replies', 'Quote follow-ups', 'Review requests', 'Email updates'] },
  { title: 'Hiring & Sales', blurb: 'Help finding good people and closing the work you quote.', tags: ['Hiring page', 'Job posts', 'Crew content', 'Proposal templates', 'Case studies'] },
  { title: 'Tracking', blurb: 'Calls, forms and cost per lead on one scoreboard, so you can see exactly what’s working.', tags: ['Call + form tracking', 'Cost per lead', 'Monthly scoreboard'] },
];

export const CHOICES = [
  { kicker: 'Option one', title: 'Take the keys', blurb: 'We hand it over: accounts, files, logins, and a walkthrough so your team knows how it runs. A clean break.', note: 'Want us to keep hosting your site? That’s the only thing you’d still pay us for.' },
  { kicker: 'Option two', title: 'We run it', blurb: 'We keep it going month to month: posting, shooting, ads, reviews, reporting. You run your business.', note: 'Everything stays in your name either way.' },
];

export const PAGES = [
  { title: 'Work', href: '/work/', blurb: 'Logos, videos and websites for local businesses.' },
  { title: 'Services', href: '/services/', blurb: 'Branding, websites, local SEO, photo + video, design and management.' },
  { title: 'Process', href: '/#process', blurb: 'Book a visit. We check what’s working, build the system, and hand you the keys or run it.' },
  { title: 'Contact', href: '/contact/', blurb: 'Book a visit. We’ll take it from there.' },
];

export const SERVICE_LINKS = SERVICES_DATA.map((s) => ({ title: s.short, href: `/${s.slug}/` }));
