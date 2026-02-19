'use client';

import { useState, useEffect } from 'react';
import { NAVIGATION_SECTIONS, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAVIGATION_SECTIONS.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const current = sections.find(section => {
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background-secondary/80 border-b border-primary/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">{'> jlucus'}</span>
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
        </nav>

        {/* Social Links + CV Download */}
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
          <Button variant="outline" size="sm" asChild>
            <a href="/resume.pdf" download="jlucus-resume.pdf" className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              CV
            </a>
          </Button>
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
                <a
                  href="/resume.pdf"
                  download="jlucus-resume.pdf"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
