import React from "react";
import { traducciones } from "../src/i18n/servidor";
import Cookies from "../src/pages/v4/legal/Cookies";

export default function CookiesPolicyPage() {
  return <Cookies />;
}

CookiesPolicyPage.v4 = true;

export async function getStaticProps({ locale }) {
  return { props: { ...(await traducciones(locale, "legal")) } };
}
