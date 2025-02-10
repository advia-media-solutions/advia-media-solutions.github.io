// utils/gtm.js

// Initialize GTM with consent mode
export const initializeGTM = (containerId) => {
  window.dataLayer = window.dataLayer || [];
  
  // Get stored consent before initializing GTM
  const storedConsent = getStoredConsent();
  
  // Set initial consent state based on stored preferences
  const initialConsentState = {
    ad_storage: storedConsent.advertising ? 'granted' : 'denied',
    analytics_storage: storedConsent.analytics ? 'granted' : 'denied',
    functionality_storage: storedConsent.functionality ? 'granted' : 'denied',
    personalization_storage: storedConsent.personalization ? 'granted' : 'denied',
    security_storage: 'granted' // This one remains granted by default
  };

  // Push initial GTM configuration
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
    'gtm.consent_default': initialConsentState
  });

  // If user has previously chosen their preferences, send the consent_update event
  if (storedConsent.hasUserChosen) {
    window.dataLayer.push({
      event: 'consent_update',
      ...initialConsentState
    });
  }

  // Load GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);
};

// Update consent state in GTM
export const updateGTMConsent = (consentState) => {
  window.dataLayer = window.dataLayer || [];
  
  const gtmConsentState = {
    ad_storage: consentState.advertising ? 'granted' : 'denied',
    analytics_storage: consentState.analytics ? 'granted' : 'denied',
    functionality_storage: consentState.functionality ? 'granted' : 'denied',
    personalization_storage: consentState.personalization ? 'granted' : 'denied',
    security_storage: 'granted'
  };
  
  window.dataLayer.push({
    event: 'consent_update',
    ...gtmConsentState
  });
};

// Get stored consent from localStorage
export const getStoredConsent = () => {
  try {
    const stored = localStorage.getItem('cookieConsent');
    if (stored) {
      const parsedConsent = JSON.parse(stored);
      // Only return stored consent if user has made a choice
      if (parsedConsent.hasUserChosen) {
        return parsedConsent;
      }
    }
    // Return default denied state if no stored choice
    return {
      necessary: true,
      analytics: false,
      advertising: false,
      functionality: false,
      personalization: false,
      hasUserChosen: false
    };
  } catch (error) {
    console.error('Error reading stored consent', error);
    return {
      necessary: true,
      analytics: false,
      advertising: false,
      functionality: false,
      personalization: false,
      hasUserChosen: false
    };
  }
};

// Store consent in localStorage and update GTM
export const setConsent = (consentState) => {
  try {
    const consentWithChoice = {
      ...consentState,
      hasUserChosen: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentWithChoice));
    updateGTMConsent(consentWithChoice);
  } catch (error) {
    console.error('Error storing consent', error);
  }
};