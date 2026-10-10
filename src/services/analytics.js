// Public web-stream identifier, not an account credential.
export const GOOGLE_ANALYTICS_ID = 'G-WY6C2R6LT7';
export const ANALYTICS_CONSENT_KEY = 'portfolio.analytics.consent.v1';
const SCRIPT_ID = 'portfolio-google-analytics';
const DISABLE_KEY = `ga-disable-${GOOGLE_ANALYTICS_ID}`;
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const testMode = import.meta.env.MODE === 'analytics-test';

// Local development, previews, and ordinary tests never contact Google.
export const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED !== 'false' && (
  (import.meta.env.PROD && window.location.hostname === 'prodduturisharath.github.io') ||
  (testMode && ['localhost', '127.0.0.1'].includes(window.location.hostname))
);

let initialized = false;
window[DISABLE_KEY] = true;

export function getAnalyticsConsent() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(ANALYTICS_CONSENT_KEY));
    if (stored && ['accepted', 'declined'].includes(stored.choice) &&
      Number.isFinite(stored.expires) && stored.expires > Date.now()) return stored.choice;
  } catch { /* Fail closed for unavailable storage or invalid preferences. */ }
  return null;
}

export function saveAnalyticsConsent(choice) {
  if (!['accepted', 'declined'].includes(choice)) return false;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify({
      choice, expires: Date.now() + CONSENT_LIFETIME,
    }));
    return getAnalyticsConsent() === choice;
  } catch {
    return false;
  }
}

export function clearAnalyticsCookies() {
  // Only this portfolio's GA cookies, never unrelated site preferences.
  const names = ['_ga', `_ga_${GOOGLE_ANALYTICS_ID.slice(2)}`];
  const hostname = window.location.hostname;
  const domains = ['', hostname, `.${hostname}`];
  const paths = ['/', '/portfolio', '/portfolio/'];
  for (const name of names) for (const domain of domains) for (const path of paths) {
    document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
  }
}

export function stopGoogleAnalytics() {
  // Disable collection before a reload/unload could flush engagement events.
  window[DISABLE_KEY] = true;
  document.getElementById(SCRIPT_ID)?.remove();
  clearAnalyticsCookies();
  if (initialized) {
    window.dataLayer = [];
    window.gtag = () => {};
  }
  return initialized;
}

function safePageContext() {
  // Do not send arbitrary query strings, fragments, titles or referrer paths.
  let referrer = '';
  try { referrer = new URL(document.referrer).origin; } catch { /* Direct visit. */ }
  return {
    page_location: `${window.location.origin}${import.meta.env.BASE_URL}`,
    page_title: 'Sharath Chandra | AI Engineer Portfolio',
    page_referrer: referrer,
  };
}

export function loadGoogleAnalytics() {
  if (!analyticsEnabled || getAnalyticsConsent() !== 'accepted' || initialized) return;
  initialized = true;
  window[DISABLE_KEY] = false;
  window.dataLayer = [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  // Basic consent mode: these commands and the tag exist only AFTER opt-in.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    ...safePageContext(),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: window.location.hostname,
    cookie_path: import.meta.env.BASE_URL,
    cookie_expires: CONSENT_LIFETIME / 1000,
    cookie_update: false,
    send_page_view: true,
  });
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);
}

const projectIds = ['enterprise-multi-agent-platform', 'slm-instruction-fine-tuning', 'enterprise-rag-document-intelligence'];
const eventSchema = {
  section_view: { section_name: ['hero', 'projects', 'skills', 'experience', 'contact'] },
  project_open: { project_id: projectIds },
  architecture_expand: { project_id: projectIds },
  resume_click: { button_location: ['header', 'hero', 'experience'] },
  contact_link_click: { link_type: ['email', 'phone', 'github', 'linkedin'] },
  contact_submit_success: {},
};

export function trackAnalyticsEvent(name, parameters = {}) {
  if (!analyticsEnabled || !initialized || window[DISABLE_KEY] || getAnalyticsConsent() !== 'accepted') return false;
  const schema = eventSchema[name];
  if (!schema) return false;
  const safeParameters = {};
  for (const [key, allowedValues] of Object.entries(schema)) {
    if (!allowedValues.includes(parameters[key])) return false;
    safeParameters[key] = parameters[key];
  }
  // No free text, URLs, form fields, or arbitrary dimensions are accepted.
  window.gtag('event', name, { ...safeParameters, ...safePageContext(), send_to: GOOGLE_ANALYTICS_ID });
  return true;
}
