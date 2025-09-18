import React, { useState, useEffect } from "react";
import { blogApiService } from "../../services/blogApi";
import BlogArticleCard from "../../components/blog/BlogArticleCard";

const BlogArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await blogApiService.getArticles();
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

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Todos los Artículos</h1>
          <p className="text-lg text-gray-600 mt-2">
            Explora nuestra colección completa de artículos
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <BlogArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <div className="text-xl mb-4">📚</div>
            <p>No hay artículos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogArticlesPage;