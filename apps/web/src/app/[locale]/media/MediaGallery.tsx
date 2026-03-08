'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
  caption?: string;
}

interface Props {
  items: GalleryItem[];
  labels: { all: string; noMedia: string; close: string; prev: string; next: string };
}

const PLACEHOLDER_COLORS = [
  'from-brand-accent/20 to-brand-primary/20',
  'from-brand-gold/20 to-brand-primary/15',
  'from-brand-accent/15 to-brand-gold/15',
  'from-brand-primary/20 to-brand-accent/10',
  'from-brand-gold/15 to-brand-accent/20',
  'from-brand-primary/10 to-brand-gold/20',
] as const;

export default function MediaGallery({ items, labels }: Props) {
  const [activeCategory, setActiveCategory] = useState(labels.all);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* Unique categories */
  const categories = [labels.all, ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];

  const filtered = activeCategory === labels.all
    ? items
    : items.filter((i) => i.category === activeCategory);

  /* Lightbox navigation */
  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  }, [filtered.length]);

  /* Keyboard navigation */
  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, goPrev, goNext]);

  /* Prevent body scroll when lightbox is open */
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200',
                activeCategory === cat
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
        <p className="text-center text-brand-text py-16 text-lg">{labels.noMedia}</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: (i % 8) * 0.04 }}
                onClick={() => openLightbox(i)}
                className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <div className={cn(
                  'aspect-square bg-gradient-to-br',
                  PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
                )}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 geo-pattern opacity-30" />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/60 transition-all duration-300 flex items-end">
                    <div className="w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
                      <p className="text-xs font-semibold text-white line-clamp-2 text-start">{item.title}</p>
                      {item.caption && (
                        <p className="text-xs text-white/60 mt-0.5 line-clamp-1 text-start">{item.caption}</p>
                      )}
                    </div>
                  </div>

                  {/* Category badge */}
                  {item.category && (
                    <div className="absolute top-2 start-2 rounded-md bg-brand-primary/70 backdrop-blur-sm px-2 py-0.5">
                      <span className="text-xs font-medium text-brand-accent">{item.category}</span>
                    </div>
                  )}

                  {/* Zoom icon */}
                  <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            {/* Content — stop propagation so clicking image doesn't close */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl bg-brand-primary/20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    {activeItem.imageUrl ? (
                      <img
                        src={activeItem.imageUrl}
                        alt={activeItem.title}
                        className="w-full max-h-[75vh] object-contain rounded-xl"
                      />
                    ) : (
                      <div className={cn(
                        'w-full aspect-video rounded-xl bg-gradient-to-br flex items-center justify-center',
                        PLACEHOLDER_COLORS[(lightboxIndex ?? 0) % PLACEHOLDER_COLORS.length]
                      )}>
                        <span className="text-brand-text/40 text-lg font-semibold">{activeItem.title}</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Caption */}
              <div className="mt-3 px-2 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{activeItem.title}</p>
                  {activeItem.caption && (
                    <p className="text-xs text-white/50 mt-0.5">{activeItem.caption}</p>
                  )}
                </div>
                <span className="shrink-0 text-xs text-white/30">
                  {(lightboxIndex ?? 0) + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>

            {/* Prev / Next */}
            {filtered.length > 1 && (
              <>
                <button
                  aria-label={labels.prev}
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute start-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <svg className="h-6 w-6 text-white rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  aria-label={labels.next}
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute end-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <svg className="h-6 w-6 text-white rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Close */}
            <button
              aria-label={labels.close}
              onClick={closeLightbox}
              className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            >
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
