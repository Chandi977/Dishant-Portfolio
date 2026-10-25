import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProject, projects } from '@/data/projects';
import CaseHero from '@/components/CaseHero';
import Lightfall from '@/components/Lightfall';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? 'Project', description: project?.summary };
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const allImages = [
    ...(project.coverImage
      ? [
          {
            src: project.coverImage,
            alt: project.title,
            title: 'Cover',
            aspectRatio: project.coverAspectRatio ?? '16 / 9',
          },
        ]
      : []),
    ...(project.screenshots?.map((s) => ({
      src: s.src,
      alt: s.title,
      title: s.title,
      caption: s.caption,
      aspectRatio: s.aspectRatio ?? '16 / 9',
    })) ?? []),
  ];

  return (
    <main className="case-page">
      <div className="case-page-bg" aria-hidden="true">
        <Lightfall
          colors={['#ffffff']}
          backgroundColor="#000000"
          speed={0.3}
          streakCount={2}
          streakWidth={0.8}
          twinkle={0.3}
          backgroundGlow={0.1}
          headGlow={0.6}
          bloom={0.35}
          mouseInteraction
          holdToWarp
          intro
          streakLength={1}
          density={0.6}
          glow={1}
          depth={0.5}
          zoom={3}
          mouseStrength={0.4}
          mouseRadius={0.45}
          lens={0.5}
          fade={0}
          lightMode={false}
        />
      </div>

      <header className="case-nav">
        <Link href="/" className="case-nav-back">
          <ArrowLeft size={18} />
          <span>INDEX</span>
        </Link>
        <Link href="/gallery" className="case-nav-archive">
          <span>WORK ARCHIVE</span>
          <ArrowRight size={18} />
        </Link>
      </header>

      <CaseHero
        title={project.title}
        number={project.number}
        category={project.category}
        year={project.year}
      />

      {allImages.length > 0 && (
        <section className="case-gallery" aria-label="Project gallery">
          <div className="case-gallery-stack">
            {allImages.map((img, i) => (
              <article key={i} className="case-gallery-item">
                <div className="case-gallery-image-wrap" style={{ aspectRatio: img.aspectRatio }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                    className="case-gallery-img"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {img.title && (
                    <div className="case-gallery-overlay">
                      <h3 className="case-gallery-title">{img.title}</h3>
                      {'caption' in img && img.caption && (
                        <p className="case-gallery-caption">{img.caption}</p>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
