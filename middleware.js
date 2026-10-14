import { NextResponse } from 'next/server';
import { COOKIE_IDIOMA, idiomaElegido } from './src/i18n/idiomaVisitante';

const TRACKING_URL =
  'https://events.advia.tech/v1/track?data=CVCOI8JqG7mgGLN0b9ti83DG2fsA3PoeRGhIuWbGbvx5UoAE6XlDVglr4ry6U8Up5YU89o5HBbGmYZggdtQ0PMhBp4fYA5n8NfgChWcYNW0XQzPp8rSmK93JArr4wXD1CWdhs5Ra51L9Gs1gSjnQ9zXH4gkVEb8w.f7ad68aa';

/**
 * Solo la portada recuerda el idioma que el visitante eligió con el
 * conmutador: una URL profunda compartida se abre en el idioma en que se
 * compartió, y los artículos del blog solo existen en castellano. Las
 * peticiones de datos de la navegación en cliente no se tocan.
 */
function redireccionIdioma(request) {
  const { nextUrl, headers, cookies } = request;
  if (nextUrl.pathname !== '/' || headers.has('x-nextjs-data')) return null;
  const idioma = idiomaElegido(cookies.get(COOKIE_IDIOMA)?.value);
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

/**
 * Una sola URL por página. El castellano va sin prefijo, pero Next también lo
 * sirve con 200 bajo /es: /es/technology duplicaba /technology. Se manda a la
 * URL sin prefijo con un 301. Solo se ve el prefijo porque next.config.js
 * desactiva la normalización de la URL en el middleware.
 */
const PREFIJO_IDIOMA_DEFECTO = '/es';

/** La ruta sin /es delante, o null si no lo lleva. */
function sinPrefijoDefecto(ruta) {
  if (ruta === PREFIJO_IDIOMA_DEFECTO) return '/';
  if (ruta.startsWith(`${PREFIJO_IDIOMA_DEFECTO}/`)) {
    return ruta.slice(PREFIJO_IDIOMA_DEFECTO.length);
  }
  return null;
}

function redireccionPrefijoDefecto(request) {
  const destino = new URL(request.url);
  const ruta = sinPrefijoDefecto(destino.pathname);
  if (!ruta) return null;
  destino.pathname = ruta;
  return NextResponse.redirect(destino, 301);
}

/**
 * La navegación en cliente pide /_next/data/<build>/<idioma>/<ruta>.json, y sin
 * la normalización llega así al middleware. El tracking cuenta la página.
 */
const RUTA_DATOS = /^\/_next\/data\/[^/]+(\/.+)\.json$/;

function urlDePagina(request) {
  const url = new URL(request.url);
  const datos = url.pathname.match(RUTA_DATOS);
  if (!datos) return request.url;
  url.pathname = sinPrefijoDefecto(datos[1]) ?? datos[1];
  return url.toString();
}

export function middleware(request) {
  const aHostCanonico = redireccionHost(request);
  if (aHostCanonico) return aHostCanonico;

  const sinPrefijo = redireccionPrefijoDefecto(request);
  if (sinPrefijo) return sinPrefijo;

  const userAgent = request.headers.get('user-agent') || '';
  const requestedUrl = urlDePagina(request);

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
  /* La portada depende de la cookie: ninguna caché puede servir la de un
     visitante a otro. */
  if (request.nextUrl.pathname === '/') respuesta.headers.set('Vary', 'Cookie');
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
