import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Daily Learning Blog',
  description:
    'Daily insights and learnings about web development, design, and technology.',
  openGraph: {
    title: 'Daily Learning Blog',
    description:
      'Daily insights and learnings about web development, design, and technology.',
    type: 'website',
    url: `${SITE.url}/blog`,
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="space-y-8 py-12">
        <div className="space-y-4 text-center">
          <h1
            className="font-mono text-4xl font-bold md:text-5xl"
            style={{ color: `rgb(var(--color-primary))` }}
          >
            Daily Learning
          </h1>
          <p
            className="mx-auto max-w-2xl"
            style={{ color: `rgb(var(--color-text-secondary))` }}
          >
            Chronicles of learning, experimentation, and insights from the
            intersection of development and design.
          </p>
        </div>

        <div
          className="relative h-px"
          style={{
            background: `linear-gradient(to right, rgb(var(--color-primary) / 0), rgb(var(--color-primary) / 0.3), rgb(var(--color-primary) / 0))`,
          }}
        />
      </div>

      {children}
    </div>
  );
}
