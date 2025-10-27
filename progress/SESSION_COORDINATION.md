# Session Coordination Plan

**Project:** jlucus.dev Portfolio Modernization
**Last Updated:** 2025-10-26T00:45:00Z

---

## Active Sessions

### Window 2: User Profile & Authentication
**Branch:** `feat/auth-foundation/UPR-001`
**Status:** needs-review (pending approvals)
**Session ID:** sess-feat-auth-foundation-UPR-001-1
**Developer:** Claude (Window 2)

**Current Work:**
- NextAuth.js v5 setup with Prisma adapter
- User database schema (User, Account, Session, VerificationToken)
- Email/Password authentication provider
- API route handlers for auth

**Blocked On:**
- Git checkout approval
- pnpm install approvals for dependencies

**Next Steps (UPR-002+):**
- OAuth providers (Google, GitHub)
- Profile UI components
- Photo upload system

---

### Window 3: Hero Section Component (Proposed)
**Branch:** `feat/hero-section/HSC-001` (to be created)
**Status:** planning
**Session ID:** sess-feat-hero-section-HSC-001-1
**Developer:** Claude (Window 3)

**Proposed Work:**
- Migrate legacy hero section to React component
- Implement typing animation (replace Typed.js with custom hook)
- Add CTA buttons with proper accessibility
- Responsive design (mobile-first)
- Dark/light theme support
- Framer Motion animations

**Dependencies:** None (can work in parallel)
**Conflicts:** None (different files than UPR-001)

**Files to Modify/Create:**
- `src/components/sections/HeroSection.tsx` (new)
- `src/hooks/useTypingAnimation.ts` (new)
- `src/app/page.tsx` (add HeroSection import)
- Legacy reference: `legacy/index.html` (read only)

---

## Parallel Development Strategy

### Session Priority Matrix

| Session | Feature | Priority | Complexity | Est. Time | Dependencies | Can Start? |
|---------|---------|----------|------------|-----------|--------------|------------|
| Window 2 | Auth Foundation (UPR-001) | HIGH | Medium | 4-6h | None | ✅ In Progress |
| Window 3 | Hero Section (HSC-001) | HIGH | Low-Medium | 3-4h | None | ✅ Ready |
| Future | Navigation (NAV-001) | HIGH | Medium | 4-6h | None | ⏳ Queued |
| Future | Portfolio Grid (PGD-001) | HIGH | Medium-High | 5-6h | None | ⏳ Queued |
| Future | Contact Form (CTF-001) | HIGH | Medium | 3-4h | Auth (optional) | ⏳ Queued |

### Conflict Avoidance

**File Conflict Prevention:**
- Window 2: Working in `prisma/`, `src/lib/auth.ts`, `src/app/api/auth/`
- Window 3: Working in `src/components/sections/`, `src/hooks/`
- No file overlap ✅

**Dependency Conflict Prevention:**
- Window 2: Adding `next-auth`, `@auth/prisma-adapter`, `@prisma/client`, `bcryptjs`
- Window 3: No new dependencies needed (using existing: `framer-motion`, `lucide-react`)
- No package.json conflict expected ✅

---

## Feature Selection Rationale for Window 3

### Why Hero Section?

**Pros:**
1. ✅ **High Priority** - First thing visitors see
2. ✅ **No Dependencies** - Can work completely independently
3. ✅ **No Conflicts** - Different files than auth work
4. ✅ **Fast Completion** - 3-4 hours estimated
5. ✅ **High Impact** - Visible user-facing feature
6. ✅ **Clear Scope** - Well-defined in legacy site

**Cons:**
- None significant

**Alternatives Considered:**
- **Navigation:** Could conflict if both sessions modify `src/app/layout.tsx`
- **Footer:** Lower priority, less visible
- **About Section:** Good alternative, but hero is higher priority

---

## Branching Strategy

### Branch Naming Convention
`feat/<feature-name>/<ticket-id>`

**Examples:**
- `feat/auth-foundation/UPR-001` (Window 2)
- `feat/hero-section/HSC-001` (Window 3)
- `feat/navigation/NAV-001` (Future)

### Merge Strategy
- **Base Branch:** `main` (current strategy)
- **PR Target:** `main`
- **Merge Method:** Squash and merge (keeps history clean)
- **Delete After Merge:** Yes

---

## Communication Protocol

### Session Updates
Each session must update `progress/manifest.json` and `progress/logs/branch-progress.md` after:
1. Branch creation
2. Significant milestones
3. Completion/PR creation
4. Any blocking issues

### Conflict Resolution
If file conflicts arise:
1. Last-merged branch wins (rebase on main)
2. Coordinate in `progress/SESSION_COORDINATION.md`
3. Add conflict notes to manifest

---

## Next Actions

### Window 2 (Auth Foundation)
- [ ] Wait for user approvals (git checkout, pnpm install)
- [ ] Run `pnpm prisma generate`
- [ ] Test build
- [ ] Create PR

### Window 3 (Hero Section) - READY TO START
- [x] Read coordination plan
- [ ] Create feature branch `feat/hero-section/HSC-001`
- [ ] Read legacy hero section HTML
- [ ] Implement HeroSection component
- [ ] Create typing animation hook
- [ ] Test responsive design
- [ ] Create PR

---

## Success Metrics

### Definition of Done (for each feature)
- ✅ Code implemented according to feature plan
- ✅ TypeScript types defined (no `any`)
- ✅ Responsive design tested (mobile, tablet, desktop)
- ✅ Dark/light theme support verified
- ✅ Accessibility requirements met (WCAG AAA)
- ✅ Build passes (`pnpm build`)
- ✅ Linting passes (`pnpm lint`)
- ✅ PR created with proper template
- ✅ Artifacts generated (diff, build log, screenshot)

---

**Coordination Owner:** Autonomous Sessions System
**Last Review:** 2025-10-26T00:45:00Z
