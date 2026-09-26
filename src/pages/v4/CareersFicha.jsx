import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import Formulario from "../../components/v4/careers/Formulario";
import { Cabecera, Hero, Miga, Pagina, Section } from "../../components/v4/layout";
import { Boton, Chips } from "../../components/v4/primitives";
import { rangoSalarial } from "../../careers/formato";
import { jobPosting } from "../../careers/jobPosting";
import { CAREERS_PUBLISHED } from "../../careers/config";

/**
 * Ficha de una posición: cabecera con lo esencial (equipo, dónde, cómo y
 * salario), la descripción que llega de Advia OS (ya saneada en servidor) y el
 * formulario al final. El JSON-LD JobPosting solo sale con la página
 * publicada: mientras tanto no queremos aparecer en Google for Jobs.
 */

/** Lo esencial del puesto como etiquetas bajo el titular, salario incluido. */
function Datos({ ficha }) {
  const { t } = useTranslation("careers");
  const { locale = "es" } = useRouter();
  const items = [
    ficha.team,
    ficha.location,
    ficha.workMode && t(`modalidad.${ficha.workMode}`),
    ficha.employmentType && t(`jornada.${ficha.employmentType}`),
    `${rangoSalarial(ficha, locale)} ${t("posiciones.periodo")}`,
  ].filter(Boolean);
  return <Chips items={items} />;
}

export default function CareersFicha({ ficha, recaptchaSiteKey }) {
  const { t } = useTranslation("careers");

  return (
    <Pagina>
      <Seo
        path={`/careers/${ficha.slug}`}
        title={t("ficha.seoTitle", { puesto: ficha.title })}
        description={ficha.summary || t("seo.description")}
        noindex={!CAREERS_PUBLISHED}
      />
      {CAREERS_PUBLISHED ? (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting(ficha)) }}
          />
        </Head>
      ) : null}

      <Hero
        miga={<Miga raiz={t("ficha.miga")} href="/careers" hoja={ficha.team || ficha.title} />}
        titular={ficha.title}
        titularTamano="l"
        lede={ficha.summary}
        pie={<Datos ficha={ficha} />}
        acciones={<Boton href="#aplicar">{t("ficha.aplicar")}</Boton>}
      />

      <Section>
        <div className="v4-prosa" dangerouslySetInnerHTML={{ __html: ficha.descriptionHtml }} />
      </Section>

      <Section surface="inset" id="aplicar">
        <Cabecera eyebrow={t("ficha.aplicar")} titular={t("form.titular")} lede={t("form.lede")} />
        <div className="v4-mt-10">
          <Formulario
            slug={ficha.slug}
            preguntas={ficha.questions}
            recaptchaSiteKey={recaptchaSiteKey}
          />
        </div>
      </Section>
    </Pagina>
  );
}
