import React, { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import GlassCard from "../components/GlassCard";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { revokeSiteConsent } from "../utils/gtm";

const OPTOUT_PAGE_URL = "https://events.advia.tech/v1/optout";

const OptOut = ({ optedOut = false, upstreamError = false }) => {
  useScrollToTop();

  // Progressive enhancement: an objection to ad tracking should also withdraw
  // this site's own analytics/advertising consent. The opt-out itself works
  // without JavaScript; only this alignment needs it.
  useEffect(() => {
    if (optedOut) revokeSiteConsent();
  }, [optedOut]);

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
            Exclusión{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                publicitaria
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

        {/* Status + controls. Deliberately rendered once, bilingual: two
            identical state-changing controls on one page, reachable by anchor
            jump so the user may only ever see one, is a hazard. */}
        <div className="max-w-4xl mx-auto mb-16">
          <GlassCard className="p-6 md:p-8">
            <div className="space-y-6" aria-live="polite">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-neutral-DEFAULT/60">
                  Estado actual · Current status
                </p>
                <p className="flex flex-wrap items-center gap-3 text-2xl font-bold text-neutral-dark">
                  <span
                    aria-hidden="true"
                    className={`inline-block w-3 h-3 rounded-full ${
                      optedOut ? "bg-primary-dark" : "bg-secondary-DEFAULT"
                    }`}
                  />
                  {optedOut
                    ? "Está excluido · You are opted out"
                    : "No está excluido · You are opted in"}
                </p>
                <p className="text-neutral-DEFAULT/80 leading-relaxed">
                  {optedOut
                    ? "Este navegador tiene la cookie advia_optout. Advia no registra sus eventos publicitarios."
                    : "Este navegador no tiene la cookie advia_optout. Advia puede registrar sus eventos publicitarios."}
                </p>
                <p className="text-neutral-DEFAULT/60 text-sm">
                  {optedOut
                    ? "This browser has the advia_optout cookie. Advia records none of your ad events."
                    : "This browser has no advia_optout cookie. Advia may record your ad events."}
                </p>
              </div>

              {upstreamError && (
                <div className="rounded-lg border border-neutral-DEFAULT/30 bg-white/40 p-4 space-y-2">
                  <p className="text-neutral-dark font-semibold">
                    No hemos podido aplicar el cambio · We could not apply your
                    change
                  </p>
                  <p className="text-neutral-DEFAULT/80 leading-relaxed text-sm">
                    El servicio que gestiona la exclusión no ha respondido. Su
                    elección <strong>no</strong> se ha guardado. Vuelva a
                    intentarlo, o hágalo directamente en{" "}
                    <a
                      href={OPTOUT_PAGE_URL}
                      rel="nofollow noreferrer"
                      className="text-primary-light hover:text-primary-dark transition-colors break-all"
                    >
                      {OPTOUT_PAGE_URL}
                    </a>
                    .
                  </p>
                  <p className="text-neutral-DEFAULT/60 text-sm">
                    The service that records the opt-out did not respond. Your
                    choice was <strong>not</strong> saved. Try again, or use the
                    link above directly.
                  </p>
                </div>
              )}

              {/* Both controls always rendered, so the page never dead-ends.
                  Plain form POSTs: the mechanism must work without JavaScript. */}
              <div className="flex flex-col sm:flex-row gap-3">
                <form method="POST" action="/api/opt-out">
                  <input type="hidden" name="action" value="out" />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-neutral-dark text-white font-semibold hover:bg-neutral-dark/90 transition-colors"
                  >
                    Excluirme · Opt out
                  </button>
                </form>
                <form method="POST" action="/api/opt-out">
                  <input type="hidden" name="action" value="in" />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg border border-neutral-DEFAULT/30 text-neutral-dark font-semibold hover:bg-neutral-DEFAULT/5 transition-colors"
                  >
                    Volver a permitir · Opt back in
                  </button>
                </form>
              </div>

              <p className="text-neutral-DEFAULT/60 text-sm">
                Su elección se aplica de inmediato y no requiere que nos
                facilite ningún dato. · Your choice takes effect immediately and
                requires no personal details.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Spanish Content */}
        <div id="es" className="max-w-4xl mx-auto space-y-12 scroll-mt-24">
          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              1. Qué hace esta exclusión
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Al excluirse, Advia deja de registrar los eventos publicitarios
                asociados a este navegador. La comprobación se realiza en el
                servidor, antes de que la petición se procese: no se decodifican
                los identificadores, no se construye ningún registro y no se
                almacena ninguna fila. La supresión afecta tanto a las
                impresiones como a los clics.
              </p>
              <p>
                La exclusión cubre además dos cosas de este sitio web:{" "}
                <strong>la medición de tráfico de advia.tech</strong> descrita
                en el apartado 15 de la{" "}
                <a
                  href="/privacy-policy#visitantes-web"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  Política de Privacidad
                </a>{" "}
                (ejercicio del derecho de oposición del Art. 21 RGPD), y{" "}
                <strong>
                  las cookies analíticas y publicitarias del propio sitio
                </strong>
                , cuyo consentimiento se revoca automáticamente.
              </p>
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              2. Qué NO hace
            </h2>
            <ul className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>
                <strong>No elimina la publicidad.</strong> Seguirá viendo
                anuncios y los enlaces seguirán funcionando con normalidad. Lo
                que se suprime es el registro del evento, no el anuncio.
              </li>
              <li>
                <strong>No sustituye al CMP del publisher.</strong> Sus
                elecciones de consentimiento en el marco del IAB Europe TCF se
                gestionan en el sitio web donde se muestra el anuncio. Esta
                exclusión es un mecanismo adicional y propio de Advia, ajeno al
                TCF, que no modifica su TC String.
              </li>
              <li>
                <strong>Volver a permitir no equivale a consentir.</strong>{" "}
                Retirar la exclusión solo elimina la cookie; no genera ningún
                identificador ni constituye consentimiento por sí mismo.
              </li>
              <li>
                <strong>No requiere que nos facilite ningún dato.</strong> No
                registramos quién se ha excluido: por eso no podemos restaurar
                su elección ni confirmársela por correo.
              </li>
            </ul>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              3. Alcance técnico
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                La exclusión se registra en una cookie llamada{" "}
                <code>advia_optout</code>, establecida en el dominio{" "}
                <code>.advia.tech</code> con una duración de 1 año. Se renueva
                cada vez que su navegador solicita un anuncio de Advia mientras
                siga excluido, de modo que la exclusión no caduca antes que
                aquello que suprime.
              </p>
              <p>
                Su contenido íntegro es el carácter <code>1</code>. No contiene
                ningún identificador: ni ID de usuario, ni ID de visitante, ni
                ID de sesión, ni hash, ni marca de tiempo. Registra un único
                bit: que este navegador se ha excluido.
              </p>
              <p>
                Puede comprobar el estado que reconoce nuestro servidor, de
                forma independiente a esta página, en{" "}
                <a
                  href="https://events.advia.tech/v1/optout/status"
                  className="text-primary-light hover:text-primary-dark transition-colors break-all"
                  rel="nofollow noreferrer"
                >
                  events.advia.tech/v1/optout/status
                </a>
                .
              </p>
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              4. Límites que debe conocer
            </h2>
            <ul className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>
                <strong>Es específica de este navegador y dispositivo.</strong>{" "}
                Excluirse en el ordenador no le excluye en el móvil, ni en otro
                navegador, ni en modo incógnito.
              </li>
              <li>
                <strong>Se guarda en una cookie.</strong> Si borra las cookies,
                o si su navegador las elimina automáticamente, la exclusión se
                pierde y debe repetirla. Por eso decimos que dura{" "}
                <em>hasta que borre las cookies de su navegador</em>, y no una
                cifra concreta de años.
              </li>
              <li>
                <strong>
                  Si su navegador bloquea las cookies de terceros
                </strong>{" "}
                (Safari con ITP, Firefox con protección total, o Chrome con las
                cookies de terceros desactivadas), el navegador no adjunta la
                cookie a la petición del píxel y nuestro servidor no llega a
                verla. Es una limitación inherente a todo mecanismo de exclusión
                basado en cookies, incluidos los del sector (NAI, DAA). En esos
                navegadores, en cualquier caso, los eventos no se asocian a
                ninguna cookie.
              </li>
            </ul>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              5. Base legal de esta cookie
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                <code>advia_optout</code> es una cookie técnica: su única
                función es recordar la negativa que usted mismo ha expresado.
                Por ello está exenta del requisito de consentimiento previo
                conforme al Art. 22.2 de la Ley 34/2002 (LSSI-CE) y al Art. 5(3)
                de la Directiva 2002/58/CE (ePrivacy). Sin ella no habría forma
                de recordar su elección.
              </p>
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              6. Otros derechos y contacto
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Esta página cubre el derecho de oposición (Art. 21 RGPD) y la
                retirada del consentimiento. Para el resto de derechos —acceso,
                rectificación, supresión, limitación y portabilidad— y para
                conocer el detalle de los tratamientos, consulte la{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  Política de Privacidad
                </a>{" "}
                o escriba a{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
                .
              </p>
              <p>
                Puede presentar una reclamación ante la Agencia Española de
                Protección de Datos (AEPD) en{" "}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  www.aepd.es
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
              Ad{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  opt-out
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
              </span>
            </h2>
          </div>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              1. What opting out does
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                Once you opt out, Advia stops recording the ad events associated
                with this browser. The check runs server-side, before the
                request is processed: identifiers are never decoded, no payload
                is built and no row is stored. Suppression covers both
                impressions and clicks.
              </p>
              <p>
                It also covers two things on this website:{" "}
                <strong>the advia.tech traffic measurement</strong> described in
                section 15 of the{" "}
                <a
                  href="/privacy-policy#website-visitors"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  Privacy Policy
                </a>{" "}
                (exercising the right to object under Art. 21 GDPR), and{" "}
                <strong>this site's own analytics and advertising cookies</strong>
                , whose consent is withdrawn automatically.
              </p>
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              2. What it does NOT do
            </h2>
            <ul className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>
                <strong>It does not remove advertising.</strong> You will still
                see ads and links will still work normally. What is suppressed
                is the event record, not the ad.
              </li>
              <li>
                <strong>
                  It does not replace the publisher's CMP.
                </strong>{" "}
                Your consent choices under the IAB Europe TCF are managed on the
                website where the ad is shown. This opt-out is an additional,
                Advia-specific mechanism outside the TCF, and it does not alter
                your TC String.
              </li>
              <li>
                <strong>Opting back in is not consent.</strong> Withdrawing the
                opt-out only deletes the cookie; it mints no identifier and does
                not by itself constitute consent.
              </li>
              <li>
                <strong>It requires no personal details from you.</strong> We do
                not record who has opted out, which is why we cannot restore
                your choice for you or confirm it by email.
              </li>
            </ul>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              3. Technical scope
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                The opt-out is recorded in a cookie named{" "}
                <code>advia_optout</code>, set on the <code>.advia.tech</code>{" "}
                domain with a 1-year lifetime. It is refreshed every time your
                browser requests an Advia ad while you remain opted out, so the
                opt-out never expires sooner than what it suppresses.
              </p>
              <p>
                Its entire contents are the character <code>1</code>. It carries
                no identifier: no user ID, no visitor ID, no session ID, no
                hash, no timestamp. It records one bit — that this browser has
                opted out.
              </p>
              <p>
                You can verify the state our server recognises, independently of
                this page, at{" "}
                <a
                  href="https://events.advia.tech/v1/optout/status"
                  className="text-primary-light hover:text-primary-dark transition-colors break-all"
                  rel="nofollow noreferrer"
                >
                  events.advia.tech/v1/optout/status
                </a>
                .
              </p>
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              4. Limits you should know about
            </h2>
            <ul className="space-y-3 text-neutral-DEFAULT/80 leading-relaxed list-disc pl-5">
              <li>
                <strong>It is per browser and per device.</strong> Opting out on
                your laptop does not opt you out on your phone, in another
                browser, or in private browsing.
              </li>
              <li>
                <strong>It is stored in a cookie.</strong> If you clear your
                cookies, or your browser clears them automatically, the opt-out
                is lost and you need to set it again. That is why we say it
                lasts <em>until you clear your browser cookies</em> rather than
                promising a number of years.
              </li>
              <li>
                <strong>If your browser blocks third-party cookies</strong>{" "}
                (Safari with ITP, Firefox with total protection, or Chrome with
                third-party cookies disabled), the browser does not attach the
                cookie to the pixel request and our server never sees it. This
                is inherent to every cookie-based opt-out, including the
                industry ones (NAI, DAA). In those browsers ad events are in any
                case not associated with any cookie.
              </li>
            </ul>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              5. Legal basis for this cookie
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                <code>advia_optout</code> is a technical cookie: its only
                function is to remember the refusal you expressed yourself. It
                is therefore exempt from the prior-consent requirement under
                Art. 22.2 of Spanish Law 34/2002 (LSSI-CE) and Art. 5(3) of
                Directive 2002/58/EC (ePrivacy). Without it there would be no
                way to remember your choice.
              </p>
            </div>
          </section>

          <section className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-neutral-dark">
              6. Other rights and contact
            </h2>
            <div className="space-y-4 text-neutral-DEFAULT/80 leading-relaxed">
              <p>
                This page covers the right to object (Art. 21 GDPR) and
                withdrawal of consent. For all other rights — access,
                rectification, erasure, restriction and portability — and for
                the detail of each processing activity, see the{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  Privacy Policy
                </a>{" "}
                or write to{" "}
                <a
                  href="mailto:privacy@advia.tech"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  privacy@advia.tech
                </a>
                .
              </p>
              <p>
                You may lodge a complaint with the Spanish Data Protection
                Agency (AEPD) at{" "}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary-dark transition-colors"
                >
                  www.aepd.es
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default OptOut;
