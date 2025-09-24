import React from "react";
import LegalNotice from "../src/pages/LegalNotice";

export default function LegalNoticePage() {
  return <LegalNotice />;
}

export async function getServerSideProps() {
  return { props: {} };
}
