/**
 * Dos idiomas, y el español manda: la web se sirve en castellano sin prefijo y
 * en inglés bajo /en. Sin detección automática a propósito: quien llega a
 * advia.tech ve la versión española y elige la inglesa con el conmutador del
 * nav. Redirigir por Accept-Language rompe los enlaces compartidos y confunde a
 * los crawlers, que es justo lo que vendemos que no pase.
 */
module.exports = {
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    localeDetection: false,
  },
  /* En desarrollo se recargan los JSON sin reiniciar el servidor. */
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
