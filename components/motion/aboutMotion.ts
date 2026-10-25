import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lockScroll, unlockScroll } from './scrollLock';

/** The About section uses a composed entrance and separate mobile reading stages. */
export function aboutMotion(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>('[data-about-section]');
  if (!section) return null;

  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const one = (name: string) => section.querySelector<HTMLElement>(`[data-about="${name}"]`)!;
    const all = (name: string) =>
      Array.from(section.querySelectorAll<HTMLElement>(`[data-about="${name}"]`));

    const desktop = window.matchMedia('(min-width: 601px)').matches;

    // The section frames itself under the fixed nav, so the lock starts once
    // the banner has cleared it.
    const navHeight = (() => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')
        .trim();
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 70;
    })();
    const start = `top top+=${navHeight}px`;

    /** Masthead, folio, portrait and margin notes. */
    const addTop = (timeline: gsap.core.Timeline) => {
      timeline
        .fromTo(
          one('banner'),
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.88, ease: 'power3.inOut' },
          0
        )
        .fromTo(one('folio'), { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.66 }, 0.16)
        .fromTo(
          one('folio-rule'),
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.75 },
          0.38
        )
        .fromTo(
          all('title-line')[0],
          { yPercent: 105 },
          { yPercent: 0, duration: 1.03, ease: 'power4.out' },
          0.2
        )
        .fromTo(
          all('title-line')[1],
          { x: -33, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.96, ease: 'power4.out' },
          0.38
        )
        .fromTo(
          one('portrait'),
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.06, ease: 'power3.inOut' },
          0.34
        )
        .fromTo(
          one('portrait').querySelector('img'),
          { scale: 1.06 },
          { scale: 1, duration: 1.25, ease: 'power3.out' },
          0.34
        )
        .fromTo(
          all('margin-word')[0],
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.84
        )
        .fromTo(
          all('margin-word')[1],
          { x: -12, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.53 },
          0.92
        )
        .fromTo(
          all('margin-word')[2],
          { x: 12, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.53 },
          1
        )
        .fromTo(
          one('margin-rule'),
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.58 },
          1.12
        );
    };

    /** Name, role and the two reading paragraphs. */
    const addIdentity = (timeline: gsap.core.Timeline, at: number) => {
      timeline
        .fromTo(
          one('first-name'),
          { x: -28, y: 12, rotate: -7, opacity: 0 },
          { x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.82 },
          at + 0.18
        )
        .fromTo(
          one('last-name'),
          { y: 28, clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          { y: 0, clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.91 },
          at + 0.32
        )
        .fromTo(one('role'), { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65 }, at + 0.69)
        .fromTo(
          one('red-rule'),
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.55 },
          at + 0.83
        )
        .fromTo(one('intro'), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.74 }, at + 0.9)
        .fromTo(
          one('highlight'),
          { color: '#22211f' },
          { color: '#a1261e', duration: 0.55 },
          at + 1.12
        )
        .fromTo(
          one('description'),
          { y: 17, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72 },
          at + 1.12
        );
    };

    /** Expertise heading and the capability list. */
    const addDetails = (timeline: gsap.core.Timeline, at: number) => {
      timeline
        .fromTo(one('expertise'), { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.62 }, at)
        .fromTo(
          one('expertise-rule'),
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.65 },
          at + 0.19
        )
        .fromTo(
          all('list-item')[0],
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.61 },
          at + 0.22
        )
        .fromTo(
          all('list-item')[1],
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.61 },
          at + 0.31
        )
        .fromTo(
          all('list-item')[2],
          { x: 18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.61 },
          at + 0.4
        )
        .fromTo(
          all('list-item')[3],
          { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.68 },
          at + 0.49
        );
    };

    // Desktop frames the whole section in one viewport, so every block runs as
    // one held sequence. Mobile keeps the reading blocks tied to the scroll.
    const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    addTop(timeline);
    if (desktop) {
      addIdentity(timeline, 0.42);
      addDetails(timeline, 1.42);
    }

    let held = false;
    const hold = () => {
      if (held) return;
      held = true;
      lockScroll();
    };
    const release = () => {
      if (!held) return;
      held = false;
      unlockScroll();
    };
    timeline.eventCallback('onComplete', release);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start,
      onEnter: () => {
        hold();
        timeline.play(0);
      },
      onLeaveBack: () => {
        release();
        timeline.reverse();
      },
    });

    const pending = new Map<Element, gsap.core.Tween>();
    const sequences = new Map<Element, { timeline: gsap.core.Timeline; delay: number }>();

    if (!desktop) {
      const identity = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      addIdentity(identity, 0);
      const details = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      addDetails(details, 0);
      sequences.set(one('profile'), { timeline: identity, delay: 0.28 });
      sequences.set(one('expertise'), { timeline: details, delay: 0.12 });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sequence = sequences.get(entry.target);
          if (!sequence) return;
          pending.get(entry.target)?.kill();
          pending.delete(entry.target);
          if (entry.isIntersecting) {
            const delay = sequence.delay;
            if (delay === 0) sequence.timeline.play();
            else
              pending.set(
                entry.target,
                gsap.delayedCall(delay, () => {
                  pending.delete(entry.target);
                  sequence.timeline.play();
                })
              );
          } else sequence.timeline.reverse();
        });
      },
      { rootMargin: '0px 0px -12% 0px' }
    );

    sequences.forEach((_, element) => observer.observe(element));

    return () => {
      observer.disconnect();
      pending.forEach((call) => call.kill());
      trigger.kill();
      release();
    };
  });

  media.add('(min-width: 601px) and (prefers-reduced-motion: no-preference)', () => {
    const title = section.querySelector<HTMLElement>('#reference-about-title');
    const portrait = section.querySelector<HTMLElement>("[data-about='portrait'] img");
    const margin = section.querySelector<HTMLElement>("[data-about='margin-word']")?.parentElement;
    if (title)
      gsap.to(title, {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.7 },
      });
    if (portrait)
      gsap.fromTo(
        portrait,
        { yPercent: -2 },
        {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        }
      );
    if (margin)
      gsap.to(margin, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      });
  });

  return media;
}
