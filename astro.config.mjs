// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Pages are prerendered to static HTML by default (fastest possible delivery).
// The Cloudflare adapter lets individual routes opt into server rendering
// (e.g. the contact form endpoint) with `export const prerender = false`.
export default defineConfig({
  site: 'https://sendercreative.ca',
  adapter: cloudflare({ imageService: 'compile' }),
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
