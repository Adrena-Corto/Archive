// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    alpinejs(),
    sitemap(),
  ],
  site: 'https://theantiquearchive.com',
  // base: '/Archive', // Not needed with custom domain
});
