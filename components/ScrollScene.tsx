'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** A separate transform layer keeps scroll motion clear of hover/reveal owners. */
export function ScrollScene({
  children,
  className = '',
  depth = 60,
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
  tilt?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      { desktop: '(min-width: 981px)', reduced: '(prefers-reduced-motion: reduce)' },
      (context) => {
        if (context.conditions?.reduced || !root.current) return;
        const amount = context.conditions?.desktop ? depth : Math.min(depth, 18);
        gsap.fromTo(
          root.current.firstElementChild,
          { y: amount, rotateX: context.conditions?.desktop ? tilt : 0 },
          {
            y: -amount,
            rotateX: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    );
    return () => media.revert();
  }, [depth, tilt]);
  return (
    <div ref={root} className={`scroll-scene ${className}`}>
      <div className="scroll-scene-layer">{children}</div>
    </div>
  );
}
