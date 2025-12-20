# Hard-Coded CSS Audit Report

**Date:** 2025-12-18
**Status:** CRITICAL - Multiple violations found
**Priority:** HIGH - Must be fixed before production

---

## Executive Summary

Found **15+ instances** of hard-coded CSS values across **2 files** that violate the project's CSS Variables Philosophy. The primary violator is `animated-grid.tsx` with canvas rendering using hard-coded RGBA colors instead of CSS variables.

## Critical Violations

### 🔴 SEVERITY: HIGH - Hard-Coded Colors

| File | Line | Current Value | Should Use |
|------|------|---------------|------------|
| `animated-grid.tsx` | 34 | `rgba(0, 217, 255, 0.05)` | `--color-primary` with alpha |
| `animated-grid.tsx` | 55 | `rgba(0, 217, 255, ${...})` | `--color-primary` with alpha |
| `animated-grid.tsx` | 70 | `rgba(0, 217, 255, 0.2)` | `--color-primary` with alpha |
| `animated-grid.tsx` | 71 | `rgba(255, 0, 110, 0.2)` | `--color-accent` with alpha |
| `animated-grid.tsx` | 72 | `rgba(204, 255, 0, 0.2)` | `--color-secondary` with alpha |

**Impact:** 5 color violations directly contradict the design system's single source of truth principle.

### 🟡 SEVERITY: MEDIUM - Hard-Coded Numeric Values

| File | Line | Current Value | Description | Should Use |
|------|------|---------------|-------------|------------|
| `animated-grid.tsx` | 25 | `40` | Grid size | `--grid-size` (already exists!) |
| `animated-grid.tsx` | 35 | `1` | Line width | New CSS variable |
| `animated-grid.tsx` | 54 | `2`, `1` | Pulse size/amplitude | Named constants |
| `animated-grid.tsx` | 60 | `80` | Grid modulo | Calculate from gridSize |
| `animated-grid.tsx` | 76 | `0.05`, `100` | Animation speed/spacing | Named constants |
| `animated-grid.tsx` | 77 | `200`, `1000` | Animation amplitude/offset | Named constants |
| `animated-grid.tsx` | 81 | `3` | Arc radius | Named constant |

**Impact:** 10+ magic numbers scattered throughout animation logic.

### 🟢 SEVERITY: LOW - Inline Styles

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `animated-grid.tsx` | 107 | `style={{ pointerEvents: 'none' }}` | Use `className="pointer-events-none"` |
| `skill-tree.tsx` | 67-69 | Inline `clipPath` calculation | Acceptable (dynamic calculation) |
| `skill-tree.tsx` | 98 | Inline `width` style | Acceptable (dynamic calculation) |

### 🐛 BUG FOUND

**File:** `contact-section.tsx`
**Line:** 230
**Issue:** `className="text-smtext-success"` - missing space!
**Fix:** Should be `className="text-sm text-success"`

---

## Detailed Breakdown by File

### 1. `src/components/sections/animated-grid.tsx`

**Total Violations:** 15

#### Hard-Coded Colors (Lines 34, 55, 70-72)
```typescript
// ❌ WRONG - Current implementation
ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
const streamColors = [
  'rgba(0, 217, 255, 0.2)',  // Primary cyan
  'rgba(255, 0, 110, 0.2)',  // Accent magenta
  'rgba(204, 255, 0, 0.2)',  // Secondary lime
];

// ✅ CORRECT - Should use CSS variables
const primaryColor = getCSSVariable('--color-primary'); // Returns "0 217 255"
ctx.strokeStyle = `rgba(${primaryColor}, 0.05)`;
const streamColors = [
  `rgba(${getCSSVariable('--color-primary')}, 0.2)`,
  `rgba(${getCSSVariable('--color-accent')}, 0.2)`,
  `rgba(${getCSSVariable('--color-secondary')}, 0.2)`,
];
```

#### Hard-Coded Grid Size (Line 25)
```typescript
// ❌ WRONG
const gridSize = 40;

// ✅ CORRECT - Variable already exists in globals.css!
const gridSize = parseInt(getCSSVariable('--grid-size')) || 40;
```

#### Magic Numbers Throughout Animation
```typescript
// ❌ WRONG - Lines 54, 60, 76, 77, 81
const pulseSize = 2 + Math.sin(time * 0.001) * 1;
if ((x + y) % 80 === 0)
const x = ((time * 0.05 + i * 100) % canvas.width);

// ✅ CORRECT - Extract to constants
const ANIMATION_CONFIG = {
  pulse: { base: 2, amplitude: 1 },
  grid: { modulo: 80 }, // Or calculate: gridSize * 2
  stream: { speed: 0.05, spacing: 100 },
  arc: { radius: 3 },
  animation: { amplitude: 200, offset: 1000 }
};
```

### 2. `src/components/sections/skill-tree.tsx`

**Total Violations:** 0 (dynamic styles are acceptable)

The inline styles found are **dynamically calculated** based on props/state:
- Line 67-69: `clipPath` polygon calculated from `levelProgress`
- Line 98: `width` calculated from `levelProgress`

**Verdict:** ✅ ACCEPTABLE - These are runtime calculations, not hard-coded values.

### 3. `src/components/sections/contact-section.tsx`

**Total Violations:** 1 (typo)

**Line 230:**
```typescript
// ❌ WRONG
className="text-smtext-success flex items-center gap-2"

// ✅ CORRECT
className="text-sm text-success flex items-center gap-2"
```

---

## Recommended Fixes

### Priority 1: Create Utility Function

Create `src/lib/css-variables.ts`:
```typescript
/**
 * Gets a CSS variable value from the root element
 * @param variable - CSS variable name (with or without --)
 * @returns The variable value as a string
 */
export function getCSSVariable(variable: string): string {
  const varName = variable.startsWith('--') ? variable : `--${variable}`;
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

/**
 * Gets a CSS variable as RGB values for canvas rendering
 * @param variable - CSS variable name (e.g., 'color-primary')
 * @returns RGB string like "0 217 255"
 */
export function getCSSColor(variable: string): string {
  return getCSSVariable(`--color-${variable}`);
}
```

### Priority 2: Fix animated-grid.tsx

1. Import utility function
2. Replace all hard-coded colors with `getCSSColor()`
3. Extract magic numbers to `ANIMATION_CONFIG` constant
4. Use `--grid-size` CSS variable
5. Replace inline `style` with `className`

### Priority 3: Fix contact-section.tsx

Simple typo fix - add space between `text-sm` and `text-success`.

### Priority 4: Add Animation Constants

Either:
- **Option A:** Add to `src/lib/constants.ts`
- **Option B:** Create `src/lib/animation-config.ts`
- **Option C:** Add as CSS variables in `globals.css`

**Recommendation:** Option A for JavaScript-only values, Option C for values that might be used in both CSS and JS.

---

## CSS Variables Already Available

From `src/app/globals.css`, these variables are **already defined** and should be used:

### Colors (RGB format for alpha support)
```css
--color-primary: 0 217 255;        /* Electric Cyan #00D9FF */
--color-accent: 255 0 110;         /* Neon Magenta #FF006E */
--color-secondary: 204 255 0;      /* Electric Lime #CCFF00 */
--color-success: 0 255 159;        /* #00FF9F */
--color-warning: 255 184 0;        /* #FFB800 */
--color-error: 255 71 87;          /* #FF4757 */
```

### Grid
```css
--grid-size: 40px;                 /* ALREADY EXISTS! */
```

### Spacing
```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 3rem;
--spacing-3xl: 4rem;
```

---

## Impact Analysis

### Why This Matters

1. **Design System Integrity:** Hard-coded colors break the single source of truth principle
2. **Theme Support:** Future dark mode or theme switcher will miss canvas elements
3. **Maintainability:** Changing brand colors requires editing multiple files instead of just CSS
4. **Consistency:** Canvas elements may drift out of sync with rest of UI

### Current Risk Level

- **Production Ready:** ❌ NO
- **Risk Level:** 🔴 HIGH
- **Blockers:** 5 critical color violations, 10+ magic numbers

### After Fix

- **Production Ready:** ✅ YES
- **Risk Level:** 🟢 LOW
- **Benefits:** Consistent theming, easier maintenance, future-proof

---

## Action Items

- [ ] Create `src/lib/css-variables.ts` utility
- [ ] Refactor `animated-grid.tsx` to use CSS variables for colors
- [ ] Extract animation magic numbers to constants
- [ ] Fix typo in `contact-section.tsx` line 230
- [ ] Add unit tests for CSS variable utility
- [ ] Document canvas CSS variable usage pattern
- [ ] Consider adding ESLint rule to prevent hard-coded colors

---

## Testing Checklist

After fixes:
- [ ] Verify grid animation renders correctly
- [ ] Confirm colors match design system
- [ ] Test canvas performance (should be unchanged)
- [ ] Verify responsive behavior
- [ ] Check color consistency with theme
- [ ] Run build and verify no errors
- [ ] Visual regression test

---

**Report Generated:** 2025-12-18
**Audited By:** Claude Code Styling Assistant
**Next Review:** After fixes are implemented
