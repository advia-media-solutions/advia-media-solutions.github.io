import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Cita, Label } from "../../components/v4/primitives";
import { Columnas } from "../../components/v4/blocks";
import Ciclo from "../../components/v4/Ciclo";
import PalabraRotativa from "../../components/v4/PalabraRotativa";
import RespuestaIA from "../../components/v4/RespuestaIA";

/**
 * Productos › Navegación Activa en Entornos Conversacionales · donde la presencia se fabrica.
 *
 * El hilo va en el orden en que se trabaja un cliente. El hero enseña el
 * producto: una respuesta generativa con la marca dentro. Después, la
 * pregunta que lo justifica —¿sales tú cuando alguien pregunta?— y, en orden,
 * lo que hacemos: medir cómo estás hoy, entender de dónde saca la IA sus
 * respuestas, y el ciclo de publicar y volver a medir. Paid media en ChatGPT
 * va al final, una sola vez, como complemento.
 *
 * El copy vive en public/locales/{es,en}/geo.json.
 */

/* Las cinco estanterías de las que se informa la IA. La propia es la que menos
   pesa. Proporciones ilustrativas hasta que haya dato por categoría; los
   nombres, en el diccionario y en este orden. */
const ALTOS = [88, 66, 24, 72, 80];
const ESTANTERIA_PROPIA = 2;

export default function Geo() {
  const { t } = useTranslation("geo");

  const medidas = t("medidas", { returnObjects: true });
  const estanterias = t("estanterias.items", { returnObjects: true }).map((nombre, i) => ({
    nombre,
    alto: ALTOS[i],
  }));
  const loop = t("ciclo.pasos", { returnObjects: true });
  const paid = t("paid.items", { returnObjects: true });

  return (
    <Pagina activo="productos">
      <Seo path="/products/geo" title={t("seo.title")} description={t("seo.description")} />

      <Hero
        eyebrow={t("hero.eyebrow")}
        eyebrowTamano="m"
        titularTamano="l"
        titular={<T t={t} k="hero.titular" />}
        lede={t("hero.lede")}
        /* La respuesta va al lado del titular, como los planos y las bolas de
           las otras páginas: no es una ilustración de fondo, es el producto. */
        aparte={
          <RespuestaIA
            pregunta={t("hero.respuesta.pregunta")}
            antes={t("hero.respuesta.antes")}
            marca={["BYD", "Audi", "Hyundai"]}
            /* La marca cierra su renglón y el resto sigue debajo: así, cuando
               cambia, lo único que se mueve es ella. */
            despues={t("hero.respuesta.despues")}
            fuentes={["motorpasion.com", "youtube.com", "km77.com"]}
          />
        }
      />

      {/* La pregunta. Los saltos van fijos: la palabra rotativa cierra su propio
          renglón, con sitio de sobra para la más larga, así lo único que cambia
          de sitio es ella. */}
      <Section surface="inset">
        <Cabecera
          titular={
            <>
              {t("pregunta.titularAntes")}
              <br />
              {t("pregunta.titularMedio")}{" "}
              <PalabraRotativa palabras={t("pregunta.categorias", { returnObjects: true })} />
              <br />
              {t("pregunta.titularDespues")}
            </>
          }
          lede={<T t={t} k="pregunta.lede" />}
        />
        <div className="v4-mt-12">
          <Cita
            fuente={t("pregunta.citaFuente")}
            href="/blog/article/introduccion-navegacion-activa-iii"
          >
            {t("pregunta.cita")}
          </Cita>
        </div>
      </Section>

      {/* Cómo estás hoy. Lo primero que se entrega, y la base sobre la que se
          mide todo lo demás. */}
      <Section surface="graphite">
        <Cabecera titular={<T t={t} k="medir.titular" />} lede={t("medir.lede")} />
        {/* Dos columnas, no cuatro: cada medida es una pregunta entera y a un
            cuarto de ancho se leía apretada. El ordinal dice que son cuatro
            y en qué orden se entregan. */}
        <Grid cols={2} className="v4-mt-12">
          {medidas.map((m, i) => (
            <article key={m.nombre} className="v4-card v4-medida" data-size="lg">
              <span className="v4-medida__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Label tono="gold">{m.nombre}</Label>
              <h3 className="v4-subheading">{m.pregunta}</h3>
              <p className="v4-body">{m.desc}</p>
            </article>
          ))}
        </Grid>
      </Section>

      {/* De dónde salen las respuestas. Justifica por qué la estrategia no puede
          quedarse en la web propia. */}
      <Section>
        <Cabecera titular={<T t={t} k="estanterias.titular" />} lede={t("estanterias.lede")} />
        <Columnas items={estanterias} destacada={estanterias[ESTANTERIA_PROPIA].nombre} />
        <p className="v4-label v4-label--faint v4-mt-8">{t("estanterias.nota")}</p>
      </Section>

      {/* El ciclo. El argumento es el delta entre una medición y la siguiente. */}
      <Section surface="inset">
        <Cabecera titular={<T t={t} k="ciclo.titular" />} lede={t("ciclo.lede")} />
        <div className="v4-mt-16">
          <Ciclo pasos={loop} />
        </div>
      </Section>

      {/* Paid media en ChatGPT, una sola vez y como complemento. */}
      <Section>
        <Cabecera titular={<T t={t} k="paid.titular" />} lede={t("paid.lede")} />
        <Grid cols={3} className="v4-mt-12">
          {paid.map((p) => (
            <article key={p.nombre} className="v4-card">
              <h3 className="v4-subheading">{p.nombre}</h3>
              <p className="v4-body">{p.desc}</p>
            </article>
          ))}
        </Grid>
      </Section>

      <Cierre
        titular={<T t={t} k="cierre.titular" />}
        lede={t("cierre.lede")}
        cta={<Boton href="/contact">{t("cierre.cta")}</Boton>}
      />
    </Pagina>
  );
}
