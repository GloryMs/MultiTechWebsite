'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import Link from 'next/link';

export default function AboutPreview() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <SectionWrapper className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-primary to-brand-primary-light overflow-hidden relative">
            <div className="absolute inset-6 rounded-2xl border-2 border-brand-accent/20" />
            <div className="absolute inset-0 geo-pattern opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="text-5xl font-bold text-brand-accent">20+</div>
                <div className="mt-2 text-white/60">
                  {locale === 'ar' ? 'سنة في بناء بنية المملكة التحتية' : 'Years Building the Kingdom\'s Infrastructure'}
                </div>
              </div>
            </div>
          </div>
          {/* Floating accent */}
          <div className="absolute -bottom-4 -end-4 rounded-xl bg-brand-accent px-5 py-3 shadow-lg shadow-brand-accent/20">
            <span className="text-xl font-bold text-brand-primary">
              {locale === 'ar' ? 'منذ 2004' : 'Est. 2004'}
            </span>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: locale === 'ar' ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            {locale === 'ar' ? 'من نحن' : 'About Us'}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-brand-primary sm:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-text">
            {t('description')}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-brand-bg p-4">
              <div className="text-2xl font-bold text-brand-accent">500+</div>
              <div className="text-sm text-brand-text">{locale === 'ar' ? 'مشروع مكتمل' : 'Projects Completed'}</div>
            </div>
            <div className="rounded-xl bg-brand-bg p-4">
              <div className="text-2xl font-bold text-brand-accent">200+</div>
              <div className="text-sm text-brand-text">{locale === 'ar' ? 'مهندس متخصص' : 'Expert Engineers'}</div>
            </div>
          </div>
          <div className="mt-8">
            <Link href={`/${locale}/about`}>
              <Button variant="outline">{t('learnMore')}</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
