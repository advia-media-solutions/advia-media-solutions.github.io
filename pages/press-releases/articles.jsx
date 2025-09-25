import React from "react";
import PressReleasesListPage from "../../src/pages/press/PressReleasesListPage";

export default function PressReleasesArticlesPage() {
  return <PressReleasesListPage />;
}

export async function getServerSideProps() {
  return { props: {} };
}
