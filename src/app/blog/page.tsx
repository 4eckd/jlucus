'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { getSortedBlogPosts, getAllBlogTags } from '@/data/blog-posts'
import { PostList } from '@/components/blog'
import { Search, X } from 'lucide-react'

export default function BlogPage() {
  const posts = getSortedBlogPosts()
  const allTags = getAllBlogTags()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [posts, searchQuery, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Search Input */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-lg border transition-all duration-300"
            style={{
              borderColor: `rgb(var(--color-primary) / 0.2)`,
              backgroundColor: `rgb(var(--color-bg-secondary))`,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.5)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.2)`;
            }}
          >
            <Search
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: `rgb(var(--color-primary) / 0.5)` }}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-3 pl-12 pr-4 font-sans outline-none"
              style={{
                color: `rgb(var(--color-text-primary))`,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: `rgb(var(--color-text-tertiary))` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = `rgb(var(--color-primary))`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = `rgb(var(--color-text-tertiary))`;
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="space-y-3">
          <p className="font-mono text-sm" style={{ color: `rgb(var(--color-text-secondary))` }}>
            Filter by tags:
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="transition-all rounded-full px-3 py-1 font-mono text-sm"
                style={
                  selectedTags.includes(tag)
                    ? {
                        backgroundColor: `rgb(var(--color-primary) / 0.3)`,
                        color: `rgb(var(--color-primary))`,
                        boxShadow: `inset 0 0 0 2px rgb(var(--color-primary))`,
                      }
                    : {
                        backgroundColor: `rgb(var(--color-bg-tertiary))`,
                        color: `rgb(var(--color-text-secondary))`,
                      }
                }
                onMouseEnter={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-bg-tertiary) / 0.8)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-bg-tertiary))`;
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm transition-colors"
              style={{ color: `rgb(var(--color-primary))` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = `rgb(var(--color-accent))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `rgb(var(--color-primary))`;
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div style={{ color: `rgb(var(--color-text-tertiary))` }} className="text-sm">
          Showing {filteredPosts.length} of {posts.length} articles
        </div>
      </motion.div>

      {/* Posts Grid */}
      <PostList
        posts={filteredPosts}
        emptyMessage={
          searchQuery || selectedTags.length > 0
            ? 'No articles match your search or filters. Try adjusting your criteria.'
            : 'No blog posts yet. Check back soon!'
        }
      />
    </div>
  )
}
