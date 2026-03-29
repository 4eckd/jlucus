'use client'

import type { BlogPost } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag } from 'lucide-react'

interface PostCardProps {
  post: BlogPost
  index?: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
}

const hoverVariants = {
  hover: {
    y: -4,
    transition: { duration: 0.2 },
  },
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      variants={cardVariants}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          className="relative overflow-hidden rounded-lg border p-6 transition-all duration-300"
          style={{
            borderColor: `rgb(var(--color-primary) / 0.2)`,
            backgroundColor: `rgb(var(--color-bg-secondary))`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.5)`;
            e.currentTarget.style.backgroundColor = `rgb(var(--color-bg-tertiary))`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.2)`;
            e.currentTarget.style.backgroundColor = `rgb(var(--color-bg-secondary))`;
          }}
        >
          {/* Neon glow effect on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
            style={{
              background: `linear-gradient(to right, rgb(var(--color-primary) / 0), rgb(var(--color-primary) / 0), rgb(var(--color-accent) / 0))`,
            }}
          />

          <div className="relative z-10 space-y-4">
            {/* Header with category */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3
                  className="font-mono text-xl font-bold transition-colors"
                  style={{ color: `rgb(var(--color-primary))` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = `rgb(var(--color-accent))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `rgb(var(--color-primary))`;
                  }}
                >
                  {post.title}
                </h3>
              </div>
              <span
                className="shrink-0 rounded px-3 py-1 font-mono text-sm transition-all"
                style={{
                  color: `rgb(var(--color-primary))`,
                  backgroundColor: `rgb(var(--color-primary) / 0.1)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgb(var(--color-primary) / 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `rgb(var(--color-primary) / 0.1)`;
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Excerpt */}
            <p
              className="line-clamp-2 leading-relaxed"
              style={{ color: `rgb(var(--color-text-secondary))` }}
            >
              {post.excerpt}
            </p>

            {/* Meta information */}
            <div
              className="flex flex-wrap items-center gap-4 text-sm"
              style={{ color: `rgb(var(--color-text-tertiary))` }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" style={{ color: `rgb(var(--color-primary) / 0.6)` }} />
                <time>{new Date(post.date).toLocaleDateString()}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: `rgb(var(--color-primary) / 0.6)` }} />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded px-2 py-1 font-mono text-xs transition-colors"
                  style={{
                    color: `rgb(var(--color-primary) / 0.7)`,
                    backgroundColor: `rgb(var(--color-bg-tertiary))`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = `rgb(var(--color-accent))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `rgb(var(--color-primary) / 0.7)`;
                  }}
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span style={{ color: `rgb(var(--color-text-muted))` }} className="text-xs">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Read more link */}
            <div className="pt-2">
              <span
                className="inline-flex items-center gap-2 font-mono text-sm transition-transform"
                style={{ color: `rgb(var(--color-primary))` }}
              >
                Read article
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
