'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === 'ar' ? 'en' : 'ar';
  const label = locale === 'ar' ? 'EN' : 'عربي';

  function handleSwitch() {
    // Replace /ar/ or /en/ prefix with the target locale
    const newPath = pathname.replace(`/${locale}`, `/${switchTo}`);
    router.push(newPath);
  }

  return (
    <button
      suppressHydrationWarning
      onClick={handleSwitch}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-brand-accent/30 px-3 py-1.5',
        'text-sm font-semibold text-brand-accent transition-all duration-200',
        'hover:bg-brand-accent hover:text-brand-primary',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent'
      )}
      aria-label={`Switch to ${switchTo === 'ar' ? 'Arabic' : 'English'}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.6 3.4 5.6 3.4 9s-1.2 6.4-3.4 9c-2.2-2.6-3.4-5.6-3.4-9s1.2-6.4 3.4-9z" />
      </svg>
      {label}
    </button>
  );
}
