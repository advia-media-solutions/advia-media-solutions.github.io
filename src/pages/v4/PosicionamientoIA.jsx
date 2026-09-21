import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door, Label } from "../../components/v4/primitives";
import Plataforma from "../../components/v4/Plataforma";

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

/* Las dos barras de la sección de fuentes: lo que escribes tú y lo que
   escriben otros. Proporciones ilustrativas hasta que haya dato por categoría;
   lo que cuenta es la diferencia, no la cifra. */
const FUENTES = [
  { clave: "propio", ancho: 28 },
  { clave: "otros", ancho: 100 },
];

export default function PosicionamientoIA() {
  const { t } = useTranslation("posicionamientoIA");

  const medidas = t("medidas", { returnObjects: true });

  return (
    <Pagina activo="productos">
      <Seo
        path="/products/geo/posicionamiento-ia"
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
          dos barras, y la del cliente es la corta y la que se lleva el esfuerzo. */}
      <Section surface="inset">
        <Cabecera titular={<T t={t} k="fuentes.titular" />} lede={t("fuentes.lede")} />
        <div className="v4-mt-12 v4-fuentes">
          {FUENTES.map((f) => (
            <div key={f.clave} className="v4-dato">
              <div className="v4-dato__head">
                <span className="v4-body v4-strong">{t(`fuentes.${f.clave}.nombre`)}</span>
                <span className="v4-label">{t(`fuentes.${f.clave}.desc`)}</span>
              </div>
              <div className="v4-barra">
                <span className="v4-barra__pista">
                  <span
                    className="v4-barra__valor"
                    data-neutra={f.clave === "otros" ? "true" : undefined}
                    style={{ width: `${f.ancho}%` }}
                  />
                </span>
              </div>
              {f.clave === "propio" ? (
                <span className="v4-label v4-label--gold">{t("fuentes.propio.rotulo")}</span>
              ) : null}
            </div>
          ))}
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
        <Plataforma t={t} />
      </Section>

      {/* El producto hermano, una sola vez y como complemento. */}
      <Section>
        <Cabecera titular={<T t={t} k="hermano.titular" />} lede={t("hermano.lede")} />
        <div className="v4-mt-8">
          <Door href="/products/geo/publicidad-ia">{t("hermano.door")}</Door>
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
