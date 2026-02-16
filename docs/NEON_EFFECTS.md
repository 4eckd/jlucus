# Neon Glow Effects System

A comprehensive system of neon glow effects for the Terminal Neon themed portfolio. All effects are built using CSS variables and are fully customizable.

## Table of Contents

- [Color Palette](#color-palette)
- [Shadow Effects](#shadow-effects)
- [Text Effects](#text-effects)
- [Border Effects](#border-effects)
- [Background Glows](#background-glows)
- [Animations](#animations)
- [Utility Classes](#utility-classes)
- [Usage Examples](#usage-examples)

## Color Palette

The neon effects system supports all theme colors:

- **Primary** (Electric Cyan `#00D9FF`) - Main brand color
- **Accent** (Neon Magenta `#FF006E`) - Eye-catching accent
- **Secondary** (Electric Lime `#CCFF00`) - Alternative highlight
- **Success** (`#00FF9F`) - Positive actions
- **Warning** (`#FFB800`) - Caution states
- **Error** (`#FF4757`) - Error states
- **Info** (`#00BFFF`) - Informational states

## Shadow Effects

### Box Shadows (Glow)

Each color has 4 intensity levels:

```css
/* Small glow - subtle effect */
shadow-neon-{color}-sm

/* Default glow - standard effect */
shadow-neon-{color}

/* Large glow - prominent effect */
shadow-neon-{color}-lg

/* Extra large glow - dramatic effect */
shadow-neon-{color}-xl
```

**Available colors:** `primary`, `accent`, `secondary`, `success`, `warning`, `error`, `info`

### Examples

```jsx
// Small primary glow
<div className="shadow-neon-primary-sm">Content</div>

// Large accent glow
<div className="shadow-neon-accent-lg">Content</div>

// Extra large error glow
<div className="shadow-neon-error-xl">Content</div>
```

## Text Effects

Apply neon glow to text:

```jsx
<h1 className="text-neon">Electric Cyan Text</h1>
<h2 className="text-neon-accent">Neon Magenta Text</h2>
<h3 className="text-neon-secondary">Electric Lime Text</h3>
<p className="text-neon-success">Success Text</p>
<p className="text-neon-warning">Warning Text</p>
<p className="text-neon-error">Error Text</p>
<p className="text-neon-info">Info Text</p>
```

## Border Effects

Neon glowing borders with inner and outer glow:

```jsx
<div className="border-2 border-neon-primary">
  Primary neon border
</div>

<div className="border-2 border-neon-accent">
  Accent neon border
</div>

<div className="border-2 border-neon-secondary">
  Secondary neon border
</div>
```

## Background Glows

Radial gradient backgrounds with neon glow:

```jsx
<div className="bg-neon-glow-primary">
  Primary background glow
</div>

<div className="bg-neon-glow-accent">
  Accent background glow
</div>

<div className="bg-neon-glow-secondary">
  Secondary background glow
</div>
```

## Animations

### Available Animations

#### 1. Pulse Neon
Smooth pulsing glow effect (2s duration):

```jsx
<div className="shadow-neon-primary animate-pulse-neon">
  Pulsing glow
</div>
```

#### 2. Flicker Neon
Realistic neon flicker effect like old neon signs (3s duration):

```jsx
<span className="text-neon animate-flicker-neon">
  Flickering text
</span>
```

#### 3. Breathe Neon
Slow intensity breathing effect (4s duration):

```jsx
<div className="shadow-neon-primary animate-breathe-neon">
  Breathing glow
</div>
```

#### 4. Glow Surge
Quick intensity surge effect (2s duration):

```jsx
<button className="shadow-neon-accent-sm animate-glow-surge">
  Surging button
</button>
```

#### 5. Border Pulse Neon
Pulsing border with glow (2s duration):

```jsx
<div className="border-2 border-primary/30 animate-border-pulse-neon">
  Pulsing border
</div>
```

## Utility Classes

### Hover Effects

Apply neon glow on hover:

```jsx
<button className="shadow-neon-primary-hover hover:shadow-neon-primary">
  Hover for glow
</button>

<a className="shadow-neon-accent-hover hover:shadow-neon-accent">
  Link with hover glow
</a>
```

### Terminal Box

Pre-configured terminal style with neon border:

```jsx
<div className="terminal-box">
  Terminal window content
</div>
```

Includes:
- Dark translucent background
- Neon cyan border
- Subtle glow effect
- Backdrop blur

## Usage Examples

### Neon Button

```jsx
<button className="
  px-6 py-3
  bg-primary text-dark-950
  border-2 border-primary
  rounded-lg
  shadow-neon-primary
  hover:shadow-neon-primary-lg
  transition-all duration-300
  animate-breathe-neon
">
  Click Me
</button>
```

### Neon Card

```jsx
<div className="
  p-6
  bg-dark-800
  border-2 border-primary/20
  rounded-lg
  shadow-neon-primary-sm
  hover:shadow-neon-primary-lg
  hover:border-primary/50
  transition-all duration-300
">
  <h3 className="text-neon mb-4">Card Title</h3>
  <p className="text-secondary">Card content goes here</p>
</div>
```

### Flickering Neon Sign

```jsx
<h1 className="
  text-6xl
  font-mono
  text-neon
  animate-flicker-neon
">
  OPEN
</h1>
```

### Alert Box with Neon

```jsx
{/* Success Alert */}
<div className="
  p-4
  bg-dark-800
  border-2 border-success/30
  rounded-lg
  shadow-neon-success
">
  <p className="text-neon-success">Operation successful!</p>
</div>

{/* Error Alert */}
<div className="
  p-4
  bg-dark-800
  border-2 border-error/30
  rounded-lg
  shadow-neon-error
  animate-pulse-neon
">
  <p className="text-neon-error">Error occurred!</p>
</div>

{/* Warning Alert */}
<div className="
  p-4
  bg-dark-800
  border-2 border-warning/30
  rounded-lg
  shadow-neon-warning
">
  <p className="text-neon-warning">Warning: Check your input!</p>
</div>
```

### Loading Indicator

```jsx
<div className="
  w-16 h-16
  border-4 border-primary/20
  border-t-primary
  rounded-full
  shadow-neon-primary
  animate-spin
">
</div>
```

### Interactive Input Field

```jsx
<input
  type="text"
  className="
    w-full
    px-4 py-3
    bg-dark-800
    border-2 border-primary/20
    rounded-lg
    text-primary
    focus:outline-none
    focus:border-primary
    focus:shadow-neon-primary-sm
    transition-all duration-300
  "
  placeholder="Enter text..."
/>
```

## Performance Considerations

1. **Use appropriate intensity**: Small glows for frequent elements, large glows for focal points
2. **Limit animations**: Too many animated elements can impact performance
3. **Combine effects wisely**: Multiple layered neon effects can be GPU-intensive
4. **Respect motion preferences**: Animations respect `prefers-reduced-motion`

## Accessibility

All neon effects maintain WCAG AA contrast ratios:
- Text glows don't reduce readability
- Border glows don't obscure content
- Animations can be disabled via user preferences

## Browser Support

Neon effects use standard CSS features:
- Box shadows: All modern browsers
- Text shadows: All modern browsers
- Animations: All modern browsers
- Backdrop filters: Modern browsers (Safari 9+, Chrome 76+, Firefox 103+)

## Customization

All neon effects are built on CSS variables defined in `src/styles/globals.css`. To customize:

```css
:root {
  /* Adjust base colors */
  --color-primary: 0 217 255;  /* Electric Cyan */

  /* Adjust shadow intensities */
  --shadow-neon-primary: 0 0 5px rgb(var(--color-primary)), 0 0 20px rgb(var(--color-primary));

  /* Adjust animation durations */
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Tips and Best Practices

1. **Consistency**: Use the same color family for related elements
2. **Hierarchy**: Larger glows for more important elements
3. **Subtlety**: Start with smaller glows and increase only when needed
4. **Context**: Match glow colors to semantic meaning (success = green, error = red)
5. **Hover states**: Add subtle glow increases on hover for interactivity
6. **Animations**: Use sparingly for key elements (CTAs, notifications)
7. **Combine**: Layer different neon effects (text + border + shadow) for impact

## Related Files

- `src/styles/globals.css` - CSS variable definitions and base styles
- `tailwind.config.ts` - Tailwind theme configuration
- `CLAUDE.md` - Project documentation

---

Built with for the Terminal Neon theme by jlucus
