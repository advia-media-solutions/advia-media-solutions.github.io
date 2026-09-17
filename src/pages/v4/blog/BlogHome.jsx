import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../../components/v4/Seo";
import T from "../../../components/v4/T";
import { Hero, Pagina, Section } from "../../../components/v4/layout";
import { Boton } from "../../../components/v4/primitives";
import { Articulos, ArticuloDestacado, Estado } from "../../../components/v4/blog";

/**
 * Blog · portada.
 *
 * Los artículos llegan ya resueltos desde `getServerSideProps` de la ruta: el
 * HTML que sirve el servidor trae el destacado y la rejilla completos, que es
 * lo que leen los crawlers y los modelos. Antes se pedían desde el navegador y
 * la página indexable era un esqueleto gris.
 */
export default function BlogHome({ articulos = [], error = null }) {
  const { t, i18n } = useTranslation("blog");
  const ultimo = articulos[0];
  const resto = articulos.slice(1, 7);

  return (
    <Pagina activo="blog" seccion="blog">
      <Seo path="/blog" title={t("home.title")} description={t("home.description")} />

      <Hero titular={<T t={t} k="home.titular" />} lede={t("home.lede")} />

      <Section className="v4-sec--pegada">
        {/* Los artículos salen del CMS en castellano: en la versión inglesa se
            avisa, en vez de fingir que hay una traducción. */}
        {i18n.language === "en" ? (
          <p className="v4-label v4-label--faint v4-blog__aviso">{t("estado.aviso")}</p>
        ) : null}
        {error ? <Estado>{t("estado.error", { error })}</Estado> : null}

        {!error ? (
          <>
            {ultimo ? <ArticuloDestacado articulo={ultimo} /> : null}

            {resto.length > 0 ? (
              <div className="v4-mt-16">
                <h2 className="v4-subheading">{t("home.mas")}</h2>
                <div className="v4-mt-8">
                  <Articulos items={resto} />
                </div>
              </div>
            ) : null}

            {!ultimo ? <Estado>{t("estado.vacio")}</Estado> : null}

            <div className="v4-btn-row v4-mt-16">
              <Boton href="/blog/articles" variant="ghost">
                {t("home.todos")}
              </Boton>
            </div>
          </>
        ) : null}
      </Section>
    </Pagina>
  );
}
