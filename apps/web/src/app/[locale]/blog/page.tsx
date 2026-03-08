import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getBlogPosts, getStrapiMediaUrl } from '@/lib/strapi';
import type { StrapiBlogPost } from '@/lib/strapi';

interface Props {
  params: Promise<{ locale: string }>;
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogCard({ post, locale, readMore }: { post: StrapiBlogPost; locale: string; readMore: string }) {
  const imgUrl = post.featured_image ? getStrapiMediaUrl(post.featured_image.url) : null;

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group flex flex-col rounded-2xl overflow-hidden border border-brand-text/8 bg-white hover:border-brand-accent/30 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="aspect-[16/9] bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 relative overflow-hidden">
        {imgUrl ? (
          <img src={imgUrl} alt={post.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 geo-pattern opacity-20" />
        )}
        {post.category && (
          <div className="absolute top-4 start-4 rounded-lg bg-brand-primary/80 backdrop-blur-sm px-3 py-1">
            <span className="text-xs font-semibold text-brand-accent">{post.category}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs text-brand-text/50 mb-3">
          {formatDate(post.publishedAt, locale)}
        </p>
        <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-brand-text line-clamp-3 flex-1">{post.excerpt}</p>
        )}
        <span className="mt-4 text-sm font-semibold text-brand-accent group-hover:underline">
          {readMore} →
        </span>
      </div>
    </Link>
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = await getBlogPosts(locale, 20);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageTitle')}
          subtitle={t('subtitle')}
          breadcrumb={[
            { label: t('home'), href: `/${locale}` },
            { label: t('pageTitle') },
          ]}
        />

        <SectionWrapper>
          {posts.length === 0 ? (
            <p className="text-center text-brand-text text-lg py-16">{t('noPosts')}</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} readMore={t('readMore')} />
              ))}
            </div>
          )}
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}