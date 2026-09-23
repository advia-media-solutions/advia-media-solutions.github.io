import React, { useState, useEffect } from "react";
import { Trans, useTranslation } from "next-i18next/pages";
import { getStoredConsent, setConsent } from "../utils/gtm";
import Logo from "./v4/Logo";
import { IconoCerrar } from "./v4/primitives";

const CATEGORIAS = ["analytics", "advertising", "functionality", "personalization"];

// Non-necessary categories start unchecked: pre-ticked boxes are not valid
// consent (Art. 4.11 GDPR; Planet49, C-673/17).
const SIN_ELEGIR = {
  necessary: true,
  analytics: false,
  advertising: false,
  functionality: false,
  personalization: false,
  hasUserChosen: false,
};

function pageviewTrasConsentir() {
  if (typeof window === "undefined") return;
  window.dataLayer.push({
    event: "post_consent_pageview",
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/**
 * Aviso de cookies con el lenguaje de la web v4: panel marfil sobre velo,
 * botones pill del sistema y un interruptor dorado por categoría. Aceptar y
 * rechazar pesan lo mismo a la vista: rechazar no puede costar más que aceptar.
 */
const CookieConsent = () => {
  const { t } = useTranslation("common");
  /* Visible de salida: el aviso viaja en el HTML y se pinta con la página. Si
     ya hay elección, la clase `v4-consentido` que pone _document.jsx lo
     esconde antes del primer pintado, y aquí se desmonta al hidratar. */
  const [isVisible, setIsVisible] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [tempConsent, setTempConsent] = useState(SIN_ELEGIR);

  useEffect(() => {
    if (getStoredConsent().hasUserChosen) setIsVisible(false);
  }, []);

  const handleAcceptAll = () => {
    setConsent({
      ...tempConsent,
      analytics: true,
      advertising: true,
      functionality: true,
      personalization: true,
      hasUserChosen: true,
    });
    pageviewTrasConsentir();
    setIsVisible(false);
  };

  const handleSaveConfiguration = () => {
    setConsent({ ...tempConsent, hasUserChosen: true });
    // If analytics was accepted, trigger immediate page view
    if (tempConsent.analytics) pageviewTrasConsentir();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    setConsent({ ...SIN_ELEGIR, hasUserChosen: true });
    if (typeof window !== "undefined")
      window.dataLayer.push({
        event: "consent_update",
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_personalization: "denied",
        ad_user_data: "denied",
        functionality_storage: "denied",
      });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const cambiar = (key, valor) => setTempConsent((prev) => ({ ...prev, [key]: valor }));

  return (
    <div className="v4 v4-cookies">
      <div
        className="v4-cookies__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="v4-cookies-titulo"
      >
        {showDetails ? (
          <Detalle
            t={t}
            consent={tempConsent}
            onCambiar={cambiar}
            onCerrar={() => setShowDetails(false)}
            onRechazar={handleRejectAll}
            onAceptar={handleAcceptAll}
            onGuardar={handleSaveConfiguration}
          />
        ) : (
          <Resumen
            t={t}
            onConfigurar={() => setShowDetails(true)}
            onRechazar={handleRejectAll}
            onAceptar={handleAcceptAll}
          />
        )}
      </div>
    </div>
  );
};

function Cabecera({ t, onCerrar }) {
  return (
    <div className="v4-cookies__cabecera">
      <Logo width={88} />
      <span id="v4-cookies-titulo" className="v4-label">
        {t("footer.cookies")}
      </span>
      {onCerrar && (
        <button
          type="button"
          onClick={onCerrar}
          className="v4-cookies__cerrar"
          aria-label={t("cookies.cerrar")}
        >
          <IconoCerrar />
        </button>
      )}
    </div>
  );
}

function Resumen({ t, onConfigurar, onRechazar, onAceptar }) {
  return (
    <>
      <Cabecera t={t} />
      <div className="v4-cookies__texto">
        <p>{t("cookies.intro")}</p>
        <p>
          <Trans
            t={t}
            i18nKey="cookies.opciones"
            components={{
              configurar: (
                <button type="button" onClick={onConfigurar} className="v4-cookies__enlace" />
              ),
            }}
          />
        </p>
      </div>
      <div className="v4-cookies__acciones">
        <button type="button" onClick={onRechazar} className="v4-btn v4-btn--ghost">
          {t("cookies.rechazar")}
        </button>
        <button type="button" onClick={onAceptar} className="v4-btn v4-btn--primary">
          {t("cookies.aceptar")}
        </button>
      </div>
    </>
  );
}

function Categoria({ id, titulo, desc, children }) {
  return (
    <li className="v4-cookies__categoria">
      <div>
        <label htmlFor={id} className="v4-cookies__nombre">
          {titulo}
        </label>
        <p className="v4-cookies__desc">{desc}</p>
      </div>
      {children}
    </li>
  );
}

function Detalle({ t, consent, onCambiar, onCerrar, onRechazar, onAceptar, onGuardar }) {
  return (
    <>
      <Cabecera t={t} onCerrar={onCerrar} />
      <ul className="v4-cookies__lista">
        <Categoria
          id="cookies-necessary"
          titulo={t("cookies.necesarias")}
          desc={t("cookies.necesariasDesc")}
        >
          <span className="v4-label v4-label--activo">{t("cookies.obligatorio")}</span>
        </Categoria>
        {CATEGORIAS.map((key) => (
          <Categoria
            key={key}
            id={`cookies-${key}`}
            titulo={t(`cookies.tipos.${key}.titulo`)}
            desc={t(`cookies.tipos.${key}.desc`)}
          >
            <input
              type="checkbox"
              role="switch"
              id={`cookies-${key}`}
              className="v4-switch"
              checked={consent[key]}
              onChange={(e) => onCambiar(key, e.target.checked)}
            />
          </Categoria>
        ))}
      </ul>
      <div className="v4-cookies__acciones" data-detalle="true">
        <button type="button" onClick={onRechazar} className="v4-btn v4-btn--ghost">
          {t("cookies.rechazarTodas")}
        </button>
        <button type="button" onClick={onGuardar} className="v4-btn v4-btn--ghost">
          {t("cookies.guardar")}
        </button>
        <button type="button" onClick={onAceptar} className="v4-btn v4-btn--primary">
          {t("cookies.aceptarTodas")}
        </button>
      </div>
    </>
  );
}

export default CookieConsent;
