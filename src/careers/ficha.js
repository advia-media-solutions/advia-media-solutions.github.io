import sanitizeHtml from "sanitize-html";

/**
 * Preparación de la ficha de una posición, solo en servidor (getServerSideProps):
 * la posición en el idioma de la página, con la descripción saneada.
 * sanitize-html pesa: este módulo no debe importarse desde un componente.
 */

/* La descripción viene del editor de texto enriquecido de Advia OS: solo se
   deja pasar el formato de un texto, nunca scripts, estilos ni iframes. */
const PERMITIDO = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h2", "h3", "h4",
    "blockquote", "a"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
  },
};

export function descripcionSegura(html) {
  return sanitizeHtml(html || "", PERMITIDO);
}

/** La posición en el idioma de la página, lista para las props. */
export function fichaPosicion(posicion, locale) {
  const textos = posicion[locale] || posicion.es;
  return {
    slug: posicion.slug,
    team: posicion.team || null,
    location: posicion.location || null,
    workMode: posicion.workMode || null,
    employmentType: posicion.employmentType || null,
    salaryMin: posicion.salaryMin,
    salaryMax: posicion.salaryMax,
    salaryCurrency: posicion.salaryCurrency,
    openedAt: posicion.openedAt || null,
    title: textos.title,
    summary: textos.summary || null,
    descriptionHtml: descripcionSegura(textos.descriptionHtml),
    questions: textos.questions || [],
  };
}
