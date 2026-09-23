import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";

/**
 * Las traducciones que necesita una ruta, listas para meter en `props`.
 *
 * `common` va siempre: es el nav, el footer, el aviso de cookies y las piezas
 * que comparten varias páginas. Cada página añade su propio namespace, y así
 * cada ruta solo carga el JSON que va a pintar.
 */
export async function traducciones(locale, ...namespaces) {
  return serverSideTranslations(locale || "es", ["common", ...namespaces], nextI18NextConfig);
}
