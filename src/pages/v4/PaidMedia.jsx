import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Cierre, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton } from "../../components/v4/primitives";
import Canales from "../../components/v4/Canales";

/**
 * Productos › Navegación Activa en Canales Digitales · donde la presencia se compra.
 *
 * El hilo de la página es una sola pregunta en tres pasos. El hero promete:
 * Vera sabe dónde vas a ser relevante. La primera sección dice dónde es eso
 * —las paradas del recorrido son artículos y vídeos, y ahí se compra— con el
 * móvil enseñando cada canal. El cierre dice qué sale de comprar ahí, con
 * un resultado de campaña, y ofrece verlo antes de activar.
 *
 * El copy vive en public/locales/{es,en}/paidMedia.json.
 */

/* Qué maqueta de móvil enseña cada canal, y cuál está en obras. Va en el mismo
   orden que `canales` en el diccionario. */
const MAQUETAS = [
  { maqueta: "web" },
  { maqueta: "video" },
  { maqueta: "feed", wip: true },
];

export default function PaidMedia() {
  const { t } = useTranslation("paidMedia");

  /* Los tres canales, con los argumentos del pitch reducidos a medida de web:
     un titular y una línea por punto. */
  const canales = t("canales", { returnObjects: true }).map((c, i) => ({ ...c, ...MAQUETAS[i] }));

  return (
    <Pagina activo="productos">
      <Seo path="/products/paid-media" title={t("seo.title")} description={t("seo.description")} />

      <Hero
        eyebrow={t("hero.eyebrow")}
        eyebrowTamano="m"
        titularTamano="l"
        titular={<T t={t} k="hero.titular" />}
        lede={t("hero.lede")}
      />

      {/* Dónde. El hero dice que Vera sabe dónde vas a ser relevante; aquí se
          enseña dónde es eso, canal a canal, con el móvil delante. */}
      <Section surface="graphite">
        <Cabecera titular={<T t={t} k="donde.titular" />} lede={t("donde.lede")} />
        <Canales canales={canales} />
      </Section>

      <Cierre
        titular={<T t={t} k="cierre.titular" />}
        lede={t("cierre.lede")}
        cta={<Boton href="/contact">{t("cierre.cta")}</Boton>}
      />
    </Pagina>
  );
}
