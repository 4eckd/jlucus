'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Clock, Zap, Share2 } from 'lucide-react'
import type { BlogPost } from '@/types'

interface WideRSSLayoutProps {
  posts: BlogPost[]
  onPostSelect?: (post: BlogPost) => void
}

export function WideRSSLayout({ posts, onPostSelect }: WideRSSLayoutProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(posts[0] || null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'trending'>('recent')

  const categories = ['all', ...new Set(posts.map(p => p.category))]
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory)

  const sortedPosts = useMemo(() => {
    if (sortBy === 'trending') {
      // Deterministic shuffle based on post IDs
      return [...filteredPosts].sort((a, b) =>
        (a.id.charCodeAt(0) + a.id.charCodeAt(1)) - (b.id.charCodeAt(0) + b.id.charCodeAt(1))
      )
    }
    return filteredPosts
  }, [filteredPosts, sortBy])

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post)
    onPostSelect?.(post)
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-12 gap-px" style={{ backgroundColor: `rgb(var(--color-bg-base))` }}>
      {/* LEFT PANEL - Categories (20%) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="col-span-2 border-r flex flex-col p-6"
        style={{
          borderColor: `rgb(var(--color-primary) / 0.3)`,
          backgroundColor: `rgb(var(--color-bg-primary))`,
        }}
      >
        <h2 className="font-mono font-bold mb-6" style={{ color: `rgb(var(--color-primary))` }}>
          Categories
        </h2>

        <div className="space-y-2 flex-1">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat)}
              className="w-full text-left py-2 px-3 rounded-lg transition-all text-sm font-mono"
              style={
                selectedCategory === cat
                  ? {
                      backgroundColor: `rgb(var(--color-primary) / 0.2)`,
                      color: `rgb(var(--color-primary))`,
                      boxShadow: `inset 0 0 0 2px rgb(var(--color-primary) / 0.5)`,
                    }
                  : {
                      color: `rgb(var(--color-text-secondary))`,
                    }
              }
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Stats Card */}
        <div
          className="mt-6 p-4 rounded-lg border"
          style={{
            backgroundColor: `rgb(var(--color-bg-secondary))`,
            borderColor: `rgb(var(--color-primary) / 0.3)`,
          }}
        >
          <p className="text-xs font-mono mb-3" style={{ color: `rgb(var(--color-primary))` }}>
            Feed Stats
          </p>
          <div className="space-y-2 text-xs" style={{ color: `rgb(var(--color-text-secondary))` }}>
            <div className="flex justify-between">
              <span>Total Posts</span>
              <span className="font-bold" style={{ color: `rgb(var(--color-primary))` }}>{posts.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Available</span>
              <span className="font-bold" style={{ color: `rgb(var(--color-primary))` }}>{filteredPosts.length}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CENTER PANEL - Feed Grid (50%) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="col-span-6 border-r flex flex-col"
        style={{
          borderColor: `rgb(var(--color-primary) / 0.2)`,
          backgroundColor: `rgb(var(--color-bg-primary))`,
        }}
      >
        {/* Feed Header with Controls */}
        <div className="p-6 border-b" style={{ borderColor: `rgb(var(--color-primary) / 0.2)` }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-mono font-bold text-lg" style={{ color: `rgb(var(--color-primary))` }}>
              Feed
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('recent')}
                className="p-2 rounded-lg text-xs font-mono transition-all"
                style={
                  sortBy === 'recent'
                    ? {
                        backgroundColor: `rgb(var(--color-primary) / 0.2)`,
                        color: `rgb(var(--color-primary))`,
                      }
                    : {
                        backgroundColor: `rgb(var(--color-bg-secondary))`,
                        color: `rgb(var(--color-text-secondary))`,
                      }
                }
              >
                <Clock className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSortBy('trending')}
                className="p-2 rounded-lg text-xs font-mono transition-all"
                style={
                  sortBy === 'trending'
                    ? {
                        backgroundColor: `rgb(var(--color-accent) / 0.2)`,
                        color: `rgb(var(--color-accent))`,
                      }
                    : {
                        backgroundColor: `rgb(var(--color-bg-secondary))`,
                        color: `rgb(var(--color-text-secondary))`,
                      }
                }
              >
                <Zap className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {sortedPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => handleSelectPost(post)}
              className="p-4 rounded-lg cursor-pointer border transition-all"
              style={
                selectedPost?.id === post.id
                  ? {
                      backgroundColor: `rgb(var(--color-primary) / 0.15)`,
                      borderColor: `rgb(var(--color-primary) / 0.8)`,
                      boxShadow: `0 0 15px rgb(var(--color-primary) / 0.2)`,
                    }
                  : {
                      backgroundColor: `rgb(var(--color-bg-secondary) / 0.5)`,
                      borderColor: `rgb(var(--color-primary) / 0.2)`,
                    }
              }
            >
              <div className="flex gap-3">
                <div className="flex-1">
                  <p className="text-xs font-mono mb-1" style={{ color: `rgb(var(--color-primary))` }}>
                    {post.category}
                  </p>
                  <h3 className="font-mono font-bold text-sm line-clamp-2" style={{ color: `rgb(var(--color-text-primary))` }}>
                    {post.title}
                  </h3>
                  <p className="text-xs mt-2 line-clamp-1" style={{ color: `rgb(var(--color-text-tertiary))` }}>
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT PANEL - Details (30%) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="col-span-4 flex flex-col p-6"
        style={{ backgroundColor: `rgb(var(--color-bg-secondary))` }}
      >
        {selectedPost ? (
          <>
            {/* Article Info */}
            <div className="mb-8">
              <p className="font-mono text-xs mb-3 uppercase tracking-wider" style={{ color: `rgb(var(--color-primary))` }}>
                {selectedPost.category}
              </p>
              <h1 className="font-mono font-bold text-2xl leading-tight mb-4" style={{ color: `rgb(var(--color-text-primary))` }}>
                {selectedPost.title}
              </h1>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg" style={{ backgroundColor: `rgb(var(--color-bg-primary))` }}>
                <div>
                  <p className="text-xs" style={{ color: `rgb(var(--color-text-tertiary))` }}>
                    Category
                  </p>
                  <p className="text-sm font-mono font-bold" style={{ color: `rgb(var(--color-primary))` }}>
                    {selectedPost.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: `rgb(var(--color-text-tertiary))` }}>
                    Read Time
                  </p>
                  <p className="text-sm font-mono font-bold" style={{ color: `rgb(var(--color-primary))` }}>
                    5 min
                  </p>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-sm mb-6 leading-relaxed pb-6 border-b" style={{
              color: `rgb(var(--color-text-secondary))`,
              borderColor: `rgb(var(--color-primary) / 0.1)`,
            }}>
              {selectedPost.excerpt}
            </p>

            {/* Tags */}
            {selectedPost.tags && (
              <div className="mb-6">
                <p className="text-xs font-mono mb-2" style={{ color: `rgb(var(--color-text-tertiary))` }}>
                  Tags
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selectedPost.tags.slice(0, 6).map((tag) => (
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
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto pt-6 border-t" style={{ borderColor: `rgb(var(--color-primary) / 0.1)` }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-mono font-semibold transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: `rgb(var(--color-primary) / 0.2)`,
                  color: `rgb(var(--color-primary))`,
                  border: `2px solid rgb(var(--color-primary) / 0.5)`,
                }}
              >
                <BarChart3 className="h-4 w-4" />
                Read Full
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-mono font-semibold transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: `rgb(var(--color-accent) / 0.2)`,
                  color: `rgb(var(--color-accent))`,
                  border: `2px solid rgb(var(--color-accent) / 0.5)`,
                }}
              >
                <Share2 className="h-4 w-4" />
                Share
              </motion.button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full" style={{ color: `rgb(var(--color-text-secondary))` }}>
            <p className="font-mono text-center">Select an article</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
