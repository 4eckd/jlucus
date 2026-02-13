'use client';

import { CustomCursor } from '@/components/effects/custom-cursor';
import { ScanlineOverlay } from '@/components/effects/scanline-overlay';
import { CommandPalette } from '@/components/ui/command-palette';

/**
 * Client Layout Wrapper
 *
 * Wraps client-only components to prevent SSR issues.
 * This component is marked as 'use client' to ensure all child
 * components render only on the client side.
 */
export function ClientLayout() {
  return (
    <>
      <CustomCursor />
      <ScanlineOverlay />
      <CommandPalette />
    </>
  );
}
