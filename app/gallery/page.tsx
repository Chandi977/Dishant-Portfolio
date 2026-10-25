import type { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery — Work Archive',
  description:
    'A complete archive of brand identities, packaging, campaigns, digital experiences, and creative case studies by Dishant Mishra.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
