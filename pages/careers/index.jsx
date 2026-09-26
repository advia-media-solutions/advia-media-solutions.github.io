import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import { posicionesAbiertas } from "../../src/services/careersApi";
import { resumenPosicion } from "../../src/careers/formato";
import Careers from "../../src/pages/v4/Careers";

export default function CareersPage({ posiciones }) {
  return <Careers posiciones={posiciones} />;
}

CareersPage.v4 = true;

/* En cada petición, no estático: una posición que se cierra en Advia OS tiene
   que desaparecer ya, no en el siguiente build. Si Advia OS no responde, la
   página sale igual y el listado dice que no ha podido cargar (posiciones
   null), que no es lo mismo que «no hay ofertas». */
export async function getServerSideProps({ locale = "es" }) {
  let posiciones = null;
  try {
    posiciones = (await posicionesAbiertas()).map((p) => resumenPosicion(p, locale));
  } catch (error) {
    console.error("[careers] no se pudieron cargar las posiciones:", error.message);
  }
  return { props: { ...(await traducciones(locale, "careers")), posiciones } };
}
