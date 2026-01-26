/**
 * Mock IAB TCF API (__tcfapi) Implementation
 * 
 * Provides a lightweight, TCF-compatible API that maps our existing
 * localStorage consent to IAB TCF response formats.
 * 
 * No external dependencies, no GVL, no TC string encoding.
 * Compatible with vendors expecting standard __tcfapi interface.
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const CMP_ID = 100;
const CMP_VERSION = 1;
const CONSENT_STORAGE_KEY = 'cookieConsent';

// Map consent categories to IAB TCF Purpose IDs
const CONSENT_TO_PURPOSES = {
  necessary: [1],           // Store and/or access information on a device
  advertising: [3, 4],      // Create ads profile, Select personalized ads
  personalization: [5],     // Create personalized content profile
  analytics: [7, 9, 10],    // Measurement, Market research, Develop products
  functionality: [1]        // Store and/or access information on a device
};

// Track which commands have been logged (for medium verbosity)
const loggedCommands = new Set();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get consent data from localStorage
 * @returns {Object|null} Consent object or null if not found
 */
function getConsent() {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading consent:', error);
    return null;
  }
}

/**
 * Map consent categories to IAB purpose consents
 * @param {Object} consent - Consent object from localStorage
 * @returns {Object} Map of purpose IDs to boolean values
 */
function getPurposeConsents(consent) {
  const purposes = {};

  if (!consent) {
    // No consent = all purposes denied
    [1, 3, 4, 5, 7, 9, 10].forEach(id => {
      purposes[id] = false;
    });
    return purposes;
  }

  // Map each consent category to its purposes
  Object.entries(CONSENT_TO_PURPOSES).forEach(([category, purposeIds]) => {
    const isGranted = consent[category] === true;
    purposeIds.forEach(id => {
      purposes[id] = isGranted;
    });
  });

  return purposes;
}

/**
 * Build TCData response object (for getTCData command)
 * @param {Object} consent - Consent object from localStorage
 * @returns {Object} TCData object per IAB TCF spec
 */
function buildTCData(consent) {
  const purposes = getPurposeConsents(consent);
  const hasUserChosen = consent?.hasUserChosen === true;

  return {
    tcString: null,                    // Not encoding real TC strings
    tcfPolicyVersion: 2,
    cmpId: CMP_ID,
    cmpVersion: CMP_VERSION,
    gdprApplies: true,                 // Always true per spec
    eventStatus: hasUserChosen ? 'useractioncomplete' : 'cmpuishown',
    cmpStatus: 'loaded',
    listenerId: null,                  // Set by addEventListener
    isServiceSpecific: false,
    useNonStandardStacks: false,
    publisherCC: 'ES',                 // Spain
    purposeOneTreatment: false,
    outOfBand: {
      allowedVendors: {},
      disclosedVendors: {}
    },
    purpose: {
      consents: purposes,
      legitimateInterests: {}
    },
    vendor: {
      consents: {},
      legitimateInterests: {}
    },
    specialFeatureOptins: {},
    publisher: {
      consents: {},
      legitimateInterests: {},
      customPurpose: {
        consents: {},
        legitimateInterests: {}
      },
      restrictions: {}
    }
  };
}

/**
 * Build ping response object (for ping command)
 * @param {Object} consent - Consent object from localStorage
 * @returns {Object} Ping response per IAB TCF spec
 */
function buildPingReturn(consent) {
  const hasUserChosen = consent?.hasUserChosen === true;

  return {
    gdprApplies: true,
    cmpLoaded: true,
    cmpStatus: 'loaded',
    displayStatus: hasUserChosen ? 'hidden' : 'visible',
    apiVersion: '2.0',
    cmpVersion: CMP_VERSION,
    cmpId: CMP_ID,
    gvlVersion: 1,                     // Minimal version (no real GVL)
    tcfPolicyVersion: 2
  };
}

/**
 * Build empty vendor list (for getVendorList command)
 * @returns {Object} Empty vendor list structure
 */
function buildVendorList() {
  return {
    gvlSpecificationVersion: 2,
    vendorListVersion: 1,
    tcfPolicyVersion: 2,
    lastUpdated: new Date().toISOString(),
    purposes: {
      1: { id: 1, name: "Store and/or access information on a device" },
      3: { id: 3, name: "Create a personalised ads profile" },
      4: { id: 4, name: "Select personalised ads" },
      5: { id: 5, name: "Create a personalised content profile" },
      7: { id: 7, name: "Measure ad performance" },
      9: { id: 9, name: "Apply market research to generate audience insights" },
      10: { id: 10, name: "Develop and improve products" }
    },
    specialPurposes: {},
    features: {},
    specialFeatures: {},
    vendors: {}                        // Empty - no vendors tracked
  };
}

/**
 * Log command (medium verbosity - only first call of each type)
 * @param {string} command - Command name
 * @param {string} extraInfo - Additional info to log
 */
function logCommand(command, extraInfo) {
  if (!loggedCommands.has(command)) {
    console.log(`__tcfapi('${command}')${extraInfo ? ' - ' + extraInfo : ''}`);
    loggedCommands.add(command);
  }
}

// ============================================================================
// EVENT LISTENER MANAGEMENT
// ============================================================================

const eventListeners = new Map();
let listenerIdCounter = 0;

// ============================================================================
// MAIN __tcfapi FUNCTION
// ============================================================================

/**
 * Main __tcfapi function implementation
 * @param {string} command - Command to execute
 * @param {number} version - API version (should be 2)
 * @param {function} callback - Callback function
 * @param {*} parameter - Optional parameter (used by removeEventListener)
 */
function tcfapi(command, version, callback, parameter) {
  // Validate callback
  if (typeof callback !== 'function') {
    console.warn('__tcfapi: callback must be a function');
    return;
  }

  // Get current consent state
  const consent = getConsent();

  // Execute command
  switch (command) {
    case 'ping': {
      logCommand('ping', 'cmpLoaded: true');
      const pingReturn = buildPingReturn(consent);
      callback(pingReturn, true);
      break;
    }

    case 'getTCData': {
      const hasUserChosen = consent?.hasUserChosen === true;
      logCommand('getTCData', `hasUserChosen: ${hasUserChosen}`);
      const tcData = buildTCData(consent);
      callback(tcData, true);
      break;
    }

    case 'getVendorList': {
      logCommand('getVendorList', 'returning minimal vendor list');
      const vendorList = buildVendorList();
      callback(vendorList, true);
      break;
    }

    case 'addEventListener': {
      const listenerId = listenerIdCounter++;
      eventListeners.set(listenerId, callback);
      logCommand('addEventListener', `listener registered: ${listenerId}`);

      const tcData = buildTCData(consent);
      tcData.listenerId = listenerId;
      callback(tcData, true);
      break;
    }

    case 'removeEventListener': {
      const success = eventListeners.delete(parameter);
      if (success) {
        logCommand('removeEventListener', `listener removed: ${parameter}`);
      }
      callback(success, true);
      break;
    }

    default:
      console.warn(`__tcfapi: unknown command "${command}"`);
      callback(null, false);
  }
}

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

/**
 * Trigger consent change event for all registered listeners
 * Called when user updates consent preferences
 */
export function triggerConsentChange() {
  if (eventListeners.size === 0) return;

  const consent = getConsent();
  const tcData = buildTCData(consent);

  eventListeners.forEach((callback, listenerId) => {
    tcData.listenerId = listenerId;
    try {
      callback(tcData, true);
    } catch (error) {
      console.error(`Error in __tcfapi listener ${listenerId}:`, error);
    }
  });

  console.log(`__tcfapi: notified ${eventListeners.size} listener(s) of consent change`);
}

/**
 * Initialize __tcfapi on window object
 * Processes any queued commands from stub
 */
export function initializeTcfApi() {
  if (typeof window === 'undefined') return;

  // Get queued commands from stub (if exists)
  const queue = window.__tcfapi?.queue || [];

  // Set up __tcfapi function
  window.__tcfapi = tcfapi;

  // Process queued commands
  if (queue.length > 0) {
    console.log(`__tcfapi: processing ${queue.length} queued command(s)`);
    queue.forEach(args => {
      try {
        tcfapi.apply(null, args);
      } catch (error) {
        console.error('Error processing queued __tcfapi command:', error);
      }
    });
  }

  console.log('Mock __tcfapi initialized successfully');
}
