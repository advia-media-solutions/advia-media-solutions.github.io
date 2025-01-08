import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Youtube,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Button from "./../components/Button";
import GlassCard from "./../components/GlassCard";

const HeroSection = () => {
  const features = [
    {
      icon: <Youtube className="w-5 h-5" />,
      title: "Activación Omnichannel",
      description:
        "Tus clietes están presentes en múltiples plataformas en internet, donde destacan YouTube e internet para informarse activamente.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Internet activo",
      description:
        "Conecta con tu audiencia a través de toda la web activa, cuando se informan sobre temas relevantes para tu marca",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI: Simulación & Realidad",
      description:
        "Simulamos por donde navegan tus clientes y encontramos todos aquellos espacios donde lo hacen realmente",
    },
  ];

  return (
    <section className="relative min-h-[90vh] pt-24 flex items-center bg-gradient-to-b from-white to-accent-cream/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4 py-16 md:py-8 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-glass-light to-glass-medium backdrop-blur-md border border-white/30 text-sm text-neutral-dark/90 shadow-lg hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-4 h-4 text-secondary-DEFAULT animate-pulse" />
              <span className="font-medium">
                Comprensión del Cliente basada en IA
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-neutral-dark tracking-tight leading-tight">
                Turning ads into{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] px-2 py-1 relative z-10">
                    answers
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-DEFAULT/80 leading-relaxed max-w-2xl font-medium">
                Advia propone una nueva solución que se centra en comprender
                cómo los usuarios descubren marcas de forma natural,
                identificando sus preguntas y posicionando tu marca en los
                momentos clave de decisión.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
              <Button
                to="/about"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="relative z-10 bg-gradient-to-r from-secondary-DEFAULT to-secondary-light hover:shadow-lg hover:shadow-secondary-DEFAULT/20 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sobre Advia
              </Button>
              <Button
                to="/contact"
                size="lg"
                className="relative z-10 bg-glass-medium hover:bg-glass-heavy backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                icon={<ArrowUpRight className="w-5 h-5" />}
              >
                Productos
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-10 border-t border-neutral-dark/10">
              <div className="flex flex-col items-center md:items-start md:flex-row gap-8">
                <div className="flex gap-12 justify-center md:justify-start w-full md:w-auto">
                  <div className="group hover:transform hover:scale-105 transition-all duration-300 text-center md:text-left">
                    <div className="text-3xl font-bold text-neutral-dark group-hover:text-secondary-DEFAULT">
                      85%
                    </div>
                    <div className="text-sm text-neutral-DEFAULT/80 font-medium">
                      Mayor Relevancia
                    </div>
                  </div>
                  <div className="group hover:transform hover:scale-105 transition-all duration-300 text-center md:text-left">
                    <div className="text-3xl font-bold text-neutral-dark group-hover:text-secondary-DEFAULT">
                      40%
                    </div>
                    <div className="text-sm text-neutral-DEFAULT/80 font-medium">
                      Ahorro en Presupuesto
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-gradient-to-b from-neutral-dark/5 via-neutral-dark/10 to-neutral-dark/5" />

                <div className="flex items-center gap-3 group hover:transform hover:scale-105 transition-all duration-300 justify-center md:justify-start w-full md:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-DEFAULT/20 to-secondary-light/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <ShieldCheck className="w-6 h-6 text-secondary-DEFAULT group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-sm font-bold text-neutral-dark group-hover:text-secondary-DEFAULT transition-colors">
                      Google Partner
                    </div>
                    <div className="text-sm text-neutral-DEFAULT/80">
                      Programa Google for Startups
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <GlassCard variant="feature" className="p-10 backdrop-blur-md">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-dark mb-2">
                    Características de la nuestra tecnología
                  </h3>
                  <p className="text-neutral-DEFAULT/80">
                    Todo lo que necesitas para entender y alcanzar a tus
                    clientes cuando se informan en la web sobre temas relevantes
                    para tu marca. Las pilares de nuestra tecnología son:
                  </p>
                </div>

                <div className="space-y-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group p-4 rounded-lg hover:bg-glass-light transition-all duration-300"
                    >
                      <div className="p-2 bg-secondary-DEFAULT/10 rounded-lg group-hover:bg-secondary-DEFAULT/20 transition-colors">
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-neutral-dark group-hover:text-secondary-DEFAULT transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-neutral-DEFAULT/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Feature Highlights */}
              </div>
            </GlassCard>

            {/* Decorative elements */}
            <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4">
              <div className="w-full h-full rounded-2xl  animate-gradient bg-[length:200%_200%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
