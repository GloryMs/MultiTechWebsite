'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { cn } from '@/lib/utils';
import type { StrapiTestimonial } from '@/lib/strapi';

const STATIC_TESTIMONIALS = [
  {
    en: { quote: 'Multitech delivered our in-building coverage solution ahead of schedule and with exceptional quality. Their technical expertise is unmatched.', name: 'Fahad Al-Rashidi', company: 'Saudi Telecom Company', role: 'Project Director' },
    ar: { quote: 'قدمت مالتي تكنولوجي حل التغطية الداخلية لدينا قبل الموعد المحدد وبجودة استثنائية. خبرتهم التقنية لا مثيل لها.', name: 'فهد الرشيدي', company: 'شركة الاتصالات السعودية', role: 'مدير المشاريع' },
    rating: 5,
  },
  {
    en: { quote: 'We\'ve partnered with Multitech for over 5 years on managed services. Their 24/7 NOC team has maintained 99.9% uptime across all our sites.', name: 'Nora Al-Shamrani', company: 'Mobily', role: 'VP Network Operations' },
    ar: { quote: 'تعاونا مع مالتي تكنولوجي لأكثر من 5 سنوات في الخدمات المُدارة. حافق فريق مركز عمليات الشبكة على وقت تشغيل 99.9% في جميع مواقعنا.', name: 'نورة الشمراني', company: 'موبايلي', role: 'نائب رئيس عمليات الشبكة' },
    rating: 5,
  },
  {
    en: { quote: 'Their fiber optic installation work was meticulous. The documentation and handover process was the best we\'ve experienced from any contractor.', name: 'Omar Badr', company: 'Zain KSA', role: 'Infrastructure Manager' },
    ar: { quote: 'كان عمل تركيب الألياف الضوئية دقيقاً للغاية. عملية التوثيق والتسليم كانت الأفضل التي شهدناها من أي مقاول.', name: 'عمر بدر', company: 'زين السعودية', role: 'مدير البنية التحتية' },
    rating: 5,
  },
];

interface Props {
  testimonials?: StrapiTestimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  const items = testimonials && testimonials.length > 0 ? testimonials : null;
  const total = items ? items.length : STATIC_TESTIMONIALS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  /* Resolve active item from CMS or static data */
  const activeCms = items?.[current];
  const activeStatic = STATIC_TESTIMONIALS[current];
  const quote = activeCms ? activeCms.quote : (locale === 'ar' ? activeStatic.ar.quote : activeStatic.en.quote);
  const name  = activeCms ? activeCms.client_name : (locale === 'ar' ? activeStatic.ar.name : activeStatic.en.name);
  const company = activeCms ? (activeCms.company ?? '') : activeStatic.en.company;
  const role  = activeCms ? '' : (locale === 'ar' ? activeStatic.ar.role : activeStatic.en.role);
  const rating = activeCms ? activeCms.rating : activeStatic.rating;

  return (
    <SectionWrapper dark>
      <div className="text-center mb-12">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
          {t('sectionTitle')}
        </span>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/20">
          <svg className="h-7 w-7 text-brand-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xl leading-relaxed text-white/80 sm:text-2xl">
              &ldquo;{quote}&rdquo;
            </p>

            <div className="mt-6 flex items-center justify-center gap-1">
              {Array.from({ length: rating }).map((_, i) => (
                <svg key={i} className="h-5 w-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-lg font-semibold text-white">{name}</p>
              <p className="text-sm text-white/50">{role}{role && company ? ', ' : ''}{company}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              suppressHydrationWarning
              onClick={() => setCurrent(i)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                i === current ? 'w-8 bg-brand-accent' : 'w-2.5 bg-white/20 hover:bg-white/40'
              )}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
