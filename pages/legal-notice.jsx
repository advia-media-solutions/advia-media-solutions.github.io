import React from "react";
import AvisoLegal from "../src/pages/v4/legal/AvisoLegal";

export default function LegalNoticePage() {
  return <AvisoLegal />;
}

LegalNoticePage.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
