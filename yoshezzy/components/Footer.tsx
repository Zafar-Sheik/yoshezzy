'use client';

import { useRef } from 'react';
import { gsap, useGSAP, scrollToTarget } from '@/lib/gsap';
import { site, socials } from '@/lib/data';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.footer-letter', {
        yPercent: 100,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="footer">
      <div className="footer-top">
        <p className="footer-catch">{site.catchphrase}</p>
        <ul className="footer-links">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
        <button className="footer-top-btn" onClick={() => scrollToTarget(0)} data-cursor="Up">
          Back to top ↑
        </button>
      </div>
      <p className="footer-giant" aria-hidden="true">
        {'SHEZZY'.split('').map((l, i) => (
          <span className="mask" key={i}>
            <span className="footer-letter">{l}</span>
          </span>
        ))}
      </p>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.realName}
        </span>
        <span>Made in Durban, ZA</span>
      </div>
    </footer>
  );
}
