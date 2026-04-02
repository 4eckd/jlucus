# Portfolio Modernization - Implementation Checklist

**Project**: jlucus.dev Modernization
**Last Updated**: 2025-10-25

---

## Phase 1: Foundation & Setup

### 1.1 Project Structure

- [ ] Create new directory for modernized portfolio (`portfolio-v2/` or migrate in place)
- [ ] Initialize pnpm workspace (`pnpm init`)
- [ ] Create `pnpm-workspace.yaml` configuration
- [ ] Setup monorepo structure (`apps/`, `packages/`)
- [ ] Initialize Git repository and configure `.gitignore`
- [ ] Create branch strategy (main, develop, feature branches)
- [ ] Setup EditorConfig and Prettier for code formatting

### 1.2 Next.js & TypeScript Setup

- [ ] Install Next.js 14+ with TypeScript (`pnpm create next-app`)
- [ ] Configure TypeScript (`tsconfig.json`) with strict mode
- [ ] Setup path aliases (`@/`, `@components/`, etc.)
- [ ] Configure Next.js (`next.config.js`):
  - [ ] Image optimization settings
  - [ ] Bundle analyzer
  - [ ] Security headers
  - [ ] Environment variables
- [ ] Create folder structure:
  - [ ] `app/` (App Router)
  - [ ] `components/`
  - [ ] `lib/`
  - [ ] `hooks/`
  - [ ] `styles/`
  - [ ] `public/`
  - [ ] `types/`

### 1.3 Core Dependencies

- [ ] Install LobeUI: `pnpm add @lobehub/ui`
- [ ] Install Lucide Icons: `pnpm add lucide-react`
- [ ] Install Framer Motion: `pnpm add framer-motion`
- [ ] Install Radix UI primitives: `pnpm add @radix-ui/react-*`
- [ ] Install form handling: `pnpm add react-hook-form zod`
- [ ] Install state management: `pnpm add zustand`
- [ ] Install data fetching: `pnpm add swr` or `@tanstack/react-query`
- [ ] Install theme management: `pnpm add next-themes`
- [ ] Install utilities: `pnpm add clsx tailwind-merge`

### 1.4 Styling Setup

- [ ] Install Tailwind CSS: `pnpm add -D tailwindcss postcss autoprefixer`
- [ ] Initialize Tailwind: `npx tailwindcss init -p`
- [ ] Configure `tailwind.config.ts`:
  - [ ] Content paths
  - [ ] Theme extensions
  - [ ] Custom colors
  - [ ] Dark mode strategy
- [ ] Create global CSS with CSS variables
- [ ] Setup PostCSS configuration
- [ ] Create design tokens file (`styles/tokens.css`)

### 1.5 Development Tools

- [ ] Install ESLint and configure rules
- [ ] Install Prettier and setup formatting
- [ ] Configure VS Code settings (`.vscode/settings.json`)
- [ ] Install TypeScript types: `@types/node`, `@types/react`
- [ ] Setup Husky for pre-commit hooks (optional)
- [ ] Install lint-staged for staged file linting
- [ ] Configure commitlint for conventional commits

---

## Phase 2: Design System & Theming

### 2.1 Color Scheme

- [ ] Choose final color palette (Tech Blue, Modern Teal, or Bold Purple)
- [ ] Create color scale (50-900 for each color)
- [ ] Define semantic color tokens:
  - [ ] Primary, secondary, accent colors
  - [ ] Text colors (primary, secondary, muted)
  - [ ] Background colors (default, surface, elevated)
  - [ ] Border colors
  - [ ] Status colors (success, warning, error, info)
- [ ] Test contrast ratios (WCAG AAA compliance)
- [ ] Document color usage guidelines

### 2.2 Typography

- [ ] Setup `next/font` for Google Fonts:
  - [ ] Heading font (Raleway)
  - [ ] Body font (Roboto)
  - [ ] Mono font (optional, for code)
- [ ] Create typography scale:
  - [ ] Font sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)
  - [ ] Line heights
  - [ ] Font weights
  - [ ] Letter spacing
- [ ] Define heading styles (h1-h6)
- [ ] Create text utility classes

### 2.3 Spacing & Layout

- [ ] Define spacing scale (4px base unit)
- [ ] Create layout grid system
- [ ] Define container max-widths
- [ ] Setup responsive breakpoints
- [ ] Create spacing utility classes

### 2.4 Theme Configuration

- [ ] Create theme provider component
- [ ] Define light theme variables
- [ ] Define dark theme variables
- [ ] Implement theme toggle component
- [ ] Add system preference detection
- [ ] Test theme persistence (localStorage)
- [ ] Create theme documentation

### 2.5 Accessibility Foundation

- [ ] Setup skip-to-content link
- [ ] Define focus styles (ring, outline)
- [ ] Test keyboard navigation
- [ ] Add ARIA labels to interactive elements
- [ ] Implement reduced motion preferences
- [ ] Create accessibility utilities

---

## Phase 3: Component Development

### 3.1 Layout Components

- [ ] **Header/Navigation**
  - [ ] Desktop navigation
  - [ ] Mobile hamburger menu
  - [ ] Logo component
  - [ ] Theme toggle button
  - [ ] Smooth scroll links
  - [ ] Active section highlighting
- [ ] **Footer**
  - [ ] Social media links
  - [ ] Copyright notice
  - [ ] Quick navigation links
  - [ ] Contact information
- [ ] **Page Layout**
  - [ ] Main layout wrapper
  - [ ] Section container
  - [ ] Grid system components

### 3.2 Content Sections (Migrated from Current Site)

- [ ] **Hero Section**
  - [ ] Background image support
  - [ ] Animated typing effect (replace Typed.js)
  - [ ] Call-to-action buttons
  - [ ] Social media links
  - [ ] Responsive design
- [ ] **About Section**
  - [ ] Profile image
  - [ ] Biography text
  - [ ] Personal details list
  - [ ] Skills overview
- [ ] **Stats/Counter Section**
  - [ ] Animated counters (replace PureCounter)
  - [ ] Icon integration (Lucide)
  - [ ] Responsive grid
- [ ] **Skills Section**
  - [ ] Skill categories
  - [ ] Progress bars with animation
  - [ ] Scroll-triggered animations
- [ ] **Resume/Timeline Section**
  - [ ] Timeline component
  - [ ] Work experience cards
  - [ ] Education section
  - [ ] Downloadable PDF resume
- [ ] **Portfolio/Projects Section**
  - [ ] Project grid layout
  - [ ] Filter by category
  - [ ] Project cards with hover effects
  - [ ] Lightbox for images
  - [ ] Project detail modal
- [ ] **AI Models Showcase**
  - [ ] Model cards (using LobeUI)
  - [ ] Category filters
  - [ ] Logo integration
  - [ ] License badges
  - [ ] Model descriptions
- [ ] **Services Section**
  - [ ] Service cards
  - [ ] Icon integration
  - [ ] Service detail pages/modals
- [ ] **Testimonials Section**
  - [ ] Testimonial carousel
  - [ ] Avatar images
  - [ ] Quote styling
  - [ ] Navigation controls
- [ ] **Contact Section**
  - [ ] Contact form component
  - [ ] Form validation (Zod schema)
  - [ ] Success/error states
  - [ ] Google Maps integration (optional)
  - [ ] Social media links

### 3.3 UI Components (Shared Library)

- [ ] **Button**
  - [ ] Variants (primary, secondary, outline, ghost)
  - [ ] Sizes (sm, md, lg)
  - [ ] Loading state
  - [ ] Icon support
  - [ ] Accessibility (ARIA labels)
- [ ] **Card**
  - [ ] Card container
  - [ ] Card header, body, footer
  - [ ] Hover effects
  - [ ] Image support
- [ ] **Input**
  - [ ] Text input
  - [ ] Textarea
  - [ ] Select dropdown
  - [ ] Checkbox, radio
  - [ ] Error states
  - [ ] Label integration
- [ ] **Modal/Dialog**
  - [ ] Overlay
  - [ ] Close button
  - [ ] Focus trap
  - [ ] Accessibility (ARIA)
- [ ] **Badge**
  - [ ] Color variants
  - [ ] Sizes
  - [ ] Icon support
- [ ] **Tooltip**
  - [ ] Positioning logic
  - [ ] Trigger on hover/focus
- [ ] **Loading Spinner**
  - [ ] Multiple sizes
  - [ ] Color variants
- [ ] **Avatar**
  - [ ] Image support
  - [ ] Fallback initials
  - [ ] Status indicator

### 3.4 Animation Components

- [ ] **Fade In**
  - [ ] Entrance animation
  - [ ] Scroll trigger
  - [ ] Stagger children
- [ ] **Slide In**
  - [ ] Direction variants (up, down, left, right)
  - [ ] Scroll trigger
- [ ] **Scale**
  - [ ] Hover effects
  - [ ] Click effects
- [ ] **Parallax** (optional)
  - [ ] Background parallax
  - [ ] Element parallax

---

## Phase 4: CMS Integration

### 4.1 CMS Selection & Setup

- [ ] **Decision**: Choose Sanity.io OR Payload CMS
- [ ] Create CMS account/project
- [ ] Install CMS SDK
- [ ] Configure CMS project
- [ ] Create schema definitions:
  - [ ] Blog posts/articles
  - [ ] Portfolio projects
  - [ ] Services
  - [ ] Testimonials
  - [ ] Page content
  - [ ] Settings (social links, contact info)

### 4.2 Sanity.io Setup (if chosen)

- [ ] Install `@sanity/client` and `next-sanity`
- [ ] Create `sanity.config.ts`
- [ ] Setup Sanity Studio (CMS admin panel)
- [ ] Deploy Sanity Studio to subdomain (`cms.jlucus.dev`)
- [ ] Create schema types:
  - [ ] `post.ts` (blog articles)
  - [ ] `project.ts` (portfolio projects)
  - [ ] `service.ts`
  - [ ] `testimonial.ts`
  - [ ] `author.ts`
  - [ ] `category.ts`
- [ ] Configure image uploads and CDN
- [ ] Create GROQ queries for data fetching
- [ ] Implement preview mode for draft content

### 4.3 Payload CMS Setup (if chosen)

- [ ] Install `payload` package
- [ ] Create `payload.config.ts`
- [ ] Setup MongoDB/Postgres database
- [ ] Create collections:
  - [ ] Posts
  - [ ] Projects
  - [ ] Services
  - [ ] Testimonials
  - [ ] Users
- [ ] Configure admin panel
- [ ] Setup authentication
- [ ] Configure file uploads

### 4.4 Content Migration

- [ ] Extract content from current HTML files:
  - [ ] Hero text and images
  - [ ] About section content
  - [ ] Work experience (resume)
  - [ ] Portfolio projects
  - [ ] AI model descriptions
  - [ ] Service descriptions
  - [ ] Testimonials
- [ ] Migrate images to CMS/CDN
- [ ] Create initial content entries
- [ ] Test content retrieval
- [ ] Verify data structure

### 4.5 LinkedIn Integration

- [ ] Create LinkedIn Developer App
- [ ] Request API permissions:
  - [ ] `r_liteprofile`
  - [ ] `r_emailaddress`
  - [ ] `w_member_social`
- [ ] Implement OAuth 2.0 flow
- [ ] Create API route for LinkedIn webhook
- [ ] Build article fetching logic:
  - [ ] Fetch user articles
  - [ ] Parse article data
  - [ ] Store in CMS
  - [ ] Handle media/images
- [ ] Create cron job for scheduled sync
- [ ] Build manual sync UI in CMS
- [ ] Test article import flow
- [ ] Handle edge cases (private posts, deleted articles)

---

## Phase 5: Chat Agent Implementation

### 5.1 AI Chat Setup

- [ ] Install Vercel AI SDK: `pnpm add ai`
- [ ] Install AI provider SDK: `pnpm add openai` or `@anthropic-ai/sdk`
- [ ] Setup API keys in environment variables
- [ ] Create API route: `/app/api/chat/route.ts`
- [ ] Implement streaming responses
- [ ] Setup conversation context/memory

### 5.2 Chat UI Components

- [ ] Install LobeUI chat components
- [ ] Create `<ChatPanel />` component:
  - [ ] Message list
  - [ ] Input field
  - [ ] Send button
  - [ ] Loading states
  - [ ] Error handling
- [ ] Create `<ChatMessage />` component:
  - [ ] User message styling
  - [ ] AI message styling
  - [ ] Timestamp
  - [ ] Avatar
  - [ ] Markdown rendering
- [ ] Create chat toggle button
- [ ] Implement slide-in/out animation
- [ ] Add typing indicator
- [ ] Add "Chat is thinking..." state

### 5.3 Chat Agent Training

- [ ] Create knowledge base from portfolio content:
  - [ ] Work experience
  - [ ] Skills and technologies
  - [ ] Projects and achievements
  - [ ] Services offered
  - [ ] Contact information
- [ ] Implement RAG (Retrieval Augmented Generation):
  - [ ] Vector database (Pinecone, Weaviate, or local)
  - [ ] Embed portfolio content
  - [ ] Query relevant context
- [ ] Create system prompt:
  - [ ] Define AI personality
  - [ ] Set response guidelines
  - [ ] Include portfolio context
- [ ] Test various user queries
- [ ] Refine responses

### 5.4 Chat Features

- [ ] Implement conversation history
- [ ] Add "Clear chat" button
- [ ] Create chat export (download transcript)
- [ ] Add rate limiting
- [ ] Implement error handling
- [ ] Create fallback to contact form
- [ ] Add suggested questions/prompts
- [ ] Track analytics (chat engagement)

---

## Phase 6: Testing & Quality Assurance

### 6.1 Testing Setup

- [ ] Install testing libraries:
  - [ ] `pnpm add -D vitest @testing-library/react @testing-library/jest-dom`
  - [ ] `pnpm add -D @playwright/test` (E2E)
  - [ ] `pnpm add -D jest-axe` (accessibility)
- [ ] Configure Vitest (`vitest.config.ts`)
- [ ] Configure Playwright (`playwright.config.ts`)
- [ ] Create test utilities and helpers
- [ ] Setup test coverage reporting

### 6.2 Unit & Component Testing

- [ ] Write tests for UI components:
  - [ ] Button variants and states
  - [ ] Form inputs and validation
  - [ ] Card component
  - [ ] Modal behavior
- [ ] Test custom hooks:
  - [ ] `useTheme`
  - [ ] `useScrollPosition`
  - [ ] `useIntersectionObserver`
- [ ] Test utility functions
- [ ] Achieve 80%+ code coverage

### 6.3 Integration Testing

- [ ] Test API routes:
  - [ ] Contact form submission
  - [ ] Chat API endpoint
  - [ ] CMS data fetching
- [ ] Test data flows:
  - [ ] CMS to component rendering
  - [ ] Form submission to email
  - [ ] Chat message lifecycle
- [ ] Test error scenarios

### 6.4 E2E Testing (Playwright)

- [ ] Test critical user flows:
  - [ ] Homepage navigation
  - [ ] Portfolio filtering
  - [ ] Contact form submission
  - [ ] Chat interaction
  - [ ] Theme toggle
  - [ ] Mobile menu
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test responsive behavior
- [ ] Test keyboard navigation

### 6.5 Accessibility Testing

- [ ] Run automated tests:
  - [ ] `jest-axe` for components
  - [ ] Lighthouse accessibility audit
  - [ ] axe DevTools browser extension
- [ ] Manual testing:
  - [ ] Screen reader (NVDA, JAWS, VoiceOver)
  - [ ] Keyboard-only navigation
  - [ ] Color contrast verification
  - [ ] Focus management
- [ ] Test reduced motion preferences
- [ ] Verify ARIA labels and roles
- [ ] Ensure WCAG AAA compliance

### 6.6 Performance Testing

- [ ] Run Lighthouse performance audit
- [ ] Test Core Web Vitals:
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Analyze bundle size
- [ ] Test image optimization
- [ ] Verify code splitting
- [ ] Test on slow 3G network
- [ ] Test on low-end devices

### 6.7 Cross-Browser & Device Testing

- [ ] Test on desktop browsers:
  - [ ] Chrome (latest 2 versions)
  - [ ] Firefox (latest 2 versions)
  - [ ] Safari (latest 2 versions)
  - [ ] Edge (latest 2 versions)
- [ ] Test on mobile browsers:
  - [ ] iOS Safari
  - [ ] Chrome Mobile
  - [ ] Samsung Internet
- [ ] Test on various screen sizes:
  - [ ] Mobile (320px - 767px)
  - [ ] Tablet (768px - 1023px)
  - [ ] Desktop (1024px+)
  - [ ] Large displays (1920px+)

---

## Phase 7: Documentation

### 7.1 Technical Documentation

- [ ] **README.md**
  - [ ] Project overview
  - [ ] Tech stack
  - [ ] Quick start guide
  - [ ] Prerequisites
  - [ ] Installation steps
  - [ ] Development workflow
  - [ ] Build and deployment
- [ ] **ARCHITECTURE.md**
  - [ ] System architecture diagram
  - [ ] Tech stack details
  - [ ] Folder structure
  - [ ] Data flow
  - [ ] API documentation
- [ ] **COMPONENTS.md**
  - [ ] Component library overview
  - [ ] Component API documentation
  - [ ] Usage examples
  - [ ] Props documentation
- [ ] **STYLING.md**
  - [ ] Design system overview
  - [ ] Color palette
  - [ ] Typography scale
  - [ ] Spacing system
  - [ ] Component styling guidelines
- [ ] **API.md**
  - [ ] API routes documentation
  - [ ] Request/response examples
  - [ ] Error handling
  - [ ] Rate limiting
- [ ] **DEPLOYMENT.md**
  - [ ] Deployment steps
  - [ ] Environment variables
  - [ ] Subdomain configuration
  - [ ] CI/CD pipeline
  - [ ] Rollback procedure

### 7.2 User Guides

- [ ] **CMS Guide** (`docs/guides/cms-integration.md`)
  - [ ] How to add blog posts
  - [ ] How to update portfolio projects
  - [ ] Image upload guidelines
  - [ ] LinkedIn sync process
- [ ] **Theme Customization** (`docs/guides/theming.md`)
  - [ ] How to change colors
  - [ ] How to customize fonts
  - [ ] How to add new themes
- [ ] **Chat Agent Configuration** (`docs/guides/chat-agent.md`)
  - [ ] How to update AI responses
  - [ ] How to add knowledge base content
  - [ ] How to configure chat behavior

### 7.3 Code Documentation

- [ ] Add JSDoc comments to all components
- [ ] Document complex functions
- [ ] Add TypeScript types for all props
- [ ] Create Storybook stories (optional):
  - [ ] Button variants
  - [ ] Card layouts
  - [ ] Form inputs
  - [ ] Modal examples

### 7.4 Changelog & Versioning

- [ ] Create `CHANGELOG.md`
- [ ] Document version history
- [ ] Use semantic versioning
- [ ] Create Git tags for releases

---

## Phase 8: Deployment & DevOps

### 8.1 Environment Configuration

- [ ] Create `.env.local` for local development
- [ ] Create `.env.production` for production
- [ ] Document all environment variables:
  - [ ] CMS credentials
  - [ ] AI API keys
  - [ ] Database URLs
  - [ ] Email service credentials
  - [ ] Analytics IDs
- [ ] Setup environment variable validation
- [ ] Add `.env.example` for reference

### 8.2 Hosting Setup

- [ ] **Choose hosting platform**: Vercel (recommended), Netlify, or Cloudflare Pages
- [ ] Create hosting account
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - [ ] Build command: `pnpm build`
  - [ ] Output directory: `.next`
  - [ ] Install command: `pnpm install`
- [ ] Add environment variables to hosting platform
- [ ] Configure custom domain (`jlucus.dev`)

### 8.3 Subdomain Configuration

- [ ] **CMS Subdomain** (`cms.jlucus.dev`):
  - [ ] DNS CNAME record
  - [ ] Deploy CMS admin panel
  - [ ] SSL certificate
- [ ] **API Subdomain** (`api.jlucus.dev`) (optional):
  - [ ] DNS CNAME record
  - [ ] Configure API routes
  - [ ] SSL certificate
- [ ] Test all subdomains

### 8.4 CI/CD Pipeline

- [ ] Create `.github/workflows/ci.yml`:
  - [ ] Run tests on PR
  - [ ] Run linting
  - [ ] Check TypeScript types
  - [ ] Check build success
- [ ] Create `.github/workflows/deploy.yml`:
  - [ ] Deploy to production on merge to main
  - [ ] Deploy preview for PRs
- [ ] Configure GitHub branch protection:
  - [ ] Require PR reviews
  - [ ] Require status checks
  - [ ] Prevent force push to main

### 8.5 Monitoring & Analytics

- [ ] Setup analytics:
  - [ ] Vercel Analytics (if using Vercel)
  - [ ] Google Analytics 4
  - [ ] PostHog (optional)
- [ ] Setup error monitoring:
  - [ ] Sentry or similar
  - [ ] Configure error alerts
- [ ] Setup uptime monitoring:
  - [ ] UptimeRobot or similar
  - [ ] Configure downtime alerts
- [ ] Setup Lighthouse CI:
  - [ ] Performance monitoring
  - [ ] Accessibility monitoring

### 8.6 SEO Configuration

- [ ] Create `sitemap.xml`
- [ ] Create `robots.txt`
- [ ] Configure meta tags:
  - [ ] Open Graph tags
  - [ ] Twitter Card tags
  - [ ] Canonical URLs
- [ ] Add structured data (JSON-LD):
  - [ ] Person schema
  - [ ] Organization schema
  - [ ] Article schema (for blog posts)
- [ ] Submit sitemap to Google Search Console
- [ ] Setup 301 redirects (if URLs changed)

### 8.7 Performance Optimization

- [ ] Enable Next.js image optimization
- [ ] Configure caching headers
- [ ] Enable compression (gzip/brotli)
- [ ] Implement CDN for static assets
- [ ] Optimize fonts (subsetting, preloading)
- [ ] Minimize JavaScript bundle size
- [ ] Enable static page generation where possible

---

## Phase 9: Launch Preparation

### 9.1 Pre-Launch Checklist

- [ ] Final testing:
  - [ ] All links working
  - [ ] All images loading
  - [ ] Forms submitting correctly
  - [ ] Chat agent responding
  - [ ] Mobile responsive
  - [ ] Cross-browser compatible
- [ ] Content review:
  - [ ] Spelling and grammar check
  - [ ] Contact information accurate
  - [ ] Social media links correct
  - [ ] Resume up-to-date
- [ ] Performance check:
  - [ ] Lighthouse score > 90
  - [ ] Core Web Vitals passing
  - [ ] No console errors
  - [ ] No broken links
- [ ] Accessibility check:
  - [ ] WCAG AAA compliance
  - [ ] Screen reader tested
  - [ ] Keyboard navigation working
- [ ] Security check:
  - [ ] No exposed secrets
  - [ ] HTTPS enabled
  - [ ] CSP headers configured
  - [ ] Rate limiting active

### 9.2 Backup & Rollback Plan

- [ ] Backup current production site
- [ ] Create rollback procedure
- [ ] Test rollback process
- [ ] Document emergency contacts

### 9.3 Launch

- [ ] Deploy to production
- [ ] Update DNS (if needed)
- [ ] Monitor for errors
- [ ] Test live site thoroughly
- [ ] Announce launch (LinkedIn, Twitter, etc.)

---

## Phase 10: Post-Launch

### 10.1 Monitoring

- [ ] Monitor analytics for 1 week
- [ ] Check error logs daily
- [ ] Review performance metrics
- [ ] Collect user feedback

### 10.2 Iteration

- [ ] Address any bugs found
- [ ] Optimize based on real-world usage
- [ ] Improve based on feedback
- [ ] Plan next features

### 10.3 Content Updates

- [ ] Test CMS workflow
- [ ] Publish first LinkedIn article
- [ ] Update portfolio with new projects
- [ ] Add testimonials

---

## Ongoing Tasks

- [ ] Regular dependency updates
- [ ] Security patch monitoring
- [ ] Content freshness (weekly/monthly)
- [ ] Performance monitoring
- [ ] Accessibility audits (quarterly)
- [ ] Backup verification (monthly)

---

## Quick Reference: Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
pnpm format                 # Run Prettier
pnpm type-check             # Check TypeScript

# Testing
pnpm test                   # Run unit tests
pnpm test:watch             # Run tests in watch mode
pnpm test:coverage          # Generate coverage report
pnpm test:e2e               # Run E2E tests
pnpm test:a11y              # Run accessibility tests

# CMS (Sanity)
pnpm sanity dev             # Start Sanity Studio
pnpm sanity deploy          # Deploy Sanity Studio

# Deployment
pnpm deploy                 # Deploy to production
vercel --prod               # Deploy with Vercel CLI
```

---

## Notes

- Check off items as you complete them
- Update this checklist as requirements change
- Add new items as you discover them
- Track blockers and dependencies
- Celebrate milestones!

---

**Last Updated**: 2025-10-25
**Status**: Planning Phase