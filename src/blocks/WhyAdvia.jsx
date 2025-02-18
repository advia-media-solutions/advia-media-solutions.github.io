// src/blocks/WhyAdvia.jsx
import React from "react";
import { Rocket, Monitor, BarChart3, Check } from "lucide-react";

const WhyAdvia = () => {
  const reasons = [
    {
      icon: <Rocket className="w-12 h-12 text-secondary-DEFAULT" />,
      title: "Una Start-up con Experiencia",
      description:
        "Combinamos agilidad y experiencia para ofrecer soluciones rápidas y efectivas. Nuestro equipo de expertos en IA y AdTech co-crea adaptando nuestra tecnología a tus necesidades específicas.",
    },
    {
      icon: <Monitor className="w-12 h-12 text-secondary-DEFAULT" />,
      title: "Tecnología Única",
      description:
        "Superamos las limitaciones de las cookies y el contextual mediante simulación avanzada del comportamiento del consumidor, integrando inteligencia artificial con datos reales para resultados precisos.",
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-secondary-DEFAULT" />,
      title: "Gestión Integral de Campaña",
      description:
        "Gestionamos tu campaña de principio a fin, desde la estrategia inicial hasta el reporting final, generando insights únicos desde una perspectiva innovadora y efectiva.",
    },
  ];

  return (
    <div className="w-full bg-accent-cream">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-neutral-dark text-center mb-16">
            ¿Por qué trabajar con Advia?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-accent-cream rounded-xl">
                    {reason.icon}
                  </div>

                  <h3 className="text-xl font-bold text-primary-DEFAULT mb-6">
                    {reason.title}
                  </h3>

                  <p className="text-neutral-DEFAULT leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyAdvia;
