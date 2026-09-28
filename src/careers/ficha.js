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

/**
 * La descripción lista para pintar. Además de sanear, arregla dos costumbres
 * del editor de Advia OS: deja párrafos vacíos como separador, y los
 * subtítulos («Condiciones», «Entorno») llegan como un párrafo entero en
 * negrita. Los vacíos se quitan y esos párrafos pasan a h3.
 */
export function descripcionSegura(html) {
  return sanitizeHtml(html || "", PERMITIDO)
    .replace(/<p>\s*<\/p>/g, "")
    /* Solo párrafos sueltos: un punto de lista entero en negrita se queda. */
    .replace(/(?<!<li>)<p><(strong|b)>([^<]+)<\/\1><\/p>/g, "<h3>$2</h3>");
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
    openedAt: posicion.openedAt || null,
    title: textos.title,
    summary: textos.summary || null,
    descriptionHtml: descripcionSegura(textos.descriptionHtml),
    questions: textos.questions || [],
  };
}
