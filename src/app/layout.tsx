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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@jlucus',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-background text-primary">
        <ClientLayout />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
