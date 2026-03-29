'use client'

import type { BlogPost } from '@/types'
import { PostCard } from './post-card'

interface PostListProps {
  posts: BlogPost[]
  emptyMessage?: string
}

export function PostList({
  posts,
  emptyMessage = 'No blog posts found.',
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-lg border border-cyan-500/20 bg-dark-800/50">
        <p className="text-center text-text-secondary">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  )
}
