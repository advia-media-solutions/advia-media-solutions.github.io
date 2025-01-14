import React from "react";
import { Search, Play, Brain, PieChart, ArrowRight } from "lucide-react";

import GlassCard from "../components/GlassCard";
import VideoDistributionChart from "../components/VideoDistributionChart";

const ActiveInternet = () => {
  const internetTypes = [
    {
      title: "Navegación Activa",
      icon: <Search className="w-4 h-4" />,
      description:
        "Búsqueda activa de información que responde a preguntas específicas. Para la mayoría de estas preguntas, la respuesta es una marca, un servicio o un producto.",
      benefits: [
        "Búsqueda con intención",
        "Oportunidad para la marca",
        "Mayor probabilidad de compra futura",
        "Decisiones informadas",
      ],
      stats: {
        percentage: 20,
        source: "Reuters Institute Digital News Report y Pew Research Center",
      },
      color: "from-[#F1B967] to-[#F1B967]",
      accentColor: "bg-[#F1B967]",
    },
    {
      title: "Navegación Pasiva",
      icon: <Play className="w-4 h-4" />,
      description:
        "Consumo de medios para entretenerse, sin buscar respuestas específicas. Representa la mayoría del tráfico en internet.",
      benefits: [
        "Contenido de entretenimiento",
        "Navegación sin objetivo",
        "Dirigido por algoritmos",
        "Descubrimiento casual",
      ],
      stats: {
        percentage: 80,
        source: "Reuters Institute Digital News Report y Pew Research Center",
      },
      color: "from-neutral-800 to-neutral-900",
      accentColor: "bg-neutral-dark/20",
    },
  ];

  return (
    <section className="relative py-12 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark">
                Dos tipos de{""}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] px-2 py-1 relative z-10">
                    navegación
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
                </span>
              </h2>
            </div>

            {/* Internet Types Cards */}
            <div className="space-y-4">
              {internetTypes.map((type, index) => (
                <GlassCard
                  key={index}
                  className="p-4 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Progress Bar Background */}
                  <div
                    className={`absolute top-0 left-0 h-full`}
                    style={{ width: `${type.stats.percentage}%` }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-1.5 ${type.accentColor} rounded-lg shrink-0`}
                      >
                        {type.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-neutral-dark flex-1">
                        {type.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-base font-bold ${type.accentColor} px-2 py-0.5 rounded`}
                        >
                          {type.stats.percentage}% del consumo
                        </span>
                      </div>
                    </div>

                    <p className="text-base text-neutral-DEFAULT/80 mb-3">
                      {type.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {type.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-neutral-DEFAULT/80"
                        >
                          <ArrowRight className="w-3 h-3 shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            <p className="text-base text-neutral-DEFAULT/80 leading-relaxed">
              Nuestra misión es generar valor al consumidor al adelantarnos a
              sus necesidades durante la navegación activa, posicionando a las
              marcas como la respuesta a sus necesidades
            </p>
          </div>

          {/* Right Content - Distribution Chart */}
          <div className="relative hidden md:block">
            <div className="relative z-10">
              <VideoDistributionChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveInternet;
