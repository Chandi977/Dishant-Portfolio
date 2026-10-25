'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Film, Image as ImageIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { scrapedProjects, type ScrapedProject } from '@/data/scrapedProjects';

const CATEGORIES = [
  'All',
  'Brand Identity',
  'Packaging & Print',
  'Social Media & Campaigns',
  'Exhibition & Events',
  'UI Design',
  'Motion & Video',
  'Poster & Illustration',
] as const;

const motionEase = [0.22, 1, 0.36, 1] as const;

function GalleryNav() {
  return (
    <Reveal
      as="header"
      className="gallery-nav"
      direction="down"
      distance={16}
      duration={0.6}
      amount={0}
    >
      <Link href="/" className="gallery-nav-brand" aria-label="Back to portfolio index">
        DM <span>/ PORTFOLIO</span>
      </Link>
      <nav className="gallery-nav-links" aria-label="Work navigation">
        <Link href="/" className="gallery-nav-link">
          Home <ArrowUpRight />
        </Link>
      </nav>
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: ScrapedProject; index: number }) {
  const reduceMotion = useReducedMotion();
  const part = (x: number, y: number) => ({
    hidden: { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.68, ease: motionEase },
    },
  });
  const hasCaseStudy = !!project.caseStudySlug;
  const linkHref = hasCaseStudy ? `/work/${project.caseStudySlug}` : project.sourceUrl;
  const linkLabel = hasCaseStudy
    ? 'VIEW CASE STUDY'
    : project.liveUrlLabel
      ? `VISIT ${project.liveUrlLabel}`
      : 'VISIT LIVE';
  const isExternal = !hasCaseStudy;

  return (
    <motion.div
      className="gallery-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.09,
            delayChildren: reduceMotion ? 0 : (index % 3) * 0.08,
          },
        },
      }}
    >
      <span className="gallery-card-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <Link
        href={linkHref}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        className="gallery-card-link"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <motion.div
          className="gallery-card-media"
          variants={part(0, 22)}
          style={{ cursor: 'pointer' }}
        >
          {project.cover && (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority={index === 0}
              sizes="(max-width: 600px) 100vw, 50vw"
              className="gallery-card-img"
              unoptimized
            />
          )}
          <span className="gallery-card-shade" aria-hidden="true" />
          <span className="gallery-card-count">
            {project.videos.length > 0 && (
              <span>
                <Film aria-hidden="true" /> {project.videos.length}
              </span>
            )}
            <span>
              <ImageIcon aria-hidden="true" /> {project.images.length} SCREENS
            </span>
          </span>
          <span className="gallery-card-open" aria-hidden="true">
            {linkLabel} <ArrowUpRight />
          </span>
        </motion.div>
      </Link>

      <div className="gallery-card-meta">
        <motion.div className="gallery-card-title" variants={part(-14, 0)}>
          <b>{project.title}</b>
        </motion.div>
        <motion.div className="gallery-card-sub" variants={part(0, 10)}>
          <em>{project.category}</em>
          {project.year && <em>{project.year}</em>}
        </motion.div>
      </div>

      {project.description && (
        <motion.p className="gallery-card-description" variants={part(0, 12)}>
          {project.description}
        </motion.p>
      )}

      {project.metrics && (
        <motion.div className="gallery-card-metric" variants={part(-10, 0)}>
          RESULT / {project.metrics}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function GalleryClient({
  initialCategory = null,
}: {
  initialCategory?: string | null;
}) {
  const reduceMotion = useReducedMotion();
  const projects = useMemo(() => scrapedProjects.filter((p) => p.slug !== 'work'), []);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>(() => {
    const urlParam =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('c') : null;
    const requested = urlParam ?? initialCategory;
    return requested && (CATEGORIES as readonly string[]).includes(requested)
      ? (requested as (typeof CATEGORIES)[number])
      : 'All';
  });

  const filtered = useMemo(
    () => (category === 'All' ? projects : projects.filter((p) => p.category === category)),
    [projects, category]
  );

  return (
    <div className="gallery-page">
      <div className="grain" aria-hidden="true" />
      <GalleryNav />

      <main>
        <section className="gallery-hero">
          <p className="gallery-hero-kicker">CREATIVE STRATEGIST & DESIGNER</p>
          <h1 className="gallery-hero-title" aria-label="Selected Work">
            {'SELECTED WORK'.split('').map((letter, i) => (
              <span
                key={i}
                className="gallery-hero-letter"
                style={{ animationDelay: `${0.15 + i * 0.03}s` }}
              >
                {letter === ' ' ? '\u00a0' : letter}
              </span>
            ))}
          </h1>
        </section>

        <Reveal as="section" className="gallery-filters" distance={12} duration={0.6} once={false}>
          <div className="gallery-filters-scroll">
            {CATEGORIES.map((cat, index) => (
              <motion.button
                key={cat}
                type="button"
                className={`gallery-filter ${category === cat ? 'is-active' : ''}`}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  ease: motionEase,
                  delay: reduceMotion ? 0 : index * 0.045,
                }}
              >
                {cat.toUpperCase()}
              </motion.button>
            ))}
          </div>
          <motion.span
            className="gallery-filters-count"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.25 }}
          >
            SHOWING {filtered.length} OF {projects.length} PROJECTS
          </motion.span>
        </Reveal>

        <section className="gallery-grid" aria-label="Projects and live platforms grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </section>

        <footer className="gallery-footer">
          <span>© {new Date().getFullYear()} DISHANT MISHRA</span>
          <Link href="/">
            Home <ArrowUpRight aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}
