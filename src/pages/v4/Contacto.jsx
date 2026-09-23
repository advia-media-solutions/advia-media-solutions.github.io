import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cabecera, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import MapaOficina from "../../components/v4/MapaOficina";
import { ArrowOutward } from "../../components/v4/primitives";

/**
 * Contacto · el destino de todos los CTA del sitio.
 *
 * El copy vive en public/locales/{es,en}/contacto.json.
 */
export default function Contacto() {
  const { t } = useTranslation("contacto");

  return (
    <Pagina>
      <Seo path="/contact" title={t("seo.title")} description={t("seo.description")} />

      <Hero
        titular={<T t={t} k="hero.titular" />}
        lede={t("hero.lede")}
        acciones={
          <a className="v4-btn v4-btn--primary" href="mailto:contact@advia.tech">
            contact@advia.tech
          </a>
        }
      />

      <Section surface="inset">
        <Cabecera titular={<T t={t} k="visita.titular" />} />
        {/* El croquis a la izquierda como dibujo, sin card; a la derecha la
            dirección y la puerta a Google Maps, apoyadas en la base del plano.
            Sin entradilla: la dirección ya lo dice todo. */}
        <div className="v4-mt-12">
          <Split cols="1-1" align="end">
            <MapaOficina descripcion={t("visita.mapa")} />
            <div className="v4-oficina">
              <p className="v4-lede" style={{ color: "var(--v4-fg)" }}>
                {t("visita.direccion")}
                <br />
                {t("visita.ciudad")}
              </p>
              <a
                className="v4-door v4-mt-8"
                href="https://www.google.com/maps/search/?api=1&query=Paseo+de+la+Castellana+154%2C+28046+Madrid"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("visita.comoLlegar")}
                <ArrowOutward />
              </a>
            </div>
          </Split>
        </div>
      </Section>
    </Pagina>
  );
}
