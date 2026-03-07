import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function PartnersPage() {
  const t = useTranslations('nav');

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-brand-primary pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {t("partners")}
            </h1>
            <div className="mt-2 h-1 w-16 bg-brand-accent rounded-full" />
          </div>
        </section>

        <SectionWrapper>
          <p className="text-brand-text text-lg">
            Content coming soon. This page will be fully implemented in Phase 2.
          </p>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
