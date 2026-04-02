# Portfolio Modernization Strategy

**Project**: jlucus.dev Portfolio UI & Stack Modernization
**Date**: 2025-10-25
**Branch**: `claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM`

---

## Executive Summary

Modernizing jlucus.dev from a static HTML/Bootstrap site to a React-based application with LobeUI components, maintaining current layout while adding CMS capabilities for content management and social media integration.

**Current Stack**: Vanilla HTML/CSS/JS + Bootstrap 5.3.3 + GitHub Pages
**Target Stack**: React + Next.js + LobeUI + pnpm + TypeScript + Headless CMS

---

## 1. Technical Requirements & Research Plan

### 1.1 Core Technology Decisions

**Framework & Build Tools**
- **Next.js 14+** (App Router) for SSR/SSG capabilities
- **React 18+** for component architecture
- **TypeScript** for type safety
- **pnpm** as package manager (faster than npm, better monorepo support)
- **Turbopack** (Next.js built-in) for build optimization

**UI Component Libraries**
- **LobeUI** (@lobehub/ui) - Modern React component library
  - Provides chat interfaces, panels, lists, and modern UI patterns
  - Built-in dark mode support
  - Ant Design foundation
- **Lucide Icons** - Modern icon set (React-friendly)
- **Radix UI** - Headless primitives for accessibility
- **React Bits** - Additional utility components

**Styling Architecture**
- **CSS Modules** + **CSS Variables** for theming
- **Tailwind CSS** (optional utility classes, works with LobeUI)
- **PostCSS** for CSS processing
- **clsx** / **tailwind-merge** for conditional styling

### 1.2 Subdomain Architecture

**Proposed Subdomain Structure**:

```
jlucus.dev                    # Main portfolio site (Next.js frontend)
├── api.jlucus.dev            # API gateway (content, chat agent)
├── cms.jlucus.dev            # CMS admin panel (Headless CMS)
├── blog.jlucus.dev           # Blog/articles (optional separate domain)
└── cdn.jlucus.dev            # Static assets CDN (optional)
```

**Domain Requirements**:
- DNS configuration for subdomains (A/CNAME records)
- SSL certificates for all subdomains
- CORS configuration for cross-origin requests

### 1.3 Content Management System (CMS) Research

**CMS Options Analysis**:

| CMS Solution | Pros | Cons | Best For |
|--------------|------|------|----------|
| **Strapi** | Open-source, customizable, REST/GraphQL API | Self-hosted, requires backend | Full control, complex content |
| **Sanity.io** | Real-time, excellent DX, free tier | Learning curve | Real-time updates, collaborative |
| **Contentful** | Robust API, great docs, established | Expensive at scale | Enterprise needs |
| **Payload CMS** | TypeScript-native, Next.js friendly | Newer, smaller community | TypeScript projects |
| **Ghost** | Built for blogging, simple | Less flexible for custom content | Pure blogging focus |
| **Notion API** | Easy content editing, no setup | Limited customization | Simple content needs |

**RECOMMENDATION**: **Sanity.io** or **Payload CMS**

**Sanity.io Advantages**:
- LinkedIn API integration possible via custom data sources
- Real-time content updates
- GROQ query language for flexible content retrieval
- Free tier: 100k API requests, 3 users
- Portable Text for rich text (better than Markdown)
- Image CDN with transformations

**Payload CMS Advantages**:
- TypeScript-native (matches your stack)
- Next.js App Router support
- Self-hosted (full control, no vendor lock-in)
- Built-in authentication
- Rich text editor with blocks
- No monthly costs (just hosting)

### 1.4 LinkedIn Content Integration

**LinkedIn API Integration Strategy**:

```typescript
// Approach 1: LinkedIn API Direct Integration
// Requires LinkedIn Developer App + OAuth 2.0

// Approach 2: RSS Feed (Limited to public posts)
// LinkedIn provides RSS feeds for profiles

// Approach 3: Manual Import via CMS
// Copy/paste articles into CMS with metadata

// Approach 4: Web Scraping (Not Recommended)
// Against LinkedIn TOS, fragile
```

**RECOMMENDED APPROACH**: Hybrid System
1. **LinkedIn API** for automated article fetching (requires approval)
2. **Manual CMS Import** as fallback (with browser extension)
3. **RSS Feed** for basic syndication (limited data)

**Implementation Plan**:
- Create LinkedIn Developer App
- Request r_liteprofile, r_emailaddress, w_member_social permissions
- Build OAuth flow for one-time authentication
- Scheduled cron job to fetch new articles (daily/weekly)
- Store in CMS with metadata (publish date, tags, images)
- Manual override capability for editing/curation

### 1.5 Chat Agent Modernization

**Current**: Tawk.to third-party widget
**Target**: Custom AI chat agent

**Options**:
1. **Vercel AI SDK** + **OpenAI API**
   - Stream responses with streaming UI
   - Custom training on portfolio content
   - Edge function deployment

2. **LobeChat** (Open Source by LobeHub)
   - Full-featured AI chat application
   - Can be embedded or self-hosted
   - Supports multiple AI providers

3. **LangChain.js** + **Custom UI**
   - More control over AI behavior
   - RAG (Retrieval Augmented Generation) for portfolio context
   - Memory and conversation history

**RECOMMENDATION**: **Vercel AI SDK + LobeUI Chat Components**
- Seamless Next.js integration
- Use LobeUI's ChatList, ChatItem components
- Stream AI responses
- Keep conversation context
- Lower cost than hosted solutions

---

## 2. Component Architecture & Package Setup

### 2.1 pnpm Workspace Structure

```
jlucus-portfolio/
├── package.json                    # Workspace root
├── pnpm-workspace.yaml             # Workspace config
├── apps/
│   ├── web/                        # Main Next.js app
│   │   ├── package.json
│   │   ├── app/                    # Next.js App Router
│   │   ├── components/             # React components
│   │   ├── lib/                    # Utilities
│   │   └── public/                 # Static assets
│   └── cms/                        # CMS admin (optional)
├── packages/
│   ├── ui/                         # Shared component library
│   │   ├── package.json
│   │   └── src/
│   │       ├── components/         # Reusable components
│   │       ├── hooks/              # Custom React hooks
│   │       └── styles/             # Shared styles
│   ├── config/                     # Shared config (TypeScript, ESLint)
│   └── types/                      # Shared TypeScript types
└── docs/                           # Documentation
```

### 2.2 Required Packages

**Core Dependencies**:
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next": "^14.2.0",
    "@lobehub/ui": "^1.0.0",
    "lucide-react": "^0.400.0",
    "@radix-ui/react-*": "^1.0.0",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/node": "^20.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "prettier": "^3.2.0"
  }
}
```

**Additional Packages**:
- `@sanity/client` or `payload` (CMS integration)
- `ai` (Vercel AI SDK for chat)
- `openai` (OpenAI API client)
- `swr` or `@tanstack/react-query` (data fetching)
- `next-themes` (theme management)
- `react-intersection-observer` (scroll animations)
- `sharp` (image optimization)

### 2.3 Component Mapping (Current → New)

| Current Feature | Current Tech | New Component Stack |
|----------------|--------------|---------------------|
| Hero Section | HTML + Typed.js | `<HeroSection />` + LobeUI `<Hero />` |
| Navigation | Bootstrap Nav | LobeUI `<Header />` + Lucide icons |
| About Section | Static HTML | `<AboutSection />` with motion |
| Skills Section | Waypoints + custom | `<SkillsGrid />` + progress bars |
| Resume Timeline | Bootstrap cards | `<Timeline />` component |
| Portfolio Grid | Isotope.js | `<PortfolioGrid />` + filtering |
| AI Models Section | Custom cards | LobeUI `<ModelCard />` components |
| Services Grid | Bootstrap cards | `<ServiceGrid />` + hover effects |
| Contact Form | Formspree | `<ContactForm />` + API route |
| Chat Widget | Tawk.to | LobeUI `<ChatPanel />` + AI SDK |
| Testimonials | Swiper.js | `<TestimonialCarousel />` |

### 2.4 State Management Strategy

**Zustand Store Structure**:
```typescript
// stores/useThemeStore.ts - Theme/color scheme
// stores/useChatStore.ts - Chat conversations
// stores/useContentStore.ts - CMS content cache
// stores/useUIStore.ts - UI state (modals, nav)
```

**Server State (SWR/React Query)**:
- CMS content fetching
- LinkedIn articles
- Contact form submissions
- Chat message history

---

## 3. Color Scheme & Design System

### 3.1 ARIA-Compatible Color Variables

**Design Tokens Structure**:
```css
:root {
  /* Color Primitives */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;

  /* Semantic Colors */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-background: var(--color-neutral-50);
  --color-surface: var(--color-neutral-100);
  --color-border: var(--color-neutral-200);

  /* Functional Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Accessibility */
  --focus-ring: 0 0 0 3px var(--color-primary-200);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

[data-theme="dark"] {
  --color-text-primary: var(--color-neutral-50);
  --color-text-secondary: var(--color-neutral-400);
  --color-background: var(--color-neutral-900);
  --color-surface: var(--color-neutral-800);
  --color-border: var(--color-neutral-700);
}
```

### 3.2 Recommended Color Scheme

**Based on Current Site Analysis**:
- Current primary colors: Blue/teal (#149ddd)
- Professional tech aesthetic

**Proposed Modern Scheme**:

**Option 1: Tech Blue (Professional)**
- Primary: #0ea5e9 (Sky Blue)
- Secondary: #6366f1 (Indigo)
- Accent: #8b5cf6 (Purple)
- Neutral: Slate gray scale

**Option 2: Modern Teal (Friendly)**
- Primary: #14b8a6 (Teal)
- Secondary: #0891b2 (Cyan)
- Accent: #f97316 (Orange)
- Neutral: Cool gray scale

**Option 3: Bold Purple (Creative)**
- Primary: #8b5cf6 (Purple)
- Secondary: #ec4899 (Pink)
- Accent: #f59e0b (Amber)
- Neutral: Warm gray scale

**RECOMMENDATION**: **Option 1 (Tech Blue)** - Maintains professional feel, excellent contrast ratios

### 3.3 WCAG AAA Compliance

**Contrast Requirements**:
- Normal text: 7:1 contrast ratio (AAA)
- Large text: 4.5:1 contrast ratio (AAA)
- UI components: 3:1 contrast ratio

**Testing Tools**:
- `axe-core` (automated testing)
- Lighthouse accessibility audit
- `jest-axe` for component testing

**Implementation**:
```typescript
// lib/colors/contrast.ts
export function ensureContrast(
  foreground: string,
  background: string,
  minRatio = 7
): string {
  // Calculate and adjust colors for WCAG AAA
}
```

### 3.4 Theme Configuration

**next-themes Integration**:
```typescript
// app/providers.tsx
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark', 'auto']}
    >
      {children}
    </ThemeProvider>
  )
}
```

---

## 4. Component Library & UI Updates

### 4.1 LobeUI Component Integration

**LobeUI Components to Use**:
```typescript
import {
  ChatList,
  ChatItem,
  Avatar,
  Icon,
  Header,
  Hero,
  Features,
  Pricing,
  Footer,
  ThemeSwitch
} from '@lobehub/ui'
```

**Custom Wrapper Components**:
```typescript
// components/ui/Button.tsx - Enhanced LobeUI button
// components/ui/Card.tsx - Custom card with animations
// components/ui/Input.tsx - Form inputs with validation
// components/ui/Modal.tsx - Accessible modal dialogs
```

### 4.2 Component Testing Strategy

**Testing Stack**:
- **Vitest** for unit tests (faster than Jest)
- **Testing Library** for component tests
- **Playwright** for E2E tests
- **Storybook** for component documentation

**Example Test**:
```typescript
// components/HeroSection.test.tsx
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders hero heading', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('has proper ARIA labels', () => {
    render(<HeroSection />)
    expect(screen.getByLabelText('Main content')).toBeInTheDocument()
  })
})
```

### 4.3 Animation Strategy

**Replace Current Libraries**:
- Typed.js → Custom React hook with framer-motion
- AOS (Animate On Scroll) → Intersection Observer + framer-motion
- Waypoints → Intersection Observer API
- PureCounter → Custom counter with framer-motion

**Framer Motion Examples**:
```typescript
// components/animations/FadeIn.tsx
import { motion } from 'framer-motion'

export function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

### 4.4 Responsive Design Strategy

**Breakpoints** (matches Tailwind defaults):
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}
```

**Mobile-First Approach**:
- Design for mobile screens first
- Progressive enhancement for larger screens
- Touch-friendly targets (min 44x44px)
- Hamburger menu for mobile, full nav for desktop

---

## 5. Technical Documentation Plan

### 5.1 Documentation Structure

```
docs/
├── README.md                       # Project overview
├── ARCHITECTURE.md                 # System architecture
├── COMPONENTS.md                   # Component documentation
├── STYLING.md                      # Style guide & design tokens
├── API.md                          # API documentation
├── DEPLOYMENT.md                   # Deployment guide
├── CONTRIBUTING.md                 # Contribution guidelines
├── CHANGELOG.md                    # Version history
└── guides/
    ├── setup.md                    # Local development setup
    ├── cms-integration.md          # CMS setup and usage
    ├── chat-agent.md               # Chat agent configuration
    └── theming.md                  # Theme customization
```

### 5.2 Code Documentation Standards

**TypeScript Documentation**:
```typescript
/**
 * Hero section component with animated text
 *
 * @example
 * ```tsx
 * <HeroSection
 *   title="Developer"
 *   subtitle="Building amazing products"
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 *
 * @param title - Main heading text
 * @param subtitle - Secondary text below title
 * @param backgroundImage - Optional background image URL
 * @returns Rendered hero section
 */
export function HeroSection({ title, subtitle, backgroundImage }: HeroProps) {
  // ...
}
```

**Component Storybook**:
```typescript
// components/HeroSection.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { HeroSection } from './HeroSection'

const meta: Meta<typeof HeroSection> = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
}

export default meta
```

### 5.3 API Documentation

**OpenAPI/Swagger for API Routes**:
```yaml
# docs/api-spec.yaml
openapi: 3.0.0
info:
  title: Portfolio API
  version: 1.0.0
paths:
  /api/contact:
    post:
      summary: Submit contact form
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name: { type: string }
                email: { type: string, format: email }
                message: { type: string }
```

---

## 6. Overlooked Details & Recommendations

### 6.1 Performance Optimization

**Critical Considerations**:
- **Image Optimization**: Use Next.js `<Image />` component
  - Current site has 20+ images without optimization
  - WebP format with fallbacks
  - Lazy loading below the fold

- **Code Splitting**: Dynamic imports for heavy components
  ```typescript
  const ChatPanel = dynamic(() => import('@/components/ChatPanel'), {
    ssr: false,
    loading: () => <ChatSkeleton />
  })
  ```

- **Font Optimization**: `next/font` for Google Fonts
  - Eliminates external font requests
  - Automatic font subsetting

- **Bundle Analysis**: Regular monitoring
  ```bash
  pnpm build --analyze
  ```

### 6.2 SEO Considerations

**Migration Risks**:
- Current site has good SEO (static HTML)
- Must maintain or improve with Next.js

**SEO Strategy**:
- Server-side rendering for initial page load
- Static generation for blog posts
- Proper meta tags with `next/head`
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration

**Example**:
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Jesse Lucas - Software Engineer & Product Manager',
  description: 'Portfolio of Jesse Lucas...',
  openGraph: {
    title: 'Jesse Lucas Portfolio',
    description: '...',
    images: ['/og-image.jpg'],
  }
}
```

### 6.3 Analytics & Monitoring

**Recommended Services**:
- **Vercel Analytics** (if deploying to Vercel)
- **Google Analytics 4** (current tracking continuation)
- **PostHog** (open-source alternative)
- **Sentry** for error tracking
- **Lighthouse CI** for performance monitoring

### 6.4 Content Migration Strategy

**Critical Step**: Don't lose existing content!

**Migration Checklist**:
- [ ] Export all images from current site
- [ ] Document all text content
- [ ] Save AI model descriptions and logos
- [ ] Preserve portfolio project details
- [ ] Keep resume/work history data
- [ ] Export testimonials
- [ ] Save contact information
- [ ] Document external links

**Approach**:
1. Create content database schema in CMS
2. Write migration scripts (HTML → Markdown/JSON)
3. Import into CMS
4. Verify all content renders correctly

### 6.5 Deployment Strategy

**Recommended Platform**: **Vercel**
- Native Next.js support
- Zero-config deployment
- Edge functions for API routes
- Automatic HTTPS
- Preview deployments for PRs
- Free tier generous for portfolio sites

**Alternative**: **Netlify** or **Cloudflare Pages**

**CI/CD Pipeline**:
```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: vercel deploy --prod
```

### 6.6 Accessibility Beyond WCAG

**Additional Considerations**:
- **Keyboard Navigation**: Full site navigable without mouse
- **Screen Reader Testing**: Test with NVDA/JAWS/VoiceOver
- **Reduced Motion**: Respect `prefers-reduced-motion`
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- **Focus Management**: Visible focus indicators
- **Skip Links**: "Skip to main content" link

### 6.7 Security Considerations

**API Route Security**:
- Rate limiting (5 requests/minute for contact form)
- CSRF protection
- Input sanitization
- Environment variable management

**Content Security Policy (CSP)**:
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; ..."
  }
]
```

### 6.8 LinkedIn Integration Specifics

**Content Types to Support**:
- Articles (long-form)
- Posts (short updates)
- Media (images, videos)
- Documents (PDFs, slides)

**Metadata to Capture**:
- Publication date
- Tags/categories
- Engagement metrics (likes, comments, shares)
- External links
- Featured images

**Update Frequency**:
- Automated sync: Daily at midnight
- Manual trigger: Via CMS button
- Webhook: Real-time (if LinkedIn supports)

### 6.9 Chat Agent Features

**Beyond Basic Chat**:
- **Context Awareness**: Know current page context
- **Portfolio-Specific**: Answer questions about projects
- **Resume Assistant**: Help visitors learn about experience
- **Contact Integration**: Seamless transition to contact form
- **Conversation Export**: Download chat transcript

**Example Prompts to Handle**:
- "What projects has Jesse worked on?"
- "Tell me about Jesse's experience at Intel"
- "How can I contact Jesse?"
- "What technologies does Jesse know?"

### 6.10 Progressive Web App (PWA)

**Consider Adding**:
- Service worker for offline access
- Install prompt for mobile devices
- Push notifications (optional)

**Benefits**:
- Better mobile experience
- Works offline
- App-like feel

---

## Project Timeline Estimate

### Phase 1: Foundation (Week 1-2)
- Setup pnpm workspace
- Install and configure Next.js + TypeScript
- Setup LobeUI and component library
- Design system and color scheme
- Git branching strategy

### Phase 2: Component Development (Week 3-4)
- Build core components (Hero, Nav, Footer)
- Migrate sections to React components
- Implement animations with Framer Motion
- Theme system implementation

### Phase 3: CMS Integration (Week 5-6)
- Setup Sanity/Payload CMS
- LinkedIn API integration
- Content migration
- CMS admin customization

### Phase 4: Chat Agent (Week 7)
- Vercel AI SDK integration
- Chat UI with LobeUI components
- AI training on portfolio content
- Testing and refinement

### Phase 5: Testing & Polish (Week 8-9)
- Accessibility audit
- Performance optimization
- Cross-browser testing
- Mobile responsive testing
- SEO verification

### Phase 6: Documentation & Deployment (Week 10)
- Technical documentation
- Deployment configuration
- DNS and subdomain setup
- Final testing and launch

**Total Estimated Timeline**: 10 weeks (2.5 months)

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| LinkedIn API approval delay | High | Implement manual import fallback |
| LobeUI compatibility issues | Medium | Have backup UI library (ShadCN) |
| SEO degradation | High | SSR/SSG strategy, monitoring |
| Content migration errors | Medium | Thorough testing, backups |
| Chat agent costs | Low | Usage limits, fallback to form |
| Performance regression | Medium | Lighthouse CI, monitoring |
| Accessibility issues | Medium | Regular audits, automated tests |

---

## Success Metrics

**Technical Metrics**:
- Lighthouse score: 90+ (all categories)
- WCAG AAA compliance: 100%
- Bundle size: < 250KB (initial load)
- Time to Interactive: < 3 seconds
- Core Web Vitals: All "Good"

**Functional Metrics**:
- All current features maintained
- CMS content updates in < 5 minutes
- Chat agent response time < 2 seconds
- Mobile responsiveness: All viewports
- Browser support: Last 2 versions of major browsers

**User Experience Metrics**:
- Form submission success rate: > 95%
- Chat engagement: > 20% of visitors
- Average session duration: Increase by 30%
- Bounce rate: Decrease by 20%

---

## Next Steps (Immediate Actions)

1. **Create pnpm workspace structure**
2. **Initialize Next.js project with TypeScript**
3. **Install LobeUI and core dependencies**
4. **Create design tokens and color variables**
5. **Build first component (Hero section) as proof of concept**
6. **Setup Sanity.io account and project**
7. **Apply for LinkedIn Developer API access**
8. **Create component library structure**
9. **Document development workflow**
10. **Setup CI/CD pipeline**

---

## Questions to Resolve

1. **Hosting Preference**: Vercel, Netlify, or self-hosted?
2. **CMS Choice**: Sanity.io or Payload CMS?
3. **Chat AI Provider**: OpenAI, Anthropic Claude, or other?
4. **Blog Subdomain**: Separate or integrated into main site?
5. **Analytics**: Continue with GA4 or switch to PostHog?
6. **Testing Priority**: E2E tests required or focus on unit tests?
7. **Storybook**: Worth the setup overhead?
8. **Budget**: Any monthly service cost limits?

---

## Resources & References

**Documentation**:
- [LobeUI Documentation](https://ui.lobehub.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity.io Guides](https://www.sanity.io/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)

**Design Inspiration**:
- [Dribbble - Portfolio Designs](https://dribbble.com/search/portfolio)
- [Awwwards - Developer Portfolios](https://www.awwwards.com/websites/portfolio/)
- [LobeHub Examples](https://github.com/lobehub/lobe-ui/tree/main/example)

**Community**:
- LobeUI GitHub Issues
- Next.js Discord
- React Discord
- Frontend Mentor Community

---

**Document Status**: Draft for Review
**Last Updated**: 2025-10-25
**Next Review**: After initial feedback