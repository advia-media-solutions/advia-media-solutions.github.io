/**
 * Política de Privacidad, en español y en inglés.
 *
 * El texto es el mismo que ya estaba publicado, palabra por palabra: esta
 * migración es de estilo. Vive en markdown porque es un documento —párrafos,
 * epígrafes numerados y tablas—, y así se revisa y se actualiza sin tocar JSX.
 * Lo pinta .v4-prosa, el mismo tratamiento de cuerpo largo que el blog.
 */

export const ES = `**Responsable del tratamiento:** ADVIA MEDIA SOLUTIONS, S.L.

**NIF:** B19456417

**Domicilio social:** Calle Naciones, 10 – Local, 28006, Madrid (España)

**Actividad:** Servicios de publicidad, relaciones públicas y similares (CNAE 7311)

**Contacto para privacidad y ejercicio de derechos:** [privacy@advia.tech](mailto:privacy@advia.tech)

**Última actualización:** 2026-07-31 · **Versión:** 2.1

## 1. Introducción

Esta Política de Privacidad describe cómo ADVIA MEDIA SOLUTIONS, S.L. ("Advia", "nosotros") trata datos personales en el marco de su servicio de ad server publicitario, cuando los navegadores de usuarios finales interactúan con las creatividades publicitarias que Advia aloja y entrega.

Advia actúa como **intermediario técnico** entre DSPs (Demand-Side Platforms) y publishers adheridos al **IAB Europe Transparency & Consent Framework (TCF)**. Advia no mantiene relación directa con el usuario final: el punto de contacto con el usuario para la transparencia y la gestión de consentimiento es el **CMP del publisher** donde se sirve el anuncio.

Las secciones 2 a 14 de esta política están dirigidas al **usuario final** cuya actividad puede generar datos procesados por Advia durante la entrega y medición de anuncios, es decir, al usuario que navega por el sitio de un publisher donde Advia sirve un anuncio.

La **sección 15** cubre un supuesto distinto: los visitantes de este mismo sitio web, \`advia.tech\`, donde Advia actúa como responsable del tratamiento por derecho propio y no en su calidad de vendor del TCF.

## 2. Participación en el IAB Europe TCF

ADVIA MEDIA SOLUTIONS, S.L. participa en el IAB Europe Transparency & Consent Framework y cumple con sus Especificaciones y Políticas. El número de identificación de ADVIA MEDIA SOLUTIONS, S.L. dentro del framework es **1586**.

Con independencia del TCF, Advia ofrece un mecanismo de exclusión propio en [advia.tech/opt-out](/opt-out). No es un CMP y no modifica su TC String: es un canal adicional y directo, descrito en detalle en esa página.

## 3. Qué hace el ad server de Advia

Advia genera ad tags (VAST/JavaScript) que apuntan a creatividades alojadas en su infraestructura. Cuando un DSP gana una subasta publicitaria, el navegador del usuario ejecuta el script del ad tag correspondiente, que carga el creativo desde los servidores de Advia.

Durante la entrega y ejecución del creativo, Advia puede:

- Recibir y responder a solicitudes técnicas (ad requests).

- Entregar los ficheros del creativo al navegador del usuario.

- Parsear la TC String proporcionada por el CMP del publisher para verificar la base legal aplicable a cada tratamiento.

- Propagar la TC String íntegra y sin modificación a píxeles de terceros que la creatividad active (verificadores tipo Adloox, DoubleVerify, IAS, Moat, y ad servers de retargeting).

- Registrar eventos del ciclo de vida de la creatividad (impresión, click, viewable, reproducción de vídeo y similares) para reportar el rendimiento de la campaña al anunciante.

- Establecer y leer la cookie \`advia_uid\`, previo consentimiento del usuario señalizado en la TC String (Purpose 1), para deduplicar impresiones en el reporting de alcance. Ver la sección 9.

### Qué NO hace Advia

- No accede a información almacenada en el dispositivo del usuario por mecanismos distintos de la cookie \`advia_uid\` descrita en la sección 9: no utiliza localStorage, IndexedDB ni mobile ad IDs.

- No crea audiencias ni perfiles de usuario. El identificador \`advia_uid\` se emplea únicamente para deduplicar impresiones y poder reportar el alcance de la campaña (usuarios únicos); no se utiliza para perfilar, personalizar, seleccionar anuncios ni realizar seguimiento entre sitios.

- No utiliza perfiles para seleccionar qué anuncio servir (la decisión la toma el DSP aguas arriba).

- No realiza fingerprinting activo de características del dispositivo.

- No procesa geolocalización precisa (latitud/longitud con más de dos decimales o radio inferior a 500 m).

- No cruza datos con fuentes externas (offline, CRM, loyalty, etc.).

- No enlaza dispositivos del mismo usuario (cross-device mapping).

- No procesa identificadores de autenticación (emails, teléfonos, hashes derivados).

## 4. Categorías de datos tratados

| Categoría | Tratamiento |
| --- | --- |
| Dirección IP | **No IP:** Advia no procesa la dirección IP del usuario. El ad tag se carga cuando el navegador llama al CDN y Advia solo responde sirviendo los ficheros del creativo; la IP la ve el transporte de red a nivel de CDN pero no se procesa ni se almacena como dato de negocio. |
| User Agent | Registrado solo cuando el consent check TCF es favorable, para permitir el desglose por dispositivo/navegador en el reporting de rendimiento al anunciante. |
| URL/referer | URL de la página donde se sirve el anuncio (contexto). |
| Interacciones con el anuncio | Eventos de impresión, click, viewable, reproducción de vídeo y similares. |
| TC String (señal de privacidad del CMP) | Parseada en memoria para verificar la base legal aplicable y propagada íntegra a terceros. No se persiste. |
| Identificador pseudónimo persistente (\`advia_uid\`) | Valor aleatorio almacenado en una cookie propia en \`*.advia.tech\` con una duración de 1 año, refrescada en cada uso. Solo se establece y se lee previo consentimiento (Purpose 1). Su única finalidad es deduplicar impresiones para poder reportar al anunciante métricas de usuarios únicos y alcance dentro del Purpose 7. No se cruza con otras fuentes ni permite identificar al usuario fuera del dominio de Advia. |
| Identificadores internos efímeros | Se genera un \`journeyId\` por impresión, dentro del iframe del creativo, para correlacionar eventos de una misma impresión. No persiste entre ejecuciones, no es un identificador de dispositivo y no permite re-identificar al usuario. |

## 5. Finalidades y base legal

Advia declara las siguientes finalidades dentro del TCF, con la base legal correspondiente conforme al Art. 6 del Reglamento General de Protección de Datos (RGPD):

### Purpose 1 – Almacenar o acceder a información en un dispositivo

- **Base legal:** Consentimiento (Art. 6.1.a RGPD), recabado por el CMP del publisher y señalizado en la TC String. Al tratarse de almacenamiento en el equipo terminal del usuario, aplica además el Art. 22.2 de la Ley 34/2002 (LSSI-CE) y el Art. 5(3) de la Directiva 2002/58/CE (ePrivacy).

- **Descripción:** Establecer y leer la cookie \`advia_uid\` — un identificador pseudónimo aleatorio — con la única finalidad de deduplicar impresiones y poder reportar usuarios únicos y alcance dentro del Purpose 7.

- **Sin consentimiento no hay cookie:** si la TC String no señaliza consentimiento para el Purpose 1 y para Advia como vendor, la cookie no se establece ni se lee, y la medición se realiza sin deduplicación.

- **Retención:** la cookie tiene una duración de 1 año en el dispositivo, refrescada en cada uso. Los datos de evento asociados se conservan 90 días en servidor.

- **Retirada del consentimiento:** además del CMP del publisher, puede excluirse de forma directa e inmediata en [advia.tech/opt-out](/opt-out).

### Purpose 7 – Medir el rendimiento de la publicidad

- **Base legal:** Interés legítimo (Art. 6.1.f RGPD) por defecto. El TCF clasifica este propósito como *flexible* para Advia, por lo que el publisher puede exigir consentimiento (Art. 6.1.a RGPD) en su lugar; en ese caso Advia aplica la base legal que indique la TC String.

- **Descripción:** Registrar eventos del ciclo de vida de la creatividad para reportar a los anunciantes el rendimiento agregado de sus campañas. Cuando existe consentimiento para el Purpose 1, el identificador \`advia_uid\` permite además reportar la dimensión de usuarios únicos y alcance sin contar dos veces el mismo navegador.

- **Retención:** 90 días (datos en bruto). Transcurrido este plazo, los datos en bruto se eliminan; únicamente se conservan métricas agregadas por campaña sin datos personales.

### Special Purpose 2 – Entregar y presentar publicidad y contenido

- **Base legal:** Interés legítimo (Art. 6.1.f RGPD). El TCF clasifica este tratamiento como Special Purpose sin derecho de oposición vía el framework, por ser indispensable para la entrega técnica del contenido.

- **Descripción:** Recibir y responder a ad requests, entregar los ficheros del creativo al navegador, y responder a la interacción del usuario con el anuncio.

- **Retención:** 90 días (alineado con Purpose 7; la IP no se almacena).

### Special Purpose 3 – Guardar y comunicar las elecciones de privacidad

- **Base legal:** Interés legítimo (Art. 6.1.f RGPD). El TCF clasifica este tratamiento como Special Purpose sin derecho de oposición vía el framework, ya que su finalidad es precisamente respetar las elecciones de privacidad del usuario.

- **Descripción:** Verificar y propagar las señales TCF (TC String) para que el ecosistema publicitario aplique correctamente las elecciones de privacidad del usuario.

- **Retención:** 0 días (la TC String se procesa en memoria y se descarta tras la propagación).

### Resto de Purposes del TCF

Advia **no declara** los Purposes 2, 3, 4, 5, 6, 8, 9, 10 y 11, al no realizar ninguno de los tratamientos cubiertos por esos propósitos (selección de anuncios, perfilado, personalización de contenido, mediciones de contenido editorial, audience insights, desarrollo de productos o selección de contenido).

## 6. Destinatarios de los datos

Advia no vende ni cede datos personales a terceros. Durante la ejecución del creativo, Advia propaga la **TC String íntegra y sin modificación** a píxeles de terceros que la creatividad haya activado (verificadores de visibilidad y calidad como Adloox, DoubleVerify, IAS, Moat, y ad servers de retargeting que el anunciante haya integrado), para que cada uno de ellos pueda aplicar sus propias reglas de cumplimiento conforme a la señal de privacidad del usuario.

Cada uno de esos terceros actúa como responsable del tratamiento independiente respecto a los datos que procesa.

## 7. Transferencias internacionales

Advia procesa los datos en infraestructura alojada dentro del Espacio Económico Europeo. Si alguno de los píxeles de terceros que la creatividad active realiza transferencias internacionales, cada uno de esos terceros es responsable de declarar y cumplir con las garantías aplicables (Art. 44 y ss. RGPD).

## 8. Plazos de conservación

- **Eventos de rendimiento (Purpose 7, SP2):** 90 días en bruto, tras los cuales se eliminan; solo se conservan métricas agregadas por campaña sin datos personales ni identificadores asociados al usuario.

- **Cookie advia_uid (Purpose 1):** 1 año de duración en el dispositivo del usuario, refrescada en cada uso. Conviene distinguir los dos plazos: la cookie persiste en el navegador hasta 1 año, mientras que los registros de evento que ese identificador permite deduplicar se eliminan a los 90 días. El usuario puede retirar el consentimiento o borrar la cookie en cualquier momento desde [advia.tech/opt-out](/opt-out) o a través del CMP del publisher.

- **TC String (SP3):** no se persiste — se procesa en memoria y se descarta tras la propagación.

- **Dirección IP:** no se procesa como dato de negocio. La IP la ve el transporte de red a nivel de CDN pero Advia no la procesa ni la almacena.

## 9. Cookies y almacenamiento en el dispositivo del usuario

En el contexto del ad server, Advia utiliza **dos cookies propias**: un identificador sujeto a consentimiento (\`advia_uid\`) y un registro de exclusión estrictamente necesario (\`advia_optout\`). Son el único mecanismo de almacenamiento en el dispositivo que emplea el ad server: no utiliza localStorage, IndexedDB, mobile ad IDs ni ningún otro mecanismo de almacenamiento cliente.

El sitio web corporativo advia.tech es un contexto distinto y sí utiliza almacenamiento cliente para recordar sus preferencias de cookies; se describe en la [Política de Cookies](/cookies-policy) y en la sección 15.

| Identificador | Tipo | Dominio | Duración | Finalidad |
| --- | --- | --- | --- | --- |
| \`advia_uid\` | Cookie | \`*.advia.tech\` | 1 año (31.536.000 s), refrescada en cada uso | Purposes 1 y 7 — deduplicar impresiones para reportar usuarios únicos y alcance de la campaña. |
| \`advia_optout\` | Cookie | \`*.advia.tech\` | 1 año (31.536.000 s), refrescada mientras siga excluido | Registrar que este navegador se ha excluido. Su contenido íntegro es el valor \`1\`: no contiene ningún identificador. Cookie técnica, exenta de consentimiento conforme al Art. 22.2 LSSI-CE y al Art. 5(3) ePrivacy. Se establece únicamente si el usuario la solicita en [advia.tech/opt-out](/opt-out). |

Esta declaración se publica también en formato legible por máquina, conforme a las Especificaciones del TCF, en [advia.tech/.well-known/tcf/vendor-storage-disclosure.json](https://advia.tech/.well-known/tcf/vendor-storage-disclosure.json), la URL registrada por Advia en la Global Vendor List.

El \`journeyId\` no es almacenamiento en el dispositivo: se genera efímeramente dentro del iframe del creativo, no persiste entre ejecuciones y no se escribe en el navegador.

Al tratarse de almacenamiento y acceso a información en el equipo terminal del usuario, esta cookie está sujeta al **Art. 22.2 de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)** y al **Art. 5(3) de la Directiva 2002/58/CE (ePrivacy)**. Advia requiere **consentimiento previo del usuario**, recabado por el CMP del publisher y señalizado en la TC String, antes de establecerla o leerla. Si no hay consentimiento, la cookie no se establece ni se lee. El usuario puede retirar el consentimiento en cualquier momento a través del mismo CMP o, de forma directa, en [advia.tech/opt-out](/opt-out).

## 10. Derechos del usuario

Conforme al RGPD y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), el usuario tiene los siguientes derechos respecto a sus datos personales:

- Acceso (Art. 15 RGPD)

- Rectificación (Art. 16 RGPD)

- Supresión ("derecho al olvido", Art. 17 RGPD)

- Limitación del tratamiento (Art. 18 RGPD)

- Portabilidad (Art. 20 RGPD)

- **Oposición (Art. 21 RGPD)** — incluyendo, cuando el tratamiento se basa en interés legítimo, el derecho a oponerse en cualquier momento.

- Retirar el consentimiento en cualquier momento, cuando el tratamiento se base en consentimiento.

**Canal de ejercicio:** puede ejercer estos derechos enviando un correo electrónico a [privacy@advia.tech](mailto:privacy@advia.tech), identificándose debidamente.

**Exclusión inmediata y sin identificación:** puede oponerse al registro de sus eventos publicitarios, y retirar el consentimiento para la cookie \`advia_uid\`, en [advia.tech/opt-out](/opt-out). Es un mecanismo de autoservicio, gratuito, de efecto inmediato y que no requiere que nos facilite ningún dato. La misma página permite revertir la exclusión.

**Gestión granular vía CMP:** para los tratamientos bajo el TCF, la forma más directa de gestionar sus elecciones (consentimiento u oposición por Vendor y por Purpose) es mediante el **CMP (Consent Management Platform) del publisher** donde se sirve el anuncio.

**Reclamación ante la autoridad de control:** si considera que el tratamiento de sus datos no es conforme a la normativa, puede presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** — C/ Jorge Juan, 6, 28001 Madrid — [www.aepd.es](https://www.aepd.es).

## 11. Decisiones automatizadas

Advia no toma decisiones automatizadas con efectos jurídicos o significativos sobre el usuario (Art. 22 RGPD). No se realiza perfilado del usuario.

## 12. Menores

Advia no dirige su servicio a menores de edad ni trata intencionadamente datos personales de menores. Si se identificara un tratamiento no intencionado de datos de menores, se procederá a su eliminación conforme a los mecanismos previstos en esta política.

## 13. Modificaciones de la política

Esta política puede actualizarse para reflejar cambios en las prácticas de tratamiento, en el marco legal aplicable o en las obligaciones del TCF. La versión vigente será siempre la publicada en esta URL, con indicación de la fecha de última actualización.

## 14. Interés Legítimo

Esta sección describe los intereses legítimos que Advia persigue al amparo del Art. 6.1.f RGPD para los tratamientos declarados en el TCF, junto con el resumen del resultado del Legitimate Interest Assessment (LIA) realizado para cada uno. El Purpose 1 (almacenamiento y acceso a información en el dispositivo) queda fuera del alcance de esta sección: se basa en **consentimiento**, no en interés legítimo — ver la sección 5.

### 14.1 Purpose 7 – Medir el rendimiento de la publicidad

**Interés legítimo perseguido:** reportar a los anunciantes el rendimiento agregado de sus campañas publicitarias (impresiones, clicks, viewability, reproducciones de vídeo), que constituye la prestación principal del servicio de ad server y condición de competitividad en el mercado.

**Por qué es necesario:** sin esta medición Advia no podría reportar rendimiento a los anunciantes ni ofrecer el desglose por dispositivo/navegador que es estándar en el sector. No existen alternativas menos intrusivas compatibles con esta finalidad: la medición sin User Agent impide el desglose; el muestreo estadístico rompe la facturación por impresión entregada; la agregación 100 % anónima imposibilita distinguir impresiones individuales.

**Por qué no prevalecen los derechos del usuario:** el tratamiento se diseña con minimización por defecto (sin IP almacenada, sin fingerprinting, sin cruce con fuentes externas). El journeyId es efímero y se regenera en cada impresión. El User Agent solo se registra cuando el CMP lo permite. La retención se limita a 90 días. El único identificador persistente es \`advia_uid\`: un valor pseudónimo y aleatorio, limitado al dominio de Advia, que exige consentimiento previo (Purpose 1), no se cruza con otras fuentes y se emplea exclusivamente para evitar contar dos veces el mismo navegador en las cifras de alcance — no para perfilar, personalizar ni seguir al usuario entre sitios. Si el usuario no consiente, la medición sigue funcionando sin él. El tratamiento es consistente con las expectativas razonables de cualquier usuario que navega por un publisher adherido al TCF: toda la publicidad digital se mide para contabilizar el número de anuncios servidos y su rendimiento — es una práctica universal y consolidada en el sector, expresamente descrita en el Purpose 7 del TCF.

**Derecho de oposición:** el usuario puede oponerse a este tratamiento en cualquier momento y de forma inmediata en [advia.tech/opt-out](/opt-out), sin necesidad de identificarse ni de facilitar dato alguno; también vía el CMP del publisher (gestión granular por Vendor y Purpose) o contactando con [privacy@advia.tech](mailto:privacy@advia.tech). La existencia de una vía de exclusión gratuita, de un clic y sin identificación se ha tenido en cuenta en la ponderación anterior: reduce el impacto del tratamiento sobre quien no desea ser medido.

### 14.2 Special Purpose 2 – Entregar y presentar publicidad

**Interés legítimo perseguido:** operar técnicamente el ad server — recibir ad requests, entregar creatividades al navegador del usuario y responder a sus interacciones.

**Por qué es necesario:** sin esta entrega técnica el servicio no existe. Es el tratamiento mínimo y universal que realiza cualquier ad server del ecosistema digital: entregar los ficheros del creativo en respuesta a la llamada del navegador al CDN.

**Por qué no prevalecen los derechos del usuario:** Advia no procesa la IP del usuario como dato de negocio (la IP únicamente la ve el transporte de red a nivel de CDN). La entrega de la creatividad no depende de la cookie \`advia_uid\` ni de ningún otro identificador: se realiza igual con o sin consentimiento, y el almacenamiento en el dispositivo se ampara en su propia base legal (consentimiento, Purpose 1 — ver la sección 5). No se cruzan datos con fuentes externas. El tratamiento es inherente al funcionamiento de internet y consistente con cualquier interacción del navegador con un servidor web. El TCF clasifica este tratamiento como Special Purpose sin derecho de oposición vía el framework, reconociendo su carácter indispensable.

### 14.3 Special Purpose 3 – Guardar y comunicar las elecciones de privacidad

**Interés legítimo perseguido:** verificar y propagar las señales TCF (TC String) a lo largo de la cadena publicitaria para que Advia y el resto del ecosistema respeten las elecciones de privacidad del usuario.

**Por qué es necesario:** sin este procesamiento, Advia no podría verificar su base legal antes de aplicar tratamientos condicionales (p. ej. registro del User Agent bajo Purpose 7) ni garantizar que el resto de vendors del ecosistema reciben la señal de privacidad sin pérdida de información.

**Por qué no prevalecen los derechos del usuario:** el único dato tratado es la propia TC String (que no contiene identificadores del usuario, solo sus preferencias), que se procesa en memoria y se descarta tras la propagación. El tratamiento es directamente favorable al data subject: su finalidad es respetar y propagar sus elecciones de privacidad. El TCF clasifica este tratamiento como Special Purpose sin derecho de oposición vía el framework, ya que no tendría sentido objetar al respeto de las propias preferencias.

### Documentación interna

Los Legitimate Interest Assessments (LIAs) completos con los tres tests obligatorios (Purpose test, Necessity test, Balancing test) se conservan internamente por Advia como registro de accountability conforme al Art. 5.2 y 24 RGPD, y están disponibles para las autoridades de control que así lo requieran.

## 15. Visitantes de este sitio web (advia.tech)

Esta sección se aplica únicamente a quienes navegan por \`advia.tech\`, el sitio corporativo de Advia. Aquí Advia es responsable del tratamiento por derecho propio; nada de lo descrito en esta sección forma parte de su actividad como vendor 1586 del TCF ni se declara en el framework.

### Medición de tráfico del sitio

En cada petición de página, el servidor de advia.tech envía una llamada de medición a \`events.advia.tech\`. Esta llamada se realiza **de servidor a servidor, no desde su navegador**. Los únicos datos que se registran para la medición son dos:

- El **User Agent** de su navegador (tipo de navegador, versión y sistema operativo).

- La **URL de la página solicitada** dentro de advia.tech.

**Dirección IP:** la petición llega a \`events.advia.tech\` acompañada de una dirección IP, como ocurre en cualquier comunicación por internet. Advia **no la trata como dato de negocio**: no interviene en la medición, no se asocia a los registros de tráfico ni se conserva junto a ellos. Es el mismo criterio descrito en las secciones 4 y 8 para el ad server.

**Finalidad:** conocer el volumen y la distribución del tráfico del sitio corporativo (páginas más visitadas, reparto por navegador y dispositivo) para mantenerlo y mejorarlo.

**Base legal:** interés legítimo (Art. 6.1.f RGPD). El interés perseguido es entender el uso del propio sitio corporativo. El tratamiento es mínimo: se registran dos campos, sin identificador de usuario y sin posibilidad de reconstruir una sesión ni de reconocer a un visitante recurrente. La dirección IP, aunque acompaña técnicamente a la petición, no se trata como dato de negocio ni se conserva asociada a la medición. Por ello no prevalecen los derechos y libertades del interesado.

**No implica almacenamiento en su dispositivo:** esta medición no escribe ni lee cookies, localStorage ni ningún otro dato en su equipo, por lo que queda fuera del ámbito del Art. 22.2 de la Ley 34/2002 (LSSI-CE) y del Art. 5(3) de la Directiva 2002/58/CE (ePrivacy). Las cookies que sí utiliza este sitio web se describen en la [Política de Cookies](/cookies-policy), y se gestionan mediante el banner de consentimiento. La excepción es la cookie de exclusión \`advia_optout\`, que solo se establece si usted la solicita en [advia.tech/opt-out](/opt-out) y que, por ser estrictamente necesaria para recordar su negativa, no requiere consentimiento.

**Conservación:** 90 días en bruto. Transcurrido ese plazo los registros se eliminan y solo se conservan métricas agregadas del sitio sin datos personales.

**Sus derechos:** son los descritos en la sección 10, incluido el derecho de oposición del Art. 21 RGPD. Puede ejercerlo de forma inmediata en [advia.tech/opt-out](/opt-out): si su navegador presenta la cookie de exclusión, esta medición no llega a realizarse — la llamada al servicio de medición se suprime por completo, no se envía y no se registra nada. También puede escribir a [privacy@advia.tech](mailto:privacy@advia.tech).`;

export const EN = `**Data controller:** ADVIA MEDIA SOLUTIONS, S.L.

**Tax ID (NIF):** B19456417

**Registered address:** Calle Naciones, 10 – Local, 28006, Madrid (Spain)

**Activity:** Advertising, public relations and similar services (CNAE 7311)

**Privacy contact and rights exercise:** [privacy@advia.tech](mailto:privacy@advia.tech)

**Last update:** 2026-07-31 · **Version:** 2.1

## 1. Introduction

This Privacy Policy describes how ADVIA MEDIA SOLUTIONS, S.L. ("Advia", "we") processes personal data within its advertising ad server service, when end-user browsers interact with the advertising creatives that Advia hosts and serves.

Advia acts as a **technical intermediary** between DSPs (Demand-Side Platforms) and publishers participating in the **IAB Europe Transparency & Consent Framework (TCF)**. Advia does not maintain a direct relationship with the end user: the user-facing point of contact for transparency and consent management is the **publisher's CMP** where the ad is served.

Sections 2 to 14 of this policy are addressed to the **end user** whose activity may generate data processed by Advia during ad delivery and measurement — that is, the user browsing a publisher's site where Advia serves an ad.

**Section 15** covers a different situation: visitors to this website itself, \`advia.tech\`, where Advia acts as a controller in its own right and not in its capacity as a TCF vendor.

## 2. Participation in IAB Europe TCF

ADVIA MEDIA SOLUTIONS, S.L. participates in the IAB Europe Transparency & Consent Framework and complies with its Specifications and Policies. The identification number of ADVIA MEDIA SOLUTIONS, S.L. within the framework is **1586**.

Independently of the TCF, Advia offers its own opt-out mechanism at [advia.tech/opt-out](/opt-out). It is not a CMP and does not alter your TC String: it is an additional, direct channel, described in full on that page.

## 3. What Advia's ad server does

Advia generates ad tags (VAST/JavaScript) pointing to creatives hosted on its infrastructure. When a DSP wins an ad auction, the user's browser executes the corresponding ad tag script, which loads the creative from Advia's servers.

During creative delivery and execution, Advia may:

- Receive and respond to technical requests (ad requests).

- Deliver the creative files to the user's browser.

- Parse the TC String provided by the publisher's CMP to verify the legal basis applicable to each processing activity.

- Propagate the TC String intact and unmodified to third-party pixels activated by the creative (verification vendors such as Adloox, DoubleVerify, IAS, Moat, and retargeting ad servers).

- Log creative lifecycle events (impression, click, viewable, video play and similar) to report campaign performance to the advertiser.

- Set and read the \`advia_uid\` cookie, subject to prior user consent signalled in the TC String (Purpose 1), to deduplicate impressions in reach reporting. See section 9.

### What Advia does NOT do

- Does not access information stored on the user's device through any mechanism other than the \`advia_uid\` cookie described in section 9: it does not use localStorage, IndexedDB or mobile ad IDs.

- Does not build audiences or user profiles. The \`advia_uid\` identifier is used solely to deduplicate impressions so that campaign reach (unique users) can be reported; it is not used for profiling, personalisation, ad selection or cross-site tracking.

- Does not use profiles to decide which ad to serve (the decision is made by the DSP upstream).

- Does not perform active device fingerprinting.

- Does not process precise geolocation (latitude/longitude with more than two decimals or radius below 500 m).

- Does not cross-reference data with external sources (offline, CRM, loyalty, etc.).

- Does not link devices of the same user (cross-device mapping).

- Does not process authentication identifiers (emails, phone numbers, derived hashes).

## 4. Categories of data processed

| Category | Processing |
| --- | --- |
| IP address | **No IP:** Advia does not process the user's IP address. The ad tag loads when the browser calls the CDN and Advia only responds by serving the creative files; the IP is seen by the network transport at CDN level but is not processed or stored as business data. |
| User Agent | Logged only when the TCF consent check is favourable, to enable device/browser breakdown in performance reporting to the advertiser. |
| URL/referer | URL of the page where the ad is served (context). |
| Ad interactions | Impression, click, viewable, video play and similar events. |
| TC String (CMP privacy signal) | Parsed in memory to verify the applicable legal basis and propagated intact to third parties. Not persisted. |
| Persistent pseudonymous identifier (\`advia_uid\`) | Random value stored in a first-party cookie on \`*.advia.tech\` with a 1-year lifetime, refreshed on each use. Only set and read subject to prior consent (Purpose 1). Its sole purpose is to deduplicate impressions so that unique-user and reach metrics can be reported to the advertiser under Purpose 7. It is not joined with other sources and does not allow identifying the user outside Advia's domain. |
| Ephemeral internal identifiers | A \`journeyId\` is generated per impression, inside the creative's iframe, to correlate events from the same impression. Does not persist between executions, is not a device identifier and does not allow re-identifying the user. |

## 5. Purposes and legal basis

Advia declares the following purposes within the TCF, with the corresponding legal basis under Art. 6 of the General Data Protection Regulation (GDPR):

### Purpose 1 – Store and/or access information on a device

- **Legal basis:** Consent (Art. 6(1)(a) GDPR), collected by the publisher's CMP and signalled in the TC String. As this involves storage on the user's terminal equipment, Art. 22.2 of Spanish Law 34/2002 (LSSI-CE) and Art. 5(3) of Directive 2002/58/EC (ePrivacy) also apply.

- **Description:** Set and read the \`advia_uid\` cookie — a random pseudonymous identifier — for the sole purpose of deduplicating impressions so that unique users and reach can be reported under Purpose 7.

- **No consent, no cookie:** if the TC String does not signal consent for Purpose 1 and for Advia as a vendor, the cookie is neither set nor read, and measurement runs without deduplication.

- **Retention:** the cookie has a 1-year lifetime on the device, refreshed on each use. The associated event data is kept for 90 days server-side.

- **Withdrawing consent:** besides the publisher's CMP, you can opt out directly and immediately at [advia.tech/opt-out](/opt-out).

### Purpose 7 – Measure advertising performance

- **Legal basis:** Legitimate interest (Art. 6(1)(f) GDPR) by default. The TCF classifies this purpose as *flexible* for Advia, so the publisher may require consent (Art. 6(1)(a) GDPR) instead; in that case Advia applies the legal basis indicated by the TC String.

- **Description:** Log creative lifecycle events to report aggregated campaign performance to advertisers. Where consent for Purpose 1 exists, the \`advia_uid\` identifier additionally allows reporting the unique-user and reach dimension without counting the same browser twice.

- **Retention:** 90 days (raw data). After this period, raw data is deleted; only aggregated per-campaign metrics without personal data are kept.

### Special Purpose 2 – Deliver and present advertising and content

- **Legal basis:** Legitimate interest (Art. 6(1)(f) GDPR). The TCF classifies this as a Special Purpose with no right to object via the framework, as it is indispensable for the technical delivery of content.

- **Description:** Receive and respond to ad requests, deliver creative files to the browser, and respond to user interaction with the ad.

- **Retention:** 90 days (aligned with Purpose 7; IP is not stored).

### Special Purpose 3 – Save and communicate privacy choices

- **Legal basis:** Legitimate interest (Art. 6(1)(f) GDPR). The TCF classifies this as a Special Purpose with no right to object via the framework, since its purpose is precisely to respect the user's privacy choices.

- **Description:** Verify and propagate TCF signals (TC String) so that the advertising ecosystem correctly applies the user's privacy choices.

- **Retention:** 0 days (the TC String is processed in memory and discarded after propagation).

### Remaining TCF Purposes

Advia **does not declare** Purposes 2, 3, 4, 5, 6, 8, 9, 10 and 11, as it does not carry out any of the processing activities covered by those purposes (ad selection, profiling, content personalisation, editorial content measurement, audience insights, product development or content selection).

## 6. Data recipients

Advia does not sell or disclose personal data to third parties. During creative execution, Advia propagates the **TC String intact and unmodified** to third-party pixels activated by the creative (viewability and quality verification vendors such as Adloox, DoubleVerify, IAS, Moat, and retargeting ad servers integrated by the advertiser), so that each of them can apply their own compliance rules based on the user's privacy signal.

Each of those third parties acts as an independent data controller with respect to the data it processes.

## 7. International transfers

Advia processes data on infrastructure located within the European Economic Area. If any of the third-party pixels activated by the creative performs international transfers, each of those third parties is responsible for declaring and complying with the applicable safeguards (Art. 44 et seq. GDPR).

## 8. Retention periods

- **Performance events (Purpose 7, SP2):** 90 days raw, then deleted; only aggregated per-campaign metrics without personal data or user-linked identifiers are kept.

- **advia_uid cookie (Purpose 1):** 1-year lifetime on the user's device, refreshed on each use. The two periods are distinct: the cookie persists in the browser for up to 1 year, while the event records it deduplicates are deleted after 90 days. The user may withdraw consent or delete the cookie at any time at [advia.tech/opt-out](/opt-out) or through the publisher's CMP.

- **TC String (SP3):** not persisted — processed in memory and discarded after propagation.

- **IP address:** not processed as business data. The IP is seen by network transport at CDN level but Advia does not process or store it.

## 9. Cookies and storage on the user's device

In the ad server context, Advia uses **two first-party cookies**: a consent-gated identifier (\`advia_uid\`) and a strictly necessary opt-out record (\`advia_optout\`). They are the only device storage mechanism the ad server employs: it does not use localStorage, IndexedDB, mobile ad IDs or any other client-side storage mechanism.

The corporate website advia.tech is a separate context and does use client-side storage to remember your cookie preferences; this is described in the [Cookies Policy](/cookies-policy) and in section 15.

| Identifier | Type | Domain | Lifetime | Purpose |
| --- | --- | --- | --- | --- |
| \`advia_uid\` | Cookie | \`*.advia.tech\` | 1 year (31,536,000 s), refreshed on each use | Purposes 1 and 7 — deduplicate impressions to report unique users and campaign reach. |
| \`advia_optout\` | Cookie | \`*.advia.tech\` | 1 year (31,536,000 s), refreshed while you remain opted out | Record that this browser has opted out. Its entire contents are the value \`1\`: it carries no identifier. A technical cookie, exempt from consent under Art. 22.2 LSSI-CE and Art. 5(3) ePrivacy. It is only set if the user requests it at [advia.tech/opt-out](/opt-out). |

This disclosure is also published in machine-readable form, as required by the TCF Specifications, at [advia.tech/.well-known/tcf/vendor-storage-disclosure.json](https://advia.tech/.well-known/tcf/vendor-storage-disclosure.json), the URL Advia has registered in the Global Vendor List.

The \`journeyId\` is not device storage: it is generated ephemerally within the creative's iframe, does not persist between executions and is never written to the browser.

As it involves storing and accessing information on the user's terminal equipment, this cookie falls within the scope of **Art. 22.2 of Spanish Law 34/2002 on Information Society Services (LSSI-CE)** and **Art. 5(3) of Directive 2002/58/EC (ePrivacy)**. Advia requires **prior user consent**, collected by the publisher's CMP and signalled in the TC String, before setting or reading it. Without consent, the cookie is neither set nor read. The user may withdraw consent at any time through the same CMP or, directly, at [advia.tech/opt-out](/opt-out).

## 10. User rights

Under the GDPR and Spanish Organic Law 3/2018 on Personal Data Protection and guarantee of digital rights (LOPDGDD), the user has the following rights regarding their personal data:

- Access (Art. 15 GDPR)

- Rectification (Art. 16 GDPR)

- Erasure ("right to be forgotten", Art. 17 GDPR)

- Restriction of processing (Art. 18 GDPR)

- Data portability (Art. 20 GDPR)

- **Objection (Art. 21 GDPR)** — including, where processing is based on legitimate interest, the right to object at any time.

- Withdraw consent at any time, where processing is based on consent.

**Exercise channel:** users may exercise these rights by sending an email to [privacy@advia.tech](mailto:privacy@advia.tech), duly identifying themselves.

**Immediate opt-out, no identification required:** you can object to your ad events being recorded, and withdraw consent for the \`advia_uid\` cookie, at [advia.tech/opt-out](/opt-out). It is a self-service mechanism: free, effective immediately, and requiring no personal details from you. The same page lets you reverse the choice.

**Granular management via CMP:** for TCF-based processing, the most direct way to manage your choices (consent or objection per Vendor and per Purpose) is via the **publisher's CMP (Consent Management Platform)** where the ad is served.

**Complaint to the supervisory authority:** if you consider that the processing of your data does not comply with regulations, you may lodge a complaint with the **Spanish Data Protection Agency (AEPD)** — C/ Jorge Juan, 6, 28001 Madrid — [www.aepd.es](https://www.aepd.es).

## 11. Automated decision-making

Advia does not make automated decisions with legal or significant effects on the user (Art. 22 GDPR). No user profiling is carried out.

## 12. Minors

Advia does not direct its service to minors nor intentionally process personal data of minors. If unintentional processing of minors' data were identified, it would be deleted in accordance with the mechanisms set out in this policy.

## 13. Policy modifications

This policy may be updated to reflect changes in processing practices, in the applicable legal framework or in TCF obligations. The current version will always be the one published at this URL, with the date of the last update indicated.

## 14. Legitimate Interest

This section describes the legitimate interests that Advia pursues under Art. 6(1)(f) GDPR for the processing activities declared in the TCF, along with the summary of the Legitimate Interest Assessment (LIA) outcome for each. Purpose 1 (storing and accessing information on a device) is outside the scope of this section: it relies on **consent**, not legitimate interest — see section 5.

### 14.1 Purpose 7 – Measure advertising performance

**Legitimate interest pursued:** report aggregated campaign performance (impressions, clicks, viewability, video plays) to advertisers, which constitutes the main service provided by the ad server and a condition of competitiveness in the market.

**Why it is necessary:** without this measurement Advia could not report performance to advertisers nor offer the device/browser breakdown that is standard in the industry. There are no less intrusive alternatives compatible with this purpose: measurement without User Agent prevents breakdown; statistical sampling breaks per-impression billing; 100% anonymous aggregation makes it impossible to distinguish individual impressions.

**Why user rights do not prevail:** processing is designed with minimisation by default (no IP stored, no fingerprinting, no joining with external sources). The journeyId is ephemeral and regenerated per impression. User Agent is only logged when the CMP allows it. Retention is limited to 90 days. The only persistent identifier is \`advia_uid\`: a pseudonymous, random value confined to Advia's own domain, requiring prior consent (Purpose 1), never joined with other sources and used exclusively to avoid counting the same browser twice in reach figures — not to profile, personalise or track the user across sites. If the user does not consent, measurement still works without it. The processing is consistent with the reasonable expectations of any user browsing a TCF-participating publisher: all digital advertising is measured to count the number of ads served and their performance — a universal and consolidated industry practice, expressly described in TCF Purpose 7.

**Right to object:** the user may object to this processing at any time and with immediate effect at [advia.tech/opt-out](/opt-out), without identifying themselves or providing any data; also via the publisher's CMP (granular management per Vendor and Purpose), or by contacting [privacy@advia.tech](mailto:privacy@advia.tech). The availability of a free, one-click, no-identification opt-out has been taken into account in the balancing test above: it reduces the impact of the processing on anyone who does not wish to be measured.

### 14.2 Special Purpose 2 – Deliver and present advertising

**Legitimate interest pursued:** technically operate the ad server — receive ad requests, deliver creatives to the user's browser and respond to their interactions.

**Why it is necessary:** without this technical delivery the service does not exist. It is the minimum and universal processing performed by any ad server in the digital ecosystem: serving the creative files in response to the browser's call to the CDN.

**Why user rights do not prevail:** Advia does not process the user's IP as business data (the IP is only seen by network transport at CDN level). Creative delivery does not depend on the \`advia_uid\` cookie or on any other identifier: it works the same with or without consent, and device storage rests on its own legal basis (consent, Purpose 1 — see section 5). No data is cross-referenced with external sources. The processing is inherent to the operation of the internet and consistent with any browser interaction with a web server. The TCF classifies this as a Special Purpose with no right to object via the framework, recognising its indispensable nature.

### 14.3 Special Purpose 3 – Save and communicate privacy choices

**Legitimate interest pursued:** verify and propagate TCF signals (TC String) along the advertising chain so that Advia and the rest of the ecosystem respect the user's privacy choices.

**Why it is necessary:** without this processing, Advia could not verify its legal basis before applying conditional processing (e.g. User Agent logging under Purpose 7) nor guarantee that other ecosystem vendors receive the privacy signal without loss of information.

**Why user rights do not prevail:** the only data processed is the TC String itself (which contains no user identifiers, only their preferences), processed in memory and discarded after propagation. The processing is directly favourable to the data subject: its purpose is to respect and propagate their privacy choices. The TCF classifies this as a Special Purpose with no right to object via the framework, since it would not make sense to object to respecting one's own preferences.

### Internal documentation

The full Legitimate Interest Assessments (LIAs) with the three mandatory tests (Purpose test, Necessity test, Balancing test) are kept internally by Advia as an accountability record under Art. 5.2 and 24 GDPR, and are available to supervisory authorities upon request.

## 15. Visitors to this website (advia.tech)

This section applies only to people browsing \`advia.tech\`, Advia's corporate website. Here Advia is a controller in its own right; nothing described in this section forms part of its activity as TCF vendor 1586, nor is it declared in the framework.

### Website traffic measurement

On each page request, the advia.tech server sends a measurement call to \`events.advia.tech\`. This call is made **server to server, not from your browser**. The only data recorded for the measurement is two fields:

- Your browser's **User Agent** (browser type, version and operating system).

- The **URL of the requested page** within advia.tech.

**IP address:** the request reaches \`events.advia.tech\` accompanied by an IP address, as happens in any communication over the internet. Advia **does not process it as business data**: it plays no part in the measurement, is not associated with the traffic records and is not retained alongside them. This is the same approach described in sections 4 and 8 for the ad server.

**Purpose:** to understand the volume and distribution of corporate site traffic (most visited pages, browser and device breakdown) in order to maintain and improve it.

**Legal basis:** legitimate interest (Art. 6(1)(f) GDPR). The interest pursued is understanding the use of our own corporate site. The processing is minimal: two fields are recorded, with no user identifier and no ability to reconstruct a session or recognise a returning visitor. The IP address, although it technically accompanies the request, is not processed as business data nor retained in association with the measurement. The data subject's rights and freedoms therefore do not override it.

**No storage on your device:** this measurement neither writes nor reads cookies, localStorage or any other data on your equipment, so it falls outside the scope of Art. 22.2 of Spanish Law 34/2002 (LSSI-CE) and Art. 5(3) of Directive 2002/58/EC (ePrivacy). The cookies this website does use are described in the [Cookies Policy](/cookies-policy), and are managed through the consent banner. The exception is the \`advia_optout\` cookie, which is only set if you request it at [advia.tech/opt-out](/opt-out) and which, being strictly necessary to remember your refusal, requires no consent.

**Retention:** 90 days raw. After that period the records are deleted and only aggregated site metrics without personal data are kept.

**Your rights:** those described in section 10, including the right to object under Art. 21 GDPR. You can exercise it immediately at [advia.tech/opt-out](/opt-out): if your browser presents the opt-out cookie this measurement does not take place — the call to the measurement service is suppressed entirely, never sent and nothing recorded. You may also write to [privacy@advia.tech](mailto:privacy@advia.tech).`;
