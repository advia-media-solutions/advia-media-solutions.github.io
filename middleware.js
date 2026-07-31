import { NextResponse } from 'next/server';

const TRACKING_URL =
  'https://events.advia.tech/v1/track?data=CVCOI8JqG7mgGLN0b9ti83DG2fsA3PoeRGhIuWbGbvx5UoAE6XlDVglr4ry6U8Up5YU89o5HBbGmYZggdtQ0PMhBp4fYA5n8NfgChWcYNW0XQzPp8rSmK93JArr4wXD1CWdhs5Ra51L9Gs1gSjnQ9zXH4gkVEb8w.f7ad68aa';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const requestedUrl = request.url;

  // Art. 21 GDPR objection to the traffic measurement described in section 15
  // of the privacy policy. The opt-out gate on events.advia.tech does not
  // cover this call: it is server-to-server and carries no browser cookie, so
  // the check has to happen here. The cookie is never forwarded upstream — the
  // whole call is suppressed, so opting out cannot itself become a signal.
  const optedOut = request.cookies.get('advia_optout')?.value === '1';

  if (!optedOut) {
    // Fire-and-forget synthetic tracking call
    fetch(TRACKING_URL, {
      headers: {
        'User-Agent': userAgent,
        Referer: requestedUrl,
      },
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/opt-out (setting a privacy choice must not emit a tracking event)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, manifest.json
     * - static asset extensions (svg, png, jpg, jpeg, gif, webp, ico, css, js)
     */
    '/((?!api/opt-out|_next/static|_next/image|favicon\\.ico|robots\\.txt|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
