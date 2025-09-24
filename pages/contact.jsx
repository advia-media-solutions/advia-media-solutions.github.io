import React from "react";
import Contact from "../src/pages/Contact";

export default function ContactPage() {
  return <Contact />;
}

export async function getServerSideProps() {
  return { props: {} };
}
