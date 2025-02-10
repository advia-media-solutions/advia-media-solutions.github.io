import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getStoredConsent, setConsent } from "../utils/gtm";
import Button from "./Button";
import Logo from "./Logo";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [tempConsent, setTempConsent] = useState({
    necessary: true,
    analytics: true,
    advertising: true,
    functionality: true,
    personalization: true,
    hasUserChosen: false
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored.hasUserChosen) {
      setIsVisible(true);
      setTempConsent({
        necessary: true,
        analytics: true,
        advertising: true,
        functionality: true,
        personalization: true,
        hasUserChosen: false
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
    setIsVisible(false);
  };

  const handleSaveConfiguration = () => {
    const newConsent = {
      ...tempConsent,
      hasUserChosen: true,
    };
    setConsent(newConsent);
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
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const cookieTypes = [
    {
      title: "Cookies de análisis",
      key: "analytics",
      description: "Nos permiten entender cómo interactúas con el sitio web, qué páginas son más populares, y detectar problemas de navegación. Esta información nos ayuda a mejorar constantemente la experiencia del usuario y optimizar nuestros servicios."
    },
    {
      title: "Cookies publicitarias",
      key: "advertising",
      description: "Utilizadas para mostrarte anuncios relevantes basados en tus intereses y hábitos de navegación. Nos ayudan a gestionar la publicidad que ves, evitar que veas los mismos anuncios repetidamente y medir la efectividad de las campañas publicitarias."
    },
    {
      title: "Cookies de funcionalidad",
      key: "functionality",
      description: "Permiten recordar tus preferencias como el idioma, la región o el inicio de sesión. Estas cookies hacen que tu experiencia sea más fluida al mantener tus ajustes entre visitas y ofrecer funciones personalizadas."
    },
    {
      title: "Cookies de personalización",
      key: "personalization",
      description: "Nos ayudan a adaptar el contenido que ves según tus intereses. Esto incluye recomendaciones de productos, sugerencias personalizadas y contenido adaptado a tu perfil y preferencias de navegación."
    }
  ];

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
                <p className="leading-relaxed">
                  Utilizamos cookies propias y de terceros con fines técnicos, 
                  analíticos, para mejora de productos y servicios, para mostrarte 
                  publicidad personalizada en base a un perfil elaborado a partir 
                  de tus hábitos de navegación y para la medición del rendimiento 
                  de anuncios y contenidos.
                </p>
                <p className="mt-2">
                  Puedes aceptar todas las cookies pulsando en "Aceptar", 
                  rechazarlas y/o{" "}
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    configurar
                  </button>{" "}
                  su uso.
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleAcceptAll}
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700 text-black px-16 py-3 rounded w-96"
                >
                  Aceptar
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
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Cookies necesarias</h3>
                    <p className="text-sm text-gray-600">
                      Necesarias para el funcionamiento básico y la seguridad del sitio web
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
                    Obligatorio
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

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={handleAcceptAll}
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-2 rounded"
              >
                Aceptar todas
              </Button>
              <Button
                onClick={handleSaveConfiguration}
                className="relative z-10 bg-glass-medium hover:bg-glass-heavy backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Guardar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;