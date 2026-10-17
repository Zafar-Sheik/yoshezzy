'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, onReady } from '@/lib/gsap';
import Photo from './Photo';
import { images, roles, site } from '@/lib/data';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const split = SplitText.create(el.querySelectorAll('.hero-line'), { type: 'chars', mask: 'chars' });
      gsap.set(split.chars, { yPercent: 120 });

      const intro = gsap
        .timeline({ paused: true })
        .to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.05, ease: 'expo.out' })
        .from('.hero-sun', { scale: 0.3, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0)
        .from('.hero-photo', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0.1)
        .from('.hero-badge', { scale: 0, rotation: -40, duration: 1, ease: 'back.out(2)' }, 0.9)
        .from('.hero-kicker, .hero-role, .hero-meta > *', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out' }, 0.5)
        .from('.hero-wave path', { strokeDashoffset: 1200, duration: 2, stagger: 0.15, ease: 'power2.out' }, 0.2);

      const off = onReady(() => intro.play());

      // Rotating role word
      const words = gsap.utils.toArray<HTMLElement>('.hero-role-word');
      gsap.set(words, { yPercent: 110 });
      const roleTl = gsap.timeline({ repeat: -1 });
      words.forEach((w) => {
        roleTl.to(w, { yPercent: 0, duration: 0.6, ease: 'power3.out' }).to(w, { yPercent: -110, duration: 0.6, ease: 'power3.in' }, '+=1.4');
      });

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The Durban sun sets as you scroll away
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
          .to('.hero-sun', { yPercent: 35, scale: 0.85, ease: 'none' }, 0)
          .to('.hero-photo', { yPercent: -10, rotate: -4, ease: 'none' }, 0)
          .to('.hero-copy', { yPercent: 12, autoAlpha: 0.2, ease: 'none' }, 0)
          .to('.hero-sky', { opacity: 1, ease: 'none' }, 0);
      });

      return () => {
        off();
        roleTl.kill();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-sky" />
      <svg className="hero-wave" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 120 C 240 60, 480 180, 720 120 S 1200 60, 1440 120" pathLength={1200} />
        <path d="M0 160 C 240 100, 480 220, 720 160 S 1200 100, 1440 160" pathLength={1200} />
        <path d="M0 200 C 240 150, 480 250, 720 200 S 1200 150, 1440 200" pathLength={1200} />
      </svg>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="dot" /> {site.realName}
          </p>
          <h1 className="hero-title" aria-label={`${site.name} — ${site.realName}`}>
            <span className="hero-line l1">Yo</span>
            <span className="hero-line l2">Shezzy</span>
          </h1>
          <p className="hero-role">
            <span className="hero-role-label">Professional</span>
            <span className="hero-role-mask">
              {roles.map((r) => (
                <span key={r.key} className="hero-role-word">
                  {r.title}
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className="hero-visual">
          <div className="hero-sun" />
          <Photo src={images.hero} alt="Portrait of Shehzaad Shaik, YoShezzy" label="Shehzaad Shaik" className="hero-photo" priority />
          <span className="hero-badge">{site.catchphrase}</span>
        </div>
      </div>

      <div className="hero-meta">
        <span>Based in {site.city}</span>
        <span className="hero-scroll">
          Scroll <span className="hero-scroll-line" />
        </span>
      </div>
    </section>
  );
}
