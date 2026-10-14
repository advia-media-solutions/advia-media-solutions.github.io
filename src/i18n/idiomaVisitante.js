/**
 * Qué idioma toca a quien entra por la portada.
 *
 * Solo manda la elección explícita: la cookie `NEXT_LOCALE`, que escribe el
 * conmutador. El idioma del navegador no cuenta: cada URL sirve siempre su
 * idioma, que es lo que declaran las etiquetas hreflang, y así la ven igual un
 * visitante nuevo, Googlebot (que no manda Accept-Language) o un bot de IA que
 * pida inglés. Sin cookie devuelve null y no se redirige.
 */
export const COOKIE_IDIOMA = "NEXT_LOCALE";
export const IDIOMAS = ["es", "en"];

export function idiomaElegido(cookie) {
  return IDIOMAS.includes(cookie) ? cookie : null;
}
