# Component Standards Guide

**Portfolio:** jlucus.dev **Design System:** Terminal Neon with Green Theme **Status:** Active &
Maintained **Last Updated:** 2026-02-16

---

## Overview

This document provides standards and best practices for developing components in the jlucus.dev
portfolio. All components must follow the Terminal Neon design system and use CSS variable-based
design tokens.

---

## Design System

### Primary Design System

**Name:** Terminal Neon (Green Theme) **Framework:** Tailwind CSS 4 + PostCSS **Color Tokens:** CSS
Variables (dark theme default, light theme override) **Typography:** JetBrains Mono (headings),
Inter (body)

### Available Color Palettes

#### Primary Colors (Green)

```
--color-green-50  → --color-green-950  (10 shades)
--color-primary → maps to --color-green-500
```

**Usage:**

- Main brand color
- Primary actions
- Links and hover states
- Focus indicators

#### Secondary Colors (Emerald)

```
--color-emerald-50  → --color-emerald-950  (10 shades)
--color-secondary → maps to --color-emerald-500
```

**Usage:**

- Secondary actions
- Alternative brand experiences
- Accent backgrounds

#### Accent Colors (Cyan)

```
--color-cyan-50  → --color-cyan-950  (10 shades)
--color-accent → maps to --color-cyan-500
```

**Usage:**

- Tech/tech-forward elements
- Special highlights
- Interactive states

#### Semantic Colors

```
--color-text-primary      /* Headings & main text */
--color-text-secondary    /* Body text */
--color-text-tertiary     /* Secondary text */
--color-text-muted        /* Muted text */

--color-background        /* Main background */
--color-background-secondary  /* Secondary background */
--color-background-tertiary   /* Tertiary background */

--color-success / success-bg / success-text / success-border
--color-warning / warning-bg / warning-text / warning-border
--color-error / error-bg / error-text / error-border
--color-info / info-bg / info-text / info-border
```

---

## Component File Structure

### Naming Conventions

**Files:**

```
kebab-case.tsx          ✅ Correct
KebabCase.tsx          ❌ Incorrect (reserved for index exports)
camelCase.tsx          ❌ Incorrect
snake_case.tsx         ❌ Incorrect
```

**Exports:**

```tsx
// Named export (preferred)
export function ComponentName() { ... }
export const ComponentName = () => { ... }

// Default export (acceptable)
export default ComponentName
```

**Component Organization:**

```
src/components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── sections/              # Page sections / complex compositions
│   ├── hero-terminal.tsx
│   ├── portfolio-section.tsx
│   └── contact-section.tsx
├── layout/                # Page layout components
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
├── providers/             # Context/Provider components
│   ├── ThemeProvider.tsx
│   └── MotionProvider.tsx
└── effects/               # Visual effects & decorative
    ├── custom-cursor.tsx
    └── scanline-overlay.tsx
```

### File Template

```tsx
'use client'; // If using client-side features

import React from 'react';
import { ClassName } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Component variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';

  /**
   * Component size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Optional children
   */
  children?: React.ReactNode;
}

/**
 * ComponentName Component
 *
 * Brief description of what this component does.
 *
 * @example
 * <ComponentName variant="primary" size="lg">
 *   Content
 * </ComponentName>
 */
export function ComponentName({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ComponentProps) {
  return (
    <div className={cn('base-styles', className)} {...props}>
      {children}
    </div>
  );
}

export default ComponentName;
```

---

## Color Usage Rules

### ✅ DO: Use Design Tokens

```tsx
// Semantic colors
<div className="bg-background text-primary" />
<button className="bg-primary hover:bg-primary-hover" />
<div className="border border-primary/10" />

// With opacity
<div className="bg-background-secondary/80" />
<div className="text-primary/50" />

// Functional colors
<div className="bg-success/10 border-success text-success" />
<div className="bg-error/10 border-error text-error" />

// Focus states
<button className="focus-visible:ring-primary focus-visible:ring-offset-2" />
```

### ❌ DON'T: Use Hardcoded Colors

```tsx
// ❌ Tailwind arbitrary colors
<div className="bg-blue-500 text-red-700" />

// ❌ Hex colors
<div className="bg-[#22c55e]" />

// ❌ RGB colors
<div className="bg-[rgb(34, 197, 94)]" />

// ❌ Gray palette (not part of design system)
<div className="bg-gray-800 text-gray-300" />

// ❌ Hardcoded opacity
<div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }} />
```

### Color Token Examples

**For headings:**

```tsx
<h1 className="text-primary font-mono text-5xl" />
<h2 className="text-primary font-mono text-3xl" />
```

**For body text:**

```tsx
<p className="text-secondary" />  /* Normal text */
<p className="text-tertiary" />   /* Less important */
<p className="text-muted" />      /* Disabled/muted */
```

**For backgrounds:**

```tsx
<section className="bg-background" />
<div className="bg-background-secondary/80 backdrop-blur-sm" />
<div className="bg-success/10" />  /* Light success background */
```

**For borders:**

```tsx
<div className="border border-primary/10" />
<div className="border-b border-primary/5" />
<input className="border border-primary/20 focus:border-primary" />
```

**For interactive states:**

```tsx
<button className="hover:text-primary transition-colors" />
<a className="text-secondary hover:text-primary" />
```

---

## Typography Standards

### Fonts

**Headings:** JetBrains Mono (monospace, terminal aesthetic)

```tsx
<h1 className="font-mono text-5xl font-bold" />
<h2 className="font-mono text-3xl font-bold" />
```

**Body:** Inter (clean, readable)

```tsx
<p className="font-sans text-base" />
<span className="font-sans text-sm" />
```

**Code:** JetBrains Mono

```tsx
<code className="bg-background-secondary rounded p-1 font-mono text-xs" />
```

### Font Sizes

```
text-xs   → 12px (captions, small labels)
text-sm   → 14px (helper text, small buttons)
text-base → 16px (body text)
text-lg   → 18px (larger text)
text-xl   → 20px (subheadings)
text-2xl  → 24px (headings)
text-3xl  → 30px (large headings)
text-4xl  → 36px (section titles)
text-5xl  → 48px (hero text)
```

### Font Weights

```
font-normal   → 400 (body text)
font-medium   → 500 (labels, buttons)
font-semibold → 600 (subheadings)
font-bold     → 700 (headings)
```

---

## Spacing Standards

### Spacing Scale (Uses CSS Variables)

```
space-xs   → 0.25rem (4px)
space-sm   → 0.5rem  (8px)
space-md   → 1rem    (16px)
space-lg   → 1.5rem  (24px)
space-xl   → 2rem    (32px)
space-2xl  → 3rem    (48px)
space-3xl  → 4rem    (64px)
```

**Usage:**

```tsx
<div className="space-y-md" />     /* Vertical spacing */
<div className="space-x-lg" />     /* Horizontal spacing */
<button className="px-lg py-md" /> /* Padding */
<div className="gap-xl" />         /* Grid/flex gap */
```

---

## Animation Standards

### Available Animations

```css
/* Custom animations */
animate-pulse-slow       /* Slow pulsing effect */
animate-pulse-neon       /* Neon pulsing glow */
animate-glow             /* Glowing effect */
animate-float            /* Floating animation */
animate-scanline         /* Scanline effect */
animate-typing           /* Typing animation */
animate-blink            /* Blinking cursor */
```

**Usage:**

```tsx
<div className="animate-pulse-neon" />
<div className="animate-glow duration-2000" />
```

### Transition Standards

```tsx
// Fast transition (150ms)
className = 'transition-colors';
/* Uses --transition-fast */

// Standard transition (200ms)
className = 'transition-all';
/* Uses --transition-base */

// Slow transition (300ms)
className = 'transition-opacity duration-300';
/* Uses --transition-slow */
```

---

## Responsive Design Standards

### Breakpoints

```
sm   → 640px   (mobile landscape)
md   → 768px   (tablet)
lg   → 1024px  (desktop)
xl   → 1280px  (widescreen)
2xl  → 1536px  (large widescreen)
```

**Mobile-First Approach:**

```tsx
// Default: mobile
<div className="text-sm px-4 py-2" />

// Tablet and up
<div className="md:text-base md:px-6 md:py-4" />

// Desktop and up
<div className="lg:text-lg lg:px-8 lg:py-6" />

// Widescreen and up
<div className="xl:max-w-7xl" />
```

### Responsive Typography Example

```tsx
<h1 className="font-mono text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl" />
```

### Responsive Grid Example

```tsx
<div className="gap-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{/* Items */}</div>
```

---

## Accessibility Standards

### Focus Management

```tsx
// Always include focus-visible styles
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" />

// Use semantic HTML
<button type="button">Click me</button>
<a href="/link">Link text</a>

// ARIA labels for complex components
<div role="region" aria-label="Main content">
  {/* Content */}
</div>
```

### Color Contrast

**WCAG AAA Compliance (7:1 contrast ratio):**

- ✅ Primary text on primary background
- ✅ Text on all design system backgrounds
- ✅ Success/warning/error messages
- ✅ Links and interactive elements

### Semantic HTML

```tsx
// ✅ Use semantic elements
<header>Navigation</header>
<main>Main content</main>
<section id="portfolio">Portfolio</section>
<article>Blog post</article>
<footer>Footer</footer>
<nav>Navigation links</nav>
<button>Click me</button>

// ❌ Avoid non-semantic layouts
<div role="header">Navigation</div>
<div style={{ fontSize: '24px' }}>Heading</div>
<span onClick={handler}>Button</span>
```

---

## Performance Standards

### Code Splitting

```tsx
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Skeleton />,
});
```

### Image Optimization

```tsx
import Image from 'next/image';

// ✅ Use Next.js Image component
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true}  // For above-fold images
/>

// ❌ Avoid HTML img tag
<img src="/image.jpg" />
```

### Lazy Loading

```tsx
// Use Framer Motion's whileInView
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
  Content
</motion.div>
```

---

## Testing Standards

### Unit Tests

```tsx
// Test component rendering
render(<ComponentName />);
expect(screen.getByRole('button')).toBeInTheDocument();

// Test color token application
const button = screen.getByRole('button');
expect(button).toHaveClass('bg-primary');
```

### Accessibility Tests

```tsx
// Test keyboard navigation
userEvent.tab();
expect(element).toHaveFocus();

// Test ARIA attributes
expect(screen.getByLabelText(/label/i)).toBeInTheDocument();
```

---

## Common Patterns

### Button Component Usage

```tsx
import { Button } from '@/components/ui/button';

// Primary action
<Button variant="primary" size="lg">
  Get Started
</Button>

// Secondary action
<Button variant="secondary" size="md">
  Learn More
</Button>

// Outline style
<Button variant="outline" size="sm">
  Cancel
</Button>

// As a link
<Button variant="ghost" asChild>
  <a href="/page">Visit</a>
</Button>
```

### Form Input Pattern

```tsx
<div className="space-y-md">
  <label htmlFor="input" className="text-primary block font-mono text-sm">
    Label
  </label>
  <input
    id="input"
    type="text"
    placeholder="Placeholder"
    className={cn(
      'px-lg py-md w-full',
      'bg-background-secondary border-primary/20 border',
      'text-primary placeholder-secondary',
      'focus:border-primary focus:shadow-neon-primary-sm focus:outline-none',
      'transition-all'
    )}
  />
</div>
```

### Card Component Pattern

```tsx
<div className="bg-background-secondary/60 border-primary/10 p-lg rounded-lg border">
  <h3 className="text-primary mb-md font-mono text-lg font-bold">Card Title</h3>
  <p className="text-secondary text-sm">Card content goes here.</p>
</div>
```

### Section Component Pattern

```tsx
<section id="section-id" className="py-4xl md:py-6xl">
  <div className="container mx-auto px-4">
    <h2 className="text-primary mb-2xl font-mono text-4xl font-bold md:text-5xl">Section Title</h2>
    <p className="text-secondary mb-4xl max-w-2xl text-xl">Section description</p>
    {/* Section content */}
  </div>
</section>
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Hardcoded Colors

```tsx
// WRONG
<div className="bg-blue-500 text-red-700" />

// RIGHT
<div className="bg-primary text-error" />
```

### ❌ Mistake 2: Mixing Design Systems

```tsx
// WRONG
<div className="bg-white text-gray-900 border-gray-200" />  /* Old system */
<div className="bg-primary text-secondary" />                /* New system */

// RIGHT
<div className="bg-background text-primary" />  /* All using new tokens */
```

### ❌ Mistake 3: Inline Styles for Colors

```tsx
// WRONG
<div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} />

// RIGHT
<div className="bg-primary text-white" />
```

### ❌ Mistake 4: Not Using Utility Classes

```tsx
// WRONG
<button style={{ padding: '8px 16px', fontSize: '14px' }}>
  Click
</button>

// RIGHT
<button className="px-md py-sm text-sm">
  Click
</button>
```

### ❌ Mistake 5: Missing Responsive Prefixes

```tsx
// WRONG
<div className="text-5xl">Heading</div>  /* Too large on mobile */

// RIGHT
<div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Heading
</div>
```

---

## Checklist for New Components

- [ ] Uses design tokens for all colors
- [ ] Follows naming conventions (kebab-case files, PascalCase exports)
- [ ] Placed in correct directory (ui/, sections/, layout/, etc.)
- [ ] Includes JSDoc comments with `@example`
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Focus states included for interactive elements
- [ ] Accessibility reviewed (ARIA labels, semantic HTML)
- [ ] Dark theme verified (if theme-aware)
- [ ] Animations use design system duration tokens
- [ ] No hardcoded colors or inline styles (except overrides)
- [ ] TypeScript props interface defined
- [ ] Component tested in browser

---

## Getting Help

### Design Token Reference

- Colors: `src/styles/colors.css`
- Tailwind Config: `tailwind.config.ts`
- CLAUDE.md: Full design system documentation

### Component Examples

- **UI Components**: `src/components/ui/`
- **Section Components**: `src/components/sections/`
- **Layout Components**: `src/components/layout/`

### Design Guidelines

- **Audit Report**: `docs/DESIGN_AUDIT_REPORT.md`
- **Tailwind Setup**: `docs/TAILWIND_CSS_4_SETUP.md`
- **Main Docs**: `CLAUDE.md`

---

## Version History

**v1.0.0** - 2026-02-16

- Initial standards document created
- Terminal Neon design system documented
- Component naming conventions established
- Color usage rules defined
- Best practices documented

---

_Last Updated: 2026-02-16_ _Maintained by: Claude Code_ _Status: Active_
