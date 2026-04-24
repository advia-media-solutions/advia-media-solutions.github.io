import React from "react";

const PrivacyPolicy = () => {
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

          <div className="flex items-center gap-2 text-sm">
            <a
              href="#es"
              className="px-3 py-1 rounded-full border border-neutral-DEFAULT/20 text-neutral-dark hover:bg-neutral-DEFAULT/5 transition-colors"
            >
              Español
            </a>
            <a
              href="#en"
              className="px-3 py-1 rounded-full border border-neutral-DEFAULT/20 text-neutral-dark hover:bg-neutral-DEFAULT/5 transition-colors"
            >
              English
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div id="es" className="max-w-4xl mx-auto space-y-12 scroll-mt-24">
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
                <strong>
                  Contacto para privacidad y ejercicio de derechos:
                </strong>{" "}
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
                gestión de consentimiento es el{" "}
                <strong>CMP del publisher</strong> donde se sirve el anuncio.
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
              ADVIA MEDIA SOLUTIONS, S.L. participa en el IAB Europe
              Transparency & Consent Framework y cumple con sus Especificaciones
              y Políticas. El número de identificación de ADVIA MEDIA SOLUTIONS,
              S.L. dentro del framework es{" "}
              <strong>
                [VENDOR_ID pendiente de asignación por IAB Europe]
              </strong>
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
                Advia genera ad tags (VAST/JavaScript) que apuntan a
                creatividades alojadas en su infraestructura. Cuando un DSP gana
                una subasta publicitaria, el navegador del usuario ejecuta el
                script del ad tag correspondiente, que carga el creativo desde
                los servidores de Advia.
              </p>
              <p>Durante la entrega y ejecución del creativo, Advia puede:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Recibir y responder a solicitudes técnicas (ad requests).
                </li>
                <li>
                  Entregar los ficheros del creativo al navegador del usuario.
                </li>
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
                <li>
                  No enlaza dispositivos del mismo usuario (cross-device
                  mapping).
                </li>
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
                    <td className="py-3 pr-4">Dirección IP</td>
                    <td className="py-3">
                      <strong>No IP:</strong> Advia no procesa la dirección IP
                      del usuario. El ad tag se carga cuando el navegador llama
                      al CDN y Advia solo responde sirviendo los ficheros del
                      creativo; la IP la ve el transporte de red a nivel de CDN
                      pero no se procesa ni se almacena como dato de negocio.
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
                    <td className="py-3 pr-4">
                      Identificadores internos efímeros
                    </td>
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
                    <strong>Descripción:</strong> Registrar eventos del ciclo de
                    vida de la creatividad para reportar a los anunciantes el
                    rendimiento agregado de sus campañas.
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
                  Special Purpose 2 – Entregar y presentar publicidad y
                  contenido
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
                    requests, entregar los ficheros del creativo al navegador, y
                    responder a la interacción del usuario con el anuncio.
                  </li>
                  <li>
                    <strong>Retención:</strong> 90 días (alineado con Purpose 7;
                    la IP no se almacena).
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
                    Purpose sin derecho de oposición vía el framework, ya que su
                    finalidad es precisamente respetar las elecciones de
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
                visibilidad y calidad como Adloox, DoubleVerify, IAS, Moat, y ad
                servers de retargeting que el anunciante haya integrado), para
                que cada uno de ellos pueda aplicar sus propias reglas de
                cumplimiento conforme a la señal de privacidad del usuario.
              </p>
              <p>
                Cada uno de esos terceros actúa como responsable del tratamiento
                independiente respecto a los datos que procesa.
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
              cada uno de esos terceros es responsable de declarar y cumplir con
              las garantías aplicables (Art. 44 y ss. RGPD).
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
                <strong>TC String (SP3):</strong> no se persiste — se procesa en
                memoria y se descarta tras la propagación.
              </li>
              <li>
                <strong>Dirección IP:</strong> no se procesa como dato de
                negocio. La IP la ve el transporte de red a nivel de CDN pero
                Advia no la procesa ni la almacena.
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
                Datos Personales y garantía de los derechos digitales (LOPDGDD),
                el usuario tiene los siguientes derechos respecto a sus datos
                personales:
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
                <strong>Gestión granular vía CMP:</strong> para los tratamientos
                bajo el TCF, la forma más directa de gestionar sus elecciones
                (consentimiento u oposición por Vendor y por Purpose) es
                mediante el{" "}
                <strong>CMP (Consent Management Platform) del publisher</strong>{" "}
                donde se sirve el anuncio.
              </p>
              <p>
                <strong>Reclamación ante la autoridad de control:</strong> si
                considera que el tratamiento de sus datos no es conforme a la
                normativa, puede presentar una reclamación ante la{" "}
                <strong>Agencia Española de Protección de Datos (AEPD)</strong>{" "}
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

          {/* 11. Decisiones automatizadas */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              11. Decisiones automatizadas
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia no toma decisiones automatizadas con efectos jurídicos o
              significativos sobre el usuario (Art. 22 RGPD). No se realiza
              perfilado del usuario.
            </p>
          </section>

          {/* 12. Menores */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-dark">
              12. Menores
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia no dirige su servicio a menores de edad ni trata
              intencionadamente datos personales de menores. Si se identificara
              un tratamiento no intencionado de datos de menores, se procederá a
              su eliminación conforme a los mecanismos previstos en esta
              política.
            </p>
          </section>

          {/* 13. Modificaciones */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-dark">
              13. Modificaciones de la política
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Esta política puede actualizarse para reflejar cambios en las
              prácticas de tratamiento, en el marco legal aplicable o en las
              obligaciones del TCF. La versión vigente será siempre la publicada
              en esta URL, con indicación de la fecha de última actualización.
            </p>
          </section>

          {/* 14. Interés Legítimo */}
          <section id="interes-legitimo" className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-dark">
              14. Interés Legítimo
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Esta sección describe los intereses legítimos que Advia persigue
              al amparo del Art. 6.1.f RGPD para los tratamientos declarados en
              el TCF, junto con el resumen del resultado del Legitimate Interest
              Assessment (LIA) realizado para cada uno.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  14.1 Purpose 7 – Medir el rendimiento de la publicidad
                </h3>
                <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                  <p>
                    <strong>Interés legítimo perseguido:</strong> reportar a los
                    anunciantes el rendimiento agregado de sus campañas
                    publicitarias (impresiones, clicks, viewability,
                    reproducciones de vídeo), que constituye la prestación
                    principal del servicio de ad server y condición de
                    competitividad en el mercado.
                  </p>
                  <p>
                    <strong>Por qué es necesario:</strong> sin esta medición
                    Advia no podría reportar rendimiento a los anunciantes ni
                    ofrecer el desglose por dispositivo/navegador que es
                    estándar en el sector. No existen alternativas menos
                    intrusivas compatibles con esta finalidad: la medición sin
                    User Agent impide el desglose; el muestreo estadístico rompe
                    la facturación por impresión entregada; la agregación 100 %
                    anónima imposibilita distinguir impresiones individuales.
                  </p>
                  <p>
                    <strong>
                      Por qué no prevalecen los derechos del usuario:
                    </strong>{" "}
                    el tratamiento se diseña con minimización por defecto (sin
                    IP almacenada, sin cookies, sin identificadores
                    persistentes, sin fingerprinting). El journeyId es efímero y
                    se regenera en cada impresión. El User Agent solo se
                    registra cuando el CMP lo permite. La retención se limita a
                    90 días. El tratamiento es consistente con las expectativas
                    razonables de cualquier usuario que navega por un publisher
                    adherido al TCF: toda la publicidad digital se mide para
                    contabilizar el número de anuncios servidos y su rendimiento
                    — es una práctica universal y consolidada en el sector,
                    expresamente descrita en el Purpose 7 del TCF.
                  </p>
                  <p>
                    <strong>Derecho de oposición:</strong> el usuario puede
                    oponerse a este tratamiento en cualquier momento, bien vía
                    el CMP del publisher (gestión granular por Vendor y
                    Purpose), bien contactando con{" "}
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
                    técnicamente el ad server — recibir ad requests, entregar
                    creatividades al navegador del usuario y responder a sus
                    interacciones.
                  </p>
                  <p>
                    <strong>Por qué es necesario:</strong> sin esta entrega
                    técnica el servicio no existe. Es el tratamiento mínimo y
                    universal que realiza cualquier ad server del ecosistema
                    digital: entregar los ficheros del creativo en respuesta a
                    la llamada del navegador al CDN.
                  </p>
                  <p>
                    <strong>
                      Por qué no prevalecen los derechos del usuario:
                    </strong>{" "}
                    Advia no procesa la IP del usuario como dato de negocio (la
                    IP únicamente la ve el transporte de red a nivel de CDN).
                    No se usan cookies, ni se crean identificadores, ni se
                    cruzan datos con fuentes externas. El tratamiento es
                    inherente al funcionamiento de internet y consistente con
                    cualquier interacción del navegador con un servidor web. El
                    TCF clasifica este tratamiento como Special Purpose sin
                    derecho de oposición vía el framework, reconociendo su
                    carácter indispensable.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  14.3 Special Purpose 3 – Guardar y comunicar las elecciones de
                  privacidad
                </h3>
                <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                  <p>
                    <strong>Interés legítimo perseguido:</strong> verificar y
                    propagar las señales TCF (TC String) a lo largo de la cadena
                    publicitaria para que Advia y el resto del ecosistema
                    respeten las elecciones de privacidad del usuario.
                  </p>
                  <p>
                    <strong>Por qué es necesario:</strong> sin este
                    procesamiento, Advia no podría verificar su base legal antes
                    de aplicar tratamientos condicionales (p. ej. registro del
                    User Agent bajo Purpose 7) ni garantizar que el resto de
                    vendors del ecosistema reciben la señal de privacidad sin
                    pérdida de información.
                  </p>
                  <p>
                    <strong>
                      Por qué no prevalecen los derechos del usuario:
                    </strong>{" "}
                    el único dato tratado es la propia TC String (que no
                    contiene identificadores del usuario, solo sus
                    preferencias), que se procesa en memoria y se descarta tras
                    la propagación. El tratamiento es directamente favorable al
                    data subject: su finalidad es respetar y propagar sus
                    elecciones de privacidad. El TCF clasifica este tratamiento
                    como Special Purpose sin derecho de oposición vía el
                    framework, ya que no tendría sentido objetar al respeto de
                    las propias preferencias.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Documentación interna
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  Los Legitimate Interest Assessments (LIAs) completos con los
                  tres tests obligatorios (Purpose test, Necessity test,
                  Balancing test) se conservan internamente por Advia como
                  registro de accountability conforme al Art. 5.2 y 24 RGPD, y
                  están disponibles para las autoridades de control que así lo
                  requieran.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Language divider */}
        <div className="max-w-4xl mx-auto my-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-neutral-DEFAULT/20" />
          <span className="text-sm uppercase tracking-widest text-neutral-DEFAULT/60">
            English version
          </span>
          <div className="flex-1 h-px bg-neutral-DEFAULT/20" />
        </div>

        {/* English Content */}
        <div id="en" className="max-w-4xl mx-auto space-y-12 scroll-mt-24">
          <div className="space-y-6 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark tracking-tight">
              Privacy{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Policy
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
              </span>
            </h2>
          </div>

          {/* Controller header */}
          <section className="space-y-4 animate-fadeIn">
            <div className="space-y-2 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                <strong>Data controller:</strong> ADVIA MEDIA SOLUTIONS, S.L.
              </p>
              <p>
                <strong>Tax ID (NIF):</strong> B19456417
              </p>
              <p>
                <strong>Registered address:</strong> Calle Naciones, 10 – Local,
                28006, Madrid (Spain)
              </p>
              <p>
                <strong>Activity:</strong> Advertising, public relations and
                similar services (CNAE 7311)
              </p>
              <p>
                <strong>Privacy contact and rights exercise:</strong>{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
              </p>
              <p>
                <strong>Last update:</strong> 2026-04-22 ·{" "}
                <strong>Version:</strong> 1.0
              </p>
            </div>
          </section>

          {/* 1. Introduction */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              1. Introduction
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                This Privacy Policy describes how ADVIA MEDIA SOLUTIONS, S.L.
                ("Advia", "we") processes personal data within its advertising
                ad server service, when end-user browsers interact with the
                advertising creatives that Advia hosts and serves.
              </p>
              <p>
                Advia acts as a <strong>technical intermediary</strong> between
                DSPs (Demand-Side Platforms) and publishers participating in the{" "}
                <strong>
                  IAB Europe Transparency & Consent Framework (TCF)
                </strong>
                . Advia does not maintain a direct relationship with the end
                user: the user-facing point of contact for transparency and
                consent management is the <strong>publisher's CMP</strong> where
                the ad is served.
              </p>
              <p>
                This policy is addressed to the <strong>end user</strong> whose
                activity may generate data processed by Advia during ad delivery
                and measurement.
              </p>
            </div>
          </section>

          {/* 2. TCF */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              2. Participation in IAB Europe TCF
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              ADVIA MEDIA SOLUTIONS, S.L. participates in the IAB Europe
              Transparency & Consent Framework and complies with its
              Specifications and Policies. The identification number of ADVIA
              MEDIA SOLUTIONS, S.L. within the framework is{" "}
              <strong>[VENDOR_ID pending assignment by IAB Europe]</strong>.
            </p>
          </section>

          {/* 3. What Advia's ad server does */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              3. What Advia's ad server does
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Advia generates ad tags (VAST/JavaScript) pointing to creatives
                hosted on its infrastructure. When a DSP wins an ad auction, the
                user's browser executes the corresponding ad tag script, which
                loads the creative from Advia's servers.
              </p>
              <p>During creative delivery and execution, Advia may:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Receive and respond to technical requests (ad requests).
                </li>
                <li>Deliver the creative files to the user's browser.</li>
                <li>
                  Parse the TC String provided by the publisher's CMP to verify
                  the legal basis applicable to each processing activity.
                </li>
                <li>
                  Propagate the TC String intact and unmodified to third-party
                  pixels activated by the creative (verification vendors such as
                  Adloox, DoubleVerify, IAS, Moat, and retargeting ad servers).
                </li>
                <li>
                  Log creative lifecycle events (impression, click, viewable,
                  video play and similar) to report campaign performance to the
                  advertiser.
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-neutral-dark mt-6 mb-2">
                What Advia does NOT do
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Does not deploy first-party cookies nor access information
                  stored on the user's device (localStorage, IndexedDB, mobile
                  ad IDs, etc.).
                </li>
                <li>
                  Does not build audiences, user profiles or persistent device
                  identifiers.
                </li>
                <li>
                  Does not use profiles to decide which ad to serve (the
                  decision is made by the DSP upstream).
                </li>
                <li>Does not perform active device fingerprinting.</li>
                <li>
                  Does not process precise geolocation (latitude/longitude with
                  more than two decimals or radius below 500 m).
                </li>
                <li>
                  Does not cross-reference data with external sources (offline,
                  CRM, loyalty, etc.).
                </li>
                <li>
                  Does not link devices of the same user (cross-device mapping).
                </li>
                <li>
                  Does not process authentication identifiers (emails, phone
                  numbers, derived hashes).
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Categories of data */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              4. Categories of data processed
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-neutral-DEFAULT/80 leading-relaxed border-collapse">
                <thead>
                  <tr className="border-b border-neutral-DEFAULT/20">
                    <th className="py-2 pr-4 font-semibold text-neutral-dark">
                      Category
                    </th>
                    <th className="py-2 font-semibold text-neutral-dark">
                      Processing
                    </th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">IP address</td>
                    <td className="py-3">
                      <strong>No IP:</strong> Advia does not process the user's
                      IP address. The ad tag loads when the browser calls the
                      CDN and Advia only responds by serving the creative
                      files; the IP is seen by the network transport at CDN
                      level but is not processed or stored as business data.
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">User Agent</td>
                    <td className="py-3">
                      Logged only when the TCF consent check is favourable, to
                      enable device/browser breakdown in performance reporting
                      to the advertiser.
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">URL/referer</td>
                    <td className="py-3">
                      URL of the page where the ad is served (context).
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">Ad interactions</td>
                    <td className="py-3">
                      Impression, click, viewable, video play and similar
                      events.
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">
                      TC String (CMP privacy signal)
                    </td>
                    <td className="py-3">
                      Parsed in memory to verify the applicable legal basis and
                      propagated intact to third parties. Not persisted.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      Ephemeral internal identifiers
                    </td>
                    <td className="py-3">
                      A <code>journeyId</code> is generated per impression,
                      inside the creative's iframe, to correlate events from the
                      same impression. Does not persist between executions, is
                      not a device identifier and does not allow re-identifying
                      the user.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Purposes and legal basis */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              5. Purposes and legal basis
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia declares the following purposes within the TCF, with the
              corresponding legal basis under Art. 6 of the General Data
              Protection Regulation (GDPR):
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Purpose 7 – Measure advertising performance
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Legal basis:</strong> Consent or legitimate interest
                    (Art. 6(1)(a) or 6(1)(f) GDPR).
                  </li>
                  <li>
                    <strong>Description:</strong> Log creative lifecycle events
                    to report aggregated campaign performance to advertisers.
                  </li>
                  <li>
                    <strong>Retention:</strong> 90 days (raw data). After this
                    period, raw data is deleted; only aggregated per-campaign
                    metrics without personal data are kept.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Special Purpose 2 – Deliver and present advertising and
                  content
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Legal basis:</strong> Legitimate interest (Art.
                    6(1)(f) GDPR). The TCF classifies this as a Special Purpose
                    with no right to object via the framework, as it is
                    indispensable for the technical delivery of content.
                  </li>
                  <li>
                    <strong>Description:</strong> Receive and respond to ad
                    requests, deliver creative files to the browser, and respond
                    to user interaction with the ad.
                  </li>
                  <li>
                    <strong>Retention:</strong> 90 days (aligned with Purpose 7;
                    IP is not stored).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Special Purpose 3 – Save and communicate privacy choices
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Legal basis:</strong> Legitimate interest (Art.
                    6(1)(f) GDPR). The TCF classifies this as a Special Purpose
                    with no right to object via the framework, since its purpose
                    is precisely to respect the user's privacy choices.
                  </li>
                  <li>
                    <strong>Description:</strong> Verify and propagate TCF
                    signals (TC String) so that the advertising ecosystem
                    correctly applies the user's privacy choices.
                  </li>
                  <li>
                    <strong>Retention:</strong> 0 days (the TC String is
                    processed in memory and discarded after propagation).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Remaining TCF Purposes
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  Advia <strong>does not declare</strong> Purposes 1, 2, 3, 4,
                  5, 6, 8, 9, 10 and 11, as it does not carry out any of the
                  processing activities covered by those purposes (device
                  storage, ad selection, profiling, content personalisation,
                  editorial content measurement, audience insights, product
                  development or content selection).
                </p>
              </div>
            </div>
          </section>

          {/* 6. Recipients */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              6. Data recipients
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Advia does not sell or disclose personal data to third parties.
                During creative execution, Advia propagates the{" "}
                <strong>TC String intact and unmodified</strong> to third-party
                pixels activated by the creative (viewability and quality
                verification vendors such as Adloox, DoubleVerify, IAS, Moat,
                and retargeting ad servers integrated by the advertiser), so
                that each of them can apply their own compliance rules based on
                the user's privacy signal.
              </p>
              <p>
                Each of those third parties acts as an independent data
                controller with respect to the data it processes.
              </p>
            </div>
          </section>

          {/* 7. International transfers */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              7. International transfers
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia processes data on infrastructure located within the European
              Economic Area. If any of the third-party pixels activated by the
              creative performs international transfers, each of those third
              parties is responsible for declaring and complying with the
              applicable safeguards (Art. 44 et seq. GDPR).
            </p>
          </section>

          {/* 8. Retention periods */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              8. Retention periods
            </h2>
            <ul className="space-y-2 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>
                <strong>Performance events (Purpose 7, SP2):</strong> 90 days
                raw, then deleted; only aggregated per-campaign metrics without
                personal data or user-linked identifiers are kept.
              </li>
              <li>
                <strong>TC String (SP3):</strong> not persisted — processed in
                memory and discarded after propagation.
              </li>
              <li>
                <strong>IP address:</strong> not processed as business data.
                The IP is seen by network transport at CDN level but Advia does
                not process or store it.
              </li>
            </ul>
          </section>

          {/* 9. Cookies */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              9. Cookies and storage on the user's device
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Advia <strong>does not use first-party cookies</strong> nor
                access information stored on the user's device (localStorage,
                IndexedDB, mobile ad IDs or other client-side storage
                mechanisms). The journeyId is generated ephemerally within the
                creative's iframe and does not persist between executions nor is
                stored on the device.
              </p>
              <p>
                This means Advia does not perform any operation falling within
                the scope of Art. 22.2 of Spanish Law 34/2002 on Information
                Society Services (LSSI-CE) nor Art. 5(3) of Directive 2002/58/EC
                (ePrivacy).
              </p>
            </div>
          </section>

          {/* 10. User rights */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              10. User rights
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Under the GDPR and Spanish Organic Law 3/2018 on Personal Data
                Protection and guarantee of digital rights (LOPDGDD), the user
                has the following rights regarding their personal data:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Access (Art. 15 GDPR)</li>
                <li>Rectification (Art. 16 GDPR)</li>
                <li>Erasure ("right to be forgotten", Art. 17 GDPR)</li>
                <li>Restriction of processing (Art. 18 GDPR)</li>
                <li>Data portability (Art. 20 GDPR)</li>
                <li>
                  <strong>Objection (Art. 21 GDPR)</strong> — including, where
                  processing is based on legitimate interest, the right to
                  object at any time.
                </li>
                <li>
                  Withdraw consent at any time, where processing is based on
                  consent.
                </li>
              </ul>
              <p>
                <strong>Exercise channel:</strong> users may exercise these
                rights by sending an email to{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
                , duly identifying themselves.
              </p>
              <p>
                <strong>Granular management via CMP:</strong> for TCF-based
                processing, the most direct way to manage your choices (consent
                or objection per Vendor and per Purpose) is via the{" "}
                <strong>publisher's CMP (Consent Management Platform)</strong>{" "}
                where the ad is served.
              </p>
              <p>
                <strong>Complaint to the supervisory authority:</strong> if you
                consider that the processing of your data does not comply with
                regulations, you may lodge a complaint with the{" "}
                <strong>Spanish Data Protection Agency (AEPD)</strong> — C/
                Jorge Juan, 6, 28001 Madrid —{" "}
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

          {/* 11. Automated decision-making */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              11. Automated decision-making
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia does not make automated decisions with legal or significant
              effects on the user (Art. 22 GDPR). No user profiling is carried
              out.
            </p>
          </section>

          {/* 12. Minors */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">12. Minors</h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              Advia does not direct its service to minors nor intentionally
              process personal data of minors. If unintentional processing of
              minors' data were identified, it would be deleted in accordance
              with the mechanisms set out in this policy.
            </p>
          </section>

          {/* 13. Policy modifications */}
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              13. Policy modifications
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              This policy may be updated to reflect changes in processing
              practices, in the applicable legal framework or in TCF
              obligations. The current version will always be the one published
              at this URL, with the date of the last update indicated.
            </p>
          </section>

          {/* 14. Legitimate Interest */}
          <section
            id="legitimate-interest"
            className="space-y-4 animate-fadeIn"
          >
            <h2 className="text-2xl font-bold text-neutral-dark">
              14. Legitimate Interest
            </h2>
            <p className="text-neutral-DEFAULT/80 leading-relaxed">
              This section describes the legitimate interests that Advia pursues
              under Art. 6(1)(f) GDPR for the processing activities declared in
              the TCF, along with the summary of the Legitimate Interest
              Assessment (LIA) outcome for each.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  14.1 Purpose 7 – Measure advertising performance
                </h3>
                <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                  <p>
                    <strong>Legitimate interest pursued:</strong> report
                    aggregated campaign performance (impressions, clicks,
                    viewability, video plays) to advertisers, which constitutes
                    the main service provided by the ad server and a condition
                    of competitiveness in the market.
                  </p>
                  <p>
                    <strong>Why it is necessary:</strong> without this
                    measurement Advia could not report performance to
                    advertisers nor offer the device/browser breakdown that is
                    standard in the industry. There are no less intrusive
                    alternatives compatible with this purpose: measurement
                    without User Agent prevents breakdown; statistical sampling
                    breaks per-impression billing; 100% anonymous aggregation
                    makes it impossible to distinguish individual impressions.
                  </p>
                  <p>
                    <strong>Why user rights do not prevail:</strong> processing
                    is designed with minimisation by default (no IP stored, no
                    cookies, no persistent identifiers, no fingerprinting). The
                    journeyId is ephemeral and regenerated per impression. User
                    Agent is only logged when the CMP allows it. Retention is
                    limited to 90 days. The processing is consistent with the
                    reasonable expectations of any user browsing a
                    TCF-participating publisher: all digital advertising is
                    measured to count the number of ads served and their
                    performance — a universal and consolidated industry
                    practice, expressly described in TCF Purpose 7.
                  </p>
                  <p>
                    <strong>Right to object:</strong> the user may object to
                    this processing at any time, either via the publisher's CMP
                    (granular management per Vendor and Purpose), or by
                    contacting{" "}
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
                  14.2 Special Purpose 2 – Deliver and present advertising
                </h3>
                <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                  <p>
                    <strong>Legitimate interest pursued:</strong> technically
                    operate the ad server — receive ad requests, deliver
                    creatives to the user's browser and respond to their
                    interactions.
                  </p>
                  <p>
                    <strong>Why it is necessary:</strong> without this technical
                    delivery the service does not exist. It is the minimum and
                    universal processing performed by any ad server in the
                    digital ecosystem: serving the creative files in response
                    to the browser's call to the CDN.
                  </p>
                  <p>
                    <strong>Why user rights do not prevail:</strong> Advia does
                    not process the user's IP as business data (the IP is only
                    seen by network transport at CDN level). No cookies are
                    used, no identifiers are created, no data is
                    cross-referenced with external sources. The processing is
                    inherent to the operation of the internet and consistent
                    with any browser interaction with a web server. The TCF
                    classifies this as a Special Purpose with no right to
                    object via the framework, recognising its indispensable
                    nature.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  14.3 Special Purpose 3 – Save and communicate privacy choices
                </h3>
                <div className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed">
                  <p>
                    <strong>Legitimate interest pursued:</strong> verify and
                    propagate TCF signals (TC String) along the advertising
                    chain so that Advia and the rest of the ecosystem respect
                    the user's privacy choices.
                  </p>
                  <p>
                    <strong>Why it is necessary:</strong> without this
                    processing, Advia could not verify its legal basis before
                    applying conditional processing (e.g. User Agent logging
                    under Purpose 7) nor guarantee that other ecosystem vendors
                    receive the privacy signal without loss of information.
                  </p>
                  <p>
                    <strong>Why user rights do not prevail:</strong> the only
                    data processed is the TC String itself (which contains no
                    user identifiers, only their preferences), processed in
                    memory and discarded after propagation. The processing is
                    directly favourable to the data subject: its purpose is to
                    respect and propagate their privacy choices. The TCF
                    classifies this as a Special Purpose with no right to object
                    via the framework, since it would not make sense to object
                    to respecting one's own preferences.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Internal documentation
                </h3>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  The full Legitimate Interest Assessments (LIAs) with the three
                  mandatory tests (Purpose test, Necessity test, Balancing test)
                  are kept internally by Advia as an accountability record under
                  Art. 5.2 and 24 GDPR, and are available to supervisory
                  authorities upon request.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
