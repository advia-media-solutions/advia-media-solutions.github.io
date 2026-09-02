import React from "react";
import BlogArticulos from "../../src/pages/v4/blog/BlogArticulos";

export default function BlogArticles() {
  return <BlogArticulos />;
}

BlogArticles.v4 = true;

export async function getServerSideProps() {
  return { props: {} };
}
