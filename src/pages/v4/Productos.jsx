import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Cierre, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door, Label } from "../../components/v4/primitives";
import Reparto from "../../components/v4/Reparto";
import { Plano } from "../../components/v4/Momentos";

/** Productos · el hub. Enseña por qué hay dos productos; no los lista. */

/* Las dos puertas a los productos. Van juntas y en caja porque son la misma
   decisión vista desde dos lados: el canal donde la presencia se compra y el
   canal donde se fabrica. El texto está en el diccionario, en el mismo orden;
   aquí va lo que no cambia con el idioma: la ruta y qué canal está en obras. */
const PRODUCTOS = [
  { href: "/products/paid-media", wip: [2] },
  { href: "/products/geo", wip: [] },
];

export default function Productos() {
  const { t } = useTranslation("productos");
  const textos = t("productos", { returnObjects: true });

  return (
    <Pagina activo="productos">
      <Seo path="/products" title={t("seo.title")} description={t("seo.description")} />

      <Hero
        titularTamano="l"
        /* El vídeo no es un fondo: es la pantalla del hero, y el titular la
           presenta. Va bajo la entradilla, a todo el ancho de contenido. */
        pie={
          <figure className="v4-hero__cine">
            <Plano
              src="/video/searching"
              poster="/video/searching.jpg"
              descripcion={t("hero.videoDescripcion")}
              className="v4-hero__video-plano"
            />
            <figcaption className="v4-hero__video-pie">{t("hero.videoPie")}</figcaption>
          </figure>
        }
        titular={<T t={t} k="hero.titular" />}
        lede={t("hero.lede")}
      />

      <Section surface="inset">
        <Cabecera titular={<T t={t} k="todos.titular" />} />
        {/* El mapa de Tecnología, y sus paradas colándose en la caja de su
            producto: cada producto es una familia de canales. */}
        <Reparto cols={PRODUCTOS.length}>
          {PRODUCTOS.map((p, i) => {
            const texto = textos[i];
            return (
              <article key={p.href} className="v4-card" data-size="lg">
                <Label tono="gold">{texto.tag}</Label>
                <h3 className="v4-subheading">{texto.titulo}</h3>
                <div className="v4-reparto__canales">
                  {texto.canales.map((canal, k) => {
                    const wip = p.wip.includes(k);
                    return (
                      <span className="v4-chip" key={canal} data-wip={wip ? "true" : undefined}>
                        {canal}
                        {wip ? <span className="v4-canales__pronto">{t("todos.pronto")}</span> : null}
                      </span>
                    );
                  })}
                </div>
                <p className="v4-body v4-reparto__desc">{texto.desc}</p>
                <div className="v4-card__pie">
                  <Door href={p.href}>{t("todos.ver")}</Door>
                </div>
              </article>
            );
          })}
        </Reparto>
      </Section>

      <Cierre
        titular={<T t={t} k="cierre.titular" />}
        lede={t("cierre.lede")}
        cta={<Boton href="/contact">{t("cierre.cta")}</Boton>}
      />
    </Pagina>
  );
}
