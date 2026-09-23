import { NextResponse } from 'next/server';
import { COOKIE_IDIOMA, idiomaVisitante } from './src/i18n/idiomaVisitante';

const TRACKING_URL =
  'https://events.advia.tech/v1/track?data=CVCOI8JqG7mgGLN0b9ti83DG2fsA3PoeRGhIuWbGbvx5UoAE6XlDVglr4ry6U8Up5YU89o5HBbGmYZggdtQ0PMhBp4fYA5n8NfgChWcYNW0XQzPp8rSmK93JArr4wXD1CWdhs5Ra51L9Gs1gSjnQ9zXH4gkVEb8w.f7ad68aa';

/**
 * Solo la portada se adapta al visitante: una URL profunda compartida se abre
 * en el idioma en que se compartió, y los artículos del blog solo existen en
 * castellano. Las peticiones de datos de la navegación en cliente no se tocan.
 */
function redireccionIdioma(request) {
  const { nextUrl, headers, cookies } = request;
  if (nextUrl.pathname !== '/' || headers.has('x-nextjs-data')) return null;
  const cookie = cookies.get(COOKIE_IDIOMA)?.value;
  /* Sin cookie, el navegador solo decide en la portada española: quien abre
     /en a propósito se queda en /en. */
  if (!cookie && nextUrl.locale !== 'es') return null;
  const idioma = idiomaVisitante({ cookie, acceptLanguage: headers.get('accept-language') });
  if (!idioma || idioma === nextUrl.locale) return null;
  const destino = nextUrl.clone();
  destino.locale = idioma;
  return NextResponse.redirect(destino);
}

/**
 * Un solo host. www.advia.tech servía la misma web con 200: dos copias de cada
 * página compitiendo entre sí en Google. Se manda a advia.tech con un 301, que
 * traspasa la autoridad, y antes del tracking para no contar la visita dos veces.
 */
const HOST_CANONICO = 'advia.tech';

function redireccionHost(request) {
  const host = request.headers.get('host') || '';
  if (host !== `www.${HOST_CANONICO}`) return null;
  const destino = request.nextUrl.clone();
  destino.protocol = 'https';
  destino.hostname = HOST_CANONICO;
  destino.port = '';
  return NextResponse.redirect(destino, 301);
}

export function middleware(request) {
  const aHostCanonico = redireccionHost(request);
  if (aHostCanonico) return aHostCanonico;

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

  const respuesta = redireccionIdioma(request) || NextResponse.next();
  /* La portada depende del idioma y de la cookie: ninguna caché puede servir
     la de un visitante a otro. */
  if (request.nextUrl.pathname === '/') respuesta.headers.set('Vary', 'Accept-Language, Cookie');
  return respuesta;
}

export const config = {
  matcher: [
    /* Con i18n, Next antepone el idioma al patrón de abajo y la portada (/ y
       /en) se queda fuera: hay que nombrarla aparte. */
    '/',
    /*
     * Match all request paths except:
     * - api/opt-out (setting a privacy choice must not emit a tracking event)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml, manifest.json
     * - locales (los JSON de traducción que pide el cliente al navegar)
     * - static asset extensions (svg, png, jpg, jpeg, gif, webp, ico, css, js)
     */
    '/((?!api/opt-out|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|locales/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
