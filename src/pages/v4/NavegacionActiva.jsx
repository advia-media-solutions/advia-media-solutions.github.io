import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import Momentos from "../../components/v4/Momentos";
import Recorrido from "../../components/v4/Recorrido";
import { Cabecera, Hero, Pagina, Section } from "../../components/v4/layout";
import { Cita, Door, Nota } from "../../components/v4/primitives";

/**
 * Navegación Activa · el concepto (how, parte 1).
 *
 * La home enseña el contraste con un dibujo y manda aquí. Aquí se enseña con
 * metraje: dos planos del mismo gesto —un dedo sobre un teléfono— separados por
 * si hay una pregunta detrás o no. Lo que allí era esquema, aquí ocurre.
 *
 * Después, un solo escalón: un recorrido de cerca, y por qué eso importa. La
 * página define el concepto y nada más. Todo lo que era Vera enseñando su
 * trabajo vive en /technology, que es donde se cuenta el motor.
 *
 * Entre el hero y el recorrido no va nada: el hero conecta directo con el
 * recorrido. Del recorrido sale una puerta a /technology, y la página termina
 * en la cita del blog: la frase que resume el concepto es el cierre.
 *
 * El copy vive en public/locales/{es,en}/navegacion.json.
 */
export default function NavegacionActiva() {
  const { t } = useTranslation("navegacion");

  /* Los dos planos del hero. El pasivo va en blanco y negro de origen: el gris
     es parte del argumento —no ha habido ninguna pregunta—, no un filtro. El
     activo va a color y lleva la pregunta encima. */
  const pasiva = {
    label: t("momentos.pasiva.label"),
    src: "/video/scrolling",
    poster: "/video/scrolling.jpg",
    descripcion: t("momentos.pasiva.descripcion"),
  };
  const activa = {
    label: t("momentos.activa.label"),
    src: "/video/searching",
    poster: "/video/searching.jpg",
    descripcion: t("momentos.activa.descripcion"),
  };

  /* Las cinco preguntas de una misma decisión: una sola persona, cinco sitios,
     ninguna plataforma que la alcance entera. La sección entra sin titular: la
     animación ES el argumento. */
  const recorrido = t("recorrido.paradas", { returnObjects: true });

  return (
    <Pagina activo="navegacion">
      <Seo
        path="/navegacion-activa"
        title={t("seo.title")}
        description={t("seo.description")}
      />

      <Hero
        titular={<T t={t} k="hero.titular" />}
        lede={t("hero.lede")}
        aparte={<Momentos pasiva={pasiva} activa={activa} />}
      />

      <Section surface="inset">
        <Cabecera lede={t("recorrido.lede")} />
        <Recorrido
          paradas={recorrido}
          nota={
            <Nota meta={t("recorrido.notaMeta")}>
              <T t={t} k="recorrido.nota" />
            </Nota>
          }
        />
        {/* La puerta a la tecnología: el recorrido es lo que Vera dibuja, y
            allí se cuenta cómo. */}
        <div className="v4-mt-10">
          <Door href="/technology">{t("recorrido.door")}</Door>
        </div>
      </Section>

      <Section surface="graphite">
        <Cabecera titular={<T t={t} k="util.titular" />} lede={t("util.lede")} />
        <div className="v4-mt-12">
          <Cita fuente={t("util.citaFuente")} href="/blog/article/introduccion-navegacion-activa">
            <T t={t} k="util.cita" />
          </Cita>
        </div>
      </Section>
    </Pagina>
  );
}
