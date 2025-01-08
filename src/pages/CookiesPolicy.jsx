import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CookiePolicy = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background Elements - matching About page style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-light/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-secondary-DEFAULT/10 rounded-full blur-2xl animate-float-medium" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark tracking-tight">
            Política de{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Cookies
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
            </span>
          </h1>

          <p className="text-lg text-neutral-DEFAULT/80 leading-relaxed">
            Esta Política es de aplicación a los usuarios de la página web de
            Advia Media Solutions ubicada en la siguiente dirección URL:{" "}
            <a
              href="https://www.advia.tech"
              className="text-primary-light hover:text-primary-dark transition-colors"
            >
              www.advia.tech
            </a>
            , incluida su versión móvil.
          </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              ¿Qué son las Cookies?
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Las cookies son pequeños dispositivos de almacenamiento y
              recuperación de información que se descargan en el ordenador,
              tablet o teléfono del usuario y que archivan información acerca
              del uso que se realiza de una página de internet o app.
            </p>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              Tipos de Cookies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Cookies propias",
                  description:
                    "Son aquellas que se envían al ordenador o dispositivo del usuario desde un equipo o dominio gestionado por el propio editor.",
                },
                {
                  title: "Cookies de tercero",
                  description:
                    "Son aquellas que se envían desde un equipo o dominio gestionado por otra entidad.",
                },
                {
                  title: "Cookies de sesión",
                  description:
                    "Diseñadas para recabar y almacenar datos mientras el usuario accede a una página web.",
                },
                {
                  title: "Cookies persistentes",
                  description:
                    "Almacenan datos durante un periodo definido por el responsable de la cookie.",
                },
              ].map((cookie, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-neutral-dark">
                    {cookie.title}
                  </h3>
                  <p className="text-neutral-DEFAULT/80">
                    {cookie.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              Cookies utilizadas en este sitio
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <th className="py-4 px-4 text-left text-neutral-dark">
                      Tipo
                    </th>
                    <th className="py-4 px-4 text-left text-neutral-dark">
                      Cookie
                    </th>
                    <th className="py-4 px-4 text-left text-neutral-dark">
                      Descripción
                    </th>
                    <th className="py-4 px-4 text-left text-neutral-dark">
                      Duración
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">
                      Técnica
                    </td>
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">
                      __hs_cookie_cat_pref
                    </td>
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">
                      Almacena el consentimiento del usuario
                    </td>
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">
                      6 meses
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">
                      Analítica
                    </td>
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">_ga</td>
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">
                      Análisis de patrones de tráfico
                    </td>
                    <td className="py-4 px-4 text-neutral-DEFAULT/80">
                      2 años
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-primary-light hover:text-primary-dark transition-colors"
            >
              <span className="font-medium">
                {isExpanded ? "Ver menos información" : "Ver más información"}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {isExpanded && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-bold text-neutral-dark">
                  Información adicional
                </h2>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  Para más información sobre cookies, puedes visitar:{" "}
                  <a
                    href="https://www.allaboutcookies.org"
                    className="text-primary-light hover:text-primary-dark transition-colors"
                  >
                    www.allaboutcookies.org
                  </a>{" "}
                  y{" "}
                  <a
                    href="https://www.youronlinechoices.eu"
                    className="text-primary-light hover:text-primary-dark transition-colors"
                  >
                    www.youronlinechoices.eu
                  </a>
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
