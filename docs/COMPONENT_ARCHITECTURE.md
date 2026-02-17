# Component Architecture

> Documentation for the component structure and organization of the jlucus.dev portfolio

**Issue**:
[#17 - Component architecture (sections, layout, ui)](https://github.com/4eckd/jlucus/issues/17)
**Phase**: Phase 1 - Foundation **Last Updated**: 2026-02-16

## Overview

This document outlines the component architecture for the jlucus.dev portfolio, built with Next.js
15, TypeScript, and the Terminal Neon design system. The architecture follows a modular,
feature-based organization with clear separation of concerns.

## Directory Structure

```
src/components/
├── effects/              # Visual effects and overlays
│   ├── custom-cursor.tsx
│   └── scanline-overlay.tsx
├── layout/              # Layout and navigation components
│   ├── Navigation.tsx
│   ├── client-layout.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   └── index.ts
├── providers/           # React context providers
│   └── ThemeProvider.tsx
├── sections/            # Page sections
│   ├── HeroSection.tsx      # [DEPRECATED] Legacy hero
│   ├── animated-grid.tsx
│   ├── contact-section.tsx
│   ├── hero-terminal.tsx    # [ACTIVE] Terminal Neon hero
│   ├── portfolio-section.tsx
│   ├── skill-tree.tsx
│   ├── ventures-section.tsx
│   └── index.ts
├── ui/                  # Reusable UI primitives
│   ├── button.tsx
│   └── command-palette.tsx
├── Card.tsx             # [UNUSED] Legacy card component
├── Footer.tsx           # [UNUSED] Lobe UI boilerplate
└── Header.tsx           # [UNUSED] Lobe UI boilerplate
```

## Component Categories

### 1. Layout Components (`/layout`)

Components that define the overall page structure and navigation.

**Active Components:**

- **header.tsx** - Fixed navigation header with scroll-based active section detection
  - Terminal-themed logo ("> jlucus\_")
  - Smooth scroll navigation
  - Mobile hamburger menu
  - Active section highlighting
  - Used in: `src/app/layout.tsx`

- **footer.tsx** - Site footer with links and social connections
  - Copyright information
  - Social media links
  - Quick navigation
  - Used in: `src/app/layout.tsx`

- **client-layout.tsx** - Client-side layout wrapper for effects
  - Manages client-only components (cursor, scanlines)
  - Used in: `src/app/layout.tsx`

- **Navigation.tsx** - Standalone navigation component
  - Used by header.tsx
  - Exported via index.ts

**Barrel Exports:** `layout/index.ts` exports Navigation

### 2. Section Components (`/sections`)

Full-width page sections that make up the portfolio content.

**Active Components:**

- **hero-terminal.tsx** - Hero section with terminal UI aesthetic
  - Terminal window simulation
  - Typing animation for commands
  - System info display
  - Stats showcase
  - Animated grid background
  - Used in: `src/app/page.tsx`

- **ventures-section.tsx** - Showcase of business ventures
  - Hexagonal card layout
  - Status indicators (building, launching, growing, scaling)
  - Metrics display (users, growth, revenue)
  - Tech stack tags
  - Used in: `src/app/page.tsx`

- **portfolio-section.tsx** - Projects portfolio grid
  - Filterable by category
  - Featured project highlighting
  - GitHub metrics (stars, forks)
  - Live demo links
  - Used in: `src/app/page.tsx`

- **skill-tree.tsx** - Skills and expertise display
  - Collapsible categories
  - XP-based progress bars
  - Level indicators
  - Project associations
  - Used in: `src/app/page.tsx`

- **contact-section.tsx** - Contact form and information
  - Form validation
  - Social links
  - Availability status
  - Response time indicator
  - Used in: `src/app/page.tsx`

- **animated-grid.tsx** - Animated background grid
  - Terminal-themed grid lines
  - Neon glow effects
  - Reusable across sections

**Deprecated Components:**

- **HeroSection.tsx** - Legacy hero section from initial migration
  - Generic design (not Terminal Neon themed)
  - Used typing animation hook
  - Not actively used (replaced by hero-terminal.tsx)
  - Kept for reference/fallback

**Barrel Exports:** `sections/index.ts` currently only exports HeroSection (legacy)

### 3. UI Components (`/ui`)

Reusable, atomic UI components following the Terminal Neon design system.

**Components:**

- **button.tsx** - Primary button component
  - Variants: default, destructive, outline, secondary, ghost, link
  - Sizes: default, sm, lg, icon
  - Supports `asChild` prop for polymorphism (via Radix Slot)
  - Loading states
  - Neon hover effects
  - Used throughout the application

- **command-palette.tsx** - Command palette interface
  - Terminal-style command input
  - Keyboard shortcuts (Cmd+K / Ctrl+K)
  - Quick navigation
  - Terminal aesthetic

### 4. Effects Components (`/effects`)

Visual enhancement components for the Terminal Neon aesthetic.

**Components:**

- **custom-cursor.tsx** - Custom cursor implementation
  - Terminal-themed cursor
  - Hover state changes
  - Client-side only

- **scanline-overlay.tsx** - CRT scanline effect
  - Retro terminal aesthetic
  - CSS animations
  - Performance optimized
  - Client-side only

### 5. Provider Components (`/providers`)

React context providers for global state management.

**Components:**

- **ThemeProvider.tsx** - Theme management
  - Dark/light mode support
  - CSS variable injection
  - Terminal Neon color scheme

### 6. Legacy/Unused Components (Root Level)

Components from boilerplate or previous iterations that are no longer in use.

**Unused:**

- **Header.tsx** - Lobe UI template header (not Terminal Neon themed)
- **Footer.tsx** - Lobe UI template footer (not Terminal Neon themed)
- **Card.tsx** - Generic card component (could be repurposed)

**Status:** These files should be:

- Removed if confirmed unused in codebase
- Moved to `/components/legacy/` if kept for reference
- Repurposed if functionality is needed

## Component Patterns

### Client Components

Components using hooks or browser APIs must use `'use client'` directive:

- All layout components (navigation, header)
- Section components with animations (hero-terminal, ventures-section)
- Interactive UI components (button, command-palette)
- Effects components (custom-cursor, scanline-overlay)

### Server Components

Components that can be server-rendered:

- Static content sections (if no animations)
- Data fetching components

### Composition Patterns

**Slot Pattern (Polymorphic Components):**

```tsx
// Button as anchor tag
<Button asChild>
  <a href="/link">Visit</a>
</Button>

// Button as button element
<Button onClick={handleClick}>
  Click Me
</Button>
```

**Section Container Pattern:**

```tsx
// Consistent section wrapper
<section className="px-4 py-20" id="section-id">
  <div className="container mx-auto max-w-7xl">{/* Section content */}</div>
</section>
```

**Terminal Aesthetic Pattern:**

```tsx
// Neon glow effects
<div className="border-primary shadow-neon-primary border">{/* Content with terminal theme */}</div>
```

## Import Patterns

### Preferred Imports

Use barrel exports from directories when available:

```tsx
// Good - using barrel export
import { Navigation } from '@/components/layout';

// Okay - direct import when barrel doesn't exist
import { Header } from '@/components/layout/header';
import { HeroTerminal } from '@/components/sections/hero-terminal';
```

### Path Aliases

All imports use TypeScript path aliases defined in `tsconfig.json`:

- `@/components/*` - Component imports
- `@/lib/*` - Utility functions and constants
- `@/data/*` - Data files
- `@/styles/*` - Global styles

## Data Flow

### Static Data

Component data is imported from `/src/data/`:

```tsx
import { ventures } from '@/data/ventures';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
```

### Constants

Site-wide constants from `/src/lib/constants.ts`:

```tsx
import { SITE, NAVIGATION_SECTIONS, SOCIAL_LINKS } from '@/lib/constants';
```

### Props Flow

- Parent components pass configuration as props
- Sections remain largely self-contained
- Shared state via Context Providers

## Styling Approach

### CSS Variables Philosophy

**CRITICAL**: All styling uses CSS variables defined in `src/styles/globals.css`:

```tsx
// NEVER hardcode colors
className = 'text-[#00D9FF]'; // ❌ Bad

// ALWAYS use CSS variables
className = 'text-primary'; // ✅ Good
```

### Tailwind Integration

Tailwind theme extends CSS variables:

```js
// tailwind.config.ts
colors: {
  primary: 'rgb(var(--color-primary) / <alpha-value>)',
  accent: 'rgb(var(--color-accent) / <alpha-value>)',
}
```

### Component-Specific Styles

- Use Tailwind utility classes primarily
- Inline styles only for dynamic values (e.g., `backgroundImage`)
- Component-scoped CSS via CSS modules (if needed)
- Framer Motion for animations

## Accessibility

All components follow WCAG AA standards:

- Semantic HTML (`<section>`, `<nav>`, `<header>`, `<footer>`)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast compliance

## Performance Considerations

### Code Splitting

- Page-level code splitting via Next.js App Router
- Dynamic imports for heavy components (if needed)

### Optimization

- Font optimization via `next/font`
- Image optimization via `next/image`
- CSS-in-JS with zero runtime (Tailwind)
- Minimal JavaScript for static sections

### Bundle Analysis

Monitor component bundle sizes:

```bash
npm run build
# Check .next/build-manifest.json
```

## Testing Strategy

### Component Testing

- Unit tests for utility components (Button, Card)
- Integration tests for sections
- Visual regression tests (future)

### Accessibility Testing

- Automated a11y testing with jest-axe
- Manual keyboard navigation testing
- Screen reader compatibility

## Future Improvements

### Planned Enhancements

1. **Barrel Exports**: Complete barrel exports for all directories
2. **Storybook**: Component documentation and playground
3. **Component Library**: Extract reusable components to separate package
4. **Testing**: Comprehensive test coverage
5. **Legacy Cleanup**: Remove unused boilerplate components

### Refactoring Candidates

1. **HeroSection.tsx**: Remove deprecated legacy hero
2. **Root Components**: Clean up Card.tsx, Header.tsx, Footer.tsx
3. **Barrel Files**: Update sections/index.ts to export all active sections

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Project overview and setup
- [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) - Design system guidelines
- [MODERNIZATION_STRATEGY.md](./MODERNIZATION_STRATEGY.md) - Migration strategy

## Maintenance Guidelines

### Adding New Components

1. Choose appropriate directory:
   - `/sections` - Full-width page sections
   - `/ui` - Reusable UI primitives
   - `/layout` - Layout/navigation components
   - `/effects` - Visual effects

2. Follow naming conventions:
   - PascalCase for component files: `ButtonGroup.tsx`
   - kebab-case for section files: `about-section.tsx`
   - Export named functions: `export function ButtonGroup()`

3. Use TypeScript interfaces for props:

   ```tsx
   interface ButtonGroupProps {
     children: React.ReactNode;
     orientation?: 'horizontal' | 'vertical';
   }
   ```

4. Add to barrel exports if directory has `index.ts`

5. Document in this file

### Removing Components

1. Search for imports across codebase
2. Verify no usage in production code
3. Move to `/components/legacy/` if keeping for reference
4. Remove entirely if truly unused
5. Update barrel exports
6. Update this documentation

### Component Checklist

- [ ] TypeScript interface for props
- [ ] Proper `'use client'` directive if needed
- [ ] CSS variables for all styling
- [ ] Accessibility attributes (ARIA, semantic HTML)
- [ ] Responsive design (mobile-first)
- [ ] Error boundaries (if stateful)
- [ ] PropTypes or Zod validation (optional)
- [ ] JSDoc comments for complex logic
- [ ] Added to barrel exports (if applicable)
- [ ] Documented in this file

---

**Maintained by**: jlucus (@4eckd) **Last Review**: 2026-02-16 **Next Review**: Before Phase 2
launch
