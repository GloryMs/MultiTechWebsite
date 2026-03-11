'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { StrapiService } from '@/lib/strapi';

/* ─── Icon Map ────────────────────────────────────────────── */

// Fallback: derive icon name from slug when Strapi icon field is not yet set
const SLUG_TO_ICON: Record<string, string> = {
  'network-infrastructure': 'network',
  'gsm-ibs-solutions': 'gsm',
  'fttx-osp': 'fiber',
  'managed-services': 'managed',
  'security-solutions': 'security',
  'it-consulting': 'consulting',
};

function getIcon(svc: StrapiService): React.ReactNode {
  const key = svc.icon ?? SLUG_TO_ICON[svc.slug] ?? '';
  return ICON_MAP[key] ?? null;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  network: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12 20.5h.01" />
    </svg>
  ),
  gsm: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  fiber: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  managed: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  security: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  consulting: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
};

/* ─── Static Fallback Data ────────────────────────────────── */

function getFallbackServices(locale: string): StrapiService[] {
  const ar = locale === 'ar';
  return [
    {
      id: 0, documentId: 'network-infrastructure', slug: 'network-infrastructure',
      icon: 'network', sort_order: 1,
      title: ar ? 'البنية التحتية للشبكات' : 'Network Infrastructure',
      short_desc: ar
        ? 'تصميم وبناء وصيانة بنية تحتية قوية للشبكات للنشر المؤسسي وعلى مستوى شركات الاتصالات.'
        : 'Design, build, and maintain robust network infrastructure for enterprise and carrier-grade deployments.',
      features: ar
        ? ['تصميم ونشر شبكات LAN/WAN', 'شبكات مراكز البيانات', 'التمديدات المهيكلة (Cat6/Cat6A/الألياف)', 'تقييم وتحسين الشبكات', 'تصميم الشبكات اللاسلكية (Wi-Fi 6/6E)']
        : ['LAN/WAN design and deployment', 'Data center networking', 'Structured cabling (Cat6/Cat6A/Fiber)', 'Network assessment & optimization', 'Wireless network design (Wi-Fi 6/6E)'],
    },
    {
      id: 0, documentId: 'gsm-ibs-solutions', slug: 'gsm-ibs-solutions',
      icon: 'gsm', sort_order: 2,
      title: ar ? 'حلول GSM و IBS' : 'GSM & IBS Solutions',
      short_desc: ar
        ? 'حلول التغطية الداخلية وتحسين تغطية GSM للاتصال السلس داخل المباني.'
        : 'In-Building Solutions and GSM coverage optimization for seamless indoor connectivity.',
      features: ar
        ? ['حلول أنظمة الهوائيات الموزعة داخل المباني', 'نشر الخلايا الصغيرة', 'تخطيط وتحسين الترددات الراديوية', 'دعم متعدد المشغلين', 'مسوحات واختبارات التغطية']
        : ['In-Building DAS solutions', 'Small cell deployments', 'RF planning & optimization', 'Multi-operator support', 'Coverage surveys & testing'],
    },
    {
      id: 0, documentId: 'fttx-osp', slug: 'fttx-osp',
      icon: 'fiber', sort_order: 3,
      title: ar ? 'FTTx و OSP' : 'FTTx & OSP',
      short_desc: ar
        ? 'هندسة الألياف الضوئية والمنشآت الخارجية لشبكات النطاق العريض من الجيل التالي.'
        : 'Fiber-to-the-X and Outside Plant engineering for next-generation broadband networks.',
      features: ar
        ? ['تصميم شبكات FTTH/FTTP', 'المنشآت الخارجية الهوائية والأرضية', 'لحام وتوصيل الألياف', 'اختبار OTDR والتوثيق', 'إدارة المشاريع والمخططات التنفيذية']
        : ['FTTH/FTTP network design', 'Aerial & underground OSP', 'Splicing & termination', 'OTDR testing & documentation', 'Project management & as-built'],
    },
    {
      id: 0, documentId: 'managed-services', slug: 'managed-services',
      icon: 'managed', sort_order: 4,
      title: ar ? 'الخدمات المُدارة' : 'Managed Services',
      short_desc: ar
        ? 'مراقبة وصيانة ودعم تشغيلي للشبكات على مدار الساعة للحفاظ على تشغيل بنيتك التحتية.'
        : '24/7 network monitoring, maintenance, and operational support to keep your infrastructure running.',
      features: ar
        ? ['مراقبة الشبكة على مدار الساعة (NOC)', 'الصيانة الوقائية والتصحيحية', 'عقود دعم مبنية على اتفاقيات مستوى الخدمة', 'إدارة قطع الغيار', 'تقارير الأداء والتحليلات']
        : ['24/7 network monitoring (NOC)', 'Preventive & corrective maintenance', 'SLA-based support contracts', 'Spare parts management', 'Performance reporting & analytics'],
    },
    {
      id: 0, documentId: 'security-solutions', slug: 'security-solutions',
      icon: 'security', sort_order: 5,
      title: ar ? 'الحلول الأمنية' : 'Security Solutions',
      short_desc: ar
        ? 'كاميرات المراقبة، التحكم في الوصول، كشف التسلل، وأنظمة أمنية متكاملة للحماية الشاملة.'
        : 'CCTV, Access Control, Intrusion Detection, and integrated security systems for comprehensive protection.',
      features: ar
        ? ['أنظمة كاميرات المراقبة والفيديو', 'أنظمة التحكم في الوصول والبصمة', 'أنظمة كشف التسلل والإنذار', 'أنظمة كشف وإطفاء الحرائق', 'مراكز القيادة الأمنية المتكاملة']
        : ['CCTV & video surveillance systems', 'Access control & biometric systems', 'Intrusion detection & alarm systems', 'Fire detection & suppression', 'Integrated security command centers'],
    },
    {
      id: 0, documentId: 'it-consulting', slug: 'it-consulting',
      icon: 'consulting', sort_order: 6,
      title: ar ? 'استشارات تقنية المعلومات' : 'IT Consulting',
      short_desc: ar
        ? 'استشارات تقنية استراتيجية لمواءمة استثماراتك في تقنية المعلومات مع أهداف أعمالك.'
        : 'Strategic technology advisory to align your IT investments with business objectives.',
      features: ar
        ? ['تقييم البنية التحتية لتقنية المعلومات', 'تخطيط خارطة طريق التقنية', 'تقييم واختيار الموردين', 'استراتيجية التحول الرقمي', 'استشارات الامتثال والمعايير']
        : ['IT infrastructure assessment', 'Technology roadmap planning', 'Vendor evaluation & selection', 'Digital transformation strategy', 'Compliance & standards advisory'],
    },
  ];
}

/* ─── Process Steps ───────────────────────────────────────── */

const PROCESS_STEPS = [
  { num: '01', en: { title: 'Survey', desc: 'Site surveys and requirements gathering' }, ar: { title: 'المسح', desc: 'مسح المواقع وجمع المتطلبات' } },
  { num: '02', en: { title: 'Design', desc: 'Engineering design and solution architecture' }, ar: { title: 'التصميم', desc: 'التصميم الهندسي وهندسة الحلول' } },
  { num: '03', en: { title: 'Implement', desc: 'Professional installation and deployment' }, ar: { title: 'التنفيذ', desc: 'التركيب والنشر الاحترافي' } },
  { num: '04', en: { title: 'Optimize', desc: 'Testing, tuning, and performance optimization' }, ar: { title: 'التحسين', desc: 'الاختبار والضبط وتحسين الأداء' } },
  { num: '05', en: { title: 'Handover', desc: 'Documentation, training, and support' }, ar: { title: 'التسليم', desc: 'التوثيق والتدريب والدعم' } },
];

/* ─── Component ───────────────────────────────────────────── */

interface Props {
  services: StrapiService[];
  locale: string;
}

export default function ServicesContent({ services: initialServices, locale }: Props) {
  const ar = locale === 'ar';
  const services = initialServices.length > 0 ? initialServices : getFallbackServices(locale);
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug ?? '');

  const activeService = services.find((s) => s.slug === activeSlug) ?? services[0];

  return (
    <>
      {/* Service Tabs + Detail */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-12">
            {services.map((svc) => (
              <button
                key={svc.slug}
                suppressHydrationWarning
                onClick={() => setActiveSlug(svc.slug)}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200',
                  activeSlug === svc.slug
                    ? 'bg-brand-accent text-brand-primary shadow-lg shadow-brand-accent/20'
                    : 'bg-white text-brand-text border border-brand-text/10 hover:border-brand-accent/30 hover:text-brand-primary'
                )}
              >
                <span className="hidden sm:inline">{getIcon(svc)}</span>
                {svc.title}
              </button>
            ))}
          </div>

          {/* Active Service Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-10 lg:grid-cols-2"
            >
              {/* Left: Description */}
              <div>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
                  {activeService && getIcon(activeService)}
                </div>
                <h2 className="text-3xl font-bold text-brand-primary">{activeService?.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-brand-text">
                  {activeService?.short_desc}
                </p>
                <div className="mt-8">
                  <Link href={`/${locale}/contact`}>
                    <Button>{ar ? 'طلب استشارة' : 'Request a Consultation'}</Button>
                  </Link>
                </div>
              </div>

              {/* Right: Feature List */}
              <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-primary/5 border border-brand-text/5">
                <h3 className="text-lg font-bold text-brand-primary mb-6">
                  {ar ? 'القدرات الرئيسية' : 'Key Capabilities'}
                </h3>
                <ul className="space-y-4">
                  {(activeService?.features ?? []).map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: ar ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
                        <svg className="h-3.5 w-3.5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-brand-primary font-medium">{feature}</span>
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
            {ar ? 'جميع خدماتنا' : 'All Our Services'}
          </h2>
          <p className="text-center text-brand-text mb-14 max-w-2xl mx-auto">
            {ar
              ? 'نقدم مجموعة شاملة من حلول الاتصالات وتقنية المعلومات'
              : 'We offer a comprehensive suite of telecom and IT solutions'}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  setActiveSlug(svc.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn(
                  'group cursor-pointer rounded-2xl border p-8 transition-all duration-200',
                  'hover:border-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/10',
                  activeSlug === svc.slug
                    ? 'border-brand-accent bg-brand-accent/5'
                    : 'border-brand-text/10 bg-brand-bg'
                )}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-brand-primary">
                  {getIcon(svc)}
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">{svc.title}</h3>
                <p className="text-brand-text text-sm leading-relaxed">{svc.short_desc}</p>
                <p className="mt-4 text-sm font-semibold text-brand-accent flex items-center gap-1">
                  {ar ? 'المزيد' : 'Learn more'}
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
            {ar ? 'كيف نعمل' : 'How We Work'}
          </h2>
          <p className="text-center text-white/50 mb-16 max-w-2xl mx-auto">
            {ar
              ? 'نهجنا المنظم يضمن تسليم مشاريع ناجحة في كل مرة'
              : 'Our structured approach ensures successful project delivery every time'}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => {
              const content = ar ? step.ar : step.en;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary text-xl font-bold">
                    {step.num}
                  </div>
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
            {ar ? 'هل لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
          </h2>
          <p className="mt-4 text-lg text-brand-text max-w-2xl mx-auto">
            {ar
              ? 'فريقنا من المهندسين المتخصصين جاهز لمناقشة احتياجاتك وتقديم حل مخصص.'
              : 'Our team of specialized engineers is ready to discuss your needs and deliver a tailored solution.'}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <Button size="lg">{ar ? 'تواصل معنا الآن' : 'Contact Us Now'}</Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" size="lg">
                {ar ? 'شاهد مشاريعنا' : 'View Our Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
