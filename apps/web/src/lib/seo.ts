import type { Metadata } from 'next';

const BASE_URL = 'https://multitech.com.sa';
const SITE_NAME = 'Multi Technology Company';
const OG_IMAGE = `${BASE_URL}/og-image.jpg`; // place a 1200×630 image at public/og-image.jpg

/**
 * Build consistent page-level Metadata for Next.js generateMetadata exports.
 * Handles canonical URL, hreflang alternates, Open Graph, and Twitter Card.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: string;
  path: string;
  title: string;
  description?: string;
  image?: string;
}): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const pageUrl = `${BASE_URL}/${locale}${path}`;
  const ogImage = image ?? OG_IMAGE;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: pageUrl,
      languages: {
        ar: `${BASE_URL}/ar${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/** JSON-LD helpers — call JSON.stringify on the result and inject via <script> */

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Multi Technology Company',
  alternateName: 'شركة مالتي تكنولوجي',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  foundingDate: '2004',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SA',
    addressLocality: 'Riyadh',
    addressRegion: 'Riyadh Province',
  },
  description:
    'Leading Telecom and IT solutions provider in Saudi Arabia since 2004. Network Infrastructure, GSM/IBS, Security Solutions, and Managed Services.',
  areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
  knowsAbout: [
    'Telecommunications',
    'Network Infrastructure',
    'IT Solutions',
    'Managed Services',
    'Security Systems',
    'Fiber Optic Networks',
  ],
  sameAs: [],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: BASE_URL,
};

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
