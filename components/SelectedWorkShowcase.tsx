'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ShowcaseExperience {
  id: string;
  slug: string;
  company: string;
  role: string;
  title: string;
  tag: string;
  period: string;
  year: string;
  description: string;
  cover: string;
  metrics: string;
}

const showcaseProjects: ShowcaseExperience[] = [
  {
    id: '01',
    slug: 'prem-industries',
    company: 'Prem Industries India Ltd.',
    role: 'Creative Head — Designing & Marketing',
    title: 'Prem Industries — Brand Collateral & Product Catalogs',
    tag: 'Prem Industries · Creative Head',
    period: 'Jul 2025 - Present',
    year: '2025 - 2026',
    description:
      'As Creative Head I design product catalogs, packaging, and promotional material for B2B and B2C campaigns — partnering with sales and marketing to plan campaigns, product launches, and exhibition branding, while streamlining creative workflows to cut delivery time by 18%.',
    cover: '/projects/prem-industries/01.png',
    metrics: 'Brand Collateral & Catalogs · -18% Turnaround',
  },
  {
    id: '02',
    slug: 'hapito-packaging',
    company: 'Silverynanos / Hapito',
    role: 'Packaging Designer',
    title: 'Hapito / Silverynanos — Packaging Design',
    tag: 'Hapito · Packaging Designer',
    period: 'Client Project',
    year: '2025',
    description:
      "Designed the latest packaging for Silverynanos, bringing a blend of modern style and functionality to showcase unique products — with user experience and brand aesthetics keeping Hapito's identity at the forefront.",
    cover: '/projects/hapito/01.jpg',
    metrics: 'Full Packaging Suite · Live Product',
  },
  {
    id: '03',
    slug: 'teak-traditions-work',
    company: 'Teak and Traditions',
    role: 'Executive — Graphic Designer & Marketing',
    title: 'Teak & Traditions — E-Commerce Branding & Exhibition Graphics',
    tag: 'Teak & Traditions · Brand Designer',
    period: 'Dec 2024 - Jul 2025',
    year: '2024 - 2025',
    description:
      'Developed branding assets for the e-commerce website and product videos, created client presentation decks, and designed exhibition graphics for global trade shows including INDIAWOOD — branding that showcased every product with a consistent premium look.',
    cover: '/projects/teak-traditions/01.png',
    metrics: 'E-Commerce Brand Suite · INDIAWOOD Exhibitions',
  },
  {
    id: '04',
    slug: 'nips',
    company: 'NIPS',
    role: 'Brand & Exhibition Designer',
    title: 'NIPS — Identity & Exhibition Graphics',
    tag: 'NIPS · Brand Designer',
    period: 'Client Project',
    year: '2026',
    description:
      'A full visual identity and exhibition graphics program spanning environmental branding, event panels, and digital assets — a bold, modular identity system that made NIPS instantly recognizable on the exhibition floor.',
    cover: '/projects/nips/03.png',
    metrics: 'Identity System · Exhibition & Event Graphics',
  },
];

const projectCount = showcaseProjects.length;

export default function SelectedWorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;
    const hint = hintRef.current;
    if (!section || !sticky || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    let travel = 0;
    let viewportWidth = 0;

    const measure = () => {
      viewportWidth = section.clientWidth;
      travel = Math.max(track.scrollWidth - viewportWidth, 0);
      section.style.setProperty('--selected-work-travel', `${travel}px`);
    };

    measure();

    const isMobile = reduceMotion || window.matchMedia('(max-width: 980px)').matches;

    // Desktop: pinned scrub. Mobile: normal scroll.
    let st: ScrollTrigger | null = null;

    if (!isMobile) {
      st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(travel, 800)}`,
        pin: sticky,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          track.style.transform = `translate3d(${-p * travel}px, 0, 0)`;

          // Subtle vertical drift/scale on the sticky panel — NO opacity fade
          const visible = Math.min(Math.max(p * 1.4, 0.2), 1);
          const translateY = (1 - visible) * 36;
          const scale = 0.97 + visible * 0.03;
          sticky.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          // sticky.style.opacity = `${opacity}`;  // REMOVED: was fading the whole panel

          // Progress bar
          if (progressBar) {
            progressBar.style.transform = `scaleX(${p})`;
          }

          // Swipe hint
          if (hint) {
            hint.classList.toggle('is-visible', p < 0.12);
          }

          // Card parallax/visibility
          showcaseProjects.forEach((_, index) => {
            const card = section.querySelector(`.project-card[data-index="${index}"]`);
            if (!card || !(card instanceof HTMLElement)) return;
            const t = card.getBoundingClientRect();
            const cardCenter = t.left + t.width / 2;
            const rel = (cardCenter - viewportWidth * 0.55) / viewportWidth;
            const visibleCard = Math.max(Math.min(t.right, viewportWidth) - Math.max(t.left, 0), 0);
            const amount = Math.min(visibleCard / Math.max(t.width, 1), 1);
            card.style.setProperty('--parallax', `${rel * -38}px`);
            card.style.setProperty('--scroll-tilt', `${Math.max(-6, Math.min(6, rel * 8))}deg`);
            card.style.setProperty('--card-y', `${(1 - amount) * 14}px`);
            card.style.setProperty('--meta-y', `${(1 - amount) * 8}px`);
            card.style.setProperty('--card-scale', `${0.97 + amount * 0.03}`);
            card.style.setProperty('--card-opacity', `${Math.min(amount * 1.5, 1)}`);
            const shouldBeInert = amount <= 0.001 && !card.contains(document.activeElement);
            if (card.inert !== shouldBeInert) card.inert = shouldBeInert;
          });
        },
        onLeave: () => {
          track.style.removeProperty('transform');
          sticky.style.removeProperty('transform');
          sticky.style.removeProperty('opacity');
          if (progressBar) progressBar.style.removeProperty('transform');
          if (hint) hint.classList.remove('is-visible');
        },
        onLeaveBack: () => {
          track.style.removeProperty('transform');
          sticky.style.removeProperty('transform');
          sticky.style.removeProperty('opacity');
          if (progressBar) progressBar.style.removeProperty('transform');
          if (hint) hint.classList.remove('is-visible');
        },
      });
    } else {
      // Mobile: no pin, no scrub - just normal grid scroll
      track.style.removeProperty('transform');
      sticky.style.removeProperty('transform');
      sticky.style.removeProperty('opacity');
      if (progressBar) progressBar.style.removeProperty('transform');
      if (hint) hint.classList.remove('is-visible');
    }

    let resizeFrame = 0;
    const handleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const wasMobile = isMobile;
        const nowMobile = reduceMotion || window.matchMedia('(max-width: 980px)').matches;
        if (wasMobile !== nowMobile) {
          // Breakpoint crossed - full remount via key change would be ideal,
          // but a refresh + re-measure handles most cases.
          if (st) st.refresh();
        }
        measure();
        if (st) {
          st.vars.end = () => `+=${Math.max(travel, 800)}`;
          st.refresh();
        }
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', handleResize);
      st?.kill();
      track.style.removeProperty('transform');
      sticky.style.removeProperty('transform');
      sticky.style.removeProperty('opacity');
      if (progressBar) progressBar.style.removeProperty('transform');
      if (hint) hint.classList.remove('is-visible');
    };
  }, [reduceMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === 'touch' || reduceMotion) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rotate-x', `${y * -2.5}deg`);
    el.style.setProperty('--rotate-y', `${x * 3}deg`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section
      className="selected-work"
      id="work"
      ref={sectionRef}
      style={{ '--project-count': projectCount } as React.CSSProperties}
    >
      <div className="selected-work__sticky" ref={stickyRef}>
        <div className="selected-work__projects" id="all-projects">
          <div className="projects-track" ref={trackRef}>
            <aside className="selected-work__intro">
              <div className="intro-inner">
                <p className="section-label">Selected work</p>
                <h1>
                  Selected Work
                  <br />
                  <span>& Experience</span>
                </h1>
                <Link className="text-link" href="/work">
                  <span>View full work history</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </aside>

            {showcaseProjects.map((project, index) => (
              <article
                className="project-card"
                data-index={index}
                id={project.slug}
                key={`${project.slug}-${project.id}`}
              >
                <Link
                  className="project-visual"
                  href={`/work/${project.slug}`}
                  aria-label={`Explore ${project.title}`}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={handlePointerLeave}
                >
                  <div className="project-visual__inner">
                    <div className="project-art-frame" aria-hidden="true">
                      {project.cover && (
                        <Image
                          src={project.cover}
                          alt=""
                          fill
                          sizes="60vw"
                          priority={index === 0}
                          unoptimized
                        />
                      )}
                    </div>
                  </div>
                  <span className="visual-action" aria-hidden="true">
                    Case Study{' '}
                    <span className="arrow arrow--diagonal" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
                <div className="project-meta">
                  <div>
                    <p className="project-eyebrow">
                      {project.tag} · {project.year}
                    </p>
                    <h2>{project.title}</h2>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <Link className="text-link text-link--project" href={`/work/${project.slug}`}>
                    <span>View Case Study</span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="intro-progress" aria-hidden="true">
          <div className="progress-track">
            <span ref={progressBarRef} style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
        <p className="swipe-hint" ref={hintRef} aria-hidden="true">
          Scroll to explore <span>↓</span>
        </p>
      </div>
    </section>
  );
}
