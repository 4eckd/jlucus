# 🎨 Design Tokens - Quick Reference Card

**Print this or bookmark it** — Copy/paste these patterns for quick component creation.

---

## SEMANTIC COLOR NAMES (Use These!)

```
Interactive Elements:  bg-interactive, text-interactive
Emphasis/Accent:       bg-emphasis, text-emphasis
Status:                text-success, text-warning, text-error, text-info

Backgrounds (Depth):   bg-bg-base, bg-bg-primary, bg-bg-secondary, bg-bg-tertiary
Text (Contrast):       text-text-primary, text-text-secondary, text-text-tertiary, text-text-muted

Borders:               border-border-primary, border-border-secondary
Components:            bg-button-bg, bg-card-bg, bg-input-bg
```

---

## 5-MINUTE COMPONENT TEMPLATES

### Button

```tsx
<button className="px-4 py-2 bg-interactive text-button-text rounded-md font-semibold transition-colors hover:opacity-90 focus-visible:outline-2">
  Click Me
</button>
```

### Card

```tsx
<div className="bg-card-bg border border-border-secondary rounded-lg p-md shadow-sm hover:shadow-md transition-shadow">
  Card content
</div>
```

### Input

```tsx
<input
  className="bg-input-bg text-input-text px-3 py-2 rounded-md border border-border-secondary transition-colors focus:border-border-primary focus-visible:outline-2"
  placeholder="Type something..."
/>
```

### Badge

```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-badge-bg text-badge-text">
  Label
</span>
```

### Link

```tsx
<a className="text-link-color hover:text-link-hover-color transition-colors focus-visible:outline-2">
  Click here
</a>
```

---

## SPACING SCALE

```
xs:   4px    (--space-xs)
sm:   8px    (--space-sm)
md:   16px   (--space-md)  ← Most common
lg:   24px   (--space-lg)
xl:   32px   (--space-xl)
2xl:  48px   (--space-2xl)
3xl:  64px   (--space-3xl)
```

**Usage**: `p-md`, `m-lg`, `gap-sm`, `mt-xl`

---

## BORDER RADIUS

```
sm:      0.25rem
md:      0.5rem   ← Default
lg:      0.75rem
xl:      1rem
2xl:     1.5rem
full:    9999px
```

**Usage**: `rounded-md`, `rounded-xl`, `rounded-full`

---

## TRANSITIONS

```
fast:   150ms     ← Snappy (hover effects)
base:   300ms     ← Default (most uses)
slow:   500ms     ← Smooth (page transitions)
```

**Usage**: `transition-all duration-base`

---

## ANIMATIONS (GPU-Safe Only)

```
animate-float        ← Subtle up/down movement
animate-pulse-glow   ← Glow effect with opacity
animate-typing       ← Text typing effect
animate-blink        ← Cursor blink
```

**Usage**: `animate-float`, `group-hover:animate-pulse-glow`

---

## COMMON PATTERNS

### Hover Effect with Scale

```tsx
className="hover:scale-105 transition-transform"
```

### Focus Ring

```tsx
className="focus-visible:outline-2 focus-visible:outline-offset-2"
```

### Disabled State

```tsx
className="disabled:opacity-disabled disabled:cursor-not-allowed"
```

### Hover with Color Change

```tsx
className="text-text-secondary hover:text-emphasis transition-colors"
```

### Interactive Button

```tsx
className="bg-interactive text-button-text hover:opacity-90 focus-visible:outline-2 transition-opacity active:scale-95"
```

### Card with Hover Effect

```tsx
className="bg-card-bg rounded-lg border border-border-secondary p-md transition-all hover:shadow-lg hover:border-border-primary"
```

---

## IMPORT STATEMENTS

```tsx
// Utilities
import { cn, COMPONENT_PRESETS, SEMANTIC_TOKENS } from '@/lib/design-tokens'

// Always include cn() for safe class composition
import { cn } from '@/lib/utils'
```

---

## WHEN TO USE EACH TOOL

| Tool | When | Example |
|------|------|---------|
| Tailwind class | Most of the time | `className="bg-interactive p-md"` |
| `COMPONENT_PRESETS` | Buttons, cards, inputs | `className={COMPONENT_PRESETS.card}` |
| `cn()` | Combining multiple classes | `cn(baseClass, conditional && 'extra')` |
| `SEMANTIC_TOKENS` | Object reference | `Object.keys(SEMANTIC_TOKENS)` |
| Inline style | Almost never | Only dynamic values that can't be CSS |

---

## FORBIDDEN

```
❌ style={{ backgroundColor: `rgb(var(...))` }}
❌ className="bg-[#0a0a0f]"
❌ onMouseEnter={(e) => e.currentTarget.style.color = '...'}
❌ <motion.div initial={{ opacity: 0 }}>Static text</motion.div>
❌ --color-primary  (use --color-interactive instead)
```

---

## COPY-PASTE COMPONENT TEMPLATE

```tsx
import { cn, COMPONENT_PRESETS } from '@/lib/design-tokens'

interface Props {
  // ...
}

export function MyComponent({ ...props }: Props) {
  return (
    <div
      className={cn(
        COMPONENT_PRESETS.card,
        'hover:shadow-lg transition-shadow',
        // Add more classes as needed
      )}
    >
      <h3 className="text-text-primary font-semibold">Title</h3>
      <p className="text-text-secondary text-sm">Description</p>
      
      <button className={cn(
        COMPONENT_PRESETS.button,
        COMPONENT_PRESETS.buttonPrimary
      )}>
        Click
      </button>
    </div>
  )
}
```

---

## TESTING CHECKLIST

- [ ] No inline `style=` attributes
- [ ] No hardcoded colors (#xxx or rgb)
- [ ] No `--color-primary` (use semantic name)
- [ ] All interactive elements have `focus-visible:`
- [ ] Hover states use CSS, not JavaScript
- [ ] No unnecessary `<motion.div>` on static UI
- [ ] Classes use Tailwind + CSS variables only

---

## PRE-COMMIT CHECK

```bash
# Run this before committing
grep -r "style={{" src/components  # Should be empty
grep -r "bg-\[#" src/components    # Should be empty
grep -r "#[0-9A-Fa-f]\{6\}" src/components  # Comments only
```

---

## DEBUGGING

**"Why isn't my hover effect working?"**
→ Make sure you're using Tailwind `hover:` class, not onMouseEnter

**"Colors look wrong"**
→ Check you're using semantic token (e.g., `text-interactive`, not `text-primary`)

**"Animation is jittery"**
→ Use `transform` and `opacity` only (not `height`, `width`, `color`)

**"Component isn't accessible"**
→ Add `focus-visible:outline-2 focus-visible:outline-offset-2` to interactive elements

---

## 🚀 QUICK START

1. Import utilities: `import { cn, COMPONENT_PRESETS } from '@/lib/design-tokens'`
2. Use Tailwind classes: `className="bg-interactive p-md rounded-lg"`
3. Add presets: `className={cn(COMPONENT_PRESETS.card, 'extra-class')}`
4. Add hover/focus: `hover:opacity-90 focus-visible:outline-2`
5. Use `cn()` for conditionals: `cn(baseClass, isActive && 'highlight')`

**That's it!** You're now using the design system correctly.

---

**Questions?** → See `/REFACTORING_GUIDE.md` for examples
**Audit details?** → See `/DESIGN_SYSTEM_AUDIT.md` for full analysis
