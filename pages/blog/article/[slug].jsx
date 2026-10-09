import React from "react";
import { traducciones } from "../../../src/i18n/servidor";
import { blogApiService, REFRESCO_BLOG_S } from "../../../src/services/blogApi";
import { conImagenEstable } from "../../../src/services/imagenesBlog";
import BlogArticulo from "../../../src/pages/v4/blog/BlogArticulo";

export default function BlogArticlePage(props) {
  return <BlogArticulo {...props} />;
}

BlogArticlePage.v4 = true;

/* Todos los artículos se generan en el build, en los dos idiomas, y viajan en
   la imagen: cada instancia nueva de Cloud Run los sirve al momento, sin
   generarlos en la primera visita. Los publicados después del despliegue se
   generan la primera vez que se piden (fallback). Si el CMS falla, falla el
   build, igual que con /blog. */
export async function getStaticPaths({ locales }) {
  const slugs = await blogApiService.getAllSlugs();
  const paths = slugs.flatMap((slug) => locales.map((locale) => ({ params: { slug }, locale })));
  return { paths, fallback: "blocking" };
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
  return { props: { ...comunes, articulo: conImagenEstable(articulo) }, revalidate: REFRESCO_BLOG_S };
}
