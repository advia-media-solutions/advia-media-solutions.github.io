/**
 * Dos idiomas: castellano sin prefijo e inglés bajo /en. La detección de Next
 * va apagada: cada URL sirve siempre su idioma, pida lo que pida el navegador.
 * Solo middleware.js redirige la portada, y solo con la cookie del conmutador.
 */
module.exports = {
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    localeDetection: false,
  },
  /* Sin idioma de reserva: por defecto next-i18next cae al español y mete sus
     JSON también en cada página /en, el doble de traducciones en el HTML. Los
     diccionarios en inglés están completos; si falta una clave, se verá. */
  fallbackLng: false,
  /* En desarrollo se recargan los JSON sin reiniciar el servidor. */
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
