/**
 * Utility functions for accessing CSS variables from JavaScript
 * Used primarily for canvas rendering and dynamic animations
 */

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
 * Gets a CSS color variable as RGB values for use in rgba()
 * @param colorName - Color variable name without prefix (e.g., 'primary', 'accent')
 * @returns RGB string like "0 217 255"
 * @example
 * ```ts
 * const primary = getCSSColor('primary'); // "0 217 255"
 * ctx.fillStyle = `rgba(${primary}, 0.5)`;
 * ```
 */
export function getCSSColor(colorName: string): string {
  return getCSSVariable(`--color-${colorName}`);
}

/**
 * Gets a CSS spacing variable value as a number (in pixels)
 * @param size - Spacing size name (xs, sm, md, lg, xl, 2xl, 3xl)
 * @returns The spacing value in pixels
 * @example
 * ```ts
 * const spacing = getCSSSpacing('md'); // 16
 * ```
 */
export function getCSSSpacing(size: string): number {
  const value = getCSSVariable(`--spacing-${size}`);
  return parseFloat(value) * 16; // Convert rem to px (assuming 16px base)
}

/**
 * Gets a numeric CSS variable value
 * @param variable - CSS variable name (with or without --)
 * @returns The numeric value, or 0 if not a number
 */
export function getCSSNumber(variable: string): number {
  const value = getCSSVariable(variable);
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}
