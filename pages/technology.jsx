import React from "react";
import Technology from "../src/pages/Technology";

export default function TechnologyPage() {
  return <Technology />;
}

export async function getServerSideProps() {
  return { props: {} };
}
