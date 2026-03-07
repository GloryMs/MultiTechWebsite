import { clsx, type ClassValue } from 'clsx';

/** Merge class names (clsx wrapper) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format number with locale-aware separators */
export function formatNumber(num: number, locale: string = 'en') {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US').format(num);
}

/** Get reading direction from locale */
export function getDir(locale: string): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
