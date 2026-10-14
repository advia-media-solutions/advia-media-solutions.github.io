import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { Hero, Miga, Pagina, Section } from "../../../components/v4/layout";
import {
  Articulos,
  Estado,
  nombrePerfil,
  personaAutor,
  rutaAutor,
} from "../../../components/v4/blog";
import { ArrowOutward } from "../../../components/v4/primitives";
import { ORGANIZACION, urlDe } from "../../../components/v4/Seo";

/**
 * Blog · autor.
 *
 * La página que identifica a quien firma los artículos: es la `url` de su
 * `Person` en el JSON-LD de cada artículo. Cuenta quién es, enlaza sus
 * perfiles públicos y lista lo que ha escrito.
 */

/**
 * La página como `ProfilePage` cuyo tema es la persona, con el mismo `@id` que
 * citan sus artículos: buscadores y LLMs ven que es la misma.
 */
function datosEstructurados(autor, url) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url,
        inLanguage: "es",
        mainEntity: {
          ...personaAutor(autor),
          ...(autor.bio ? { description: autor.bio } : {}),
        },
      },
      ORGANIZACION,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Blog", item: urlDe("/blog", "es") },
          { "@type": "ListItem", position: 2, name: autor.name, item: url },
        ],
      },
    ],
  });
}

function Cabeza({ autor }) {
  const { t } = useTranslation("blog");
  /* Como los artículos, la página es una sola, en castellano. */
  const url = urlDe(rutaAutor(autor.slug), "es");
  const titulo = t("autor.title", { nombre: autor.name });
  const descripcion = autor.bio || t("autor.descripcionPorDefecto", { nombre: autor.name });

  return (
    <Head>
      <title>{titulo}</title>
      <meta name="description" content={descripcion} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Advia" />
      <meta property="og:locale" content="es_ES" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: datosEstructurados(autor, url) }}
      />
    </Head>
  );
}

function Perfiles({ perfiles }) {
  if (!perfiles?.length) return null;
  return (
    <div className="v4-btn-row">
      {perfiles.map((perfil) => (
        <a
          key={perfil.url}
          className="v4-door"
          href={perfil.url}
          target="_blank"
          rel="me noopener noreferrer"
        >
          {nombrePerfil(perfil.url)}
          <ArrowOutward />
        </a>
      ))}
    </div>
  );
}

export default function BlogAutor({ autor, articulos = [] }) {
  const { t } = useTranslation("blog");

  return (
    <Pagina activo="Blog" seccion="blog">
      <Cabeza autor={autor} />

      <Hero
        miga={<Miga raiz="Blog" href="/blog" hoja={autor.name} />}
        titular={autor.name}
        lede={autor.jobTitle}
        pie={<Perfiles perfiles={autor.profiles} />}
      />

      <Section className="v4-sec--pegada">
        {autor.bio ? <p className="v4-body">{autor.bio}</p> : null}

        <div className="v4-mt-16">
          <h2 className="v4-subheading">{t("autor.articulos", { nombre: autor.name })}</h2>
          <div className="v4-mt-8">
            {articulos.length > 0 ? (
              <Articulos items={articulos} />
            ) : (
              <Estado>{t("autor.sinArticulos")}</Estado>
            )}
          </div>
        </div>
      </Section>
    </Pagina>
  );
}
