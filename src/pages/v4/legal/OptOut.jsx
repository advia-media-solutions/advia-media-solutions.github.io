import React, { useEffect } from "react";
import { useTranslation } from "next-i18next/pages";
import DocumentoLegal from "../../../components/v4/DocumentoLegal";
import Idiomas from "../../../components/v4/Idiomas";
import T from "../../../components/v4/T";
import { Label } from "../../../components/v4/primitives";
import { ES, EN } from "../../../content/legal/optOut";
import { revokeSiteConsent } from "../../../utils/gtm";

/**
 * Exclusión publicitaria.
 *
 * A diferencia del resto de documentos, esta página hace algo: muestra el
 * estado que reconoce el servidor y permite cambiarlo. Los dos controles se
 * pintan SIEMPRE —y con formularios POST de toda la vida, sin JavaScript de por
 * medio— porque el mecanismo tiene que funcionar aunque los scripts no carguen,
 * y porque una página de exclusión no puede dejar al usuario sin salida.
 *
 * El estado se muestra una sola vez y bilingüe: dos controles idénticos que
 * cambian el estado, repartidos en dos versiones idiomáticas a las que se llega
 * por ancla, es un riesgo —el usuario vería solo uno de los dos.
 */

const URL_SERVICIO = "https://events.advia.tech/v1/optout";

function Estado({ optedOut, upstreamError }) {
  return (
    <div className="v4-optout" aria-live="polite">
      <div className="v4-optout__cabeza" data-fuera={optedOut ? "true" : undefined}>
        {/* El punto va con el rótulo, no con el titular: colgado del titular
            metía el texto 22px a la derecha y rompía la vertical de la página. */}
        <div className="v4-optout__rotulo">
          <span className="v4-optout__punto" aria-hidden="true" />
          <Label tono="faint">Estado actual · Current status</Label>
        </div>
        {/* Cada texto va con su traducción en un par: pegados entre sí y
            separados del siguiente par. Sueltos, la traducción quedaba tan
            lejos de su frase como de la siguiente. */}
        <div className="v4-optout__par">
          <p className="v4-optout__valor">{optedOut ? "Está excluido" : "No está excluido"}</p>
          <p className="v4-optout__en" lang="en">
            {optedOut ? "You are opted out" : "You are opted in"}
          </p>
        </div>
      </div>

      <div className="v4-optout__par">
        <p className="v4-body">
          {optedOut
            ? "Este navegador tiene la cookie advia_optout. Advia no registra sus eventos publicitarios."
            : "Este navegador no tiene la cookie advia_optout. Advia puede registrar sus eventos publicitarios."}
        </p>
        <p className="v4-optout__en" lang="en">
          {optedOut
            ? "This browser has the advia_optout cookie. Advia records none of your ad events."
            : "This browser has no advia_optout cookie. Advia may record your ad events."}
        </p>
      </div>

      {upstreamError ? (
        <div className="v4-aviso">
          <p className="v4-body v4-strong">No hemos podido aplicar el cambio</p>
          <p className="v4-body">
            El servicio que gestiona la exclusión no ha respondido. Su elección{" "}
            <strong>no</strong> se ha guardado. Vuelva a intentarlo, o hágalo directamente en{" "}
            <a href={URL_SERVICIO} rel="nofollow noreferrer">
              {URL_SERVICIO}
            </a>
            .
          </p>
          <p className="v4-optout__en" lang="en">
            We could not apply your change. The service that records the opt-out did not respond;
            your choice was not saved. Try again, or use the link above directly.
          </p>
        </div>
      ) : null}

      {/* Los dos controles se pintan siempre, con formularios POST de toda la
          vida: el mecanismo tiene que funcionar sin JavaScript, y una página de
          exclusión no puede dejar a nadie sin salida. */}
      <div className="v4-optout__acciones">
        <form method="POST" action="/api/opt-out">
          <input type="hidden" name="action" value="out" />
          <button type="submit" className="v4-btn v4-btn--primary">
            Excluirme · Opt out
          </button>
        </form>
        <form method="POST" action="/api/opt-out">
          <input type="hidden" name="action" value="in" />
          <button type="submit" className="v4-btn v4-btn--ghost">
            Volver a permitir · Opt back in
          </button>
        </form>
      </div>

      <p className="v4-optout__pie">
        Su elección se aplica de inmediato y no requiere que nos facilite ningún dato.
        <span className="v4-optout__en" lang="en">
          Your choice takes effect immediately and requires no personal details.
        </span>
      </p>
    </div>
  );
}

export default function OptOut({ optedOut = false, upstreamError = false }) {
  const { t, i18n } = useTranslation("legal");
  const en = i18n.language === "en";
  /* Mejora progresiva: oponerse al registro publicitario retira también el
     consentimiento de analítica y publicidad de este sitio. La exclusión en sí
     funciona sin JavaScript; solo esta alineación lo necesita. */
  useEffect(() => {
    if (optedOut) revokeSiteConsent();
  }, [optedOut]);

  return (
    <DocumentoLegal
      surface="inset"
      path="/opt-out"
      title={t("optOut.title")}
      description={t("optOut.description")}
      titular={<T t={t} k="optOut.titular" />}
      lede={t("optOut.lede")}
      pie={<Idiomas />}
      antes={<Estado optedOut={optedOut} upstreamError={upstreamError} />}
      /* El cuerpo del idioma de la ruta va primero; el otro, rotulado, debajo.
         El estado y los controles son bilingües y van una sola vez, arriba. */
      bloques={
        en
          ? [
              { id: "en", md: EN },
              { id: "es", titulo: t("version.es"), md: ES },
            ]
          : [
              { id: "es", md: ES },
              { id: "en", titulo: t("version.en"), md: EN },
            ]
      }
    />
  );
}
