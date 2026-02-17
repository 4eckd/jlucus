# ADR 001: Component Architecture Organization

**Status**: Accepted **Date**: 2026-02-16 **Decision Makers**: @4eckd (jlucus) **Related Issue**:
[#17 - Component architecture (sections, layout, ui)](https://github.com/4eckd/jlucus/issues/17)

## Context

The jlucus.dev portfolio needs a clear, maintainable component architecture that:

1. Supports the Terminal Neon design system
2. Scales with future feature additions
3. Maintains clear separation of concerns
4. Enables efficient code reuse
5. Follows Next.js 15 best practices with App Router

The codebase inherited some legacy boilerplate components (Lobe UI templates) and early migration
artifacts that needed to be organized or removed.

## Decision

We have established a **feature-based component architecture** with the following directory
structure:

```
src/components/
├── effects/      # Visual effects (cursor, scanlines)
├── layout/       # Page structure (header, footer, navigation)
├── providers/    # React context providers (theme)
├── sections/     # Full-width page sections (hero, portfolio, contact)
└── ui/          # Reusable UI primitives (button, command-palette)
```

### Key Principles

1. **Category-Based Organization**: Components are organized by their functional category, not by
   technical implementation details.

2. **Barrel Exports**: Each directory has an `index.ts` file that exports all components, enabling
   cleaner imports:

   ```tsx
   // Instead of
   import { Header } from '@/components/layout/header';

   // We can use
   import { Header } from '@/components/layout';
   ```

3. **Client vs Server Components**:
   - Interactive components use `'use client'` directive explicitly
   - Static components remain server components by default
   - Clear separation documented in component files

4. **Section Components**: Full-width sections that compose into pages:
   - Self-contained with their own data dependencies
   - Follow consistent container/wrapper patterns
   - Use Terminal Neon design tokens

5. **UI Primitives**: Reusable, atomic components:
   - Implement design system tokens
   - Support polymorphism (e.g., Button with `asChild`)
   - Highly composable

6. **Legacy Component Handling**:
   - Deprecated components clearly marked in documentation
   - Unused boilerplate components identified for removal
   - Migration path documented

## Rationale

### Why Feature-Based over Technical Organization?

**Rejected Alternative**: Technical organization (atoms/molecules/organisms)

```
components/
├── atoms/
├── molecules/
└── organisms/
```

**Reasons for Rejection**:

- Atomic Design terminology is subjective (what's a molecule vs organism?)
- Doesn't scale well with domain complexity
- Harder to locate components ("Is Header an organism or molecule?")
- Mixes UI primitives with page-specific sections

**Chosen Approach Benefits**:

- Clear mental model: "Where's the footer?" → "In layout/"
- Scales with feature additions: New section → Add to sections/
- Easier onboarding: Directory names are self-documenting
- Aligns with Next.js conventions

### Why Barrel Exports?

**Benefits**:

- Cleaner import statements
- Better IDE autocomplete
- Easier refactoring (change internal file names without updating imports)
- Clear public API for each component category

**Trade-offs**:

- Slightly larger bundle in dev mode (tree-shaking handles production)
- One more file to maintain per directory
- Potential circular dependency risks (mitigated by linting)

### Why Keep Legacy Components?

Some deprecated components (e.g., `HeroSection.tsx`) are kept because:

1. They document migration history
2. They may have useful patterns to reference
3. Safe removal requires comprehensive testing

They are:

- Clearly marked as `[DEPRECATED]` in documentation
- Not exported via barrel files (except for backward compatibility)
- Scheduled for removal in Phase 2

## Consequences

### Positive

1. **Improved Developer Experience**:
   - Easy to locate components
   - Clear import patterns
   - Better IDE support

2. **Maintainability**:
   - Clear ownership and categorization
   - Easy to add new components
   - Documented patterns and conventions

3. **Scalability**:
   - Architecture supports growing feature set
   - Clear place for new component categories
   - Doesn't require reorganization as project grows

4. **Code Quality**:
   - Encourages reusability (UI primitives)
   - Separation of concerns (sections are self-contained)
   - Consistent styling via design tokens

### Negative

1. **Migration Effort**: Existing imports need updating to use barrel exports (optional, gradual)

2. **Learning Curve**: New contributors need to understand the organization (mitigated by
   documentation)

3. **Bundle Size**: Barrel exports can increase bundle size in dev mode (not an issue in production)

### Neutral

1. **Multiple Files**: More index.ts files to maintain
2. **Convention Enforcement**: Requires discipline to maintain organization

## Implementation

### Phase 1: Documentation (Complete)

- ✅ Create comprehensive architecture documentation
- ✅ Document all existing components
- ✅ Identify legacy/unused components
- ✅ Create this ADR

### Phase 2: Barrel Exports (Complete)

- ✅ Add `index.ts` to all component directories
- ✅ Export all active components
- ✅ Mark deprecated components
- ✅ Create root-level barrel export

### Phase 3: Legacy Cleanup (Planned)

- [ ] Verify unused components are truly unused
- [ ] Move deprecated components to `/legacy` directory or remove
- [ ] Update any remaining direct imports to use barrel exports
- [ ] Add ESLint rules to enforce barrel import usage

### Phase 4: Testing & Validation (Planned)

- [ ] Add component unit tests
- [ ] Verify tree-shaking works correctly
- [ ] Document testing patterns per component type
- [ ] Add Storybook for component documentation

## Compliance

This architecture decision aligns with:

- **Next.js Best Practices**: Server vs Client component separation
- **React Best Practices**: Component composition, single responsibility
- **TypeScript Best Practices**: Strong typing, barrel exports
- **Terminal Neon Design System**: CSS variable usage, consistent theming

## Monitoring

We will evaluate this decision's success by:

1. **Developer Velocity**: Time to add new components
2. **Code Quality**: Component reusability metrics
3. **Bundle Size**: Production bundle analysis
4. **Developer Feedback**: Team input on organization clarity

**Review Date**: Before Phase 2 launch (estimate: Q2 2026)

## References

- [Component Architecture Documentation](../COMPONENT_ARCHITECTURE.md)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Issue #17: Component architecture](https://github.com/4eckd/jlucus/issues/17)
- [Issue #6: Phase 1 - Foundation](https://github.com/4eckd/jlucus/issues/6)

## Notes

This ADR establishes the foundation for all future component development. Any deviations from this
structure should be documented in a new ADR with clear justification.

---

**Author**: jlucus (@4eckd) **Reviewers**: TBD **Supersedes**: N/A (first ADR) **Superseded by**:
N/A
