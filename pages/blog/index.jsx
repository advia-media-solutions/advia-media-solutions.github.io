import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import { articulosPortada } from "../../src/services/listados";
import BlogHome from "../../src/pages/v4/blog/BlogHome";

export default function BlogIndexPage(props) {
  return <BlogHome {...props} />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
BlogIndexPage.v4 = true;

/* Los artículos se resuelven aquí: el HTML servido ya lleva la lista. */
export async function getServerSideProps({ locale }) {
  const [comunes, lista] = await Promise.all([traducciones(locale, "blog"), articulosPortada()]);
  return { props: { ...comunes, ...lista } };
}
