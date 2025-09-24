import React from "react";
import Products from "../src/pages/Products";

export default function ProductsPage() {
  return <Products />;
}

export async function getServerSideProps() {
  return { props: {} };
}
