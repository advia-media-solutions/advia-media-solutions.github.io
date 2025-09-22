import React, { useState, useEffect } from "react";
import { blogApiService } from "../../services/blogApi";
import BlogArticleCard from "../../components/blog/BlogArticleCard";
import Pagination from "../../components/Pagination";

const BlogArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await blogApiService.getArticles(9, currentPage);
        setArticles(response.data || []);
        setPagination(response.meta?.pagination || null);
        setTotalPages(response.meta?.pagination?.pageCount || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-32">
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
      <div className="min-h-screen py-32">
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
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-[1.1] relative">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent bg-[length:300%_auto] animate-gradient">
              Todos los Artículos
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-yellow-300/30 to-orange-400/30 -skew-y-1 transform rounded-2xl blur-xl scale-110 animate-pulse"></div>
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Explora nuestra colección completa de artículos
          </p>
        </div>

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <BlogArticleCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
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
