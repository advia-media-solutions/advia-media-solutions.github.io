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
                <strong>Última actualización:</strong> 2026-07-28 ·{" "}
                <strong>Versión:</strong> 2.0
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
                Las secciones 2 a 14 de esta política están dirigidas al{" "}
                <strong>usuario final</strong> cuya actividad puede generar
                datos procesados por Advia durante la entrega y medición de
                anuncios, es decir, al usuario que navega por el sitio de un
                publisher donde Advia sirve un anuncio.
              </p>
              <p>
                La <strong>sección 15</strong> cubre un supuesto distinto: los
                visitantes de este mismo sitio web, <code>advia.tech</code>,
                donde Advia actúa como responsable del tratamiento por derecho
                propio y no en su calidad de vendor del TCF.
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
              <strong>1586</strong>
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
                <li>
                  Establecer y leer la cookie <code>advia_uid</code>, previo
                  consentimiento del usuario señalizado en la TC String (Purpose
                  1), para deduplicar impresiones en el reporting de alcance.
                  Ver la sección 9.
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-neutral-dark mt-6 mb-2">
                Qué NO hace Advia
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  No accede a información almacenada en el dispositivo del
                  usuario por mecanismos distintos de la cookie{" "}
                  <code>advia_uid</code> descrita en la sección 9: no utiliza
                  localStorage, IndexedDB ni mobile ad IDs.
                </li>
                <li>
                  No crea audiencias ni perfiles de usuario. El identificador{" "}
                  <code>advia_uid</code> se emplea únicamente para deduplicar
                  impresiones y poder reportar el alcance de la campaña
                  (usuarios únicos); no se utiliza para perfilar, personalizar,
                  seleccionar anuncios ni realizar seguimiento entre sitios.
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
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">
                      Identificador pseudónimo persistente (
                      <code>advia_uid</code>)
                    </td>
                    <td className="py-3">
                      Valor aleatorio almacenado en una cookie propia en{" "}
                      <code>*.advia.tech</code> con una duración de 1 año,
                      refrescada en cada uso. Solo se establece y se lee previo
                      consentimiento (Purpose 1). Su única finalidad es
                      deduplicar impresiones para poder reportar al anunciante
                      métricas de usuarios únicos y alcance dentro del Purpose
                      7. No se cruza con otras fuentes ni permite identificar al
                      usuario fuera del dominio de Advia.
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
                  Purpose 1 – Almacenar o acceder a información en un
                  dispositivo
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Base legal:</strong> Consentimiento (Art. 6.1.a
                    RGPD), recabado por el CMP del publisher y señalizado en la
                    TC String. Al tratarse de almacenamiento en el equipo
                    terminal del usuario, aplica además el Art. 22.2 de la Ley
                    34/2002 (LSSI-CE) y el Art. 5(3) de la Directiva 2002/58/CE
                    (ePrivacy).
                  </li>
                  <li>
                    <strong>Descripción:</strong> Establecer y leer la cookie{" "}
                    <code>advia_uid</code> — un identificador pseudónimo
                    aleatorio — con la única finalidad de deduplicar impresiones
                    y poder reportar usuarios únicos y alcance dentro del
                    Purpose 7.
                  </li>
                  <li>
                    <strong>Sin consentimiento no hay cookie:</strong> si la TC
                    String no señaliza consentimiento para el Purpose 1 y para
                    Advia como vendor, la cookie no se establece ni se lee, y la
                    medición se realiza sin deduplicación.
                  </li>
                  <li>
                    <strong>Retención:</strong> la cookie tiene una duración de
                    1 año en el dispositivo, refrescada en cada uso. Los datos
                    de evento asociados se conservan 90 días en servidor.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Purpose 7 – Medir el rendimiento de la publicidad
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Base legal:</strong> Interés legítimo (Art. 6.1.f
                    RGPD) por defecto. El TCF clasifica este propósito como{" "}
                    <em>flexible</em> para Advia, por lo que el publisher puede
                    exigir consentimiento (Art. 6.1.a RGPD) en su lugar; en ese
                    caso Advia aplica la base legal que indique la TC String.
                  </li>
                  <li>
                    <strong>Descripción:</strong> Registrar eventos del ciclo de
                    vida de la creatividad para reportar a los anunciantes el
                    rendimiento agregado de sus campañas. Cuando existe
                    consentimiento para el Purpose 1, el identificador{" "}
                    <code>advia_uid</code> permite además reportar la dimensión
                    de usuarios únicos y alcance sin contar dos veces el mismo
                    navegador.
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
                  Advia <strong>no declara</strong> los Purposes 2, 3, 4, 5, 6,
                  8, 9, 10 y 11, al no realizar ninguno de los tratamientos
                  cubiertos por esos propósitos (selección de anuncios,
                  perfilado, personalización de contenido, mediciones de
                  contenido editorial, audience insights, desarrollo de
                  productos o selección de contenido).
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
                <strong>Cookie advia_uid (Purpose 1):</strong> 1 año de duración
                en el dispositivo del usuario, refrescada en cada uso. Conviene
                distinguir los dos plazos: la cookie persiste en el navegador
                hasta 1 año, mientras que los registros de evento que ese
                identificador permite deduplicar se eliminan a los 90 días. El
                usuario puede retirar el consentimiento o borrar la cookie en
                cualquier momento.
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
                Advia utiliza <strong>una única cookie propia</strong>. Es el
                único mecanismo de almacenamiento en el dispositivo que emplea:
                no utiliza localStorage, IndexedDB, mobile ad IDs ni ningún otro
                mecanismo de almacenamiento cliente.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-neutral-DEFAULT/80 leading-relaxed border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-DEFAULT/20">
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Identificador
                      </th>
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Tipo
                      </th>
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Dominio
                      </th>
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Duración
                      </th>
                      <th className="py-2 font-semibold text-neutral-dark">
                        Finalidad
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    <tr>
                      <td className="py-3 pr-4">
                        <code>advia_uid</code>
                      </td>
                      <td className="py-3 pr-4">Cookie</td>
                      <td className="py-3 pr-4">
                        <code>*.advia.tech</code>
                      </td>
                      <td className="py-3 pr-4">
                        1 año (31.536.000 s), refrescada en cada uso
                      </td>
                      <td className="py-3">
                        Purposes 1 y 7 — deduplicar impresiones para reportar
                        usuarios únicos y alcance de la campaña.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Esta declaración se publica también en formato legible por
                máquina, conforme a las Especificaciones del TCF, en{" "}
                <a
                  href="https://advia.tech/.well-known/tcf/vendor-storage-disclosure.json"
                  className="text-primary-light hover:text-primary-dark transition-colors break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  advia.tech/.well-known/tcf/vendor-storage-disclosure.json
                </a>
                , la URL registrada por Advia en la Global Vendor List.
              </p>
              <p>
                El <code>journeyId</code> no es almacenamiento en el
                dispositivo: se genera efímeramente dentro del iframe del
                creativo, no persiste entre ejecuciones y no se escribe en el
                navegador.
              </p>
              <p>
                Al tratarse de almacenamiento y acceso a información en el
                equipo terminal del usuario, esta cookie está sujeta al{" "}
                <strong>
                  Art. 22.2 de la Ley 34/2002 de Servicios de la Sociedad de la
                  Información (LSSI-CE)
                </strong>{" "}
                y al{" "}
                <strong>Art. 5(3) de la Directiva 2002/58/CE (ePrivacy)</strong>
                . Advia requiere{" "}
                <strong>consentimiento previo del usuario</strong>, recabado por
                el CMP del publisher y señalizado en la TC String, antes de
                establecerla o leerla. Si no hay consentimiento, la cookie no se
                establece ni se lee. El usuario puede retirar el consentimiento
                en cualquier momento a través del mismo CMP.
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
              Assessment (LIA) realizado para cada uno. El Purpose 1
              (almacenamiento y acceso a información en el dispositivo) queda
              fuera del alcance de esta sección: se basa en{" "}
              <strong>consentimiento</strong>, no en interés legítimo — ver la
              sección 5.
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
                    IP almacenada, sin fingerprinting, sin cruce con fuentes
                    externas). El journeyId es efímero y se regenera en cada
                    impresión. El User Agent solo se registra cuando el CMP lo
                    permite. La retención se limita a 90 días. El único
                    identificador persistente es <code>advia_uid</code>: un
                    valor pseudónimo y aleatorio, limitado al dominio de Advia,
                    que exige consentimiento previo (Purpose 1), no se cruza con
                    otras fuentes y se emplea exclusivamente para evitar contar
                    dos veces el mismo navegador en las cifras de alcance — no
                    para perfilar, personalizar ni seguir al usuario entre
                    sitios. Si el usuario no consiente, la medición sigue
                    funcionando sin él. El tratamiento es consistente con las
                    expectativas
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
                    La entrega de la creatividad no depende de la cookie{" "}
                    <code>advia_uid</code> ni de ningún otro identificador: se
                    realiza igual con o sin consentimiento, y el almacenamiento
                    en el dispositivo se ampara en su propia base legal
                    (consentimiento, Purpose 1 — ver la sección 5). No se cruzan
                    datos con fuentes externas. El tratamiento es
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

          {/* 15. Visitantes de advia.tech */}
          <section
            id="visitantes-web"
            className="space-y-4 animate-fadeIn scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-neutral-dark">
              15. Visitantes de este sitio web (advia.tech)
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Esta sección se aplica únicamente a quienes navegan por{" "}
                <code>advia.tech</code>, el sitio corporativo de Advia. Aquí
                Advia es responsable del tratamiento por derecho propio; nada de
                lo descrito en esta sección forma parte de su actividad como
                vendor 1586 del TCF ni se declara en el framework.
              </p>

              <h3 className="text-xl font-semibold text-neutral-dark mt-6 mb-2">
                Medición de tráfico del sitio
              </h3>
              <p>
                En cada petición de página, el servidor de advia.tech envía una
                llamada de medición a <code>events.advia.tech</code>. Esta
                llamada se realiza{" "}
                <strong>de servidor a servidor, no desde su navegador</strong>,
                y transmite únicamente dos datos:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  El <strong>User Agent</strong> de su navegador (tipo de
                  navegador, versión y sistema operativo).
                </li>
                <li>
                  La <strong>URL de la página solicitada</strong> dentro de
                  advia.tech.
                </li>
              </ul>
              <p>
                <strong>Su dirección IP no se transmite.</strong> Al originarse
                la llamada en el servidor y no en su navegador,{" "}
                <code>events.advia.tech</code> recibe la IP de salida de la
                infraestructura de alojamiento, no la suya.
              </p>
              <p>
                <strong>Finalidad:</strong> conocer el volumen y la distribución
                del tráfico del sitio corporativo (páginas más visitadas,
                reparto por navegador y dispositivo) para mantenerlo y
                mejorarlo.
              </p>
              <p>
                <strong>Base legal:</strong> interés legítimo (Art. 6.1.f RGPD).
                El interés perseguido es entender el uso del propio sitio
                corporativo. El tratamiento es mínimo — dos campos, sin IP, sin
                identificador de usuario y sin posibilidad de reconstruir una
                sesión o reconocer a un visitante recurrente — por lo que no
                prevalecen los derechos y libertades del interesado.
              </p>
              <p>
                <strong>No implica almacenamiento en su dispositivo:</strong>{" "}
                esta medición no escribe ni lee cookies, localStorage ni ningún
                otro dato en su equipo, por lo que queda fuera del ámbito del
                Art. 22.2 de la Ley 34/2002 (LSSI-CE) y del Art. 5(3) de la
                Directiva 2002/58/CE (ePrivacy). Las cookies que sí utiliza este
                sitio web se describen en la{" "}
                <a
                  href="/cookies-policy"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  Política de Cookies
                </a>
                , y se gestionan mediante el banner de consentimiento.
              </p>
              <p>
                <strong>Conservación:</strong> 90 días en bruto. Transcurrido
                ese plazo los registros se eliminan y solo se conservan métricas
                agregadas del sitio sin datos personales.
              </p>
              <p>
                <strong>Sus derechos:</strong> son los descritos en la sección
                10, incluido el derecho de oposición del Art. 21 RGPD, que puede
                ejercer en cualquier momento escribiendo a{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
                .
              </p>
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
                <strong>Last update:</strong> 2026-07-28 ·{" "}
                <strong>Version:</strong> 2.0
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
                Sections 2 to 14 of this policy are addressed to the{" "}
                <strong>end user</strong> whose activity may generate data
                processed by Advia during ad delivery and measurement — that is,
                the user browsing a publisher's site where Advia serves an ad.
              </p>
              <p>
                <strong>Section 15</strong> covers a different situation:
                visitors to this website itself, <code>advia.tech</code>, where
                Advia acts as a controller in its own right and not in its
                capacity as a TCF vendor.
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
              <strong>1586</strong>.
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
                <li>
                  Set and read the <code>advia_uid</code> cookie, subject to
                  prior user consent signalled in the TC String (Purpose 1), to
                  deduplicate impressions in reach reporting. See section 9.
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-neutral-dark mt-6 mb-2">
                What Advia does NOT do
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Does not access information stored on the user's device
                  through any mechanism other than the <code>advia_uid</code>{" "}
                  cookie described in section 9: it does not use localStorage,
                  IndexedDB or mobile ad IDs.
                </li>
                <li>
                  Does not build audiences or user profiles. The{" "}
                  <code>advia_uid</code> identifier is used solely to
                  deduplicate impressions so that campaign reach (unique users)
                  can be reported; it is not used for profiling,
                  personalisation, ad selection or cross-site tracking.
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
                  <tr className="border-b border-neutral-DEFAULT/10">
                    <td className="py-3 pr-4">
                      Persistent pseudonymous identifier (<code>advia_uid</code>
                      )
                    </td>
                    <td className="py-3">
                      Random value stored in a first-party cookie on{" "}
                      <code>*.advia.tech</code> with a 1-year lifetime,
                      refreshed on each use. Only set and read subject to prior
                      consent (Purpose 1). Its sole purpose is to deduplicate
                      impressions so that unique-user and reach metrics can be
                      reported to the advertiser under Purpose 7. It is not
                      joined with other sources and does not allow identifying
                      the user outside Advia's domain.
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
                  Purpose 1 – Store and/or access information on a device
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Legal basis:</strong> Consent (Art. 6(1)(a) GDPR),
                    collected by the publisher's CMP and signalled in the TC
                    String. As this involves storage on the user's terminal
                    equipment, Art. 22.2 of Spanish Law 34/2002 (LSSI-CE) and
                    Art. 5(3) of Directive 2002/58/EC (ePrivacy) also apply.
                  </li>
                  <li>
                    <strong>Description:</strong> Set and read the{" "}
                    <code>advia_uid</code> cookie — a random pseudonymous
                    identifier — for the sole purpose of deduplicating
                    impressions so that unique users and reach can be reported
                    under Purpose 7.
                  </li>
                  <li>
                    <strong>No consent, no cookie:</strong> if the TC String
                    does not signal consent for Purpose 1 and for Advia as a
                    vendor, the cookie is neither set nor read, and measurement
                    runs without deduplication.
                  </li>
                  <li>
                    <strong>Retention:</strong> the cookie has a 1-year lifetime
                    on the device, refreshed on each use. The associated event
                    data is kept for 90 days server-side.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  Purpose 7 – Measure advertising performance
                </h3>
                <ul className="space-y-1 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
                  <li>
                    <strong>Legal basis:</strong> Legitimate interest (Art.
                    6(1)(f) GDPR) by default. The TCF classifies this purpose as{" "}
                    <em>flexible</em> for Advia, so the publisher may require
                    consent (Art. 6(1)(a) GDPR) instead; in that case Advia
                    applies the legal basis indicated by the TC String.
                  </li>
                  <li>
                    <strong>Description:</strong> Log creative lifecycle events
                    to report aggregated campaign performance to advertisers.
                    Where consent for Purpose 1 exists, the{" "}
                    <code>advia_uid</code> identifier additionally allows
                    reporting the unique-user and reach dimension without
                    counting the same browser twice.
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
                  Advia <strong>does not declare</strong> Purposes 2, 3, 4, 5,
                  6, 8, 9, 10 and 11, as it does not carry out any of the
                  processing activities covered by those purposes (ad
                  selection, profiling, content personalisation, editorial
                  content measurement, audience insights, product development
                  or content selection).
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
                <strong>advia_uid cookie (Purpose 1):</strong> 1-year lifetime
                on the user's device, refreshed on each use. The two periods are
                distinct: the cookie persists in the browser for up to 1 year,
                while the event records it deduplicates are deleted after 90
                days. The user may withdraw consent or delete the cookie at any
                time.
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
                Advia uses <strong>a single first-party cookie</strong>. It is
                the only device storage mechanism Advia employs: it does not use
                localStorage, IndexedDB, mobile ad IDs or any other client-side
                storage mechanism.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-neutral-DEFAULT/80 leading-relaxed border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-DEFAULT/20">
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Identifier
                      </th>
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Type
                      </th>
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Domain
                      </th>
                      <th className="py-2 pr-4 font-semibold text-neutral-dark">
                        Lifetime
                      </th>
                      <th className="py-2 font-semibold text-neutral-dark">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    <tr>
                      <td className="py-3 pr-4">
                        <code>advia_uid</code>
                      </td>
                      <td className="py-3 pr-4">Cookie</td>
                      <td className="py-3 pr-4">
                        <code>*.advia.tech</code>
                      </td>
                      <td className="py-3 pr-4">
                        1 year (31,536,000 s), refreshed on each use
                      </td>
                      <td className="py-3">
                        Purposes 1 and 7 — deduplicate impressions to report
                        unique users and campaign reach.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                This disclosure is also published in machine-readable form, as
                required by the TCF Specifications, at{" "}
                <a
                  href="https://advia.tech/.well-known/tcf/vendor-storage-disclosure.json"
                  className="text-primary-light hover:text-primary-dark transition-colors break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  advia.tech/.well-known/tcf/vendor-storage-disclosure.json
                </a>
                , the URL Advia has registered in the Global Vendor List.
              </p>
              <p>
                The <code>journeyId</code> is not device storage: it is
                generated ephemerally within the creative's iframe, does not
                persist between executions and is never written to the browser.
              </p>
              <p>
                As it involves storing and accessing information on the user's
                terminal equipment, this cookie falls within the scope of{" "}
                <strong>
                  Art. 22.2 of Spanish Law 34/2002 on Information Society
                  Services (LSSI-CE)
                </strong>{" "}
                and{" "}
                <strong>Art. 5(3) of Directive 2002/58/EC (ePrivacy)</strong>.
                Advia requires <strong>prior user consent</strong>, collected by
                the publisher's CMP and signalled in the TC String, before
                setting or reading it. Without consent, the cookie is neither
                set nor read. The user may withdraw consent at any time through
                the same CMP.
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
              Assessment (LIA) outcome for each. Purpose 1 (storing and
              accessing information on a device) is outside the scope of this
              section: it relies on <strong>consent</strong>, not legitimate
              interest — see section 5.
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
                    fingerprinting, no joining with external sources). The
                    journeyId is ephemeral and regenerated per impression. User
                    Agent is only logged when the CMP allows it. Retention is
                    limited to 90 days. The only persistent identifier is{" "}
                    <code>advia_uid</code>: a pseudonymous, random value
                    confined to Advia's own domain, requiring prior consent
                    (Purpose 1), never joined with other sources and used
                    exclusively to avoid counting the same browser twice in
                    reach figures — not to profile, personalise or track the
                    user across sites. If the user does not consent, measurement
                    still works without it. The processing is consistent with
                    the
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
                    seen by network transport at CDN level). Creative delivery
                    does not depend on the <code>advia_uid</code> cookie or on
                    any other identifier: it works the same with or without
                    consent, and device storage rests on its own legal basis
                    (consent, Purpose 1 — see section 5). No data is
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

          {/* 15. advia.tech website visitors */}
          <section
            id="website-visitors"
            className="space-y-4 animate-fadeIn scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-neutral-dark">
              15. Visitors to this website (advia.tech)
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                This section applies only to people browsing{" "}
                <code>advia.tech</code>, Advia's corporate website. Here Advia is
                a controller in its own right; nothing described in this section
                forms part of its activity as TCF vendor 1586, nor is it
                declared in the framework.
              </p>

              <h3 className="text-xl font-semibold text-neutral-dark mt-6 mb-2">
                Website traffic measurement
              </h3>
              <p>
                On each page request, the advia.tech server sends a measurement
                call to <code>events.advia.tech</code>. This call is made{" "}
                <strong>server to server, not from your browser</strong>, and
                transmits only two pieces of data:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Your browser's <strong>User Agent</strong> (browser type,
                  version and operating system).
                </li>
                <li>
                  The <strong>URL of the requested page</strong> within
                  advia.tech.
                </li>
              </ul>
              <p>
                <strong>Your IP address is not transmitted.</strong> As the call
                originates on the server and not in your browser,{" "}
                <code>events.advia.tech</code> receives the hosting
                infrastructure's egress IP, not yours.
              </p>
              <p>
                <strong>Purpose:</strong> to understand the volume and
                distribution of corporate site traffic (most visited pages,
                browser and device breakdown) in order to maintain and improve
                it.
              </p>
              <p>
                <strong>Legal basis:</strong> legitimate interest (Art. 6(1)(f)
                GDPR). The interest pursued is understanding the use of our own
                corporate site. The processing is minimal — two fields, no IP,
                no user identifier and no ability to reconstruct a session or
                recognise a returning visitor — so the data subject's rights and
                freedoms do not override it.
              </p>
              <p>
                <strong>No storage on your device:</strong> this measurement
                neither writes nor reads cookies, localStorage or any other data
                on your equipment, so it falls outside the scope of Art. 22.2 of
                Spanish Law 34/2002 (LSSI-CE) and Art. 5(3) of Directive
                2002/58/EC (ePrivacy). The cookies this website does use are
                described in the{" "}
                <a
                  href="/cookies-policy"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  Cookies Policy
                </a>
                , and are managed through the consent banner.
              </p>
              <p>
                <strong>Retention:</strong> 90 days raw. After that period the
                records are deleted and only aggregated site metrics without
                personal data are kept.
              </p>
              <p>
                <strong>Your rights:</strong> those described in section 10,
                including the right to object under Art. 21 GDPR, which you may
                exercise at any time by writing to{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
