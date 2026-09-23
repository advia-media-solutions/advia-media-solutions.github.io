import React from "react";
import { traducciones } from "../src/i18n/servidor";
import NoEncontrada from "../src/pages/v4/NoEncontrada";

export default function NotFoundPage() {
  return <NoEncontrada />;
}

NotFoundPage.v4 = true;

/* La 404 no admite getServerSideProps: se genera en build, una por idioma. */
export async function getStaticProps({ locale }) {
  return { props: { ...(await traducciones(locale, "noEncontrada")) } };
}
