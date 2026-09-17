import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import { articulosPagina, paginaDe } from "../../src/services/listados";
import BlogArticulos from "../../src/pages/v4/blog/BlogArticulos";

export default function BlogArticles(props) {
  return <BlogArticulos {...props} />;
}

BlogArticles.v4 = true;

/* La página va en la URL (?page=n) y cada una se sirve entera. */
export async function getServerSideProps({ locale, query }) {
  const [comunes, lista] = await Promise.all([
    traducciones(locale, "blog"),
    articulosPagina(paginaDe(query)),
  ]);
  return { props: { ...comunes, ...lista } };
}
