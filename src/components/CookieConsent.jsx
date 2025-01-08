// components/CookieConsent.jsx
import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import {
  getStoredConsent,
  setConsent,
  CookieConsentState,
  initializeAnalytics,
} from "../utils/analytics";
import Button from "./Button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsentState] = useState(getStoredConsent());

  useEffect(() => {
    const storedConsent = getStoredConsent();
    // Solo mostramos si el usuario no ha tomado una decisión
    if (!storedConsent.hasUserChosen) {
      setIsVisible(true);
    } else if (storedConsent[CookieConsentState.ANALYTICS]) {
      initializeAnalytics(storedConsent);
    }
    setConsentState(storedConsent);
  }, []);

  const handleConsentChange = (type, value) => {
    const newConsent = setConsent(type, value);
    setConsentState(newConsent);
  };

  const handleAcceptAnalytics = () => {
    handleConsentChange(CookieConsentState.ANALYTICS, true);
    setIsVisible(false);
  };

  const handleRejectAnalytics = () => {
    handleConsentChange(CookieConsentState.ANALYTICS, false);
    setIsVisible(false);
  };

  const handleClose = () => {
    handleRejectAnalytics();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 z-50 mx-auto max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg border border-neutral-100">
        <div className="p-4">
          <div className="flex flex-col gap-4">
            {/* Mensaje principal y botón de cerrar */}
            <div className="flex gap-4">
              <div className="flex-1 text-sm text-neutral-dark">
                <p className="leading-relaxed">
                  <span className="text-primary-dark font-medium">¡Hola! </span>
                  En Advia, nos gusta personalizar cada experiencia.{" "}
                  <span className="text-neutral-DEFAULT">
                    Aunque podríamos simular tu comportamiento, preferimos
                    conocerte mejor.
                  </span>
                </p>
              </div>
              <Button
                onClick={handleClose}
                variant="ghost"
                size="sm"
                aria-label="Cerrar aviso de cookies"
                className="hover:bg-neutral-50 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Toggle de detalles */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1 text-sm text-primary-light hover:text-primary-dark transition-colors"
            >
              {showDetails ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Menos detalles
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> Más detalles
                </>
              )}
            </button>

            {/* Sección de detalles */}
            {showDetails && (
              <div className="space-y-3 bg-neutral-50 p-3 rounded">
                <div className="text-sm text-neutral-DEFAULT mb-2">
                  <p>
                    Las cookies necesarias siempre están activas, ya que son
                    esenciales para el funcionamiento del sitio.
                  </p>
                </div>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={consent[CookieConsentState.ANALYTICS]}
                    onChange={(e) =>
                      handleConsentChange(
                        CookieConsentState.ANALYTICS,
                        e.target.checked
                      )
                    }
                    className="mt-1 rounded border-gray-300"
                  />
                  <span className="flex flex-col text-sm">
                    <strong className="text-neutral-dark">
                      Medición analítica
                    </strong>
                    <span className="text-neutral-DEFAULT text-xs">
                      Nos permite entender cómo utilizas nuestro sitio para
                      mejorarlo
                    </span>
                  </span>
                </label>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex items-center gap-2 justify-end">
              <Button
                onClick={handleRejectAnalytics}
                size="sm"
                className="bg-neutral-50 hover:bg-neutral-100"
              >
                Continuar sin medición
              </Button>
              <Button
                onClick={handleAcceptAnalytics}
                variant="primary"
                size="sm"
              >
                Aceptar medición
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
