import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getAboutPage } from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';
import AboutContent from './AboutContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildMetadata({
    locale,
    path: '/about',
    title: t('sectionTitle'),
    description: t('description'),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  const [t, tNav, tStats, aboutPage] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'stats' }),
    getAboutPage(locale),
  ]);

  const translations = {
    sectionTitle: t('sectionTitle'),
    description: t('description'),
    vision: t('vision'),
    visionText: t('visionText'),
    mission: t('mission'),
    missionText: t('missionText'),
    home: tNav('home'),
    about: tNav('about'),
    years: tStats('years'),
    projects: tStats('projects'),
    clients: tStats('clients'),
    engineers: tStats('engineers'),
  };

  return (
    <>
      <Navbar />
      <AboutContent locale={locale} translations={translations} aboutPage={aboutPage} />
      <Footer />
    </>
  );
}
