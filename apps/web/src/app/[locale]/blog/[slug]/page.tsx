import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getBlogPostBySlug, getStrapiMediaUrl } from '@/lib/strapi';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const imgUrl = post.featured_image ? getStrapiMediaUrl(post.featured_image.url) : null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-brand-primary pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 geo-pattern opacity-20" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-white/40">
              <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">{t('home')}</Link>
              <span>›</span>
              <Link href={`/${locale}/blog`} className="hover:text-white/60 transition-colors">{t('pageTitle')}</Link>
              <span>›</span>
              <span className="text-brand-accent line-clamp-1">{post.title}</span>
            </nav>

            {post.category && (
              <span className="inline-block rounded-lg bg-brand-accent/20 px-3 py-1 text-xs font-semibold text-brand-accent mb-4">
                {post.category}
              </span>
            )}

            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-sm text-white/40">
              {t('publishedOn')} {formatDate(post.publishedAt, locale)}
            </p>

            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-brand-accent to-brand-gold" />
          </div>
        </section>

        <SectionWrapper>
          <div className="mx-auto max-w-4xl">
            {/* Featured Image */}
            {imgUrl && (
              <div className="mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
                <img src={imgUrl} alt={post.title} className="h-full w-full object-cover" />
              </div>
            )}

            {/* Body */}
            {post.body ? (
              <div
                className="prose prose-lg max-w-none text-brand-text prose-headings:text-brand-primary prose-a:text-brand-accent"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {post.body}
              </div>
            ) : post.excerpt ? (
              <p className="text-lg text-brand-text leading-relaxed">{post.excerpt}</p>
            ) : null}

            {/* Back link */}
            <div className="mt-14 border-t border-brand-text/10 pt-8">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:underline"
              >
                <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {t('backToBlog')}
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
