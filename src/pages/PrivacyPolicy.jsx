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
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark tracking-tight">
            Política de{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Privacidad
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
            </span>
          </h1>
          <p className="text-neutral-DEFAULT/70 italic">
            Servicio Ad Server de Advia
          </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Responsable / Cabecera */}
          <section className="space-y-4 animate-fadeIn">
            <div className="space-y-2 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                <strong>Responsable del tratamiento:</strong> ADVIA MEDIA
                SOLUTIONS, S.L.
              </p>
              <p>
                <strong>NIF:</strong> B19456417
              </p>
              <p>
                <strong>Domicilio social:</strong> Calle Naciones, 10 – Local,
                28006, Madrid (España)
              </p>
              <p>
                <strong>Actividad:</strong> Servicios de publicidad, relaciones
                públicas y similares (CNAE 7311)
              </p>
              <p>
                <strong>Contacto para privacidad y ejercicio de derechos:</strong>{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
              </p>
              <p>
                <strong>Última actualización:</strong> 2026-04-22 ·{" "}
                <strong>Versión:</strong> 1.0
              </p>
            </div>
          </section>

          {/* 1. Introducción */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              1. Introducción
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Esta Política de Privacidad describe cómo ADVIA MEDIA SOLUTIONS,
                S.L. ("Advia", "nosotros") trata datos personales en el marco de
                su servicio de ad server publicitario, cuando los navegadores de
                usuarios finales interactúan con las creatividades publicitarias
                que Advia aloja y entrega.
              </p>
              <p>
                Advia actúa como <strong>intermediario técnico</strong> entre
                DSPs (Demand-Side Platforms) y publishers adheridos al{" "}
                <strong>
                  IAB Europe Transparency & Consent Framework (TCF)
                </strong>
                . Advia no mantiene relación directa con el usuario final: el
                punto de contacto con el usuario para la transparencia y la
                gestión de consentimiento es el <strong>CMP del publisher</strong>{" "}
                donde se sirve el anuncio.
              </p>
              <p>
                Esta política está dirigida al <strong>usuario final</strong>{" "}
                cuya actividad puede generar datos procesados por Advia durante
                la entrega y medición de anuncios.
              </p>
            </div>
          </section>

          {/* 2. TCF */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              2. Participación en el IAB Europe TCF
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              ADVIA MEDIA SOLUTIONS, S.L. participa en el IAB Europe Transparency
              & Consent Framework y cumple con sus Especificaciones y Políticas.
              El número de identificación de ADVIA MEDIA SOLUTIONS, S.L. dentro
              del framework es{" "}
              <strong>[VENDOR_ID pendiente de asignación por IAB Europe]</strong>
              .
            </p>
          </section>

          {/* 3. Qué hace el ad server */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              3. Qué hace el ad server de Advia
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Advia genera ad tags (VAST/JavaScript) que apuntan a creatividades
                alojadas en su infraestructura. Cuando un DSP gana una subasta
                publicitaria, el navegador del usuario ejecuta el script del ad
                tag correspondiente, que carga el creativo desde los servidores
                de Advia.
              </p>
              <p>
                Durante la entrega y ejecución del creativo, Advia puede:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Recibir y responder a solicitudes técnicas (ad requests).</li>
                <li>Entregar los ficheros del creativo al navegador del usuario.</li>
                <li>
                  Parsear la TC String proporcionada por el CMP del publisher
                  para verificar la base legal aplicable a cada tratamiento.
                </li>
                <li>
                  Propagar la TC String íntegra y sin modificación a píxeles de
                  terceros que la creatividad active (verificadores tipo Adloox,
                  DoubleVerify, IAS, Moat, y ad servers de retargeting).
                </li>
                <li>
                  Registrar eventos del ciclo de vida de la creatividad
                  (impresión, click, viewable, reproducción de vídeo y
                  similares) para reportar el rendimiento de la campaña al
                  anunciante.
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-neutral-dark mt-6 mb-2">
                Qué NO hace Advia
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  No despliega cookies propias ni accede a información
                  almacenada en el dispositivo del usuario (localStorage,
                  IndexedDB, mobile ad IDs, etc.).
                </li>
                <li>
                  No crea audiencias, perfiles de usuario ni identificadores de
                  dispositivo persistentes.
                </li>
                <li>
                  No utiliza perfiles para seleccionar qué anuncio servir (la
                  decisión la toma el DSP aguas arriba).
                </li>
                <li>
                  No realiza fingerprinting activo de características del
                  dispositivo.
                </li>
                <li>
                  No procesa geolocalización precisa (latitud/longitud con más
                  de dos decimales o radio inferior a 500 m).
                </li>
                <li>
                  No cruza datos con fuentes externas (offline, CRM, loyalty,
                  etc.).
                </li>
                <li>No enlaza dispositivos del mismo usuario (cross-device mapping).</li>
                <li>
                  No procesa identificadores de autenticación (emails,
                  teléfonos, hashes derivados).
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Categorías de datos */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              4. Categorías de datos tratados
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-neutral-DEFAULT/80 leading-relaxed border-collapse">
                <thead>
                  <tr className="border-b border-neutral-DEFAULT/20">
                    <th className="py-2 pr-4 font-semibold text-neutral-dark">
                      Categoría
                    </th>
                    <th className="py-2 font-semibold text-neutral-dark">
                      Tratamiento
                    </th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">Dirección IP pública</td>
                    <td className="py-3">
                      Recibida por el servidor HTTP para rutear la respuesta;
                      procesada al vuelo y descartada tras la respuesta. No se
                      almacena.
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">User Agent</td>
                    <td className="py-3">
                      Registrado solo cuando el consent check TCF es favorable,
                      para permitir el desglose por dispositivo/navegador en el
                      reporting de rendimiento al anunciante.
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">URL/referer</td>
                    <td className="py-3">
                      URL de la página donde se sirve el anuncio (contexto).
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">Interacciones con el anuncio</td>
                    <td className="py-3">
                      Eventos de impresión, click, viewable, reproducción de
                      vídeo y similares.
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">
                      TC String (señal de privacidad del CMP)
                    </td>
                    <td className="py-3">
                      Parseada en memoria para verificar la base legal aplicable
                      y propagada íntegra a terceros. No se persiste.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Identificadores internos efímeros</td>
                    <td className="py-3">
                      Se genera un <code>journeyId</code> por impresión, dentro
                      del iframe del creativo, para correlacionar eventos de una
                      misma impresión. No persiste entre ejecuciones, no es un
                      identificador de dispositivo y no permite re-identificar
                      al usuario.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Finalidades y base legal */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              5. Finalidades y base legal
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia declara las siguientes finalidades dentro del TCF, con la
              base legal correspondiente conforme al Art. 6 del Reglamento
              General de Protección de Datos (RGPD):
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Purpose 7 – Medir el rendimiento de la publicidad
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Base legal:</strong> Consentimiento o interés
                    legítimo (Art. 6.1.a o 6.1.f RGPD).
                  </li>
                  <li>
                    <strong>Descripción:</strong> Registrar eventos del ciclo
                    de vida de la creatividad para reportar a los anunciantes
                    el rendimiento agregado de sus campañas.
                  </li>
                  <li>
                    <strong>Retención:</strong> 90 días (datos en bruto).
                    Transcurrido este plazo, los datos en bruto se eliminan;
                    únicamente se conservan métricas agregadas por campaña sin
                    datos personales.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Special Purpose 2 – Entregar y presentar publicidad y contenido
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Base legal:</strong> Interés legítimo (Art. 6.1.f
                    RGPD). El TCF clasifica este tratamiento como Special
                    Purpose sin derecho de oposición vía el framework, por ser
                    indispensable para la entrega técnica del contenido.
                  </li>
                  <li>
                    <strong>Descripción:</strong> Recibir y responder a ad
                    requests, entregar los ficheros del creativo al navegador,
                    y responder a la interacción del usuario con el anuncio.
                  </li>
                  <li>
                    <strong>Retención:</strong> 90 días (alineado con Purpose
                    7; la IP no se almacena).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Special Purpose 3 – Guardar y comunicar las elecciones de
                  privacidad
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Base legal:</strong> Interés legítimo (Art. 6.1.f
                    RGPD). El TCF clasifica este tratamiento como Special
                    Purpose sin derecho de oposición vía el framework, ya que
                    su finalidad es precisamente respetar las elecciones de
                    privacidad del usuario.
                  </li>
                  <li>
                    <strong>Descripción:</strong> Verificar y propagar las
                    señales TCF (TC String) para que el ecosistema publicitario
                    aplique correctamente las elecciones de privacidad del
                    usuario.
                  </li>
                  <li>
                    <strong>Retención:</strong> 0 días (la TC String se procesa
                    en memoria y se descarta tras la propagación).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Resto de Purposes del TCF
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  Advia <strong>no declara</strong> los Purposes 1, 2, 3, 4, 5,
                  6, 8, 9, 10 y 11, al no realizar ninguno de los tratamientos
                  cubiertos por esos propósitos (almacenamiento en dispositivo,
                  selección de anuncios, perfilado, personalización de
                  contenido, mediciones de contenido editorial, audience
                  insights, desarrollo de productos o selección de contenido).
                </p>
              </div>
            </div>
          </section>

          {/* 6. Destinatarios */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              6. Destinatarios de los datos
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Advia no vende ni cede datos personales a terceros. Durante la
                ejecución del creativo, Advia propaga la{" "}
                <strong>TC String íntegra y sin modificación</strong> a píxeles
                de terceros que la creatividad haya activado (verificadores de
                visibilidad y calidad como Adloox, DoubleVerify, IAS, Moat, y
                ad servers de retargeting que el anunciante haya integrado),
                para que cada uno de ellos pueda aplicar sus propias reglas de
                cumplimiento conforme a la señal de privacidad del usuario.
              </p>
              <p>
                Cada uno de esos terceros actúa como responsable del
                tratamiento independiente respecto a los datos que procesa.
              </p>
            </div>
          </section>

          {/* 7. Transferencias internacionales */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              7. Transferencias internacionales
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia procesa los datos en infraestructura alojada dentro del
              Espacio Económico Europeo. Si alguno de los píxeles de terceros
              que la creatividad active realiza transferencias internacionales,
              cada uno de esos terceros es responsable de declarar y cumplir
              con las garantías aplicables (Art. 44 y ss. RGPD).
            </p>
          </section>

          {/* 8. Plazos de conservación */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              8. Plazos de conservación
            </h2>
            <ul className="space-y-2 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>
                <strong>Eventos de rendimiento (Purpose 7, SP2):</strong> 90
                días en bruto, tras los cuales se eliminan; solo se conservan
                métricas agregadas por campaña sin datos personales ni
                identificadores asociados al usuario.
              </li>
              <li>
                <strong>TC String (SP3):</strong> no se persiste — se procesa
                en memoria y se descarta tras la propagación.
              </li>
              <li>
                <strong>Dirección IP:</strong> no se almacena — se procesa al
                vuelo durante la respuesta HTTP.
              </li>
            </ul>
          </section>

          {/* 9. Cookies */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              9. Cookies y almacenamiento en el dispositivo del usuario
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Advia <strong>no utiliza cookies propias</strong> ni accede a
                información almacenada en el dispositivo del usuario
                (localStorage, IndexedDB, mobile ad IDs u otros mecanismos de
                almacenamiento cliente). El journeyId se genera efímeramente
                dentro del iframe del creativo y no persiste entre ejecuciones
                ni se almacena en el dispositivo.
              </p>
              <p>
                Esto significa que Advia no realiza ninguna operación que caiga
                dentro del ámbito del Art. 22.2 de la Ley 34/2002 de Servicios
                de la Sociedad de la Información (LSSI-CE) ni del Art. 5(3) de
                la Directiva 2002/58/CE (ePrivacy).
              </p>
            </div>
          </section>

          {/* 10. Derechos del usuario */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              10. Derechos del usuario
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Conforme al RGPD y a la Ley Orgánica 3/2018 de Protección de
                Datos Personales y garantía de los derechos digitales
                (LOPDGDD), el usuario tiene los siguientes derechos respecto a
                sus datos personales:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Acceso (Art. 15 RGPD)</li>
                <li>Rectificación (Art. 16 RGPD)</li>
                <li>Supresión ("derecho al olvido", Art. 17 RGPD)</li>
                <li>Limitación del tratamiento (Art. 18 RGPD)</li>
                <li>Portabilidad (Art. 20 RGPD)</li>
                <li>
                  <strong>Oposición (Art. 21 RGPD)</strong> — incluyendo, cuando
                  el tratamiento se basa en interés legítimo, el derecho a
                  oponerse en cualquier momento.
                </li>
                <li>
                  Retirar el consentimiento en cualquier momento, cuando el
                  tratamiento se base en consentimiento.
                </li>
              </ul>
              <p>
                <strong>Canal de ejercicio:</strong> puede ejercer estos
                derechos enviando un correo electrónico a{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
                , identificándose debidamente.
              </p>
              <p>
                <strong>Gestión granular vía CMP:</strong> para los
                tratamientos bajo el TCF, la forma más directa de gestionar sus
                elecciones (consentimiento u oposición por Vendor y por
                Purpose) es mediante el{" "}
                <strong>
                  CMP (Consent Management Platform) del publisher
                </strong>{" "}
                donde se sirve el anuncio.
              </p>
              <p>
                <strong>Reclamación ante la autoridad de control:</strong> si
                considera que el tratamiento de sus datos no es conforme a la
                normativa, puede presentar una reclamación ante la{" "}
                <strong>
                  Agencia Española de Protección de Datos (AEPD)
                </strong>{" "}
                — C/ Jorge Juan, 6, 28001 Madrid —{" "}
                <a
                  href="https://www.aepd.es"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.aepd.es
                </a>
                .
              </p>
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
              <div className="space-y-12 animate-fadeIn pt-4">
                {/* 11. Decisiones automatizadas */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    11. Decisiones automatizadas
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Advia no toma decisiones automatizadas con efectos
                    jurídicos o significativos sobre el usuario (Art. 22 RGPD).
                    No se realiza perfilado del usuario.
                  </p>
                </section>

                {/* 12. Menores */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    12. Menores
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Advia no dirige su servicio a menores de edad ni trata
                    intencionadamente datos personales de menores. Si se
                    identificara un tratamiento no intencionado de datos de
                    menores, se procederá a su eliminación conforme a los
                    mecanismos previstos en esta política.
                  </p>
                </section>

                {/* 13. Modificaciones */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    13. Modificaciones de la política
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Esta política puede actualizarse para reflejar cambios en
                    las prácticas de tratamiento, en el marco legal aplicable o
                    en las obligaciones del TCF. La versión vigente será
                    siempre la publicada en esta URL, con indicación de la
                    fecha de última actualización.
                  </p>
                </section>

                {/* 14. Interés Legítimo */}
                <section id="interes-legitimo" className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-dark">
                    14. Interés Legítimo
                  </h2>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed">
                    Esta sección describe los intereses legítimos que Advia
                    persigue al amparo del Art. 6.1.f RGPD para los
                    tratamientos declarados en el TCF, junto con el resumen del
                    resultado del Legitimate Interest Assessment (LIA)
                    realizado para cada uno.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        14.1 Purpose 7 – Medir el rendimiento de la publicidad
                      </h3>
                      <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                        <p>
                          <strong>Interés legítimo perseguido:</strong> reportar
                          a los anunciantes el rendimiento agregado de sus
                          campañas publicitarias (impresiones, clicks,
                          viewability, reproducciones de vídeo), que constituye
                          la prestación principal del servicio de ad server y
                          condición de competitividad en el mercado.
                        </p>
                        <p>
                          <strong>Por qué es necesario:</strong> sin esta
                          medición Advia no podría reportar rendimiento a los
                          anunciantes ni ofrecer el desglose por
                          dispositivo/navegador que es estándar en el sector.
                          No existen alternativas menos intrusivas compatibles
                          con esta finalidad: la medición sin User Agent impide
                          el desglose; el muestreo estadístico rompe la
                          facturación por impresión entregada; la agregación
                          100 % anónima imposibilita distinguir impresiones
                          individuales.
                        </p>
                        <p>
                          <strong>
                            Por qué no prevalecen los derechos del usuario:
                          </strong>{" "}
                          el tratamiento se diseña con minimización por defecto
                          (sin IP almacenada, sin cookies, sin identificadores
                          persistentes, sin fingerprinting). El journeyId es
                          efímero y se regenera en cada impresión. El User Agent
                          solo se registra cuando el CMP lo permite. La
                          retención se limita a 90 días. El tratamiento es
                          consistente con las expectativas razonables de
                          cualquier usuario que navega por un publisher adherido
                          al TCF: toda la publicidad digital se mide para
                          contabilizar el número de anuncios servidos y su
                          rendimiento — es una práctica universal y consolidada
                          en el sector, expresamente descrita en el Purpose 7
                          del TCF.
                        </p>
                        <p>
                          <strong>Derecho de oposición:</strong> el usuario
                          puede oponerse a este tratamiento en cualquier
                          momento, bien vía el CMP del publisher (gestión
                          granular por Vendor y Purpose), bien contactando con{" "}
                          <a
                            href="mailto:privacy@advia.tech"
                            className="text-primary-light hover:text-primary-dark transition-colors"
                          >
                            privacy@advia.tech
                          </a>
                          .
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        14.2 Special Purpose 2 – Entregar y presentar publicidad
                      </h3>
                      <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                        <p>
                          <strong>Interés legítimo perseguido:</strong> operar
                          técnicamente el ad server — recibir ad requests,
                          entregar creatividades al navegador del usuario y
                          responder a sus interacciones.
                        </p>
                        <p>
                          <strong>Por qué es necesario:</strong> sin esta
                          entrega técnica el servicio no existe. Es el
                          tratamiento mínimo y universal que realiza cualquier
                          ad server del ecosistema digital, y sus datos
                          (fundamentalmente la IP para rutear la respuesta HTTP)
                          son técnicamente indispensables.
                        </p>
                        <p>
                          <strong>
                            Por qué no prevalecen los derechos del usuario:
                          </strong>{" "}
                          la IP no se almacena (solo se procesa al vuelo para
                          responder al request). No se usan cookies, ni se
                          crean identificadores, ni se cruzan datos con fuentes
                          externas. El tratamiento es inherente al
                          funcionamiento de internet y consistente con cualquier
                          interacción del navegador con un servidor web. El TCF
                          clasifica este tratamiento como Special Purpose sin
                          derecho de oposición vía el framework, reconociendo
                          su carácter indispensable.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        14.3 Special Purpose 3 – Guardar y comunicar las
                        elecciones de privacidad
                      </h3>
                      <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                        <p>
                          <strong>Interés legítimo perseguido:</strong>{" "}
                          verificar y propagar las señales TCF (TC String) a lo
                          largo de la cadena publicitaria para que Advia y el
                          resto del ecosistema respeten las elecciones de
                          privacidad del usuario.
                        </p>
                        <p>
                          <strong>Por qué es necesario:</strong> sin este
                          procesamiento, Advia no podría verificar su base
                          legal antes de aplicar tratamientos condicionales
                          (p. ej. registro del User Agent bajo Purpose 7) ni
                          garantizar que el resto de vendors del ecosistema
                          reciben la señal de privacidad sin pérdida de
                          información.
                        </p>
                        <p>
                          <strong>
                            Por qué no prevalecen los derechos del usuario:
                          </strong>{" "}
                          el único dato tratado es la propia TC String (que no
                          contiene identificadores del usuario, solo sus
                          preferencias), que se procesa en memoria y se
                          descarta tras la propagación. El tratamiento es
                          directamente favorable al data subject: su finalidad
                          es respetar y propagar sus elecciones de privacidad.
                          El TCF clasifica este tratamiento como Special
                          Purpose sin derecho de oposición vía el framework, ya
                          que no tendría sentido objetar al respeto de las
                          propias preferencias.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        Documentación interna
                      </h3>
                      <p className="text-neutral-DEFAULT/80 leading-relaxed">
                        Los Legitimate Interest Assessments (LIAs) completos
                        con los tres tests obligatorios (Purpose test,
                        Necessity test, Balancing test) se conservan
                        internamente por Advia como registro de accountability
                        conforme al Art. 5.2 y 24 RGPD, y están disponibles
                        para las autoridades de control que así lo requieran.
                      </p>
                    </div>
                  </div>
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
