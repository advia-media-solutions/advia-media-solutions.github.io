import React from "react";
import { traducciones } from "../src/i18n/servidor";
import Privacidad from "../src/pages/v4/legal/Privacidad";

export default function PrivacyPolicyPage() {
  return <Privacidad />;
}

PrivacyPolicyPage.v4 = true;

export async function getStaticProps({ locale }) {
  return { props: { ...(await traducciones(locale, "legal")) } };
}
