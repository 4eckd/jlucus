import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ═══════════════════════════════════════════════════════════════════
         COLOR PALETTE
         Uses semantic tokens from CSS variables (3-layer architecture)
         ═══════════════════════════════════════════════════════════════════ */
      colors: {
        /* Semantic colors (primary UI elements) */
        interactive: 'rgb(var(--color-interactive) / <alpha-value>)',
        emphasis: 'rgb(var(--color-emphasis) / <alpha-value>)',

        /* Status colors */
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',

        /* Background layers (depth) */
        bg: {
          base: 'rgb(var(--color-bg-base) / <alpha-value>)',
          primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
        },

        /* Text colors (contrast) */
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },

        /* Border colors */
        border: {
          primary: 'rgb(var(--color-border-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-border-secondary) / <alpha-value>)',
        },

        /* Component-specific aliases */
        button: {
          bg: 'rgb(var(--button-bg))',
          text: 'rgb(var(--button-text))',
        },
        card: {
          bg: 'rgb(var(--card-bg))',
        },
        input: {
          bg: 'rgb(var(--input-bg))',
          text: 'rgb(var(--input-text))',
        },

        /* Legacy aliases (for existing code compatibility) */
        primary: 'rgb(var(--color-interactive) / <alpha-value>)',
        accent: 'rgb(var(--color-emphasis) / <alpha-value>)',
        secondary: 'rgb(var(--color-emphasis) / <alpha-value>)',
        destructive: 'rgb(var(--color-error) / <alpha-value>)',
        destructive-foreground: 'rgb(var(--color-text-primary) / <alpha-value>)',
        muted: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
      },

      /* ═══════════════════════════════════════════════════════════════════
         TYPOGRAPHY
         ═══════════════════════════════════════════════════════════════════ */
      fontFamily: {
        mono: 'var(--font-mono)',
        sans: 'var(--font-sans)',
      },

      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
      },

      /* ═══════════════════════════════════════════════════════════════════
         SPACING SYSTEM
         ═══════════════════════════════════════════════════════════════════ */
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },

      /* ═══════════════════════════════════════════════════════════════════
         BORDER RADIUS
         ═══════════════════════════════════════════════════════════════════ */
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },

      /* ═══════════════════════════════════════════════════════════════════
         SHADOWS (GPU-optimized with drop-shadow)
         ═══════════════════════════════════════════════════════════════════ */
      dropShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        glow: 'var(--shadow-glow)',
        'glow-lg': 'var(--shadow-glow-lg)',
        'glow-accent': 'var(--shadow-glow-accent)',
      },

      /* ═══════════════════════════════════════════════════════════════════
         TRANSITIONS
         ═══════════════════════════════════════════════════════════════════ */
      transitionDuration: {
        fast: 'var(--transition-fast)',
        DEFAULT: 'var(--transition-base)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },

      transitionTimingFunction: {
        ease: 'var(--easing-ease-in-out)',
        'ease-in': 'var(--easing-ease-in)',
        'ease-out': 'var(--easing-ease-out)',
      },

      /* ═══════════════════════════════════════════════════════════════════
         Z-INDEX SCALE
         ═══════════════════════════════════════════════════════════════════ */
      zIndex: {
        base: 'var(--z-base)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        modal: 'var(--z-modal)',
      },

      /* ═══════════════════════════════════════════════════════════════════
         ANIMATIONS (GPU-safe transforms only)
         ═══════════════════════════════════════════════════════════════════ */
      animation: {
        /* Subtle pulsing effects */
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        /* Float and float effects */
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',

        /* Subtle movement */
        'scanline': 'scanline 6s linear infinite',

        /* Text animations */
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',

        /* Accessibility: Disable in prefers-reduced-motion */
        'none': 'none',
      },

      keyframes: {
        /* Optimized glow with drop-shadow filter */
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 8px rgb(var(--color-interactive)))',
          },
          '50%': {
            opacity: '0.7',
            filter: 'drop-shadow(0 0 12px rgb(var(--color-interactive) / 0.8))',
          },
        },

        /* Float animation (transform only = GPU accelerated) */
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },

        /* Scanline effect */
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },

        /* Typing animation */
        'typing': {
          from: { width: '0' },
          to: { width: '100%' },
        },

        /* Cursor blink */
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D9FF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },

  plugins: [],
}

export default config
