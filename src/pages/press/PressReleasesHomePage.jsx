import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pressReleasesApiService } from "../../services/pressReleasesApi";
import PressReleaseCard from "../../components/press/PressReleaseCard";
import FeaturedPressRelease from "../../components/press/FeaturedPressRelease";

const PressReleasesHomePage = () => {
  const [pressReleases, setPressReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPress = async () => {
      try {
        setIsLoading(true);
        const response =
          await pressReleasesApiService.getPressReleasesForHomepage();
        setPressReleases(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPress();
  }, []);

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

  const latest = pressReleases[0];
  const remaining = pressReleases.slice(1);

  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-gray-50/30 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black tracking-tight leading-[1.1]">
            Notas de prensa
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Comunicados y novedades oficiales de Advia.
          </p>
        </div>

        {latest && <FeaturedPressRelease press={latest} />}

        {remaining.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black tracking-tight leading-[1.1]">
                Más notas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {remaining.slice(0, 6).map((item) => (
                <PressReleaseCard key={item.id} press={item} />
              ))}
            </div>
          </>
        ) : latest ? null : (
          <div className="text-center text-gray-600 py-12">
            <div className="text-xl mb-4">📰</div>
            <p>No hay notas de prensa disponibles en este momento.</p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/press-releases/articles"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium text-white bg-gradient-to-r from-orange-400 to-yellow-300 hover:from-orange-500 hover:to-yellow-400 shadow-2xl hover:shadow-orange-400/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3 justify-center">
              Ver todas las notas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PressReleasesHomePage;
