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
  site: 'https://adrena-corto.github.io',
  base: '/Archive',
});
