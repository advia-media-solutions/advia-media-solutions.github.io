import React from "react";
import BlogArticulo from "../../../src/pages/v4/blog/BlogArticulo";

export default function BlogArticlePage(props) {
  return <BlogArticulo {...props} />;
}

BlogArticlePage.v4 = true;

export async function getServerSideProps(context) {
  const { slug } = context.params;

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
        articulo: article,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}
