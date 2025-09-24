import React from "react";
import NotFound from "../src/pages/404";

export default function NotFoundPage() {
  return <NotFound />;
}

export async function getServerSideProps() {
  return { props: {} };
}
