import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getPartners, getStrapiMediaUrl } from '@/lib/strapi';
import type { StrapiPartner } from '@/lib/strapi';

interface Props {
  params: Promise<{ locale: string }>;
}

/* Static fallback grouped by tier */
const STATIC_PARTNERS: { name: string; tier: 'Strategic' | 'Technology' | 'Solution' }[] = [
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

function PartnerCard({ name, logo, website }: { name: string; logo?: string; website?: string }) {
  const inner = (
    <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-brand-text/8 bg-white p-6 h-32 hover:border-brand-accent/30 hover:shadow-lg transition-all duration-200">
      {logo ? (
        <img src={logo} alt={name} className="max-h-12 max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
      ) : (
        <span className="text-base font-semibold text-brand-text/70 text-center group-hover:text-brand-accent transition-colors">{name}</span>
      )}
    </div>
  );

  return website ? (
    <a href={website} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}

function TierSection({
  title,
  partners,
}: {
  title: string;
  partners: { name: string; logo?: string; website?: string }[];
}) {
  if (partners.length === 0) return null;
  return (
    <div className="mb-16">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-xl font-bold text-brand-primary">{title}</h2>
        <div className="flex-1 h-px bg-brand-text/10" />
        <span className="text-sm text-brand-text/40 font-medium">{partners.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {partners.map((p) => (
          <PartnerCard key={p.name} name={p.name} logo={p.logo} website={p.website} />
        ))}
      </div>
    </div>
  );
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'partners' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const cmsPartners = await getPartners(locale);
  const hasCms = cmsPartners.length > 0;

  /* Group CMS partners by tier */
  type PartnerItem = { name: string; logo?: string; website?: string };
  const grouped: Record<'Strategic' | 'Technology' | 'Solution', PartnerItem[]> = {
    Strategic: [],
    Technology: [],
    Solution: [],
  };

  if (hasCms) {
    cmsPartners.forEach((p: StrapiPartner) => {
      const logoUrl = p.logo ? getStrapiMediaUrl(p.logo.url) : undefined;
      const item: PartnerItem = { name: p.name, logo: logoUrl, website: p.website_url };
      if (p.tier === 'Strategic') grouped.Strategic.push(item);
      else if (p.tier === 'Technology') grouped.Technology.push(item);
      else grouped.Solution.push(item);
    });
  } else {
    STATIC_PARTNERS.forEach((p) => {
      grouped[p.tier].push({ name: p.name });
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

        <SectionWrapper>
          <TierSection title={t('strategic')} partners={grouped.Strategic} />
          <TierSection title={t('technology')} partners={grouped.Technology} />
          <TierSection title={t('solution')} partners={grouped.Solution} />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
