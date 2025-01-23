import React from "react";
import {
  Zap,
  TrendingUp,
  LineChart,
  BarChart3,
  Clock,
  Target,
} from "lucide-react";

const Optimization = () => {
  const optimizationFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6 text-primary-light" />,
      title: "Rendimiento Mejorado",
      description:
        "Algoritmos avanzados que analizan y optimizan continuamente el rendimiento de las campañas",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary-light" />,
      title: "Automatización Inteligente",
      description:
        "Optimización constante basada en IA para maximizar el retorno de inversión",
    },
    {
      icon: <LineChart className="w-6 h-6 text-primary-light" />,
      title: "Análisis Predictivo",
      description:
        "Anticipación de tendencias y comportamientos para optimizar resultados futuros",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary-light" />,
      title: "Optimización en Tiempo Real",
      description:
        "Ajustes instantáneos basados en el comportamiento actual del usuario",
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
          style={{ filter: "blur(2px)" }}
        >
          <source
            src="https://storage.googleapis.com/public-web-assets-advia/Videos/optimization_background.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-white/75" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Optimización <span className="text-primary-light">Avanzada</span>
          </h2>
          <p className="text-lg text-neutral-DEFAULT/80">
            Maximiza el rendimiento de tus campañas con nuestra tecnología de
            optimización impulsada por Inteligencia Artificial, que mejora
            continuamente las estrategias basándose en datos en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Features Column */}
          <div className="lg:col-span-5 space-y-6">
            {optimizationFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm"
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

          {/* Metrics/Stats Column */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-primary-light/5 rounded-lg">
                  <div className="text-5xl font-bold text-primary-light mb-2">
                    x2.8
                  </div>
                  <p className="text-sm text-neutral-DEFAULT">Mayor Afinidad</p>
                </div>
                <div className="text-center p-6 bg-primary-light/5 rounded-lg">
                  <div className="text-5xl font-bold text-primary-light mb-2">
                    x2.2
                  </div>
                  <p className="text-sm text-neutral-DEFAULT">
                    Eficiencia Navegación Activa
                  </p>
                </div>
                <div className="col-span-2">
                  <div className="p-6 bg-secondary/5 rounded-lg">
                    <h4 className="font-semibold text-neutral-dark mb-2">
                      <b>Optimización Continua</b>
                    </h4>
                    <p className="text-sm text-neutral-DEFAULT">
                      Nuestros algoritmos aprenden y mejoran constantemente,
                      identificando nuevas tendencias y patrones de navegación
                      para maximizar el rendimiento de tus campañas.
                    </p>
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

export default Optimization;
