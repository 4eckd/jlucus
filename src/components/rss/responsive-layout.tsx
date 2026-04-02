'use client'

import { useState, useEffect } from 'react'
import { MobileRSSLayout } from './mobile-layout'
import { DesktopRSSLayout } from './desktop-layout'
import { TabletRSSLayout } from './tablet-layout'
import { WideRSSLayout } from './wide-layout'
import type { BlogPost } from '@/types'

interface ResponsiveRSSLayoutProps {
  posts: BlogPost[]
  onPostSelect?: (post: BlogPost) => void
}

type ViewportType = 'mobile' | 'tablet' | 'desktop' | 'wide' | undefined

export function ResponsiveRSSLayout({ posts, onPostSelect }: ResponsiveRSSLayoutProps) {
  const [viewport, setViewport] = useState<ViewportType>(undefined)

  useEffect(() => {
    const detectViewport = () => {
      const width = window.innerWidth

      // Detect based on width and aspect ratio
      if (width <= 720) {
        setViewport('mobile') // 720x1280
      } else if (width <= 1080) {
        setViewport('tablet') // 1080x1920
      } else if (width <= 1440) {
        setViewport('desktop') // 1920x1080
      } else {
        setViewport('wide') // 1440x2360+
      }
    }

    detectViewport()
    window.addEventListener('resize', detectViewport)
    return () => window.removeEventListener('resize', detectViewport)
  }, [])

  // Render nothing on server, will hydrate on client
  if (!viewport) return null

  switch (viewport) {
    case 'mobile':
      return <MobileRSSLayout posts={posts} onPostSelect={onPostSelect} />
    case 'tablet':
      return <TabletRSSLayout posts={posts} onPostSelect={onPostSelect} />
    case 'wide':
      return <WideRSSLayout posts={posts} onPostSelect={onPostSelect} />
    case 'desktop':
    default:
      return <DesktopRSSLayout posts={posts} onPostSelect={onPostSelect} />
  }
}
