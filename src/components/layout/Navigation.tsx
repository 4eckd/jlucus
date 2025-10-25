'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Home, User, FileText, Briefcase, Layers, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: <Home className="w-4 h-4" /> },
  { label: 'About', href: '#about', icon: <User className="w-4 h-4" /> },
  { label: 'Resume', href: '#resume', icon: <FileText className="w-4 h-4" /> },
  { label: 'Portfolio', href: '#portfolio', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Services', href: '#services', icon: <Layers className="w-4 h-4" /> },
  { label: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4" /> },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)

    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }

    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-lg py-3'
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
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-md',
                  'text-sm font-medium transition-all duration-200',
                  'hover:bg-[var(--color-surface-hover)]',
                  activeSection === item.href.substring(1)
                    ? 'text-[var(--color-primary)] bg-[var(--color-surface)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                )}
                aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden mobile-menu-button p-2 rounded-md hover:bg-[var(--color-surface-hover)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[var(--color-primary)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--color-text-primary)]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'mobile-menu md:hidden absolute top-full left-0 right-0',
            'bg-[var(--color-background)] border-t border-[var(--color-border)]',
            'transition-all duration-300 ease-in-out overflow-hidden',
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
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
                      'flex items-center gap-3 px-4 py-3 rounded-md',
                      'text-base font-medium transition-all duration-200',
                      'hover:bg-[var(--color-surface-hover)]',
                      activeSection === item.href.substring(1)
                        ? 'text-[var(--color-primary)] bg-[var(--color-surface)]'
                        : 'text-[var(--color-text-secondary)]'
                    )}
                    aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
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
  )
}
