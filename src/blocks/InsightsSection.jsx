// src/blocks/InsightsSection.jsx
import React from "react";
import { LineChart, Route, Search, Brain } from "lucide-react";

const InsightsSection = () => {
  const insightFeatures = [
    {
      icon: <LineChart className="w-6 h-6 text-primary-light" />,
      title: "Análisis de Comportamiento",
      description:
        "Reconstrucción detallada del journey del consumidor para entender el por qué de los resultados",
    },
    {
      icon: <Route className="w-6 h-6 text-primary-light" />,
      title: "Patrones de Navegación",
      description:
        "Identificación de rutas frecuentes y momentos clave en la búsqueda de información",
    },
    {
      icon: <Search className="w-6 h-6 text-primary-light" />,
      title: "Preguntas del Consumidor",
      description:
        "Comprensión profunda de las dudas y necesidades reales de tu audiencia",
    },
    {
      icon: <Brain className="w-6 h-6 text-primary-light" />,
      title: "Pre-optimización Inteligente",
      description:
        "Mejora continua basada en el aprendizaje de campañas anteriores",
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Reporting e <span className="text-primary-light">Insights</span>
          </h2>
          <p className="text-lg text-neutral-DEFAULT/80">
            Analítica de datos que permite reconstruir el por qué de los
            resultados de campaña, entendiendo mejor al consumidor para
            pre-optimizar siguientes campañas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Features Column */}
          <div className="lg:col-span-5 space-y-6">
            {insightFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="p-2 bg-primary-light/10 rounded-lg flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-dark mb-1">
                    <b>{feature.title}</b>
                  </h3>
                  <p className="text-sm text-neutral-DEFAULT">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Single Image Column */}
          <div className="lg:col-span-7 flex justify-center items-center h-full self-center">
            <div className="rounded-lg shadow-lg overflow-hidden w-full max-w-xl">
              <img
                src="https://storage.googleapis.com/public-web-assets-advia/Images/insights_web_pre_campaign.png"
                alt="Insights Analysis Dashboard"
                className="w-full h-auto object-contain bg-white"
              />
              <p className="text-xs text-neutral-DEFAULT/70 text-left py-2 px-4 bg-white">
                <i>
                  Sector: plataformas de contenido audiovisual para niños y
                  adolescentes
                </i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
