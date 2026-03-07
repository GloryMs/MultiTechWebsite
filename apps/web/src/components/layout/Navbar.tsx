'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import Button from '../ui/Button';
import Link from 'next/link';

const NAV_KEYS = ['home', 'about', 'services', 'projects', 'partners', 'media', 'blog', 'contact'] as const;

const NAV_PATHS: Record<string, string> = {
  home: '',
  about: '/about',
  services: '/services',
  projects: '/projects',
  partners: '/partners',
  media: '/media',
  blog: '/blog',
  contact: '/contact',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-brand-primary/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent">
              <span className="text-lg font-bold text-brand-primary">M</span>
            </div>
            <span className="text-xl font-bold text-white">
              Multi<span className="text-brand-accent">tech</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_KEYS.map((key) => (
              <Link
                key={key}
                href={`/${locale}${NAV_PATHS[key]}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link href={`/${locale}/contact`}>
              <Button size="sm">{t('getQuote')}</Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={cn('block h-0.5 w-6 bg-white transition-all duration-300', mobileOpen && 'translate-y-2 rotate-45')} />
              <span className={cn('block h-0.5 w-6 bg-white transition-all duration-300', mobileOpen && 'opacity-0')} />
              <span className={cn('block h-0.5 w-6 bg-white transition-all duration-300', mobileOpen && '-translate-y-2 -rotate-45')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -300 : 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: locale === 'ar' ? -300 : 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-brand-primary pt-24"
          >
            <div className="flex flex-col items-center gap-4 p-6">
              {NAV_KEYS.map((key) => (
                <Link
                  key={key}
                  href={`/${locale}${NAV_PATHS[key]}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-white/80 transition-colors hover:text-brand-accent"
                >
                  {t(key)}
                </Link>
              ))}
              <div className="mt-4 flex items-center gap-4">
                <LanguageSwitcher />
                <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)}>
                  <Button size="sm">{t('getQuote')}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
