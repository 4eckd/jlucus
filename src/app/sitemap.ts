import type { MetadataRoute } from 'next';
import { SITE, NAVIGATION_SECTIONS } from '@/lib/constants';
import { getSortedBlogPosts } from '@/data/blog-posts';

/**
 * Generates sitemap.xml for SEO and search engine indexing
 * Next.js 15+ automatically generates sitemap at /sitemap.xml
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const currentDate = new Date();

  // Main pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Add navigation sections as anchors
  // These help search engines understand the page structure
  NAVIGATION_SECTIONS.forEach((section) => {
    routes.push({
      url: `${baseUrl}#${section.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add blog posts
  const blogPosts = getSortedBlogPosts();
  blogPosts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
