/**
 * Service pages. Each slug matches the old WordPress URL so existing rankings carry over.
 * Edit copy here; the page template (src/pages/[service].astro) lays it out.
 */
export type Service = {
  slug: string;
  title: string;
  /** Shorter label for menus and cards */
  short: string;
  seoTitle: string;
  description: string;
  /** Which part of the system this belongs to (homepage "What we build") */
  layer: string;
  intro: string;
  benefits: { title: string; text: string }[];
  includes: { title: string; text: string }[];
  /** Which portfolio group to show, if any */
  work?: 'logos' | 'videos' | 'websites';
  faq: { q: string; a: string }[];
};

const AREA = 'Hamilton, Haldimand & Norfolk';

export const SERVICES: Service[] = [
  {
    slug: 'logo-design-branding',
    title: 'Logo Design & Branding',
    short: 'Branding',
    seoTitle: `Logo Design & Branding in ${AREA} | Sender Creative`,
    description: 'Custom logos and brand systems for local businesses: guidelines, colours and type, business cards, signage and vehicle wraps. Consistent everywhere you show up.',
    layer: 'Brand & Content',
    intro: 'Your logo is the face. Branding is everything around it: the colours, the type, the sign, the truck, the quote. We design the whole set, so your business looks like the same company everywhere it shows up.',
    benefits: [
      { title: 'Look established', text: 'A consistent brand makes you look credible before anyone picks up the phone.' },
      { title: 'Get remembered', text: 'The same look everywhere means people recognize you the second time, and the tenth.' },
      { title: 'Stand apart', text: 'A brand built for you, not from a template, so you stop blending in with competitors.' },
    ],
    includes: [
      { title: 'Custom logo design', text: 'Drawn from scratch, with versions for every use: full logo, icon, light and dark.' },
      { title: 'Brand guidelines', text: 'How to use your brand, and how not to, so it stays consistent no matter who touches it.' },
      { title: 'Colour & type', text: 'A palette and fonts chosen to work on screen, in print and on the side of a building.' },
      { title: 'Business cards & print', text: 'Cards, letterhead, flyers and the everyday pieces that carry your name.' },
      { title: 'Signage & vehicle wraps', text: 'Storefronts, job-site signs and wraps, designed to read at a glance.' },
      { title: 'Refresh or rebuild', text: 'Keep the recognition you’ve earned and sharpen it, or start fresh. We’ll tell you which makes sense.' },
    ],
    work: 'logos',
    faq: [
      { q: 'Can you refresh my existing logo instead of starting over?', a: 'Yes. If your current logo has recognition worth keeping, we refine it rather than replace it. If it’s holding you back, we’ll say so and show you why.' },
      { q: 'What files do I get?', a: 'Everything: vector and image files for print and web, light and dark versions, and a brand guide. It’s all yours, with no strings attached.' },
      { q: 'Do you do vehicle wraps and signs?', a: 'We design them and set up print-ready files, and we can coordinate with your sign or wrap shop.' },
    ],
  },
  {
    slug: 'photo-video',
    title: 'Photo & Video',
    short: 'Photo & Video',
    seoTitle: `Photo & Video Production in ${AREA} | Sender Creative`,
    description: 'On-site photo and video for local businesses: brand films, social reels, product shots, drone and before-and-after. Shot and edited in-house.',
    layer: 'Brand & Content',
    intro: 'Real photos and video of your work build trust faster than anything you can write. We shoot on-site and edit in-house, then cut it into content for your website, socials and ads.',
    benefits: [
      { title: 'Show the real thing', text: 'Your work, your space, your people. Not stock photos that every competitor also uses.' },
      { title: 'Look professional online', text: 'Sharp visuals make your website and profiles feel like a business people can trust.' },
      { title: 'Content that keeps working', text: 'One shoot fills your site, your social calendar and your ads for months.' },
    ],
    includes: [
      { title: 'On-site photo & video', text: 'We come to you and capture the work, the space and the team.' },
      { title: 'Brand films', text: 'Short films that tell people who you are and why to choose you.' },
      { title: 'Social reels', text: 'Vertical edits built for Instagram, Facebook and TikTok.' },
      { title: 'Product photography', text: 'Clean, high-quality images for your website, catalogue or store.' },
      { title: 'Drone', text: 'Aerial footage for sites, properties and projects that look best from above.' },
      { title: 'Before & after', text: 'The simplest proof there is, shot properly.' },
    ],
    work: 'videos',
    faq: [
      { q: 'Do you travel to us?', a: `Yes. We shoot on-site across ${AREA} and nearby.` },
      { q: 'What happens to the footage after the shoot?', a: 'We edit it into finished pieces for your website, social media and ads. The finished files are yours to keep and use.' },
    ],
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design & Print',
    short: 'Graphic Design',
    seoTitle: `Graphic Design & Print in ${AREA} | Sender Creative`,
    description: 'Print and digital design for local businesses: brochures, flyers, proposals, trade show displays, social graphics and infographics, all built from your brand.',
    layer: 'Get Found',
    intro: 'Good design is clear communication. Every piece is made from scratch to match your brand, and set up properly for print or screen so it comes out the way it should.',
    benefits: [
      { title: 'On brand, every time', text: 'Everything is built from your brand, so it all looks like it came from the same company.' },
      { title: 'Print-ready', text: 'Correct sizes, bleeds and colours, so there are no surprises from the printer.' },
      { title: 'One place for all of it', text: 'From a single business card to a full trade show booth.' },
    ],
    includes: [
      { title: 'Print material', text: 'Brochures, flyers, rack cards, mailers and door hangers.' },
      { title: 'Proposals & sales decks', text: 'Quote and proposal templates that help you close the work.' },
      { title: 'Trade show', text: 'Banners, booth displays and handouts.' },
      { title: 'Digital graphics', text: 'Social posts, ad creative and email templates.' },
      { title: 'Illustrations & infographics', text: 'Explain a process, a product or a result at a glance.' },
      { title: 'Packaging & labels', text: 'For products that need to stand out on a shelf.' },
    ],
    faq: [
      { q: 'Do you handle printing?', a: 'We prepare print-ready files and can coordinate the print job with your printer, or recommend one.' },
      { q: 'Can I get templates my team can edit?', a: 'Yes. For things you make often, like social posts or quotes, we can set up templates your team can update themselves.' },
    ],
  },
  {
    slug: 'website-lead-capture',
    title: 'Websites & Lead Capture',
    short: 'Websites & SEO',
    seoTitle: `Website Design & Local SEO in ${AREA} | Sender Creative`,
    description: 'Fast, modern websites built to turn visitors into calls and quote requests, plus Google Business Profile setup and local SEO so nearby customers find you first.',
    layer: 'Website',
    intro: 'A website should look good and do a job: explain what you do, answer the obvious questions, and turn visitors into calls and quote requests. Then Google needs to send the right people to it. We handle both.',
    benefits: [
      { title: 'More calls and quotes', text: 'Clear pages and simple forms that make it easy to reach you.' },
      { title: 'Found locally', text: 'Show up on Google Search and Maps when someone nearby needs what you do.' },
      { title: 'Fast on every device', text: 'Built to load quickly and work properly on phones, where most people will find you.' },
    ],
    includes: [
      { title: 'Custom website design', text: 'Designed around your business and your customers, not a template.' },
      { title: 'Lead capture forms', text: 'Quote and booking forms that land straight in your inbox.' },
      { title: 'Hosting, domain & migration', text: 'We set it up, move your old site over, or work with what you already have.' },
      { title: 'Google Business Profile', text: 'Set up and optimized properly, so you show up on Maps with the right details.' },
      { title: 'Local SEO', text: 'Local keyword research, on-page SEO, consistent business listings and directory citations.' },
      { title: 'Reviews & reputation', text: 'A simple way to ask for reviews, and a plan for responding to them.' },
    ],
    work: 'websites',
    faq: [
      { q: 'Do I have to host my website with you?', a: 'No. We can host it for you, or hand it over and you host it wherever you like. Your site and domain stay in your name either way.' },
      { q: 'Will I be able to update it myself?', a: 'We set it up so the things you change often are easy to update. Or we keep it updated for you, whichever you prefer.' },
      { q: 'How long until I show up on Google?', a: 'Your Google Business Profile can start showing up within weeks. Organic search rankings build over months. Anyone who promises page one by a date is guessing.' },
    ],
  },
  {
    slug: 'management',
    title: 'Marketing Management',
    short: 'Management',
    seoTitle: `Marketing Management for Local Businesses | Sender Creative`,
    description: 'Ongoing marketing for local businesses, run month to month: social media, Google Business Profile, reviews, ads, content and reporting, all in your name.',
    layer: 'We run it',
    intro: 'Once your system is built, someone has to keep it running. We handle it month to month: posting, shooting, reviews, ads and reporting. It gets done while you run your business, and everything stays in your name.',
    benefits: [
      { title: 'One partner', text: 'One team for all of it, instead of juggling a designer, a photographer and an ad person.' },
      { title: 'Consistent presence', text: 'Your brand shows up properly and regularly, everywhere, every month.' },
      { title: 'Clear reporting', text: 'Calls, forms and cost per lead on one scoreboard, so you can see what’s working.' },
    ],
    includes: [
      { title: 'Social media', text: 'Planned, designed, written and scheduled. Community management included.' },
      { title: 'Google Business Profile & local SEO', text: 'Posts, photos, updates and listing upkeep so you keep showing up.' },
      { title: 'Reviews & reputation', text: 'Review requests sent out, and responses handled.' },
      { title: 'Ads management', text: 'Google and Meta campaigns aimed at the work you actually want.' },
      { title: 'Content shoots', text: 'Regular photo and video sessions to keep fresh content coming.' },
      { title: 'Design on demand', text: 'Flyers, signs, posts and whatever else comes up.' },
    ],
    faq: [
      { q: 'What if I want to stop?', a: 'Everything is set up in your name: accounts, files and logins. If you stop, you take the keys and keep it all. A clean break.' },
      { q: 'Do I have to sign up for everything?', a: 'No. We start with what will make the biggest difference for you and add more only if it makes sense.' },
    ],
  },
  {
    slug: 'consultation',
    title: 'Marketing Consultation & Strategy',
    short: 'Consultation',
    seoTitle: `Marketing Consultation & Strategy in ${AREA} | Sender Creative`,
    description: 'A clear marketing plan before you spend: business and competitor review, website and lead audit, positioning and a step-by-step roadmap for your local market.',
    layer: 'Strategy',
    intro: 'Not sure what to do first? We look at where you stand, who you’re up against and where leads are slipping away, then give you a clear plan in the right order. Do it yourself, or have us build it.',
    benefits: [
      { title: 'No guesswork', text: 'Clear, honest advice on what will work for your business, and what won’t.' },
      { title: 'Built for you', text: 'Based on your goals, your budget and your local market. Nothing generic.' },
      { title: 'Your choice after', text: 'Take the plan and run with it, or have us build some or all of it.' },
    ],
    includes: [
      { title: 'Business & market review', text: 'Your customers, your area and the opportunities you’re missing.' },
      { title: 'Competitor review', text: 'Who you’re up against online, and how to stand apart from them.' },
      { title: 'Website & lead audit', text: 'Where visitors drop off, and what’s stopping them from calling.' },
      { title: 'Positioning & messaging', text: 'What you say about yourself, and how to say it so it sticks.' },
      { title: 'Marketing roadmap', text: 'A step-by-step plan, in priority order, for what to do first.' },
    ],
    faq: [
      { q: 'Is this the same as the first call?', a: 'Every project starts with a call, and a visit if it’s a fit. A consultation goes further: a full review and a written plan you can act on, whether or not we build it.' },
      { q: 'Do I have to hire you afterwards?', a: 'No. The plan is yours to use however you like.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
