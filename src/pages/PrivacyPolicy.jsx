import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PrivacyPolicy = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background Elements */}
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
                Privacidad
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
            </span>
          </h1>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Responsable Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              1. Información del Responsable
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                ADVIA MEDIA SOLUTIONS, B19456417, con domicilio en CALLE
                VILLANUEVA, 28 2º D. 28001, MADRID, MADRID (en adelante,
                "ADVIA") es el Responsable del tratamiento de los datos
                personales del Usuario y le informa que estos datos serán
                tratados de conformidad con lo dispuesto en el Reglamento (UE)
                2016/679, de 27 de abril (RGPD), y la Ley Orgánica 3/2018, de 5
                de diciembre (LOPDGDD).
              </p>
              <p>
                Email de contacto:{" "}
                <a
                  href="mailto:contacto@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  contacto@advia.tech
                </a>
              </p>
            </div>
          </section>

          {/* Finalidades Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              2. Finalidades del Tratamiento
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  2.1. Actual
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  <strong>Analítica Web</strong>: Se utiliza Google Analytics
                  para analizar el uso que hacen los usuarios del sitio web.
                  Esta herramienta puede recopilar datos como su dirección IP
                  (anonimizada), tipo de dispositivo, navegador y comportamiento
                  de navegación.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  2.2. Newsletter (Próximamente)
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  <strong>Suscripción a newsletter</strong>: Para los usuarios
                  que decidan suscribirse a nuestra newsletter, recogeremos y
                  trataremos su dirección de correo electrónico con la finalidad
                  de enviar comunicaciones comerciales sobre nuestros productos
                  y servicios.
                </p>
              </div>
            </div>
          </section>

          {/* Legitimación Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              3. Legitimación del Tratamiento
            </h2>
            <ul className="space-y-2 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>
                <strong>Analítica Web</strong>: La base legal es el interés
                legítimo del responsable (Art. 6.1.f RGPD) en analizar y mejorar
                nuestros servicios web.
              </li>
              <li>
                <strong>Newsletter</strong>: La base legal será el
                consentimiento del interesado (Art. 6.1.a RGPD) manifestado
                mediante la acción de suscripción al newsletter.
              </li>
            </ul>
          </section>

          {/* Conservación Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              4. Criterios de Conservación de los Datos
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Los datos para análisis web se mantendrán por un plazo máximo de
              26 meses. Para los suscriptores del newsletter, los datos se
              mantendrán mientras exista un interés mutuo para mantener la
              finalidad del tratamiento y cuando ya no sea necesario para tal
              fin, se suprimirán con medidas de seguridad adecuadas.
            </p>
          </section>

          {/* Comunicación Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              5. Comunicación de los Datos
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              No se comunicarán los datos a terceros, salvo obligación legal o
              en el caso de Google Analytics, que actúa como encargado del
              tratamiento de los datos de análisis web.
            </p>
          </section>

          {/* Derechos Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              6. Derechos de los Usuarios
            </h2>
            <ul className="space-y-2 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>Derecho a retirar el consentimiento en cualquier momento</li>
              <li>
                Derecho de acceso, rectificación, portabilidad y supresión de
                sus datos
              </li>
              <li>Derecho de limitación y oposición a su tratamiento</li>
              <li>
                Derecho a presentar una reclamación ante la autoridad de control
                (www.aepd.es) si considera que el tratamiento no se ajusta a la
                normativa vigente
              </li>
            </ul>
            <p className="text-neutral-DEFAULT/80 mt-4">
              Para ejercer sus derechos puede enviar un email a{" "}
              <a
                href="mailto:contacto@advia.tech"
                className="text-primary-light hover:text-primary-dark transition-colors"
              >
                contacto@advia.tech
              </a>
            </p>
          </section>

          {/* Ver más información */}
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
              <div className="space-y-8 animate-fadeIn">
                {/* Medidas de Seguridad */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    7. Medidas de Seguridad
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    De conformidad con lo dispuesto en las normativas vigentes
                    en protección de datos personales, ADVIA está cumpliendo con
                    todas las disposiciones de las normativas RGPD y LOPDGDD
                    para el tratamiento de los datos personales de su
                    responsabilidad, y con los principios descritos en el
                    artículo 5 del RGPD:
                  </p>
                  <ul className="space-y-2 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                    <li>Licitud, lealtad y transparencia</li>
                    <li>Limitación de la finalidad</li>
                    <li>Minimización de datos</li>
                    <li>Exactitud</li>
                    <li>Limitación del plazo de conservación</li>
                    <li>Integridad y confidencialidad</li>
                  </ul>
                </section>

                {/* Cookies */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    8. Uso de Cookies
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        Cookies Técnicas (Necesarias)
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        Son aquellas que permiten al usuario la navegación a
                        través de la página web y la utilización de las
                        diferentes opciones o servicios que en ella existen.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        Cookies Analíticas
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        Google Analytics: Utilizada para analizar el
                        comportamiento de los usuarios de manera anónima (_ga,
                        _gid, _gat). Puede consultar la política de privacidad
                        de Google Analytics en:{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          className="text-primary-light hover:text-primary-dark transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://policies.google.com/privacy
                        </a>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Additional Sections */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    9. Modificación de la Política de Privacidad
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    ADVIA se reserva el derecho a modificar la presente política
                    para adaptarla a novedades legislativas o jurisprudenciales,
                    así como a prácticas de la industria. En dichos supuestos,
                    anunciará en esta página los cambios introducidos con
                    razonable antelación a su puesta en práctica.
                  </p>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Fecha de la última actualización: 6 de enero de 2025
                  </p>
                </section>

                {/* International Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    10. Ámbito Internacional
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Aunque actualmente nuestros servicios están dirigidos a
                    usuarios en España, en el futuro podremos ofrecer nuestros
                    servicios a nivel internacional. En tal caso, todos los
                    tratamientos de datos se realizarán conforme a los
                    estándares de protección de la Unión Europea y el RGPD.
                  </p>
                </section>

                {/* Additional Information */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    11. Información Adicional
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Para cualquier consulta relacionada con la presente Política
                    de Privacidad, puede dirigirse a{" "}
                    <a
                      href="mailto:contacto@advia.tech"
                      className="text-primary-light hover:text-primary-dark transition-colors"
                    >
                      contacto@advia.tech
                    </a>
                  </p>
                </section>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
