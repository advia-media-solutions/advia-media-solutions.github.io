import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Hero, Miga, Pagina, Section } from "../../../components/v4/layout";
import { Door } from "../../../components/v4/primitives";
import { Estado, Meta } from "../../../components/v4/blog";

/**
 * Blog · artículo.
 *
 * El artículo llega ya resuelto desde `getServerSideProps` de la ruta, igual
 * que antes. El cuerpo sigue siendo markdown de Strapi con los mismos plugins;
 * lo que cambia es que la prosa se viste con .v4-prosa (tokens) en vez de con
 * las clases prose de Tailwind.
 */

const DESCRIPCION_POR_DEFECTO =
  "Artículo del blog de Advia sobre marketing digital y navegación activa.";

/**
 * Strapi entrega el cuerpo como markdown dentro de bloques `shared.rich-text`.
 * Dos peculiaridades del contenido que hay publicado: el markdown abre con su
 * propio `# Título`, que repite el titular de la página —dos h1 en el documento,
 * y el segundo sin estilo de titular— y le sigue un `---` de separación que aquí
 * queda huérfano. Se limpian antes de renderizar; el resto va tal cual.
 */
function limpiarCuerpo(body, titulo) {
  if (!body) return body;
  const sinTitulo = body.replace(/^\s*#\s+(.+)\n/, (todo, encabezado) =>
    encabezado.trim() === titulo?.trim() ? "" : todo
  );
  return sinTitulo.replace(/^\s*---\s*\n/, "").trimStart();
}

/* `node` es el nodo del AST que pasa react-markdown: no es un atributo HTML y
   no puede llegar al DOM. */
const COMPONENTES_MD = {
  a: ({ children, href, node, ...props }) => (
    <a
      href={href}
      {...props}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  /* Si un artículo trae su propio h1 y no es el titular, baja a h2: el h1 de la
     página es el título, y solo puede haber uno. */
  h1: ({ children, node, ...props }) => <h2 {...props}>{children}</h2>,
};

function Bloques({ bloques, titulo }) {
  const { t } = useTranslation("blog");
  if (!bloques?.length) return <p className="v4-body">{t("articulo.sinContenido")}</p>;

  return bloques.map((bloque, i) => {
    if (bloque.__component !== "shared.rich-text") return null;

    return (
      <div className="v4-prosa" key={i}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
          components={COMPONENTES_MD}
        >
          {limpiarCuerpo(bloque.body, titulo)}
        </ReactMarkdown>
      </div>
    );
  });
}

function Cabeza({ articulo }) {
  const url = `https://www.advia.tech/blog/article/${articulo.slug}`;
  const descripcion = articulo.description || DESCRIPCION_POR_DEFECTO;
  const portada = articulo.cover?.formats?.large?.url || articulo.cover?.url;
  const imagen = !portada
    ? "https://www.advia.tech/og-default.jpg"
    : portada.startsWith("http")
      ? portada
      : `https://www.advia.tech${portada}`;

  return (
    <Head>
      <title>{`${articulo.title} | Blog Advia`}</title>
      <meta name="description" content={descripcion} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={articulo.title} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imagen} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Advia" />
      <meta property="article:published_time" content={articulo.createdAt} />
      {articulo.updatedAt ? (
        <meta property="article:modified_time" content={articulo.updatedAt} />
      ) : null}
      {articulo.author?.name ? (
        <meta property="article:author" content={articulo.author.name} />
      ) : null}
      {articulo.category?.name ? (
        <meta property="article:section" content={articulo.category.name} />
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={articulo.title} />
      <meta name="twitter:description" content={descripcion} />
      <meta name="twitter:image" content={imagen} />
    </Head>
  );
}

export default function BlogArticulo({ articulo, error }) {
  const { t } = useTranslation("blog");
  if (error || !articulo) {
    return (
      <Pagina activo="Blog" seccion="blog">
        <Head>
          <title>{t("articulo.noEncontradoTitle")}</title>
          <meta name="description" content={t("articulo.noEncontradoDesc")} />
        </Head>
        <Section className="v4-sec--pegada">
          <Estado>{error || t("articulo.noEncontrado")}</Estado>
          <div className="v4-mt-8">
            <Door href="/blog">{t("articulo.volver")}</Door>
          </div>
        </Section>
      </Pagina>
    );
  }

  return (
    <Pagina activo="Blog" seccion="blog">
      <Cabeza articulo={articulo} />

      <Hero
        miga={<Miga raiz="Blog" href="/blog" hoja={articulo.title} />}
        titular={articulo.title}
        lede={articulo.description}
        pie={<Meta articulo={articulo} largo sello />}
      />

      <Section className="v4-sec--pegada">
        {articulo.cover ? (
          <div className="v4-articulo__portada">
            <img
              src={articulo.cover.formats?.large?.url || articulo.cover.url}
              alt={articulo.cover.alternativeText || articulo.title}
            />
          </div>
        ) : null}

        <div className="v4-mt-16">
          <Bloques bloques={articulo.blocks} titulo={articulo.title} />
        </div>

        <div className="v4-articulo__pie v4-mt-16">
          <Door href="/blog">{t("articulo.volver")}</Door>
        </div>
      </Section>
    </Pagina>
  );
}
