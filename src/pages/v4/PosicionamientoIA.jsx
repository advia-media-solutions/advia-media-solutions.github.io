import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door, Label } from "../../components/v4/primitives";
import ComoFunciona from "../../components/v4/ComoFunciona";

/**
 * Productos › Entornos Conversacionales › Posicionamiento en IA · la respuesta
 * que el modelo redacta.
 *
 * Lo que se vende aquí es mover la aguja, no medirla. Por eso el orden es: de
 * dónde saca la IA sus respuestas (el porqué), la medición recogida y contada
 * como punto de partida, la plataforma —dónde se publica y cómo se redacta,
 * que es el producto y enseña ella misma cuánto se ha movido—. Al final, la
 * puerta al producto hermano.
 *
 * El hilo de toda la página es una partición: lo que escribes tú y lo que
 * escriben otros, las fuentes que no controlas. Se dibuja en la segunda
 * sección y se repite en la medición, en la plataforma y en el cierre.
 *
 * El copy vive en public/locales/{es,en}/posicionamientoIA.json.
 */

/* La barra de la sección de fuentes, en % del total: lo que escribes tú y, a
   continuación, lo que escriben otros, partido en tramos sin nombre —medios,
   comparadores, redes, foros…— para que se lea como muchas fuentes y no como
   una. Entre las dos partes, un corte más ancho que entre los grises. Proporciones ilustrativas hasta que haya dato por categoría; lo que
   cuenta es la diferencia, no la cifra. */
const PROPIO = 22;
const OTROS = [36, 26, 16];
const ancho = (n) => ({ "--v4-ancho": `${n}%` });

export default function PosicionamientoIA() {
  const { t } = useTranslation("posicionamientoIA");

  const medidas = t("medidas", { returnObjects: true });

  return (
    <Pagina activo="productos">
      <Seo
        path="/products/geo/ai-positioning"
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

      {/* De dónde salen las respuestas. La partición que sostiene la página:
          una barra, y el tramo del cliente es el corto y el que se lleva el
          esfuerzo. */}
      <Section surface="inset">
        <Cabecera titular={<T t={t} k="fuentes.titular" />} lede={t("fuentes.lede")} />
        <div className="v4-mt-12 v4-fuentes">
          <div className="v4-fuentes__cabeza">
            {["propio", "otros"].map((clave) => (
              <div key={clave} className="v4-fuentes__lado">
                <span className="v4-body v4-strong">{t(`fuentes.${clave}.nombre`)}</span>
                <span className="v4-label">{t(`fuentes.${clave}.desc`)}</span>
              </div>
            ))}
          </div>
          {/* Decorativa: lo que dice ya lo dicen los rótulos de arriba. */}
          <div className="v4-fuentes__barra" aria-hidden="true">
            <span className="v4-fuentes__tramo" data-propio="true" style={ancho(PROPIO)} />
            {OTROS.map((n, i) => (
              <span key={i} className="v4-fuentes__tramo" data-tono={i} style={ancho(n)} />
            ))}
          </div>
        </div>
        <p className="v4-label v4-label--faint v4-mt-8">{t("fuentes.nota")}</p>
      </Section>

      {/* El punto de partida. Cuatro en fila y sin ordinal: la medición es una
          consecuencia del trabajo, no lo que se vende, y no debe pesar más que
          la plataforma que viene debajo. */}
      <Section surface="graphite">
        <Cabecera titular={<T t={t} k="medir.titular" />} lede={t("medir.lede")} />
        <Grid cols={4} className="v4-mt-12">
          {medidas.map((m) => (
            <article key={m.nombre} className="v4-card v4-medida-mini">
              <Label tono="gold">{m.nombre}</Label>
              <h3>{m.pregunta}</h3>
              <p className="v4-body">{m.desc}</p>
            </article>
          ))}
        </Grid>
      </Section>

      {/* El producto: dónde se publica y cómo se redacta, enseñado en la
          propia plataforma. */}
      <Section surface="inset">
        <Cabecera titular={<T t={t} k="plataforma.titular" />} lede={t("plataforma.lede")} />
        <ComoFunciona t={t} />
      </Section>

      {/* El producto hermano, una sola vez y como complemento. */}
      <Section>
        <Cabecera titular={<T t={t} k="hermano.titular" />} lede={t("hermano.lede")} />
        <div className="v4-mt-8">
          <Door href="/products/geo/ai-advertising">{t("hermano.door")}</Door>
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
