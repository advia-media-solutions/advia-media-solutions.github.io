import React from "react";
import { ArrowUpRight } from "lucide-react";

const AboutStory = () => {
  return (
    <div className="rounded-[32px] shadow-[0_4px_40px_-12px_rgba(0,0,0,0.08)] p-12 mb-20">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 mb-8
        bg-white rounded-full shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]"
      >
        <ArrowUpRight className="w-4 h-4 text-neutral-DEFAULT" />
        <span className="text-sm font-medium text-neutral-dark">
          Nuestra Historia
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Content Section - 8 columns */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-[32px] font-bold text-neutral-dark">
            Nuestra Historia
          </h2>
          <div className="space-y-6 text-base text-neutral-DEFAULT/90">
            <p className="leading-relaxed">
              Todo comenzó cuando tres profesionales apasionados por la
              publicidad digital coincidimos en Seedtag, donde fuimos parte
              activa del crecimiento de la compañía entre 2020 y 2024.
            </p>
            <p className="leading-relaxed">
              Pablo, ingeniero aeronáutico con experiencia en el sector espacial
              y consultoría estratégica; Miguelón, economista especializado en
              marketing digital con amplia experiencia en agencias de medios; y
              Jaime, ingeniero aeronáutico experto en activación de campañas
              digitales y producto estratégico en agencias de medios. Tras
              compartir una experiencia inspiradora y enriquecedora en Seedtag,
              decidimos dar el siguiente paso.
            </p>
            <p className="leading-relaxed">
              Nuestra experiencia y nuestro conocimiento en la industria
              publicitaria nos han dado una visión única de cómo la publicidad
              digital puede y debe evolucionar. Creamos Advia con la firme
              convicción de que es posible hacer una publicidad mejor: más
              eficiente, menos intrusiva para la audiencia y, sobre todo, que
              responda verdaderamente a las necesidades de las marcas,
              promocionándolas de forma precisa y mejorando su comunicación.
            </p>
          </div>
        </div>

        {/* Image Section - 4 columns */}
        <div className="lg:col-span-5 relative flex items-center">
          <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-neutral-light/50">
            <img
              src="https://storage.googleapis.com/public-web-assets-advia/Images/our_story.jpeg"
              alt="Nuestro equipo en Google for Startups"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
