import React from "react";
import { traducciones } from "../../../src/i18n/servidor";
import { blogApiService } from "../../../src/services/blogApi";
import BlogArticulo from "../../../src/pages/v4/blog/BlogArticulo";

export default function BlogArticlePage(props) {
  return <BlogArticulo {...props} />;
}

BlogArticlePage.v4 = true;

/**
 * Si el artículo no existe, 404. Si el CMS falla, se pinta el aviso pero con
 * 503: con un 200 Google indexaría la página de error en lugar del artículo
 * (soft-404); con un 503 vuelve más tarde y conserva lo que ya tenía.
 */
export async function getServerSideProps({ params, locale, res }) {
  const comunes = await traducciones(locale, "blog");

  try {
    const articulo = await blogApiService.getArticleBySlug(params.slug);
    if (!articulo) return { notFound: true };
    return { props: { ...comunes, articulo } };
  } catch (error) {
    console.error("Error fetching article:", error);
    res.statusCode = 503;
    res.setHeader("Retry-After", "600");
    return { props: { ...comunes, error: error.message } };
  }
}
