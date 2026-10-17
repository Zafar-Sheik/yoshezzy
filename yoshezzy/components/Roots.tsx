'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { chapters } from '@/lib/data';

export default function Roots() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const track = el.querySelector<HTMLElement>('.roots-track')!;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const scroller = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set('.roots-progress span', { scaleX: self.progress }),
          },
        });

        gsap.utils.toArray<HTMLElement>('.chapter').forEach((ch) => {
          gsap.from(ch.querySelectorAll('.ch-anim'), {
            y: 70,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: ch, containerAnimation: scroller, start: 'left 70%', toggleActions: 'play none none reverse' },
          });
          const place = ch.querySelector('.ch-place');
          if (!place) return;
          gsap.fromTo(
            place,
            { xPercent: 20 },
            {
              xPercent: -30,
              ease: 'none',
              scrollTrigger: { trigger: ch, containerAnimation: scroller, start: 'left right', end: 'right left', scrub: true },
            },
          );
        });
      });

      mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
        gsap.utils.toArray<HTMLElement>('.chapter').forEach((ch) => {
          gsap.from(ch.querySelectorAll('.ch-anim'), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: ch, start: 'top 80%' },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="roots" id="roots">
      <div className="roots-head">
        <p className="eyebrow">
          <span>02</span> Where he comes from
        </p>
        <div className="roots-progress" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="roots-track">
        <div className="chapter chapter--intro">
          <h2 className="ch-anim roots-title">
            Made in
            <br />
            <em>Durban.</em>
          </h2>
          <p className="ch-anim roots-sub">Five chapters, four suburbs, one hustle. Keep scrolling →</p>
        </div>
        {chapters.map((c) => (
          <article className="chapter" key={c.n}>
            <span className="ch-place" aria-hidden="true">
              {c.place}
            </span>
            <span className="ch-anim ch-num">{c.n}</span>
            <h3 className="ch-anim ch-title">{c.title}</h3>
            <p className="ch-anim ch-body">{c.body}</p>
          </article>
        ))}
        <div className="chapter chapter--outro">
          <p className="ch-anim roots-quote">
            “Durban is still home.
            <br />
            That&apos;s where the hustle started.”
          </p>
          <span className="ch-anim roots-cite">— Shezzy, to the Independent on Saturday</span>
        </div>
      </div>
    </section>
  );
}
