'use client';

import { motion } from 'framer-motion';

/* ─── Tier config ─────────────────────────────────────────── */

export type Tier = 'Strategic' | 'Technology' | 'Solution';

const TIER_CONFIG: Record<Tier, {
  placeholderBg: string;
  placeholderText: string;
  badge: string;
  cardBorder: string;
  cardHoverBorder: string;
  headerBg: string;
  headerIcon: string;
  accentBar: string;
  icon: React.ReactNode;
  sectionLabel: { en: string; ar: string };
}> = {
  Strategic: {
    placeholderBg: 'bg-gradient-to-br from-amber-50 to-orange-100',
    placeholderText: 'text-amber-600',
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    cardBorder: 'border-amber-100/60',
    cardHoverBorder: 'hover:border-amber-300/70',
    headerBg: 'bg-gradient-to-r from-amber-50 to-orange-50',
    headerIcon: 'bg-amber-100 text-amber-600',
    accentBar: 'bg-amber-400',
    sectionLabel: { en: 'Strategic Partners', ar: 'الشركاء الاستراتيجيون' },
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  Technology: {
    placeholderBg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    placeholderText: 'text-blue-600',
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    cardBorder: 'border-blue-100/60',
    cardHoverBorder: 'hover:border-blue-300/70',
    headerBg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    headerIcon: 'bg-blue-100 text-blue-600',
    accentBar: 'bg-blue-500',
    sectionLabel: { en: 'Technology Partners', ar: 'شركاء التقنية' },
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
  },
  Solution: {
    placeholderBg: 'bg-gradient-to-br from-teal-50 to-emerald-100',
    placeholderText: 'text-teal-600',
    badge: 'bg-teal-50 text-teal-700 border border-teal-200',
    cardBorder: 'border-teal-100/60',
    cardHoverBorder: 'hover:border-teal-300/70',
    headerBg: 'bg-gradient-to-r from-teal-50 to-emerald-50',
    headerIcon: 'bg-teal-100 text-teal-600',
    accentBar: 'bg-teal-500',
    sectionLabel: { en: 'Solution Partners', ar: 'شركاء الحلول' },
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6H10a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 0010 21h4.25M14.25 6l4.5 4.5m-4.5-4.5V3.75m4.5 6.75L14.25 6M18.75 10.5V21" />
      </svg>
    ),
  },
};

/* ─── Types ───────────────────────────────────────────────── */

export interface PartnerItem {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  tier: Tier;
}

/* ─── Helpers ─────────────────────────────────────────────── */

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/* ─── Partner Card ────────────────────────────────────────── */

function PartnerCard({ partner, index }: { partner: PartnerItem; index: number }) {
  const cfg = TIER_CONFIG[partner.tier];
  const initials = getInitials(partner.name);

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative flex flex-col items-center rounded-2xl border bg-white p-5 shadow-sm transition-shadow duration-300
        hover:shadow-xl hover:shadow-brand-primary/8 cursor-default
        ${cfg.cardBorder} ${cfg.cardHoverBorder}`}
    >
      {/* External link badge */}
      {partner.website && (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 end-3 flex h-7 w-7 items-center justify-center rounded-lg bg-brand-bg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-accent/10"
          aria-label={`Visit ${partner.name}`}
        >
          <svg className="h-3.5 w-3.5 text-brand-text/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      )}

      {/* Logo / Initials */}
      <div className="mb-4 flex h-20 w-full items-center justify-center">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-h-14 max-w-[110px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${cfg.placeholderBg} transition-transform duration-300 group-hover:scale-105`}>
            <span className={`text-2xl font-bold tracking-tight ${cfg.placeholderText}`}>
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-center text-sm font-semibold text-brand-primary leading-snug">
        {partner.name}
      </h3>

      {/* Description */}
      {partner.description && (
        <p className="mt-1.5 text-center text-xs text-brand-text/60 line-clamp-2 leading-relaxed">
          {partner.description}
        </p>
      )}

      {/* Tier badge */}
      <div className="mt-3">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.badge}`}>
          {partner.tier}
        </span>
      </div>
    </motion.div>
  );

  return partner.website ? (
    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  ) : (
    card
  );
}

/* ─── Tier Section ────────────────────────────────────────── */

function TierSection({
  tier,
  partners,
  locale,
}: {
  tier: Tier;
  partners: PartnerItem[];
  locale: string;
}) {
  if (partners.length === 0) return null;
  const cfg = TIER_CONFIG[tier];
  const label = locale === 'ar' ? cfg.sectionLabel.ar : cfg.sectionLabel.en;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className={`mb-8 rounded-2xl border border-brand-text/5 ${cfg.headerBg} px-6 py-5`}>
        <div className="flex items-center gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.headerIcon}`}>
            {cfg.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-primary">{label}</h2>
            <p className="text-sm text-brand-text/50">
              {partners.length} {locale === 'ar' ? 'شريك' : `partner${partners.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex-1" />
          <div className={`h-1 w-20 rounded-full ${cfg.accentBar} opacity-50`} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {partners.map((p, i) => (
          <PartnerCard key={p.name} partner={p} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

/* ─── Stats Bar ───────────────────────────────────────────── */

function StatsBar({
  grouped,
  locale,
}: {
  grouped: Record<Tier, PartnerItem[]>;
  locale: string;
}) {
  const total = Object.values(grouped).reduce((s, a) => s + a.length, 0);
  const ar = locale === 'ar';

  return (
    <div className="border-b border-brand-text/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-brand-primary">{total}+</span>
            <span className="text-brand-text/60">{ar ? 'شريك موثوق' : 'Trusted Partners'}</span>
          </div>

          <div className="hidden h-8 w-px bg-brand-text/10 sm:block" />

          <div className="flex flex-wrap items-center justify-center gap-4">
            {([
              { tier: 'Strategic' as Tier, dot: 'bg-amber-400', label: ar ? 'استراتيجيون' : 'Strategic' },
              { tier: 'Technology' as Tier, dot: 'bg-blue-500', label: ar ? 'تقنيون' : 'Technology' },
              { tier: 'Solution' as Tier, dot: 'bg-teal-500', label: ar ? 'حلول' : 'Solution' },
            ]).map(({ tier, dot, label }) => (
              <div key={tier} className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                <span className="font-semibold text-brand-primary">{grouped[tier].length}</span>
                <span className="text-brand-text/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */

interface PartnersGridProps {
  grouped: Record<Tier, PartnerItem[]>;
  locale: string;
}

export default function PartnersGrid({ grouped, locale }: PartnersGridProps) {
  return (
    <>
      <StatsBar grouped={grouped} locale={locale} />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <TierSection tier="Strategic" partners={grouped.Strategic} locale={locale} />
        <TierSection tier="Technology" partners={grouped.Technology} locale={locale} />
        <TierSection tier="Solution" partners={grouped.Solution} locale={locale} />
      </div>

      {/* CTA */}
      <div className="bg-brand-primary geo-pattern py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10">
            <svg className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {locale === 'ar' ? 'هل أنت مهتم بالشراكة معنا؟' : 'Interested in Becoming a Partner?'}
          </h2>
          <p className="mt-3 text-base text-white/50">
            {locale === 'ar'
              ? 'نرحب بالشركات التقنية الرائدة للانضمام إلى شبكة شركائنا المتنامية.'
              : "We welcome leading technology companies to join our growing partner network."}
          </p>
          <a
            href={`/${locale}/contact`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-7 py-3 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-accent-dark hover:shadow-lg hover:shadow-brand-accent/20"
          >
            {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
