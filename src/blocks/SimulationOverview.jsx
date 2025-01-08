// src/blocks/SimulationOverview.jsx
import React from "react";
import { Brain, Target, Activity } from "lucide-react";
import ValueCard from "../components/ValueCard";

const SimulationOverview = () => {
  const simulationFeatures = [
    {
      icon: <Brain className="w-full h-full" />,
      title: "IA Generativa",
      subtitle:
        "Nuestro motor de IA generativa analiza y comprende los patrones de navegación del usuario",
    },
    {
      icon: <Target className="w-full h-full" />,
      title: "Precisión a escala",
      subtitle:
        "Identificamos el comportamiento de tu audiencia con máxima precisión",
    },
    {
      icon: <Activity className="w-full h-full" />,
      title: "Tendencias",
      subtitle:
        "Nuestra tecnología se adapta a las tendencias de navegación de tu audiencia a tiempo real",
    },
  ];

  return (
    <section className="relative min-h-[80vh] py-24 flex items-center bg-gradient-to-b from-white to-accent-cream/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-neutral-dark mb-6">
            Simulación del{" "}
            <span className="text-primary-light">Comportamiento</span>
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-dark mb-12">
            del Consumidor
          </h2>
          <p className="text-xl md:text-2xl text-neutral-DEFAULT/80 max-w-4xl mx-auto mb-16">
            Entendemos cómo piensa tu consumidor, qué preguntas se hace hasta
            llegar a los artículos donde se va a informar. Ahí posicionaremos tu
            marca como la respuesta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {simulationFeatures.map((feature, index) => (
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

export default SimulationOverview;
