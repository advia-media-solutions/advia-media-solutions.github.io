// src/utils/urlUtils.js
export const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export const getUtmParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  UTM_PARAMS.forEach(param => {
    const value = searchParams.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });
  
  return utmParams;
};

export const preserveUtmParams = (to) => {
  const utmParams = getUtmParams();
  
  // If there are no UTM parameters, return the original URL
  if (Object.keys(utmParams).length === 0) {
    return to;
  }
  
  // Parse the destination URL
  const url = new URL(to, window.location.origin);
  const searchParams = new URLSearchParams(url.search);
  
  // Add UTM parameters
  Object.entries(utmParams).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  
  // Construct the new URL
  url.search = searchParams.toString();
  
  // Return just the pathname + search if it's an internal URL
  return `${url.pathname}${url.search}`;
};