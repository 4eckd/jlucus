'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCSSColor } from '@/lib/css-variables';

/**
 * Custom Neon Cursor Component
 *
 * Creates a cyberpunk-style cursor with:
 * - Neon trail effect following mouse movement
 * - Interactive hover states
 * - Click ripple effects
 * - Smooth cursor tracking with lerp interpolation
 *
 * Enhances the Terminal Neon theme with an immersive interactive experience.
 */
export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const trailIdRef = useRef(0);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add to trail
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }];
        // Keep only last 10 trail points
        return newTrail.slice(-10);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth cursor following with lerp
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setCursorPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mousePosition]);

  // Clear old trail points periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Don't render on touch devices or if window is undefined
  if (typeof window === 'undefined' || 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Trail effect */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-3 h-3 rounded-full bg-primary/30 blur-sm"
            style={{
              left: point.x,
              top: point.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AnimatePresence>

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
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 10px rgb(${getCSSColor('primary')})`,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
      />

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute w-16 h-16 rounded-full border-2 border-accent"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomCursor;
