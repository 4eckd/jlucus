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
        <div className="relative overflow-hidden rounded-lg border border-cyan-500/20 bg-dark-800 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-dark-700">
          {/* Neon glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-magenta-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

          <div className="relative z-10 space-y-4">
            {/* Header with category */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-mono text-xl font-bold text-cyan-300 transition-colors group-hover:text-magenta-400">
                  {post.title}
                </h3>
              </div>
              <span className="shrink-0 rounded bg-cyan-500/10 px-3 py-1 font-mono text-sm text-cyan-400 group-hover:bg-cyan-500/20">
                {post.category}
              </span>
            </div>

            {/* Excerpt */}
            <p className="line-clamp-2 text-text-secondary leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-400/60" />
                <time>{new Date(post.date).toLocaleDateString()}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400/60" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded bg-dark-700 px-2 py-1 font-mono text-xs text-cyan-400/70 hover:text-magenta-400"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-text-muted">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Read more link */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 font-mono text-sm text-cyan-400 transition-transform group-hover:translate-x-1">
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
