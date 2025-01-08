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
                Creatividad Adaptativa
              </h2>
              <p className="text-lg text-gray-600">
                Transformamos datos en experiencias visuales únicas, adaptando
                el contenido del anuncio según las necesidades de información de
                tu audiencia.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-600">
                    Adaptación del contenido basada en el comportamiento del
                    usuario
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-600">
                    Creatividades personalizadas que responden a las preguntas
                    de tu audiencia
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
                    src="https://storage.googleapis.com/public-web-assets-advia/Videos/thinking_mu_fondo_gris_claro.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Impacto Personalizado
              </h2>
              <p className="text-lg text-gray-600">
                Cada creatividad se adapta al momento específico del customer
                journey, maximizando el impacto y la relevancia de tu mensaje.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-600">
                    Optimización en tiempo real del contenido según el
                    engagement
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
