'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import type { StrapiPartner } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

const STATIC_PARTNERS = [
  'Huawei', 'Cisco', 'CommScope', 'Corning', 'Ericsson',
  'Nokia', 'Fortinet', 'Hikvision', 'Dahua', 'Panduit',
  'Juniper', 'Dell', 'HPE', 'Schneider Electric',
];

interface Props {
  partners?: StrapiPartner[];
}

export default function PartnersSection({ partners }: Props) {
  const t = useTranslations('partners');
  const hasCmsData = partners && partners.length > 0;

  /* Build the display list — double it for the seamless ticker loop */
  const cmsItems = hasCmsData ? [...partners, ...partners] : null;
  const staticItems = [...STATIC_PARTNERS, ...STATIC_PARTNERS];

  return (
    <SectionWrapper className="bg-white overflow-hidden">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
          {t('sectionTitle')}
        </span>
        <p className="mt-2 text-brand-text">{t('subtitle')}</p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {cmsItems
            ? cmsItems.map((partner, i) => {
                const logoUrl = partner.logo ? getStrapiMediaUrl(partner.logo.url) : null;
                return (
                  <div
                    key={i}
                    className="shrink-0 flex h-20 w-44 items-center justify-center rounded-xl border border-brand-text/8 bg-brand-bg px-6 hover:border-brand-accent/30 transition-colors"
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt={partner.name} className="max-h-10 max-w-full object-contain" />
                    ) : (
                      <span className="text-sm font-semibold text-brand-text/60 whitespace-nowrap">{partner.name}</span>
                    )}
                  </div>
                );
              })
            : staticItems.map((name, i) => (
                <div
                  key={i}
                  className="shrink-0 flex h-20 w-44 items-center justify-center rounded-xl border border-brand-text/8 bg-brand-bg px-6 hover:border-brand-accent/30 transition-colors"
                >
                  <span className="text-sm font-semibold text-brand-text/60 whitespace-nowrap">{name}</span>
                </div>
              ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
