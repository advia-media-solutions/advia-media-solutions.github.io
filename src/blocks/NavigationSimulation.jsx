import React from "react";
import { Brain, Search, Target, MessageSquare } from "lucide-react";

const NavigationSimulation = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary-light" />,
      title: "Simulación IA",
      description:
        "Simulación avanzada del comportamiento de navegación mediante IA generativa",
    },
    {
      icon: <Search className="w-6 h-6 text-primary-light" />,
      title: "Datos en Tiempo Real",
      description:
        "Validación y refinamiento continuo con datos de navegación en tiempo real",
    },
    {
      icon: <Target className="w-6 h-6 text-primary-light" />,
      title: "Identificación Precisa",
      description:
        "Comprensión profunda de cómo los usuarios buscan información online",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary-light" />,
      title: "Mensajes Optimizados",
      description:
        "Posicionamiento de marca como respuesta a preguntas reales de usuarios",
    },
  ];

  return (
    <section className="relative md:py-12 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Simulación de <span className="text-primary-light">Navegación</span>
          </h2>
          <p className="text-lg text-neutral-DEFAULT/80">
            Nuestra tecnología combina simulación impulsada por Inteligencia
            Artificial Generativa y validación de datos en tiempo real para
            comprender y anticipar el comportamiento del usuario.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Features Column */}
          <div className="lg:col-span-4 space-y-6">
            {features.map((feature, index) => (
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

          {/* Screenshots Column - 2x2 Grid */}
          <div className="lg:col-span-8 mt-6 md:mt-0 ">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg shadow-lg overflow-hidden aspect-[5/3]">
                <img
                  src="https://storage.googleapis.com/public-web-assets-advia/Images/active_internet_demo_2.png"
                  alt="Topics visualization"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
              <div className="rounded-lg shadow-lg overflow-hidden aspect-[5/3]">
                <img
                  src="https://storage.googleapis.com/public-web-assets-advia/Images/topics_demo_2.png"
                  alt="User behavior analysis"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
              <div className="rounded-lg shadow-lg overflow-hidden aspect-[5/3]">
                <img
                  src="https://storage.googleapis.com/public-web-assets-advia/Images/users_demo_2.png"
                  alt="Active Internet Analysis"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
              <div className="rounded-lg shadow-lg overflow-hidden aspect-[5/3]">
                <img
                  src="https://storage.googleapis.com/public-web-assets-advia/Images/preguntas_respuestas_demo_2.png"
                  alt="Questions and Answers Analysis"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavigationSimulation;
