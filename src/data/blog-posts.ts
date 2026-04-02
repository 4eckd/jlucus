import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'understanding-css-variables-in-tailwind',
    title: 'Understanding CSS Variables in Tailwind CSS 4',
    excerpt:
      'A deep dive into how CSS variables work with Tailwind CSS 4 for creating maintainable design systems.',
    content: `# Understanding CSS Variables in Tailwind CSS 4

CSS variables (custom properties) are a powerful feature that allows you to define reusable values throughout your stylesheets. When combined with Tailwind CSS 4, they become even more powerful for creating flexible, maintainable design systems.

## What are CSS Variables?

CSS custom properties, commonly known as CSS variables, are entities defined by CSS authors that contain specific values to be reused throughout a document. They allow you to store values like colors, spacing, and fonts in one place and reference them throughout your codebase.

## Why Use CSS Variables with Tailwind?

While Tailwind CSS itself provides utility classes, CSS variables offer several advantages:

- **Single Source of Truth**: Define design tokens once and reference them everywhere
- **Dynamic Theming**: Easily switch between themes by updating variable values
- **Alpha Channel Support**: Using RGB values in CSS variables allows for transparent color variations
- **Better Organization**: Keep all design tokens in one place

## Example: Color System

In our Terminal Neon theme, we define colors as CSS variables:

\`\`\`css
:root {
  --color-primary: 0 217 255;        /* Electric Cyan #00D9FF */
  --color-accent: 255 0 110;         /* Neon Magenta #FF006E */
  --color-secondary: 204 255 0;      /* Electric Lime #CCFF00 */
}
\`\`\`

Then in Tailwind, we reference them:

\`\`\`js
theme: {
  colors: {
    primary: 'rgb(var(--color-primary) / <alpha-value>)',
    accent: 'rgb(var(--color-accent) / <alpha-value>)',
  }
}
\`\`\`

## Key Takeaways

CSS variables are essential for building maintainable, scalable design systems. Combined with Tailwind CSS 4, they provide a powerful foundation for creating modern web applications.`,
    date: '2025-03-29',
    category: 'learning',
    tags: ['css', 'tailwind', 'design-systems', 'frontend'],
    readingTime: 5,
    author: 'jlucus',
  },
  {
    id: '2',
    slug: 'next-js-16-app-router-migration',
    title: 'Migrating to Next.js 16 App Router',
    excerpt:
      'Best practices and lessons learned while upgrading a portfolio from Pages Router to App Router.',
    content: `# Migrating to Next.js 16 App Router

The App Router in Next.js 16 is a significant upgrade that introduces new patterns and capabilities. This post documents the lessons learned during the migration of our portfolio.

## Why Migrate?

The App Router brings several improvements:

- **Server Components**: Better performance and security by default
- **Nested Routing**: More intuitive file structure
- **Layouts**: Shared UI between routes without re-mounting
- **Streaming**: Faster perceived performance with progressive rendering

## Key Differences

### File Structure

Pages Router:
\`\`\`
pages/
├── index.tsx
├── about.tsx
└── blog/
    └── [slug].tsx
\`\`\`

App Router:
\`\`\`
app/
├── page.tsx
├── about/
│   └── page.tsx
└── blog/
    ├── page.tsx
    └── [slug]/
        └── page.tsx
\`\`\`

### Route Layouts

In App Router, layouts are defined as separate files and apply to all child routes automatically. This eliminates the need for wrapper components in every page.

## Migration Checklist

- [ ] Create new app directory structure
- [ ] Move pages to app directory (rename index.tsx to page.tsx)
- [ ] Create layout.tsx for shared UI
- [ ] Update import paths
- [ ] Test dynamic routes with [slug] pattern
- [ ] Update metadata exports
- [ ] Remove next/router usage, replace with next/navigation

## Best Practices

1. **Use Server Components by Default**: Only use 'use client' when needed
2. **Organize by Feature**: Group related routes together
3. **Leverage Layouts**: Use nested layouts for hierarchical UI
4. **Stream Content**: Use Suspense boundaries for better UX`,
    date: '2025-03-28',
    category: 'development',
    tags: ['nextjs', 'react', 'migration', 'backend'],
    readingTime: 7,
    author: 'jlucus',
  },
  {
    id: '3',
    slug: 'building-terminal-neon-design-system',
    title: 'Building a Terminal Neon Design System',
    excerpt:
      'Creating a cohesive, cyberpunk-inspired design system with electric colors and neon glows.',
    content: `# Building a Terminal Neon Design System

Terminal Neon design combines the aesthetic of retro terminal interfaces with modern cyberpunk styling. This post explores how to build a consistent design system around this theme.

## Color Palette

The foundation of any design system is its color palette. For Terminal Neon, we chose:

- **Primary**: Electric Cyan (#00D9FF) - Main interactive elements
- **Accent**: Neon Magenta (#FF006E) - Highlights and emphasis
- **Secondary**: Electric Lime (#CCFF00) - Alerts and success states
- **Error**: Neon Red (#FF4757) - Destructive actions
- **Success**: Cyber Green (#00FF9F) - Confirmations

## Neon Effects

Neon glows are created using multiple box shadows and filters:

\`\`\`css
--shadow-neon-primary:
  0 0 5px rgb(var(--color-primary)),
  0 0 20px rgb(var(--color-primary));
\`\`\`

## Typography

The design system uses:

- **JetBrains Mono**: For headings and code (terminal aesthetic)
- **Inter**: For body text and regular content (readability)

## Component Design

Every component follows these principles:

1. **Neon Accents**: Interactive elements have subtle glow on hover
2. **Terminal Styling**: Use borders and shadows instead of flat fills
3. **High Contrast**: Ensure WCAG AA compliance
4. **Consistent Spacing**: Use CSS variables for spacing scale

## Animations

Animations should feel responsive and energetic:

- **Hover States**: 200ms scale and glow transitions
- **Page Transitions**: 400ms fade and slide animations
- **Loading States**: Pulsing glow effects

## Conclusion

A well-executed design system creates consistency and improves user experience. Terminal Neon provides a unique aesthetic that stands out while maintaining functionality.`,
    date: '2025-03-27',
    category: 'insights',
    tags: ['design-systems', 'ui-ux', 'css', 'neon'],
    readingTime: 6,
    author: 'jlucus',
  },
  {
    id: '4',
    slug: 'framer-motion-animations-guide',
    title: 'Framer Motion: Smooth Animations Guide',
    excerpt:
      'Creating performant, fluid animations with Framer Motion in React applications.',
    content: `# Framer Motion: Smooth Animations Guide

Framer Motion is a powerful animation library for React that makes creating smooth, professional animations straightforward. This guide covers the essentials.

## Basic Concepts

### Motion Component

Replace HTML elements with motion components:

\`\`\`tsx
import { motion } from 'framer-motion'

export function Box() {
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{ duration: 0.5 }}
    >
      Animated Box
    </motion.div>
  )
}
\`\`\`

### Variants

Variants define named animation states that can be triggered together:

\`\`\`tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
\`\`\`

### Scroll Animations

Use \`whileInView\` for scroll-triggered animations:

\`\`\`tsx
<motion.section
  whileInView={{ opacity: 1 }}
  initial={{ opacity: 0 }}
  viewport={{ once: true }}
>
  Animates when scrolled into view
</motion.section>
\`\`\`

## Performance Tips

1. **Use GPU Acceleration**: Animate \`transform\` and \`opacity\` instead of position
2. **Limit Active Animations**: Don't animate too many elements simultaneously
3. **Use \`will-change\` CSS**: For complex animations, hint to the browser
4. **Test on Mobile**: Performance varies significantly

## Common Patterns

- Stagger children animations for visual interest
- Use gesture animations (\`whileHover\`, \`whileTap\`) for interactivity
- Combine with Tailwind for easy styling
- Use exit animations for better UX

Framer Motion transforms animation from tedious to delightful.`,
    date: '2025-03-26',
    category: 'tutorial',
    tags: ['framer-motion', 'react', 'animations', 'frontend'],
    readingTime: 8,
    author: 'jlucus',
  },
  {
    id: '5',
    slug: 'experimental-web-apis',
    title: 'Experimenting with Experimental Web APIs',
    excerpt:
      "Testing the bleeding edge of web APIs and documenting what works and what doesn't.",
    content: `# Experimenting with Experimental Web APIs

The web platform is constantly evolving with new APIs. This post documents some experimental features worth keeping an eye on.

## Web APIs Worth Watching

### View Transitions API

The View Transitions API allows creating animated transitions between page views:

\`\`\`tsx
if (document.startViewTransition) {
  document.startViewTransition(() => {
    navigate('/new-page')
  })
}
\`\`\`

### Popover API

A native API for creating popover content without external libraries:

\`\`\`tsx
<button popovertarget="my-popover">Show</button>
<div id="my-popover" popover="auto">Content</div>
\`\`\`

### Container Queries

Query container size instead of viewport size:

\`\`\`css
@container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}
\`\`\`

## Browser Support

Always check caniuse.com for current browser support before using experimental APIs in production.

## Fallbacks

Use feature detection to provide fallbacks:

\`\`\`tsx
if (CSS.supports('container-type: inline-size')) {
  // Use container queries
} else {
  // Fallback to media queries
}
\`\`\`

## Conclusion

Experimenting with new APIs helps you stay current and prepares you for their stabilization. However, always provide fallbacks for production code.`,
    date: '2025-03-25',
    category: 'experiment',
    tags: ['web-apis', 'javascript', 'frontend', 'experimental'],
    readingTime: 5,
    author: 'jlucus',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
