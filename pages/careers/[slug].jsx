import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import { posicionPorSlug } from "../../src/services/careersApi";
import { fichaPosicion } from "../../src/careers/ficha";
import CareersFicha from "../../src/pages/v4/CareersFicha";

export default function CareersFichaPage(props) {
  return <CareersFicha {...props} />;
}

CareersFichaPage.v4 = true;

/* En cada petición: una oferta que se cierra en Advia OS responde 404 al
   momento, que es lo que Google necesita para retirarla. Si Advia OS no
   responde, la petición falla (500) en vez de fingir que no existe. La clave
   de sitio de reCAPTCHA es pública, pero se lee en ejecución porque las
   variables de Cloud Run no existen durante el build. */
export async function getServerSideProps({ params, locale = "es" }) {
  const posicion = await posicionPorSlug(params.slug);
  if (!posicion) return { notFound: true };
  return {
    props: {
      ...(await traducciones(locale, "careers")),
      ficha: fichaPosicion(posicion, locale),
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || null,
    },
  };
}
