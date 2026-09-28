import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import ListaPuestos from "../../components/v4/careers/ListaPuestos";
import Valores from "../../components/v4/Valores";
import { Cabecera, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Nota } from "../../components/v4/primitives";
import { CAREERS_PUBLISHED } from "../../careers/config";

/**
 * Careers · qué construimos, cómo trabajamos y qué posiciones hay abiertas.
 *
 * Las posiciones llegan de Advia OS en cada petición (ver pages/careers); el
 * copy vive en public/locales/{es,en}/careers.json. Mientras CAREERS_PUBLISHED
 * esté apagado la página va con noindex y nada la enlaza.
 */

export default function Careers({ posiciones }) {
  const { t } = useTranslation("careers");

  return (
    <Pagina activo="nosotros">
      <Seo
        path="/careers"
        title={t("seo.title")}
        description={t("seo.description")}
        noindex={!CAREERS_PUBLISHED}
      />

      <Hero
        eyebrow={t("hero.eyebrow")}
        titular={<T t={t} k="hero.titular" />}
        titularTamano="l"
        acciones={<Boton href="#posiciones">{t("hero.cta")}</Boton>}
      />

      <Section surface="inset">
        <Cabecera eyebrow={t("principios.eyebrow")} titular={<T t={t} k="principios.titular" />} />
        <div className="v4-mt-12">
          <Valores />
        </div>
      </Section>

      <Section surface="graphite" id="posiciones">
        <Cabecera eyebrow={t("posiciones.eyebrow")} titular={<T t={t} k="posiciones.titular" />} />
        <div className="v4-mt-12">
          <ListaPuestos posiciones={posiciones} />
        </div>
        <div className="v4-mt-12">
          <Nota>{t("fraude")}</Nota>
        </div>
      </Section>
    </Pagina>
  );
}
