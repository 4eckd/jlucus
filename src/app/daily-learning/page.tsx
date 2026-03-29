'use client'

import { useState } from 'react'
import { getSortedBlogPosts } from '@/data/blog-posts'
import { ResponsiveRSSLayout } from '@/components/rss'
import type { BlogPost } from '@/types'

export default function DailyLearningPage() {
  const posts = getSortedBlogPosts()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post)
  }

  return (
    <ResponsiveRSSLayout
      posts={posts}
      onPostSelect={handlePostSelect}
    />
  )
}
