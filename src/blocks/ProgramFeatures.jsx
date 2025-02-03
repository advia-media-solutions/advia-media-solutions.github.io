import React from "react";
import { Check, Star, Sparkles } from "lucide-react";

const ProgramFeatures = () => {
  const basicFeatures = [
    "Desarrollo personalizado de adaptaciones creativas",
    "Gestión completa de campañas publicitarias",
    "Análisis pre y post campaña",
    "Implementación técnica completa",
    "Sistema de reporting detallado",
  ];

  const premiumFeatures = [
    "Todo lo incluido en el nivel básico",
    "Mayor volumen de impresiones publicitarias",
    "Más variaciones y formatos creativos",
    "Análisis exhaustivo del público objetivo",
    "Optimización avanzada de campañas",
  ];

  const PlanCard = ({ title, price, features, highlighted, icon: Icon }) => (
    <div
      className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:translate-y-[-4px] ${
        highlighted
          ? "bg-white shadow-xl border-secondary-DEFAULT/30"
          : "bg-white/80 shadow-lg border-primary-light/20"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary-DEFAULT text-white px-4 py-1 rounded-full text-sm font-semibold">
          Recomendado
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-2 rounded-lg ${
            highlighted ? "bg-secondary-DEFAULT/10" : "bg-primary-light/10"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              highlighted ? "text-secondary-DEFAULT" : "text-primary-light"
            }`}
          />
        </div>
        <h3 className="text-2xl font-bold text-neutral-dark">{title}</h3>
      </div>

      <div className="mb-8">
        <div className="text-4xl font-bold text-neutral-dark mb-2">
          {price === 0 ? "Gratis" : `${price}€`}
          <span className="text-base font-normal text-neutral-DEFAULT/60 ml-2">
            {price !== 0 ? "+ IVA" : ""}
          </span>
        </div>
        <div className="text-sm text-neutral-DEFAULT/80">
          Valor real: {highlighted ? "6.000€" : "3.000€"}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className={`w-5 h-5 mt-0.5 ${
                highlighted ? "text-secondary-DEFAULT" : "text-primary-light"
              }`}
            />
            <span className="text-neutral-DEFAULT/80">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-accent-cream/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
            Modalidades del{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary-light">
              Programa
            </span>
          </h2>
          <p className="text-lg text-neutral-DEFAULT/80">
            Nuestro programa es totalmente gratuito, pero también tiene la
            posibilidad de que puedas participar en el programa y ampliar el
            alcance de tu campaña. Ambos incluyen nuestra tecnología de IA y
            soporte profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PlanCard
            title="Nivel Básico"
            price={0}
            features={basicFeatures}
            highlighted={false}
            icon={Star}
          />
          <PlanCard
            title="Nivel Premium"
            price={1000}
            features={premiumFeatures}
            highlighted={true}
            icon={Sparkles}
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-DEFAULT/60 max-w-2xl mx-auto">
            Todos los planes incluyen implementación técnica, optimización
            creativa y seguimiento detallado. La duración mínima del programa es
            de 20 días.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramFeatures;
