import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door } from "../../components/v4/primitives";

/**
 * Productos › Entornos Conversacionales › Publicidad en IA · el anuncio que
 * acompaña a la respuesta.
 *
 * Paid media en ChatGPT, activado sobre lo que dice la simulación. De momento
 * lleva lo que ya contaba la página madre; el resto de secciones se acuerda
 * antes de construirse.
 *
 * El copy vive en public/locales/{es,en}/publicidadIA.json.
 */
export default function PublicidadIA() {
  const { t } = useTranslation("publicidadIA");
  const pasos = t("como.items", { returnObjects: true });

  return (
    <Pagina activo="productos">
      <Seo
        path="/products/geo/ai-advertising"
        title={t("seo.title")}
        description={t("seo.description")}
      />

      <Hero
        eyebrow={t("hero.eyebrow")}
        eyebrowTamano="m"
        titularTamano="l"
        titular={<T t={t} k="hero.titular" />}
        lede={t("hero.lede")}
      />

      {/* Cómo se monta una campaña: de la simulación al mensaje y a la mejora. */}
      <Section surface="graphite">
        <Cabecera titular={<T t={t} k="como.titular" />} lede={t("como.lede")} />
        <Grid cols={3} className="v4-mt-12">
          {pasos.map((p) => (
            <article key={p.nombre} className="v4-card">
              <h3 className="v4-subheading">{p.nombre}</h3>
              <p className="v4-body">{p.desc}</p>
            </article>
          ))}
        </Grid>
      </Section>

      {/* El producto hermano. */}
      <Section>
        <Cabecera titular={<T t={t} k="hermano.titular" />} lede={t("hermano.lede")} />
        <div className="v4-mt-8">
          <Door href="/products/geo/ai-positioning">{t("hermano.door")}</Door>
        </div>
      </Section>

      <Cierre
        titular={<T t={t} k="cierre.titular" />}
        lede={t("cierre.lede")}
        cta={<Boton href="/contact">{t("cierre.cta")}</Boton>}
      />
    </Pagina>
  );
}
