import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const PressReleaseArticle = ({ press, error }) => {
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

  const getImageUrl = (doc) => {
    if (!doc?.cover) return "https://www.advia.tech/og-default.jpg";

    const coverUrl = doc.cover.formats?.large?.url || doc.cover.url;
    return coverUrl.startsWith("http")
      ? coverUrl
      : `https://www.advia.tech${coverUrl}`;
  };

  if (error || !press) {
    return (
      <>
        <Head>
          <title>Nota no encontrada | Advia</title>
          <meta
            name="description"
            content="La nota solicitada no fue encontrada."
          />
        </Head>
        <div className="min-h-screen py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-red-600 text-xl mb-4">
                {error || "Nota no encontrada"}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const imageUrl = getImageUrl(press);
  const currentUrl = `https://www.advia.tech/press-releases/article/${press.slug}`;

  return (
    <>
      <Head>
        <title>{`${press.title} | Notas de prensa Advia`}</title>
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
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={imageUrl} />
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
        <meta name="twitter:image" content={imageUrl} />

        <link rel="canonical" href={currentUrl} />
      </Head>

      <article className="relative py-32 bg-gradient-to-b from-white to-gray-50/30 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        </div>
      </article>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await fetch(
      `https://cms.advia.tech/api/press-releases?filters[slug][$eq]=${slug}&populate[author]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );

    if (!response.ok) {
      throw new Error(`Error fetching press release: ${response.statusText}`);
    }

    const data = await response.json();
    const press = data.data.length > 0 ? data.data[0] : null;

    if (!press) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        press,
      },
    };
  } catch (error) {
    console.error("Error fetching press release:", error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default PressReleaseArticle;
