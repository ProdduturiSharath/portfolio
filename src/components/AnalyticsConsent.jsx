import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  ANALYTICS_CONSENT_KEY, analyticsEnabled, clearAnalyticsCookies,
  getAnalyticsConsent, loadGoogleAnalytics, saveAnalyticsConsent, stopGoogleAnalytics,
  trackAnalyticsEvent,
} from '../services/analytics';

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ children }) {
  const [consent, setConsent] = useState(getAnalyticsConsent);
  const [noticeOpen, setNoticeOpen] = useState(() => analyticsEnabled && getAnalyticsConsent() === null);
  const [storageError, setStorageError] = useState('');
  const openerRef = useRef(null);
  const noticeRef = useRef(null);

  useEffect(() => {
    if (consent === 'accepted') loadGoogleAnalytics();
    else clearAnalyticsCookies();
  }, [consent]);

  useEffect(() => {
    const syncConsent = () => {
      const next = getAnalyticsConsent();
      if (next !== 'accepted' && stopGoogleAnalytics()) {
        window.location.reload();
        return;
      }
      setConsent(next);
      setNoticeOpen(analyticsEnabled && next === null);
    };
    const onStorage = event => {
      if (event.key === ANALYTICS_CONSENT_KEY || event.key === null) syncConsent();
    };
    const onVisibility = () => { if (!document.hidden) syncConsent(); };
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    const expiryCheck = window.setInterval(syncConsent, 60000);
    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(expiryCheck);
    };
  }, []);

  const closeNotice = () => {
    setNoticeOpen(false);
    openerRef.current?.focus({ preventScroll: true });
  };
  const openPreferences = event => {
    openerRef.current = event.currentTarget;
    setNoticeOpen(true);
    requestAnimationFrame(() => noticeRef.current?.focus({ preventScroll: true }));
  };
  const chooseConsent = choice => {
    // Revocation stops GA first; reload fully unloads its listeners and timers.
    const needsReload = choice === 'declined' && stopGoogleAnalytics();
    if (!saveAnalyticsConsent(choice)) {
      if (choice === 'accepted') {
        setStorageError('Your browser could not save this choice. Analytics remains off.');
        return;
      }
      try { window.localStorage.removeItem(ANALYTICS_CONSENT_KEY); } catch { /* Storage blocked. */ }
    }
    setStorageError('');
    setConsent(choice);
    closeNotice();
    if (needsReload) window.location.reload();
  };

  return (
    <AnalyticsContext.Provider value={{ consent, noticeOpen, noticeRef, storageError, openPreferences, closeNotice, chooseConsent, trackEvent: trackAnalyticsEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);

export function AnalyticsConsent() {
  const { consent, noticeOpen, noticeRef, storageError, closeNotice, chooseConsent } = useAnalytics();
  if (!analyticsEnabled || !noticeOpen) return null;

  return (
    <aside ref={noticeRef} tabIndex={-1} className="analytics-notice" aria-label="Optional analytics" role="region" onKeyDown={event => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        if (consent) closeNotice();
        else chooseConsent('declined');
      }
    }}>
      <div className="analytics-notice-heading">
        <span className="eyebrow">A SMALL REQUEST</span>
        <button className="icon-button" type="button" aria-label={consent ? 'Close analytics preferences' : 'Decline analytics and dismiss'} onClick={() => consent ? closeNotice() : chooseConsent('declined')}><X size={15} aria-hidden="true" /></button>
      </div>
      <p>May I use Google Analytics cookies to understand visits and interest in my projects?</p>
      <div className="analytics-notice-actions">
        <button type="button" onClick={() => chooseConsent('accepted')}>Allow analytics</button>
        <button type="button" onClick={() => chooseConsent('declined')}>{consent === 'accepted' ? 'Turn off analytics' : 'Not now'}</button>
        <a href={`${import.meta.env.BASE_URL}privacy.html`} target="_blank" rel="noopener noreferrer">Privacy details<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
      {consent === 'accepted' && <p className="analytics-note">Turning analytics off refreshes this page. Finish any unsent message first.</p>}
      {storageError && <p className="field-error" role="alert">{storageError}</p>}
    </aside>
  );
}
