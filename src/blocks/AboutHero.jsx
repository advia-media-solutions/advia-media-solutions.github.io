import React from "react";
import { Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-accent-cream/10" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-glass-light to-glass-medium backdrop-blur-md border border-white/30 text-sm text-neutral-dark/90 shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
            <Sparkles className="w-4 h-4 text-secondary-DEFAULT animate-pulse" />
            <span className="font-medium">Nuestra Misión</span>
          </div>

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
              Nuestra misión es revolucionar el marketing digital mediante la
              fusión de inteligencia artificial y comprensión profunda del
              comportamiento humano. Desarrollamos modelos avanzados que simulan
              las interacciones digitales, permitiendo a las empresas establecer
              conexiones auténticas y significativas con sus audiencias.
              Aspiramos a crear un ecosistema publicitario más preciso, seguro y
              eficiente, donde la tecnología potencie la comunicación humana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
