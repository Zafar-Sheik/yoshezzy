'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');

    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.1, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]');
      const text = t?.dataset.cursor ?? '';
      if (label.current) label.current.textContent = text;
      gsap.to(ring.current, {
        scale: t ? (text ? 2.6 : 1.8) : 1,
        backgroundColor: t && text ? 'var(--chilli)' : 'rgba(0,0,0,0)',
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(dot.current, { scale: t ? 0 : 1, duration: 0.25 });
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  });

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
