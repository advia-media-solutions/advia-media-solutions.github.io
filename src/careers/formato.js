/**
 * Piezas de presentación de una posición que no dependen del componente:
 * el resumen que viaja al navegador, el rango salarial y la agrupación por
 * equipo del listado.
 */

/**
 * Lo que el listado necesita de una posición, en el idioma de la página. La
 * descripción completa no viaja: pesa y solo la usa la ficha.
 */
export function resumenPosicion(posicion, locale) {
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
    title: textos.title,
    summary: textos.summary || null,
  };
}

/** «40.000 € – 50.000 €» en castellano, «€40,000 – €50,000» en inglés. */
export function rangoSalarial({ salaryMin, salaryMax, salaryCurrency }, locale) {
  const formato = new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES", {
    style: "currency",
    currency: salaryCurrency,
    maximumFractionDigits: 0,
  });
  if (salaryMin === salaryMax) return formato.format(salaryMin);
  return `${formato.format(salaryMin)} – ${formato.format(salaryMax)}`;
}

/** Agrupa por equipo respetando el orden en que llegan de Advia OS. */
export function porEquipo(posiciones) {
  const grupos = new Map();
  for (const posicion of posiciones) {
    const equipo = posicion.team || "";
    if (!grupos.has(equipo)) grupos.set(equipo, []);
    grupos.get(equipo).push(posicion);
  }
  return [...grupos].map(([equipo, items]) => ({ equipo, items }));
}
