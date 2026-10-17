'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { socials } from '@/lib/data';

export default function Socials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.social-row', {
        xPercent: -8,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.social-list', start: 'top 80%' },
      });

      // Magnetic arrows
      if (!window.matchMedia('(hover: hover)').matches) return;
      const rows = gsap.utils.toArray<HTMLElement>('.social-row');
      const cleanups = rows.map((row) => {
        const arrow = row.querySelector<HTMLElement>('.social-arrow')!;
        const move = (e: PointerEvent) => {
          const b = arrow.getBoundingClientRect();
          gsap.to(arrow, {
            x: (e.clientX - (b.left + b.width / 2)) * 0.25,
            y: (e.clientY - (b.top + b.height / 2)) * 0.35,
            duration: 0.5,
            ease: 'power3.out',
          });
        };
        const leave = () => gsap.to(arrow, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
        row.addEventListener('pointermove', move);
        row.addEventListener('pointerleave', leave);
        return () => {
          row.removeEventListener('pointermove', move);
          row.removeEventListener('pointerleave', leave);
        };
      });
      return () => cleanups.forEach((c) => c());
    },
    { scope: root },
  );

  return (
    <section ref={root} className="socials section" id="socials">
      <p className="eyebrow">
        <span>08</span> Follow the madness
      </p>
      <ul className="social-list">
        {socials.map((s) => (
          <li key={s.name}>
            <a className="social-row" href={s.url} target="_blank" rel="noopener noreferrer" data-cursor="Open">
              <span className="social-name">{s.name}</span>
              <span className="social-handle">{s.handle}</span>
              <span className="social-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
