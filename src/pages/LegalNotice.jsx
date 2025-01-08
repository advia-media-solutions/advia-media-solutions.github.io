import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const LegalNotice = () => {
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
            Aviso{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Legal
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
            </span>
          </h1>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Información General Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              1. Información General
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                En cumplimiento con el deber de información dispuesto en la Ley
                34/2002 de Servicios de la Sociedad de la Información y el
                Comercio Electrónico (LSSI-CE) de 11 de julio, se facilitan a
                continuación los siguientes datos de información general de este
                sitio web:
              </p>
              <div className="pl-5 space-y-2">
                <p>La titularidad de este sitio web corresponde a:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Denominación social: ADVIA MEDIA SOLUTIONS</li>
                  <li>NIF: B19456417</li>
                  <li>
                    Domicilio social: CALLE VILLANUEVA, 28 2º D. 28001, MADRID,
                    MADRID
                  </li>
                  <li>
                    Email de contacto:{" "}
                    <a
                      href="mailto:contacto@advia.tech"
                      className="text-primary-light hover:text-primary-dark transition-colors"
                    >
                      contacto@advia.tech
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Términos y Condiciones Section */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              2. Términos y Condiciones de Uso
            </h2>
            <div className="space-y-6">
              <p className="text-neutral-DEFAULT/80 leading-relaxed">
                El presente Aviso Legal regula el uso del sitio web de ADVIA
                MEDIA SOLUTIONS (en adelante, "el sitio web"), al que accede a
                través de la dirección URL www.advia.tech.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-dark">
                  2.1. Usuarios
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  La navegación por el sitio web atribuye la condición de
                  usuario e implica la aceptación plena y sin reservas de todas
                  y cada una de las disposiciones incluidas en este Aviso Legal,
                  que pueden sufrir modificaciones.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-dark">
                  2.2. Navegación, Acceso y Seguridad
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  El acceso y navegación en este sitio web implica aceptar y
                  conocer las advertencias legales, condiciones y términos de
                  uso contenidos en ella. ADVIA realiza los máximos esfuerzos
                  para que la navegación se realice en las mejores condiciones y
                  evitar los perjuicios de cualquier tipo que pudiesen
                  ocasionarse durante la misma.
                </p>
              </div>
            </div>
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
                {/* Responsabilidades Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    3. Responsabilidades
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        3.1. Del Titular
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        ADVIA se exime de cualquier tipo de responsabilidad
                        derivada de la información publicada en su sitio web
                        cuando esta información haya sido manipulada o
                        introducida por un tercero ajeno al mismo.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        3.2. Del Usuario
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        El usuario se compromete a:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-neutral-DEFAULT/80 mt-2">
                        <li>
                          Hacer un uso adecuado y lícito del sitio web así como
                          de los contenidos y servicios.
                        </li>
                        <li>
                          No realizar ninguna conducta que pudiera dañar la
                          imagen, los intereses y los derechos de ADVIA o de
                          terceros.
                        </li>
                        <li>
                          No realizar ninguna acción destinada a perjudicar,
                          bloquear, dañar, inutilizar, sobrecargar, de manera
                          temporal o definitiva, las funcionalidades,
                          herramientas, contenidos y/o la infraestructura del
                          sitio web.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Propiedad Intelectual Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    4. Propiedad Intelectual e Industrial
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        4.1. Derechos
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        Los derechos de propiedad intelectual e industrial
                        derivados de todos los textos, imágenes, así como de los
                        medios y formas de presentación y montaje de sus páginas
                        pertenecen, por sí mismos o como cesionarios, a ADVIA.
                        Serán, por tanto, obras protegidas por la propiedad
                        intelectual e industrial, por lo que no podrán ser
                        objeto de explotación, reproducción, distribución,
                        modificación, comunicación pública, cesión o
                        transformación, salvo que medie autorización expresa de
                        ADVIA.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        4.2. Reserva de Derechos
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        ADVIA se reserva el derecho a emprender las acciones
                        legales que correspondan contra los usuarios que violen
                        o infrinjan los derechos de propiedad intelectual e
                        industrial.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Enlaces Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    5. Enlaces (Links)
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        5.1. Enlaces a Terceros
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        En caso de que en el sitio web se dispusiesen enlaces o
                        hipervínculos hacia otros sitios de Internet, ADVIA no
                        ejercerá ningún tipo de control sobre dichos sitios y
                        contenidos. En ningún caso ADVIA asumirá responsabilidad
                        alguna por los contenidos de algún enlace perteneciente
                        a un sitio web ajeno, ni garantizará la disponibilidad
                        técnica, calidad, fiabilidad, exactitud, amplitud,
                        veracidad, validez y constitucionalidad de cualquier
                        material o información contenida en ninguno de dichos
                        hipervínculos u otros sitios de Internet.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        5.2. Enlaces de Terceros
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        La inclusión de estas conexiones externas no implicará
                        ningún tipo de asociación, fusión o participación con
                        las entidades conectadas.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Modificaciones Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    6. Modificaciones
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    ADVIA se reserva el derecho a realizar las modificaciones
                    que considere oportunas, sin aviso previo, en el contenido
                    de su sitio web. Tanto en lo referente a los contenidos del
                    sitio web, como en las condiciones de uso del mismo, o en
                    las condiciones generales de contratación. Dichas
                    modificaciones podrán realizarse a través de su sitio web
                    por cualquier forma admisible en derecho y serán de obligado
                    cumplimiento durante el tiempo en que se encuentren
                    publicadas en el web y hasta que no sean modificadas
                    válidamente por otras posteriores.
                  </p>
                </section>

                {/* Legislación Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    7. Legislación Aplicable y Jurisdicción
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    La relación entre ADVIA y el usuario se regirá por la
                    normativa española vigente. Todas las disputas y
                    reclamaciones derivadas de este aviso legal se resolverán
                    por los juzgados y tribunales españoles.
                  </p>
                </section>

                {/* Nulidad Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    8. Nulidad e Ineficacia de las Cláusulas
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Si cualquier cláusula incluida en este Aviso Legal fuese
                    declarada, total o parcialmente, nula o ineficaz, tal
                    nulidad o ineficacia afectará tan sólo a dicha disposición o
                    a la parte de la misma que resulte nula o ineficaz,
                    subsistiendo el Aviso Legal en todo lo demás, considerándose
                    tal disposición total o parcialmente por no incluida.
                  </p>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed mt-6">
                    Fecha de la última actualización: 6 de enero de 2025
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

export default LegalNotice;
