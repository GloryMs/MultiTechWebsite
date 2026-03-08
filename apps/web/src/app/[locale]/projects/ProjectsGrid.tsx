'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { StrapiProject } from '@/lib/strapi';

const PLACEHOLDER_COLORS = [
  'from-brand-accent/20 to-brand-primary/10',
  'from-brand-gold/20 to-brand-primary/10',
  'from-brand-accent/10 to-brand-gold/10',
] as const;

interface StaticProject {
  title: string;
  category: string;
  client: string;
}

interface Props {
  projects: StrapiProject[] | null;
  staticProjects: StaticProject[];
  locale: string;
  labels: { all: string; client: string; noProjects: string };
}

export default function ProjectsGrid({ projects, staticProjects, locale, labels }: Props) {
  const hasCms = projects && projects.length > 0;

  /* Build unique category list */
  const categories: string[] = hasCms
    ? [labels.all, ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean) as string[]))]
    : [labels.all, ...Array.from(new Set(staticProjects.map((p) => p.category)))];

  const [active, setActive] = useState(labels.all);

  const filtered = hasCms
    ? (active === labels.all ? projects : projects.filter((p) => p.category === active))
    : (active === labels.all ? staticProjects : staticProjects.filter((p) => p.category === active));

  return (
    <>
      {/* Filter Pills */}
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200',
                active === cat
                  ? 'bg-brand-accent text-brand-primary shadow-lg shadow-brand-accent/25'
                  : 'bg-white border border-brand-text/10 text-brand-text hover:border-brand-accent/30 hover:text-brand-accent'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-brand-text py-16">{labels.noProjects}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hasCms
            ? (filtered as StrapiProject[]).map((project, i) => {
                const imgUrl = project.cover_image ? getStrapiMediaUrl(project.cover_image.url) : null;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="group cursor-pointer"
                  >
                    <div className={cn(
                      'aspect-[16/10] rounded-2xl bg-gradient-to-br relative overflow-hidden mb-5',
                      PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
                    )}>
                      {imgUrl
                        ? <img src={imgUrl} alt={project.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="absolute inset-0 geo-pattern opacity-40" />
                      }
                      {project.category && (
                        <div className="absolute top-4 start-4 rounded-lg bg-brand-primary/80 backdrop-blur-sm px-3 py-1">
                          <span className="text-xs font-semibold text-brand-accent">{project.category}</span>
                        </div>
                      )}
                      {project.featured && (
                        <div className="absolute top-4 end-4 rounded-lg bg-brand-gold/90 px-3 py-1">
                          <span className="text-xs font-semibold text-brand-primary">★</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="mt-1 text-sm text-brand-text">
                        {labels.client}: {project.client}
                        {project.year ? ` · ${project.year}` : ''}
                      </p>
                    )}
                  </motion.div>
                );
              })
            : (filtered as StaticProject[]).map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className={cn(
                    'aspect-[16/10] rounded-2xl bg-gradient-to-br relative overflow-hidden mb-5',
                    PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
                  )}>
                    <div className="absolute inset-0 geo-pattern opacity-40" />
                    <div className="absolute top-4 start-4 rounded-lg bg-brand-primary/80 backdrop-blur-sm px-3 py-1">
                      <span className="text-xs font-semibold text-brand-accent">{project.category}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-text">
                    {labels.client}: {project.client}
                  </p>
                </motion.div>
              ))
          }
        </div>
      )}
    </>
  );
}
