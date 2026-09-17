import React, { useState, useEffect } from "react";
import { Trans, useTranslation } from "next-i18next/pages";
import { X } from "lucide-react";
import { getStoredConsent, setConsent } from "../utils/gtm";
import Button from "./Button";
import Logo from "./Logo";

const CookieConsent = () => {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // Non-necessary categories start unchecked: pre-ticked boxes are not valid
  // consent (Art. 4.11 GDPR; Planet49, C-673/17).
  const [tempConsent, setTempConsent] = useState({
    necessary: true,
    analytics: false,
    advertising: false,
    functionality: false,
    personalization: false,
    hasUserChosen: false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored.hasUserChosen) {
      setIsVisible(true);
      setTempConsent({
        necessary: true,
        analytics: false,
        advertising: false,
        functionality: false,
        personalization: false,
        hasUserChosen: false,
      });
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent = {
      ...tempConsent,
      analytics: true,
      advertising: true,
      functionality: true,
      personalization: true,
      hasUserChosen: true,
    };
    setConsent(newConsent);

    // Remove the duplicate consent_update push and keep only the pageview event
    if (typeof window !== "undefined")
      window.dataLayer.push({
        event: "post_consent_pageview",
        page_path: window.location.pathname,
        page_title: document.title,
      });

    setIsVisible(false);
  };

  const handleSaveConfiguration = () => {
    const newConsent = {
      ...tempConsent,
      hasUserChosen: true,
    };
    setConsent(newConsent);

    // If analytics was accepted, trigger immediate page view
    if (tempConsent.analytics && typeof window !== "undefined") {
      window.dataLayer.push({
        event: "post_consent_pageview",
        page_path: window.location.pathname,
        page_title: document.title,
      });
    }

    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const newConsent = {
      ...tempConsent,
      analytics: false,
      advertising: false,
      functionality: false,
      personalization: false,
      hasUserChosen: true,
    };
    setConsent(newConsent);
    // Add this to push consent denial to dataLayer
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

  /* Título y descripción de cada categoría salen del diccionario (common). */
  const cookieTypes = ["analytics", "advertising", "functionality", "personalization"].map(
    (key) => ({
      key,
      title: t(`cookies.tipos.${key}.titulo`),
      description: t(`cookies.tipos.${key}.desc`),
    })
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg mx-4 w-full max-w-3xl">
        {!showDetails ? (
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Logo className="w-48 h-10" />
              </div>

              <div className="text-sm text-gray-700 mt-4">
                <p className="leading-relaxed">{t("cookies.intro")}</p>
                <p className="mt-2">
                  <Trans
                    t={t}
                    i18nKey="cookies.opciones"
                    components={{
                      configurar: (
                        <button
                          type="button"
                          onClick={() => setShowDetails(true)}
                          className="text-blue-600 hover:underline font-medium"
                        />
                      ),
                    }}
                  />
                </p>
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <Button
                  onClick={handleRejectAll}
                  variant="secondary"
                  className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-16 py-3 rounded"
                >
                  {t("cookies.rechazar")}
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700 text-black px-16 py-3 rounded"
                >
                  {t("cookies.aceptar")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Logo className="w-48 h-10" />
              <Button
                onClick={() => setShowDetails(false)}
                variant="ghost"
                className="hover:bg-gray-100 rounded-full p-2"
                aria-label={t("cookies.cerrar")}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{t("cookies.necesarias")}</h3>
                    <p className="text-sm text-gray-600">{t("cookies.necesariasDesc")}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
                    {t("cookies.obligatorio")}
                  </span>
                </div>
              </div>

              {cookieTypes.map((cookie) => (
                <div key={cookie.key} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={cookie.key}
                          checked={tempConsent[cookie.key]}
                          onChange={(e) =>
                            setTempConsent((prev) => ({
                              ...prev,
                              [cookie.key]: e.target.checked,
                            }))
                          }
                          className="mt-1 rounded border-gray-300"
                        />
                        <div>
                          <label
                            htmlFor={cookie.key}
                            className="font-semibold block"
                          >
                            {cookie.title}
                          </label>
                          <p className="text-sm text-gray-600">
                            {cookie.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                onClick={handleRejectAll}
                variant="secondary"
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded"
              >
                {t("cookies.rechazarTodas")}
              </Button>
              <div className="flex gap-3">
                <Button
                  onClick={handleAcceptAll}
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-2 rounded"
                >
                  {t("cookies.aceptarTodas")}
                </Button>
                <Button
                  onClick={handleSaveConfiguration}
                  className="relative z-10 bg-glass-medium hover:bg-glass-heavy backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("cookies.guardar")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
