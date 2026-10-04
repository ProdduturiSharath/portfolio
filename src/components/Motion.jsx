import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const MotionContext = createContext({ motionEnabled: false, paused: false, toggleMotion: () => {} });

export function MotionProvider({ children }) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = event => setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const motionEnabled = !reducedMotion && !paused;
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';
    return () => { delete document.documentElement.dataset.motion; };
  }, [motionEnabled]);

  return (
    <MotionContext.Provider value={{ motionEnabled, paused, reducedMotion, toggleMotion: () => setPaused(value => !value) }}>
      {children}
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const { motionEnabled } = useMotion();

  useEffect(() => {
    const element = ref.current;
    if (!motionEnabled || !('IntersectionObserver' in window)) return;
    // Content remains visible if observers or JavaScript are unavailable.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('reveal-pending');
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        element.classList.remove('reveal-pending');
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.classList.remove('reveal-pending');
    };
  }, [motionEnabled]);

  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>;
}
