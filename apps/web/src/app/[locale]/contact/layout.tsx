import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({
    locale,
    path: '/contact',
    title: t('sectionTitle'),
    description:
      locale === 'ar'
        ? 'تواصل مع فريق شركة مالتي تكنولوجي. نحن هنا للإجابة على استفساراتك وتقديم حلول مخصصة.'
        : "Get in touch with the Multi Technology Company team. We're here to answer your questions and deliver tailored solutions.",
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
