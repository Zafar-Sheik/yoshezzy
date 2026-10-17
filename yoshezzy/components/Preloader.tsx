'use client';

import { useRef, useState } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = root.current!;
      const html = document.documentElement;
      const finish = () => {
        html.classList.remove('is-loading');
        (window as unknown as { __shezzyReady?: boolean }).__shezzyReady = true;
        window.dispatchEvent(new Event('shezzy:ready'));
        setDone(true);
      };

      html.classList.add('is-loading');
      window.scrollTo(0, 0);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finish();
        return;
      }

      const num = el.querySelector('.pl-num')!;
      const split = SplitText.create(el.querySelectorAll('.pl-word'), { type: 'chars', mask: 'chars' });
      const counter = { v: 0 };

      gsap
        .timeline({ onComplete: finish })
        .to(counter, {
          v: 100,
          duration: 1.7,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(3, '0');
          },
        })
        .to('.pl-bar', { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
        .from(split.chars, { yPercent: 110, duration: 0.7, stagger: 0.035, ease: 'power4.out' }, 0.15)
        .to(split.chars, { yPercent: -110, duration: 0.45, stagger: 0.015, ease: 'power3.in' }, '+=0.2')
        .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=0.15');
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pl-words">
        <span className="pl-word">Watkine,</span>
        <span className="pl-word pl-accent">Booooi!</span>
      </div>
      <div className="pl-foot">
        <span>Durban · KZN · ZA</span>
        <span className="pl-num">000</span>
      </div>
      <div className="pl-bar" />
    </div>
  );
}
