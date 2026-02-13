import '@/styles/globals.css';
import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClientLayout } from '@/components/layout/client-layout';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  metadataBase: new URL(SITE.url),
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
  children: React.ReactNode;
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
