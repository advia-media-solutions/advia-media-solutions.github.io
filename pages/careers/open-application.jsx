import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import CareersEspontanea from "../../src/pages/v4/CareersEspontanea";

export default function CareersEspontaneaPage(props) {
  return <CareersEspontanea {...props} />;
}

CareersEspontaneaPage.v4 = true;

/* En cada petición solo por la clave de sitio de reCAPTCHA, que se lee en
   ejecución (las variables de Cloud Run no existen durante el build). Esta
   ruta fija gana a /careers/[slug]. */
export async function getServerSideProps({ locale = "es" }) {
  return {
    props: {
      ...(await traducciones(locale, "careers")),
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || null,
    },
  };
}
