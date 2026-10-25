'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  GraduationCap,
  Monitor,
  Users,
  ChartNoAxesColumnIncreasing,
  Package,
  PenTool,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ExperienceEducation.module.css';

const roles = [
  {
    start: '2025',
    end: 'Present',
    period: 'June 2025 – Present',
    title: 'Brand Executive',
    company: 'Prem Industries India Limited',
    detail: 'Campaign strategy · Visual identity · Catalogs · Packaging · Exhibitions',
    image: '/logos/prem.png',
    logo: 'prem',
  },
  {
    start: '2024',
    end: 'Present',
    period: 'January 2024 – Present',
    title: 'Social Media Manager (Freelance)',
    company: 'Morgan Group',
    detail: 'Content strategy · Posts · Calendars · Leads · Packaging',
    image: null,
    logo: null,
  },
  {
    start: '2026',
    end: '2026',
    period: 'January 2026 – June 2026',
    title: 'Web Application Development & Project Coordinator',
    company: 'Promove - Craft Your Career',
    detail: 'Framework · Team coordination · Timelines · Stakeholder alignment',
    image: null,
    logo: null,
  },
  {
    start: '2024',
    end: '2025',
    period: 'December 2024 – July 2025',
    title: 'Executive — Graphic Designer & Marketing',
    company: 'Teak and Traditions',
    detail: 'E-commerce · Presentations · Global trade shows (INDIAWOOD)',
    image: '/logos/teak&tradition.png',
    logo: 'teak',
  },
  {
    start: '2023',
    end: '2024',
    period: 'August 2023 – October 2024',
    title: 'Sr. Graphic Designer',
    company: 'Nehru International Public School',
    detail: 'Social media · Magazines · Certificates · Website UI/UX',
    image: '/logos/nips.png',
    logo: 'nips',
  },
  {
    start: '2024',
    end: '2024',
    period: 'January 2024 – June 2024',
    title: 'Sr Graphic Designer',
    company: 'Samajwadi Party',
    detail: 'Videos/reels · Motion graphics · Posters/banners · Election campaigns',
    image: null,
    logo: null,
  },
  {
    start: '2021',
    end: '2023',
    period: 'February 2021 – August 2023',
    title: 'Graphic Designer',
    company: 'Aura Furnishings',
    detail: 'Social media · Banners/hoardings · Meta advertising',
    image: '/logos/aura.png',
    logo: 'aura',
  },
  {
    start: '2020',
    end: '2021',
    period: 'January 2020 – February 2021',
    title: 'Graphic Designer',
    company: 'WebTech Graphics',
    detail: 'Social media · Client coordination · Faster content delivery',
    image: '/logos/webtech.png',
    logo: 'webtech',
  },
];

const education = [
  {
    degree: 'Master of Business Administration, Marketing Management & Project Management',
    school: 'Swami Vivekanand Subharti University (SVSU), Meerut',
    period: 'March 2026 – December 2028',
  },
  {
    degree: 'Bachelor of Commerce (B.Com), Economics',
    school: 'CCS (Chaudhary Charan Singh) University',
    period: 'August 2020 – March 2023',
  },
];

const ribbonLaneOffsets = [-10, 0, 10] as const;
const ribbonPaths = {
  behind:
    'M155 37 C274 6 277 102 200 134 L80 184 C-52 239 27 346 132 288 L354 194 C457 145 610 166 577 211 C547 253 451 254 460 315 C469 372 552 350 579 400',
  front:
    'M579 400 C606 450 443 421 382 473 C358 493 380.94 507.72 417.29 518.8 C453.64 529.88 530 540 600 545',
} as const;

export default function ExperienceEducation() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageContentRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const ribbonBehindRef = useRef<SVGSVGElement>(null);
  const ribbonFrontRef = useRef<SVGSVGElement>(null);
  const ribbonDotRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stageContent = stageContentRef.current;
    const journey = journeyRef.current;
    const behindSvg = ribbonBehindRef.current;
    const frontSvg = ribbonFrontRef.current;
    const dotSvg = ribbonDotRef.current;
    if (!section || !stageContent || !journey || !behindSvg || !frontSvg || !dotSvg) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
        compact: '(max-width: 900px) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        const behindPaths = Array.from(
          behindSvg.querySelectorAll<SVGPathElement>('[data-ribbon-lane]')
        );
        const frontPaths = Array.from(frontSvg.querySelectorAll<SVGPathElement>('path'));
        const behindGuide = behindPaths[1];
        const frontGuide = frontPaths[1];
        const ribbonDot = dotSvg.querySelector<SVGCircleElement>('circle');
        const myTitle = journey.querySelector<HTMLElement>(`.${styles.journeyTitle} span`);
        const journeyTitle = journey.querySelector<HTMLElement>(`.${styles.journeyTitle} strong`);
        const rows = Array.from(section.querySelectorAll<HTMLElement>('[data-experience-row]'));
        const educationBlock = section.querySelector<HTMLElement>('[data-experience-education]');
        const metricsBlock = section.querySelector<HTMLElement>('[data-experience-metrics]');
        const stickyStage =
          section.querySelector<HTMLElement>(`.${styles.stickyStage}`) ?? stageContent;

        if (!behindGuide || !frontGuide || !ribbonDot || !myTitle || !journeyTitle) return;

        const prepare = (paths: SVGPathElement[]) =>
          paths.map((path) => {
            const length = path.getTotalLength();
            path.setAttribute('stroke-dasharray', String(length));
            path.setAttribute('stroke-dashoffset', String(length));
            return length;
          });
        const behindLengths = prepare(behindPaths);
        const frontLengths = prepare(frontPaths);
        const behindLength = behindGuide.getTotalLength();
        const frontLength = frontGuide.getTotalLength();
        const totalRibbonLength = behindLength + frontLength;
        const drawState = { distance: 0 };
        const renderRibbon = () => {
          const distance = gsap.utils.clamp(0, totalRibbonLength, drawState.distance);
          const behindProgress = gsap.utils.clamp(0, 1, distance / behindLength);
          const frontProgress = gsap.utils.clamp(0, 1, (distance - behindLength) / frontLength);

          behindPaths.forEach((path, index) => {
            path.setAttribute(
              'stroke-dashoffset',
              String(behindLengths[index] * (1 - behindProgress))
            );
          });
          frontPaths.forEach((path, index) => {
            path.setAttribute(
              'stroke-dashoffset',
              String(frontLengths[index] * (1 - frontProgress))
            );
          });

          const isFront = distance > behindLength;
          const activeGuide = isFront ? frontGuide : behindGuide;
          const activeDistance = isFront ? distance - behindLength : distance;
          const point = activeGuide.getPointAtLength(activeDistance);
          gsap.set(ribbonDot, { attr: { cx: point.x, cy: point.y }, autoAlpha: 1 });
          gsap.set(dotSvg, { zIndex: isFront ? 4 : 1 });
        };

        renderRibbon();
        gsap.set(myTitle, { autoAlpha: 0, yPercent: 18, clipPath: 'inset(0 100% 0 0)' });
        gsap.set(journeyTitle, { autoAlpha: 0, yPercent: 22, clipPath: 'inset(0 100% 0 0)' });
        if (desktop) {
          gsap.set(rows, { autoAlpha: 0, x: -22, clipPath: 'inset(0 0 100% 0)' });
          if (educationBlock) gsap.set(educationBlock, { autoAlpha: 0, y: 16 });
          if (metricsBlock) gsap.set(metricsBlock, { autoAlpha: 0, y: 16 });
        }

        const drawDuration = desktop ? 1.5 : 0.85;
        const timeline = gsap.timeline({
          scrollTrigger: desktop
            ? {
                trigger: stickyStage,
                start: 'top top',
                end: '+=160%',
                scrub: 0.8,
                pin: stickyStage,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              }
            : {
                trigger: journey,
                start: 'top 85%',
                end: 'bottom 50%',
                scrub: true,
                invalidateOnRefresh: true,
              },
        });

        timeline
          .to(
            myTitle,
            {
              autoAlpha: 1,
              yPercent: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: desktop ? 0.32 : 0.5,
              ease: 'power2.out',
            },
            0.02
          )
          .to(
            journeyTitle,
            {
              autoAlpha: 1,
              yPercent: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: desktop ? 0.42 : 0.65,
              ease: 'power2.out',
            },
            desktop ? 0.08 : 0.16
          )
          .to(
            drawState,
            {
              distance: totalRibbonLength,
              duration: drawDuration,
              ease: 'power1.inOut',
              onUpdate: renderRibbon,
            },
            0
          );

        if (desktop) {
          rows.forEach((row, index) => {
            timeline.to(
              row,
              {
                autoAlpha: 1,
                x: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.32,
                ease: 'power2.out',
              },
              0.04 + index * 0.11
            );
          });
          if (educationBlock) {
            timeline.to(
              educationBlock,
              { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
              0.62
            );
          }
          if (metricsBlock) {
            timeline.to(
              metricsBlock,
              { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
              0.82
            );
          }
        }

        // Scroll drives the animation. Desktop pins the section so the stage stays
        // in view while the timeline plays.
        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          [...behindPaths, ...frontPaths].forEach((path) => {
            path.removeAttribute('stroke-dasharray');
            path.removeAttribute('stroke-dashoffset');
          });
          gsap.set(ribbonDot, { clearProps: 'opacity,visibility' });
          gsap.set(dotSvg, { clearProps: 'zIndex' });
          gsap.set([myTitle, journeyTitle], {
            clearProps: 'opacity,visibility,transform,clipPath',
          });
          gsap.set([...rows, educationBlock, metricsBlock, stageContent].filter(Boolean), {
            clearProps: 'opacity,visibility,transform,clipPath',
          });
        };
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="experience"
      aria-labelledby="career-title"
    >
      <div className={styles.stickyStage}>
        <div ref={stageContentRef} className={styles.stageContent}>
          <header className={styles.header}>
            <h2 id="career-title" data-motion="drop">
              EXPERIENCE &amp; EDUCATION <span aria-hidden="true" />
            </h2>
            <p aria-hidden="true" data-motion="fade" data-motion-delay="0.16">
              IDEAS&nbsp; PEOPLE&nbsp; BRANDS&nbsp; A BRIGHTER TOMORROW
            </p>
          </header>
          <div className={styles.layout}>
            <div className={styles.history}>
              <ol className={styles.timeline} aria-label="Professional experience">
                {roles.map((role, index) => (
                  <li
                    className={styles.row}
                    key={`${role.company}::${role.title}::${role.start}::${role.end}::${index}`}
                    data-experience-row
                  >
                    <p className={styles.date} aria-label={role.period} data-motion="drop">
                      <strong>{role.start}</strong>
                      <span>– {role.end}</span>
                    </p>
                    <div
                      className={styles.thumbnail}
                      data-logo={role.logo}
                      data-motion="scale"
                      data-motion-delay="0.09"
                    >
                      {role.image ? (
                        <Image
                          src={role.image}
                          alt={`${role.company} logo`}
                          fill
                          sizes="(max-width: 600px) 72px, (max-width: 1100px) 96px, 6vw"
                        />
                      ) : (
                        <PenTool size={34} strokeWidth={1.2} aria-hidden="true" />
                      )}
                    </div>
                    <div
                      className={styles.role}
                      data-motion={index % 2 ? 'right' : 'left'}
                      data-motion-delay="0.22"
                    >
                      <h3>{role.title}</h3>
                      <p>{role.company}</p>
                      <small>{role.detail}</small>
                    </div>
                  </li>
                ))}
              </ol>
              <div className={styles.education} data-experience-education>
                <h3>EDUCATION</h3>
                <div className={styles.degrees}>
                  {education.map((item) => (
                    <article className={styles.degree} key={item.degree}>
                      <span className={styles.icon}>
                        <GraduationCap size={23} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <div>
                        <h4>{item.degree}</h4>
                        <p>{item.school}</p>
                        <small>{item.period}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.journey} ref={journeyRef} data-ribbon-stage>
              <svg
                ref={ribbonBehindRef}
                data-ribbon-layer="behind"
                viewBox="0 0 600 570"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                {ribbonLaneOffsets.map((offset) => (
                  <path
                    key={offset}
                    data-ribbon-lane
                    d={ribbonPaths.behind}
                    transform={`translate(0 ${offset})`}
                  />
                ))}
              </svg>
              <h3 className={styles.journeyTitle}>
                <span>MY</span>
                <strong>JOURNEY</strong>
              </h3>
              <p
                className={styles.sideNote}
                aria-hidden="true"
                data-motion="drop"
                data-motion-delay="0.26"
              >
                EXPERIENCE
                <br />
                GROWTH
                <br />
                CREATIVITY
                <i />
              </p>
              <p className={styles.story} data-motion="left" data-motion-delay="0.3">
                From graphic design to creative direction, my journey has been built through visual
                storytelling, product communication, social media campaigns, and cross-industry
                problem solving.
              </p>
              <div className={styles.portrait} data-motion="rise" data-motion-delay="0.18">
                <Image
                  src="/KutteKiPhoto/4.png"
                  alt="Dishant Mishra"
                  fill
                  sizes="(max-width: 900px) 65vw, 40vw"
                />
              </div>
              <p className={styles.mantra} data-motion="fade" data-motion-delay="0.4">
                Turning
                <br />
                Ideas into
                <br />
                <span>Impact!</span>
              </p>
              <p className={styles.paperNote} data-motion="fade" data-motion-delay="0.48">
                Learning
                <br />
                Never
                <br />
                <span>Stops!</span>
              </p>
              <svg
                ref={ribbonFrontRef}
                data-ribbon-layer="front"
                viewBox="0 0 600 570"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                {ribbonLaneOffsets.map((offset) => (
                  <path
                    key={offset}
                    data-ribbon-lane
                    d={ribbonPaths.front}
                    transform={`translate(0 ${offset})`}
                  />
                ))}
              </svg>
              <svg
                ref={ribbonDotRef}
                data-ribbon-layer="dot"
                viewBox="0 0 600 570"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <circle className={styles.ribbonDot} cx="155" cy="37" r="5.25" />
              </svg>
            </div>
            <div className={styles.metrics} aria-label="Career highlights" data-experience-metrics>
              {[
                { icon: Monitor, value: '6+ Years', label: 'Creative Experience' },
                { icon: Users, value: 'Multiple', label: 'Industries Served' },
                {
                  icon: ChartNoAxesColumnIncreasing,
                  value: 'B2B & B2C',
                  label: 'Brand Communication',
                },
                { icon: Package, value: 'End-to-End', label: 'Design Execution' },
              ].map(({ icon: Icon, value, label }) => (
                <div className={styles.metric} key={label}>
                  <span className={styles.icon}>
                    <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <p>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
