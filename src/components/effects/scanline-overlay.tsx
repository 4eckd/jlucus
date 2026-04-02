'use client';

/**
 * Scanline Overlay Component
 *
 * Creates a CRT monitor scanline effect that moves across the screen
 * for an authentic retro terminal aesthetic.
 *
 * The animation is defined in globals.css (@keyframes scanline)
 * and provides a subtle moving line that enhances the Terminal Neon theme.
 */
export function ScanlineOverlay() {
  return (
    <div className="scanline" aria-hidden="true" />
  );
}

export default ScanlineOverlay;
