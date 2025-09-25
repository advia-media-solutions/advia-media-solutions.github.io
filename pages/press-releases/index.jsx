import React from "react";
import PressReleasesHomePage from "../../src/pages/press/PressReleasesHomePage";

export default function PressReleasesIndexPage() {
  return <PressReleasesHomePage />;
}

export async function getServerSideProps() {
  return { props: {} };
}
