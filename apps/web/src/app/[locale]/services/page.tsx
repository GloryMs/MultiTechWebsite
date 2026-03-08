'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/* ─── Service Data ────────────────────────────────────────── */
interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  features: { en: string; ar: string }[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'networkInfra',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12 20.5h.01" />
      </svg>
    ),
    features: [
      { en: 'LAN/WAN design and deployment', ar: 'تصميم ونشر شبكات LAN/WAN' },
      { en: 'Data center networking', ar: 'شبكات مراكز البيانات' },
      { en: 'Structured cabling (Cat6/Cat6A/Fiber)', ar: 'التمديدات المهيكلة (Cat6/Cat6A/الألياف)' },
      { en: 'Network assessment & optimization', ar: 'تقييم وتحسين الشبكات' },
      { en: 'Wireless network design (Wi-Fi 6/6E)', ar: 'تصميم الشبكات اللاسلكية (Wi-Fi 6/6E)' },
    ],
  },
  {
    id: 'gsmIbs',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: [
      { en: 'In-Building DAS solutions', ar: 'حلول أنظمة الهوائيات الموزعة داخل المباني' },
      { en: 'Small cell deployments', ar: 'نشر الخلايا الصغيرة' },
      { en: 'RF planning & optimization', ar: 'تخطيط وتحسين الترددات الراديوية' },
      { en: 'Multi-operator support', ar: 'دعم متعدد المشغلين' },
      { en: 'Coverage surveys & testing', ar: 'مسوحات واختبارات التغطية' },
    ],
  },
  {
    id: 'fttx',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: [
      { en: 'FTTH/FTTP network design', ar: 'تصميم شبكات FTTH/FTTP' },
      { en: 'Aerial & underground OSP', ar: 'المنشآت الخارجية الهوائية والأرضية' },
      { en: 'Splicing & termination', ar: 'لحام وتوصيل الألياف' },
      { en: 'OTDR testing & documentation', ar: 'اختبار OTDR والتوثيق' },
      { en: 'Project management & as-built', ar: 'إدارة المشاريع والمخططات التنفيذية' },
    ],
  },
  {
    id: 'managedServices',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    features: [
      { en: '24/7 network monitoring (NOC)', ar: 'مراقبة الشبكة على مدار الساعة (NOC)' },
      { en: 'Preventive & corrective maintenance', ar: 'الصيانة الوقائية والتصحيحية' },
      { en: 'SLA-based support contracts', ar: 'عقود دعم مبنية على اتفاقيات مستوى الخدمة' },
      { en: 'Spare parts management', ar: 'إدارة قطع الغيار' },
      { en: 'Performance reporting & analytics', ar: 'تقارير الأداء والتحليلات' },
    ],
  },
  {
    id: 'security',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    features: [
      { en: 'CCTV & video surveillance systems', ar: 'أنظمة كاميرات المراقبة والفيديو' },
      { en: 'Access control & biometric systems', ar: 'أنظمة التحكم في الوصول والبصمة' },
      { en: 'Intrusion detection & alarm systems', ar: 'أنظمة كشف التسلل والإنذار' },
      { en: 'Fire detection & suppression', ar: 'أنظمة كشف وإطفاء الحرائق' },
      { en: 'Integrated security command centers', ar: 'مراكز القيادة الأمنية المتكاملة' },
    ],
  },
  {
    id: 'consulting',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    features: [
      { en: 'IT infrastructure assessment', ar: 'تقييم البنية التحتية لتقنية المعلومات' },
      { en: 'Technology roadmap planning', ar: 'تخطيط خارطة طريق التقنية' },
      { en: 'Vendor evaluation & selection', ar: 'تقييم واختيار الموردين' },
      { en: 'Digital transformation strategy', ar: 'استراتيجية التحول الرقمي' },
      { en: 'Compliance & standards advisory', ar: 'استشارات الامتثال والمعايير' },
    ],
  },
];

/* ─── Process Steps ───────────────────────────────────────── */
const PROCESS_STEPS = [
  { icon: '01', en: { title: 'Survey', desc: 'Site surveys and requirements gathering' }, ar: { title: 'المسح', desc: 'مسح المواقع وجمع المتطلبات' } },
  { icon: '02', en: { title: 'Design', desc: 'Engineering design and solution architecture' }, ar: { title: 'التصميم', desc: 'التصميم الهندسي وهندسة الحلول' } },
  { icon: '03', en: { title: 'Implement', desc: 'Professional installation and deployment' }, ar: { title: 'التنفيذ', desc: 'التركيب والنشر الاحترافي' } },
  { icon: '04', en: { title: 'Optimize', desc: 'Testing, tuning, and performance optimization' }, ar: { title: 'التحسين', desc: 'الاختبار والضبط وتحسين الأداء' } },
  { icon: '05', en: { title: 'Handover', desc: 'Documentation, training, and support' }, ar: { title: 'التسليم', desc: 'التوثيق والتدريب والدعم' } },
];

/* ─── Services Page ───────────────────────────────────────── */
export default function ServicesPage() {
  const t = useTranslations('services');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const [activeService, setActiveService] = useState<string>(SERVICES[0].id);

  const currentService = SERVICES.find((s) => s.id === activeService)!;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          title={t('sectionTitle')}
          subtitle={t('subtitle')}
          breadcrumb={[
            { label: tNav('home'), href: `/${locale}` },
            { label: t('sectionTitle') },
          ]}
        />

        {/* Service Tabs + Detail */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-3 mb-12">
              {SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => setActiveService(svc.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200',
                    activeService === svc.id
                      ? 'bg-brand-accent text-brand-primary shadow-lg shadow-brand-accent/20'
                      : 'bg-white text-brand-text border border-brand-text/10 hover:border-brand-accent/30 hover:text-brand-primary'
                  )}
                >
                  <span className="hidden sm:inline">{svc.icon}</span>
                  {t(svc.id as keyof IntlMessages['services'])}
                </button>
              ))}
            </div>

            {/* Active Service Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-10 lg:grid-cols-2"
              >
                {/* Left: Description */}
                <div>
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
                    {currentService.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-brand-primary">
                    {t(activeService as keyof IntlMessages['services'])}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-brand-text">
                    {t(`${activeService}Desc` as keyof IntlMessages['services'])}
                  </p>

                  <div className="mt-8">
                    <Link href={`/${locale}/contact`}>
                      <Button>
                        {locale === 'ar' ? 'طلب استشارة' : 'Request a Consultation'}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Feature List */}
                <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-primary/5 border border-brand-text/5">
                  <h3 className="text-lg font-bold text-brand-primary mb-6">
                    {locale === 'ar' ? 'القدرات الرئيسية' : 'Key Capabilities'}
                  </h3>
                  <ul className="space-y-4">
                    {currentService.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
                          <svg className="h-3.5 w-3.5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-brand-primary font-medium">
                          {locale === 'ar' ? feature.ar : feature.en}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* All Services Grid */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-brand-primary mb-4">
              {locale === 'ar' ? 'جميع خدماتنا' : 'All Our Services'}
            </h2>
            <p className="text-center text-brand-text mb-14 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'نقدم مجموعة شاملة من حلول الاتصالات وتقنية المعلومات'
                : 'We offer a comprehensive suite of telecom and IT solutions'}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  onClick={() => {
                    setActiveService(svc.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={cn(
                    'group cursor-pointer rounded-2xl border p-8 transition-all duration-200',
                    'hover:border-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/10',
                    activeService === svc.id
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-brand-text/10 bg-brand-bg'
                  )}
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-brand-primary">
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-2">
                    {t(svc.id as keyof IntlMessages['services'])}
                  </h3>
                  <p className="text-brand-text text-sm leading-relaxed">
                    {t(`${svc.id}Desc` as keyof IntlMessages['services'])}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-brand-accent flex items-center gap-1">
                    {locale === 'ar' ? 'المزيد' : 'Learn more'}
                    <svg className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Stepper */}
        <section className="py-20 bg-brand-primary geo-pattern">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-white mb-4">
              {locale === 'ar' ? 'كيف نعمل' : 'How We Work'}
            </h2>
            <p className="text-center text-white/50 mb-16 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'نهجنا المنظم يضمن تسليم مشاريع ناجحة في كل مرة'
                : 'Our structured approach ensures successful project delivery every time'}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {PROCESS_STEPS.map((step, i) => {
                const content = locale === 'ar' ? step.ar : step.en;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative text-center"
                  >
                    {/* Step Number */}
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary text-xl font-bold">
                      {step.icon}
                    </div>

                    {/* Connector line (hidden on last and on mobile) */}
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="absolute top-8 start-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-brand-accent/30 lg:block" />
                    )}

                    <h3 className="text-lg font-bold text-white">{content.title}</h3>
                    <p className="mt-1 text-sm text-white/50">{content.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-primary">
              {locale === 'ar' ? 'هل لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
            </h2>
            <p className="mt-4 text-lg text-brand-text max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'فريقنا من المهندسين المتخصصين جاهز لمناقشة احتياجاتك وتقديم حل مخصص.'
                : 'Our team of specialized engineers is ready to discuss your needs and deliver a tailored solution.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={`/${locale}/contact`}>
                <Button size="lg">
                  {locale === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
                </Button>
              </Link>
              <Link href={`/${locale}/projects`}>
                <Button variant="outline" size="lg">
                  {locale === 'ar' ? 'شاهد مشاريعنا' : 'View Our Projects'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
