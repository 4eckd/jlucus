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
  const items: CommandItem[] = useMemo(
    () => [
      // Navigation
      ...NAVIGATION_SECTIONS.map((section) => ({
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
      ...SOCIAL_LINKS.map((link) => ({
        id: link.name,
        title: link.name,
        description: `Open ${link.name}`,
        href: link.href,
        icon: link.name === 'GitHub' ? Github : Mail,
      })),
    ],
    []
  );

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
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
        setIsOpen((prev) => !prev);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      // Arrow keys for navigation
      if (isOpen && filteredItems.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev === 0 ? filteredItems.length - 1 : prev - 1
          );
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
          className="bg-background/80 absolute inset-0 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Command Palette */}
        <div className="flex items-start justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-background-secondary border-primary/20 shadow-neon-primary-lg w-full max-w-2xl overflow-hidden rounded-lg border"
          >
            {/* Search Input */}
            <div className="border-primary/10 flex items-center gap-3 border-b p-4">
              <Search className="text-secondary h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type a command or search..."
                className="text-primary placeholder-secondary flex-1 bg-transparent font-mono outline-none"
                autoFocus
              />
              <div className="text-secondary hidden items-center gap-1 text-xs md:flex">
                <kbd className="bg-background border-primary/20 rounded border px-2 py-1">
                  ↑↓
                </kbd>
                <span>navigate</span>
                <kbd className="bg-background border-primary/20 ml-2 rounded border px-2 py-1">
                  Enter
                </kbd>
                <span>select</span>
                <kbd className="bg-background border-primary/20 ml-2 rounded border px-2 py-1">
                  Esc
                </kbd>
                <span>close</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="text-secondary p-8 text-center">
                  <Search className="mx-auto mb-4 h-12 w-12 opacity-50" />
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
                        'flex w-full items-center gap-3 p-3 text-left transition-colors',
                        'hover:bg-primary/10 focus:bg-primary/10 focus:outline-none',
                        index === selectedIndex && 'bg-primary/10 text-primary'
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
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <item.icon className="text-primary h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-primary font-medium">
                          {item.title}
                        </div>
                        <div className="text-secondary truncate text-sm">
                          {item.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-primary/10 text-secondary flex items-center justify-between border-t p-3 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span>Command Palette</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="bg-background border-primary/20 rounded border px-2 py-1">
                  ⌘
                </kbd>
                <kbd className="bg-background border-primary/20 rounded border px-2 py-1">
                  K
                </kbd>
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
