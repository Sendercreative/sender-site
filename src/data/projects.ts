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
import sixLight from '../assets/projects/6-days/logo-light.svg';
import sixDark from '../assets/projects/6-days/logo-dark.svg';
import ventureLight from '../assets/projects/venture-gutter-services/logo-light.png';
import ventureDark from '../assets/projects/venture-gutter-services/logo-dark.png';
import gsLight from '../assets/projects/gutter-sleeve/logo-light.png';
import gsDark from '../assets/projects/gutter-sleeve/logo-dark.png';
import jbLight from '../assets/projects/jb-controls/logo-light.png';
import voidLight from '../assets/projects/void-cavitation/logo-light.svg';
import voidDark from '../assets/projects/void-cavitation/logo-dark.svg';
import sixDesk from '../assets/projects/6-days/desktop.jpg';
import sixMob from '../assets/projects/6-days/mobile.jpg';
import ventureDesk from '../assets/projects/venture-gutter-services/desktop.jpg';
import ventureMob from '../assets/projects/venture-gutter-services/mobile.jpg';
import gsDesk from '../assets/projects/gutter-sleeve/desktop.jpg';
import gsMob from '../assets/projects/gutter-sleeve/mobile.jpg';
import jbDesk from '../assets/projects/jb-controls/desktop.jpg';
import jbMob from '../assets/projects/jb-controls/mobile.jpg';
import owdpDesk from '../assets/projects/ontario-window-door-products/desktop.jpg';
import owdpMob from '../assets/projects/ontario-window-door-products/mobile.jpg';
import voidDesk from '../assets/projects/void-cavitation/desktop.jpg';
import voidMob from '../assets/projects/void-cavitation/mobile.jpg';

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
    hero?: ImageMetadata;      // 2400×1350 (16:9)
    logoLight?: ImageMetadata; // logo on white, SVG or PNG
    logoDark?: ImageMetadata;  // logo on black, SVG or PNG
    desktop?: ImageMetadata;   // 2:1 browser screenshot, 2400×1200
    mobile?: ImageMetadata;    // phone screenshot, bars cropped (~1080×1955)
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
    year: 'Built 2025 · launched 2026',
    industry: 'Christian business directory',
    services: ['Naming', 'Logo', 'Brand', 'Website'],
    ongoing: ['Social media', 'Email updates', 'Community growth'],
    summary: 'A home for Christian businesses in Canada: a directory, a job board and a community. Named, branded, built and run in-house.',
    images: { logoLight: sixLight, logoDark: sixDark, desktop: sixDesk, mobile: sixMob },
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
    images: { logoLight: ventureLight, logoDark: ventureDark, desktop: ventureDesk, mobile: ventureMob },
    story: TBD,
  },
  {
    slug: 'gutter-sleeve',
    name: 'Gutter Sleeve',
    url: 'https://guttersleeve.ca/',
    industry: 'Gutter repair product',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the Gutter Sleeve project.]',
    images: { logoLight: gsLight, logoDark: gsDark, desktop: gsDesk, mobile: gsMob },
    story: TBD,
  },
  {
    slug: 'jb-controls',
    name: 'JB Controls',
    url: 'https://jbcontrols.ca/',
    industry: 'Controls & automation',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the JB Controls project.]',
    images: { logoLight: jbLight, desktop: jbDesk, mobile: jbMob },
    story: TBD,
  },
  {
    slug: 'ontario-window-door-products',
    name: 'Ontario Window & Door Products',
    url: 'https://ontwindowdoorproducts.com/',
    industry: 'Windows & doors',
    services: ['Logo', 'Brand', 'Website'],
    summary: '[One-line summary of the OWDP project.]',
    images: { desktop: owdpDesk, mobile: owdpMob },
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
    images: { logoLight: voidLight, logoDark: voidDark, desktop: voidDesk, mobile: voidMob },
    story: TBD,
  },
];

export const projectHref = (p: Project) => `/work/${p.slug}/`;
