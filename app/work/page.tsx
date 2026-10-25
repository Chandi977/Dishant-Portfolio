import type { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Work — Selected Projects & Creative Archive',
  description:
    "Explore Dishant Mishra's work across brand identity, packaging, campaigns, digital design, motion, and creative direction.",
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return <GalleryClient />;
}
