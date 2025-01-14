import React, { useEffect } from "react";
import { Mail, MapPin } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center mt-16 md:mt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-accent-cream/10" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-dark tracking-tight leading-tight">
              Construyamos{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] px-2 py-1 relative z-10">
                  Juntos
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
              </span>{" "}
              el Futuro
            </h1>

            <p className="text-xl md:text-2xl text-neutral-DEFAULT/80 max-w-3xl mx-auto leading-relaxed">
              ¿Listo para transformar tu estrategia de marketing? Nuestro equipo
              está aquí para ayudarte a alcanzar tus objetivos. Contáctanos y
              descubre cómo podemos potenciar tu presencia digital con
              soluciones innovadoras y personalizadas.
            </p>

            <div className="mt-12 space-y-8">
              <a
                href="mailto:contact@advia.tech"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-light text-white font-medium text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                contact@advia.tech
              </a>

              <div className="pt-12 border-t border-neutral-DEFAULT/10">
                <div className="max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-secondary-DEFAULT" />
                    <span className="text-lg font-medium text-neutral-dark">
                      Visítanos en Google for Startups Campus
                    </span>
                  </div>
                  <p className="text-lg text-neutral-DEFAULT/80 leading-relaxed">
                    Nos enorgullece formar parte del programa Google for
                    Startups. Te invitamos a visitarnos en nuestras oficinas
                    ubicadas en el Campus de Google en Madrid, donde la
                    innovación y la tecnología se encuentran.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-light text-neutral-dark/90 font-medium">
                    C. de Moreno Nieto, 2, Arganzuela, 28005 Madrid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
