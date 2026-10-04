import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { name: 'Selected work', href: '#projects' },
  { name: 'Expertise', href: '#skills' },
  { name: 'Experience', href: '#experience' },
];

export default function Navbar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointerDown = event => {
      if (!headerRef.current?.contains(event.target)) setMobileMenuOpen(false);
    };
    const query = window.matchMedia('(min-width: 800px)');
    const onResize = event => { if (event.matches) setMobileMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    query.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      query.removeEventListener('change', onResize);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container nav-inner">
        <a href="#hero" className="wordmark" aria-label="Sharath Chandra, back to home" onClick={() => setMobileMenuOpen(false)}>
          <span className="monogram" aria-hidden="true">s<span>c.</span></span>
          <span>Sharath Chandra<span className="wordmark-role">AI ENGINEER</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(link => (
            <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}>{link.name}</a>
          ))}
        </nav>
        <a className="nav-contact" href="#contact">Let's talk <ArrowUpRight size={15} /></a>
        <button ref={menuButton} className="icon-button menu-toggle" aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen(value => !value)}>
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!mobileMenuOpen}>
        {[...links, { name: 'Get in touch', href: '#contact' }].map((link, index) => (
          <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}>
            <span className="mono">0{index + 1}</span>{link.name}<ArrowUpRight size={17} />
          </a>
        ))}
        <a href={`${import.meta.env.BASE_URL}Sharath_Chandra_AI_Engineer_Resume.pdf`} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>View résumé <ArrowUpRight size={17} /></a>
      </nav>
    </header>
  );
}
