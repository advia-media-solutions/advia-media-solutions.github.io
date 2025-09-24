import React from "react";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const BlogArticle = ({ article, error }) => {
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

  const getImageUrl = (article) => {
    if (!article?.cover) return "https://www.advia.tech/og-default.jpg";

    const coverUrl = article.cover.formats?.large?.url || article.cover.url;
    return coverUrl.startsWith("http")
      ? coverUrl
      : `https://www.advia.tech${coverUrl}`;
  };

  if (error || !article) {
    return (
      <>
        <Head>
          <title>Artículo no encontrado | Blog Advia</title>
          <meta
            name="description"
            content="El artículo solicitado no fue encontrado."
          />
        </Head>
        <div className="min-h-screen py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-red-600 text-xl mb-4">
                {error || "Artículo no encontrado"}
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                ← Volver al blog
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const imageUrl = getImageUrl(article);
  const currentUrl = `https://www.advia.tech/blog/article/${article.slug}`;

  return (
    <>
      <Head>
        <title>{`${article.title} | Blog Advia`}</title>
        <meta
          name="description"
          content={
            article.description ||
            "Artículo del blog de Advia sobre marketing digital y navegación activa."
          }
        />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={article.title} />
        <meta
          property="og:description"
          content={
            article.description ||
            "Artículo del blog de Advia sobre marketing digital y navegación activa."
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Advia" />
        <meta property="article:published_time" content={article.createdAt} />
        {article.updatedAt && (
          <meta property="article:modified_time" content={article.updatedAt} />
        )}
        {article.author?.name && (
          <meta property="article:author" content={article.author.name} />
        )}
        {article.category?.name && (
          <meta property="article:section" content={article.category.name} />
        )}

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta
          name="twitter:description"
          content={
            article.description ||
            "Artículo del blog de Advia sobre marketing digital y navegación activa."
          }
        />
        <meta name="twitter:image" content={imageUrl} />

        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
      </Head>

      <article className="relative py-32 bg-gradient-to-b from-white to-gray-50/30 overflow-hidden">
        {/* Fondo limpio con patrón sutil */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/blog" className="hover:text-orange-600">
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

            <h1 className="text-4xl font-bold text-black mb-6 leading-tight tracking-tight leading-[1.1]">
              {article.title}
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
              href="/blog"
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
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await fetch(
      `https://cms.advia.tech/api/articles?filters[slug][$eq]=${slug}&populate[author]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );

    if (!response.ok) {
      throw new Error(`Error fetching article: ${response.statusText}`);
    }

    const data = await response.json();
    const article = data.data.length > 0 ? data.data[0] : null;

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default BlogArticle;
