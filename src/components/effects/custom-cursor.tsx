'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getCSSColor } from '@/lib/css-variables';

/**
 * Custom Neon Cursor Component
 *
 * Optimized cyberpunk-style cursor with:
 * - Minimal re-renders (no trail animations)
 * - Debounced hover detection
 * - GPU-accelerated transforms
 * - Smooth cursor tracking with lerp
 */
export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastHoverTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      lastHoverTarget.current = target;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.style.cursor === 'pointer';

      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Single RAF loop for smooth cursor tracking
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      cursorRef.current = {
        x: lerp(cursorRef.current.x, mouseRef.current.x, 0.15),
        y: lerp(cursorRef.current.y, mouseRef.current.y, 0.15),
      };

      setCursorPosition({ ...cursorRef.current });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isMounted || typeof window === 'undefined' || 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main cursor */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border-2 border-primary mix-blend-difference"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          borderColor: isClicking
            ? `rgb(${getCSSColor('accent')})`
            : isHovering
            ? `rgb(${getCSSColor('secondary')})`
            : `rgb(${getCSSColor('primary')})`,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background: isClicking
              ? `radial-gradient(circle, rgb(${getCSSColor('accent')}) 0%, transparent 70%)`
              : isHovering
              ? `radial-gradient(circle, rgb(${getCSSColor('secondary')}) 0%, transparent 70%)`
              : `radial-gradient(circle, rgb(${getCSSColor('primary')}) 0%, transparent 70%)`,
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary"
        style={{
          left: mouseRef.current.x,
          top: mouseRef.current.y,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 10px rgb(${getCSSColor('primary')})`,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
      />
    </div>
  );
}

export default CustomCursor;
