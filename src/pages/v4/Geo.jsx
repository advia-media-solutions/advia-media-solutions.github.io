import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Cita, Door, Label } from "../../components/v4/primitives";
import PalabraRotativa from "../../components/v4/PalabraRotativa";
import RespuestaIA from "../../components/v4/RespuestaIA";

/**
 * Productos › Navegación Activa en Entornos Conversacionales · la página madre.
 *
 * Enseña el canal y reparte: el hero es una respuesta generativa con la marca
 * dentro, después la pregunta que lo justifica —¿sales tú cuando alguien
 * pregunta?— y las dos puertas. En una conversación la marca puede estar en la
 * respuesta que el modelo redacta (Posicionamiento en IA) o en el anuncio que
 * la acompaña (Publicidad en IA); cada una tiene su página. No hay cierre: las
 * puertas son el cierre.
 *
 * El copy vive en public/locales/{es,en}/geo.json.
 */

/* Las dos puertas, en el orden del diccionario. Aquí va lo que no cambia con
   el idioma: la ruta. */
const PRODUCTOS = ["/products/geo/posicionamiento-ia", "/products/geo/publicidad-ia"];

export default function Geo() {
  const { t } = useTranslation("geo");

  const productos = t("productos.items", { returnObjects: true });

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

      {/* Las dos puertas. Van juntas porque son la misma conversación vista
          desde dos lados: la respuesta que se gana y el anuncio que se activa. */}
      <Section surface="graphite">
        <Cabecera titular={<T t={t} k="productos.titular" />} lede={t("productos.lede")} />
        <Grid cols={2} className="v4-mt-12">
          {productos.map((p, i) => (
            <article key={p.titulo} className="v4-card" data-size="lg">
              <Label tono="gold">{p.tag}</Label>
              <h3 className="v4-subheading">{p.titulo}</h3>
              <div className="v4-chips">
                {p.canales.map((canal) => (
                  <span className="v4-chip" key={canal}>
                    {canal}
                  </span>
                ))}
              </div>
              <p className="v4-body">{p.desc}</p>
              <div className="v4-card__pie">
                <Door href={PRODUCTOS[i]}>{t("productos.ver")}</Door>
              </div>
            </article>
          ))}
        </Grid>
      </Section>

    </Pagina>
  );
}
