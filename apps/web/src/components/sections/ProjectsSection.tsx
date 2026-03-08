'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { StrapiProject } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

const PLACEHOLDER_COLORS = [
  'from-brand-accent/20 to-brand-primary/10',
  'from-brand-gold/20 to-brand-primary/10',
  'from-brand-accent/10 to-brand-gold/10',
] as const;

const STATIC_PROJECTS = [
  {
    en: { title: 'King Abdulaziz International Airport – IBS', category: 'GSM & IBS', client: 'GACA' },
    ar: { title: 'مطار الملك عبدالعزيز الدولي – IBS', category: 'GSM و IBS', client: 'هيئة الطيران المدني' },
  },
  {
    en: { title: 'Riyadh Metro – Network Infrastructure', category: 'Network Infrastructure', client: 'RDA' },
    ar: { title: 'مترو الرياض – البنية التحتية للشبكات', category: 'البنية التحتية للشبكات', client: 'هيئة تطوير الرياض' },
  },
  {
    en: { title: 'NEOM – Fiber Optic Backbone', category: 'FTTx & OSP', client: 'NEOM' },
    ar: { title: 'نيوم – شبكة الألياف الضوئية الرئيسية', category: 'FTTx و OSP', client: 'نيوم' },
  },
];

interface Props {
  projects?: StrapiProject[];
}

export default function ProjectsSection({ projects }: Props) {
  const t = useTranslations('projects');
  const locale = useLocale();
  const hasCmsData = projects && projects.length > 0;

  return (
    <SectionWrapper>
      <div className="text-center mb-14">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
          {locale === 'ar' ? 'أعمالنا' : 'Our Work'}
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-primary sm:text-4xl">
          {t('sectionTitle')}
        </h2>
        <p className="mt-3 text-brand-text max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {hasCmsData
          ? projects.map((project, i) => {
              const imgUrl = project.cover_image
                ? getStrapiMediaUrl(project.cover_image.url)
                : null;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className={cn(
                    'aspect-[16/10] rounded-2xl bg-gradient-to-br relative overflow-hidden mb-5',
                    PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
                  )}>
                    {imgUrl ? (
                      <img src={imgUrl} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 geo-pattern opacity-40" />
                    )}
                    {project.category && (
                      <div className="absolute top-4 start-4 rounded-lg bg-brand-primary/80 backdrop-blur-sm px-3 py-1">
                        <span className="text-xs font-semibold text-brand-accent">{project.category}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  {project.client && (
                    <p className="mt-1 text-sm text-brand-text">
                      {locale === 'ar' ? 'العميل: ' : 'Client: '}{project.client}
                    </p>
                  )}
                </motion.div>
              );
            })
          : STATIC_PROJECTS.map((project, i) => {
              const content = locale === 'ar' ? project.ar : project.en;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className={cn(
                    'aspect-[16/10] rounded-2xl bg-gradient-to-br relative overflow-hidden mb-5',
                    PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
                  )}>
                    <div className="absolute inset-0 geo-pattern opacity-40" />
                    <div className="absolute top-4 start-4 rounded-lg bg-brand-primary/80 backdrop-blur-sm px-3 py-1">
                      <span className="text-xs font-semibold text-brand-accent">{content.category}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                    {content.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-text">
                    {locale === 'ar' ? 'العميل: ' : 'Client: '}{content.client}
                  </p>
                </motion.div>
              );
            })}
      </div>

      <div className="mt-12 text-center">
        <Link href={`/${locale}/projects`}>
          <Button variant="outline">{t('viewAll')}</Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
