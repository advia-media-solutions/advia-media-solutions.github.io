/**
 * Piezas de presentación de una posición que no dependen del componente:
 * el resumen que viaja al navegador y la agrupación por equipo del listado.
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
    title: textos.title,
    summary: textos.summary || null,
  };
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
