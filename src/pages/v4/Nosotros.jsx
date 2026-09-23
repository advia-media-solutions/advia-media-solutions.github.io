import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import Areas from "../../components/v4/Areas";
import { Cabecera, Cierre, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door } from "../../components/v4/primitives";
import { Filas } from "../../components/v4/blocks";

/**
 * Nosotros · el why completo, y quién lo sostiene.
 *
 * La home abre la puerta con una frase; aquí se cuenta entero:
 * el giro de lado, la tesis y el equipo que lo lleva. Todo lo que hay
 * es real y sale de Advia OS (Advia 101): áreas, fundadores y valores. Lo que
 * no está documentado no está aquí.
 *
 * El copy vive en public/locales/{es,en}/nosotros.json. Aquí quedan los datos
 * que no cambian con el idioma: nombres de área, fundadores y valores.
 */

/* Las tres áreas y quién lleva cada una. Sale de Who's who (Advia OS); si
   cambia allí, cambia aquí. Los nombres de área van en inglés en los dos
   idiomas: así se llaman. */
const AREAS = [
  {
    nombre: "Business Development & Strategy",
    lider: "Pablo Martínez Saltó",
    linkedin: "https://www.linkedin.com/in/pablo-mart%C3%ADnez-salt%C3%B3-6b258aa1/",
  },
  {
    nombre: "Tech & Product",
    lider: "Miguel Pérez Pérez",
    linkedin: "https://www.linkedin.com/in/luis-miguel-p%C3%A9rez-p%C3%A9rez/",
  },
  {
    nombre: "Ops & Processes",
    lider: "Jaime Sanabria Sunyé",
    linkedin: "https://www.linkedin.com/in/jaime-sanabria-sunye/",
  },
];

/* Los nombres son fijos y no se traducen (Advia OS · Our values). */
const VALORES = ["#WorkHardPlayHard", "#Superhuman", "#RightOverEasy", "#Imagine", "#WinAsOne"];

function Valores({ items }) {
  return (
    <div className="v4-valores">
      {items.map((v, i) => (
        <div key={v.nombre} className="v4-valor">
          <span className="v4-fila__num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="v4-subheading">{v.nombre}</h3>
          <p className="v4-body">{v.texto}</p>
        </div>
      ))}
    </div>
  );
}

export default function Nosotros() {
  const { t } = useTranslation("nosotros");

  /* La narrativa fundacional, en tres tiempos. Es el guion con el que el
     equipo abre una primera reunión, así que el orden no es libre. */
  const historia = t("historia", { returnObjects: true }).map((h, i) => ({
    ...h,
    num: String(i + 1).padStart(2, "0"),
  }));
  const areas = t("areas", { returnObjects: true }).map((a, i) => ({ ...AREAS[i], ...a }));
  const valores = t("valores.items", { returnObjects: true }).map((texto, i) => ({
    nombre: VALORES[i],
    texto,
  }));

  return (
    <Pagina activo="nosotros">
      <Seo path="/about" title={t("seo.title")} description={t("seo.description")} />

      <Hero eyebrow={t("hero.eyebrow")} titular={<T t={t} k="hero.titular" />} lede={t("hero.lede")} />

      <Section surface="inset">
        <Cabecera
          eyebrow={t("porque.eyebrow")}
          titular={<T t={t} k="porque.titular" />}
          lede={t("porque.lede")}
        />
        <div className="v4-mt-12">
          <Filas items={historia} />
        </div>
        <div className="v4-mt-10">
          <Door href="/active-navigation">{t("porque.door")}</Door>
        </div>
      </Section>

      <Section surface="graphite">
        <Cabecera
          eyebrow={t("equipo.eyebrow")}
          titular={<T t={t} k="equipo.titular" />}
          lede={t("equipo.lede")}
        />
        <div className="v4-mt-12">
          <Areas items={areas} foto={{ src: "/equipo/equipo.jpg", alt: t("equipo.fotoAlt") }} />
        </div>
      </Section>

      <Section surface="inset">
        <Cabecera
          eyebrow={t("valores.eyebrow")}
          titular={<T t={t} k="valores.titular" />}
          lede={t("valores.lede")}
        />
        <div className="v4-mt-12">
          <Valores items={valores} />
        </div>
      </Section>

      <Cierre
        titular={<T t={t} k="cierre.titular" />}
        lede={t("cierre.lede")}
        cta={
          <>
            <Boton href="/contact">{t("cierre.cta")}</Boton>
            <Boton href="/contact" variant="ghost">
              {t("cierre.ctaGhost")}
            </Boton>
          </>
        }
      />
    </Pagina>
  );
}
