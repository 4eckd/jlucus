# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website modernization project for Jesse Lucas (jlucus.dev), migrating from static HTML/Bootstrap to a modern React-based stack. The project is built with Next.js 16, React 19, TypeScript, and uses a dark-first green color theme with WCAG AAA accessibility compliance.

**Current Status**: Foundation phase - basic Next.js setup complete with theme system, navigation component, and core dependencies installed. Most sections are placeholders awaiting migration from the legacy site.

**Tech Stack**:
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, CSS Variables for theming, ARIA Accessibility Compliant Colo Schemes
- **UI Components**: LobeUI (@lobehub/ui), Lucide React icons, Reactbits, 21st.dev or any other UI components
- **State**: Zustand (planned), next-themes for theme management
- **Package Manager**: pnpm
- **Deployment**: Vercel (planned)

## Commands

### Development
```bash
pnpm dev              # Start development server on localhost:3000
pnpm build            # Production build (must pass before merging)
pnpm start            # Run production build locally
pnpm lint             # Run ESLint (currently basic Next.js config)
```

### Git Workflow
See `docs/BRANCHING_STRATEGY.md` for complete details. Key points:

**Current Integration Branch**: `claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM`
- All feature branches should be created from and merged back into this branch
- Do NOT merge directly to `main` - integration branch will be merged to main when complete

**Feature Branch Pattern**: `feature/<feature-name>`
```bash
# Create new feature branch
git checkout claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM
git pull
git checkout -b feature/hero-section

# Verify build works before merging
pnpm build

# Create PR to integration branch (not main)
gh pr create --base claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM \
  --title "feat: Add hero section component"
```

**Commit Convention**: Conventional Commits format
- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes
- `refactor(scope): description` - Code refactoring
- `docs: description` - Documentation only
- `style: description` - Formatting/styling only
- `test: description` - Adding tests
- `chore: description` - Dependencies, tooling

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts, metadata, ThemeProvider
│   ├── page.tsx           # Homepage (single-page app with sections)
│   └── globals.css        # Global styles, imports colors.css
├── components/
│   ├── layout/            # Layout components (Navigation, Footer, etc.)
│   ├── providers/         # Context providers (ThemeProvider)
│   └── ui/                # Reusable UI components (Button, etc.)
├── lib/
│   └── utils.ts           # Utility functions (cn for classNames)
├── styles/
│   └── colors.css         # Complete color system with CSS variables
└── types/                 # TypeScript type definitions (future)

docs/                      # Project documentation
├── BRANCHING_STRATEGY.md  # Git workflow and feature branches
├── MODERNIZATION_STRATEGY.md  # Complete modernization plan
├── QUICK_START.md         # Quick start guide and decisions
└── IMPLEMENTATION_CHECKLIST.md  # Feature implementation tracking
```

### Color System & Theming

**Important**: The site uses a **dark theme by default** with a **green color scheme**. All colors must maintain **WCAG AAA compliance** (7:1 contrast ratio for normal text).

**Color Variables** are defined in `src/styles/colors.css`:
- Primary: Green palette (--color-green-*)
- Secondary: Emerald (--color-emerald-*)
- Accent: Cyan (--color-cyan-*)
- Semantic: --color-background, --color-text-primary, --color-primary, etc.

**Theme Switching**: Use the `[data-theme="light"]` selector for light theme overrides. The system respects `prefers-reduced-motion` and `prefers-contrast: high`.

**Usage in Components**:
```tsx
// Use CSS variables for colors (NOT Tailwind color classes)
<div className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
<button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
```

### Font System

Three Google Fonts are configured in `src/app/layout.tsx`:
- **Roboto** (primary, default): `font-family: var(--font-roboto)`
- **Raleway** (headings): `font-family: var(--font-raleway)`
- **Poppins** (accent): `font-family: var(--font-poppins)`

These are loaded via `next/font/google` for automatic optimization.

### Component Patterns

**Client vs Server Components**:
- Most components should be Server Components by default
- Use `'use client'` only when needed (useState, useEffect, event handlers, theme hooks)
- Current client components: page.tsx, Navigation.tsx, ThemeProvider.tsx, Button.tsx

**Accessibility Requirements**:
- All interactive elements must have proper ARIA labels
- Keyboard navigation must work fully (test with Tab key)
- Focus states must be visible (use --focus-ring CSS variable)
- Semantic HTML (nav, header, section, main, etc.)
- Skip-to-content link in layout.tsx for screen readers

**Responsive Design**:
- Mobile-first approach (design for mobile, enhance for desktop)
- Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Test touch targets are minimum 44x44px for mobile
- Navigation has mobile menu (hamburger) and desktop menu

### State Management

**Theme State**: Managed by `next-themes` library
```tsx
import { useTheme } from 'next-themes'
const { theme, setTheme } = useTheme()
```

**Future State**: Zustand stores planned for:
- Chat conversations (useChatStore.ts)
- CMS content cache (useContentStore.ts)
- UI state like modals (useUIStore.ts)

### Styling Approach

**CSS Variables + Tailwind Utilities**:
- Global theme colors via CSS variables in `src/styles/colors.css`
- Tailwind for layout, spacing, and utilities
- Custom animations in globals.css (.animate-fade-in, .text-gradient, etc.)
- Glass morphism effect (.glass-effect)

**DO NOT** hardcode colors - always use CSS variables:
```tsx
// ✅ Correct
<div className="text-[var(--color-primary)]">

// ❌ Wrong
<div className="text-green-500">
```

## Development Guidelines

### When Adding New Components

1. **Location**: Place in appropriate subfolder of `src/components/`
   - Layout components: `src/components/layout/`
   - Reusable UI: `src/components/ui/`
   - Section-specific: `src/components/sections/`

2. **TypeScript**: All components must be typed
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'outline' | 'ghost'
     size?: 'sm' | 'md' | 'lg'
     children: React.ReactNode
   }

   export function Button({ variant = 'primary', ... }: ButtonProps) {
   ```

3. **Accessibility**: Include ARIA attributes, semantic HTML, keyboard support

4. **Responsive**: Use Tailwind responsive classes (sm:, md:, lg:)

5. **Theme-aware**: Support both light and dark themes via CSS variables

### When Migrating Legacy Sections

The legacy static site is preserved in the repository. When migrating sections:

1. **Read** the legacy HTML to understand content structure
2. **Extract** content and convert to React components
3. **Maintain** layout and functionality (but modernize with new tech)
4. **Replace** old libraries:
   - Bootstrap → Tailwind CSS
   - Typed.js → Custom hook with Framer Motion
   - Isotope → Custom filtering logic
   - Waypoints → Intersection Observer API
   - Tawk.to → Custom AI chat (future)

5. **Test** responsive design at all breakpoints

### Color Contrast Requirements

All text must meet WCAG AAA standards:
- Normal text: 7:1 contrast ratio minimum
- Large text (18pt+): 4.5:1 minimum
- UI components: 3:1 minimum

Test with browser DevTools or online contrast checkers before committing.

### Build Verification

**ALWAYS run `pnpm build` before creating PRs**. The build:
- Type-checks all TypeScript
- Verifies Next.js can compile pages
- Catches many runtime errors

Common build errors:
- Hydration mismatches (use `useState` + `useEffect` pattern for theme-dependent rendering)
- Missing dependencies
- Type errors in components

## Future Plans

### Planned Features (see docs/MODERNIZATION_STRATEGY.md for details)

**Phase 2: Component Migration**
- Migrate all sections from legacy site to React components
- Hero section with typing animation
- About section with profile image
- Portfolio grid with filtering
- Services showcase with AI models
- Contact form with validation

**Phase 3: CMS Integration**
- Payload CMS or Sanity.io setup
- LinkedIn article syncing via API
- Content migration from static files

**Phase 4: Advanced Features**
- AI chat agent using Vercel AI SDK + LobeUI components
- Testing setup (Vitest, Playwright, accessibility tests)
- CI/CD pipeline for automated testing

**Phase 5: Polish & Launch**
- Performance optimization (bundle size, images, fonts)
- SEO implementation (sitemaps, meta tags, structured data)
- Accessibility audit
- Final deployment to production

### Key Technical Decisions Pending

Documented in `docs/QUICK_START.md`:
- CMS choice (Sanity.io vs Payload CMS)
- AI provider (OpenAI vs Anthropic Claude)
- Testing priority (E2E vs unit tests)
- Analytics platform (Vercel Analytics vs Google Analytics)

## Important Constraints

1. **No Direct Main Merges**: All work goes through the integration branch first
2. **Build Must Pass**: Run `pnpm build` successfully before any PR
3. **WCAG AAA Compliance**: All features must maintain accessibility standards
4. **Dark Theme First**: Design for dark mode, light mode is secondary
5. **Mobile Responsive**: All components must work on mobile (test at 375px width minimum)
6. **TypeScript Strict Mode**: No `any` types unless absolutely necessary
7. **CSS Variables for Colors**: Never use hardcoded color values

## Common Tasks

### Add a New Section Component
```bash
# Create component file
touch src/components/sections/AboutSection.tsx

# Edit the component with proper TypeScript types
# Import and use in src/app/page.tsx
# Test responsive design and accessibility
# Verify build passes

pnpm build
git add .
git commit -m "feat(sections): add about section component"
```

### Update Color Scheme
```bash
# Edit src/styles/colors.css
# Modify CSS variable values (keep variable names same)
# Test contrast ratios for WCAG AAA compliance
# Verify both light and dark themes look correct

pnpm dev
# Manual testing in browser
pnpm build
```

### Add New Dependency
```bash
pnpm add <package-name>           # Production dependency
pnpm add -D <package-name>        # Dev dependency

# Update package.json
# Test that build still works
pnpm build

git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add <package-name>"
```

## Path Aliases

TypeScript is configured with path aliases in `tsconfig.json`:
- `@/*` maps to `./src/*`

Usage:
```tsx
import { Navigation } from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
```

## Reference Documentation

- **Next.js 16**: https://nextjs.org/docs
- **LobeUI**: https://ui.lobehub.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG22/quickref/
- **Project Planning**: See `docs/` folder for comprehensive strategies and checklists
