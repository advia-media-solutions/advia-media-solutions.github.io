import React from "react";
import { Link } from "react-router-dom";

const FeaturedBlogArticle = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
      <div className="md:flex">
        {article.cover && (
          <div className="md:w-1/2">
            <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
              <img
                src={article.cover.formats?.large?.url || article.cover.url}
                alt={article.cover.alternativeText || article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        <div className={`p-8 ${article.cover ? "md:w-1/2" : "w-full"}`}>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <time dateTime={article.createdAt}>
              {formatDate(article.createdAt)}
            </time>
            {article.author && <span>Por {article.author.name}</span>}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            <Link
              to={`/blog/article/${article.slug || "article"}/${
                article.documentId
              }`}
              className="hover:text-orange-600 transition-colors"
            >
              {article.title}
            </Link>
          </h1>

          {article.description && (
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {truncateText(article.description)}
            </p>
          )}

          <Link
            to={`/blog/article/${article.slug || "article"}/${
              article.documentId
            }`}
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Leer artículo completo
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedBlogArticle;
