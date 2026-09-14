import React from "react";
import BlogHome from "../../src/pages/v4/blog/BlogHome";

export default function BlogIndexPage() {
  return <BlogHome />;
}

// Marca la ruta como v4: _app se salta el chrome antiguo (NavBar/Footer/gradiente)
// porque estas páginas traen su propia nav oscura y su propio footer.
BlogIndexPage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
