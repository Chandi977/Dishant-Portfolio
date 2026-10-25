import gsap from 'gsap';
/** Lightweight enter and exit motion for the existing editorial composition. */
export function portfolioReveals(root: HTMLElement) {
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-motion]'));
    const offset = window.innerWidth <= 600 ? 16 : 24;
    const entered = new WeakSet<HTMLElement>();

    const state = (element: HTMLElement, above = false) => {
      switch (element.dataset.motion) {
        case 'left':
          return { from: { x: -offset }, to: { x: 0 } };
        case 'right':
          return { from: { x: offset }, to: { x: 0 } };
        case 'rise':
          return { from: { y: above ? -offset : offset }, to: { y: 0 } };
        case 'drop':
          return { from: { y: -offset }, to: { y: 0 } };
        case 'scale':
          return { from: { y: 12, scale: 0.96 }, to: { y: 0, scale: 1 } };
        case 'turn':
          return { from: { rotate: -4, scale: 0.97 }, to: { rotate: 0, scale: 1 } };
        case 'mask':
          return {
            from: { clipPath: 'inset(0 0 100% 0)' },
            to: { clipPath: 'inset(0 0 0% 0)' },
          };
        case 'wipe':
          return {
            from: { clipPath: 'inset(0 100% 0 0)' },
            to: { clipPath: 'inset(0 0% 0 0)' },
          };
        default:
          return { from: {}, to: {} };
      }
    };

    elements.forEach((element) => {
      gsap.set(element, { opacity: 0, ...state(element).from });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting && !entered.has(element)) return;
          const above = entry.boundingClientRect.bottom < 0;
          const animation = state(element, above);
          gsap.killTweensOf(element);
          if (entry.isIntersecting) {
            entered.add(element);
            gsap.to(element, {
              opacity: 1,
              ...animation.to,
              delay: Number(element.dataset.motionDelay || 0),
              duration: element.dataset.motion === 'fade' ? 0.72 : 0.8,
              ease: 'power3.out',
            });
          } else {
            gsap.to(element, {
              opacity: 0,
              ...animation.from,
              duration: 0.35,
              ease: 'power2.out',
            });
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      gsap.killTweensOf(elements);
      gsap.set(elements, { clearProps: 'opacity,transform,clipPath' });
    };
  });

  return media;
}
