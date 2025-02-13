// Constants for consent management
const CONSENT_STORAGE_KEY = 'cookieConsent';
const DEFAULT_CONSENT_STATE = {
  necessary: true,
  analytics: false,
  advertising: false,
  hasUserChosen: false
};

/**
 * Initializes Google Tag Manager with default denied consent state
 * @param {string} containerId - GTM container ID
 */
export const initializeGTM = (containerId) => {
  if (!containerId) {
    console.error('GTM container ID is required');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  
  // Push initial denied consent state
  window.dataLayer.push({
    event: 'consent_update',
    'analytics_storage': 'denied',
    'ad_storage': 'denied'
  });

  // Load GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);
    
  // Check if user has previously chosen preferences
  const storedConsent = getStoredConsent();
  if (storedConsent.hasUserChosen) {
    window.dataLayer.push({
      event: 'consent_update',
      'analytics_storage': storedConsent.analytics ? 'granted' : 'denied',
      'ad_storage': storedConsent.advertising ? 'granted' : 'denied'
    });
  }
};

/**
 * Updates GTM consent state
 * @param {Object} consentState - User consent preferences
 */
export const updateGTMConsent = (consentState) => {
  window.dataLayer = window.dataLayer || [];
  
  window.dataLayer.push({
    event: 'consent_update',
    'analytics_storage': consentState.analytics ? 'granted' : 'denied',
    'ad_storage': consentState.advertising ? 'granted' : 'denied'
  });
};

/**
 * Retrieves stored consent preferences
 * @returns {Object} Consent preferences
 */
export const getStoredConsent = () => {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return DEFAULT_CONSENT_STATE;

    const parsedConsent = JSON.parse(stored);
    return parsedConsent.hasUserChosen ? parsedConsent : DEFAULT_CONSENT_STATE;
  } catch (error) {
    console.error('Error reading stored consent:', error);
    return DEFAULT_CONSENT_STATE;
  }
};

/**
 * Stores consent preferences and updates GTM
 * @param {Object} consentState - User consent preferences
 */
export const setConsent = (consentState) => {
  try {
    const consentWithChoice = {
      ...consentState,
      hasUserChosen: true
    };

    // Store consent in localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentWithChoice));
    
    // Update GTM consent state
    updateGTMConsent(consentWithChoice);
  } catch (error) {
    console.error('Error storing consent:', error);
  }
};