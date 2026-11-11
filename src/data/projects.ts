/**
 * Portfolio projects → /work/<slug>/ case-study pages.
 *
 * Every image slot is optional. Leave it out and the page shows a labelled
 * placeholder with the size to export at. To fill a slot, drop the file in
 * src/assets/projects/<slug>/ and import it here, e.g.
 *   import voidHero from '../assets/projects/void-cavitation/hero.jpg';
 *   images: { hero: voidHero }
 */
import type { ImageMetadata } from 'astro';

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
  images?: {
    hero?: ImageMetadata;      // 2400×1350 (16:9)
    logoLight?: ImageMetadata; // logo on white, SVG or PNG
    logoDark?: ImageMetadata;  // logo on black, SVG or PNG
    desktop?: ImageMetadata;   // 1440×900 browser screenshot
    mobile?: ImageMetadata;    // 390×844 phone screenshot
    gallery?: ImageMetadata[]; // up to 3, 1600×1200 (4:3)
  };
};

const TBD = {
  challenge: '[Challenge: where the client was before, and what they needed.]',
  built: '[What we built: the logo, the site and anything else in the system.]',
  result: '[Result: what changed. Calls, quotes, launch, feedback.]',
};

export const PROJECTS: Project[] = [
  {
    slug: '6-days',
    name: '6 Days',
    url: 'https://6days.ca/',
    industry: 'Business directory',
    services: ['Logo', 'Brand', 'Website'],
    summary: 'A values-aligned directory for Ontario businesses, branded and built from the ground up.',
    story: TBD,
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

export const projectHref = (p: Project) => `/work/${p.slug}/`;
