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
  }, [searchQuery, selectedTags])

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
          <div className="relative overflow-hidden rounded-lg border border-cyan-500/20 bg-dark-800 transition-all duration-300 focus-within:border-cyan-500/50">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400/50" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-3 pl-12 pr-4 font-sans text-text-primary placeholder-text-muted outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-cyan-400"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="space-y-3">
          <p className="font-mono text-sm text-text-secondary">Filter by tags:</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`transition-all rounded-full px-3 py-1 font-mono text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-cyan-500/30 text-cyan-300 ring-2 ring-cyan-500'
                    : 'bg-dark-700 text-text-secondary hover:bg-dark-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm text-cyan-400 hover:text-magenta-400"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-sm text-text-tertiary">
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
