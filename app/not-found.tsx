import Link from 'next/link';
import { MaskLine, Reveal } from '@/components/Reveal';

export default function NotFound() {
  return (
    <main className="not-found">
      <Reveal as="span" className="nf-tag" direction="down" amount={0}>
        ERROR / 404
      </Reveal>
      <h1>
        <MaskLine delay={0.1}>
          PAGE
          <br />
        </MaskLine>
        <MaskLine delay={0.22}>NOT FOUND</MaskLine>
      </h1>
      <Reveal as="p" delay={0.35}>
        The page moved—or never existed.
      </Reveal>
      <Reveal delay={0.5}>
        <Link href="/">RETURN TO PORTFOLIO →</Link>
      </Reveal>
    </main>
  );
}
