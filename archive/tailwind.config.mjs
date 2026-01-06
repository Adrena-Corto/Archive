/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0f',
        surface: '#12121a',
        'surface-light': '#1a1a24',
        'surface-elevated': '#22222e',
        border: '#2a2a3a',
        'border-light': '#3a3a4a',
        text: '#e4e4e7',
        'text-muted': '#a1a1aa',  // Improved contrast (was #71717a)
        'text-dim': '#8a8a99',    // Improved contrast for WCAG AA (was #71717a ~4.5:1, now ~5.5:1)
        accent: '#22d3ee',
        'accent-glow': 'rgba(34, 211, 238, 0.5)',
        gold: '#fbbf24',
        'gold-glow': 'rgba(251, 191, 36, 0.5)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        cuneiform: ['Noto Sans Cuneiform', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.15)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.15)',
        'glow-cyan-lg': '0 0 40px rgba(34, 211, 238, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
