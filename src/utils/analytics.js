// utils/analytics.js

export const CookieConsentState = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  PREFERENCES: 'preferences',
};

const defaultConsent = {
  [CookieConsentState.NECESSARY]: true,
  [CookieConsentState.ANALYTICS]: false,
  [CookieConsentState.MARKETING]: false,
  [CookieConsentState.PREFERENCES]: false,
  hasUserChosen: false,
};

export const getStoredConsent = () => {
  const stored = localStorage.getItem('cookieConsent');
  if (!stored) {
    return defaultConsent;
  }
  try {
    const parsedConsent = JSON.parse(stored);
    return { ...defaultConsent, ...parsedConsent };
  } catch {
    return defaultConsent;
  }
};

export const initializeAnalytics = consent => {
  if (!consent[CookieConsentState.ANALYTICS]) {
    return;
  }

  // Prevent duplicate initialization
  if (window.gtagInitialized) {
    return;
  }

  // Definir gtag antes de cargar el script
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  const firstScript = document.createElement('script');
  firstScript.async = true;
  firstScript.src = `https://www.googletagmanager.com/gtag/js?id=G-EJDBQRW7Q4`;

  // Configurar GA inmediatamente después de definir gtag
  gtag('js', new Date());
  gtag('config', 'G-EJDBQRW7Q4', {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  // Configurar el consentimiento inicial
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    wait_for_update: 500,
  });

  // Si ya tenemos consentimiento, actualizarlo
  if (consent[CookieConsentState.ANALYTICS]) {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }

  // Marcar como inicializado antes de agregar el script
  window.gtagInitialized = true;

  document.head.appendChild(firstScript);
};

export const setConsent = (type, value) => {
  const currentConsent = getStoredConsent();
  const newConsent = {
    ...currentConsent,
    [type]: value,
    hasUserChosen: true,
    lastUpdated: new Date().toISOString(),
  };

  localStorage.setItem('cookieConsent', JSON.stringify(newConsent));

  if (type === CookieConsentState.ANALYTICS) {
    if (value) {
      initializeAnalytics(newConsent);
      // Enviar evento de consentimiento
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
      }
    } else {
      deleteCookies(['_ga', '_gat', '_gid']);
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    }
  }

  return newConsent;
};

const deleteCookies = cookieNames => {
  cookieNames.forEach(cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // También eliminar cookies de subdominios
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
  });

  // Limpiar localStorage y sessionStorage relacionados con GA
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('_ga')) {
      localStorage.removeItem(key);
    }
  });
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('_ga')) {
      sessionStorage.removeItem(key);
    }
  });
};

// Función auxiliar para comprobar si GA está cargado correctamente
export const isAnalyticsLoaded = () => {
  return window.gtagInitialized && typeof window.gtag === 'function';
};

// Función para enviar eventos personalizados
export const sendAnalyticsEvent = (eventName, params = {}) => {
  if (!isAnalyticsLoaded()) {
    console.warn('Analytics not initialized');
    return;
  }

  window.gtag('event', eventName, params);
};
