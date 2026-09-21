// Constants for consent management
const CONSENT_STORAGE_KEY = "cookieConsent";
const DEFAULT_CONSENT_STATE = {
  necessary: true,
  analytics: false,
  advertising: false,
  hasUserChosen: false,
};

/**
 * Pushes a gtag command onto the dataLayer.
 * Consent Mode reads the raw `arguments` object, so this cannot forward an array.
 */
function gtag() {
  window.dataLayer.push(arguments);
}

/**
 * Translates the stored consent categories into Google Consent Mode signals.
 * @param {Object} consentState - User consent preferences
 * @returns {Object} One signal per Consent Mode key
 */
const toConsentModeSignals = (consentState) => {
  const advertising = consentState.advertising ? "granted" : "denied";

  return {
    ad_storage: advertising,
    ad_user_data: advertising,
    ad_personalization: advertising,
    analytics_storage: consentState.analytics ? "granted" : "denied",
    functionality_storage: consentState.functionality ? "granted" : "denied",
    personalization_storage: consentState.personalization
      ? "granted"
      : "denied",
    security_storage: "granted",
  };
};

/**
 * Initializes Google Tag Manager with default denied consent state
 * @param {string} containerId - GTM container ID
 */
export const initializeGTM = (containerId) => {
  if (typeof window === "undefined") return;
  if (!containerId) {
    console.error("GTM container ID is required");
    return;
  }

  window.dataLayer = window.dataLayer || [];

  // Consent Mode defaults, which must be set before gtm.js loads. Without them
  // every signal stays implicit, and Google's tags read implicit as granted.
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });

  // Push initial denied consent state
  window.dataLayer.push({
    event: "consent_update",
    analytics_storage: "denied",
    ad_storage: "denied",
  });

  // Load GTM script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);

  // Check if user has previously chosen preferences
  const storedConsent = getStoredConsent();
  if (storedConsent.hasUserChosen) {
    gtag("consent", "update", toConsentModeSignals(storedConsent));

    window.dataLayer.push({
      event: "consent_update",
      analytics_storage: storedConsent.analytics ? "granted" : "denied",
      ad_storage: storedConsent.advertising ? "granted" : "denied",
    });
  }
};

/**
 * Updates GTM consent state
 * @param {Object} consentState - User consent preferences
 */
export const updateGTMConsent = (consentState) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  gtag("consent", "update", toConsentModeSignals(consentState));

  window.dataLayer.push({
    event: "consent_update",
    analytics_storage: consentState.analytics ? "granted" : "denied",
    ad_storage: consentState.advertising ? "granted" : "denied",
  });
};

/**
 * Retrieves stored consent preferences
 * @returns {Object} Consent preferences
 */
export const getStoredConsent = () => {
  if (typeof window === "undefined") return DEFAULT_CONSENT_STATE;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return DEFAULT_CONSENT_STATE;

    const parsedConsent = JSON.parse(stored);
    return parsedConsent.hasUserChosen ? parsedConsent : DEFAULT_CONSENT_STATE;
  } catch (error) {
    console.error("Error reading stored consent:", error);
    return DEFAULT_CONSENT_STATE;
  }
};

/**
 * Stores consent preferences and updates GTM
 * @param {Object} consentState - User consent preferences
 */
export const setConsent = (consentState) => {
  if (typeof window === "undefined") return;
  try {
    const consentWithChoice = {
      ...consentState,
      hasUserChosen: true,
    };

    // Store consent in localStorage
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify(consentWithChoice)
    );

    // Update GTM consent state
    updateGTMConsent(consentWithChoice);
  } catch (error) {
    console.error("Error storing consent:", error);
  }
};

/**
 * Withdraws consent for every non-necessary category.
 * Used by the /opt-out page so an objection to ad tracking also covers this
 * site's own analytics and advertising cookies.
 */
export const revokeSiteConsent = () => {
  setConsent({
    necessary: true,
    analytics: false,
    advertising: false,
    functionality: false,
    personalization: false,
  });
};
