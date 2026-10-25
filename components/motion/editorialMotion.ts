import gsap from 'gsap';

/** Called inside the page's GSAP context, so navigation reverts every timeline. */
export function editorialMotion() {
  const media = gsap.matchMedia();
  media.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
    const contact = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
    contact
      .fromTo(
        '.contact-section h2',
        { yPercent: 28, rotateX: -18, scale: 0.85 },
        { yPercent: 0, rotateX: 0, scale: 1, ease: 'none' },
        0
      )
      .fromTo(
        '.contact-orbit',
        { rotate: -80, scale: 0.6 },
        { rotate: 100, scale: 1.4, ease: 'none' },
        0
      )
      .fromTo('.contact-bottom', { y: 65 }, { y: 0, ease: 'none' }, 0.15);
  });
  return media;
}
