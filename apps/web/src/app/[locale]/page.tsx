import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsBar from '@/components/ui/StatsBar';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  const t = useTranslations('stats');

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
        <ServicesSection />
        <StatsBar stats={stats} />
        {/* TODO: Partners carousel, Featured Projects, Testimonials */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
