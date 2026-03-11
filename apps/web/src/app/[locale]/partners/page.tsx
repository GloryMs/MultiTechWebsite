import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import PartnersGrid, { type PartnerItem, type Tier } from './PartnersGrid';
import { getPartners, getStrapiMediaUrl } from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';
import type { StrapiPartner } from '@/lib/strapi';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'partners' });
  return buildMetadata({ locale, path: '/partners', title: t('pageTitle'), description: t('pageSubtitle') });
}

/* ─── Static fallback ─────────────────────────────────────── */

const STATIC_PARTNERS: { name: string; tier: Tier }[] = [
  { name: 'Huawei', tier: 'Strategic' },
  { name: 'Cisco', tier: 'Strategic' },
  { name: 'Ericsson', tier: 'Strategic' },
  { name: 'Nokia', tier: 'Strategic' },
  { name: 'CommScope', tier: 'Technology' },
  { name: 'Corning', tier: 'Technology' },
  { name: 'Fortinet', tier: 'Technology' },
  { name: 'Juniper', tier: 'Technology' },
  { name: 'Dell', tier: 'Technology' },
  { name: 'HPE', tier: 'Technology' },
  { name: 'Schneider Electric', tier: 'Technology' },
  { name: 'Hikvision', tier: 'Solution' },
  { name: 'Dahua', tier: 'Solution' },
  { name: 'Panduit', tier: 'Solution' },
];

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;

  const [t, tNav, cmsPartners] = await Promise.all([
    getTranslations({ locale, namespace: 'partners' }),
    getTranslations({ locale, namespace: 'nav' }),
    getPartners('en'), // partner names & logos are language-neutral — always use EN
  ]);

  /* ─── Group partners by tier ──────────────────────────── */
  const grouped: Record<Tier, PartnerItem[]> = {
    Strategic: [],
    Technology: [],
    Solution: [],
  };

  if (cmsPartners.length > 0) {
    cmsPartners.forEach((p: StrapiPartner) => {
      const item: PartnerItem = {
        name: p.name,
        logo: p.logo ? getStrapiMediaUrl(p.logo.url) : undefined,
        description: p.description,
        website: p.website_url,
        tier: p.tier,
      };
      grouped[p.tier].push(item);
    });
  } else {
    STATIC_PARTNERS.forEach((p) => {
      grouped[p.tier].push({ name: p.name, tier: p.tier });
    });
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageTitle')}
          subtitle={t('pageSubtitle')}
          breadcrumb={[
            { label: t('home'), href: `/${locale}` },
            { label: tNav('partners') },
          ]}
        />
        <PartnersGrid grouped={grouped} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
