// src/blocks/SimulationOverview.jsx
import React from "react";
import { Brain, Target, Activity } from "lucide-react";
import ValueCard from "../components/ValueCard";

const SimulationOverview = () => {
  const simulationFeatures = [
    {
      icon: <Brain className="w-full h-full" />,
      title: "Gen-AI",
      subtitle:
        "Nuestro motor de IA generativa analiza y comprende los patrones de navegación del usuario",
    },
    {
      icon: <Target className="w-full h-full" />,
      title: "Precisión a escala",
      subtitle:
        "Comvertimos tu briefing en las preguntas del consumidor, brandsafe by design",
    },
    {
      icon: <Activity className="w-full h-full" />,
      title: "Insights únicos",
      subtitle:
        "Una nueva forma de entender a tu consumidor y cómo se informa sobre tu marca.",
    },
  ];

  return (
    <section className="relative min-h-[80vh] py-12 md:py-24 flex items-center bg-gradient-to-b from-white to-accent-cream/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-neutral-dark mb-6">
            Simulación del{" "}
            <span className="text-primary-light">Consumidor</span>
          </h1>

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
