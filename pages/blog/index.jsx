import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import { articulosPortada } from "../../src/services/listados";
import { REFRESCO_BLOG_S } from "../../src/services/blogApi";
import BlogHome from "../../src/pages/v4/blog/BlogHome";

export default function BlogIndexPage(props) {
  return <BlogHome {...props} />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
BlogIndexPage.v4 = true;

/* Se sirve desde caché y se regenera cada REFRESCO_BLOG_S, como las páginas de
   producto: generarla en cada petición la hacía varias veces más lenta. Si el
   CMS falla al regenerar, se lanza el error y Next sigue sirviendo la última
   versión buena en vez de un blog vacío. */
export async function getStaticProps({ locale }) {
  const [comunes, lista] = await Promise.all([traducciones(locale, "blog"), articulosPortada()]);
  if (lista.error) throw new Error(lista.error);
  return { props: { ...comunes, ...lista }, revalidate: REFRESCO_BLOG_S };
}
