import React from "react";
import { Clock, LineChart } from "lucide-react";

const CreativeSection = () => {
  return (
    <section className="relative w-full bg-neutral-50">
      <div className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Creatividades diseñadas para recordar
              </h2>
              <p className="text-lg text-gray-600">
                Transformamos datos en experiencias visuales únicas, adaptando
                el contenido del anuncio según las necesidades de tu audiencia.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-600">
                    Formatos notorios, que ayudarán al consumidor a solucionar
                    su problema a través de tu marca
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-600">
                    Configuraciones únicas, adaptadas a cada campaña y tipo de
                    consumidor
                  </span>
                </div>
              </div>
            </div>

            {/* Center Column - Phone */}
            <div className="flex justify-center">
              <div className="w-72">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://storage.googleapis.com/public-web-assets-advia/Videos/advia_website_ad.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Creatividades adaptas para solucionar
              </h2>
              <p className="text-lg text-gray-600">
                Cada creatividad se adapta al momento específico de la
                navegación activa, maximizando el impacto y la relevancia de tu
                mensaje.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-600">
                    Creatividades personalizadas que responden a las preguntas
                    de tu audiencia
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-600">
                    Maximización de la relevancia. El mensaje adecuado en el
                    momento preciso
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeSection;
