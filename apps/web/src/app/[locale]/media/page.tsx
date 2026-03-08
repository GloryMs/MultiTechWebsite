import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getMediaItems, getProjects, getStrapiMediaUrl } from '@/lib/strapi';
import MediaGallery from './MediaGallery';
import type { GalleryItem } from './MediaGallery';

interface Props {
  params: Promise<{ locale: string }>;
}

const STATIC_ITEMS_EN: GalleryItem[] = [
  { id: 1,  title: 'King Abdulaziz Airport – IBS Installation',    category: 'GSM & IBS',              imageUrl: null },
  { id: 2,  title: 'Riyadh Metro – Cable Laying',                  category: 'Network Infrastructure', imageUrl: null },
  { id: 3,  title: 'NEOM – Fiber Optic Deployment',                category: 'FTTx & OSP',             imageUrl: null },
  { id: 4,  title: 'Kingdom Tower – CCTV System',                  category: 'Security Solutions',     imageUrl: null },
  { id: 5,  title: 'KFSH – Network Room Build-out',                category: 'Network Infrastructure', imageUrl: null },
  { id: 6,  title: 'KAEC – FTTx Rollout',                          category: 'FTTx & OSP',             imageUrl: null },
  { id: 7,  title: 'Mobily – NOC Operations Center',               category: 'Managed Services',       imageUrl: null },
  { id: 8,  title: 'STC – In-Building Coverage',                   category: 'GSM & IBS',              imageUrl: null },
  { id: 9,  title: 'Zain KSA – Fiber Splicing',                    category: 'FTTx & OSP',             imageUrl: null },
  { id: 10, title: 'Mall of Arabia – Access Control',              category: 'Security Solutions',     imageUrl: null },
  { id: 11, title: 'ARAMCO Campus – LAN Infrastructure',           category: 'Network Infrastructure', imageUrl: null },
  { id: 12, title: 'Riyadh Airport – Network Upgrade',             category: 'Network Infrastructure', imageUrl: null },
];

const STATIC_ITEMS_AR: GalleryItem[] = [
  { id: 1,  title: 'مطار الملك عبدالعزيز – تركيب IBS',             category: 'GSM و IBS',                      imageUrl: null },
  { id: 2,  title: 'مترو الرياض – مد الكابلات',                    category: 'البنية التحتية للشبكات',          imageUrl: null },
  { id: 3,  title: 'نيوم – نشر الألياف الضوئية',                   category: 'FTTx و OSP',                     imageUrl: null },
  { id: 4,  title: 'برج المملكة – نظام المراقبة',                  category: 'الحلول الأمنية',                  imageUrl: null },
  { id: 5,  title: 'مستشفى الملك فيصل – غرفة الشبكة',             category: 'البنية التحتية للشبكات',          imageUrl: null },
  { id: 6,  title: 'مدينة الملك عبدالله الاقتصادية – FTTx',       category: 'FTTx و OSP',                     imageUrl: null },
  { id: 7,  title: 'موبايلي – مركز عمليات الشبكة',                 category: 'الخدمات المُدارة',                imageUrl: null },
  { id: 8,  title: 'STC – تغطية داخلية',                           category: 'GSM و IBS',                      imageUrl: null },
  { id: 9,  title: 'زين السعودية – لحام الألياف',                  category: 'FTTx و OSP',                     imageUrl: null },
  { id: 10, title: 'مول العرب – التحكم في الوصول',                 category: 'الحلول الأمنية',                  imageUrl: null },
  { id: 11, title: 'أرامكو – البنية التحتية للشبكات',              category: 'البنية التحتية للشبكات',          imageUrl: null },
  { id: 12, title: 'مطار الرياض – ترقية الشبكة',                   category: 'البنية التحتية للشبكات',          imageUrl: null },
];

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'media' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const [mediaItems, projects] = await Promise.all([
    getMediaItems(locale),
    getProjects(locale),
  ]);

  let galleryItems: GalleryItem[];

  if (mediaItems.length > 0) {
    /* Dedicated media items from CMS */
    galleryItems = mediaItems.map((m) => ({
      id: m.id,
      title: m.title,
      category: m.category ?? '',
      imageUrl: m.image ? getStrapiMediaUrl(m.image.url) : null,
      caption: m.caption,
    }));
  } else if (projects.some((p) => p.cover_image)) {
    /* Fall back to project cover images */
    galleryItems = projects
      .filter((p) => p.cover_image)
      .map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category ?? '',
        imageUrl: getStrapiMediaUrl(p.cover_image!.url),
        caption: p.client,
      }));
  } else {
    /* Pure static fallback */
    galleryItems = locale === 'ar' ? STATIC_ITEMS_AR : STATIC_ITEMS_EN;
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageTitle')}
          subtitle={t('pageSubtitle')}
          breadcrumb={[
            { label: t('home'), href: `/${locale}` },
            { label: tNav('media') },
          ]}
        />

        <SectionWrapper>
          <MediaGallery
            items={galleryItems}
            labels={{
              all: t('all'),
              noMedia: t('noMedia'),
              close: t('close'),
              prev: t('prev'),
              next: t('next'),
            }}
          />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
