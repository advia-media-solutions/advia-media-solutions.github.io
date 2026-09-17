import React from "react";
import { traducciones } from "../src/i18n/servidor";
import Home from "../src/pages/v4/Home";

export default function IndexPage() {
  return <Home />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
IndexPage.v4 = true;

export async function getServerSideProps({ locale }) {
  return { props: { ...(await traducciones(locale, "home")) } };
}
