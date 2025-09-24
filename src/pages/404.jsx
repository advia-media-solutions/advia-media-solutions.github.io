import React from "react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-accent-cream/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-light/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-primary-light/15 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-DEFAULT/20 rounded-full blur-2xl animate-float-fast" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-dark tracking-tight leading-tight mb-6 mt-8">
            ¡Ups! Esta página se ha{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] px-2 py-1 relative z-10">
                transformado
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
            </span>
          </h1>

          {/* Marketing-oriented Description */}
          <div className="space-y-6 mb-12">
            <p className="text-lg md:text-xl text-neutral-DEFAULT/80 max-w-2xl mx-auto leading-relaxed">
              Mientras buscas esta página, ¿por qué no descubres cómo podemos
              transformar tu presencia digital? En Advia, convertimos cada
              desafío en una oportunidad de crecimiento.
            </p>
            <p className="text-lg md:text-xl text-neutral-DEFAULT/80 max-w-2xl mx-auto leading-relaxed">
              Únete a las empresas que ya están revolucionando su manera de
              conectar con sus clientes a través de nuestra tecnología IA.
            </p>
          </div>

          {/* Single CTA Button */}
          <Link
            href="/"
            className="relative z-10 bg-glass-medium hover:bg-glass-heavy backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-3 px-8 py-4 rounded-full text-neutral-dark font-medium group"
          >
            <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Descubre Advia</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
