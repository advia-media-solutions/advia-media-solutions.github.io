import React from "react";
import Contacto from "../src/pages/v4/Contacto";

export default function ContactPage() {
  return <Contacto />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
ContactPage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
