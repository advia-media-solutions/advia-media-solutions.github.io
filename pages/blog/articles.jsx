import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import { articulosPagina, paginaDe } from "../../src/services/listados";
import BlogArticulos from "../../src/pages/v4/blog/BlogArticulos";

export default function BlogArticles(props) {
  return <BlogArticulos {...props} />;
}

BlogArticles.v4 = true;

/* La página va en la URL (?page=n) y cada una se sirve entera. Un fallo del
   CMS sale con 503 y una página más allá de la última, con 404: ninguna de las
   dos es una lista vacía que indexar. */
export async function getServerSideProps({ locale, query, res }) {
  const [comunes, lista] = await Promise.all([
    traducciones(locale, "blog"),
    articulosPagina(paginaDe(query)),
  ]);
  if (lista.error) res.statusCode = 503;
  else if (lista.pagina > lista.totalPaginas) return { notFound: true };
  return { props: { ...comunes, ...lista } };
}
