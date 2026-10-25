'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ReferenceExperience.module.css';

const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;

const smoothstep = (edgeStart: number, edgeEnd: number, value: number) => {
  const progress = clamp((value - edgeStart) / (edgeEnd - edgeStart || 1e-6), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

export default function ReferenceExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add('(min-width: 1081px) and (prefers-reduced-motion: no-preference)', () => {
      const pick = (name: string) => section.querySelector<HTMLElement>(`[data-ref="${name}"]`);
      const openerFrame = pick('opener-frame');
      const teaserMedia = pick('teaser-media');
      const openerScrim = pick('opener-scrim');
      const openerTitle = pick('opener-title');
      const openerHint = pick('opener-hint');
      const editorial = pick('editorial');

      if (
        !openerFrame ||
        !teaserMedia ||
        !openerScrim ||
        !openerTitle ||
        !openerHint ||
        !editorial
      ) {
        return;
      }

      const reveal = { progress: 0 };
      const renderReveal = () => {
        const progress = reveal.progress;
        const expansion = smoothstep(0, 1, progress);
        const width = 42 + 58 * expansion;
        const height = 58 + 42 * expansion;
        const insetX = (100 - width) / 2;
        const insetY = (100 - height) / 2;
        const radius = 24 * (1 - expansion);
        const titleOut = smoothstep(0.4, 0.88, progress);
        const hintOut = smoothstep(0, 0.12, progress);
        const editorialIn = smoothstep(0.68, 1, progress);

        openerFrame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
        openerFrame.style.opacity = '1';
        openerFrame.style.visibility = 'visible';
        teaserMedia.style.transform = `scale(${1.35 - 0.35 * expansion})`;
        openerScrim.style.opacity = `${0.45 * expansion}`;

        openerTitle.style.opacity = `${1 - titleOut}`;
        openerTitle.style.visibility = titleOut >= 0.999 ? 'hidden' : 'visible';
        openerTitle.style.transform = `translate3d(0, ${-28 * titleOut}px, 0) scale(${1 + 0.06 * titleOut})`;

        openerHint.style.opacity = `${1 - hintOut}`;
        openerHint.style.visibility = hintOut >= 0.999 ? 'hidden' : 'visible';
        openerHint.style.transform = `translate3d(0, ${8 * hintOut}px, 0)`;

        editorial.style.opacity = `${editorialIn}`;
        editorial.style.visibility = editorialIn <= 0.001 ? 'hidden' : 'visible';
        editorial.style.transform = `translate3d(0, ${18 * (1 - editorialIn)}px, 0)`;
      };

      renderReveal();

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
          refreshPriority: -1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(reveal, { progress: 1, duration: 1.2, onUpdate: renderReveal }, 0)
        .to({}, { duration: 0.35 }, 1.2);

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set([openerFrame, teaserMedia, openerScrim, openerTitle, openerHint, editorial], {
          clearProps: 'all',
        });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="experience-editorial-title"
      data-section="ref-experience"
    >
      <div className={styles.stage}>
        <div className={styles.openerFrame} data-ref="opener-frame" aria-hidden="true">
          <div className={styles.teaserBackdrop} />
          <div className={styles.teaserMedia} data-ref="teaser-media">
            <Image src="/KutteKiPhoto/4.png" alt="" fill sizes="100vw" priority={false} />
          </div>
          <div className={styles.openerScrim} data-ref="opener-scrim" />
        </div>
        <p className={styles.openerTitle} data-ref="opener-title" aria-hidden="true">
          EXPERIENCE
        </p>
        <p className={styles.openerHint} data-ref="opener-hint" aria-hidden="true">
          SCROLL TO EXPAND
        </p>

        <div className={styles.frame} data-ref="editorial">
          <div className={styles.backdrop} aria-hidden="true" />
          <div className={styles.copy}>
            <p className={styles.kicker} data-ref="kicker">
              PORTFOLIO <span aria-hidden="true" />
            </p>
            <h2 className={styles.heading} id="experience-editorial-title">
              <span className={styles.script} data-ref="script">
                My
              </span>
              <span className={styles.display} data-ref="display">
                EXPERIENCE
              </span>
            </h2>
            <p className={styles.intro} data-ref="intro">
              I help brands show up with clarity, consistency, and purpose. As a Brand Executive at
              Prem Industries India Limited, I lead visual strategy across B2B and B2C segments.
            </p>
            <ul className={styles.list}>
              <li data-ref="item">
                Brand Executive @ Prem Industries India Limited (June 2025 – Present)
              </li>
              <li data-ref="item">
                Social Media Manager (Freelance) @ Morgan Group (Jan 2024 – Present)
              </li>
              <li data-ref="item">
                Web App Development & Project Coordinator @ Promove (Jan – Jun 2026)
              </li>
              <li data-ref="item">
                Executive – Graphic Designer & Marketing @ Teak and Traditions (Dec 2024 – Jul 2025)
              </li>
              <li data-ref="item">
                Sr. Graphic Designer @ Nehru International Public School (Aug 2023 – Oct 2024)
              </li>
              <li data-ref="item">Sr Graphic Designer @ Samajwadi Party (Jan – Jun 2024)</li>
              <li data-ref="item">Graphic Designer @ Aura Furnishings (Feb 2021 – Aug 2023)</li>
              <li data-ref="item">Graphic Designer @ WebTech Graphics (Jan 2020 – Feb 2021)</li>
            </ul>
            <p className={styles.footer} data-ref="footer">
              DESIGN.
              <br />
              STRATEGY.
              <br />
              IMPACT.
              <span aria-hidden="true" />
            </p>
          </div>
          <div className={styles.portrait} data-ref="portrait">
            <Image
              src="/KutteKiPhoto/3.3.png"
              alt="Dishant Mishra seated in a black outfit"
              fill
              sizes="(max-width: 1080px) 100vw, 56vw"
            />
          </div>
          <p className={styles.marginNote} data-ref="margin" aria-hidden="true">
            IDEAS
            <br />
            BECOME
            <br />
            BRAND
            <br />
            PROGRESS
            <span />
          </p>
          <div
            className={styles.signature}
            aria-label="Dishant Mishra, brand and creative designer"
          >
            <span data-ref="sig-script">Dishant</span>
            <b data-ref="sig-name">MISHRA</b>
            <small data-ref="sig-role">BRAND &amp; CREATIVE DESIGNER</small>
          </div>
        </div>
      </div>
    </section>
  );
}
