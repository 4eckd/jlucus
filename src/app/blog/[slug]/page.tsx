import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getSortedBlogPosts } from '@/data/blog-posts'
import { SITE } from '@/lib/constants'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  }
}

export async function generateStaticParams() {
  const posts = getSortedBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="space-y-8">
      {/* Navigation */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-sm text-cyan-400 transition-all hover:gap-3 hover:text-magenta-400"
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
          <h1 className="font-mono text-4xl font-bold text-cyan-300 md:text-5xl">
            {post.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 border-y border-cyan-500/10 py-6">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <User className="h-4 w-4 text-cyan-400" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="ml-auto">
            <span className="rounded bg-cyan-500/10 px-3 py-1 font-mono text-sm text-cyan-400">
              {post.category}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-dark-700 px-3 py-1 font-mono text-sm text-cyan-400/70 hover:text-magenta-400"
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
        <div className="space-y-6 text-text-primary">
          {post.content.split('\n\n').map((paragraph, i) => (
            <div key={i} className="leading-relaxed">
              {paragraph.startsWith('#') ? (
                <div className="space-y-2">
                  {paragraph.split('\n').map((line, j) => {
                    const headingLevel = line.match(/^#+/)?.[0]?.length || 1
                    const content = line.replace(/^#+\s/, '')

                    if (line.startsWith('#')) {
                      const baseSize = {
                        1: 'text-3xl',
                        2: 'text-2xl',
                        3: 'text-xl',
                        4: 'text-lg',
                      }[headingLevel] || 'text-base'

                      return (
                        <h2
                          key={j}
                          className={`${baseSize} font-mono font-bold text-cyan-300`}
                        >
                          {content}
                        </h2>
                      )
                    }
                    return null
                  })}
                </div>
              ) : paragraph.startsWith('```') ? (
                <pre className="overflow-x-auto rounded-lg bg-dark-700 p-4 font-mono text-sm text-cyan-200">
                  <code>{paragraph.replace(/```/g, '')}</code>
                </pre>
              ) : paragraph.startsWith('-') ? (
                <ul className="space-y-2 pl-6">
                  {paragraph.split('\n').map((item, j) => (
                    <li
                      key={j}
                      className="list-disc text-text-secondary"
                    >
                      {item.replace(/^-\s/, '')}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-secondary">{paragraph}</p>
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
        className="space-y-6 border-t border-cyan-500/10 pt-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded border border-cyan-500/20 px-4 py-2 font-mono text-sm text-cyan-400 transition-all hover:border-cyan-500/50 hover:bg-dark-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
      </motion.footer>
    </article>
  )
}
