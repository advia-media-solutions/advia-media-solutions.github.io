import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import Formulario from "../../components/v4/careers/Formulario";
import { Cabecera, Hero, Miga, Pagina, Section } from "../../components/v4/layout";
import { CAREERS_PUBLISHED } from "../../careers/config";
import { RUTA_ESPONTANEA, preguntasEspontanea } from "../../careers/espontanea";

/**
 * Candidatura espontánea: el mismo formulario que una oferta, con dos
 * preguntas fijas y el consentimiento obligatorio. En Advia OS va a su propia
 * lista, no al Kanban de ninguna posición.
 */
export default function CareersEspontanea({ recaptchaSiteKey }) {
  const { t } = useTranslation("careers");
  const { locale = "es" } = useRouter();

  return (
    <Pagina activo="nosotros">
      <Seo
        path={RUTA_ESPONTANEA}
        title={t("espontanea.seoTitle")}
        description={t("espontanea.seoDescription")}
        noindex={!CAREERS_PUBLISHED}
      />
      <Hero
        miga={<Miga raiz={t("ficha.miga")} href="/careers" hoja={t("espontanea.miga")} />}
        titular={t("espontanea.titular")}
        titularTamano="l"
        lede={t("espontanea.lede")}
      />
      <Section surface="inset" id="aplicar">
        <Cabecera titular={t("form.titular")} lede={t("espontanea.formLede")} />
        <div className="v4-mt-10">
          <Formulario
            espontanea
            preguntas={preguntasEspontanea(locale)}
            recaptchaSiteKey={recaptchaSiteKey}
          />
        </div>
      </Section>
    </Pagina>
  );
}
