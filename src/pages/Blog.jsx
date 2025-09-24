import React from "react";
// No longer used in Next.js; kept for potential reuse
import BlogHomePage from "./blog/BlogHomePage";
import BlogArticlesPage from "./blog/BlogArticlesPage";
import BlogArticlePage from "./blog/BlogArticlePage";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<BlogHomePage />} />
        <Route path="/articles" element={<BlogArticlesPage />} />
        <Route path="/article/:slug" element={<BlogArticlePage />} />
      </Routes>
    </div>
  );
};

export default Blog;
