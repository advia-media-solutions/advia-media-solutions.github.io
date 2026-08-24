import React from "react";
import Productos from "../src/pages/v4/Productos";

export default function ProductsPage() {
  return <Productos />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
ProductsPage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
