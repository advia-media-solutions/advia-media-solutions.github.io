/**
 * El `respuestas.md` que acompaña al CV en la carpeta de Drive: todo lo que
 * envió el candidato, legible por una persona. Es la copia de referencia de
 * los consentimientos, así que lleva la versión del aviso de privacidad y la
 * fecha y hora exactas.
 */
export function respuestasMd({ datos, posicion, locale, versionAviso, fecha }) {
  const titulo = (posicion[locale] || posicion.es).title;
  const talentPool = datos.talentPool ? `sí, desde ${fecha.toISOString()}` : "no";
  const lineas = [
    `# ${datos.fullName} · ${titulo}`,
    "",
    `- **Posición:** ${titulo} (\`${posicion.slug}\`)`,
    `- **Email:** ${datos.email}`,
    `- **Teléfono:** ${datos.phone || "—"}`,
    `- **LinkedIn:** ${datos.linkedin || "—"}`,
    `- **Idioma del formulario:** ${locale}`,
    `- **Enviada:** ${fecha.toISOString()}`,
    `- **Talent pool (24 meses):** ${talentPool}`,
    `- **Aviso de privacidad aceptado:** ${versionAviso}`,
  ];
  for (const r of datos.respuestas) {
    lineas.push("", `## ${r.pregunta}`, `<!-- ${r.id} -->`, "", r.respuesta || "—");
  }
  return `${lineas.join("\n")}\n`;
}
