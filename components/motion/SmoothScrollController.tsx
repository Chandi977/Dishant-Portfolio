'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { updateScrollScenes } from './scrollDriver';
import { registerScrollSource } from './scrollLock';

/** The only smooth-scroll instance and scroll event source for the app. */
export default function SmoothScrollController() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const update = () => {
      ScrollTrigger.update();
      updateScrollScenes();
    };

    if (reduceMotion) {
      window.addEventListener('scroll', update, { passive: true });
      update();
      return () => window.removeEventListener('scroll', update);
    }

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, anchors: true });
    registerScrollSource(lenis);
    lenis.on('scroll', update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    update();

    return () => {
      registerScrollSource(null);
      lenis.off('scroll', update);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      updateScrollScenes();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
