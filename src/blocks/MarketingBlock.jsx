import React from "react";
import GlassCard from "./../components/GlassCard";
import { Check } from "lucide-react";

const MarketingBlock = () => {
  const features = [
    {
      icon: "https://storage.googleapis.com/public-web-assets-advia/icons/www.png",
      title: "Activaciones en Open Web",
      description:
        "Simulamos la navegación de tus potenciales clientes en la web abierta para conectar con ellos cuando están buscando activamente información relevante.",
      benefits: [
        "Encuentra al consumidor cuando está receptivo",
        "Mayor relevancia de impacto",
        "Coberturas más efectivas",
      ],
    },
    {
      icon: "https://storage.googleapis.com/public-web-assets-advia/icons/youtube_logo.png",
      title: "Activaciones en YouTube",
      description:
        "Replicamos el comportamiento de visualización de vídeos informativos de tu audiencia para mostrar tu publicidad en el momento preciso.",
      benefits: [
        "Inventario curado en entorno brand safe",
        "Responde a búsquedas en youtube",
        "Impactos de alta receptividad",
      ],
    },
    {
      icon: "https://storage.googleapis.com/public-web-assets-advia/icons/tiktok.svg",
      title: "Activaciones en TikTok",
      description: "Próximamente...",
      benefits: [
        "Navegación en nuevos entornos",
        "Expansión a nuevas audiencias",
        "Creatividades adaptadas",
      ],
    },
  ];

  return (
    <section className="relative py-12 md:py-24 bg-gradient-to-b from-white to-accent-cream/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-neutral-dark tracking-tight mb-6">
            Simulación <span className="text-primary-light">Navegacional</span>
          </h2>

          <p className="text-lg text-neutral-DEFAULT/80 max-w-2xl mx-auto">
            Conectamos con tus clientes potenciales replicando su comportamiento
            de navegación en las principales plataformas digitales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <GlassCard className="flex flex-col h-full bg-white/50">
                <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-center mb-2">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-neutral-dark mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-DEFAULT/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Benefits Section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-neutral-dark mb-3 text-center">
                      Beneficios Principales
                    </h4>
                    <ul className="space-y-2 flex flex-col items-center">
                      {feature.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-neutral-DEFAULT/80"
                        >
                          <Check className="w-4 h-4 text-secondary-DEFAULT mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingBlock;
