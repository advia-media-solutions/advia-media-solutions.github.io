import React from "react";
import Cookies from "../src/pages/v4/legal/Cookies";

export default function CookiesPolicyPage() {
  return <Cookies />;
}

CookiesPolicyPage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
