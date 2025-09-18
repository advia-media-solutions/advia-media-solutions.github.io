import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogApiService } from "../../services/blogApi";
import BlogArticleCard from "../../components/blog/BlogArticleCard";
import FeaturedBlogArticle from "../../components/blog/FeaturedBlogArticle";

const BlogHomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await blogApiService.getArticles();
        console.log("🚀 ~ fetchArticles ~ response:", response);
        setArticles(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando artículos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">
              Error al cargar artículos
            </div>
            <p className="text-gray-600">
              {error}. Por favor, inténtalo de nuevo más tarde.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const latestArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Blog ADVIA</h1>
          <p className="text-lg text-gray-600 mt-2">
            Últimas noticias y artículos sobre marketing digital e innovación
          </p>
        </div>

        {/* Featured Latest Article */}
        {latestArticle && <FeaturedBlogArticle article={latestArticle} />}

        {/* Other Articles */}
        {remainingArticles.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Más Artículos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {remainingArticles.slice(0, 6).map((article) => (
                <BlogArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : latestArticle ? null : (
          <div className="text-center text-gray-600 py-12">
            <div className="text-xl mb-4">📚</div>
            <p>No hay artículos disponibles en este momento.</p>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/blog/articles"
            className="inline-flex items-center bg-white border border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Ver Todos los Artículos
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
    </section>
  );
};

export default BlogHomePage;
