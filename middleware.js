import { NextResponse } from 'next/server';

const TRACKING_URL =
  'https://events.advia.tech/v1/track?data=CVCOI8JqG7mgGLN0b9ti83DG2fsA3PoeRGhIuWbGbvx5UoAE6XlDVglr4ry6U8Up5YU89o5HBbGmYZggdtQ0PMhBp4fYA5n8NfgChWcYNW0XQzPp8rSmK93JArr4wXD1CWdhs5Ra51L9Gs1gSjnQ9zXH4gkVEb8w.f7ad68aa';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const requestedUrl = request.url;

  // Fire-and-forget synthetic tracking call
  fetch(TRACKING_URL, {
    headers: {
      'User-Agent': userAgent,
      Referer: requestedUrl,
    },
  }).catch(() => {});

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, manifest.json
     * - static asset extensions (svg, png, jpg, jpeg, gif, webp, ico, css, js)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
