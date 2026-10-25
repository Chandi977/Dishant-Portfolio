'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { getProject } from '@/data/projects';
import { PROJECTS } from '@/data/ribbonProjects';
import styles from './RibbonStoryDialog.module.css';

interface RibbonStoryDialogProps {
  projectId: string;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const descriptions: Record<string, string> = {
  'prem-industries':
    "Catalogs, packaging, and campaign collateral for Prem Industries India Ltd.'s manufacturing divisions.",
  'aura-furnishings-work':
    'Retail banners, standees, hoardings, and Meta advertising creative for Aura Furnishings.',
};

export default function RibbonStoryDialog({
  projectId,
  onClose,
  onSelect,
}: RibbonStoryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const index = PROJECTS.findIndex((item) => item.id === projectId);
  const project = PROJECTS[index];
  const caseStudy =
    project && getProject(project.id === 'baugasm' ? 'poster-experiments' : project.id);
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [projectId]);

  if (!project) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      data-lenis-prevent
      aria-labelledby="ribbon-story-title"
      aria-describedby="ribbon-story-description"
      onClose={() => {
        if (!dialogRef.current?.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <button
        type="button"
        className={styles.close}
        onClick={() => dialogRef.current?.close()}
        aria-label="Close project story"
      >
        <X size={20} strokeWidth={1.7} aria-hidden="true" />
      </button>
      <div className={styles.shell}>
        <div className={styles.visual}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, 48vw"
          />
          <div className={styles.visualCaption}>
            <span>DM / SELECTED WORK</span>
            <span>{project.year}</span>
          </div>
        </div>
        <div ref={contentRef} className={styles.content}>
          <p className={styles.kicker}>
            PROJECT STORY{' '}
            <span>
              {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </p>
          <h2 id="ribbon-story-title" className={styles.title}>
            {project.title}
          </h2>
          <p className={styles.category}>
            {project.subtitle} / {project.category}
          </p>
          <p id="ribbon-story-description" className={styles.description}>
            {descriptions[project.id] ?? project.description}
          </p>
          {caseStudy && (
            <div className={styles.narrative}>
              <div>
                <h3>The brief</h3>
                <p>{caseStudy.challenge}</p>
              </div>
              <div>
                <h3>The approach</h3>
                <p>{caseStudy.approach}</p>
              </div>
            </div>
          )}
          {project.services && project.services.length > 0 && (
            <div className={styles.services}>
              <h3>Creative focus</h3>
              <p>{project.services.join(' / ')}</p>
            </div>
          )}
          {caseStudy && (
            <Link className={styles.caseLink} href={`/work/${caseStudy.slug}`}>
              Open full case study <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
          <div className={styles.navigation}>
            <button
              type="button"
              onClick={() => onSelect(previous.id)}
              aria-label={`Previous story: ${previous.title}`}
            >
              <ArrowLeft size={17} aria-hidden="true" />
              <span>Previous story</span>
            </button>
            <button
              type="button"
              onClick={() => onSelect(next.id)}
              aria-label={`Next story: ${next.title}`}
            >
              <span>Next story</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.body
  );
}
