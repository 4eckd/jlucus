'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAVIGATION_SECTIONS, SOCIAL_LINKS } from '@/lib/constants';
import { Search, Terminal, Github, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action?: () => void;
  href?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Navigation and action items - memoized to prevent recreation
  const items: CommandItem[] = useMemo(() => [
    // Navigation
    ...NAVIGATION_SECTIONS.map(section => ({
      id: section.id,
      title: section.label,
      description: `Navigate to ${section.label.toLowerCase()} section`,
      icon: Terminal,
      action: () => {
        const element = document.getElementById(section.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      },
    })),

    // Social Links
    ...SOCIAL_LINKS.map(link => ({
      id: link.name,
      title: link.name,
      description: `Open ${link.name}`,
      href: link.href,
      icon: link.name === 'GitHub' ? Github : Mail,
    })),
  ], []);

  const filteredItems = useMemo(() =>
    items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [items, searchTerm]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      // Arrow keys for navigation
      if (isOpen && filteredItems.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? filteredItems.length - 1 : prev - 1);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const item = filteredItems[selectedIndex];
          if (item?.action) {
            item.action();
          }
          if (item?.href) {
            window.open(item.href, '_blank');
          }
          setIsOpen(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedIndex, filteredItems]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Command Palette */}
        <div className="flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-background-secondary border border-primary/20 rounded-lg shadow-neon-primary-lg overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-primary/10">
              <Search className="w-5 h-5 text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-primary placeholder-secondary outline-none font-mono"
                autoFocus
              />
              <div className="hidden md:flex items-center gap-1 text-xs text-secondary">
                <kbd className="px-2 py-1 bg-background border border-primary/20 rounded">↑↓</kbd>
                <span>navigate</span>
                <kbd className="px-2 py-1 bg-background border border-primary/20 rounded ml-2">Enter</kbd>
                <span>select</span>
                <kbd className="px-2 py-1 bg-background border border-primary/20 rounded ml-2">Esc</kbd>
                <span>close</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-secondary">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No results found for &ldquo;{searchTerm}&rdquo;</p>
                </div>
              ) : (
                <div className="py-2">
                  {filteredItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 text-left transition-colors",
                        "hover:bg-primary/10 focus:bg-primary/10 focus:outline-none",
                        index === selectedIndex && "bg-primary/10 text-primary"
                      )}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        }
                        if (item.href) {
                          window.open(item.href, '_blank');
                        }
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-primary">{item.title}</div>
                        <div className="text-sm text-secondary truncate">{item.description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t border-primary/10 text-xs text-secondary">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Command Palette</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-background border border-primary/20 rounded">⌘</kbd>
                <kbd className="px-2 py-1 bg-background border border-primary/20 rounded">K</kbd>
                <span>to toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default CommandPalette;
