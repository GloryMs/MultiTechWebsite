import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getProjects } from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';
import ProjectsGrid from './ProjectsGrid';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return buildMetadata({ locale, path: '/projects', title: t('pageTitle'), description: t('pageSubtitle') });
}

const STATIC_PROJECTS_AR = [
  { title: 'مطار الملك عبدالعزيز الدولي – IBS', category: 'GSM و IBS', client: 'هيئة الطيران المدني' },
  { title: 'مترو الرياض – البنية التحتية للشبكات', category: 'البنية التحتية للشبكات', client: 'هيئة تطوير الرياض' },
  { title: 'نيوم – شبكة الألياف الضوئية الرئيسية', category: 'FTTx و OSP', client: 'نيوم' },
  { title: 'مستشفى الملك فيصل التخصصي – شبكة LAN/WAN', category: 'البنية التحتية للشبكات', client: 'مستشفى الملك فيصل' },
  { title: 'مدينة الملك عبدالله الاقتصادية – FTTx', category: 'FTTx و OSP', client: 'إعمار المدينة الاقتصادية' },
  { title: 'برج المملكة – نظام المراقبة الأمنية', category: 'الحلول الأمنية', client: 'شركة المملكة القابضة' },
];

const STATIC_PROJECTS_EN = [
  { title: 'King Abdulaziz International Airport – IBS', category: 'GSM & IBS', client: 'GACA' },
  { title: 'Riyadh Metro – Network Infrastructure', category: 'Network Infrastructure', client: 'RDA' },
  { title: 'NEOM – Fiber Optic Backbone', category: 'FTTx & OSP', client: 'NEOM' },
  { title: 'KFSH – LAN/WAN Infrastructure', category: 'Network Infrastructure', client: 'KFSH&RC' },
  { title: 'KAEC – FTTx Deployment', category: 'FTTx & OSP', client: 'Emaar Economic City' },
  { title: 'Kingdom Tower – Security Surveillance', category: 'Security Solutions', client: 'Kingdom Holding' },
];

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const projects = await getProjects(locale);
  const staticProjects = locale === 'ar' ? STATIC_PROJECTS_AR : STATIC_PROJECTS_EN;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageTitle')}
          subtitle={t('pageSubtitle')}
          breadcrumb={[
            { label: t('home'), href: `/${locale}` },
            { label: tNav('projects') },
          ]}
        />

        <SectionWrapper>
          <ProjectsGrid
            projects={projects.length > 0 ? projects : null}
            staticProjects={staticProjects}
            locale={locale}
            labels={{ all: t('all'), client: t('client'), noProjects: t('noProjects') }}
          />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
