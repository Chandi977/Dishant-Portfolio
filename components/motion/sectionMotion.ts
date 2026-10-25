import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type RevealOpts = {
  y?: number;
  x?: number;
  scale?: number;
  rotateX?: number;
  rotate?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/**
 * Per-section GSAP orchestration: parallax, depth, abstract and multi-component
 * reveals across every homepage section. Runs inside the page GSAP context so
 * navigation reverts every timeline. Desktop only (>=981px, no reduced motion);
 * mobile uses the lighter stagger passes wired in PortfolioClient.
 */
export function sectionMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  const EASE = 'power3.out';

  const reveal = (
    target: string,
    {
      y = 34,
      x = 0,
      scale = 1,
      rotateX = 0,
      rotate = 0,
      stagger = 0.07,
      duration = 0.95,
      start = 'top 85%',
    }: RevealOpts = {}
  ) => {
    const els = gsap.utils.toArray<HTMLElement>(target);
    if (!els.length) return;
    gsap.from(els, {
      y,
      x,
      scale,
      rotateX,
      rotate,
      opacity: 0,
      duration,
      stagger,
      ease: EASE,
      scrollTrigger: { trigger: els[0], start, once: true },
    });
  };

  const clipSlide = (target: string, extra: Partial<gsap.TweenVars> = {}, start = 'top 88%') => {
    const els = gsap.utils.toArray<HTMLElement>(target);
    if (!els.length) return;
    gsap.from(els, {
      clipPath: 'inset(0 0 100% 0)',
      yPercent: 55,
      duration: 1.2,
      ease: EASE,
      stagger: extra.stagger ?? 0.09,
      scrollTrigger: { trigger: els[0], start, once: true },
      ...extra,
    });
  };

  const drift = (
    target: string,
    amt: number,
    scrubStart = 'top bottom',
    scrubEnd = 'bottom top'
  ) => {
    const els = gsap.utils.toArray<HTMLElement>(target);
    if (!els.length) return;
    gsap.to(els, {
      yPercent: amt * 100,
      ease: 'none',
      scrollTrigger: { trigger: els[0], start: scrubStart, end: scrubEnd, scrub: 1.2 },
    });
  };

  const portraitParallax = (target: string, depth = 12, scaleFrom = 1.22) => {
    const imgs = gsap.utils.toArray<HTMLElement>(`${target} img`);
    if (!imgs.length) return;
    gsap.fromTo(
      imgs,
      { yPercent: depth, scale: scaleFrom, filter: 'grayscale(0.45)' },
      {
        yPercent: -depth,
        scale: 1,
        filter: 'grayscale(0)',
        ease: 'none',
        scrollTrigger: { trigger: imgs[0], start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      }
    );
  };

  mm.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', () => {
    /* ---------- ABOUT ---------- */
    const about = document.querySelector("[data-section='about']") as HTMLElement | null;
    if (about) {
      clipSlide("[data-fx='about-banner']", {}, 'top 86%');
      gsap.to("[data-fx='about-banner']", {
        xPercent: -7,
        ease: 'none',
        scrollTrigger: { trigger: about, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
      reveal("[data-fx='about-el']", { y: 52, stagger: 0.12, start: 'top 80%' });
      clipSlide("[data-fx='about-title']", { stagger: 0 }, 'top 78%');
      const profileChildren = gsap.utils.toArray<HTMLElement>("[data-fx='about-profile']");
      profileChildren.forEach((el) => {
        const kids = Array.from(el.children);
        if (!kids.length) return;
        gsap.from(kids, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        });
      });
      reveal("[data-fx='about-list'] li", { x: -18, y: 0, stagger: 0.06, start: 'top 76%' });
      portraitParallax("[data-fx='about-portrait']", 12, 1.22);
    }

    /* ---------- REFERENCE EXPERIENCE (editorial) ---------- */
    const rx = document.querySelector("[data-section='ref-experience']") as HTMLElement | null;
    if (rx) {
      reveal("[data-fx='rx-kicker']", { x: -26, y: 0, start: 'top 84%' });
      reveal("[data-fx='rx-script']", { x: -34, y: 30, rotateX: 20, scale: 0.9, start: 'top 80%' });
      clipSlide("[data-fx='rx-display']", { yPercent: 70 }, 'top 78%');
      reveal("[data-fx='rx-intro']", { y: 30, start: 'top 74%' });
      reveal("[data-fx='rx-list'] li", { y: 22, stagger: 0.07, start: 'top 68%' });
      clipSlide("[data-fx='rx-footer']", { yPercent: 60, stagger: 0 }, 'top 60%');
      portraitParallax("[data-fx='rx-portrait']", 10, 1.26);
      gsap.to("[data-fx='rx-number']", {
        xPercent: -22,
        rotate: -8,
        ease: 'none',
        scrollTrigger: { trigger: rx, start: 'top bottom', end: 'bottom top', scrub: 1.3 },
      });
      drift("[data-fx='rx-margins']", -0.14);
      const sig = gsap.utils.toArray<HTMLElement>("[data-fx='rx-signature']");
      sig.forEach((el) => {
        gsap.from(el.children, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }

    /* ---------- EXPERIENCE / EDUCATION ---------- */
    const edu = document.querySelector("[data-section='education']") as HTMLElement | null;
    if (edu) {
      drift("[data-fx='edu-header'] p", -0.09, 'top bottom', 'center top');
      reveal("[data-fx='edu-row']", {
        y: 64,
        rotateX: 7,
        scale: 0.96,
        stagger: 0.1,
        start: 'top 88%',
      });
      reveal("[data-fx='edu-degree']", { x: 16, y: 0, stagger: 0.07, start: 'top 84%' });
      reveal("[data-fx='edu-side']", { x: 18, y: 0, rotate: 6, start: 'top 86%' });
      reveal("[data-fx='edu-story']", { y: 26, start: 'top 82%' });
      clipSlide("[data-fx='edu-jtitle']", { yPercent: 80, stagger: 0.12 }, 'top 80%');
      reveal("[data-fx='edu-metric']", { y: 30, stagger: 0.09, start: 'top 86%' });
      drift("[data-fx='edu-rback']", 0.1);
      drift("[data-fx='edu-rfront']", -0.08);
      gsap.to("[data-fx='edu-mantra'], [data-fx='edu-paper']", {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: edu, start: 'top bottom', end: 'bottom top', scrub: 1.3 },
      });
      portraitParallax("[data-fx='edu-portrait']", 10, 1.18);
    }

    /* ---------- SELECTED WORK ---------- */
    const work = document.querySelector("[data-section='selected-work']") as HTMLElement | null;
    if (work) {
      const intro = gsap.utils.toArray<HTMLElement>("[data-fx='work-intro']");
      intro.forEach((el) => {
        gsap.from(el.children, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });
      const art = gsap.utils.toArray<HTMLElement>("[data-fx='work-art']");
      art.forEach((frame) => {
        const img = frame.querySelector('img');
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.18 },
          {
            yPercent: 7,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
          }
        );
      });
    }

    /* ---------- RIBBON / WEBGL ---------- */
    reveal("[data-fx='ribbon-meta']", { y: 12, duration: 0.8, start: 'top 92%' });
    const lines = gsap.utils.toArray<HTMLElement>("[data-fx='ribbon-line']");
    if (lines.length) {
      gsap.fromTo(
        lines,
        { clipPath: 'inset(0 0 100% 0)', yPercent: 60 },
        {
          clipPath: 'inset(0 0 0% 0)',
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: lines[0], start: 'top 92%', end: 'top 12%', scrub: 0.8 },
        }
      );
    }

    /* ---------- CONTACT ---------- */
    reveal("[data-fx='c-topline']", { y: 20, start: 'top 92%' });
    clipSlide("[data-fx='c-title'] span", { stagger: 0.12 }, 'top 88%');
    reveal("[data-fx='c-intro']", { y: 24, start: 'top 84%' });
    clipSlide("[data-fx='c-cta']", { yPercent: 60, stagger: 0 }, 'top 82%');
    reveal("[data-fx='c-channel']", { x: 26, y: 0, stagger: 0.08, start: 'top 78%' });
    reveal("[data-fx='c-edition']", { y: 14, start: 'top 92%' });
    gsap.fromTo(
      "[data-fx='c-art']",
      { rotate: 7, scale: 1.12, yPercent: 6, opacity: 0.6 },
      {
        rotate: -2,
        scale: 1,
        yPercent: -4,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: "[data-section='contact']",
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.3,
        },
      }
    );
    gsap.to("[data-fx='c-closing']", {
      xPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: "[data-section='contact']",
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.4,
      },
    });
  });

  return mm;
}
