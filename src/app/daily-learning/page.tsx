'use client'

import { getSortedBlogPosts } from '@/data/blog-posts'
import { ResponsiveRSSLayout } from '@/components/rss'

export default function DailyLearningPage() {
  const posts = getSortedBlogPosts()

  return (
    <ResponsiveRSSLayout
      posts={posts}
    />
  )
}
