import React from "react";
import GlassCard from "./../components/GlassCard";
import { Check } from "lucide-react";

const MarketingBlock = () => {
  const features = [
    {
      icon: "https://storage.googleapis.com/public-web-assets-advia/icons/google.png",
      title: "Motores de Búsqueda Web",
      description:
        "Identificamos todos aquellos articulos y contenido en los que terminan navegando potenciales clientes de la marca cuando utilizan motores de búsqueda.",
    },
    {
      icon: "https://storage.googleapis.com/public-web-assets-advia/icons/youtube_logo.png",
      title: "Plataformas de Vídeo",
      description:
        "Identificamos los vídeos y canales donde tus potenciales clientes buscan activamente información audiovisual, permitiendo a tu marca ofrecer valor en el momento y formato precisos.",
    },
    {
      icon: "https://storage.googleapis.com/public-web-assets-advia/icons/chat-gpt.webp",
      title: "IA Conversacional y LLMs",
      description:
        "Extraemos las fuentes de información sobre las que se construyen las respuestas de los LLMs, brindando a las marcas la oportunidad de posicionarse estratégicamente en dichos contenidos.",
    },
  ];

  return (
    <section className="relative py-12 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-neutral-dark tracking-tight mb-6">
            Conectamos en sus Fuentes de{" "}
            <span className="text-primary-light">Información Activa</span>
          </h2>

          <p className="text-lg text-neutral-DEFAULT/80 max-w-2xl mx-auto">
            Comprendemos en profundidad cómo y dónde tus consumidores buscan
            activamente la información que necesitan. Vera, nuestra tecnología
            con LLMs, identifica estos momentos y canales clave para posicionar
            tu marca como una respuesta útil y valiosa, convirtiendo cada
            interacción en una oportunidad.
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
