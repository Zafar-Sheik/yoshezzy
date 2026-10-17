'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { press } from '@/lib/data';

export default function Press() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(root.current!.querySelector('.press-headline')!, { type: 'lines', mask: 'lines' });
      gsap.from(split.lines, {
        yPercent: 110,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.press-headline', start: 'top 80%' },
      });
      gsap.from('.press-mark', {
        scale: 0,
        rotation: -30,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="press section">
      <span className="press-mark" aria-hidden="true">
        “
      </span>
      <p className="eyebrow">
        <span>07</span> As featured in
      </p>
      <p className="press-outlet">{press.outlet}</p>
      <h2 className="press-headline">{press.headline}</h2>
      <p className="press-summary">{press.summary}</p>
      <a className="btn btn--ghost" href={press.url} target="_blank" rel="noopener noreferrer" data-cursor="Read">
        Read the feature ↗
      </a>
    </section>
  );
}
