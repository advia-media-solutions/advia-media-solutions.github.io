import React from "react";
import { Rocket, Monitor, BarChart3, Check } from "lucide-react";

const WhyAdvia = () => {
  const reasons = [
    {
      icon: <Rocket className="w-12 h-12 text-secondary-DEFAULT" />,
      title: "Una Start-up con Experiencia",
      features: [
        "Rápidos y eficaces",
        "Co-Creamos en base a tus necesidades",
        "Conocemos el sector",
        "Expertos en IA y Adtech",
      ],
    },
    {
      icon: <Monitor className="w-12 h-12 text-secondary-DEFAULT" />,
      title: "Tecnología Única",
      features: [
        "Ni DMP ni Contextual",
        "Simulamos al usuario",
        "Técnicas aeronáuticas aplicadas al marketing digital",
        "Emparejamiento con datos reales",
      ],
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-secondary-DEFAULT" />,
      title: "Gestión Integral de Campaña",
      features: [
        "Gestión completa",
        "Configuración, gestión y optimización",
        "Creatividades adaptadas",
        "Reporting con insights únicos",
      ],
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

                  <ul className="space-y-4 w-full">
                    {reason.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-neutral-DEFAULT"
                      >
                        <Check className="w-4 h-4 text-secondary-DEFAULT mr-3 flex-shrink-0" />
                        <span className="text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
