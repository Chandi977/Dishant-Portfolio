'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CaseHeroProps {
  title: string;
  number: string;
  category: string;
  year: string;
}

export default function CaseHero({ title, number, category, year }: CaseHeroProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.case-word-mask',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.05,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.15,
        }
      );
      gsap.fromTo(
        '.case-reveal-word',
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.15,
        }
      );

      gsap.fromTo(
        '.case-hero-meta > *',
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

    }, root);
    return () => ctx.revert();
  }, [reduceMotion]);

  const words = title.split(' ').filter(Boolean);
  const wordSpans = words.map((word, wordIndex) => (
    <span className="case-word-mask" key={`word-${wordIndex}`}>
      <span className="case-reveal-word">{word}</span>
      {wordIndex < words.length - 1 && <span className="case-word-space"> </span>}
    </span>
  ));

  return (
    <section ref={root} className="case-hero">
      <div className="case-hero-content">
        <div className="case-hero-meta">
          <span className="case-hero-number">{number}</span>
          <span className="case-hero-category">{category}</span>
          <span className="case-hero-year">{year}</span>
        </div>
        <h1 className="case-hero-title" aria-label={title}>
          {wordSpans}
        </h1>
      </div>
    </section>
  );
}
