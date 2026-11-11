/**
 * Portfolio projects → /work/<slug>/ case-study pages.
 *
 * Images load by file name from src/assets/projects/<slug>/ — no code changes:
 *   hero.jpg        16:9 cover (also the Work card)
 *   logo-light.*    logo for light backgrounds (svg or png)
 *   logo-dark.*     logo for dark backgrounds
 *   desktop.jpg     2:1 browser screenshot
 *   mobile.jpg      phone screenshot, bars cropped
 *   g1.jpg, g2.jpg… gallery, in order
 * Any slot without a file shows a labelled placeholder.
 */
import type { ImageMetadata } from 'astro';

const FILES = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*/*.{jpg,jpeg,png,webp,svg}', { eager: true });
function imagesFor(slug: string): NonNullable<Project['images']> {
  const own = Object.entries(FILES)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .map(([path, mod]) => ({ stem: path.split('/').pop()!.replace(/\.[^.]+$/, ''), img: mod.default }));
  const get = (stem: string) => own.find((f) => f.stem === stem)?.img;
  return {
    hero: get('hero'),
    logoLight: get('logo-light'),
    logoDark: get('logo-dark'),
    desktop: get('desktop'),
    mobile: get('mobile'),
    gallery: own.filter((f) => /^g\d+$/.test(f.stem)).sort((a, b) => +a.stem.slice(1) - +b.stem.slice(1)).map((f) => f.img),
  };
}

export type Project = {
  slug: string;
  name: string;
  /** Public site. Omit `url` (or set status 'soon') until it's live. */
  url?: string;
  status?: 'live' | 'soon';
  industry: string;
  year?: string;
  services: string[];
  /** One line under the title, and on cards */
  summary: string;
  story: { challenge: string; built: string; result: string };
  /** Optional pull quote shown between the story and the brand */
  quote?: { text: string; by: string };
  /** Optional link to a longer write-up */
  readMore?: { href: string; label: string };
  /** What's still running after launch (shows as "Ongoing") */
  ongoing?: string[];
  images?: {
    hero?: ImageMetadata;      // 16:9, ~2400×1350
    logoLight?: ImageMetadata; // logo on white, SVG or PNG
    logoDark?: ImageMetadata;  // logo on black, SVG or PNG
    desktop?: ImageMetadata;   // 2:1 browser screenshot, 2400×1200
    mobile?: ImageMetadata;    // phone screenshot, bars cropped (~1080×1955)
    gallery?: ImageMetadata[]; // any number
  };
};

const TBD = {
  challenge: '[Challenge: where the client was before, and what they needed.]',
  built: '[What we built: the logo, the site and anything else in the system.]',
  result: '[Result: what changed. Calls, quotes, launch, feedback.]',
};

const LIST: Project[] = [
  {
    slug: '6-days',
    name: '6 Days',
    url: 'https://6days.ca/',
    year: 'Built 2025 · launched 2026',
    industry: 'Christian business directory',
    services: ['Naming', 'Logo', 'Brand', 'Website'],
    ongoing: ['Social media', 'Email updates', 'Community growth'],
    summary: 'A home for Christian businesses in Canada: a directory, a job board and a community. Named, branded, built and run in-house.',
    story: {
      challenge: 'Our Christian community had no single place to find its businesses or their job openings. Ben felt that gap first-hand while job hunting, then spent time talking with business owners to confirm they felt it too.',
      built: 'Everything. The name, the message, the brand and how the directory is organized, then the design and build of the site itself. One clear idea, carried through every piece.',
      result: 'A growing directory of Christian businesses across Canada, now running on every social platform with regular email updates. Next up: matching people with mentors, and business owners with roundtable groups.',
    },
    quote: {
      text: 'How many lives have we positively impacted?',
      by: 'The one metric of success for 6 Days · Ben Nobels, founder',
    },
    readMore: { href: 'https://6days.ca/faith-and-work', label: 'Read the full story: Why build 6 Days?' },
  },
  {
    slug: 'venture-gutter-services',
    name: 'Venture Gutter Services',
    url: 'https://venturegutters.ca/',
    industry: 'Gutters & exteriors',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the Venture project.]',
    story: TBD,
  },
  {
    slug: 'gutter-sleeve',
    name: 'Gutter Sleeve',
    url: 'https://guttersleeve.ca/',
    industry: 'Gutter repair product',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the Gutter Sleeve project.]',
    story: TBD,
  },
  {
    slug: 'jb-controls',
    name: 'JB Controls',
    url: 'https://jbcontrols.ca/',
    industry: 'Controls & automation',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the JB Controls project.]',
    story: TBD,
  },
  {
    slug: 'ontario-window-door-products',
    name: 'Ontario Window & Door Products',
    url: 'https://ontwindowdoorproducts.com/',
    industry: 'Windows & doors',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the OWDP project.]',
    story: TBD,
  },
  {
    slug: 'void-cavitation',
    name: 'Void Cavitation',
    url: 'https://voidcavitation.com/',
    status: 'soon',
    industry: 'Industrial technology',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the Void Cavitation launch.]',
    story: TBD,
  },
];

export const PROJECTS: Project[] = LIST.map((p) => ({ ...p, images: { ...imagesFor(p.slug), ...p.images } }));

export const projectHref = (p: Project) => `/work/${p.slug}/`;
