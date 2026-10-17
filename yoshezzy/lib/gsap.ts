'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/** Run `cb` once the preloader has finished (or immediately if it already has). */
export function onReady(cb: () => void) {
  const w = window as unknown as { __shezzyReady?: boolean };
  if (w.__shezzyReady) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener('shezzy:ready', handler, { once: true });
  return () => window.removeEventListener('shezzy:ready', handler);
}

export function scrollToTarget(target: string | number) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | number, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(target, { duration: 1.4 });
  else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  else window.scrollTo({ top: target, behavior: 'smooth' });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
