'use client';

import { CSSProperties, useRef } from 'react';
import { gsap, useGSAP, scrollToTarget } from '@/lib/gsap';
import { services } from '@/lib/data';

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card');
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9,
            yPercent: -4,
            filter: 'brightness(0.55)',
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 18%', scrub: true },
          });
        });
        gsap.from('.svc-head > *', {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.svc-head', start: 'top 80%' },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="services section" id="services">
      <div className="svc-head">
        <p className="eyebrow">
          <span>05</span> Work with Shezzy
        </p>
        <h2 className="section-title">
          Brands that want <em>Mzansi</em> to actually watch.
        </h2>
      </div>
      <div className="svc-stack">
        {services.map((s, i) => (
          <article className="svc-card" key={s.title} style={{ top: `calc(14vh + ${i * 1.4}rem)`, '--i': i } as CSSProperties}>
            <span className="svc-num">0{i + 1}</span>
            <div className="svc-body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <button className="svc-cta" onClick={() => scrollToTarget('#contact')} data-cursor="Book">
              Enquire →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
