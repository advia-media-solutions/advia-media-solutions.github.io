import React from "react";
import Link from "next/link";

const PressReleaseCard = ({ press }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video overflow-hidden">
        {press.cover ? (
          <img
            src={press.cover.formats?.medium?.url || press.cover.url}
            alt={press.cover.alternativeText || press.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link
            href={`/press-releases/article/${press.slug}`}
            className="hover:text-orange-600 transition-colors"
          >
            {press.title}
          </Link>
        </h2>

        {press.description && (
          <p className="text-gray-600 text-sm mb-4">
            {truncateText(press.description)}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={press.createdAt}>
              {formatDate(press.createdAt)}
            </time>
            {press.author && <span>Por {press.author.name}</span>}
          </div>

          <Link
            href={`/press-releases/article/${press.slug}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm"
          >
            Leer más
            <svg
              className="w-4 h-4 ml-2"
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

export default PressReleaseCard;
