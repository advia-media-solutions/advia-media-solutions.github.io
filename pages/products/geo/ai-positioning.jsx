import React from "react";
import { traducciones } from "../../../src/i18n/servidor";
import PosicionamientoIA from "../../../src/pages/v4/PosicionamientoIA";

export default function PosicionamientoIAPage() {
  return <PosicionamientoIA />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
PosicionamientoIAPage.v4 = true;

export async function getStaticProps({ locale }) {
  return { props: { ...(await traducciones(locale, "posicionamientoIA")) } };
}
