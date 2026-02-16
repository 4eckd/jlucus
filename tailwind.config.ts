import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Terminal Neon Color Palette - matches globals.css
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          glow: 'rgb(var(--color-primary-glow) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
        },
        // Dark theme shades
        dark: {
          400: 'rgb(var(--color-dark-400) / <alpha-value>)',
          500: 'rgb(var(--color-dark-500) / <alpha-value>)',
          600: 'rgb(var(--color-dark-600) / <alpha-value>)',
          700: 'rgb(var(--color-dark-700) / <alpha-value>)',
          800: 'rgb(var(--color-dark-800) / <alpha-value>)',
          900: 'rgb(var(--color-dark-900) / <alpha-value>)',
          950: 'rgb(var(--color-dark-950) / <alpha-value>)',
        },
        // Text colors
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--color-text-tertiary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        // Background colors
        background: 'rgb(var(--color-background))',
        'background-secondary': 'rgb(var(--color-background-secondary))',
        'background-tertiary': 'rgb(var(--color-background-tertiary))',
        // Surface colors (for cards, panels, overlays)
        surface: 'rgb(var(--color-surface))',
        'surface-hover': 'rgb(var(--color-surface-hover))',
        //  Aliases for components
        'primary-foreground': 'rgb(var(--color-dark-950) / <alpha-value>)',
        'destructive': 'rgb(var(--color-error) / <alpha-value>)',
        'destructive-foreground': 'rgb(var(--color-text-primary) / <alpha-value>)',
        input: 'rgb(var(--color-primary) / 0.2)',
        ring: 'rgb(var(--color-primary) / <alpha-value>)',
        muted: 'rgb(var(--color-dark-700) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--color-text-primary) / <alpha-value>)',
        border: 'rgb(var(--color-border) / 0.1)',
        'border-muted': 'rgb(var(--color-border-muted) / <alpha-value>)',
      },
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
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        // Neon glow shadows - Primary (Electric Cyan)
        'neon-primary': 'var(--shadow-neon-primary)',
        'neon-primary-sm': 'var(--shadow-neon-primary-sm)',
        'neon-primary-lg': 'var(--shadow-neon-primary-lg)',
        'neon-primary-xl': 'var(--shadow-neon-primary-xl)',
        // Neon glow shadows - Accent (Neon Magenta)
        'neon-accent': 'var(--shadow-neon-accent)',
        'neon-accent-sm': 'var(--shadow-neon-accent-sm)',
        'neon-accent-lg': 'var(--shadow-neon-accent-lg)',
        'neon-accent-xl': 'var(--shadow-neon-accent-xl)',
        // Neon glow shadows - Secondary (Electric Lime)
        'neon-secondary': 'var(--shadow-neon-secondary)',
        'neon-secondary-sm': 'var(--shadow-neon-secondary-sm)',
        'neon-secondary-lg': 'var(--shadow-neon-secondary-lg)',
        'neon-secondary-xl': 'var(--shadow-neon-secondary-xl)',
        // Neon glow shadows - Success
        'neon-success': 'var(--shadow-neon-success)',
        'neon-success-sm': 'var(--shadow-neon-success-sm)',
        'neon-success-lg': 'var(--shadow-neon-success-lg)',
        'neon-success-xl': 'var(--shadow-neon-success-xl)',
        // Neon glow shadows - Warning
        'neon-warning': 'var(--shadow-neon-warning)',
        'neon-warning-sm': 'var(--shadow-neon-warning-sm)',
        'neon-warning-lg': 'var(--shadow-neon-warning-lg)',
        'neon-warning-xl': 'var(--shadow-neon-warning-xl)',
        // Neon glow shadows - Error
        'neon-error': 'var(--shadow-neon-error)',
        'neon-error-sm': 'var(--shadow-neon-error-sm)',
        'neon-error-lg': 'var(--shadow-neon-error-lg)',
        'neon-error-xl': 'var(--shadow-neon-error-xl)',
        // Neon glow shadows - Info
        'neon-info': 'var(--shadow-neon-info)',
        'neon-info-sm': 'var(--shadow-neon-info-sm)',
        'neon-info-lg': 'var(--shadow-neon-info-lg)',
        'neon-info-xl': 'var(--shadow-neon-info-xl)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        DEFAULT: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
      zIndex: {
        dropdown: 'var(--z-index-dropdown)',
        sticky: 'var(--z-index-sticky)',
        fixed: 'var(--z-index-fixed)',
        'modal-backdrop': 'var(--z-index-modal-backdrop)',
        modal: 'var(--z-index-modal)',
        popover: 'var(--z-index-popover)',
        tooltip: 'var(--z-index-tooltip)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker-neon': 'flicker-neon 3s linear infinite',
        'breathe-neon': 'breathe-neon 4s ease-in-out infinite',
        'glow-surge': 'glow-surge 2s ease-in-out infinite',
        'border-pulse-neon': 'border-pulse-neon 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 8px rgb(var(--color-primary)))'
          },
          '50%': {
            opacity: '0.5',
            filter: 'drop-shadow(0 0 4px rgb(var(--color-primary)))'
          },
        },
        'flicker-neon': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
          },
          '20%, 24%, 55%': {
            opacity: '0.4',
          },
        },
        'breathe-neon': {
          '0%, 100%': {
            boxShadow: 'var(--shadow-neon-primary)',
          },
          '50%': {
            boxShadow: 'var(--shadow-neon-primary-xl)',
          },
        },
        'glow-surge': {
          '0%': {
            boxShadow: 'var(--shadow-neon-primary-sm)',
          },
          '50%': {
            boxShadow: 'var(--shadow-neon-primary-lg)',
          },
          '100%': {
            boxShadow: 'var(--shadow-neon-primary-sm)',
          },
        },
        'border-pulse-neon': {
          '0%, 100%': {
            borderColor: 'rgb(var(--color-primary) / 0.3)',
            boxShadow: 'inset 0 0 10px rgb(var(--color-primary) / 0.2), 0 0 5px rgb(var(--color-primary) / 0.3)',
          },
          '50%': {
            borderColor: 'rgb(var(--color-primary))',
            boxShadow: 'inset 0 0 20px rgb(var(--color-primary) / 0.4), 0 0 20px rgb(var(--color-primary) / 0.8)',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgb(var(--color-primary)), 0 0 10px rgb(var(--color-primary))'
          },
          '50%': {
            boxShadow: '0 0 10px rgb(var(--color-primary)), 0 0 20px rgb(var(--color-primary)), 0 0 30px rgb(var(--color-primary))'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
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
