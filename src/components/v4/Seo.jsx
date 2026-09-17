import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const BASE = "https://advia.tech";
const IDIOMAS = ["es", "en"];

/** La URL pública de un path en un idioma: el español va sin prefijo. */
function urlDe(path, locale) {
  const limpio = path === "/" ? "" : path;
  return locale === "es" ? `${BASE}${limpio || "/"}` : `${BASE}/${locale}${limpio}`;
}

/**
 * Head por página. El spec §11 lo pide explícito: title y description propios,
 * orientados a categoría, más canonical. Nos aplicamos la doctrina que vendemos.
 *
 * Cada página existe en los dos idiomas, así que declara sus alternates: el
 * canonical es el de su idioma y `hreflang` apunta a la otra versión, con
 * `x-default` en español, que es la que se sirve sin prefijo.
 */
export default function Seo({ title, description, path }) {
  const { locale = "es" } = useRouter();
  const url = urlDe(path, locale);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {IDIOMAS.map((idioma) => (
        <link key={idioma} rel="alternate" hrefLang={idioma} href={urlDe(path, idioma)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlDe(path, "es")} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale === "en" ? "en_US" : "es_ES"} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
