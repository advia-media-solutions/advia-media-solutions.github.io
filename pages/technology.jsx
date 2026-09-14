import React from "react";
import Tecnologia from "../src/pages/v4/Tecnologia";

export default function TechnologyPage() {
  return <Tecnologia />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
TechnologyPage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
