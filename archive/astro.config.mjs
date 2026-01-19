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
    // Inline ALL stylesheets to eliminate render-blocking CSS requests
    // This trades larger HTML for faster FCP/LCP on slow connections
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      cssMinify: true,
    },
  },
});
