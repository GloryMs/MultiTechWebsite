import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import ServicesContent from './ServicesContent';
import { getServices } from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return buildMetadata({ locale, path: '/services', title: t('sectionTitle'), description: t('subtitle') });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [t, tNav, services] = await Promise.all([
    getTranslations({ locale, namespace: 'services' }),
    getTranslations({ locale, namespace: 'nav' }),
    getServices(locale),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('sectionTitle')}
          subtitle={t('subtitle')}
          breadcrumb={[
            { label: tNav('home'), href: `/${locale}` },
            { label: t('sectionTitle') },
          ]}
        />
        <ServicesContent services={services} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
