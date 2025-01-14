import React from "react";
import { Brain, Wand2, BarChart3, Users } from "lucide-react";
import ValueCard from "../components/ValueCard";

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
          <h1 className="text-6xl md:text-7xl font-bold text-neutral-dark mb-6">
            Tecnología <span className="text-primary-light">Disruptiva</span>
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-dark mb-12">
            para Resultados Excepcionales
          </h2>
          <p className="text-xl md:text-2xl text-neutral-DEFAULT/80 max-w-4xl mx-auto mb-16">
            Nuestra plataforma integra cuatro pilares tecnológicos fundamentales
            que revolucionan la forma en que las marcas conectan con sus
            consumidores, garantizando resultados medibles y escalables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {technologyFeatures.map((feature, index) => (
            <ValueCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              subtitle={feature.subtitle}
              index={index}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyOverview;
