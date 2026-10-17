'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

type Props = { items: string[]; tone?: 'chilli' | 'cream'; tilt?: number; reverse?: boolean };

export default function Marquee({ items, tone = 'chilli', tilt = -2, reverse = false }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const track = root.current!.querySelector('.mq-track')!;
      const base = reverse ? -1 : 1;
      const loop = gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
      loop.totalTime(loop.duration() * 100); // allow negative timeScale without hitting t=0
      loop.timeScale(base);

      // Scroll velocity boosts and flips the marquee
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction * base;
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 250);
          gsap.to(loop, {
            timeScale: dir * boost,
            duration: 0.2,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: dir, duration: 1.2, ease: 'power2.out' });
            },
          });
        },
      });
    },
    { scope: root },
  );

  const row = (
    <div className="mq-group">
      {items.map((t, i) => (
        <span key={i} className="mq-item">
          {t}
          <span className="mq-star" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`marquee marquee--${tone}`} style={{ transform: `rotate(${tilt}deg)` }} aria-label={items.join(', ')}>
      <div className="mq-track" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
