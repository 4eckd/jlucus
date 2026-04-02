'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, Share2 } from 'lucide-react';
import type { BlogPost } from '@/types';

interface DesktopRSSLayoutProps {
  posts: BlogPost[];
  onPostSelect?: (post: BlogPost) => void;
}

export function DesktopRSSLayout({
  posts,
  onPostSelect,
}: DesktopRSSLayoutProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(
    posts[0] || null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(posts.map((p) => p.category))];
  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    onPostSelect?.(post);
  };

  return (
    <div
      className="grid min-h-screen w-full grid-cols-2 gap-px"
      style={{ backgroundColor: `rgb(var(--color-bg-base))` }}
    >
      {/* LEFT PANEL - Feed List */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col border-r"
        style={{
          borderColor: `rgb(var(--color-primary) / 0.3)`,
          backgroundColor: `rgb(var(--color-bg-primary))`,
        }}
      >
        {/* Header */}
        <div
          className="border-b p-6"
          style={{ borderColor: `rgb(var(--color-primary) / 0.2)` }}
        >
          <h1
            className="mb-4 font-mono text-2xl font-bold"
            style={{ color: `rgb(var(--color-primary))` }}
          >
            &gt; daily.learning
          </h1>
          <p
            className="text-sm"
            style={{ color: `rgb(var(--color-text-secondary))` }}
          >
            {filteredPosts.length} articles available
          </p>
        </div>

        {/* Category Filter Chips */}
        <div
          className="flex flex-wrap gap-2 border-b px-6 py-4"
          style={{ borderColor: `rgb(var(--color-primary) / 0.1)` }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full px-3 py-1 font-mono text-xs font-semibold transition-all"
              style={
                selectedCategory === cat
                  ? {
                      backgroundColor: `rgb(var(--color-primary))`,
                      color: `rgb(var(--color-bg-primary))`,
                      boxShadow: `0 0 10px rgb(var(--color-primary) / 0.5)`,
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

        {/* Scrollable Feed */}
        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleSelectPost(post)}
              className="cursor-pointer rounded-lg border p-3 transition-all"
              style={
                selectedPost?.id === post.id
                  ? {
                      backgroundColor: `rgb(var(--color-primary) / 0.1)`,
                      borderColor: `rgb(var(--color-primary) / 0.8)`,
                      boxShadow: `0 0 10px rgb(var(--color-primary) / 0.3)`,
                    }
                  : {
                      backgroundColor: `rgb(var(--color-bg-secondary) / 0.5)`,
                      borderColor: `rgb(var(--color-primary) / 0.2)`,
                    }
              }
              onMouseEnter={(e) => {
                if (selectedPost?.id !== post.id) {
                  e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.5)`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPost?.id !== post.id) {
                  e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.2)`;
                }
              }}
            >
              <p
                className="mb-1 font-mono text-xs"
                style={{ color: `rgb(var(--color-primary))` }}
              >
                {post.category}
              </p>
              <h3
                className="line-clamp-2 font-mono text-sm font-bold"
                style={{ color: `rgb(var(--color-text-primary))` }}
              >
                {post.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT PANEL - Content Preview */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-8"
        style={{ backgroundColor: `rgb(var(--color-bg-secondary))` }}
      >
        {selectedPost ? (
          <>
            {/* Article Header */}
            <div className="mb-8">
              <p
                className="mb-3 font-mono text-xs tracking-wider uppercase"
                style={{ color: `rgb(var(--color-primary))` }}
              >
                {selectedPost.category}
              </p>
              <h1
                className="mb-4 font-mono text-3xl leading-tight font-bold"
                style={{ color: `rgb(var(--color-text-primary))` }}
              >
                {selectedPost.title}
              </h1>

              {/* Metadata */}
              <div
                className="flex gap-6 text-sm"
                style={{ color: `rgb(var(--color-text-secondary))` }}
              >
                <div className="flex items-center gap-2">
                  <Calendar
                    className="h-4 w-4"
                    style={{ color: `rgb(var(--color-primary))` }}
                  />
                  <span>Recently updated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye
                    className="h-4 w-4"
                    style={{ color: `rgb(var(--color-primary))` }}
                  />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: `rgb(var(--color-text-secondary))` }}
            >
              {selectedPost.excerpt}
            </p>

            {/* Tags */}
            {selectedPost.tags && (
              <div className="mb-8 flex flex-wrap gap-2">
                {selectedPost.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 font-mono text-xs"
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
              className="mt-auto flex gap-3 border-t pt-8"
              style={{ borderColor: `rgb(var(--color-primary) / 0.2)` }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 font-mono font-semibold transition-all"
                style={{
                  backgroundColor: `rgb(var(--color-primary) / 0.2)`,
                  color: `rgb(var(--color-primary))`,
                  border: `2px solid rgb(var(--color-primary) / 0.5)`,
                }}
              >
                <Eye className="h-4 w-4" />
                Read
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 font-mono font-semibold transition-all"
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
          <div
            className="flex h-full items-center justify-center"
            style={{ color: `rgb(var(--color-text-secondary))` }}
          >
            <p className="text-center font-mono">
              &gt; Select an article to read
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
