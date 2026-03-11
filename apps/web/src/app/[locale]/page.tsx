import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutPreview from '@/components/sections/AboutPreview';
import PartnersSection from '@/components/sections/PartnersSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsBar from '@/components/ui/StatsBar';
import CTASection from '@/components/sections/CTASection';
import {
  getServices,
  getProjects,
  getPartners,
  getTestimonials,
} from '@/lib/strapi';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'stats' });

  /* Fetch CMS data in parallel — all return [] on failure so page never crashes */
  const [services, projects, partners, testimonials] = await Promise.all([
    getServices(locale),
    getProjects(locale, true), // featured only for homepage
    getPartners('en'), // partner names & logos are language-neutral — always use EN
    getTestimonials(locale),
  ]);

  const stats = [
    { value: 20, label: t('years') },
    { value: 500, label: t('projects') },
    { value: 150, label: t('clients') },
    { value: 200, label: t('engineers') },
  ];

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutPreview />
        <ServicesSection services={services} />
        <StatsBar stats={stats} />
        <PartnersSection partners={partners} />
        <ProjectsSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
