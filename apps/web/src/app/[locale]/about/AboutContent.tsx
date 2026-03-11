'use client';

import { motion } from 'framer-motion';
import PageHero from '@/components/ui/PageHero';
import StatsBar from '@/components/ui/StatsBar';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMediaUrl, type StrapiAboutPage } from '@/lib/strapi';

/* ─── Static Fallback Data ────────────────────────────────── */

const STATIC_TIMELINE = [
  { year: '2004', en: { title: 'Founded', desc: 'Multi Technology Company established in Riyadh, Saudi Arabia.' }, ar: { title: 'التأسيس', desc: 'تأسيس شركة مالتي تكنولوجي في الرياض، المملكة العربية السعودية.' } },
  { year: '2008', en: { title: 'First Major Telecom Project', desc: 'Awarded first large-scale GSM network deployment project.' }, ar: { title: 'أول مشروع اتصالات كبير', desc: 'الحصول على أول مشروع نشر شبكة GSM واسع النطاق.' } },
  { year: '2012', en: { title: 'Security Division Launched', desc: 'Expanded into integrated security solutions: CCTV, access control, fire systems.' }, ar: { title: 'إطلاق قسم الحلول الأمنية', desc: 'التوسع في الحلول الأمنية المتكاملة: كاميرات المراقبة، التحكم في الوصول، أنظمة الحريق.' } },
  { year: '2016', en: { title: 'Fiber Optic Expansion', desc: 'Began FTTx and Outside Plant projects for national broadband rollout.' }, ar: { title: 'التوسع في الألياف الضوئية', desc: 'بدء مشاريع FTTx والمنشآت الخارجية لنشر النطاق العريض الوطني.' } },
  { year: '2020', en: { title: 'Managed Services & NOC', desc: 'Launched 24/7 Network Operations Center for managed service clients.' }, ar: { title: 'الخدمات المُدارة ومركز العمليات', desc: 'إطلاق مركز عمليات الشبكة على مدار الساعة لعملاء الخدمات المُدارة.' } },
  { year: '2024', en: { title: '20 Years of Excellence', desc: 'Celebrating two decades of delivering world-class infrastructure across the Kingdom.' }, ar: { title: '20 عاماً من التميز', desc: 'الاحتفال بعقدين من تقديم بنية تحتية عالمية المستوى في جميع أنحاء المملكة.' } },
];

const STATIC_VALUES = [
  { icon: 'shield', en: { title: 'Reliability', desc: 'Delivering on our commitments with consistency and precision.' }, ar: { title: 'الموثوقية', desc: 'الوفاء بالتزاماتنا بثبات ودقة.' } },
  { icon: 'users', en: { title: 'Customer-Centricity', desc: 'Putting client needs at the heart of every solution we design.' }, ar: { title: 'التركيز على العميل', desc: 'وضع احتياجات العميل في صميم كل حل نصممه.' } },
  { icon: 'chart', en: { title: 'Continuous Improvement', desc: 'Constantly evolving our processes, skills, and technologies.' }, ar: { title: 'التحسين المستمر', desc: 'تطوير عملياتنا ومهاراتنا وتقنياتنا باستمرار.' } },
  { icon: 'bulb', en: { title: 'Innovation', desc: 'Embracing new technologies to deliver smarter, future-proof solutions.' }, ar: { title: 'الابتكار', desc: 'تبني التقنيات الجديدة لتقديم حلول أذكى ومستدامة.' } },
];

const STATIC_TEAM = [
  { en: { name: 'Mohammed Al-Faisal', role: 'CEO & Founder' }, ar: { name: 'محمد الفيصل', role: 'الرئيس التنفيذي والمؤسس' } },
  { en: { name: 'Ahmed Hassan', role: 'CTO' }, ar: { name: 'أحمد حسن', role: 'المدير التقني' } },
  { en: { name: 'Sara Al-Otaibi', role: 'VP Operations' }, ar: { name: 'سارة العتيبي', role: 'نائب رئيس العمليات' } },
  { en: { name: 'Khalid Ibrahim', role: 'Director of Engineering' }, ar: { name: 'خالد إبراهيم', role: 'مدير الهندسة' } },
];

/* ─── Icon Map ────────────────────────────────────────────── */

function ValueIcon({ name }: { name?: string }) {
  switch (name) {
    case 'shield':
      return (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
    case 'chart':
      return (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      );
    case 'bulb':
    default:
      return (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      );
  }
}

/* ─── Props ───────────────────────────────────────────────── */

interface Translations {
  sectionTitle: string;
  description: string;
  vision: string;
  visionText: string;
  mission: string;
  missionText: string;
  home: string;
  about: string;
  years: string;
  projects: string;
  clients: string;
  engineers: string;
}

interface Props {
  locale: string;
  translations: Translations;
  aboutPage: StrapiAboutPage | null;
}

/* ─── AboutContent ────────────────────────────────────────── */

export default function AboutContent({ locale, translations: t, aboutPage }: Props) {
  const isAr = locale === 'ar';

  /* Story paragraphs — CMS or static fallback */
  const storyP1 = aboutPage?.story_p1 ?? (isAr
    ? 'منذ تأسيسها في عام 2004، نمت شركة مالتي تكنولوجي من شركة ناشئة صغيرة إلى واحدة من الشركات الرائدة في مجال حلول الاتصالات وتقنية المعلومات في المملكة العربية السعودية.'
    : 'Since its founding in 2004, Multi Technology Company has grown from a small startup into one of the leading telecom and IT solutions providers in the Kingdom of Saudi Arabia.');
  const storyP2 = aboutPage?.story_p2 ?? (isAr
    ? 'نحن متخصصون في تصميم وبناء وصيانة البنية التحتية الحيوية التي تربط الأعمال والمجتمعات في جميع أنحاء المملكة، من شبكات الاتصالات إلى الحلول الأمنية المتكاملة.'
    : 'We specialize in designing, building, and maintaining critical infrastructure that connects businesses and communities across the Kingdom — from telecom networks to integrated security solutions.');
  const storyP3 = aboutPage?.story_p3 ?? (isAr
    ? 'يقود فريقنا المكون من أكثر من 200 مهندس ومتخصص التزامنا بالجودة والابتكار والتميز في الخدمة.'
    : 'Our team of 200+ engineers and specialists drives our commitment to quality, innovation, and service excellence.');

  /* Vision / Mission — CMS or i18n fallback */
  const visionText = aboutPage?.vision_text ?? t.visionText;
  const missionText = aboutPage?.mission_text ?? t.missionText;

  /* Timeline */
  const timelineItems = (aboutPage?.timeline && aboutPage.timeline.length > 0)
    ? aboutPage.timeline.map((item) => ({
        year: item.year,
        title: item.title,
        desc: item.description ?? '',
      }))
    : STATIC_TIMELINE.map((item) => {
        const content = isAr ? item.ar : item.en;
        return { year: item.year, title: content.title, desc: content.desc };
      });

  /* Core Values */
  const coreValues = (aboutPage?.core_values && aboutPage.core_values.length > 0)
    ? aboutPage.core_values.map((v) => ({
        icon: v.icon_name,
        title: v.title,
        desc: v.description ?? '',
      }))
    : STATIC_VALUES.map((v) => {
        const content = isAr ? v.ar : v.en;
        return { icon: v.icon, title: content.title, desc: content.desc };
      });

  /* Team Members */
  const teamMembers = (aboutPage?.team_members && aboutPage.team_members.length > 0)
    ? aboutPage.team_members.map((m) => ({
        name: m.name,
        role: m.role ?? '',
        photoUrl: m.photo ? getStrapiMediaUrl(m.photo.url) : null,
      }))
    : STATIC_TEAM.map((m) => {
        const content = isAr ? m.ar : m.en;
        return { name: content.name, role: content.role, photoUrl: null };
      });

  const stats = [
    { value: 20, label: t.years },
    { value: 500, label: t.projects },
    { value: 150, label: t.clients },
    { value: 200, label: t.engineers },
  ];

  return (
    <main>
      {/* Hero */}
      <PageHero
        title={t.sectionTitle}
        subtitle={t.description}
        breadcrumb={[
          { label: t.home, href: `/${locale}` },
          { label: t.about },
        ]}
      />

      {/* Company Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image / accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-primary to-brand-primary-light overflow-hidden relative">
                <div className="absolute inset-4 rounded-2xl border-2 border-brand-accent/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-brand-accent">20+</div>
                    <div className="mt-2 text-white/60 text-lg">
                      {isAr ? 'سنة من الخبرة' : 'Years of Excellence'}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 geo-pattern opacity-30" />
              </div>
              <div className="absolute -bottom-6 -end-6 rounded-2xl bg-brand-accent p-6 shadow-xl shadow-brand-accent/20">
                <div className="text-3xl font-bold text-brand-primary">2004</div>
                <div className="text-sm font-medium text-brand-primary/70">
                  {isAr ? 'سنة التأسيس' : 'Est.'}
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-primary mb-6">
                {isAr ? 'قصتنا' : 'Our Story'}
              </h2>
              <p className="text-brand-text leading-relaxed text-lg mb-4">{storyP1}</p>
              <p className="text-brand-text leading-relaxed mb-4">{storyP2}</p>
              <p className="text-brand-text leading-relaxed">{storyP3}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-brand-primary p-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 geo-pattern opacity-20" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/20">
                  <svg className="h-7 w-7 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.vision}</h3>
                <p className="text-white/70 text-lg leading-relaxed">{visionText}</p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-brand-accent/20 bg-brand-accent/5 p-10"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/20">
                <svg className="h-7 w-7 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-4">{t.mission}</h3>
              <p className="text-brand-text text-lg leading-relaxed">{missionText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-brand-primary mb-16">
            {isAr ? 'رحلتنا عبر السنين' : 'Our Journey Through the Years'}
          </h2>

          <div className="relative">
            <div className="absolute start-6 top-0 bottom-0 w-px bg-brand-accent/20 md:start-1/2 md:-translate-x-px" />

            {timelineItems.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={item.year + i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    'relative mb-12 flex items-start gap-6',
                    'md:gap-0',
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  )}
                >
                  <div className="absolute start-6 md:start-1/2 -translate-x-1/2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-primary z-10">
                    {item.year.slice(2)}
                  </div>

                  <div className={cn(
                    'ms-20 md:ms-0 md:w-[calc(50%-2rem)]',
                    isEven ? 'md:me-auto md:pe-8 md:text-end' : 'md:ms-auto md:ps-8'
                  )}>
                    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-brand-primary/5 border border-brand-text/5">
                      <span className="text-sm font-bold text-brand-accent">{item.year}</span>
                      <h3 className="mt-1 text-lg font-bold text-brand-primary">{item.title}</h3>
                      <p className="mt-2 text-sm text-brand-text leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-brand-primary mb-4">
            {isAr ? 'قيمنا الأساسية' : 'Our Core Values'}
          </h2>
          <p className="text-center text-brand-text mb-14 max-w-2xl mx-auto">
            {isAr
              ? 'المبادئ التي توجه كل قرار نتخذه وكل مشروع ننفذه'
              : 'The principles that guide every decision we make and every project we deliver'}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-brand-text/10 p-8 text-center hover:border-brand-accent/30 hover:shadow-lg transition-all duration-200"
              >
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent">
                  <ValueIcon name={value.icon} />
                </div>
                <h3 className="text-lg font-bold text-brand-primary">{value.title}</h3>
                <p className="mt-2 text-sm text-brand-text">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-brand-primary mb-4">
            {isAr ? 'فريق القيادة' : 'Leadership Team'}
          </h2>
          <p className="text-center text-brand-text mb-14 max-w-2xl mx-auto">
            {isAr
              ? 'يقود فريقنا خبراء متمرسون يتمتعون بعقود من الخبرة في قطاع الاتصالات والتقنية'
              : 'Our team is led by seasoned experts with decades of experience in telecom and technology'}
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="mx-auto mb-5 h-40 w-40 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-primary-light relative">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-16 w-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-3xl border-2 border-brand-accent/0 group-hover:border-brand-accent/40 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary">{member.name}</h3>
                <p className="mt-1 text-sm text-brand-accent font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-accent py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-primary">
            {isAr ? 'هل أنت مستعد للعمل معنا؟' : 'Ready to Work With Us?'}
          </h2>
          <p className="mt-4 text-brand-primary/70 text-lg">
            {isAr
              ? 'انضم إلى أكثر من 150 عميل يثقون في مالتي تكنولوجي لبنيتهم التحتية.'
              : 'Join 150+ clients who trust Multitech for their infrastructure needs.'}
          </p>
          <div className="mt-8">
            <Link href={`/${locale}/contact`}>
              <Button variant="secondary" size="lg">
                {isAr ? 'تواصل معنا' : 'Get in Touch'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
