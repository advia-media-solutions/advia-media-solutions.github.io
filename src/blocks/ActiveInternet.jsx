import React from "react";
import { Search, Play, Brain, PieChart, ArrowRight } from "lucide-react";
import InternetDistributionChart from "../components/InternetDistributionChart";
import GlassCard from "../components/GlassCard";

const ActiveInternet = () => {
  const internetTypes = [
    {
      title: "Internet Activo",
      icon: <Search className="w-4 h-4" />,
      description:
        "Los usuarios buscan activamente respuestas a preguntas específicas. Para la mayoría de estas preguntas, la respuesta es una marca, servicio o producto.",
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
      color: "from-blue-300 to-blue-400",
      accentColor: "bg-blue-800",
    },
    {
      title: "Internet Pasivo",
      icon: <Play className="w-4 h-4" />,
      description:
        "Usuarios consumiendo contenido principalmente para entretenimiento, sin buscar respuestas específicas. Representa la mayoría del tráfico en internet.",
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
      color: "from-amber-200 to-amber-300",
      accentColor: "bg-amber-500",
    },
  ];

  return (
    <section className="relative py-12 bg-neutral-50 overflow-hidden mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark">
                Los dos tipos de{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] px-2 py-1 relative z-10">
                    internet
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
                </span>
              </h2>

              <p className="text-base text-neutral-DEFAULT/80 leading-relaxed">
                En Advia nos centramos en el internet activo, donde los usuarios
                buscan respuestas específicas a sus preguntas. Aunque solo
                representa el 20% del consumo digital según estudios, es donde
                ocurren las conversiones más valiosas.
              </p>
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
                        className={`p-1.5 ${type.accentColor} bg-opacity-10 rounded-lg shrink-0`}
                      >
                        {type.icon}
                      </div>
                      <h3 className="font-semibold text-base text-neutral-dark flex-1">
                        {type.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${type.accentColor} bg-opacity-10 px-2 py-0.5 rounded`}
                        >
                          {type.stats.percentage}% del consumo
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-DEFAULT/80 mb-3">
                      {type.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {type.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-neutral-DEFAULT/80"
                        >
                          <ArrowRight className="w-3 h-3 shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-DEFAULT/10">
                      <p className="text-xs text-neutral-DEFAULT/60 italic">
                        Fuente: {type.stats.source}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Content - Distribution Chart */}
          <div className="relative hidden md:block">
            <div className="relative z-10">
              <InternetDistributionChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveInternet;
