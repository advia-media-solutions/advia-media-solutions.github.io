import React from "react";
import NavegacionActiva from "../src/pages/v4/NavegacionActiva";

export default function NavegacionActivaPage() {
  return <NavegacionActiva />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
NavegacionActivaPage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
