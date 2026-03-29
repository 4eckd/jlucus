import { getSortedBlogPosts } from '@/data/blog-posts'
import { SITE } from '@/lib/constants'

export async function GET() {
  const posts = getSortedBlogPosts()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.title} - Daily Learning</title>
    <link>${SITE.url}/blog</link>
    <description>Daily insights and learnings about web development, design, and technology.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/api/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE.url}/blog/${post.slug}</link>
      <guid>${SITE.url}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[
${post.content}
      ]]></content:encoded>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>contact@jlucus.dev (${post.author})</author>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}
