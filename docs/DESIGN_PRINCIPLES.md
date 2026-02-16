# Design Principles - jlucus.dev Portfolio

**Last Updated:** 2026-02-15
**Design System:** Terminal Neon
**Status:** Active Guidelines for All Development

---

## 🎨 Core Design Philosophy

The jlucus.dev portfolio follows a **Terminal Neon** aesthetic that combines:

1. **Retro Terminal Vibes** - Command-line interfaces, monospace fonts, ASCII art
2. **Cyberpunk Neon** - Electric colors, glow effects, high contrast
3. **Modern Web Standards** - Accessibility, performance, responsive design
4. **Developer-First** - Code-centric, technical, authentic

---

## 🌈 Color System

### CRITICAL: CSS Variables Only

**NEVER use hardcoded color values.** All colors must use CSS variables defined in `src/styles/globals.css`.

### Primary Colors

```css
/* Electric Cyan - Primary brand color */
--color-primary: 0 217 255;        /* rgb(0, 217, 255) #00D9FF */

/* Neon Magenta - Accent color */
--color-accent: 255 0 110;         /* rgb(255, 0, 110) #FF006E */

/* Electric Lime - Secondary accent */
--color-secondary: 204 255 0;      /* rgb(204, 255, 0) #CCFF00 */
```

### Status Colors

```css
--color-success: 0 255 159;        /* #00FF9F */
--color-warning: 255 184 0;        /* #FFB800 */
--color-error: 255 71 87;          /* #FF4757 */
--color-info: 0 184 217;           /* #00B8D9 */
```

### Grayscale

```css
--color-background: 10 10 15;      /* #0A0A0F - Almost black */
--color-foreground: 240 242 245;   /* #F0F2F5 - Off white */
--color-muted: 100 105 115;        /* #64697 - Gray */
```

### Usage Examples

```tsx
// ✅ CORRECT - Using CSS variables
<div className="bg-primary text-background">
<button style={{ color: 'rgb(var(--color-accent))' }}>

// ✅ CORRECT - With alpha channel
<div className="bg-primary/20">  // 20% opacity
<div style={{ backgroundColor: 'rgb(var(--color-primary) / 0.3)' }}>

// ❌ WRONG - Hardcoded colors
<div className="bg-[#00D9FF]">
<div style={{ color: '#FF006E' }}>
```

---

## ✨ Neon Effects

### Glow Shadows

All neon effects use predefined CSS variable shadows:

```css
--shadow-neon-primary: 0 0 5px rgb(var(--color-primary)),
                       0 0 20px rgb(var(--color-primary));

--shadow-neon-primary-lg: 0 0 10px rgb(var(--color-primary)),
                          0 0 40px rgb(var(--color-primary)),
                          0 0 80px rgb(var(--color-primary));

--shadow-neon-accent: 0 0 5px rgb(var(--color-accent)),
                      0 0 20px rgb(var(--color-accent));
```

### Usage

```tsx
// ✅ Text glow
<h1 className="neon-glow">Hero Title</h1>

// ✅ Box glow
<div className="shadow-neon-primary border border-primary">

// ✅ Hover glow
<button className="hover:shadow-neon-primary-lg transition-shadow">
```

---

## 📐 Typography

### Font Stack

```css
/* Headings - Terminal aesthetic */
--font-heading: 'JetBrains Mono', 'Fira Code', monospace;

/* Body - Clean readability */
--font-body: 'Inter', -apple-system, sans-serif;

/* Code blocks */
--font-code: 'JetBrains Mono', 'Courier New', monospace;
```

### Scale

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Usage

```tsx
// Headings - Always monospace
<h1 className="font-mono text-4xl font-bold">

// Body text - Sans serif
<p className="font-sans text-base">

// Code - Monospace
<code className="font-mono text-sm">
```

---

## 📏 Spacing System

### Scale

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
--spacing-4xl: 6rem;     /* 96px */
```

### Usage

```tsx
// ✅ Using spacing variables
<div className="p-md">        // padding: 1rem
<div className="mt-xl">       // margin-top: 2rem
<div className="gap-lg">      // gap: 1.5rem

// ❌ Arbitrary values (avoid)
<div className="p-[13px]">
```

---

## 🎭 ASCII Art Integration

### When to Use ASCII Art

1. **Section Headers** - Large ASCII titles for major sections
2. **Loading States** - Terminal boot sequences
3. **Success/Error Messages** - Boxed notifications
4. **Command Prompts** - Terminal-style inputs
5. **Dividers** - Section separators

### Available ASCII Assets

See `docs/ascii-art-samples.md` for full library, including:

- Hero section banner
- Section titles (Ventures, Portfolio, Skills, Contact)
- Terminal boot sequence
- Loading indicators
- Success/error boxes
- Command prompts
- Mini logos

### Usage Examples

```tsx
// Hero banner
const HERO_ASCII = `
     _ _                     ____
    (_) |_   _  ___ _   _ ___(___ \\
    | | | | | |/ __| | | / __|__) |
    | | | |_| | (__| |_| \\__ \\/ __/
   _/ |_|\\__,_|\\___|\\__,_|___/_____|
  |__/
`;

<pre className="font-mono text-primary neon-glow">
  {HERO_ASCII}
</pre>

// Terminal prompt
<div className="font-mono text-sm">
  <span className="text-success">user@jlucus</span>
  <span className="text-muted">:</span>
  <span className="text-info">~/projects</span>
  <span className="text-muted">$</span>
  <span className="text-foreground ml-2">ls -la</span>
</div>
```

---

## 🧱 Component Architecture

### File Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   ├── sections/        # Page sections (Hero, Portfolio, etc.)
│   └── ui/              # Reusable UI components (Button, Card, etc.)
├── data/                # Static data (ventures, projects, skills)
├── lib/                 # Utilities, constants
└── styles/              # Global styles, CSS variables
```

### Component Rules

1. **One component per file**
2. **TypeScript required** - No JS files
3. **Props interface** - Always define types
4. **Accessibility first** - WCAG AAA compliance
5. **Server components by default** - Use 'use client' only when needed

### Example Component

```tsx
// src/components/ui/neon-box.tsx
'use client';

import { cn } from '@/lib/utils';

interface NeonBoxProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent';
  glow?: 'sm' | 'lg';
  className?: string;
}

export function NeonBox({
  children,
  variant = 'primary',
  glow = 'sm',
  className
}: NeonBoxProps) {
  return (
    <div
      className={cn(
        'border rounded-md p-md',
        variant === 'primary' ? 'border-primary' : 'border-accent',
        glow === 'sm' ? 'shadow-neon-primary' : 'shadow-neon-primary-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
```

---

## 🎬 Animation Guidelines

### Framer Motion Usage

```tsx
import { motion } from 'framer-motion';

// ✅ Scroll-triggered animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>

// ✅ Hover effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>

// ✅ Stagger children
<motion.ul
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
    />
  ))}
</motion.ul>
```

### Performance Rules

1. **60fps target** - Keep animations smooth
2. **GPU acceleration** - Use transform and opacity
3. **Reduce motion** - Respect prefers-reduced-motion
4. **Lazy load** - Don't animate off-screen elements

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
sm: 640px   /* Tablet */
md: 768px   /* Small laptop */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Widescreen */
```

### Layout Patterns

See `docs/ascii.md` for full responsive layout mockups:

- **Desktop:** Terminal Split (50/50)
- **Tablet:** Centered Content
- **Mobile:** Stacked Terminal

### Grid System

```tsx
// ✅ Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">

// ✅ Responsive text
<h1 className="text-2xl md:text-4xl lg:text-5xl">

// ✅ Responsive spacing
<div className="p-md lg:p-xl">
```

---

## ♿ Accessibility

### Requirements

- **WCAG AAA** compliance target
- **Keyboard navigation** - All interactive elements
- **Screen reader support** - Semantic HTML, ARIA labels
- **Color contrast** - Minimum 7:1 for text
- **Focus indicators** - Visible focus states

### Examples

```tsx
// ✅ Semantic HTML
<nav aria-label="Main navigation">
<button aria-label="Open menu" aria-expanded={isOpen}>

// ✅ Focus visible
<button className="focus:outline-none focus:ring-2 focus:ring-primary">

// ✅ Alt text
<img src="/hero.jpg" alt="Terminal neon interface showing code editor" />

// ✅ Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## ⚡ Performance

### Targets

- **Lighthouse Performance:** > 90
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1
- **Bundle Size:** < 200KB gzipped

### Optimization Techniques

```tsx
// ✅ Image optimization
import Image from 'next/image';
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority={isAboveFold}
  loading={isAboveFold ? 'eager' : 'lazy'}
/>

// ✅ Code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />
});

// ✅ Font optimization
import { JetBrains_Mono, Inter } from 'next/font/google';
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
```

---

## 🔒 Security

### Best Practices

1. **No sensitive data in client code**
2. **Env variables** - Use NEXT_PUBLIC_ prefix for client
3. **Input validation** - Always validate user input
4. **XSS prevention** - Use dangerouslySetInnerHTML sparingly
5. **CSRF protection** - Use CSRF tokens for forms

---

## 📝 Code Style

### Naming Conventions

```tsx
// ✅ Components - PascalCase
export function HeroSection() {}

// ✅ Utilities - camelCase
export function formatDate() {}

// ✅ Constants - SCREAMING_SNAKE_CASE
export const API_BASE_URL = '';

// ✅ Interfaces - PascalCase with I prefix (optional)
interface ButtonProps {}
```

### File Naming

```
hero-section.tsx       // Components - kebab-case
use-typing-animation.ts // Hooks - kebab-case
format-date.ts         // Utils - kebab-case
constants.ts           // Config - kebab-case
```

---

## ✅ Checklist for New Components

- [ ] TypeScript interfaces defined
- [ ] Uses CSS variables (no hardcoded colors)
- [ ] Responsive design (mobile-first)
- [ ] Accessibility features (ARIA, keyboard nav)
- [ ] Framer Motion animations (if needed)
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Dark theme compatible
- [ ] Performance optimized
- [ ] Documented (JSDoc comments)

---

## 📚 Resources

- **Design System:** `CLAUDE.md`
- **ASCII Art Library:** `docs/ascii-art-samples.md`
- **Layout Mockups:** `docs/ascii.md`
- **Color Reference:** `src/styles/globals.css`
- **Component Examples:** `src/components/`

---

**Maintained By:** jlucus development team
**Review Frequency:** Every major feature
**Status:** Active Design Guidelines ✅

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  Terminal Neon Design System v1.0                         ║
║                                                            ║
║  Electric Cyan  •  Neon Magenta  •  ASCII Art             ║
║  Accessibility  •  Performance   •  Developer-First       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```
