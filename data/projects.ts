export type ProjectScreenshot = {
  src: string;
  title: string;
  caption: string;
  sector?: string;
  aspectRatio?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  year: string;
  deliverables: string[];
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  coverImage?: string;
  coverAspectRatio?: string;
  screenshots?: ProjectScreenshot[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'prem-industries',
    number: '01',
    title: 'Prem Industries — Brand Collateral & Product Catalogs',
    shortTitle: 'PREM / BRAND & CATALOGS',
    category: 'Brand Identity & Print',
    year: '2025 - 2026',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      'Product Catalogs — B2B & B2C',
      'Packaging & Promotional Materials',
      'Campaign Creative & In-Store Collateral',
      'Corporate Presentation Decks',
      'Exhibition & Event Branding',
    ],
    summary:
      'As Creative Head at Prem Industries India Ltd., I design catalogs, packaging, and promotional material for B2B and B2C campaigns, partnering with sales and marketing teams to build campaign strategies, product launches, and exhibition branding.',
    challenge:
      'Bringing a heavy manufacturing group with multiple divisions (packaging, kitchens, steel, coolers) into one consistent, premium brand voice across print, packaging, and digital touchpoints.',
    approach:
      'Built a modular creative system — reusable catalog layouts, unified color and typography, and streamlined assets that the sales and marketing teams could deploy fast across campaigns, exhibition stands, and product launches.',
    result:
      'Streamlined creative workflows and cut design turnaround time by 18%, while giving every product category a clearer, more professional shelf presence at trade shows like INDIAWOOD and across digital channels.',
    coverImage: '/projects/prem-industries/01.png',
    coverAspectRatio: '4 / 3',
    screenshots: [
      {
        src: '/projects/prem-industries/01.png',
        aspectRatio: '4 / 3',
        title: 'Product Catalog System',
        caption:
          'Modular B2B and B2C catalog layouts engineered for fast retouching and consistent brand presence across all Prem divisions.',
        sector: 'Catalog Design',
      },
      {
        src: '/projects/prem-industries/02.png',
        aspectRatio: '720 / 1732',
        title: 'Brand & Marketing Collateral',
        caption:
          'Packaging, brochures, and promotional creatives designed to move B2B and B2C audiences toward inquiry and purchase.',
        sector: 'Promotional Design',
      },
    ],
  },
  {
    slug: 'hapito-packaging',
    number: '02',
    title: 'Hapito / Silverynanos — Packaging Design',
    shortTitle: 'HAPITO / PACKAGING',
    category: 'Packaging & Print',
    year: '2025',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      'Full Product Packaging Suite',
      'Box, Label & Insert Design',
      'Brand Aesthetic Refresh',
      'Unboxing Experience',
    ],
    summary:
      'Designed the latest packaging for Silverynanos, bringing a blend of modern style and functionality to showcase unique products while keeping the Hapito identity at the forefront.',
    challenge:
      "Crafting packaging that communicated premium quality and clarity on shelf while staying true to Hapito's established brand identity.",
    approach:
      'Led concept development from the user experience of unboxing — designing structure, graphics, and finishes that make the product feel considered at every touchpoint.',
    result:
      'A package design where brand aesthetics and usability work together, giving the product a distinctive, premium presence — now live at silverynanos.in.',
    coverImage: '/projects/hapito/01.jpg',
    screenshots: [
      {
        src: '/projects/hapito/03.jpg',
        title: 'Packaging Concept & Structure',
        caption:
          'Premium structure and finish explorations designed to protect the product while elevating the unboxing moment.',
        sector: 'Structural Design',
      },
      {
        src: '/projects/hapito/06.jpg',
        title: 'Brand Graphics & Typography',
        caption:
          "Modern typography, color, and material treatments aligned to Hapito's identity and market positioning.",
        sector: 'Brand Design',
      },
      {
        src: '/projects/hapito/02.jpg',
        title: 'Final Packaging Render',
        caption:
          'Finalized packaging shown in context — functional, elegant, and unmistakably Hapito.',
        sector: 'Final Render',
      },
    ],
  },
  {
    slug: 'teak-traditions-work',
    number: '03',
    title: 'Teak & Traditions — E-Commerce Branding & Exhibition Graphics',
    shortTitle: 'TEAK / E-COMMERCE BRAND',
    category: 'Brand Identity & Digital',
    year: '2024 - 2025',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      'E-Commerce Website Branding Assets',
      'Product & Video Creative',
      'Client Presentation Decks',
      'INDIAWOOD Exhibition Graphics',
    ],
    summary:
      'As Executive Graphic Designer & Marketing at Teak and Traditions, I developed branding assets for the e-commerce website and videos, created corporate decks, and designed exhibition graphics for global trade shows including INDIAWOOD.',
    challenge:
      'Unifying a curated furnishings brand across a growing e-commerce presence and high-stakes international trade show booths.',
    approach:
      'Built a cohesive set of branding assets for the storefront, product video, and corporate decks, then carried the same visual language into exhibition graphics for global trade shows.',
    result:
      "Branding showcased every product on the e-commerce site with a consistent premium look, strengthening the brand's presence at international trade events.",
    coverImage: '/projects/teak-traditions/01.png',
    screenshots: [
      {
        src: '/projects/teak-traditions/01.png',
        title: 'E-Commerce Branding System',
        caption:
          'Branding assets designed to present a curated furniture catalog with elegance and consistency.',
        sector: 'E-Commerce Branding',
      },
      {
        src: '/projects/teak-traditions/02.png',
        title: 'Campaign & Product Creative',
        caption:
          'Product and video creative that brought the brand story to life across digital channels.',
        sector: 'Campaign Creative',
      },
    ],
  },
  {
    slug: 'nips',
    number: '04',
    title: 'NIPS — Identity & Exhibition Graphics',
    shortTitle: 'NIPS / IDENTITY',
    category: 'Exhibition & Events',
    year: '2026',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      'Visual Identity System',
      'Exhibition & Event Graphics',
      'Environmental Branding',
      'Digital & Social Assets',
    ],
    summary:
      'A full visual identity and exhibition graphics program for NIPS, spanning environmental branding, event materials, and digital assets.',
    challenge:
      'Creating an identity that works at the scale of physical exhibition environments while staying sharp across digital and printed touchpoints.',
    approach:
      'Designed a bold, modular identity system — typography-led graphics, color coding, and wayfinding — then applied it consistently across booths, panels, and screens.',
    result:
      'A cohesive, memorable presence that made NIPS instantly recognizable on the exhibition floor and across all communications.',
    coverImage: '/projects/nips/01.png',
    screenshots: [
      {
        src: '/projects/nips/03.png',
        title: 'Identity & Exhibition Boards',
        caption:
          'Exhibition panel system built from a flexible grid, strong type, and clear color hierarchy.',
        sector: 'Exhibition Design',
      },
      {
        src: '/projects/nips/05.png',
        title: 'Event & Environmental Graphics',
        caption:
          'Environmental branding applied to booths, signage, and printed collateral for maximum event impact.',
        sector: 'Environmental Branding',
      },
      {
        src: '/projects/nips/08.png',
        title: 'Digital & Print System',
        caption:
          'The same identity scaled down to digital screens, brochures, and social assets without losing impact.',
        sector: 'Brand System',
      },
    ],
  },
  {
    slug: 'aura-furnishings-work',
    number: '05',
    title: 'Aura Furnishings — Retail Campaigns & Branding',
    shortTitle: 'AURA / RETAIL BRAND',
    category: 'Brand Identity & Campaigns',
    year: '2021 - 2024',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      'Sales Banners & Hoarding Creatives',
      'Standee & Print Design',
      'Meta Advertising Creative',
      'Social Media Management',
    ],
    summary:
      'Designed sales banners, standees, and hoarding creatives for Aura Furnishings and handled Meta advertising to drive sales-focused inquiries, boosting sales inquiries by 25%.',
    challenge:
      'Filling a retail pipeline with consistent, high-converting visual creatives across print, digital, and Meta advertising.',
    approach:
      'Combined on-brand print design (banners, standees, hoardings) with data-informed Meta ad creative and social content, iterating on what actually drove inquiries.',
    result:
      'Sales inquiries increased by 25% through sharper offers, stronger visual hierarchy, and consistent campaign creative.',
    coverImage: '/projects/aura/01.jpg',
    screenshots: [
      {
        src: '/projects/aura/02.jpg',
        title: 'Retail Campaign Creative',
        caption:
          'Sale banners and promotional creatives built for high visibility and fast reading in retail environments.',
        sector: 'Campaign Design',
      },
      {
        src: '/projects/aura/04.jpg',
        title: 'Standee & Print Design',
        caption:
          'Standees, in-store posters, and hoardings that carried the brand voice across the city.',
        sector: 'Print & In-Store',
      },
      {
        src: '/projects/aura/05.jpg',
        title: 'Social & Meta Advertising',
        caption:
          'Digital ad creatives and social content engineered to turn attention into sales inquiries.',
        sector: 'Meta Advertising',
      },
    ],
  },
  {
    slug: 'movie-poster-design',
    number: '06',
    title: 'Movie Poster Design',
    shortTitle: 'FOR/ POSTERS',
    category: 'Poster & Illustration',
    year: '2024',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      'Concept Development',
      'Photo-Manipulation & Composite',
      'Title Typography',
      'Final Print-Ready Poster',
    ],
    summary:
      'A set of cinematic movie poster designs exploring mood, composition, and typography to sell a story in a single frame.',
    challenge:
      'Distilling narrative tension into one bold, scannable image that works at movie-poster size and thumbnail alike.',
    approach:
      'Developed strong central imagery with dramatic light, layered composites, and confident title typography to create immediate emotional impact.',
    result:
      'A poster series that feels like the film it advertises — atmospheric, memorable, and ready for theatrical display.',
    coverImage: '/projects/movie-poster/01.jpg',
    screenshots: [
      {
        src: '/projects/movie-poster/01.jpg',
        title: 'Poster — Concept One',
        caption:
          'Atmospheric composite built around dramatic light and a single emotional focal point.',
        sector: 'Poster Design',
      },
      {
        src: '/projects/movie-poster/02.jpg',
        title: 'Poster — Concept Two',
        caption: 'Alternate concept exploring scale, negative space, and cinematic color grading.',
        sector: 'Poster Design',
      },
      {
        src: '/projects/movie-poster/03.png',
        title: 'Poster — Concept Three',
        caption:
          'Final-look poster with refined typography and layout tuned for print and digital release.',
        sector: 'Poster Design',
      },
    ],
  },
  {
    slug: 'music-carousel',
    number: '07',
    title: 'Music Carousel — Social Media Design',
    shortTitle: 'CAROUSEL / SOCIAL',
    category: 'Social Media & Campaigns',
    year: '2024',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      '5-Slide Instagram Carousel',
      'Editorial Layout System',
      'Art Direction & Typography',
      'Scroll-Stopping Cover Slide',
    ],
    summary:
      'A music-themed Instagram carousel designed to stop the scroll, hold attention slide-by-slide, and drive engagement.',
    challenge:
      'Keeping a multi-slide story visually varied yet cohesive, so viewers swipe through and follow the brand.',
    approach:
      'Built an editorial layout system with strong grid, bold type, and rhythmic imagery — leading with a high-impact cover slide.',
    result:
      'A carousel that reads like a designed story and performs as a growth asset for social media engagement.',
    coverImage: '/projects/carousel/01.jpg',
    screenshots: [
      {
        src: '/projects/carousel/01.jpg',
        title: 'Cover Slide',
        caption: 'High-contrast cover designed to stop the scroll and invite the swipe.',
        sector: 'Social Media',
      },
      {
        src: '/projects/carousel/03.png',
        title: 'Content Slides',
        caption: 'Editorial slide system mixing typography, imagery, and motion to hold attention.',
        sector: 'Social Media',
      },
      {
        src: '/projects/carousel/06.png',
        title: 'Outro & CTA',
        caption: 'Closing slides engineered to drive saves, shares, and profile visits.',
        sector: 'Social Media',
      },
    ],
  },
  {
    slug: 'poster-experiments',
    number: '08',
    title: 'Poster Series — Baugasm, Skullcandy & Chair',
    shortTitle: 'POSTER / EXPERIMENTS',
    category: 'Poster & Illustration',
    year: '2023 - 2024',
    liveUrl: 'https://www.behance.net/dishantmishra09',
    deliverables: [
      'Experimental Poster Series',
      'Typography & Distortion',
      'Brand-Style Personal Works',
      'Digital Illustration',
    ],
    summary:
      'An experimental poster series spanning Baugasm-style distortion, Skullcandy campaign styling, and a chair posture concept — personal works exploring typography and visual contrast.',
    challenge:
      'Pushing outside client briefs to keep the design muscle sharp and the portfolio visibly diverse.',
    approach:
      'Treated each poster as a self-brief: pick a constraint (distortion, brand mood, a product story) and resolve it with type, color, and composition.',
    result:
      'A portfolio section that proves range — from bold experimental typography to calm conceptual illustration.',
    coverImage: '/projects/baugasm/01.jpg',
    screenshots: [
      {
        src: '/projects/baugasm/02.jpg',
        title: 'Baugasm-Style Experiment',
        caption:
          "Liquid typography and distortion experiments in the spirit of Baugasm's poster culture.",
        sector: 'Experimental Type',
      },
      {
        src: '/projects/skullcandy/01.jpg',
        title: 'Skullcandy Concept',
        caption: 'High-energy brand-style concept poster with bold color and streetwear attitude.',
        sector: 'Concept Poster',
      },
      {
        src: '/projects/chair-posture/01.jpg',
        title: 'Chair Posture Concept',
        caption:
          'A cleaner, concept-led poster pairing a product story with confident editorial layout.',
        sector: 'Concept Poster',
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
