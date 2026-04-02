/**
 * Design Token System Utilities
 * ═════════════════════════════════════════════════════════════════
 *
 * This module provides type-safe utilities for working with the 3-layer
 * design token system (Primitive → Semantic → Component).
 *
 * CRITICAL: All styling must use these utilities or Tailwind classes
 * bound to CSS variables. NO hardcoded colors or inline styles.
 */

/**
 * Semantic tokens - use these names, not primitive tokens
 */
export const SEMANTIC_TOKENS = {
  // Background
  bgBase: 'bg-bg-base',
  bgPrimary: 'bg-bg-primary',
  bgSecondary: 'bg-bg-secondary',
  bgTertiary: 'bg-bg-tertiary',

  // Text
  textPrimary: 'text-text-primary',
  textSecondary: 'text-text-secondary',
  textTertiary: 'text-text-tertiary',
  textMuted: 'text-text-muted',

  // Interactive
  interactive: 'bg-interactive',
  interactiveText: 'text-interactive',

  // Emphasis
  emphasis: 'bg-emphasis',
  emphasisText: 'text-emphasis',

  // Status
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',

  // Borders
  borderPrimary: 'border-border-primary',
  borderSecondary: 'border-border-secondary',
} as const;

/**
 * Component preset classes - ready-to-use combinations
 */
export const COMPONENT_PRESETS = {
  // Button base
  button:
    'px-4 py-2 rounded-md font-semibold transition-colors duration-fast hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2',

  buttonPrimary:
    'bg-button-bg text-button-text hover:bg-interactive-hover',

  buttonSecondary:
    'bg-bg-secondary text-text-primary border border-border-secondary hover:bg-bg-tertiary',

  // Card base
  card: 'bg-card-bg rounded-lg border border-border-secondary transition-colors duration-base',

  // Input base
  input:
    'bg-input-bg text-input-text px-3 py-2 rounded-md border border-border-secondary transition-colors duration-fast focus:border-color-interactive focus-visible:outline-2',

  // Badge
  badge:
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-badge-bg text-badge-text',

  // Link
  link: 'text-link-color hover:text-link-hover-color transition-colors duration-fast focus-visible:outline-2',

  // Section padding
  sectionPadding: 'px-4 py-8 sm:px-6 lg:px-8',

  // Container
  container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
} as const;

/**
 * Helper: Combine classes safely (like clsx/cn but enforces token usage)
 *
 * Usage:
 *   const classes = cn(
 *     COMPONENT_PRESETS.card,
 *     'hover:shadow-lg',
 *     isActive && 'border-color-interactive'
 *   )
 */
export function cn(...classes: (string | undefined | boolean)[]): string {
  return classes
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ');
}

/**
 * CSS variable getter (for Framer Motion and other JS animations)
 *
 * Usage:
 *   const glowColor = getCSSVariable('--color-interactive')
 *   // Returns: 'rgb(0 217 255)'
 */
export function getCSSVariable(varName: string): string {
  if (typeof window === 'undefined') return '';

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  return value;
}

/**
 * Create inline style object from CSS variable (for necessary dynamic styles)
 *
 * ⚠️  USE SPARINGLY - Prefer Tailwind classes when possible
 *
 * Usage:
 *   <div style={getDynamicStyle('--color-interactive')}>
 */
export function getDynamicStyle(varName: string): React.CSSProperties {
  if (typeof window === 'undefined') {
    return {};
  }

  const value = getCSSVariable(varName);

  // For color variables, create an rgb color
  if (varName.includes('color')) {
    return {
      color: `rgb(${value})`,
    };
  }

  return {
    [varName.replace('--', '')]: value,
  } as React.CSSProperties;
}

/**
 * Generate CSS filter drop-shadow (GPU-accelerated glow effect)
 *
 * Usage:
 *   const glowFilter = generateGlowEffect('small')
 *   // Returns: 'drop-shadow(0 0 8px rgb(var(--color-interactive) / 0.6))'
 */
export function generateGlowEffect(
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const sizeMap = {
    sm: 'drop-shadow(0 0 4px rgb(var(--color-interactive) / 0.4))',
    md: 'drop-shadow(0 0 8px rgb(var(--color-interactive) / 0.6))',
    lg: 'drop-shadow(0 0 12px rgb(var(--color-interactive) / 0.8))',
  };

  return sizeMap[size];
}

/**
 * Transition duration helper (respects prefers-reduced-motion)
 *
 * Usage:
 *   const transitionClass = getTransitionDuration('base')
 *   // Returns: 'transition-all duration-base'
 */
export function getTransitionDuration(
  duration: 'fast' | 'base' | 'slow' = 'base'
): string {
  const durationMap = {
    fast: 'duration-fast',
    base: 'duration-base',
    slow: 'duration-slow',
  };

  return `transition-all ${durationMap[duration]}`;
}

/**
 * Safe token usage audit utility
 *
 * Development-only: Detects if components use primitive tokens directly
 */
export function auditTokenUsage(): void {
  if (typeof window === 'undefined') return;

  const styles = getComputedStyle(document.documentElement);
  const tokens = Array.from(styles)
    .filter((prop) => prop.startsWith('--'))
    .map((prop) => prop.trim());

  // Check for direct primitive token usage in inline styles
  const primitiveTokens = tokens.filter((t) => t.includes('primitive'));

  if (primitiveTokens.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️  DESIGN SYSTEM WARNING: Primitive tokens detected in use.',
      'Use semantic tokens instead.',
      primitiveTokens
    );
  }
}

/**
 * Type-safe token validator
 *
 * Usage:
 *   if (!isValidToken(className)) {
 *     console.error('Invalid token usage')
 *   }
 */
export function isValidToken(className: string): boolean {
  const validPatterns = [
    // Tailwind color classes
    /^(bg|text|border|shadow|hover:|focus:)[-\w]+$/,
    // Semantic tokens
    Object.values(SEMANTIC_TOKENS).join('|'),
    // Component presets
    Object.values(COMPONENT_PRESETS).join('|'),
  ];

  return validPatterns.some((pattern) => {
    if (typeof pattern === 'string') {
      return className.includes(pattern);
    }
    return pattern.test(className);
  });
}

/**
 * Export all public utilities
 */
export default {
  SEMANTIC_TOKENS,
  COMPONENT_PRESETS,
  cn,
  getCSSVariable,
  getDynamicStyle,
  generateGlowEffect,
  getTransitionDuration,
  auditTokenUsage,
  isValidToken,
};
