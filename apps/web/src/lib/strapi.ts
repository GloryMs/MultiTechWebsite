import { fetchStrapi, getStrapiMediaUrl } from './api';

/* ─── Strapi Response Wrapper ─────────────────────────────── */
interface StrapiResponse<T> {
  data: T;
  meta: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

interface StrapiMedia {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

/* ─── Content Type Interfaces ─────────────────────────────── */

export interface StrapiService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  icon?: string;
  short_desc?: string;
  full_desc?: string;
  features?: string[];
  cover_image?: StrapiMedia;
  sort_order: number;
}

export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  client?: string;
  year?: number;
  category?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  cover_image?: StrapiMedia;
  gallery?: StrapiMedia[];
  featured: boolean;
}

export interface StrapiPartner {
  id: number;
  documentId: string;
  name: string;
  logo?: StrapiMedia;
  description?: string;
  website_url?: string;
  tier: 'Strategic' | 'Technology' | 'Solution';
  sort_order: number;
}

export interface StrapiTestimonial {
  id: number;
  documentId: string;
  client_name: string;
  company?: string;
  quote: string;
  photo?: StrapiMedia;
  rating: number;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  featured_image?: StrapiMedia;
  category?: string;
  tags?: string[];
  featured: boolean;
  publishedAt: string;
}

export interface StrapiJobOpening {
  id: number;
  documentId: string;
  title: string;
  department?: string;
  location?: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description?: string;
  requirements?: string;
  is_active: boolean;
}

export interface StrapiMediaItem {
  id: number;
  documentId: string;
  title: string;
  category?: string;
  image?: StrapiMedia;
  caption?: string;
  sort_order: number;
}

export interface StrapiGlobalSettings {
  site_name?: string;
  logo?: StrapiMedia;
  contact_email?: string;
  contact_phone?: string;
  whatsapp_number?: string;
  contact_address?: string;
  working_hours?: string;
  social_links?: Record<string, string>;
  footer_text?: string;
}

export interface StrapiTimelineItem {
  id: number;
  year: string;
  title: string;
  description?: string;
}

export interface StrapiCoreValue {
  id: number;
  icon_name?: string;
  title: string;
  description?: string;
}

export interface StrapiTeamMember {
  id: number;
  name: string;
  role?: string;
  photo?: StrapiMedia;
}

export interface StrapiAboutPage {
  story_p1?: string;
  story_p2?: string;
  story_p3?: string;
  vision_text?: string;
  mission_text?: string;
  timeline?: StrapiTimelineItem[];
  core_values?: StrapiCoreValue[];
  team_members?: StrapiTeamMember[];
}

/* ─── Typed Fetch Functions ───────────────────────────────── */

export async function getServices(locale: string): Promise<StrapiService[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiService[]>>({
      endpoint: 'services',
      locale,
      sort: 'sort_order:asc',
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getProjects(locale: string, featuredOnly = false): Promise<StrapiProject[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiProject[]>>({
      endpoint: 'projects',
      locale,
      sort: 'year:desc',
      filters: featuredOnly ? { '[featured][$eq]': 'true' } : undefined,
      pagination: { pageSize: featuredOnly ? 3 : 20 },
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getPartners(locale: string): Promise<StrapiPartner[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiPartner[]>>({
      endpoint: 'partners',
      locale,
      sort: 'sort_order:asc',
      pagination: { pageSize: 50 },
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getTestimonials(locale: string): Promise<StrapiTestimonial[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiTestimonial[]>>({
      endpoint: 'testimonials',
      locale,
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPosts(locale: string, pageSize = 10): Promise<StrapiBlogPost[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiBlogPost[]>>({
      endpoint: 'blog-posts',
      locale,
      sort: 'publishedAt:desc',
      pagination: { pageSize },
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string, locale: string): Promise<StrapiBlogPost | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiBlogPost[]>>({
      endpoint: 'blog-posts',
      locale,
      filters: { '[slug][$eq]': slug },
    });
    return res.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getJobOpenings(locale: string): Promise<StrapiJobOpening[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiJobOpening[]>>({
      endpoint: 'job-openings',
      locale,
      filters: { '[is_active][$eq]': 'true' },
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getMediaItems(locale: string): Promise<StrapiMediaItem[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiMediaItem[]>>({
      endpoint: 'media-items',
      locale,
      sort: 'sort_order:asc',
      pagination: { pageSize: 100 },
    });
    const items = res.data ?? [];
    // Fall back to English if no items exist for the requested locale
    if (items.length === 0 && locale !== 'en') {
      const fallback = await fetchStrapi<StrapiResponse<StrapiMediaItem[]>>({
        endpoint: 'media-items',
        locale: 'en',
        sort: 'sort_order:asc',
        pagination: { pageSize: 100 },
      });
      return fallback.data ?? [];
    }
    return items;
  } catch {
    return [];
  }
}

export async function getGlobalSettings(locale: string): Promise<StrapiGlobalSettings | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiGlobalSettings>>({
      endpoint: 'global-setting',
      locale,
    });
    return res.data ?? null;
  } catch {
    return null;
  }
}

export async function getAboutPage(locale: string): Promise<StrapiAboutPage | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<StrapiAboutPage>>({
      endpoint: 'about-page',
      locale,
      // Strapi v5 requires explicit nested populate for component media fields
      extraParams: {
        'populate[timeline]': '*',
        'populate[core_values]': '*',
        'populate[team_members][populate]': '*',
      },
    });
    return res.data ?? null;
  } catch {
    return null;
  }
}

/* ─── Re-export media helper ──────────────────────────────── */
export { getStrapiMediaUrl };