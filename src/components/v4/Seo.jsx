import React from "react";
import Head from "next/head";

const BASE = "https://advia.tech";

/**
 * Head por página. El spec §11 lo pide explícito: title y description propios,
 * orientados a categoría, más canonical. Nos aplicamos la doctrina que vendemos.
 */
export default function Seo({ title, description, path }) {
  const url = `${BASE}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
