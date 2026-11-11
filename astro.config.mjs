// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// Pages are prerendered to static HTML by default (fastest possible delivery).
// The Cloudflare adapter lets individual routes opt into server rendering
// (e.g. the contact form endpoint) with `export const prerender = false`.
export default defineConfig({
  site: 'https://sendercreative.ca',
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
