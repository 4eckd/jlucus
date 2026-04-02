import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Learning - jlucus.dev',
  description:
    'Responsive RSS feed for daily learning with optimized layouts for every device.',
  openGraph: {
    title: 'Daily Learning - jlucus.dev',
    description:
      'Responsive RSS feed for daily learning with optimized layouts for every device.',
    url: 'https://jlucus.dev/daily-learning',
    type: 'website',
  },
};

export default function DailyLearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen w-full">{children}</div>;
}
