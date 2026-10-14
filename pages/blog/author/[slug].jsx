import React from "react";
import { traducciones } from "../../../src/i18n/servidor";
import { blogApiService, REFRESCO_BLOG_S } from "../../../src/services/blogApi";
import { conImagenEstable } from "../../../src/services/imagenesBlog";
import BlogAutor from "../../../src/pages/v4/blog/BlogAutor";

export default function BlogAuthorPage(props) {
  return <BlogAutor {...props} />;
}

BlogAuthorPage.v4 = true;

/* Igual que los artículos: todos los autores con slug se generan en el build,
   en los dos idiomas, y los que se den de alta después, en su primera visita. */
export async function getStaticPaths({ locales }) {
  const slugs = await blogApiService.getAllAuthorSlugs();
  const paths = slugs.flatMap((slug) => locales.map((locale) => ({ params: { slug }, locale })));
  return { paths, fallback: "blocking" };
}

/* Autor que no existe, 404; CMS caído, error, y Next sigue sirviendo la
   última versión buena. */
export async function getStaticProps({ params, locale }) {
  const [comunes, autor, articulos] = await Promise.all([
    traducciones(locale, "blog"),
    blogApiService.getAuthorBySlug(params.slug),
    blogApiService.getArticlesByAuthor(params.slug),
  ]);
  if (!autor) return { notFound: true, revalidate: REFRESCO_BLOG_S };
  return {
    props: { ...comunes, autor, articulos: articulos.data.map(conImagenEstable) },
    revalidate: REFRESCO_BLOG_S,
  };
}
