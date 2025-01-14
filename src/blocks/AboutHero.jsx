import React from "react";
import { Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center mt-0 md:mt-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-accent-cream/10" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-dark tracking-tight leading-tight">
              Potenciando el{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] px-2 py-1 relative z-10">
                  Futuro
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
              </span>{" "}
              del Marketing
            </h1>

            <p className="text-xl md:text-2xl text-neutral-DEFAULT/80 max-w-3xl mx-auto leading-relaxed">
              En Advia, combinamos{" "}
              <span className="font-bold">inteligencia artificial</span> y{" "}
              <span className="font-bold">comportamiento humano</span> para
              revolucionar el marketing digital. Nuestros modelos avanzados
              ayudan a las <span className="font-bold">marcas</span> a crear
              conexiones auténticas con sus audiencias, construyendo un
              ecosistema publicitario más preciso y eficiente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
