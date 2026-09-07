/**
 * Exclusión publicitaria: el cuerpo explicativo, en español y en inglés.
 *
 * El texto es el mismo que ya estaba publicado, palabra por palabra: esta
 * migración es de estilo. Vive en markdown porque es un documento —párrafos,
 * epígrafes numerados y tablas—, y así se revisa y se actualiza sin tocar JSX.
 * Lo pinta .v4-prosa, el mismo tratamiento de cuerpo largo que el blog.
 */

export const ES = `## 1. Qué hace esta exclusión

Advia es un ad server: entrega anuncios en las páginas de otros editores, no en este sitio. Su elección aquí se aplica a **todos los anuncios que Advia le sirva en cualquier sitio web**, no solo a advia.tech.

Cubre tres cosas:

- **Los anuncios que Advia entrega en sitios de terceros.** Advia deja de registrar los eventos publicitarios asociados a este navegador, tanto las impresiones como los clics. La comprobación se realiza en el servidor, antes de que la petición se procese: no se decodifican los identificadores, no se construye ningún registro y no se almacena ninguna fila. El anuncio se sigue mostrando y sigue funcionando al hacer clic (véase el apartado 2).

- **La medición de tráfico de advia.tech**, descrita en el apartado 15 de la [Política de Privacidad](/privacy-policy#15-visitantes-de-este-sitio-web-advia-tech). Es el ejercicio del derecho de oposición del Art. 21 RGPD: la llamada de medición no llega a enviarse.

- **Las cookies analíticas y publicitarias de este sitio web**, cuyo consentimiento se revoca automáticamente.

## 2. Qué NO hace

- **No elimina la publicidad.** Seguirá viendo anuncios y los enlaces seguirán funcionando con normalidad. Lo que se suprime es el registro del evento, no el anuncio.

- **No sustituye al CMP del publisher.** Sus elecciones de consentimiento en el marco del IAB Europe TCF se gestionan en el sitio web donde se muestra el anuncio. Esta exclusión es un mecanismo adicional y propio de Advia, ajeno al TCF, que no modifica su TC String.

- **Volver a permitir no equivale a consentir.** Retirar la exclusión solo elimina la cookie; no genera ningún identificador ni constituye consentimiento por sí mismo.

- **No requiere que nos facilite ningún dato.** No registramos quién se ha excluido: por eso no podemos restaurar su elección ni confirmársela por correo.

## 3. Alcance técnico

La exclusión se registra en una cookie llamada \`advia_optout\`, establecida en el dominio \`.advia.tech\` con una duración de 1 año. Se renueva cada vez que su navegador solicita un anuncio de Advia mientras siga excluido, de modo que la exclusión no caduca antes que aquello que suprime.

Su contenido íntegro es el carácter \`1\`. No contiene ningún identificador: ni ID de usuario, ni ID de visitante, ni ID de sesión, ni hash, ni marca de tiempo. Registra un único bit: que este navegador se ha excluido.

Puede comprobar el estado que reconoce nuestro servidor, de forma independiente a esta página, en [events.advia.tech/v1/optout/status](https://events.advia.tech/v1/optout/status).

## 4. Límites que debe conocer

- **Es específica de este navegador y dispositivo.** Excluirse en el ordenador no le excluye en el móvil, ni en otro navegador, ni en modo incógnito.

- **Se guarda en una cookie.** Si borra las cookies, o si su navegador las elimina automáticamente, la exclusión se pierde y debe repetirla. Por eso decimos que dura *hasta que borre las cookies de su navegador*, y no una cifra concreta de años.

- **Si su navegador bloquea las cookies de terceros** (Safari con ITP, Firefox con protección total, o Chrome con las cookies de terceros desactivadas), el navegador no adjunta la cookie a la petición del píxel y nuestro servidor no llega a verla. Es una limitación inherente a todo mecanismo de exclusión basado en cookies, incluidos los del sector (NAI, DAA). En esos navegadores, en cualquier caso, los eventos no se asocian a ninguna cookie.

## 5. Base legal de esta cookie

\`advia_optout\` es una cookie técnica: su única función es recordar la negativa que usted mismo ha expresado. Por ello está exenta del requisito de consentimiento previo conforme al Art. 22.2 de la Ley 34/2002 (LSSI-CE) y al Art. 5(3) de la Directiva 2002/58/CE (ePrivacy). Sin ella no habría forma de recordar su elección.

## 6. Otros derechos y contacto

Esta página cubre el derecho de oposición (Art. 21 RGPD) y la retirada del consentimiento. Para el resto de derechos —acceso, rectificación, supresión, limitación y portabilidad— y para conocer el detalle de los tratamientos, consulte la [Política de Privacidad](/privacy-policy) o escriba a [privacy@advia.tech](mailto:privacy@advia.tech).

Puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en [www.aepd.es](https://www.aepd.es).`;

export const EN = `## 1. What opting out does

Advia is an ad server: it delivers ads on other publishers' pages, not on this site. Your choice here applies to **every ad Advia serves you, on any website** — not just advia.tech.

It covers three things:

- **The ads Advia delivers on third-party sites.** Advia stops recording the ad events associated with this browser, both impressions and clicks. The check runs server-side, before the request is processed: identifiers are never decoded, no payload is built and no row is stored. The ad still renders and still clicks through (see section 2).

- **The advia.tech traffic measurement**, described in section 15 of the [Privacy Policy](/privacy-policy#15-visitors-to-this-website-advia-tech). This is the right to object under Art. 21 GDPR in practice: the measurement call is never sent.

- **This website's own analytics and advertising cookies**, whose consent is withdrawn automatically.

## 2. What it does NOT do

- **It does not remove advertising.** You will still see ads and links will still work normally. What is suppressed is the event record, not the ad.

- **It does not replace the publisher's CMP.** Your consent choices under the IAB Europe TCF are managed on the website where the ad is shown. This opt-out is an additional, Advia-specific mechanism outside the TCF, and it does not alter your TC String.

- **Opting back in is not consent.** Withdrawing the opt-out only deletes the cookie; it mints no identifier and does not by itself constitute consent.

- **It requires no personal details from you.** We do not record who has opted out, which is why we cannot restore your choice for you or confirm it by email.

## 3. Technical scope

The opt-out is recorded in a cookie named \`advia_optout\`, set on the \`.advia.tech\` domain with a 1-year lifetime. It is refreshed every time your browser requests an Advia ad while you remain opted out, so the opt-out never expires sooner than what it suppresses.

Its entire contents are the character \`1\`. It carries no identifier: no user ID, no visitor ID, no session ID, no hash, no timestamp. It records one bit — that this browser has opted out.

You can verify the state our server recognises, independently of this page, at [events.advia.tech/v1/optout/status](https://events.advia.tech/v1/optout/status).

## 4. Limits you should know about

- **It is per browser and per device.** Opting out on your laptop does not opt you out on your phone, in another browser, or in private browsing.

- **It is stored in a cookie.** If you clear your cookies, or your browser clears them automatically, the opt-out is lost and you need to set it again. That is why we say it lasts *until you clear your browser cookies* rather than promising a number of years.

- **If your browser blocks third-party cookies** (Safari with ITP, Firefox with total protection, or Chrome with third-party cookies disabled), the browser does not attach the cookie to the pixel request and our server never sees it. This is inherent to every cookie-based opt-out, including the industry ones (NAI, DAA). In those browsers ad events are in any case not associated with any cookie.

## 5. Legal basis for this cookie

\`advia_optout\` is a technical cookie: its only function is to remember the refusal you expressed yourself. It is therefore exempt from the prior-consent requirement under Art. 22.2 of Spanish Law 34/2002 (LSSI-CE) and Art. 5(3) of Directive 2002/58/EC (ePrivacy). Without it there would be no way to remember your choice.

## 6. Other rights and contact

This page covers the right to object (Art. 21 GDPR) and withdrawal of consent. For all other rights — access, rectification, erasure, restriction and portability — and for the detail of each processing activity, see the [Privacy Policy](/privacy-policy) or write to [privacy@advia.tech](mailto:privacy@advia.tech).

You may lodge a complaint with the Spanish Data Protection Agency (AEPD) at [www.aepd.es](https://www.aepd.es).`;
