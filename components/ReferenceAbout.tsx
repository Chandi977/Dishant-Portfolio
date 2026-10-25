import Image from 'next/image';
import styles from './ReferenceAbout.module.css';

export default function ReferenceAbout() {
  return (
    <section className={styles.section} data-about-section aria-labelledby="reference-about-title">
      <div className={styles.banner} data-about="banner">
        DESIGNING BRAND SYSTEMS THAT MOVE
      </div>
      <div className={styles.composition}>
        <div className={styles.portfolio} data-about="folio" aria-hidden="true">
          PORTFOLIO <i data-about="folio-rule" />
        </div>
        <h2 className={styles.title} id="reference-about-title" aria-label="About me">
          <span className={styles.titleLine}>
            <span data-about="title-line">ABOUT</span>
          </span>
          <span className={styles.titleLine}>
            <span data-about="title-line">ME</span>
          </span>
        </h2>
        <div className={styles.portrait} data-about="portrait">
          <Image
            src="/KutteKiPhoto/2.png"
            alt="Dishant Mishra, brand and creative designer"
            fill
            sizes="(max-width: 1080px) 90vw, 57vw"
          />
        </div>
        <p className={styles.marginNote} aria-hidden="true">
          <b data-about="margin-word">PEOPLE</b>
          <b data-about="margin-word">IDEAS</b>
          <b data-about="margin-word">BRANDS</b>
          <span data-about="margin-rule" />
        </p>
        <div className={styles.profile} data-about="profile">
          <p className={styles.firstName}>
            <span data-about="first-name">Dishant</span>
          </p>
          <p className={styles.lastName} data-about="last-name">
            MISHRA
          </p>
          <p className={styles.role} data-about="role">
            BRAND &amp; CREATIVE DESIGNER
          </p>
          <span className={styles.redRule} data-about="red-rule" aria-hidden="true" />
          <p className={styles.intro} data-about="intro">
            <strong data-about="highlight">Brand Executive @ Prem Industries India Limited</strong>{' '}
            leading visual strategy across B2B and B2C — from product packaging and campaigns to
            exhibitions.
          </p>
          <p className={styles.description} data-about="description">
            I help brands show up with clarity, consistency, and purpose, translating strategy into
            meaningful visual experiences that earn trust, create recall, and support growth.
          </p>
          <h3 className={styles.expertise} data-about="expertise">
            CORE EXPERTISE <i data-about="expertise-rule" aria-hidden="true" />
          </h3>
          <ul className={styles.list}>
            <li data-about="list-item">Brand Strategy &amp; Positioning</li>
            <li data-about="list-item">Product Visuals &amp; Packaging</li>
            <li data-about="list-item">Social Media Campaigns &amp; Lead Generation</li>
            <li data-about="list-item">Creative Direction &amp; B2B Marketing</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
