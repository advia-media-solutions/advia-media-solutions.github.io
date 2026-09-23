import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const BASE = "https://advia.tech";
const IDIOMAS = ["es", "en"];

/** Tarjeta para compartir por defecto (1200×630): logo, titular y esfera. */
export const IMAGEN_COMPARTIR = `${BASE}/og-advia.jpg`;

/** La URL pública de un path en un idioma: el español va sin prefijo. */
export function urlDe(path, locale) {
  const limpio = path === "/" ? "" : path;
  return locale === "es" ? `${BASE}${limpio || "/"}` : `${BASE}/${locale}${limpio}`;
}

/**
 * Quién es Advia, para buscadores y LLMs: la organización y la web, una vez
 * por página. `ORGANIZACION` se exporta para que el JSON-LD de otras piezas
 * (un artículo del blog) la declare y la cite por su `@id`.
 */
export const ORGANIZACION = {
  "@type": "Organization",
  "@id": `${BASE}/#organizacion`,
  name: "Advia",
  url: `${BASE}/`,
  logo: `${BASE}/logo-advia.svg`,
  foundingDate: "2024",
  address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
  sameAs: ["https://www.linkedin.com/company/advia-media-solutions/"],
};
const ID_ORGANIZACION = ORGANIZACION["@id"];
const DATOS_ESTRUCTURADOS = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZACION,
    {
      "@type": "WebSite",
      "@id": `${BASE}/#web`,
      url: `${BASE}/`,
      name: "Advia",
      inLanguage: IDIOMAS,
      publisher: { "@id": ID_ORGANIZACION },
    },
  ],
});

/**
 * Head por página. El spec §11 lo pide explícito: title y description propios,
 * orientados a categoría, más canonical. Nos aplicamos la doctrina que vendemos.
 *
 * Cada página existe en los dos idiomas, así que declara sus alternates: el
 * canonical es el de su idioma y `hreflang` apunta a la otra versión, con
 * `x-default` en inglés: la que toca a quien no habla ninguno de los dos.
 *
 * `noindex` es para páginas que existen pero no deben posicionar (la 404): sin
 * canonical ni alternates, que le dirían a Google lo contrario.
 */
export default function Seo({ title, description, path, noindex = false }) {
  const { locale = "es" } = useRouter();
  const url = urlDe(path, locale);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <>
          <link rel="canonical" href={url} />
          {IDIOMAS.map((idioma) => (
            <link key={idioma} rel="alternate" hrefLang={idioma} href={urlDe(path, idioma)} />
          ))}
          <link rel="alternate" hrefLang="x-default" href={urlDe(path, "en")} />
        </>
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Advia" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale === "en" ? "en_US" : "es_ES"} />
      <meta property="og:image" content={IMAGEN_COMPARTIR} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={IMAGEN_COMPARTIR} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: DATOS_ESTRUCTURADOS }}
      />
    </Head>
  );
}
