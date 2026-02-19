import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REDIRECT_TARGET = 'https://formerlyincarcerated.org';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const targetUrl = `${REDIRECT_TARGET}${pathname}${search}`;

  return NextResponse.redirect(targetUrl, { status: 308 });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for Next.js internals:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
