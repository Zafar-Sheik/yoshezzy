'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { stats } from '@/lib/data';

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.stat').forEach((s, i) => {
        const num = s.querySelector<HTMLElement>('.stat-num')!;
        const target = Number(num.dataset.value);
        const obj = { v: 0 };
        num.textContent = '0';
        gsap
          .timeline({ scrollTrigger: { trigger: s, start: 'top 85%' } })
          .from(s, { y: 60, autoAlpha: 0, duration: 1, ease: 'power4.out', delay: i * 0.08 })
          .to(
            obj,
            {
              v: target,
              duration: 1.8,
              ease: 'expo.out',
              onUpdate: () => {
                num.textContent = String(Math.round(obj.v));
              },
            },
            '<',
          )
          .from(s.querySelector('.stat-rule'), { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }, '<');
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="stats section" aria-label="Shezzy by the numbers">
      <p className="eyebrow">
        <span>03</span> By the numbers
      </p>
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <p className="stat-value">
              <span className="stat-num" data-value={s.value}>
                {s.value}
              </span>
              <span className="stat-suffix">{s.suffix}</span>
            </p>
            <span className="stat-rule" />
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="stats-note">Figures at time of writing.</p>
    </section>
  );
}
