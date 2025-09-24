import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Globe,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";

// Importar el logo de Vera
// import VeraLogo from './path/to/vera-logo.svg';

// Componente para el logo de Vera mejorado
const VeraLogo = ({ className, size = "medium" }) => {
  const sizeClasses = {
    small: "w-16 h-6",
    medium: "w-20 h-8",
    large: "w-24 h-10",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <img
        src="https://storage.googleapis.com/public-web-assets-advia/Vera.png"
        alt="Vera Technology Logo"
        className="w-full h-full object-contain drop-shadow-sm"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-300/20 blur-md rounded-lg -z-10"></div>
    </div>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 md:pt-24 flex items-center bg-gradient-to-b from-white to-gray-50/30 overflow-hidden">
      {/* Fondo limpio con patrón sutil */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content - Ancho original */}
          <div
            className={`space-y-12 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Badge mejorado */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/50 text-xs sm:text-sm text-gray-800 shadow-2xl hover:shadow-gray-100/50 hover:scale-105 transition-all duration-500 cursor-default">
                <div className="relative flex-shrink-0">
                  <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                  <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-20"></div>
                </div>
                <span className="font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  <b>Navegación Activa</b> en campañas publicitarias digitales
                </span>
              </div>
            </div>

            {/* Main Heading con tipografía original */}
            <div className="space-y-8 text-center md:text-left">
              <h1 className="text-5xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] relative">
                <span className="block">Turning ads</span>
                <span className="block mt-1 md:mt-2">
                  <span>into </span>
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-orange-400 via-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent bg-[length:300%_auto] animate-gradient">
                      answers
                    </span>
                    {/* Efecto de brillo */}
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-yellow-300/30 to-orange-400/30 -skew-y-1 transform rounded-2xl blur-xl scale-110 animate-pulse"></span>
                  </span>
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-medium relative mx-auto md:mx-0">
                En Advia, creemos en el poder de la publicidad para generar
                valor al consumidor. Usamos tecnología para adelantarnos a las
                necesidades del consumidor y posicionar tu marca en
                <span className="relative inline-block ml-1">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                    los momentos relevantes
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-300 transform scale-x-0 animate-pulse"></span>
                </span>
                .
              </p>
            </div>

            {/* CTA Buttons mejorados */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-8 justify-center md:justify-start">
              <button
                onClick={() => router.push("/about")}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium text-white bg-gradient-to-r from-orange-400 to-yellow-300 hover:from-orange-500 hover:to-yellow-400 shadow-2xl hover:shadow-orange-400/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3 justify-center">
                  Sobre Advia
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              <button
                onClick={() => router.push("/products")}
                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium text-gray-700 bg-white/80 hover:bg-white backdrop-blur-xl border border-gray-200/50 hover:border-orange-300/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 justify-center">
                  Productos
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Trust Indicators mejorados */}
            <div className="pt-8 md:pt-12 border-t border-gray-200/50">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                <div className="flex gap-8 xs:gap-12 sm:gap-16 justify-center md:justify-start">
                  <div className="group text-center md:text-left cursor-default">
                    <div className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 transition-all duration-500 relative">
                      x2.8
                      <TrendingUp className="absolute -top-1 -right-4 xs:-right-6 w-4 xs:w-6 h-4 xs:h-6 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
                      Mayor Afinidad
                    </div>
                  </div>
                  <div className="group text-center md:text-left cursor-default">
                    <div className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 transition-all duration-500 relative">
                      x2.2
                      <Zap className="absolute -top-1 -right-4 xs:-right-6 w-4 xs:w-6 h-4 xs:h-6 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
                      Eficiencia navegación activa
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-50" />

                <div className="group flex items-center gap-3 sm:gap-4 cursor-default mt-4 md:mt-0">
                  <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-400/20 via-yellow-300/20 to-orange-400/20 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <ShieldCheck className="w-6 sm:w-8 h-6 sm:h-8 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      Google Partner
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600">
                      Programa Google for Startups
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Visible en mobile también */}
          <div
            className={`relative transition-all duration-1000 delay-300 mt-8 md:mt-0 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Glassmorphism Card mejorado */}
              <div className="relative bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/50 shadow-2xl p-6 sm:p-8 md:p-10 overflow-hidden">
                {/* Efectos de fondo limpios */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-gray-100/30 to-gray-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tr from-gray-200/30 to-gray-100/30 rounded-full blur-2xl"></div>

                <div className="relative space-y-8">
                  {/* Header mejorado con estilo similar a "answers" */}
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold relative inline-block">
                      <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        Navegación Activa
                      </span>
                      {/* Efecto de brillo similar a answers */}
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-yellow-300/20 to-orange-400/20 -skew-y-1 transform rounded-xl blur-lg scale-110 animate-pulse"></span>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Entendemos los momentos cruciales donde tus clientes toman
                      decisiones y cómo tu marca puede ser la respuesta. Tener
                      presencia en la navegación activa te permite trabajar la
                      consideración en un momento clave para la toma de decisión
                      futura.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Vera Technology Block - Rediseñado */}
                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 hover:from-white/80 hover:to-white/50 backdrop-blur-xl border border-white/40 hover:border-gray-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="relative flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-orange-400/15 via-yellow-300/15 to-orange-400/15 rounded-2xl group-hover:from-orange-400/25 group-hover:to-yellow-300/25 transition-all duration-500 w-full sm:w-auto sm:min-w-fit">
                          <VeraLogo
                            className="group-hover:scale-110 transition-transform duration-500"
                            size="medium"
                          />
                          {/* Efecto de brillo */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="space-y-3 flex-1">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-500 leading-tight">
                            <b>
                              Vera, tecnología propia que anticipa el
                              comportamiento del consumidor
                            </b>
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Nuestra tecnología identifica qué preguntas se
                            plantea el consumidor, predice a qué artículos y
                            contenidos navegará al buscar información y
                            posiciona estratégicamente la publicidad como
                            respuesta natural a esas necesidades.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* How We Do It Block - Rediseñado */}
                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 hover:from-white/80 hover:to-white/50 backdrop-blur-xl border border-white/40 hover:border-gray-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                      <div className="flex items-start gap-4 sm:gap-6">
                        <div className="relative p-4 bg-gradient-to-br from-orange-400/15 to-yellow-300/15 rounded-2xl group-hover:from-orange-400/25 group-hover:to-yellow-300/25 transition-all duration-500 min-w-fit hidden sm:block">
                          <Sparkles className="w-6 h-6 text-orange-500 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-500">
                            <b>¿Cómo lo Hacemos?</b>
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            <b>Vera</b> es una tecnología <b>multi-agente</b>{" "}
                            para simular potenciales clientes de la marca y
                            darles capacidades de búsqueda en internet, creando
                            así <b>consumidores digitales de la marca</b>.
                            Simulamos miles de ellos, observamos cómo se
                            comportan y llevamos toda esta información a una
                            activación de medios para convertir a la marca en la
                            respuesta que necesita.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elementos decorativos limpios */}
              <div className="absolute -z-10 inset-0 translate-x-6 translate-y-6">
                <div className="w-full h-full rounded-3xl bg-gradient-to-r from-gray-200/40 to-gray-300/40 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
