'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, onReady, scrollToTarget } from '@/lib/gsap';

const links = [
  { href: '#story', label: 'Story' },
  { href: '#roots', label: 'Roots' },
  { href: '#services', label: 'Services' },
  { href: '#apparel', label: 'Apparel' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  useGSAP(() => {
    gsap.set(bar.current, { yPercent: -120 });
    const off = onReady(() => gsap.to(bar.current, { yPercent: 0, duration: 1, ease: 'expo.out', delay: 0.6 }));

    ScrollTrigger.create({
      start: 'top -120',
      end: 'max',
      onUpdate: (self) => {
        if (openRef.current) return;
        gsap.to(bar.current, { yPercent: self.direction === 1 ? -120 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      },
      onToggle: (self) => bar.current?.classList.toggle('nav--solid', self.isActive),
    });
    return off;
  });

  const go = (href: string) => {
    setOpen(false);
    requestAnimationFrame(() => scrollToTarget(href));
  };

  const linkList = (cls: string) => (
    <nav className={cls} aria-label="Main">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          onClick={(e) => {
            e.preventDefault();
            go(l.href);
          }}
        >
          <span data-text={l.label}>{l.label}</span>
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <div className={`nav-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {linkList('nav-overlay-links')}
      </div>
      <header ref={bar} className={`nav ${open ? 'nav--open' : ''}`}>
        <button className="nav-logo" onClick={() => go('#top')} aria-label="Back to top">
          Shezzy<sup>DBN</sup>
        </button>
        {linkList('nav-links')}
        <a
          className="nav-cta"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            go('#contact');
          }}
        >
          Book Shezzy
        </a>
        <button className="nav-burger" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </header>
    </>
  );
}
