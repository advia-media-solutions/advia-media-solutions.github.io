import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import Geo from "../../src/pages/v4/Geo";

export default function GeoPage() {
  return <Geo />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
GeoPage.v4 = true;

export async function getServerSideProps({ locale }) {
  return { props: { ...(await traducciones(locale, "geo")) } };
}
