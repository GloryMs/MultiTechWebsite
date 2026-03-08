import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getJobOpenings } from '@/lib/strapi';
import type { StrapiJobOpening } from '@/lib/strapi';

interface Props {
  params: Promise<{ locale: string }>;
}

const TYPE_COLORS = {
  'Full-time': 'bg-brand-accent/10 text-brand-accent',
  'Part-time': 'bg-brand-gold/10 text-brand-gold',
  'Contract': 'bg-brand-primary/10 text-brand-primary',
} as const;

function JobCard({
  job,
  locale,
  labels,
}: {
  job: StrapiJobOpening;
  locale: string;
  labels: { department: string; location: string; apply: string; fullTime: string; partTime: string; contract: string };
}) {
  const typeLabel =
    job.type === 'Full-time' ? labels.fullTime :
    job.type === 'Part-time' ? labels.partTime :
    labels.contract;

  const typeColor = TYPE_COLORS[job.type] ?? TYPE_COLORS['Contract'];

  return (
    <div className="rounded-2xl border border-brand-text/8 bg-white p-6 hover:border-brand-accent/20 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-brand-primary">{job.title}</h3>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-brand-text">
            {job.department && (
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                {labels.department}: {job.department}
              </span>
            )}
            {job.location && (
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {job.location}
              </span>
            )}
          </div>
          {job.description && (
            <p className="mt-3 text-sm text-brand-text line-clamp-2">{job.description}</p>
          )}
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${typeColor}`}>
          {typeLabel}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Link
          href={`/${locale}/contact?subject=${encodeURIComponent(job.title)}`}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-accent/90 transition-colors"
        >
          {labels.apply}
          <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const jobs = await getJobOpenings(locale);

  const benefits = [
    { title: t('benefit1Title'), desc: t('benefit1Desc'), icon: '🏗️' },
    { title: t('benefit2Title'), desc: t('benefit2Desc'), icon: '📈' },
    { title: t('benefit3Title'), desc: t('benefit3Desc'), icon: '🤝' },
  ];

  const jobLabels = {
    department: t('department'),
    location: t('location'),
    apply: t('apply'),
    fullTime: t('fullTime'),
    partTime: t('partTime'),
    contract: t('contract'),
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageTitle')}
          subtitle={t('pageSubtitle')}
          breadcrumb={[
            { label: t('home'), href: `/${locale}` },
            { label: tNav('careers') },
          ]}
        />

        <SectionWrapper>
          {/* Why Multitech */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-brand-primary">{t('whyTitle')}</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-brand-text/8 bg-white p-6 text-center">
                  <div className="mb-3 text-3xl">{b.icon}</div>
                  <h3 className="font-bold text-brand-primary">{b.title}</h3>
                  <p className="mt-2 text-sm text-brand-text">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-brand-text/8 bg-white p-16 text-center">
              <div className="mb-4 text-5xl">💼</div>
              <p className="text-lg font-semibold text-brand-primary">{t('noJobs')}</p>
              <p className="mt-3 text-sm text-brand-text">
                {locale === 'ar'
                  ? 'يمكنك إرسال سيرتك الذاتية على '
                  : 'You can send your CV to '}
                <a href="mailto:careers@multitech.com.sa" className="text-brand-accent hover:underline">
                  careers@multitech.com.sa
                </a>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} locale={locale} labels={jobLabels} />
              ))}
            </div>
          )}
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
