import { posicionPorSlug, registrarCandidatura, registrarEspontanea } from "../services/careersApi";
import { CARPETA_ESPONTANEAS, preguntasEspontanea } from "./espontanea";

/**
 * Adónde va una candidatura: a una oferta concreta o a la lista de
 * candidaturas espontáneas. Lo que cambia entre las dos está aquí; el resto del
 * recorrido (validar, Drive, reintentos) es el mismo en /api/careers/apply.
 *
 * - `carpeta`: subcarpeta de la unidad compartida donde va la del candidato.
 * - `titulo` y `referencia`: la cabecera de respuestas.md.
 * - `preguntas`: las que hay que validar, en el idioma del formulario.
 * - `consentimientoObligatorio`: una candidatura espontánea solo tiene
 *   sentido si se conserva, así que su casilla no es opcional.
 * - `registrar`: la llamada a Advia OS.
 */

/** La oferta abierta con ese slug, o null si no existe o ya se cerró. */
export async function destinoOferta(slug, locale) {
  const posicion = await posicionPorSlug(slug);
  if (!posicion) return null;
  const textos = posicion[locale] || posicion.es;
  return {
    carpeta: posicion.slug,
    titulo: textos.title,
    referencia: posicion.slug,
    preguntas: textos.questions || [],
    consentimientoObligatorio: false,
    registrar: (base) => registrarCandidatura({ ...base, positionSlug: posicion.slug }),
  };
}

export function destinoEspontanea(locale) {
  return {
    carpeta: CARPETA_ESPONTANEAS,
    titulo: locale === "en" ? "Open application" : "Candidatura espontánea",
    referencia: "espontanea",
    preguntas: preguntasEspontanea(locale),
    consentimientoObligatorio: true,
    registrar: (base) => registrarEspontanea(base),
  };
}
