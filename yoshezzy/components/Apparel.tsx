'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import { images, socials } from '@/lib/data';

const badge = 'Shez Apparel • Durban made • CEO Shezzy • ';

export default function Apparel() {
  const root = useRef<HTMLElement>(null);
  const whatsapp = socials.find((s) => s.name === 'Shez Apparel')!;

  useGSAP(
    () => {
      gsap.to('.badge-ring', {
        rotation: 360,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.from('.apparel-word', {
        yPercent: 100,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.apparel-title', start: 'top 80%' },
      });
      gsap.from('.apparel-photo', {
        scale: 1.15,
        clipPath: 'inset(15% 15% 15% 15% round 60px)',
        ease: 'none',
        scrollTrigger: { trigger: '.apparel-photo', start: 'top bottom', end: 'center center', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="apparel section" id="apparel">
      <div className="apparel-copy">
        <p className="eyebrow">
          <span>06</span> The brand
        </p>
        <h2 className="apparel-title">
          <span className="mask">
            <span className="apparel-word">Shez</span>
          </span>
          <span className="mask">
            <span className="apparel-word outline">Apparel</span>
          </span>
        </h2>
        <p className="apparel-body">
          The hustle that started with buying and selling at school grew up. Shez Apparel is Shezzy&apos;s own clothing line — the same
          relaxed, unmistakably Durban drip you see in the videos.
        </p>
        <a className="btn btn--solid" href={whatsapp.url} target="_blank" rel="noopener noreferrer" data-cursor="Join">
          Join the drop list on WhatsApp
        </a>
      </div>
      <div className="apparel-visual">
        <Photo src={images.apparel} alt="Shez Apparel clothing" label="Shez Apparel" className="apparel-photo" tone="sun" />
        <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <g className="badge-ring">
            <text>
              <textPath href="#badge-circle" textLength="486" lengthAdjust="spacing">
                {badge}
              </textPath>
            </text>
          </g>
          <text x="100" y="112" textAnchor="middle" className="badge-core">
            SZ
          </text>
        </svg>
      </div>
    </section>
  );
}
