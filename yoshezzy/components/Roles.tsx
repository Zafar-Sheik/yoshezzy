'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import { images, roles } from '@/lib/data';

const tones = ['chilli', 'ocean', 'sun', 'chilli', 'ocean'] as const;

export default function Roles() {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.from('.role-row', {
        yPercent: 40,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.role-list', start: 'top 80%' },
      });

      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const fx = gsap.quickTo(float.current, 'x', { duration: 0.6, ease: 'power3' });
      const fy = gsap.quickTo(float.current, 'y', { duration: 0.6, ease: 'power3' });
      const fr = gsap.quickTo(float.current, 'rotation', { duration: 0.8, ease: 'power3' });
      let lastX = 0;

      const list = root.current!.querySelector<HTMLElement>('.role-list')!;
      const move = (e: PointerEvent) => {
        const b = list.getBoundingClientRect();
        fx(e.clientX - b.left);
        fy(e.clientY - b.top);
        fr(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      const enter = () => gsap.to(float.current, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
      const leave = () => gsap.to(float.current, { autoAlpha: 0, scale: 0.6, duration: 0.3 });

      list.addEventListener('pointermove', move);
      list.addEventListener('pointerenter', enter);
      list.addEventListener('pointerleave', leave);
      return () => {
        list.removeEventListener('pointermove', move);
        list.removeEventListener('pointerenter', enter);
        list.removeEventListener('pointerleave', leave);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="roles section">
      <p className="eyebrow">
        <span>04</span> What he does
      </p>
      <div className="role-list">
        <div ref={float} className="role-float" aria-hidden="true">
          {roles.map((r, i) => (
            <div key={r.key} className={`role-float-item ${i === active ? 'is-active' : ''}`}>
              <Photo src={images[r.key]} alt="" label={r.title} tone={tones[i]} />
            </div>
          ))}
        </div>
        {roles.map((r, i) => (
          <div className="role-row" key={r.key} onPointerEnter={() => setActive(i)} data-cursor="">
            <span className="role-idx">0{i + 1}</span>
            <h3 className="role-title">
              <span className="role-title-inner" data-text={r.title}>
                {r.title}
              </span>
            </h3>
            <p className="role-line">{r.line}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
