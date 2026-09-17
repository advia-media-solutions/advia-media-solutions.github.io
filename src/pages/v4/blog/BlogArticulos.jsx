import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../../components/v4/Seo";
import T from "../../../components/v4/T";
import { Hero, Pagina, Section } from "../../../components/v4/layout";
import { Articulos, Estado, Paginacion } from "../../../components/v4/blog";

/**
 * Blog · listado completo, paginado.
 *
 * La página viene en la URL (`?page=2`) y los artículos llegan resueltos desde
 * `getServerSideProps`: cada página del listado es una URL propia, servida
 * entera, que un crawler puede seguir y un lector puede compartir. Cambiar de
 * página es navegar a esa URL.
 */
export default function BlogArticulos({ articulos = [], pagina = 1, totalPaginas = 1, error = null }) {
  const { t, i18n } = useTranslation("blog");
  const router = useRouter();

  const cambiarPagina = (siguiente) => {
    router.push({ pathname: router.pathname, query: siguiente > 1 ? { page: siguiente } : {} });
  };

  return (
    <Pagina activo="blog" seccion="blog">
      <Seo path="/blog/articles" title={t("lista.title")} description={t("lista.description")} />

      <Hero titular={<T t={t} k="lista.titular" />} lede={t("lista.lede")} />

      <Section className="v4-sec--pegada">
        {i18n.language === "en" ? (
          <p className="v4-label v4-label--faint v4-blog__aviso">{t("estado.aviso")}</p>
        ) : null}
        {error ? <Estado>{t("estado.error", { error })}</Estado> : null}

        {!error ? (
          articulos.length > 0 ? (
            <>
              <Articulos items={articulos} />
              <Paginacion
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onCambio={cambiarPagina}
                hrefDe={(n) => (n > 1 ? `/blog/articles?page=${n}` : "/blog/articles")}
              />
            </>
          ) : (
            <Estado>{t("estado.vacio")}</Estado>
          )
        ) : null}
      </Section>
    </Pagina>
  );
}
