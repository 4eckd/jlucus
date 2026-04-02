'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_SECTIONS, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Eye, EyeOff } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('reduceMotion') === 'true';
    }
    return false;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (reduceMotion) {
      document.body.classList.add('reduce-motion');
      localStorage.setItem('reduceMotion', 'true');
    } else {
      document.body.classList.remove('reduce-motion');
      localStorage.setItem('reduceMotion', 'false');
    }
  }, [reduceMotion]);

  const handleScroll = useCallback(() => {
    // Active section tracking
    const sections = NAVIGATION_SECTIONS.map(section => ({
      id: section.id,
      element: document.getElementById(section.id),
    }));

    const current = sections.find(section => {
      if (!section.element) return false;
      const rect = section.element.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });

    if (current) setActiveSection(current.id);

    // Scroll progress (0–100)
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call handleScroll asynchronously to avoid setState in effect warning
    const id = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(id);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background-secondary/80 border-b border-primary/10">
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: 'var(--shadow-neon-primary-sm)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="jlucus"
            className="h-8 w-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 6px rgb(0 217 255 / 0.5))' }}
          />
          <span className="text-primary cursor-pointer animate-pulse">_</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAVIGATION_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "transition-colors hover:text-primary",
                activeSection === section.id
                  ? "text-primary font-medium"
                  : "text-muted"
              )}
            >
              {section.label}
            </button>
          ))}
          <span className="text-primary/20">|</span>
          <Link
            href="/blog"
            className={cn(
              "transition-colors hover:text-primary",
              pathname.startsWith('/blog') && !pathname.startsWith('/daily-learning')
                ? "text-primary font-medium"
                : "text-muted"
            )}
          >
            Blog
          </Link>
          <Link
            href="/daily-learning"
            className={cn(
              "transition-colors hover:text-primary",
              pathname.startsWith('/daily-learning')
                ? "text-primary font-medium"
                : "text-muted"
            )}
          >
            Daily Learning
          </Link>
        </nav>

        {/* Right side: social links + accessibility toggle */}
        <div className="hidden md:flex items-center space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Reduce motion toggle */}
          <button
            onClick={() => setReduceMotion(v => !v)}
            className="text-muted hover:text-primary transition-colors p-1 rounded"
            aria-label={reduceMotion ? 'Enable animations' : 'Reduce motion'}
            title={reduceMotion ? 'Enable animations' : 'Reduce motion'}
          >
            {reduceMotion ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background-secondary border-b border-primary/10 md:hidden">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {NAVIGATION_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "block w-full text-left transition-colors hover:text-primary",
                    activeSection === section.id
                      ? "text-primary font-medium"
                      : "text-muted"
                  )}
                >
                  {section.label}
                </button>
              ))}
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block transition-colors hover:text-primary",
                  pathname.startsWith('/blog') && !pathname.startsWith('/daily-learning')
                    ? "text-primary font-medium"
                    : "text-muted"
                )}
              >
                Blog
              </Link>
              <Link
                href="/daily-learning"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block transition-colors hover:text-primary",
                  pathname.startsWith('/daily-learning')
                    ? "text-primary font-medium"
                    : "text-muted"
                )}
              >
                Daily Learning
              </Link>
              <div className="pt-4 border-t border-primary/10 space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                {/* Reduce motion in mobile menu too */}
                <button
                  onClick={() => setReduceMotion(v => !v)}
                  className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm"
                  aria-label={reduceMotion ? 'Enable animations' : 'Reduce motion'}
                >
                  {reduceMotion ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{reduceMotion ? 'Enable animations' : 'Reduce motion'}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
