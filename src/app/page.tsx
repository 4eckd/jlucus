'use client'

import { Navigation } from '@/components/layout'
import { HeroSection } from '@/components/sections'
import { Button } from '@/components/ui/Button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Navigation />

      {/* Hero Section - Migrated from legacy */}
      <HeroSection />

      {/* Development Status Section */}
      <section id="status" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[var(--color-background-secondary)]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Theme Toggle */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </Button>
          </div>

          {/* Status Info */}
          <div className="glass-effect rounded-lg p-6 space-y-3 animate-slide-up">
            <h3 className="text-xl font-semibold text-[var(--color-primary)]">
              Modernization Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">Framework</div>
                <div className="text-[var(--color-text-primary)] font-medium">Next.js 16 + TypeScript</div>
              </div>
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">UI Library</div>
                <div className="text-[var(--color-text-primary)] font-medium">LobeUI + Lucide Icons</div>
              </div>
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">Theme</div>
                <div className="text-[var(--color-text-primary)] font-medium">Green + Dark Mode</div>
              </div>
            </div>
          </div>

          {/* Feature Checklist */}
          <div className="text-left max-w-2xl mx-auto space-y-3">
            <h3 className="text-lg font-semibold text-[var(--color-primary)]">Implementation Progress:</h3>
            <ul className="space-y-2">
              {[
                { text: 'Next.js 16 + TypeScript setup', done: true },
                { text: 'Green color scheme (WCAG AAA)', done: true },
                { text: 'Dark theme by default', done: true },
                { text: 'Theme provider & toggle', done: true },
                { text: 'Core dependencies installed', done: true },
                { text: 'Button component', done: true },
                { text: 'Hero section migration', done: true },
                { text: 'Navigation component', done: false },
                { text: 'All sections migrated', done: false },
                { text: 'Payload CMS integration', done: false },
                { text: 'AI Chat Agent', done: false },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <span className={item.done ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}>
                    {item.done ? '✅' : '⏳'}
                  </span>
                  <span className={item.done ? 'line-through opacity-60' : ''}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="pt-8 text-sm text-[var(--color-text-muted)]">
            <p>Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and LobeUI</p>
            <p className="mt-2">Legacy site preserved in <code className="px-2 py-1 bg-[var(--color-surface)] rounded">legacy/</code> folder</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20 bg-[var(--color-background-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient">About</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            About section coming soon. This will include profile image, bio, and personal details.
          </p>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Resume</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Resume section coming soon. This will include work history, education, and timeline.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen flex items-center justify-center px-4 py-20 bg-[var(--color-background-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Portfolio</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Portfolio section coming soon. This will include project cards with filtering.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Services</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Services section coming soon. This will include service cards and AI models showcase.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20 bg-[var(--color-background-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Contact</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Contact form coming soon. Get in touch via email or social media.
          </p>
        </div>
      </section>
    </>
  )
}
