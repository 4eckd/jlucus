import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Daily Learning Blog',
  description: 'Daily insights and learnings about web development, design, and technology.',
  openGraph: {
    title: 'Daily Learning Blog',
    description: 'Daily insights and learnings about web development, design, and technology.',
    type: 'website',
    url: `${SITE.url}/blog`,
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="space-y-8 py-12">
        <div className="space-y-4 text-center">
          <h1 className="font-mono text-4xl font-bold text-cyan-300 md:text-5xl">
            Daily Learning
          </h1>
          <p className="mx-auto max-w-2xl text-text-secondary">
            Chronicles of learning, experimentation, and insights from the intersection of
            development and design.
          </p>
        </div>

        <div className="relative h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0" />
      </div>

      {children}
    </div>
  )
}
