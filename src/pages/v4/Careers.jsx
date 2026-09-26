import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import ListaPuestos from "../../components/v4/careers/ListaPuestos";
import { Cabecera, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Nota } from "../../components/v4/primitives";
import { Pasos } from "../../components/v4/blocks";
import { CAREERS_PUBLISHED } from "../../careers/config";

/**
 * Careers · qué construimos, cómo trabajamos, cómo es el proceso y qué
 * posiciones hay abiertas.
 *
 * Las posiciones llegan de Advia OS en cada petición (ver pages/careers); el
 * copy vive en public/locales/{es,en}/careers.json. Mientras CAREERS_PUBLISHED
 * esté apagado la página va con noindex y nada la enlaza.
 */

function Principios({ items }) {
  return (
    <div className="v4-valores">
      {items.map((p, i) => (
        <div key={p.titulo} className="v4-valor">
          <span className="v4-fila__num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="v4-subheading">{p.titulo}</h3>
          <p className="v4-body">{p.texto}</p>
        </div>
      ))}
    </div>
  );
}

export default function Careers({ posiciones }) {
  const { t } = useTranslation("careers");

  return (
    <Pagina>
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
        lede={t("hero.lede")}
        acciones={<Boton href="#posiciones">{t("hero.cta")}</Boton>}
      />

      <Section surface="inset">
        <Cabecera eyebrow={t("principios.eyebrow")} titular={<T t={t} k="principios.titular" />} />
        <div className="v4-mt-12">
          <Principios items={t("principios.items", { returnObjects: true })} />
        </div>
      </Section>

      <Section>
        <div className="v4-split" data-cols="1-1" data-align="start">
          <Cabecera
            eyebrow={t("proceso.eyebrow")}
            titular={<T t={t} k="proceso.titular" />}
            lede={t("proceso.lede")}
          />
          <div>
            <Pasos items={t("proceso.pasos", { returnObjects: true })} />
            <p className="v4-body v4-strong v4-proceso__cierre">{t("proceso.cierre")}</p>
          </div>
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
