export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  accentColor: string;
  aspectRatio: number;
  description: string;
  client?: string;
  services?: string[];
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'prem-industries',
    title: 'Prem Industries',
    subtitle: 'BRAND COLLATERAL & CATALOGS',
    category: 'Brand Identity',
    year: '2026',
    image: '/projects/prem-industries/01.png',
    accentColor: '#e15b2b',
    aspectRatio: 1.5,
    description:
      'Product catalogs, packaging, and campaign collateral for a multi-division manufacturing group — cutting creative turnaround by 18%.',
    client: 'Prem Industries India Ltd.',
    services: ['Art Direction', 'Packaging', 'Catalogs', 'Campaigns'],
    link: 'https://www.behance.net/dishantmishra09',
  },
  {
    id: 'hapito-packaging',
    title: 'Hapito / Silverynanos',
    subtitle: 'MODERN PACKAGING DESIGN',
    category: 'Packaging & Print',
    year: '2025',
    image: '/projects/hapito/03.jpg',
    accentColor: '#8b5e3c',
    aspectRatio: 1.5,
    description:
      "Premium packaging suite blending modern style and functionality while keeping Hapito's identity at the forefront.",
    client: 'Silverynanos',
    services: ['Packaging Design', 'Brand Aesthetics', 'Structural Design'],
    link: 'https://silverynanos.in/',
  },
  {
    id: 'nips',
    title: 'NIPS',
    subtitle: 'IDENTITY & EXHIBITION GRAPHICS',
    category: 'Exhibition & Events',
    year: '2026',
    image: '/projects/nips/03.png',
    accentColor: '#539bf5',
    aspectRatio: 1.5,
    description:
      'Visual identity and exhibition graphics program — environmental branding, event panels, and digital assets.',
    client: 'NIPS',
    services: ['Identity System', 'Exhibition Graphics', 'Environmental Branding'],
    link: 'https://www.behance.net/dishantmishra09',
  },
  {
    id: 'teak-traditions-work',
    title: 'Teak & Traditions',
    subtitle: 'E-COMMERCE BRANDING & EXHIBITION',
    category: 'Brand Identity',
    year: '2024',
    image: '/projects/teak-traditions/01.png',
    accentColor: '#d97706',
    aspectRatio: 1.5,
    description:
      'E-commerce branding assets, video creative, corporate decks, and INDIAWOOD exhibition graphics for a curated furnishings brand.',
    client: 'Teak and Traditions',
    services: ['Branding', 'Video Creative', 'Deck Design', 'Exhibition'],
    link: 'https://www.behance.net/dishantmishra09',
  },
  {
    id: 'aura-furnishings-work',
    title: 'Aura Furnishings',
    subtitle: 'RETAIL CAMPAIGNS & META ADS',
    category: 'Campaigns',
    year: '2024',
    image: '/projects/aura/01.jpg',
    accentColor: '#38bdf8',
    aspectRatio: 1.5,
    description:
      'Banners, standees, hoarding creatives, and Meta advertising that boosted sales inquiries by 25%.',
    client: 'Aura Furnishings',
    services: ['Campaign Design', 'Print', 'Meta Advertising'],
    link: 'https://www.behance.net/dishantmishra09',
  },
  {
    id: 'movie-poster-design',
    title: 'Movie Poster Design',
    subtitle: 'CINEMATIC COMPOSITES & TYPE',
    category: 'Poster & Illustration',
    year: '2024',
    image: '/projects/movie-poster/01.jpg',
    accentColor: '#a855f7',
    aspectRatio: 1.5,
    description:
      'Cinematic poster concepts built with dramatic compositing, layered imagery, and confident title typography.',
    client: 'Personal Work',
    services: ['Poster Design', 'Compositing', 'Typography'],
    link: 'https://www.behance.net/dishantmishra09',
  },
  {
    id: 'music-carousel',
    title: 'Music Carousel',
    subtitle: 'SOCIAL MEDIA DESIGN',
    category: 'Social Media',
    year: '2024',
    image: '/projects/carousel/01.jpg',
    accentColor: '#f59e0b',
    aspectRatio: 1.5,
    description:
      'A scroll-stopping Instagram carousel built on a strong editorial grid with rhythmic visuals and clear CTA.',
    client: 'Social Media',
    services: ['Carousel Design', 'Editorial Layout', 'Art Direction'],
    link: 'https://www.behance.net/dishantmishra09',
  },
  {
    id: 'baugasm',
    title: 'Baugasm Experiments',
    subtitle: 'LIQUID TYPE & DISTORTION',
    category: 'Poster & Illustration',
    year: '2024',
    image: '/projects/baugasm/01.jpg',
    accentColor: '#4ade80',
    aspectRatio: 1.5,
    description:
      "Experimental designs in the spirit of Baugasm's poster culture — liquid typography, distortion, and bold color.",
    client: 'Personal Work',
    services: ['Experimental Type', 'Illustration', 'Color'],
    link: 'https://www.behance.net/dishantmishra09',
  },
  {
    id: 'gradient-portrait',
    title: 'Abstract Gradient Portrait',
    subtitle: 'DIGITAL ART & COLOR',
    category: 'Poster & Illustration',
    year: '2023',
    image: '/projects/gradient-portrait/01.jpg',
    accentColor: '#b78a5b',
    aspectRatio: 1.5,
    description:
      'An abstract portrait built on layered gradients — a study in color, light, and digital illustration.',
    client: 'Personal Work',
    services: ['Digital Illustration', 'Gradient Study'],
    link: 'https://www.behance.net/dishantmishra09',
  },
];
