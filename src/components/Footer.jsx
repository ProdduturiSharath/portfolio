import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useAnalytics } from './AnalyticsConsent';

export default function Footer({ personalInfo }) {
  const { openPreferences } = useAnalytics();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#hero" className="footer-brand"><span className="monogram" aria-hidden="true">s<span>c.</span></span><span>{personalInfo.name}<small>Thoughtfully engineered. Always evolving.</small></span></a>
        <span className="copyright mono">© {new Date().getFullYear()} · BUILT WITH INTENT</span>
        <div className="footer-actions"><button className="analytics-settings-link" type="button" onClick={openPreferences}>Analytics preferences</button><a href="#hero" className="back-to-top">Back to top <ArrowUpRight size={16} /></a></div>
      </div>
    </footer>
  );
}
