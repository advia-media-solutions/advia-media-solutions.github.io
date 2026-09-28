/**
 * La candidatura espontánea: para quien no encaja en ninguna oferta abierta.
 *
 * Sus dos preguntas son fijas y viven aquí, en los dos idiomas, porque las
 * usan el formulario (para pintarlas) y el servidor (para validarlas y
 * copiarlas en respuestas.md). Se guardan en Drive bajo su propia carpeta, y
 * en Advia OS van a su propia lista, no al Kanban de ninguna posición.
 */

export const RUTA_ESPONTANEA = "/careers/open-application";
export const CARPETA_ESPONTANEAS = "candidaturas-espontaneas";

const PREGUNTAS = [
  {
    id: "por_que_advia",
    label: {
      es: "¿Por qué quieres trabajar con nosotros?",
      en: "Why do you want to work with us?",
    },
    required: true,
  },
  {
    id: "que_aportarias",
    label: { es: "¿Qué podrías aportar?", en: "What could you bring?" },
    required: true,
  },
];

/** Las preguntas en el idioma de la página, con la misma forma que las de Advia OS. */
export function preguntasEspontanea(locale) {
  return PREGUNTAS.map((p) => ({
    id: p.id,
    label: p.label[locale] || p.label.es,
    required: p.required,
  }));
}
