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
  /** What the logo means — shown beside the light/dark logos */
  mark?: string;
  /** What the brand package included */
  delivered?: string[];
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
    year: '2026',
    industry: 'Gutters & exteriors',
    services: ['Brand', 'Logo', 'Website', 'Instant estimate'],
    summary: 'A new gutter company with a name, and a love of the outdoors, to build on. We turned both into a brand with a story and a site that prices the job on the spot.',
    story: {
      challenge: 'The owner had just gone out on his own and was still working through ideas for a name. Once Venture was settled, he needed everything else: a brand, a website and a way to be found.',
      built: 'The full brand, from logo to layouts, plus a website with a simple calculator so homeowners can get a ballpark price without waiting on a call. The SEO groundwork went in from day one.',
      result: 'A one-person start-up that looks established from the first quote, with the complete logo suite and brand files in hand.',
    },
    mark: 'Venture comes from the owner’s love of the outdoors: hiking, camping, paddling. Look at the mark one way and it’s a roof peak at sunrise with water running down the gutter. Look again and it’s a mountain at dawn above a flowing river. A shield wraps around both for protection, and doubles as the V.',
    delivered: ['Logo suite, horizontal + stacked', 'Brand fonts', 'Layouts', 'Full file package'],
  },
  {
    slug: 'gutter-sleeve',
    name: 'Gutter Sleeve',
    url: 'https://guttersleeve.ca/',
    year: '2025',
    industry: 'Gutter repair product · Dunnville, ON',
    services: ['Brand', 'Logo', 'Website', 'Packaging', 'Explainer video'],
    summary: 'A new product, designed and made in Dunnville, Ontario. We branded it, packaged it, explained it on video and built the site to sell it.',
    story: {
      challenge: 'The team invented a flexible rubber sleeve that seals leaking gutter seams. They had the product. They needed a brand that would make sense to a tradesperson in a second, on a shelf or a screen.',
      built: 'The brand and logo, the packaging, an explainer video, and a website to promote the product, built ready to take orders directly when they are.',
      result: 'Now building a client base and testing in retailers, with direct-to-consumer sales coming to the site next.',
    },
    mark: 'A stylized G and S that looks like the product itself. Strong trade oranges and stark, simple imagery mean people know what it’s for before they read a word.',
    delivered: ['Logo suite', 'Brand fonts', 'Packaging', 'Explainer video', 'Full file package'],
  },
  {
    slug: 'jb-controls',
    name: 'JB Controls',
    url: 'https://jbcontrols.ca/',
    industry: 'Greenhouse control systems',
    services: ['Brand refresh', 'Logo', 'Website'],
    summary: 'New ownership, a new look. A refreshed brand and website for a company that builds and installs control systems for greenhouses.',
    story: {
      challenge: 'JB Controls has more than 30 years in controls and electrical work. When ownership changed, the new owners wanted a brand and a website that matched where the company is going.',
      built: 'A refreshed logo and brand, and a new website that puts their experience and services front and centre.',
      result: 'A modern identity for the next chapter, carried through a new website built around their experience.',
    },
    mark: 'The J and B grow out of a single dot. It reads as a seed for the greenhouse side of the business, or a button for the controls side.',
    delivered: ['Logo suite, horizontal + stacked', 'Brand fonts', 'Layouts', 'Full file package'],
  },
  {
    slug: 'ontario-window-door-products',
    name: 'Ontario Window & Door Products',
    url: 'https://ontwindowdoorproducts.com/',
    year: '2025',
    industry: 'Windows & doors',
    services: ['Brand', 'Logo', 'Website', 'Project calculator'],
    summary: '“We make windows and doors easy.” A launch brand and website built around one promise, with a calculator that prices a project instantly.',
    story: {
      challenge: 'A new company launching alongside several sister companies. It needed its own logo and website, and still had to sit naturally next to the family it belongs to.',
      built: 'The logo, the messaging and the website, all built around “we make windows and doors easy.” The site has several custom forms, including a project calculator that gives people a price on the spot.',
      result: 'Launched with a brand that fits the family and a site that does what the slogan promises.',
    },
    mark: 'A stylized O with a door hidden inside it.',
    delivered: ['Logo suite', 'Brand fonts', 'Layouts', 'Full file package'],
  },
  {
    slug: 'void-cavitation',
    name: 'Void Cavitation',
    url: 'https://voidcavitation.com/',
    status: 'soon',
    year: '2026',
    industry: 'Hydrodynamic cavitation',
    services: ['Brand', 'Logo', 'Website', 'Sales materials', 'Launch plan'],
    ongoing: ['Launch'],
    summary: 'A start-up bringing hydrodynamic cavitation to industry. They needed the whole package, fast: brand, website, sales materials and a plan to launch it all.',
    story: {
      challenge: 'Void is bringing a futuristic technology to market and needed to look the part from day one. The brand had to come together quickly, and everything else had to be built from the ground up.',
      built: 'The brand and logo, a brand-new website, presentations, sales documents and a launch plan. The full gamut, still rolling out.',
      result: 'A brand that’s instantly recognizable and scales from an embroidered jacket to a van wrap. The launch is underway now.',
    },
    mark: 'Built to look like a high-tech company. The O is carved from negative space, with a spinning icon at its centre that stands for the technology itself. It holds up at any size.',
    delivered: ['Logo suite + icon', 'Brand fonts', 'Layouts', 'Presentations', 'Sales documents', 'Full file package'],
  },
];

export const PROJECTS: Project[] = LIST.map((p) => ({ ...p, images: { ...imagesFor(p.slug), ...p.images } }));

export const projectHref = (p: Project) => `/work/${p.slug}/`;
