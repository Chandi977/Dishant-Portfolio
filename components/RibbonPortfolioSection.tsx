'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import TrionnRibbon from '@/components/ribbon/TrionnRibbon';
import RibbonStoryDialog from '@/components/ribbon/RibbonStoryDialog';
import { subscribeToScroll } from '@/components/motion/scrollDriver';

export default function RibbonPortfolioSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const requestRenderRef = useRef<(() => void) | null>(null);
  const reduceMotion = useReducedMotion();
  const [runwayViewports, setRunwayViewports] = useState(5.75);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const openStory = useCallback((id: string) => setActiveStoryId(id), []);
  const closeStory = useCallback(() => setActiveStoryId(null), []);

  useEffect(() => {
    const viewportCount = () => {
      if (reduceMotion) return 1;
      return window.matchMedia('(min-width: 768px)').matches ? 5.75 : 4.5;
    };
    const compute = () => setRunwayViewports(viewportCount());
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [reduceMotion]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const update = () => {
      const top = wrapper.getBoundingClientRect().top;
      const range = wrapper.offsetHeight - window.innerHeight;
      const next = range > 0 ? Math.max(0, Math.min(1, -top / range)) : 0;
      if (Math.abs(progressRef.current - next) < 0.0001) return;
      progressRef.current = next;
      requestRenderRef.current?.();
    };

    const unsubscribe = subscribeToScroll(update);
    window.addEventListener('resize', update);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full bg-[#f1efea] ribbon-portfolio-section"
      style={{
        height: reduceMotion ? '100dvh' : `${runwayViewports * 100}dvh`,
        minHeight: reduceMotion ? '100svh' : `${runwayViewports * 100}svh`,
      }}
    >
      {/* Sticky stage pins the ribbon while progress drives the whole motion */}
      <div
        className="ribbon-mobile-stage sticky top-0 w-full overflow-hidden select-none"
        style={{ height: '100dvh', minHeight: '100svh' }}
      >
        <TrionnRibbon
          progressRef={progressRef}
          requestRenderRef={requestRenderRef}
          onProjectSelect={openStory}
        />
      </div>
      {activeStoryId && (
        <RibbonStoryDialog projectId={activeStoryId} onClose={closeStory} onSelect={openStory} />
      )}
    </section>
  );
}
