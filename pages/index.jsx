import React from "react";
import Homepage from "../src/pages/Homepage";

export default function IndexPage() {
  return <Homepage />;
}

export async function getServerSideProps() {
  return { props: {} };
}
