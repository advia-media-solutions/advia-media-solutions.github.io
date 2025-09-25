import React, { useState, useEffect } from "react";
import { pressReleasesApiService } from "../../services/pressReleasesApi";
import PressReleaseCard from "../../components/press/PressReleaseCard";
import Pagination from "../../components/Pagination";

const PressReleasesListPage = () => {
  const [pressReleases, setPressReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchPress = async () => {
      try {
        setIsLoading(true);
        const response = await pressReleasesApiService.getPressReleases(
          9,
          currentPage
        );
        setPressReleases(response.data || []);
        setPagination(response.meta?.pagination || null);
        setTotalPages(response.meta?.pagination?.pageCount || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPress();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando notas de prensa...</p>
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
              Error al cargar notas
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
    <section className="relative py-32 bg-gradient-to-b from-white to-gray-50/30 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black tracking-tight leading-[1.1]">
            Todas las notas
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Explora todas nuestras notas de prensa
          </p>
        </div>

        {pressReleases.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pressReleases.map((item) => (
                <PressReleaseCard key={item.id} press={item} />
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
            <div className="text-xl mb-4">📰</div>
            <p>No hay notas de prensa disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PressReleasesListPage;
