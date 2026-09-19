import React from "react";
import { traducciones } from "../../src/i18n/servidor";
import PaidMedia from "../../src/pages/v4/PaidMedia";

export default function PaidMediaPage() {
  return <PaidMedia />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
PaidMediaPage.v4 = true;

export async function getServerSideProps({ locale }) {
  return { props: { ...(await traducciones(locale, "paidMedia")) } };
}
