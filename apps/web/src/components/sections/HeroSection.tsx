'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-primary">
      {/* Geometric mesh background */}
      <div className="absolute inset-0 geo-pattern opacity-30" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary via-brand-primary/90 to-brand-primary" />
      <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-brand-accent/5 to-transparent" />

      {/* Animated accent circles */}
      <motion.div
        className="absolute -top-40 end-[-10%] h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 start-[-5%] h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-sm font-medium text-brand-accent">
              {locale === 'ar' ? 'منذ 2004' : 'Since 2004'}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-brand-accent to-brand-gold bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href={`/${locale}/services`}>
              <Button size="lg" className="animate-pulse-glow">
                {t('cta')}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button variant="outline" size="lg">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
    </section>
  );
}
