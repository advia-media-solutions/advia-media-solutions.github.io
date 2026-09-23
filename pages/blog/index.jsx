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

/* Los artículos se resuelven aquí: el HTML servido ya lleva la lista. Si el CMS
   falla, la página sale con su aviso pero con 503, para que Google no indexe un
   blog vacío. */
export async function getServerSideProps({ locale, res }) {
  const [comunes, lista] = await Promise.all([traducciones(locale, "blog"), articulosPortada()]);
  if (lista.error) res.statusCode = 503;
  return { props: { ...comunes, ...lista } };
}
