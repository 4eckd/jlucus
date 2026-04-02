'use client';

import type { BlogPost } from '@/types';
import { PostCard } from './post-card';

interface PostListProps {
  posts: BlogPost[];
  emptyMessage?: string;
}

export function PostList({
  posts,
  emptyMessage = 'No blog posts found.',
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div
        className="flex min-h-96 items-center justify-center rounded-lg border"
        style={{
          borderColor: `rgb(var(--color-primary) / 0.2)`,
          backgroundColor: `rgb(var(--color-bg-secondary) / 0.5)`,
        }}
      >
        <p
          className="text-center"
          style={{ color: `rgb(var(--color-text-secondary))` }}
        >
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
