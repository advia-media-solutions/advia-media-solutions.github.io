import React from "react";
import { traducciones } from "../../../src/i18n/servidor";
import PublicidadIA from "../../../src/pages/v4/PublicidadIA";

export default function PublicidadIAPage() {
  return <PublicidadIA />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
PublicidadIAPage.v4 = true;

export async function getServerSideProps({ locale }) {
  return { props: { ...(await traducciones(locale, "publicidadIA")) } };
}
