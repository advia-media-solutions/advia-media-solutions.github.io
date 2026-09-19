import React from "react";
import { traducciones } from "../src/i18n/servidor";
import Nosotros from "../src/pages/v4/Nosotros";

export default function AboutPage() {
  return <Nosotros />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
AboutPage.v4 = true;

export async function getServerSideProps({ locale }) {
  return { props: { ...(await traducciones(locale, "nosotros")) } };
}
