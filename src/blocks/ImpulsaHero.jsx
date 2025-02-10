import React, { useEffect } from "react";
import { Sparkles } from "lucide-react";
import LiquidButton from "../components/PlayButton";
import Button from "../components/Button";
import { ArrowRight } from "lucide-react";

const ImpulsaHero = () => {
  useEffect(() => {
    // Asegurarse de que window.dataLayer existe
    window.dataLayer = window.dataLayer || [];
    
    // Enviar el evento al dataLayer
    window.dataLayer.push({
      'event': 'impulsa_video_shown',
      'video_name': 'impulsa_presentation',
      'video_url': 'https://www.youtube.com/embed/OurVZnPcep8'
    });
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <section className="relative min-h-[80vh] py-8 flex items-center bg-gradient-to-b from-white to-accent-cream/10 overflow-hidden">
      {/* El resto del código permanece igual */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <div>
              <div className="inline-flex mb-4 items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-glass-light to-glass-medium backdrop-blur-md border border-white/30 text-sm text-neutral-dark/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-4 h-4 text-secondary-DEFAULT animate-pulse" />
                <span className="font-medium">Plazas limitadas</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
                Impulsamos{" "}
                <span className="text-primary-light">PYMEs y Startups</span> con
                nuestra tecnología publicitaria
              </h1>
              <p className="text-lg md:text-xl text-neutral-DEFAULT/80">
                Potencia tu presencia digital con nuestra tecnología de
                Inteligencia Artificial con una campaña valorada en más de
                <b> 3.000€, sin coste </b>
                para tu empresa.
              </p>
            </div>

            <div className="hidden md:block bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-primary-light/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary-light/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary-light" />
                  </div>
                  <h3 className="font-semibold text-lg">Tecnología IA</h3>
                  <p className="text-sm text-neutral-DEFAULT">
                    Publicidad optimizada con inteligencia artificial
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-light/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary-light" />
                  </div>
                  <h3 className="font-semibold text-lg">Soporte profesional</h3>
                  <p className="text-sm text-neutral-DEFAULT">
                    Equipo experto a tu disposición
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-light/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary-light" />
                  </div>
                  <h3 className="font-semibold text-lg">100% Gratuito</h3>
                  <p className="text-sm text-neutral-DEFAULT">
                    Valor real de 3.000€
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-12">
            <h3 className="text-2xl font-bold text-neutral-dark text-center">
              Descubre cómo funciona Advia Impulsa
            </h3>

            <LiquidButton videoUrl="https://www.youtube.com/embed/OurVZnPcep8" gtmEvent="play-impulsa"/>

            <div className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-secondary-DEFAULT/20 max-w-md">
              <p className="text-lg font-semibold text-neutral-dark mb-3">
                <b>¿Quieres participar en el programa?</b>
              </p>
              <p className="m-5">
                Solo tendrás que dejarnos cierta información para que podamos contactarte y valorar tu candidatura
              </p>
              <Button
                to="https://lime-primula-895.notion.site/18b496292a528085a7efcf8f08326cde?pvs=105"
                variant="primary"
                id="form-impulsa"
                newTab={true}
                size="md"
                event="form-impulsa"
                icon={<ArrowRight className="w-5 h-5" />}
                className="relative z-10 bg-gradient-to-r from-secondary-DEFAULT to-secondary-light hover:shadow-lg hover:shadow-secondary-DEFAULT/20 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                ¡Quiero participar!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpulsaHero;