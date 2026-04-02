'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Share2, ChevronRight } from 'lucide-react'
import type { BlogPost } from '@/types'

interface MobileRSSLayoutProps {
  posts: BlogPost[]
  onPostSelect?: (post: BlogPost) => void
}

export function MobileRSSLayout({ posts, onPostSelect }: MobileRSSLayoutProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const categories = ['all', ...new Set(posts.map(p => p.category))]

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory)

  const categories_display = categories.slice(0, 5)

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Sticky Header - Single Row Horizontal Scroll */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{ backgroundColor: `rgb(var(--color-bg-primary) / 0.95)` }}
      >
        <div className="p-4 border-b" style={{ borderColor: `rgb(var(--color-primary) / 0.2)` }}>
          <h1 className="font-mono text-xl font-bold mb-4" style={{ color: `rgb(var(--color-primary))` }}>
            Daily Learning
          </h1>
          {/* Horizontal scroll categories - No overflow needed */}
          <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
            {categories_display.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all flex-shrink-0"
                style={
                  selectedCategory === cat
                    ? {
                        backgroundColor: `rgb(var(--color-primary))`,
                        color: `rgb(var(--color-bg-primary))`,
                      }
                    : {
                        backgroundColor: `rgb(var(--color-bg-secondary))`,
                        color: `rgb(var(--color-text-secondary))`,
                      }
                }
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Infinite Scroll Cards */}
      <div className="p-4 space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12" style={{ color: `rgb(var(--color-text-secondary))` }}>
            <p className="font-mono">No articles in {selectedCategory}</p>
          </div>
        ) : (
          filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onPostSelect?.(post)}
              className="group cursor-pointer p-4 rounded-lg border transition-all hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                borderColor: `rgb(var(--color-primary) / 0.3)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.8)`;
                e.currentTarget.style.boxShadow = `0 0 15px rgb(var(--color-primary) / 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.3)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono mb-1" style={{ color: `rgb(var(--color-primary))` }}>
                    {post.category}
                  </p>
                  <h3 className="font-mono font-bold text-sm line-clamp-2 mb-2" style={{ color: `rgb(var(--color-text-primary))` }}>
                    {post.title}
                  </h3>
                  <p className="text-xs line-clamp-2" style={{ color: `rgb(var(--color-text-secondary))` }}>
                    {post.excerpt}
                  </p>
                </div>
                <ChevronRight className="flex-shrink-0 h-5 w-5 mt-1" style={{ color: `rgb(var(--color-primary))` }} />
              </div>

              {/* Action buttons - Minimal */}
              <div className="flex gap-2 mt-3 pt-3 border-t" style={{ borderColor: `rgb(var(--color-primary) / 0.1)` }}>
                <button className="flex-1 py-2 rounded text-xs font-mono flex items-center justify-center gap-1 transition-all"
                  style={{
                    backgroundColor: `rgb(var(--color-primary) / 0.1)`,
                    color: `rgb(var(--color-primary))`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-primary) / 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-primary) / 0.1)`;
                  }}
                >
                  <Bookmark className="h-3 w-3" />
                  Save
                </button>
                <button className="flex-1 py-2 rounded text-xs font-mono flex items-center justify-center gap-1 transition-all"
                  style={{
                    backgroundColor: `rgb(var(--color-accent) / 0.1)`,
                    color: `rgb(var(--color-accent))`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-accent) / 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-accent) / 0.1)`;
                  }}
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
