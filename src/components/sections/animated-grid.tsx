'use client';

import { useEffect, useRef } from 'react';
import { getCSSColor, getCSSNumber } from '@/lib/css-variables';

// Animation configuration constants
const ANIMATION_CONFIG = {
  pulse: {
    baseSize: 2,
    amplitude: 1,
    speed: 0.001,
  },
  grid: {
    lineWidth: 1,
    opacity: 0.05,
  },
  dots: {
    modulo: 2, // Multiplier for gridSize to determine dot spacing
    opacityBase: 0.3,
    opacityAmplitude: 0.2,
    opacitySpeed: 0.002,
  },
  stream: {
    count: 5,
    speed: 0.05,
    spacing: 100,
    radius: 3,
    opacity: 0.2,
    amplitude: 200,
    timeOffset: 1000,
    animationSpeed: 0.001,
  },
  frameTime: 16, // ~60fps
};

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get CSS variables
    const primaryColor = getCSSColor('primary');
    const accentColor = getCSSColor('accent');
    const secondaryColor = getCSSColor('secondary');
    const gridSize = getCSSNumber('--grid-size') || 40;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation state
    let animationFrame: number;
    let time = 0;

    // Grid lines
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set grid color with semi-transparent primary color
      ctx.strokeStyle = `rgba(${primaryColor}, ${ANIMATION_CONFIG.grid.opacity})`;
      ctx.lineWidth = ANIMATION_CONFIG.grid.lineWidth;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw animated pulsing dots at intersections
      const pulseSize = ANIMATION_CONFIG.pulse.baseSize +
        Math.sin(time * ANIMATION_CONFIG.pulse.speed) * ANIMATION_CONFIG.pulse.amplitude;
      const dotOpacity = ANIMATION_CONFIG.dots.opacityBase +
        Math.sin(time * ANIMATION_CONFIG.dots.opacitySpeed) * ANIMATION_CONFIG.dots.opacityAmplitude;
      ctx.fillStyle = `rgba(${primaryColor}, ${dotOpacity})`;

      const dotSpacing = gridSize * ANIMATION_CONFIG.dots.modulo;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          // Add some randomness to create a more interesting pattern
          if ((x + y) % dotSpacing === 0) {
            ctx.beginPath();
            ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw moving "data streams"
      const streamColors = [
        `rgba(${primaryColor}, ${ANIMATION_CONFIG.stream.opacity})`,   // Primary cyan
        `rgba(${accentColor}, ${ANIMATION_CONFIG.stream.opacity})`,    // Accent magenta
        `rgba(${secondaryColor}, ${ANIMATION_CONFIG.stream.opacity})`, // Secondary lime
      ];

      for (let i = 0; i < ANIMATION_CONFIG.stream.count; i++) {
        const x = ((time * ANIMATION_CONFIG.stream.speed + i * ANIMATION_CONFIG.stream.spacing) % canvas.width);
        const y = Math.sin((time + i * ANIMATION_CONFIG.stream.timeOffset) * ANIMATION_CONFIG.stream.animationSpeed) *
          ANIMATION_CONFIG.stream.amplitude + canvas.height / 2;

        ctx.fillStyle = streamColors[i % streamColors.length];
        ctx.beginPath();
        ctx.arc(x, y, ANIMATION_CONFIG.stream.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      time += ANIMATION_CONFIG.frameTime;
    };

    const animate = () => {
      drawGrid();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-60 pointer-events-none"
    />
  );
}

export default AnimatedGrid;
