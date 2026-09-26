/**
 * Interruptor de lanzamiento de /careers.
 *
 * Mientras esté apagado la página existe y funciona en producción, pero nadie
 * llega a ella por accidente: lleva `noindex`, no entra en el sitemap, no emite
 * `JobPosting` y ninguna página la enlaza. Encenderlo es solo una parte del
 * lanzamiento; el resto está en el checklist «Careers: checklist de
 * lanzamiento».
 */
export const CAREERS_PUBLISHED = false;

/**
 * Versión del aviso de privacidad que se muestra junto al formulario. Se
 * guarda con cada candidatura: si el texto cambia, cambia también esta
 * versión.
 */
export const VERSION_AVISO_PRIVACIDAD = "candidatos-2026-09";
