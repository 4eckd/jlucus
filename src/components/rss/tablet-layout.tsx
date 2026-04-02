'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Bookmark, Share2 } from 'lucide-react';
import type { BlogPost } from '@/types';

interface TabletRSSLayoutProps {
  posts: BlogPost[];
  onPostSelect?: (post: BlogPost) => void;
}

export function TabletRSSLayout({ posts, onPostSelect }: TabletRSSLayoutProps) {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(
    posts[0]?.id || null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(posts.map((p) => p.category))];
  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleSelectPost = (post: BlogPost) => {
    setExpandedPostId(expandedPostId === post.id ? null : post.id);
    onPostSelect?.(post);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: `rgb(var(--color-bg-primary))` }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 border-b p-6 backdrop-blur-md"
        style={{
          backgroundColor: `rgb(var(--color-bg-primary) / 0.95)`,
          borderColor: `rgb(var(--color-primary) / 0.2)`,
        }}
      >
        <h1
          className="mb-4 font-mono text-2xl font-bold"
          style={{ color: `rgb(var(--color-primary))` }}
        >
          Daily Learning Hub
        </h1>

        {/* Inline Filters - Horizontal Scroll */}
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className="flex-shrink-0 rounded-lg px-4 py-2 font-mono text-sm font-semibold whitespace-nowrap transition-all"
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

        <p
          className="mt-4 text-sm"
          style={{ color: `rgb(var(--color-text-secondary))` }}
        >
          {filteredPosts.length} articles available
        </p>
      </motion.div>

      {/* Centered Content Grid - 1.5 columns effective */}
      <div className="mx-auto max-w-2xl space-y-4 px-6 py-8">
        {filteredPosts.length === 0 ? (
          <div
            className="py-12 text-center"
            style={{ color: `rgb(var(--color-text-secondary))` }}
          >
            <p className="font-mono">No articles found</p>
          </div>
        ) : (
          filteredPosts.map((post, idx) => {
            const isExpanded = expandedPostId === post.id;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                layout
                onClick={() => handleSelectPost(post)}
                className="cursor-pointer overflow-hidden rounded-xl border transition-all"
                style={{
                  backgroundColor: isExpanded
                    ? `rgb(var(--color-bg-secondary))`
                    : `rgb(var(--color-bg-primary))`,
                  borderColor: isExpanded
                    ? `rgb(var(--color-primary) / 0.8)`
                    : `rgb(var(--color-primary) / 0.2)`,
                  boxShadow: isExpanded
                    ? `0 0 20px rgb(var(--color-primary) / 0.2)`
                    : 'none',
                }}
              >
                {/* Collapsed State */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p
                        className="mb-2 font-mono text-xs tracking-wider uppercase"
                        style={{ color: `rgb(var(--color-primary))` }}
                      >
                        {post.category}
                      </p>
                      <h2
                        className="font-mono text-lg font-bold"
                        style={{ color: `rgb(var(--color-text-primary))` }}
                      >
                        {post.title}
                      </h2>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown
                        className="h-5 w-5"
                        style={{ color: `rgb(var(--color-primary))` }}
                      />
                    </motion.div>
                  </div>

                  {/* Preview text always visible */}
                  <p
                    className="mt-3 line-clamp-2 text-sm"
                    style={{ color: `rgb(var(--color-text-secondary))` }}
                  >
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
                    <p
                      className="mb-6 text-base leading-relaxed"
                      style={{ color: `rgb(var(--color-text-secondary))` }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md px-2 py-1 font-mono text-xs"
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
                    <div
                      className="flex gap-3 border-t pt-4"
                      style={{ borderColor: `rgb(var(--color-primary) / 0.1)` }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 font-mono text-sm font-semibold transition-all"
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
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 font-mono text-sm font-semibold transition-all"
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
            );
          })
        )}
      </div>
    </div>
  );
}
