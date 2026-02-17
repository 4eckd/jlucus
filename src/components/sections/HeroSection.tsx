'use client';

/**
 * @deprecated This component is deprecated and should not be used in new code.
 * Use `hero-terminal.tsx` instead, which implements the Terminal Neon design system.
 *
 * This file is kept for reference and backward compatibility with previous feature implementations.
 * See: artifacts/feat-hero-section-HSC-001/
 */

import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';

interface HeroSectionProps {
  name?: string;
  roles?: string[];
  backgroundImage?: string;
  showScrollIndicator?: boolean;
  onContactClick?: () => void;
  onPortfolioClick?: () => void;
}

/**
 * Hero Section Component
 * Migrated from legacy index.html hero section
 * Features typing animation, CTA buttons, and responsive design
 */
export function HeroSection({
  name = 'Jesse Lucus',
  roles = [
    'a Developer',
    'a Freelancer',
    'an Entrepreneur',
    'a Hacker',
    'a Felon',
    'a Veteran',
  ],
  backgroundImage = '/legacy/assets/img/hero-bg.png',
  showScrollIndicator = true,
  onContactClick,
  onPortfolioClick,
}: HeroSectionProps) {
  const { displayText, isTyping } = useTypingAnimation({
    words: roles,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    loop: true,
  });

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        role="presentation"
        aria-hidden="true"
      />

      {/* Dark overlay for better text contrast */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--color-background)]/80 to-[var(--color-background)]/60"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Main Heading */}
        <motion.h1
          className="text-gradient mb-6 text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {name}
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          className="mb-12 flex min-h-[3rem] items-center justify-center text-2xl text-[var(--color-text-secondary)] sm:text-3xl md:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="font-[var(--font-poppins)]">
            I&apos;m{' '}
            <span className="font-semibold text-[var(--color-primary)]">
              {displayText}
            </span>
            <span
              className={`ml-1 inline-block h-8 w-0.5 bg-[var(--color-primary)] ${
                isTyping ? 'animate-blink' : 'opacity-0'
              }`}
              aria-hidden="true"
            />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={
              onPortfolioClick ||
              (() => {
                const portfolioSection = document.getElementById('portfolio');
                portfolioSection?.scrollIntoView({ behavior: 'smooth' });
              })
            }
            className="min-w-[200px]"
            aria-label="View my portfolio"
          >
            View Portfolio
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={
              onContactClick ||
              (() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              })
            }
            className="min-w-[200px]"
            aria-label="Get in touch"
          >
            <Mail className="mr-2 h-5 w-5" />
            Get in Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mb-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href="https://github.com/jlucus"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full bg-[var(--color-surface)] p-3 transition-colors duration-200 hover:bg-[var(--color-primary)]"
            aria-label="GitHub profile"
          >
            <Github className="h-6 w-6 text-[var(--color-text-primary)] group-hover:text-white" />
          </a>
          <a
            href="https://linkedin.com/in/supitsj"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full bg-[var(--color-surface)] p-3 transition-colors duration-200 hover:bg-[var(--color-primary)]"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-6 w-6 text-[var(--color-text-primary)] group-hover:text-white" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.button
            onClick={scrollToNextSection}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:outline-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 0.5,
            }}
            aria-label="Scroll to about section"
          >
            <ArrowDown className="h-6 w-6" />
          </motion.button>
        )}
      </motion.div>

      {/* Add blink animation to globals.css via inline style for now */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
