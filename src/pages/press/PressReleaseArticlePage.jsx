import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { pressReleasesApiService } from "../../services/pressReleasesApi";

const PressReleaseArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [press, setPress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPress = async () => {
      try {
        setIsLoading(true);
        const data = await pressReleasesApiService.getPressReleaseBySlug(slug);
        setPress(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPress();
    } else {
      setError("No se proporcionó slug de la nota de prensa");
      setIsLoading(false);
    }
  }, [slug]);

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
                  img: ({ src, alt, ...props }) => (
                    <img
                      src={src}
                      alt={alt}
                      {...props}
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  ),
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando nota de prensa...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !press) {
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">
              {error || "Nota no encontrada"}
            </div>
            <Link
              href="/press-releases"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Volver a las notas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getImageUrl = () => {
    if (!press?.cover) return "https://www.advia.tech/og-default.jpg";

    const coverUrl = press.cover.formats?.large?.url || press.cover.url;
    return coverUrl.startsWith("http")
      ? coverUrl
      : `https://www.advia.tech${coverUrl}`;
  };

  const getCurrentUrl = () => {
    return `https://www.advia.tech/press-releases/article/${slug}`;
  };

  return (
    <>
      <Helmet>
        <title>{press.title} | Notas de prensa Advia</title>
        <meta
          name="description"
          content={press.description || "Notas de prensa de Advia."}
        />

        <meta property="og:title" content={press.title} />
        <meta
          property="og:description"
          content={press.description || "Notas de prensa de Advia."}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getCurrentUrl()} />
        <meta property="og:image" content={getImageUrl()} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Advia" />
        <meta property="article:published_time" content={press.createdAt} />
        {press.updatedAt && (
          <meta property="article:modified_time" content={press.updatedAt} />
        )}
        {press.author?.name && (
          <meta property="article:author" content={press.author.name} />
        )}
        {press.category?.name && (
          <meta property="article:section" content={press.category.name} />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={press.title} />
        <meta
          name="twitter:description"
          content={press.description || "Notas de prensa de Advia."}
        />
        <meta name="twitter:image" content={getImageUrl()} />

        <link rel="canonical" href={getCurrentUrl()} />
      </Helmet>

      <article className="relative py-32 bg-gradient-to-b from-white to-gray-50/30 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/press-releases" className="hover:text-orange-600">
                Notas de prensa
              </Link>
              <span>/</span>
              <span className="text-gray-900">{press.title}</span>
            </div>
          </nav>

          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time dateTime={press.createdAt}>
                {formatDate(press.createdAt)}
              </time>
              {press.author && <span>Por {press.author.name}</span>}
              {press.category && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                  {press.category.name}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-black mb-6 leading-tight tracking-tight leading-[1.1]">
              {press.title}
            </h1>

            {press.description && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {press.description}
              </p>
            )}
          </header>

          {press.cover && (
            <div className="mb-8">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={press.cover.formats?.large?.url || press.cover.url}
                  alt={press.cover.alternativeText || press.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            {press.blocks ? (
              renderBlocks(press.blocks)
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600">Contenido no disponible.</p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-8">
            <Link
              href="/press-releases"
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
              Volver a notas
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default PressReleaseArticlePage;
