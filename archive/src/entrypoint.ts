import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  // Global store for mobile menu state - survives View Transitions
  Alpine.store('nav', {
    mobileMenuOpen: false,
    toggle() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      // Prevent body scroll when menu is open
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    },
    close() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  });

  // Re-initialize Alpine components after View Transitions page swap
  document.addEventListener('astro:after-swap', () => {
    // Close mobile menu on navigation
    Alpine.store('nav').close();
    Alpine.initTree(document.body);
  });

  // Also close on page load (handles direct navigation)
  document.addEventListener('astro:page-load', () => {
    Alpine.store('nav').close();
  });
};
