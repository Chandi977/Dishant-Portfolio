'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RibbonPortfolioSection from '@/components/RibbonPortfolioSection';
import SelectedWorkShowcase from '@/components/SelectedWorkShowcase';
import ReferenceAbout from '@/components/ReferenceAbout';
import ReferenceExperience from '@/components/ReferenceExperience';
import ExperienceEducation from '@/components/ExperienceEducation';
import ContactFooter from '@/components/ContactFooter';
import WorkedWith from '@/components/WorkedWith';
import { portfolioReveals } from '@/components/motion/portfolioReveals';
import { aboutMotion } from '@/components/motion/aboutMotion';
import { subscribeToScroll } from '@/components/motion/scrollDriver';

export default function PortfolioClient() {
  const root = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState('');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringX = useSpring(cursorX, { stiffness: 550, damping: 45, mass: 0.6 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 550, damping: 45, mass: 0.6 });
  const reduceMotion = useReducedMotion();
  const scrollProgress = useMotionValue(0);
  const progress = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = subscribeToScroll(() => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollProgress.set(Math.min(Math.max(window.scrollY / maxScroll, 0), 1));
    });
    return () => {
      unsubscribe();
    };
  }, [scrollProgress]);

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.letter-mask',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.05,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.15,
        }
      );
      gsap.fromTo(
        '.reveal-line',
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.15,
        }
      );

      const heroEntrance = gsap.timeline({ delay: 0.1 });
      heroEntrance
        .fromTo(
          '.hero-topline',
          { y: -14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0
        )
        .fromTo(
          '.perspective-grid',
          { opacity: 0 },
          { opacity: 0.48, duration: 1.4, ease: 'power1.out' },
          0.35
        )
        .fromTo(
          '.hero-left',
          { x: -28, y: 12, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.4
        )
        .fromTo(
          '.hero-right',
          { x: 28, y: 12, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.45
        )
        .fromTo(
          '.hero-script',
          { y: 16, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
          0.5
        )
        .fromTo(
          '.hero-bottom',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.55
        )
        .fromTo(
          '.paper-card',
          { opacity: 0 },
          { opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' },
          0.75
        );
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 76,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      if (portrait.current) {
        gsap.to(portrait.current, {
          yPercent: 22,
          scale: 1.16,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.25,
        },
      });
      heroTimeline
        .to(
          '.hero-title',
          { yPercent: -27, scaleY: 1.2, scaleX: 1.05, opacity: 0.38, ease: 'none' },
          0
        )
        .to('.hero-script', { yPercent: -88, xPercent: 14, rotate: -2, ease: 'none' }, 0)
        .to('.hero-left', { yPercent: -42, xPercent: -8, opacity: 0.2, ease: 'none' }, 0)
        .to('.hero-right', { yPercent: -66, xPercent: 8, opacity: 0.2, ease: 'none' }, 0)
        .to('.hero-topline', { yPercent: -160, opacity: 0, ease: 'none' }, 0)
        .to('.hero-bottom', { yPercent: -75, opacity: 0, ease: 'none' }, 0)
        .to('.perspective-grid', { scale: 1.34, yPercent: 18, opacity: 0.1, ease: 'none' }, 0)
        .to('.card-one', { yPercent: -65, rotate: -15, ease: 'none' }, 0)
        .to('.card-two', { yPercent: -90, rotate: 15, ease: 'none' }, 0);
      gsap.utils.toArray<HTMLElement>('.section-heading h2').forEach((heading) => {
        gsap.fromTo(
          heading,
          { yPercent: 13 },
          {
            yPercent: -13,
            ease: 'none',
            scrollTrigger: {
              trigger: heading.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>('.split-text').forEach((textBlock) => {
        gsap.fromTo(
          textBlock.children,
          { yPercent: 105, rotateX: -55, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.035,
            ease: 'power3.out',
            scrollTrigger: { trigger: textBlock, start: 'top 88%' },
          }
        );
      });

      if (window.matchMedia('(max-width: 900px)').matches) {
        gsap.utils.toArray<HTMLElement>('.halftone-reveal-component').forEach((art) => {
          const content = art.querySelector<HTMLElement>('.halftone-reveal__content');
          const dots = art.querySelector<HTMLElement>('.halftone-reveal__dots');
          const sweep = art.querySelector<HTMLElement>('.halftone-reveal__sweep');
          if (!content || !dots || !sweep) return;
          const mobileReveal = gsap.timeline({
            scrollTrigger: {
              trigger: art,
              start: 'top 86%',
              end: 'top 38%',
              scrub: 0.8,
            },
          });
          mobileReveal
            .fromTo(
              content,
              { opacity: 0.2, scale: 1.08 },
              { opacity: 1, scale: 1, ease: 'power2.out' },
              0
            )
            .fromTo(
              dots,
              {
                opacity: 1,
                clipPath: 'inset(0 0 0 0)',
                backgroundSize: '24px 24px',
              },
              {
                opacity: 1,
                clipPath: 'inset(0 0 0 100%)',
                backgroundSize: '6px 6px',
                ease: 'power2.inOut',
              },
              0
            )
            .fromTo(
              sweep,
              { xPercent: -125, opacity: 1 },
              { xPercent: 125, opacity: 0, ease: 'power2.inOut' },
              0.08
            );
        });

        type MobileRevealOptions = {
          x?: number;
          y?: number;
          scale?: number;
          stagger?: number;
          start?: string;
          duration?: number;
        };

        const revealMobile = (
          trigger: string,
          targets: string,
          {
            x = 0,
            y = 30,
            scale = 0.985,
            stagger = 0.08,
            start = 'top 87%',
            duration = 0.78,
          }: MobileRevealOptions = {}
        ) => {
          const elements = gsap.utils.toArray<HTMLElement>(targets);
          if (!elements.length) return;

          gsap.fromTo(
            elements,
            { x, y, scale, opacity: 0 },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration,
              stagger,
              ease: 'power3.out',
              clearProps: 'opacity,transform',
              immediateRender: false,
              scrollTrigger: {
                trigger,
                start,
                once: true,
              },
            }
          );
        };

        // Section headings - reveal on scroll
        revealMobile('[data-about-section]', '[data-about-section] h2', {
          y: 28,
          stagger: 0.1,
          start: 'top 88%',
        });
        revealMobile(
          '.selected-work',
          '.selected-work__intro .section-label, .selected-work__intro h1, .selected-work__intro .text-link, .intro-progress',
          { y: 24, stagger: 0.09, start: 'top 90%' }
        );
        revealMobile('#experience', '#career-title, #career-title + p', {
          y: 24,
          stagger: 0.09,
          start: 'top 88%',
        });
        revealMobile('#contact', '#contact-title span, #contact-title + p', {
          y: 24,
          stagger: 0.09,
          start: 'top 88%',
        });
        revealMobile('.worked-with', '.worked-with header, .worked-with h2', {
          y: 24,
          stagger: 0.09,
          start: 'top 88%',
        });

        // Split text elements - reveal on scroll
        gsap.utils.toArray<HTMLElement>('.split-text').forEach((textBlock) => {
          gsap.fromTo(
            textBlock.children,
            { yPercent: 105, rotateX: -55, opacity: 0 },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.035,
              ease: 'power3.out',
              scrollTrigger: { trigger: textBlock, start: 'top 88%', once: true },
            }
          );
        });

        // Generic reveal elements
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 76,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        // Selected work: reveal the chapter header, then each visual and its metadata.
        gsap.utils.toArray<HTMLElement>('.selected-work .project-card').forEach((card) => {
          const visual = card.querySelector<HTMLElement>('.project-visual');
          const meta = card.querySelector<HTMLElement>('.project-meta');
          if (!visual || !meta) return;
          const eyebrow = meta.querySelector<HTMLElement>('.project-eyebrow');
          const title = meta.querySelector<HTMLElement>('h2');
          const description = meta.querySelector<HTMLElement>('.project-description');
          const link = meta.querySelector<HTMLElement>('.text-link--project');
          const entrance = gsap.timeline({
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          });
          entrance.fromTo(
            visual,
            { y: 24, scale: 0.96, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'opacity,transform',
            },
            0
          );
          [eyebrow, title, description, link].forEach((part, index) => {
            if (!part) return;
            entrance.fromTo(
              part,
              {
                x: index % 2 ? 0 : -14,
                y: index % 2 ? 10 : 0,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'power3.out',
                clearProps: 'opacity,transform',
              },
              0.18 + index * 0.09
            );
          });
        });

        // Experience/Education rows
        revealMobile('#experience', '[data-experience-row]', {
          y: 32,
          stagger: 0.08,
          start: 'top 88%',
        });
        revealMobile('#experience', '[data-experience-education], [data-experience-metrics]', {
          y: 24,
          stagger: 0.09,
          start: 'top 88%',
        });

        // Contact footer channels
        revealMobile(
          '#contact',
          '.contact-footer .channel, .contact-footer .cta, .contact-footer .closing, .contact-footer .art, .contact-footer .edition',
          { y: 24, stagger: 0.08, start: 'top 88%' }
        );

        // WorkedWith logos - subtle fade in
        gsap.utils.toArray<HTMLElement>('.worked-with .logo').forEach((logo, index) => {
          gsap.fromTo(
            logo,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.03,
              ease: 'power2.out',
              scrollTrigger: { trigger: '.worked-with', start: 'top 88%', once: true },
            }
          );
        });
      }
    }, root);
    const reveals = portfolioReveals(root.current);
    const about = aboutMotion(root.current);
    ScrollTrigger.refresh();
    return () => {
      about?.revert();
      reveals.revert();
      ctx.revert();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const portraitX = gsap.quickTo('.hero-portrait img', 'x', {
      duration: 0.9,
      ease: 'power3.out',
    });
    const portraitY = gsap.quickTo('.hero-portrait img', 'y', {
      duration: 0.9,
      ease: 'power3.out',
    });
    const titleX = gsap.quickTo('.hero-title', 'x', {
      duration: 1.1,
      ease: 'power3.out',
    });
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      portraitX(x * 26);
      portraitY(y * 18);
      titleX(x * -16);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [reduceMotion, cursorX, cursorY]);

  return (
    <div ref={root} className="site-shell editorial-site">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <motion.div
        className={`cursor ${cursorLabel ? 'cursor--active' : ''}`}
        style={{ x: cursorSpringX, y: cursorSpringY }}
        aria-hidden="true"
      >
        {cursorLabel}
      </motion.div>
      <div className="grain" aria-hidden="true" />

      <main>
        <section className="hero" id="top">
          <div className="hero-topline">
            <span>BRAND & CREATIVE DESIGNER 2026</span>
            <span>GHAZIABAD, INDIA — WORLDWIDE</span>
          </div>
          <div className="hero-title" aria-label="Portfolio">
            {'PORTFOLIO'.split('').map((letter, index) => (
              <span className="letter-mask" key={`${letter}-${index}`}>
                <span className="reveal-line">{letter}</span>
              </span>
            ))}
          </div>
          <h1 className="hero-mobile-title" aria-label="Portfolio">
            <span>PORT</span>
            <span>FOLIO</span>
          </h1>
          <div className="hero-abstract-art" aria-hidden="true">
            <span className="hero-abstract-field" />
            <span className="hero-abstract-disc" />
            <span className="hero-abstract-orbit" />
            <span className="hero-abstract-frame" />
            <span className="hero-abstract-axis" />
            <span className="hero-abstract-dots" />
            <span className="hero-abstract-node" />
            <span className="hero-abstract-code">28.66 / 77.45</span>
            <span className="hero-abstract-label">BRANDS / EXPERIENCES</span>
          </div>
          <div className="hero-script">Brand & Creative</div>
          <div className="perspective-grid" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <motion.div
            ref={portrait}
            className="hero-portrait"
            initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.1, delay: 0.35, ease: [0.77, 0, 0.18, 1] }
            }
          >
            <Image
              src="/KutteKiPhoto/heroimage.png"
              alt="Editorial portrait representing Dishant Mishra's brand and creative design practice"
              fill
              priority
              loading="eager"
              unoptimized
              sizes="(max-width: 768px) 85vw, 44vw"
            />
          </motion.div>
          <motion.div
            className="paper-card card-one"
            animate={reduceMotion ? {} : { y: [0, -10, 0], rotate: [-7, -5, -7] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <b>BRAND DESIGN</b>
            <span>ART DIRECTION + STRATEGY</span>
          </motion.div>
          <motion.div
            className="paper-card card-two"
            animate={reduceMotion ? {} : { y: [0, 9, 0], rotate: [6, 8, 6] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <b>18% FASTER</b>
            <span>25% MORE INQUIRIES</span>
          </motion.div>
          <div className="hero-left hero-meta">
            <span className="hero-red-line" aria-hidden="true" />
            <p>
              AVAILABLE FOR
              <br />
              CREATIVE & DESIGN ROLES
            </p>
            <small>
              PHOTOSHOP · ILLUSTRATOR · INDESIGN
              <br />
              AFTER EFFECTS · FIGMA · CORELDRAW
              <br />
              6+ YRS EXPERIENCE · MBA (MARKETING)
            </small>
          </div>
          <div className="hero-right hero-meta">
            <b>
              DISHANT
              <br className="hero-mobile-br" /> MISHRA
            </b>
            <p>
              BRAND & CREATIVE
              <br className="hero-mobile-br" /> DESIGNER
            </p>
            <small className="hero-desktop-meta">
              GHAZIABAD, UP, INDIA
              <br />
              BRAND STRATEGY + CREATIVE DIRECTION
            </small>
          </div>
          <div className="hero-bottom">
            <div className="hero-bottom-left">
              <span className="hero-badge" aria-hidden="true">
                N
              </span>
              <span className="hero-bottom-meta">
                BASED IN INDIA
                <br />
                AVAILABLE WORLDWIDE
              </span>
            </div>
            <Link href="#work" className="hero-scroll-link">
              <span className="hero-scroll-arrow" aria-hidden="true">
                ↓
              </span>
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="hero-desktop-arrow" />
            </Link>
            <div className="hero-bottom-right">
              <span className="hero-bottom-meta">
                © 2026
                <br />
                EDITION 01
              </span>
            </div>
          </div>
        </section>

        <ReferenceAbout />

        <SelectedWorkShowcase />

        <ExperienceEducation />

        <ReferenceExperience />

        <RibbonPortfolioSection />

        <WorkedWith />
      </main>

      <ContactFooter onCursorChange={setCursorLabel} />
    </div>
  );
}
