import React from "react";
import Privacidad from "../src/pages/v4/legal/Privacidad";

export default function PrivacyPolicyPage() {
  return <Privacidad />;
}

PrivacyPolicyPage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
