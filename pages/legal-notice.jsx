import React from "react";
import { traducciones } from "../src/i18n/servidor";
import AvisoLegal from "../src/pages/v4/legal/AvisoLegal";

export default function LegalNoticePage() {
  return <AvisoLegal />;
}

LegalNoticePage.v4 = true;

export async function getStaticProps({ locale }) {
  return { props: { ...(await traducciones(locale, "legal")) } };
}
