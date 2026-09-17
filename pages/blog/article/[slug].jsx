import React from "react";
import { traducciones } from "../../../src/i18n/servidor";
import BlogArticulo from "../../../src/pages/v4/blog/BlogArticulo";

export default function BlogArticlePage(props) {
  return <BlogArticulo {...props} />;
}

BlogArticlePage.v4 = true;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const comunes = await traducciones(context.locale, "blog");

  try {
    const response = await fetch(
      `https://cms.advia.tech/api/articles?filters[slug][$eq]=${slug}&populate[author]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );

    if (!response.ok) {
      throw new Error(`Error fetching article: ${response.statusText}`);
    }

    const data = await response.json();
    const article = data.data.length > 0 ? data.data[0] : null;

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...comunes,
        articulo: article,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      props: {
        ...comunes,
        error: error.message,
      },
    };
  }
}
