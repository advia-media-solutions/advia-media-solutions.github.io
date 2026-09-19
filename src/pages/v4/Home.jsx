import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import EsferaHero from "../../components/v4/EsferaHero";
import Pantallas from "../../components/v4/Pantallas";
import Columnas from "../../components/v4/Columnas";
import { Cabecera, Cierre, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Boton, Door, Nota } from "../../components/v4/primitives";
import { Bloque, Bloques } from "../../components/v4/blocks";

/**
 * Inicio · el Golden Circle comprimido (why → how → what).
 *
 * La unidad de valor es LA RESPUESTA. El formato que adopta — anuncio,
 * artículo, review, cita de un LLM — es consecuencia de dónde ocurre la
 * pregunta. El scroll 4 es el que carga ese giro.
 *
 * Cada sección enseña y abre una puerta; ninguna agota su tema. El concepto
 * vive en /navegacion-activa, el motor en /technology y los canales en los dos
 * productos: si la home los explicara enteros, los botones no llevarían a
 * ningún sitio al que merezca la pena ir.
 *
 * El copy vive en public/locales/{es,en}/home.json. Aquí solo queda la
 * estructura: qué pieza va en cada sección y a qué puerta lleva.
 */
export default function Home() {
  const { t } = useTranslation("home");

  /* Los dos momentos, como dos pantallas. Cada una lleva su frase dentro, en la
     franja de arriba: dice qué momento se está mirando, y el filete dorado
     marca cuál de los dos es el nuestro. */
  const pasiva = {
    label: t("pantallas.pasiva.label"),
    pie: <T t={t} k="pantallas.pasiva.pie" />,
  };

  /* Cuatro categorías distintas y la misma forma de preguntar: lo que se cuenta
     no es el coche, es que esto pasa en cualquier decisión. */
  const activa = {
    label: t("pantallas.activa.label"),
    preguntas: t("pantallas.activa.preguntas", { returnObjects: true }),
    pie: <T t={t} k="pantallas.activa.pie" />,
  };

  /* Los cuatro agentes de la animación de columnas. Nombre, edad y la pregunta
     que se hace cada uno: cuatro razones distintas para la misma decisión, que
     es lo que hace que sus recorridos no se parezcan. Las fuentes por las que
     pasan viven en el componente: son el material del dibujo, no texto. */
  const agentes = t("agentes", { returnObjects: true });

  return (
    <Pagina>
      <Seo path="/" title={t("seo.title")} description={t("seo.description")} />

      <Hero
        pieza={<EsferaHero />}
        titular={<T t={t} k="hero.titular" />}
        lede={t("hero.lede")}
        acciones={
          <>
            <Boton href="/navegacion-activa">{t("hero.cta")}</Boton>
            <Boton href="/about" variant="ghost">
              {t("hero.ctaGhost")}
            </Boton>
          </>
        }
      />

      <Section surface="inset">
        <Cabecera titular={<T t={t} k="formas.titular" />} lede={<T t={t} k="formas.lede" />} />
        <div className="v4-mt-12">
          <Pantallas pasiva={pasiva} activa={activa} />
        </div>
        <div className="v4-mt-10">
          <Door href="/navegacion-activa">{t("formas.door")}</Door>
        </div>
      </Section>

      <Section>
        <Cabecera titular={<T t={t} k="vera.titular" />} lede={t("vera.lede")} />
        <div className="v4-mt-8">
          <Columnas agentes={agentes} />
        </div>
        <div className="v4-mt-10">
          <Door href="/technology">{t("vera.door")}</Door>
        </div>
      </Section>

      <Section surface="graphite">
        <Cabecera titular={<T t={t} k="canales.titular" />} />
        <Bloques>
          <Bloque titulo={t("canales.paidMedia")}>
            <Door href="/products/paid-media">{t("canales.ver")}</Door>
          </Bloque>
          <Bloque invertida titulo={t("canales.geo")}>
            <Door href="/products/geo">{t("canales.ver")}</Door>
          </Bloque>
        </Bloques>
      </Section>

      <Section>
        <Split align="start">
          <div>
            <Cabecera titular={<T t={t} k="fundadores.titular" />} lede={t("fundadores.lede")} />
            <div className="v4-mt-8">
              <Door href="/about">{t("fundadores.door")}</Door>
            </div>
          </div>
          <Nota>{t("fundadores.nota")}</Nota>
        </Split>
      </Section>

      <Cierre
        titular={<T t={t} k="cierre.titular" />}
        cta={<Boton href="/contact">{t("cierre.cta")}</Boton>}
      />
    </Pagina>
  );
}
