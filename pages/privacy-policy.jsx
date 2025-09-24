import React from "react";
import PrivacyPolicy from "../src/pages/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

export async function getServerSideProps() {
  return { props: {} };
}
