# RSS Daily Learning - Design System & Performance Guide

## Design Tokens Overview

All 4 responsive layouts use the Terminal Neon CSS variable system defined in `src/styles/globals.css`.

### Color Palette

#### Primary Colors
- **Electric Cyan (#00D9FF)**: `rgb(0 217 255)` - Main interactive elements, borders, focus states
- **Neon Magenta (#FF006E)**: `rgb(255 0 110)` - Accents, highlights, secondary actions
- **Electric Lime (#CCFF00)**: `rgb(204 255 0)` - Success states, alerts

#### Background Colors
- **Base**: `rgb(0 0 0)` - Pure black, deepest layer
- **Primary**: `rgb(10 10 15)` - Main background
- **Secondary**: `rgb(20 20 30)` - Secondary surfaces, panels
- **Tertiary**: `rgb(30 35 45)` - Cards, nested elements

#### Text Colors
- **Primary**: `rgb(240 245 255)` - Main text (near white)
- **Secondary**: `rgb(160 170 190)` - Muted text
- **Tertiary**: `rgb(100 110 130)` - Less emphasis
- **Muted**: `rgb(70 75 90)` - Minimal emphasis

### Spacing Scale

All spacing uses CSS variables for consistency:
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 32px
- `--space-2xl`: 48px
- `--space-3xl`: 64px

### Typography

- **Headings**: JetBrains Mono (monospace) - Terminal aesthetic
- **Body**: Inter (sans-serif) - Readable, clean
- **Code**: JetBrains Mono

### Shadow & Glow

Neon glow effects for interactive elements:
```css
--shadow-glow: 0 0 5px rgb(var(--color-primary)), 0 0 20px rgb(var(--color-primary));
--shadow-glow-lg: 0 0 10px rgb(var(--color-primary)), 0 0 40px rgb(var(--color-primary));
```

---

## Layout-Specific Design Implementations

### 1. Mobile Layout (720x1280)
**Pattern**: Card Stack with Horizontal Scroll Filters

**Key Elements**:
- Sticky header with horizontal-scrolling category chips
- Full-width cards with minimal padding (16px)
- Tap-to-expand interaction pattern
- Simplified footer actions (Save/Share)

**CSS Variables Used**:
```css
/* Sticky header with backdrop blur */
background-color: rgb(var(--color-bg-primary) / 0.95);
border: 1px solid rgb(var(--color-primary) / 0.2);

/* Category chips - selected state */
background-color: rgb(var(--color-primary));
color: rgb(var(--color-bg-primary));

/* Cards */
background-color: rgb(var(--color-bg-secondary));
border: 1px solid rgb(var(--color-primary) / 0.3);
```

**Performance Optimization**:
- Lazy loading post content on card click
- No virtual scrolling needed (cards render efficiently)
- Image lazy loading via `<img loading="lazy">`
- Intersection Observer for animation triggers

### 2. Desktop Layout (1920x1080)
**Pattern**: 2-Column Split View (List + Preview)

**Key Elements**:
- Left sidebar: scrollable feed list (50%)
- Right panel: article preview (50%)
- Category filter chips above feed
- Read/Share buttons in footer

**CSS Variables Used**:
```css
/* Grid split */
grid: grid-cols-2 gap-px;
border-right: 1px solid rgb(var(--color-primary) / 0.3);

/* Selected article highlight */
background-color: rgb(var(--color-primary) / 0.1);
border-color: rgb(var(--color-primary) / 0.8);
box-shadow: 0 0 10px rgb(var(--color-primary) / 0.3);
```

**Performance Optimization**:
- Virtual scrolling in left panel (if >100 items)
- Memoized article preview to prevent re-renders
- CSS containment for paint optimization
- Efficient state management with React.memo

### 3. Tablet Layout (1080x1920)
**Pattern**: Expandable Cards with Inline Filters

**Key Elements**:
- Centered max-width container (auto-fit)
- Expandable cards with smooth animation
- Inline filters in header
- Full metadata visible when expanded

**CSS Variables Used**:
```css
/* Card expansion animation */
border-color: rgb(var(--color-primary) / 0.8);
background-color: rgb(var(--color-bg-secondary));
box-shadow: 0 0 20px rgb(var(--color-primary) / 0.2);

/* Expanded content divider */
border-top: 1px solid rgb(var(--color-primary) / 0.2);
```

**Performance Optimization**:
- Framer Motion layout animations for smooth transitions
- Single expanded card at a time (prevents layout thrashing)
- Lazy rendering of expanded content
- Smooth scroll behavior with momentum scrolling

### 4. Wide Display Layout (1440x2360+)
**Pattern**: 3-Panel Command Center (Categories | Feed | Details)

**Key Elements**:
- Left sidebar: Category navigation + stats (20%)
- Center panel: Feed grid with sort controls (50%)
- Right panel: Article details + metadata (30%)
- Advanced filtering and metadata display

**CSS Variables Used**:
```css
/* 3-column layout */
grid: grid-cols-12 gap-px;

/* Category sidebar */
border-right: 1px solid rgb(var(--color-primary) / 0.3);
background-color: rgb(var(--color-bg-primary));

/* Feed grid */
border-right: 1px solid rgb(var(--color-primary) / 0.2);

/* Stats card */
background-color: rgb(var(--color-bg-secondary));
border: 1px solid rgb(var(--color-primary) / 0.3);
```

**Performance Optimization**:
- Virtualized grid in center panel
- Lazy loading details on article selection
- CSS containment for each panel
- Efficient re-renders with React.memo on card components

---

## Performance Optimization Strategies

### Code Splitting
- Each layout component is code-split via dynamic import
- Only loaded layout is hydrated on the client
- Responsive component detects viewport and loads appropriate layout

### Image Optimization
```tsx
// Lazy load images in article cards
<img loading="lazy" src={imageUrl} alt={title} />

// Next.js Image component for featured images
<Image
  src={featuredImage}
  alt={title}
  width={800}
  height={400}
  placeholder="blur"
  blurDataURL={blurhash}
/>
```

### CSS Optimization
- All colors use CSS variables (no runtime color conversion)
- No hardcoded values - all via design tokens
- CSS containment on card components: `contain: layout paint style;`
- Will-change hints for animated elements: `will-change: transform, opacity;`

### State Management
- Minimal re-renders using React.memo
- useCallback for event handlers
- useMemo for filtered post lists
- Single source of truth per layout

### Animations
- Framer Motion with `layout` prop for smooth transitions
- `whileInView` with `viewport={{ once: true }}` for scroll animations
- CSS-based transitions where possible (faster than JS)
- GPU-accelerated transforms: `transform: translate3d()`

---

## Browser Support & Accessibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

### Accessibility Features
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast > 4.5:1 (WCAG AA)
- Focus visible states for all interactive elements
- Reduced motion support via `prefers-reduced-motion`

### Keyboard Navigation
```tsx
// Enter/Space to expand card
// Tab to navigate
// Escape to collapse
// Arrow keys for filter selection (wide layout)
```

---

## Performance Benchmarks

### Target Lighthouse Scores
- **Mobile**: 90+
- **Desktop**: 95+
- **Tablet**: 95+
- **Wide**: 98+

### Actual Measurements
These will be measured post-deployment. Current optimization focus:
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3.5s

### Bundle Size Targets
- Main bundle: < 200KB (gzipped)
- RSS layout component: < 50KB (gzipped)
- Layout-specific CSS: < 5KB (gzipped)

---

## Future Optimization Opportunities

1. **Image CDN Integration** - Optimize image delivery with Cloudinary/Imgix
2. **Service Worker** - Offline support and faster repeat visits
3. **ISR (Incremental Static Regeneration)** - Auto-update static content
4. **Web Fonts Optimization** - Reduce JetBrains Mono to essential weights
5. **Critical CSS Extraction** - Inline critical styles for faster FCP
6. **HTTP/2 Server Push** - Pre-push important resources
7. **Compression** - Brotli compression for text resources
8. **Minification** - Additional minification of CSS variables

---

## CSS Variable Migration Checklist

✅ All colors use CSS variables (no hardcoded colors)
✅ All spacing uses CSS variables
✅ All shadows use CSS variables
✅ All borders use CSS variable values
✅ All transitions use CSS variable durations
✅ Font sizes use CSS variables
✅ No !important declarations
✅ No inline styles except for dynamic values

**Dynamic Value Pattern**:
```tsx
// Good - using CSS variables with inline styles for dynamic values
style={{
  backgroundColor: `rgb(var(--color-primary) / ${opacity})`,
  color: `rgb(var(--color-text-primary))`,
}}

// Bad - hardcoded values
style={{
  backgroundColor: '#00D9FF',
  color: '#F0F5FF',
}}
```

---

## Testing Recommendations

### Unit Tests
- Test viewport detection logic
- Test filter functionality
- Test post selection state

### Integration Tests
- Test responsive layout switching
- Test animation triggers
- Test color token consistency

### Performance Tests
- Lighthouse CI
- Web Vitals monitoring
- Bundle size tracking
- Memory leak detection

### Visual Tests
- Percy/Chromatic for visual regression
- Manual testing on actual devices
- Responsive design testing tools

---

## Deployment Checklist

- [ ] Verify all 4 layouts render correctly
- [ ] Test performance on 4G throttling
- [ ] Verify CSS variables load before animations
- [ ] Check Web Vitals in production
- [ ] Validate accessibility with axe-core
- [ ] Test on actual devices (mobile, tablet, desktop)
- [ ] Monitor error tracking (Sentry)
- [ ] Set up performance monitoring (Vercel Analytics)
