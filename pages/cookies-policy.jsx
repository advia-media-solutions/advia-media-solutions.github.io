import React from "react";
import CookiesPolicy from "../src/pages/CookiesPolicy";

export default function CookiesPolicyPage() {
  return <CookiesPolicy />;
}

export async function getServerSideProps() {
  return { props: {} };
}
