import type { Config } from 'tailwindcss';

/**
 * Nexa Connect design tokens.
 *
 * One hue family only - pine/signal are the same green at different depths.
 * The `deep` / `soft` steps exist purely so text and icons can hit WCAG AA on
 * both light (paper/mist) and dark (pine) surfaces. They are NOT a second
 * accent colour, and nothing outside this file should introduce one.
 *
 *   signal.DEFAULT  the motif, borders, accents on dark surfaces   (5.1:1 on pine.deep)
 *   signal.deep     text + icons on light surfaces                 (5.5:1 paper, 5.0:1 mist)
 *   signal.soft     hover state on dark surfaces
 *
 * signal.deep is tuned against `mist`, not `paper` - mist is the darker of the
 * two light surfaces, so it is the binding constraint for the 11px eyebrow text.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: '#1B4332',
          deep: '#0E2A1D',
          soft: '#285C43',
        },
        signal: {
          DEFAULT: '#3FA679',
          deep: '#257357',
          soft: '#5CBE92',
        },
        paper: '#FAFAF8',
        ink: {
          DEFAULT: '#12211B',
          soft: '#4A5C53',
        },
        mist: '#EAF1EC',
        line: {
          DEFAULT: '#D8E3DC',
          dark: 'rgba(63, 166, 121, 0.22)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Type scale - 1.25 ratio, clamped so the hero scales without breakpoints.
        'display-lg': ['clamp(2.75rem, 1.6rem + 4.6vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.032em' }],
        'display-md': ['clamp(2.25rem, 1.5rem + 3vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.028em' }],
        'display-sm': ['clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.022em' }],
      },
      letterSpacing: {
        label: '0.16em',
      },
      borderRadius: {
        card: '14px',
        /* Buttons and button-like controls (filter chips, icon buttons, CTAs). */
        button: '9999px',
        /* Everything else that isn't a card: inputs, selects, icon tiles, menu rows. */
        control: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 33, 27, 0.04), 0 8px 24px -12px rgba(18, 33, 27, 0.10)',
        'card-hover': '0 2px 4px rgba(18, 33, 27, 0.05), 0 22px 44px -18px rgba(18, 33, 27, 0.20)',
        focus: '0 0 0 3px rgba(63, 166, 121, 0.35)',
      },
      transitionTimingFunction: {
        // Single shared easing so every animation on the site has the same rhythm.
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        /*
         * Sweeps a soft band of `signal` along a hairline rail - the same
         * "pulse travelling down the path" idea as the hero motif, done in CSS
         * so the service-card connector stays a server component.
         * Ends at 150% (band fully off the right edge), which is also what
         * reduced-motion users see once the global rule collapses the duration.
         */
        'rail-sweep': {
          from: { backgroundPosition: '-50% 0' },
          to: { backgroundPosition: '150% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'rail-sweep': 'rail-sweep 7s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
