'use client';

import { useState, useEffect } from 'react';
import { NAVIGATION_SECTIONS, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAVIGATION_SECTIONS.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const current = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-background-secondary/80 border-primary/10 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-primary text-xl font-bold">{'> jlucus'}</span>
          <span className="text-primary animate-pulse cursor-pointer">_</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {NAVIGATION_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'hover:text-primary transition-colors',
                activeSection === section.id
                  ? 'text-primary font-medium'
                  : 'text-muted'
              )}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Social Links */}
        <div className="hidden items-center space-x-3 md:flex">
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
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-background-secondary border-primary/10 absolute top-full right-0 left-0 border-b md:hidden">
            <nav className="container mx-auto space-y-4 px-4 py-4">
              {NAVIGATION_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'hover:text-primary block w-full text-left transition-colors',
                    activeSection === section.id
                      ? 'text-primary font-medium'
                      : 'text-muted'
                  )}
                >
                  {section.label}
                </button>
              ))}
              <div className="border-primary/10 space-y-3 border-t pt-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary block transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
