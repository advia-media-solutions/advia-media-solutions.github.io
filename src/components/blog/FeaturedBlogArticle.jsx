import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
                className="w-full h-full object-cover"
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
              to={`/blog/article/${article.slug}`}
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
            to={`/blog/article/${article.slug}`}
            className="group px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium text-gray-700 bg-white/80 hover:bg-white backdrop-blur-xl border border-gray-200/50 hover:border-orange-300/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
          >
            <div className="flex items-center gap-3 justify-center">
              Leer artículo completo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedBlogArticle;
