import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './editorial-motion.css';
import 'lenis/dist/lenis.css';
import SmoothScrollController from '@/components/motion/SmoothScrollController';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dishantmishra.com'),
  title: {
    default: 'Dishant Mishra — Brand & Creative Designer',
    template: '%s — Dishant Mishra',
  },
  description:
    'Dishant Mishra is a Brand & Creative Designer and Creative Head with 5+ years of experience building visual identities, packaging, campaigns, and digital experiences across B2B and B2C brands.',
  keywords: [
    'Dishant Mishra',
    'Brand Designer',
    'Creative Designer',
    'Graphic Designer',
    'Creative Head',
    'Packaging Design',
    'Brand Identity',
    'Digital Marketing',
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Figma',
    'Meta Ads',
    'Exhibition Design',
    'Ghaziabad',
    'India',
  ],
  openGraph: {
    title: 'Dishant Mishra — Brand & Creative Designer',
    description:
      'Brand & Creative Designer with 5+ years crafting visual identities, packaging, and high-performing campaigns that drive measurable growth.',
    type: 'website',
  },
  other: {
    'codex-preview': 'development',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollController />
        {children}
      </body>
    </html>
  );
}
