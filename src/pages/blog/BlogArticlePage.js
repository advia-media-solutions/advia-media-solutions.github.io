import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { blogApiService } from "../../services/blogApi";

const BlogArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const articleData = await blogApiService.getArticleById(id);
        setArticle(articleData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    } else {
      setError("No se proporcionó slug o ID del artículo");
      setIsLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderBlocks = (blocks) => {
    if (!blocks) return null;

    return blocks.map((block, index) => {
      switch (block.__component) {
        case "shared.rich-text":
          return (
            <div
              key={index}
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-strong:text-gray-900 prose-code:text-orange-600 prose-pre:bg-gray-50"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  // Custom styling for links
                  a: ({ children, href, ...props }) => (
                    <a
                      href={href}
                      {...props}
                      className="text-orange-600 hover:text-orange-700 underline"
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {children}
                    </a>
                  ),
                  // Custom styling for images
                  img: ({ src, alt, ...props }) => (
                    <img
                      src={src}
                      alt={alt}
                      {...props}
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  ),
                  // Custom styling for blockquotes
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      {...props}
                      className="border-l-4 border-orange-500 pl-4 italic text-gray-700 bg-orange-50 py-2 my-4"
                    >
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {block.body}
              </ReactMarkdown>
            </div>
          );
        default:
          return (
            <div key={index} className="my-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">
                Tipo de contenido: {block.__component}
              </p>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(block, null, 2)}
              </pre>
            </div>
          );
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando artículo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">
              {error || "Artículo no encontrado"}
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Volver al blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/blog" className="hover:text-orange-600">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <time dateTime={article.createdAt}>
              {formatDate(article.createdAt)}
            </time>
            {article.author && <span>Por {article.author.name}</span>}
            {article.category && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                {article.category.name}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight tracking-tight leading-[1.1] relative">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent bg-[length:300%_auto] animate-gradient">
              {article.title}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-yellow-300/30 to-orange-400/30 -skew-y-1 transform rounded-2xl blur-xl scale-110 animate-pulse"></div>
          </h1>

          {article.description && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.description}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {article.cover && (
          <div className="mb-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={article.cover.formats?.large?.url || article.cover.url}
                alt={article.cover.alternativeText || article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="mb-8">
          {article.blocks ? (
            renderBlocks(article.blocks)
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600">
                Contenido del artículo no disponible.
              </p>
            </div>
          )}
        </div>

        {/* Back to Blog */}
        <div className="border-t border-gray-200 pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al blog
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogArticlePage;
