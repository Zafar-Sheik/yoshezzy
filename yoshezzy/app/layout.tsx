import type { Metadata, Viewport } from 'next';
import '@fontsource/anton/400.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/dm-sans';
import './globals.css';
import { site, socials } from '@/lib/data';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.realName} | Durban Influencer, Model & Creator`,
  description:
    'Official home of YoShezzy (Shehzaad Shaik) — the Durban creator behind “Watkine, Booooi!”. Influencer, model, actor, baller and artist. Bookings, brand collabs and Shez Apparel.',
  keywords: ['YoShezzy', 'Shezzy', 'Shehzaad Shaik', 'Watkine Booooi', 'Durban influencer', 'South African TikTok', 'Shez Apparel'],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: 'Durban’s viral phenom. Bookings, collabs and Shez Apparel.',
    type: 'profile',
    locale: 'en_ZA',
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.tagline },
};

export const viewport: Viewport = { themeColor: '#0B0A0F' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.realName,
  alternateName: site.name,
  jobTitle: 'Content Creator',
  homeLocation: { '@type': 'Place', name: site.city },
  email: `mailto:${site.email}`,
  sameAs: socials.filter((s) => s.name !== 'Shez Apparel').map((s) => s.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
