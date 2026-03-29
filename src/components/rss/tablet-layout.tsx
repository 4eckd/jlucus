'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Bookmark, Share2 } from 'lucide-react'
import type { BlogPost } from '@/types'

interface TabletRSSLayoutProps {
  posts: BlogPost[]
  onPostSelect?: (post: BlogPost) => void
}

export function TabletRSSLayout({ posts, onPostSelect }: TabletRSSLayoutProps) {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(posts[0]?.id || null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...new Set(posts.map(p => p.category))]
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory)

  const handleSelectPost = (post: BlogPost) => {
    setExpandedPostId(expandedPostId === post.id ? null : post.id)
    onPostSelect?.(post)
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: `rgb(var(--color-bg-primary))` }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 p-6 border-b backdrop-blur-md"
        style={{
          backgroundColor: `rgb(var(--color-bg-primary) / 0.95)`,
          borderColor: `rgb(var(--color-primary) / 0.2)`,
        }}
      >
        <h1 className="font-mono text-2xl font-bold mb-4" style={{ color: `rgb(var(--color-primary))` }}>
          Daily Learning Hub
        </h1>

        {/* Inline Filters - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all flex-shrink-0"
              style={
                selectedCategory === cat
                  ? {
                      backgroundColor: `rgb(var(--color-primary))`,
                      color: `rgb(var(--color-bg-primary))`,
                      boxShadow: `0 0 15px rgb(var(--color-primary) / 0.5)`,
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

        <p className="text-sm mt-4" style={{ color: `rgb(var(--color-text-secondary))` }}>
          {filteredPosts.length} articles available
        </p>
      </motion.div>

      {/* Centered Content Grid - 1.5 columns effective */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12" style={{ color: `rgb(var(--color-text-secondary))` }}>
            <p className="font-mono">No articles found</p>
          </div>
        ) : (
          filteredPosts.map((post, idx) => {
            const isExpanded = expandedPostId === post.id

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                layout
                onClick={() => handleSelectPost(post)}
                className="cursor-pointer rounded-xl border transition-all overflow-hidden"
                style={{
                  backgroundColor: isExpanded ? `rgb(var(--color-bg-secondary))` : `rgb(var(--color-bg-primary))`,
                  borderColor: isExpanded
                    ? `rgb(var(--color-primary) / 0.8)`
                    : `rgb(var(--color-primary) / 0.2)`,
                  boxShadow: isExpanded ? `0 0 20px rgb(var(--color-primary) / 0.2)` : 'none',
                }}
              >
                {/* Collapsed State */}
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-mono mb-2 uppercase tracking-wider" style={{ color: `rgb(var(--color-primary))` }}>
                        {post.category}
                      </p>
                      <h2 className="font-mono font-bold text-lg" style={{ color: `rgb(var(--color-text-primary))` }}>
                        {post.title}
                      </h2>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5" style={{ color: `rgb(var(--color-primary))` }} />
                    </motion.div>
                  </div>

                  {/* Preview text always visible */}
                  <p className="text-sm mt-3 line-clamp-2" style={{ color: `rgb(var(--color-text-secondary))` }}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t px-6 py-6"
                    style={{ borderColor: `rgb(var(--color-primary) / 0.2)` }}
                  >
                    {/* Full excerpt */}
                    <p className="text-base mb-6 leading-relaxed" style={{ color: `rgb(var(--color-text-secondary))` }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && (
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md text-xs font-mono"
                            style={{
                              backgroundColor: `rgb(var(--color-primary) / 0.1)`,
                              color: `rgb(var(--color-primary))`,
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t" style={{ borderColor: `rgb(var(--color-primary) / 0.1)` }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 rounded-lg font-mono text-sm font-semibold transition-all flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: `rgb(var(--color-primary) / 0.15)`,
                          color: `rgb(var(--color-primary))`,
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 rounded-lg font-mono text-sm font-semibold transition-all flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: `rgb(var(--color-accent) / 0.15)`,
                          color: `rgb(var(--color-accent))`,
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
