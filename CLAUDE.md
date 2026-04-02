# jlucus.dev - Developer Portfolio

> A Terminal Neon themed portfolio showcasing ventures, projects, and skills with a modern developer aesthetic.

## Overview

This is a Next.js 15 portfolio website built with TypeScript, Tailwind CSS 4, and Framer Motion. It features a unique Terminal Neon design system with Electric Cyan primary color, Neon Magenta accents, and immersive terminal-style UI elements.

## Tech Stack

- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.5 with CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React, Heroicons
- **UI Components**: Headless UI, Radix UI Slot
- **Fonts**: JetBrains Mono (monospace), Inter (sans-serif)

## Design System

### Color Scheme - Terminal Neon

All colors are defined as CSS variables in `src/styles/globals.css` using RGB values for alpha channel support:

```css
--color-primary: 0 217 255;        /* Electric Cyan #00D9FF */
--color-accent: 255 0 110;         /* Neon Magenta #FF006E */
--color-secondary: 204 255 0;      /* Electric Lime #CCFF00 */
--color-success: 0 255 159;        /* #00FF9F */
--color-warning: 255 184 0;        /* #FFB800 */
--color-error: 255 71 87;          /* #FF4757 */
```

### CSS Variables Philosophy

**CRITICAL**: This project uses CSS variables exclusively. NEVER use hardcoded CSS values. All colors, spacing, fonts, shadows, and other design tokens are defined as variables in `:root` and referenced via Tailwind's theme configuration.

**Why?**
- Enables easy theming and dark mode support
- Single source of truth for design tokens
- Prevents inconsistencies across the codebase
- Supports alpha channel via `rgb(var(--color-primary) / <alpha-value>)`

### Typography

- **Headings**: JetBrains Mono (monospace, terminal aesthetic)
- **Body**: Inter (clean, readable)
- **Code**: JetBrains Mono

### Spacing System

All spacing uses CSS variables:
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

### Neon Effects

Custom neon glow shadows for that cyberpunk aesthetic:
```css
--shadow-neon-primary: 0 0 5px rgb(var(--color-primary)), 0 0 20px rgb(var(--color-primary));
--shadow-neon-primary-lg: 0 0 10px rgb(var(--color-primary)), 0 0 40px rgb(var(--color-primary));
```

## Project Structure

```
jlucus2/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Homepage with all sections
│   │   └── globals.css         # CSS variables & Tailwind directives
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx      # Navigation header
│   │   │   └── footer.tsx      # Site footer
│   │   ├── sections/
│   │   │   ├── hero-terminal.tsx      # Hero with terminal UI
│   │   │   ├── ventures-section.tsx   # Ventures showcase
│   │   │   ├── portfolio-section.tsx  # Projects portfolio
│   │   │   ├── skill-tree.tsx         # Skills display
│   │   │   ├── contact-section.tsx    # Contact form
│   │   │   └── animated-grid.tsx      # Background grid
│   │   └── ui/
│   │       ├── button.tsx            # Button component with Slot support
│   │       └── command-palette.tsx   # Command palette UI
│   ├── data/
│   │   ├── ventures.ts         # Ventures data
│   │   ├── projects.ts         # Projects data
│   │   └── skills.ts           # Skills data
│   ├── lib/
│   │   ├── utils.ts            # Utility functions (cn, debounce, etc.)
│   │   └── constants.ts        # Site constants & config
│   └── styles/
│       └── globals.css         # Global styles & CSS variables
├── public/                     # Static assets
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind configuration
├── postcss.config.js           # PostCSS with Tailwind plugin
└── next.config.js              # Next.js configuration
```

## Key Features

### 1. Hero Terminal Section
- Interactive terminal UI with typing animation
- System info display
- Animated command execution
- Stats showcase
- Animated grid background

### 2. Ventures Section
- Hexagonal card layout
- Status indicators (building, launching, growing, scaling)
- Metrics display (users, growth, revenue)
- Hover effects with neon glow
- Tech stack tags

### 3. Portfolio Section
- Filterable project grid
- Category badges
- GitHub stars/forks metrics
- Featured project highlighting
- Live demo links

### 4. Skills Section
- Collapsible skill categories
- XP-based progress bars
- Level indicators (beginner → master)
- Project association
- Category statistics

### 5. Contact Section
- Contact form with validation
- Social links
- Availability status
- Response time indicator

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Server

The site runs at `http://localhost:3000` in development mode with hot module replacement.

## Configuration

### Site Constants

Edit `src/lib/constants.ts` to update:
- Site metadata (title, description, URL)
- Social links (GitHub, LinkedIn, Email)
- Navigation sections
- Terminal commands

### Data Management

Update content in `src/data/`:
- **ventures.ts**: Add/edit ventures with status, tech stack, metrics
- **projects.ts**: Add/edit projects with category, featured status
- **skills.ts**: Add/edit skills with levels, XP, categories

### Styling

Modify design tokens in `src/styles/globals.css`:
- Colors (maintain RGB format for alpha support)
- Spacing scale
- Typography scales
- Shadows and effects
- Border radius values

## Components

### Button Component

Supports both button and anchor elements via `asChild` prop:

```tsx
// As button
<Button variant="default" size="lg">
  Click Me
</Button>

// As link (using asChild with Slot)
<Button variant="outline" size="sm" asChild>
  <a href="/link">Visit</a>
</Button>
```

**Variants**: default, destructive, outline, secondary, ghost, link
**Sizes**: default, sm, lg, icon
**Props**: loading, asChild, disabled

### Utility Functions

Located in `src/lib/utils.ts`:

```tsx
import { cn, debounce, throttle, lerp, copyToClipboard } from '@/lib/utils'

// Class names merging
cn('class1', 'class2', { conditional: true })

// Debounce function calls
const debouncedFn = debounce(() => {}, 300)

// Linear interpolation for animations
const value = lerp(start, end, progress)
```

## Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 640px (stacked layout)
- **Tablet**: 640px - 1024px (2-column grid)
- **Desktop**: 1024px - 1280px (3-column grid)
- **Widescreen**: > 1280px (optimized spacing)

### Terminal Aesthetic Layouts

- **Desktop**: Terminal split 50/50 layout
- **Mobile**: Stacked terminal windows
- **Tablet**: Centered terminal UI
- **Widescreen**: Command center layout

## Animations

Powered by Framer Motion:

- **Scroll-based animations**: `whileInView` with `viewport={{ once: true }}`
- **Stagger effects**: Delayed animations for lists
- **Hover effects**: Scale, glow, and color transitions
- **Typing animations**: Terminal command simulation

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Color contrast compliance (WCAG AA)

## Performance Optimizations

- Next.js App Router with RSC
- Font optimization with `next/font`
- Image optimization with `next/image`
- Code splitting by route
- CSS-in-JS with zero runtime (Tailwind)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

```bash
# Build
npm run build

# The output is in .next/ folder
# Deploy .next/ to your hosting provider
```

## Environment Variables

Create `.env.local` for local development:

```bash
# Add any API keys or secrets here
NEXT_PUBLIC_SITE_URL=https://jlucus.dev
```

## Known Issues

- **PostCSS**: Tailwind CSS 4 requires `@tailwindcss/postcss` plugin instead of `tailwindcss` directly
- **Slot Component**: When using `asChild` with Button, loading state is ignored (Slot accepts single child only)

## Future Enhancements

See `PROJECT_ROADMAP.md` for planned features and improvements.

## Contributing

This is a personal portfolio, but suggestions and bug reports are welcome!

## License

MIT License - feel free to use this as inspiration for your own portfolio.

## Contact

- **Website**: [jlucus.dev](https://jlucus.dev)
- **GitHub**: [@4eckd](https://github.com/4eckd)
- **Email**: contact@jlucus.dev

---

Built with by jlucus using Claude Code
