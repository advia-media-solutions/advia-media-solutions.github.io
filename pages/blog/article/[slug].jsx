import React from "react";
import { traducciones } from "../../../src/i18n/servidor";
import { blogApiService, REFRESCO_BLOG_S } from "../../../src/services/blogApi";
import BlogArticulo from "../../../src/pages/v4/blog/BlogArticulo";

export default function BlogArticlePage(props) {
  return <BlogArticulo {...props} />;
}

BlogArticlePage.v4 = true;

/* Ningún artículo se genera en el build: cada uno se genera la primera vez que
   se pide y desde ahí se sirve desde caché. Así el build no depende del CMS. */
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

/**
 * Si el artículo no existe, 404 (y se vuelve a mirar pasado REFRESCO_BLOG_S,
 * por si se publica después). Si el CMS falla, se lanza el error: al
 * regenerar, Next sigue sirviendo la última versión buena del artículo; si
 * nunca se había generado, responde 500 y el crawler vuelve más tarde.
 */
export async function getStaticProps({ params, locale }) {
  const [comunes, articulo] = await Promise.all([
    traducciones(locale, "blog"),
    blogApiService.getArticleBySlug(params.slug),
  ]);
  if (!articulo) return { notFound: true, revalidate: REFRESCO_BLOG_S };
  return { props: { ...comunes, articulo }, revalidate: REFRESCO_BLOG_S };
}
