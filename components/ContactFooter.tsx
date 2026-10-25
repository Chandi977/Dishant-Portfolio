import Image from 'next/image';
import { ArrowUpRight, Mail, Link as LinkIcon, MapPin } from 'lucide-react';
import styles from './ContactFooter.module.css';

function LinkedInMark({ size = 20 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <text x="1" y="19" fontFamily="Arial, sans-serif" fontSize="21" fontWeight="700">
        in
      </text>
    </svg>
  );
}

export default function ContactFooter({
  onCursorChange,
}: {
  onCursorChange: (label: string) => void;
}) {
  return (
    <footer className={styles.footer} id="contact" aria-labelledby="contact-title">
      <header className={styles.topline}>
        <p data-motion="left">
          CONTACT / OPEN FOR ROLES &amp; COLLABORATIONS
          <i aria-hidden="true" />
        </p>
        <small data-motion="right" data-motion-delay="0.14">
          GHAZIABAD, INDIA / WORKING WORLDWIDE
        </small>
      </header>
      <div className={styles.content}>
        <h2 id="contact-title" className={styles.title}>
          <span data-motion="wipe" data-motion-delay="0.06">
            HAVE A ROLE OR
          </span>
          <span data-motion="wipe" data-motion-delay="0.17">
            PROJECT IN MIND?
          </span>
          <span data-motion="wipe" data-motion-delay="0.28">
            LET’S CREATE IT.
          </span>
        </h2>
        <p className={styles.intro} data-motion="left" data-motion-delay="0.22">
          Open to brand roles, freelance projects, and
          <br className={styles.desktopBreak} /> creative collaborations.
        </p>
        <div className={styles.actions}>
          <a
            className={styles.cta}
            data-motion="scale"
            data-motion-delay="0.16"
            href="mailto:dishantmishra110@gmail.com"
            onMouseEnter={() => onCursorChange('EMAIL')}
            onMouseLeave={() => onCursorChange('')}
          >
            <span>
              START A<strong>CONVERSATION</strong>
            </span>
            <ArrowUpRight size={27} strokeWidth={1.4} aria-hidden="true" />
            <small>USUALLY REPLIES WITHIN ONE WORKING DAY</small>
          </a>
          <address className={styles.directory}>
            {[
              {
                icon: Mail,
                label: 'EMAIL',
                text: 'dishantmishra110@gmail.com',
                href: 'mailto:dishantmishra110@gmail.com',
              },
              {
                icon: LinkedInMark,
                label: 'LINKEDIN',
                text: 'dishant-mishra',
                href: 'https://www.linkedin.com/in/dishant-mishra-831818259',
              },
              {
                icon: LinkIcon,
                label: 'PORTFOLIO',
                text: 'dishantmishra9.myportfolio.com',
                href: 'https://dishantmishra9.myportfolio.com/',
              },
            ].map(({ icon: Icon, label, text, href }, index) => (
              <a
                className={styles.channel}
                data-motion={index % 2 ? 'right' : 'left'}
                data-motion-delay={String(0.08 + index * 0.09)}
                href={href}
                key={label}
                {...(href.startsWith('https:')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <b>{label}</b>
                  <small>{text}</small>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
              </a>
            ))}
            <div className={styles.channel} data-motion="rise" data-motion-delay="0.35">
              <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <b>LOCATION</b>
                <small>Ghaziabad, UP, India</small>
              </span>
            </div>
          </address>
        </div>
        <p className={styles.closing} data-motion="left">
          GOOD BRANDS CREATE BRIGHTER TOMORROWS
          <span aria-hidden="true" />
        </p>
      </div>
      <div className={styles.art} data-motion="fade" data-motion-delay="0.3" aria-hidden="true">
        <Image src="/last.png" alt="CTL image" fill sizes="(max-width: 700px) 88vw, 41vw" />
        <p>
          IDEAS
          <br />
          PEOPLE
          <br />
          BRANDS
          <br />A BRIGHTER
          <br />
          TOMORROW
          <span />
        </p>
      </div>
      <span className={styles.edition} data-motion="drop" data-motion-delay="0.12">
        EST. 2020 / 2026
      </span>
    </footer>
  );
}
