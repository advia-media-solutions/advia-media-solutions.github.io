import React from "react";
import { Brain, Wand2, BarChart3, Users } from "lucide-react";

const TechnologyOverview = () => {
  const technologyFeatures = [
    {
      icon: <Brain className="w-full h-full" />,
      title: "Simulación Navegación",
      subtitle:
        "Tecnología de inteligencia artificial que predice y analiza el comportamiento del consumidor",
    },
    {
      icon: <Wand2 className="w-full h-full" />,
      title: "Creatividad Adaptativa",
      subtitle:
        "Generación y adaptación dinámica de creatividades para máxima relevancia con el mensaje adecuado",
    },
    {
      icon: <BarChart3 className="w-full h-full" />,
      title: "Optimización Avanzada",
      subtitle:
        "Algoritmos que maximizan los KPIs mediante optimización continua de medios",
    },
    {
      icon: <Users className="w-full h-full" />,
      title: "Insights Únicos",
      subtitle:
        "Análisis detallado del comportamiento del consumidor para decisiones informadas",
    },
  ];

  return (
    <section className="relative min-h-[80vh] py-24 flex items-center bg-gradient-to-b from-white to-accent-cream/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-dark mb-6">
            Tecnología <span className="text-primary-light">Disruptiva</span>
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-dark mb-12">
            para Resultados Excepcionales
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-DEFAULT/80 max-w-4xl mx-auto mb-16">
            Nuestra plataforma integra cuatro pilares tecnológicos fundamentales
            que revolucionan la forma en que las marcas conectan con sus
            consumidores, garantizando resultados medibles y escalables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {technologyFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full"
            >
              <div className="p-3 bg-primary-light/10 rounded-full mb-4 inline-flex items-center justify-center w-16 h-16">
                {React.cloneElement(feature.icon, {
                  className: "w-8 h-8 text-primary-light",
                })}
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-DEFAULT/80 leading-relaxed">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyOverview;
