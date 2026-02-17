'use client';

import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Home,
  User,
  FileText,
  Briefcase,
  Layers,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: <Home className="h-4 w-4" /> },
  { label: 'About', href: '#about', icon: <User className="h-4 w-4" /> },
  { label: 'Resume', href: '#resume', icon: <FileText className="h-4 w-4" /> },
  {
    label: 'Portfolio',
    href: '#portfolio',
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    label: 'Services',
    href: '#services',
    icon: <Layers className="h-4 w-4" />,
  },
  { label: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4" /> },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }

    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest('.mobile-menu') &&
        !target.closest('.mobile-menu-button')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 py-3 shadow-lg backdrop-blur-md'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className={cn(
              'text-2xl font-bold transition-all duration-300',
              'text-gradient hover:opacity-80',
              isScrolled ? 'text-xl' : 'text-2xl'
            )}
          >
            Jesse Lucus
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-4 py-2',
                  'text-sm font-medium transition-all duration-200',
                  'hover:bg-surface-hover',
                  activeSection === item.href.substring(1)
                    ? 'text-primary bg-surface'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                aria-current={
                  activeSection === item.href.substring(1) ? 'page' : undefined
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button hover:bg-surface-hover rounded-md p-2 transition-colors md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="text-primary h-6 w-6" />
            ) : (
              <Menu className="text-text-primary h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'mobile-menu absolute top-full right-0 left-0 md:hidden',
            'bg-background border-border border-t',
            'overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen
              ? 'max-h-screen opacity-100'
              : 'pointer-events-none max-h-0 opacity-0'
          )}
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-4 py-3',
                      'text-base font-medium transition-all duration-200',
                      'hover:bg-surface-hover',
                      activeSection === item.href.substring(1)
                        ? 'text-primary bg-surface'
                        : 'text-text-secondary'
                    )}
                    aria-current={
                      activeSection === item.href.substring(1)
                        ? 'page'
                        : undefined
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
