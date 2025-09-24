import React from "react";
import BlogHomePage from "../../src/pages/blog/BlogHomePage";

export default function BlogIndexPage() {
  return <BlogHomePage />;
}

export async function getServerSideProps() {
  return { props: {} };
}
