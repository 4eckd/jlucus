'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import type { BlogPost } from '@/types'

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="space-y-8">
      {/* Navigation */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-sm transition-all hover:gap-3"
        style={{ color: `rgb(var(--color-primary))` }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = `rgb(var(--color-accent))`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = `rgb(var(--color-primary))`;
        }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to articles
      </Link>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <h1 className="font-mono text-4xl font-bold md:text-5xl" style={{ color: `rgb(var(--color-primary))` }}>
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: `rgb(var(--color-text-secondary))` }}>
            {post.excerpt}
          </p>
        </div>

        {/* Meta Information */}
        <div
          className="flex flex-wrap items-center gap-6 border-y py-6"
          style={{
            borderColor: `rgb(var(--color-primary) / 0.1)`,
          }}
        >
          <div className="flex items-center gap-2 text-sm" style={{ color: `rgb(var(--color-text-secondary))` }}>
            <User className="h-4 w-4" style={{ color: `rgb(var(--color-primary))` }} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: `rgb(var(--color-text-secondary))` }}>
            <Calendar className="h-4 w-4" style={{ color: `rgb(var(--color-primary))` }} />
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: `rgb(var(--color-text-secondary))` }}>
            <Clock className="h-4 w-4" style={{ color: `rgb(var(--color-primary))` }} />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="ml-auto">
            <span
              className="rounded px-3 py-1 font-mono text-sm"
              style={{
                color: `rgb(var(--color-primary))`,
                backgroundColor: `rgb(var(--color-primary) / 0.1)`,
              }}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 font-mono text-sm transition-colors"
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
              #{tag}
            </span>
          ))}
        </div>
      </motion.header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="prose prose-invert max-w-none space-y-6"
      >
        <div className="space-y-6" style={{ color: `rgb(var(--color-text-primary))` }}>
          {post.content.split('\n\n').map((paragraph, i) => (
            <div key={i} className="leading-relaxed">
              {paragraph.startsWith('#') ? (
                <div className="space-y-2">
                  {paragraph.split('\n').map((line, j) => {
                    const headingLevel = line.match(/^#+/)?.[0]?.length || 1
                    const content = line.replace(/^#+\s/, '')

                    if (line.startsWith('#')) {
                      const baseSizeMap = {
                        1: '1.875rem',
                        2: '1.5rem',
                        3: '1.25rem',
                        4: '1.125rem',
                      }
                      const fontSize = baseSizeMap[headingLevel as keyof typeof baseSizeMap] || '1rem'

                      return (
                        <h2
                          key={j}
                          className="font-mono font-bold"
                          style={{
                            fontSize,
                            color: `rgb(var(--color-primary))`,
                          }}
                        >
                          {content}
                        </h2>
                      )
                    }
                    return null
                  })}
                </div>
              ) : paragraph.startsWith('```') ? (
                <pre
                  className="overflow-x-auto rounded-lg p-4 font-mono text-sm"
                  style={{
                    backgroundColor: `rgb(var(--color-bg-tertiary))`,
                    color: `rgb(var(--color-primary))`,
                  }}
                >
                  <code>{paragraph.replace(/```/g, '')}</code>
                </pre>
              ) : paragraph.startsWith('-') ? (
                <ul className="space-y-2 pl-6" style={{ color: `rgb(var(--color-text-secondary))` }}>
                  {paragraph.split('\n').map((item, j) => (
                    <li key={j} className="list-disc">
                      {item.replace(/^-\s/, '')}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: `rgb(var(--color-text-secondary))` }}>{paragraph}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer with navigation */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-6 pt-8"
        style={{
          borderTop: `1px solid rgb(var(--color-primary) / 0.1)`,
        }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded px-4 py-2 font-mono text-sm transition-all"
          style={{
            color: `rgb(var(--color-primary))`,
            borderColor: `rgb(var(--color-primary) / 0.2)`,
            border: `1px solid rgb(var(--color-primary) / 0.2)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.5)`;
            e.currentTarget.style.backgroundColor = `rgb(var(--color-bg-secondary))`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `rgb(var(--color-primary) / 0.2)`;
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
      </motion.footer>
    </article>
  )
}
