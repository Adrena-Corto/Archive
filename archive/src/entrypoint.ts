import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  // Re-initialize Alpine components after View Transitions page swap
  document.addEventListener('astro:after-swap', () => {
    Alpine.initTree(document.body);
  });
};
