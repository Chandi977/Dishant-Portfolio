'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const tabs = [
  { id: 'social', label: 'SOCIAL MEDIA' },
  { id: 'uiux', label: 'UI/UX' },
  { id: 'expo', label: 'EXPO BRANDING' },
  { id: 'catalogues', label: 'CATALOGUES' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const sectionColors: Record<TabId, string> = {
  social: '#142147',
  uiux: '#f11824',
  expo: '#142147',
  catalogues: '#f11824',
};

const premSummary = (
  <div className="prem-header-summary">
    <p>
      AS A BRAND EXECUTIVE AT PREM INDUSTRIES INDIA LIMITED, I LEAD VISUAL STRATEGY ACROSS B2B AND B2C
      SEGMENTS — FROM PRODUCT PACKAGING AND CAMPAIGN ASSETS TO EXHIBITION EXPERIENCES AND PROMOTIONAL
      COLLATERAL. MY WORK SITS AT THE INTERSECTION OF CREATIVE DIRECTION AND COMMERCIAL INTENT: EVERY ASSET I
      DELIVER IS DESIGNED TO MOVE A BUSINESS OBJECTIVE FORWARD, NOT JUST LOOK GOOD.
    </p>
  </div>
);

export default function PremIndustriesCase() {
  const [activeTab, setActiveTab] = useState<TabId>('social');
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .fromTo(
          '.prem-header',
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.9, clearProps: 'clipPath' }
        )
        .fromTo(
          '.prem-header > *',
          { y: 28, clipPath: 'inset(0 0 100% 0)' },
          {
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.72,
            stagger: 0.08,
            clearProps: 'transform,clipPath',
          },
          '-=0.55'
        )
        .fromTo(
          '.prem-tabs',
          { y: 28, clipPath: 'inset(0 0 100% 0)' },
          { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.65, clearProps: 'transform,clipPath' },
          '-=0.38'
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const panel = rootRef.current?.querySelector('.prem-panel');
      if (!panel) return;

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .fromTo(
          panel,
          { y: 30, clipPath: 'inset(0 0 10% 0)' },
          { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75, clearProps: 'transform,clipPath' }
        )
        .fromTo(
          panel.querySelectorAll('h1, h2, .prem-description, .prem-link'),
          { y: 24, clipPath: 'inset(0 0 100% 0)' },
          {
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.6,
            stagger: 0.07,
            clearProps: 'transform,clipPath',
          },
          '-=0.48'
        )
        .fromTo(
          panel.querySelectorAll('.prem-social-art, .prem-uiux-grid, .prem-expo-grid, .prem-catalogue-art'),
          { scale: 1.025, transformOrigin: '50% 0%' },
          { scale: 1, duration: 0.9, clearProps: 'transform,transformOrigin' },
          '-=0.5'
        );
    }, rootRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <main ref={rootRef} className="prem-case">
      <section className={`prem-canvas prem-canvas--${activeTab}`}>
        <header className="prem-header">
          <div className="prem-header-company">PREM INDUSTRIES INDIA LIMITED</div>
          <div className="prem-header-role">
            <span>ROLE -</span>
            <strong>Brand Executive</strong>
          </div>
          <div className="prem-header-services">
            Brand Strategy · Product Visuals · Social Media Campaigns
          </div>
          {premSummary}
        </header>

        <nav className="prem-tabs" aria-label="Prem Industries portfolio sections">
          <span
            className="prem-tab-pill"
            aria-hidden="true"
            style={{
              left: `calc(${activeIndex * 25}% + 7px)`,
              backgroundColor: sectionColors[activeTab],
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === 'social' && (
          <section className="prem-panel prem-panel--social">
            <h1>SOCIAL MEDIA</h1>
            <p className="prem-description">
              I collaborate closely with sales and marketing leadership to align brand communication with market
              positioning, ensuring that what we put out in the world reflects where the business is headed —
              not just where it&apos;s been.
              <br /><br />
              B2B &amp; B2C / Packaging &amp; Promotional Materials / Campaign Creative &amp; In-Store Collateral /
              Corporate Presentation Decks / Exhibition &amp; Event Branding
              <br /><br />
              What drives me: building visual identities that earn trust, create recall, and support real growth.
            </p>
            <div
              className="prem-social-art"
              style={{ position: 'relative', width: '60%', margin: '0 auto' }}
            >
              <Image
                src="/PremWorks/prem 1.png"
                alt="Prem Industries social media work"
                fill
                sizes="(max-width: 900px) calc(100vw - 32px), 60vw"
                unoptimized
                priority
              />
            </div>
          </section>
        )}

        {activeTab === 'uiux' && (
          <section className="prem-panel prem-panel--uiux">
            <h1>UI/UX DESIGN</h1>
            <h2>DESIGNING EXPERIENCES. DEFINING INTERACTIONS.</h2>
            <p className="prem-description">
              A collection of thoughtfully crafted digital experiences where creativity meets functionality.
              From intuitive interfaces to seamless user journeys, every design focuses on usability,
              clarity, and visual impact.
            </p>
            <div className="prem-uiux-grid">
              {[
                '/projects/ph-steels-marketplace.png',
                '/projects/prem-industries-corporate.png',
                '/projects/prem-packaging-store.png',
                '/projects/prem-injection-moulding.png',
                '/projects/prem-sheet-metal.png',
                '/projects/prem-chimneys-appliances.png',
                '/projects/prem-coolers-injection.png',
                '/projects/prem-packaging-corporate.png',
              ].map((src) => (
                <Image key={src} src={src} alt="Prem Industries digital experience" width={839} height={480} unoptimized />
              ))}
            </div>
            <a className="prem-link" href="https://premindustries.net" target="_blank" rel="noreferrer">
              Visit premindustries.net <span>↗</span>
            </a>
          </section>
        )}

        {activeTab === 'expo' && (
          <section className="prem-panel prem-panel--expo">
            <h1>EXPO&apos;S BRANDING</h1>
            <h2>BRANDING &amp; VISUAL MANAGEMENT</h2>
            <p className="prem-description">
              Managed and contributed to the complete visual presentation of Prem Industries at AAHAR Expo,
              focusing on stall branding, large-format graphic panels, product communication, and overall
              exhibition aesthetics.
            </p>
            <div className="prem-expo-grid" style={{ width: '60%', margin: '0 auto' }}>
              <Image
                src="/PremWorks/expo.png"
                alt="Prem Industries expo branding and stall visuals"
                width={1864}
                height={10995}
                unoptimized
              />
            </div>
          </section>
        )}

        {activeTab === 'catalogues' && (
          <section className="prem-panel prem-panel--catalogues">
            <h1>CATALOGUES &amp; EDITORIAL DESIGN</h1>
            <h2>DESIGNED TO INFORM. CRAFTED TO IMPRESS</h2>
            <p className="prem-description">
              A curated collection of product catalogues, corporate profiles, and editorial layouts—
              combining thoughtful typography, compelling visuals, and structured storytelling to create
              impactful brand experiences.
            </p>
            <div
              className="prem-catalogue-art"
              style={{ position: 'relative', width: '60%', margin: '0 auto' }}
            >
              <Image
                src="/PremWorks/mazine.png"
                alt="Prem Industries magazine and editorial design"
                fill
                sizes="(max-width: 900px) calc(100vw - 32px), 60vw"
                unoptimized
              />
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
