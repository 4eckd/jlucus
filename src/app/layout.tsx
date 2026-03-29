import '@/styles/globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/constants';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClientLayout } from '@/components/layout/client-layout';

export const metadata: Metadata = {
  title: {
    default: 'jlucus.dev — launching soon',
    template: '%s · jlucus.dev',
  },
  description: SITE.description,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'jlucus.dev — launching soon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@jlucus',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-sans bg-background text-primary">
        <ClientLayout />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
