import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-secondary mb-6 font-mono text-2xl">
          Page Not Found
        </h2>
        <p className="text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
