// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    alpinejs({ entrypoint: '/src/entrypoint' }),
    sitemap(),
  ],
  site: 'https://theantiquearchive.com',
  // base: '/Archive', // Not needed with custom domain
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      cssMinify: true,
    },
  },
});
