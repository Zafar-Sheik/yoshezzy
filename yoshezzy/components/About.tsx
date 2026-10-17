'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import { images, site } from '@/lib/data';

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create(el.querySelector('.about-lede')!, { type: 'words' });
        gsap.from(split.words, {
          opacity: 0.1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.about-lede', start: 'top 80%', end: 'bottom 50%', scrub: true },
        });

        gsap.from('.about-photo', {
          clipPath: 'inset(0% 0% 100% 0%)',
          ease: 'expo.inOut',
          duration: 1.4,
          scrollTrigger: { trigger: '.about-photo', start: 'top 85%' },
        });
        gsap.to('.about-photo img, .about-photo .art-mono', {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: true },
        });

        gsap.from('.about-facts li', {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-facts', start: 'top 85%' },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="about section" id="story">
      <p className="eyebrow">
        <span>01</span> The story
      </p>
      <div className="about-grid">
        <p className="about-lede">
          Shehzaad Shaik is the cheeky Durban grin behind <em>{site.catchphrase}</em> — the greeting that took over South African For You
          pages. A kid from the suburbs who hustled at school, posted one video on a whim and woke up to 400,000 views. Now he&apos;s an
          influencer, model, actor, baller and artist with a team behind him and a city in his corner.
        </p>
        <div className="about-side">
          <Photo src={images.about} alt="Shezzy in Durban" label="Durban, ZA" className="about-photo" tone="ocean" />
          <ul className="about-facts">
            <li>
              <span>Home</span>Durban, KwaZulu-Natal
            </li>
            <li>
              <span>Known for</span>“{site.catchphrase}”
            </li>
            <li>
              <span>Content</span>Street humour · Skits · Lifestyle
            </li>
            <li>
              <span>Motto</span>Not trying to be anyone else
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
