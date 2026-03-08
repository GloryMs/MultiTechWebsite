'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-primary pt-32 pb-20">
      {/* Geometric pattern */}
      <div className="absolute inset-0 geo-pattern opacity-20" />

      {/* Accent glow */}
      <div className="absolute -top-32 end-0 h-64 w-64 rounded-full bg-brand-accent/8 blur-3xl" />
      <div className="absolute -bottom-16 start-0 h-48 w-48 rounded-full bg-brand-gold/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 flex items-center gap-2 text-sm text-white/40"
          >
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <svg className="h-3.5 w-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                <span className={i === breadcrumb.length - 1 ? 'text-brand-accent' : 'hover:text-white/60 transition-colors'}>
                  {item.label}
                </span>
              </span>
            ))}
          </motion.nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg text-white/50"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 h-1 w-20 origin-start rounded-full bg-gradient-to-r from-brand-accent to-brand-gold"
        />
      </div>

      {/* Bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
    </section>
  );
}
