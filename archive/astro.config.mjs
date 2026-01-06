// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';

export default defineConfig({
  integrations: [
    tailwind(),
    alpinejs(),
  ],
  site: 'https://adrena-corto.github.io',
  base: '/Archive',
});
