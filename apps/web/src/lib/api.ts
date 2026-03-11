const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/* ─── Strapi Fetch Helper ────────────────────────────────── */
interface StrapiRequestParams {
  endpoint: string;
  locale?: string;
  populate?: string;
  extraParams?: Record<string, string>; // for nested populate (e.g. component media)
  filters?: Record<string, unknown>;
  sort?: string;
  pagination?: { page?: number; pageSize?: number };
}

export async function fetchStrapi<T>({
  endpoint,
  locale = 'ar',
  populate = '*',
  extraParams,
  filters,
  sort,
  pagination,
}: StrapiRequestParams): Promise<T> {
  const params = new URLSearchParams();
  params.set('locale', locale);
  if (!extraParams || !Object.keys(extraParams).some(k => k.startsWith('populate'))) {
    params.set('populate', populate);
  }
  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => params.set(key, value));
  }

  if (sort) params.set('sort', sort);
  if (pagination?.page) params.set('pagination[page]', String(pagination.page));
  if (pagination?.pageSize) params.set('pagination[pageSize]', String(pagination.pageSize));

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.set(`filters${key}`, String(value));
    });
  }

  const url = `${STRAPI_URL}/api/${endpoint}?${params.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/* ─── Strapi Media URL Helper ────────────────────────────── */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '/images/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/* ─── Express API Helper ─────────────────────────────────── */
export async function postToApi(endpoint: string, data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return res.json();
}
