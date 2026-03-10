/**
 * Multitech Services Update Seed Script
 * ------------------------------------------
 * Adds features (JSON array) and icon (string) to the existing
 * 6 services that were seeded by seed-homepage.js.
 *
 * Run AFTER seed-homepage.js has been run successfully.
 *
 * Usage (Windows PowerShell):
 *   $env:STRAPI_TOKEN="<your-token>"; node scripts/seed-services-update.js
 *
 * Usage (Linux/macOS):
 *   STRAPI_TOKEN=<your-token> node scripts/seed-services-update.js
 */

const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.STRAPI_TOKEN || process.env.STRAPI_SEED_TOKEN;

if (!TOKEN) {
  console.error('❌  No API token. Set STRAPI_TOKEN env var.');
  console.error('   Strapi Admin → Settings → API Tokens → Create Full-Access token');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

/* ─── Feature data per service slug ────────────────────────── */

const SERVICE_UPDATES = {
  'network-infrastructure': {
    icon: 'network',
    features_en: [
      'LAN/WAN design and deployment',
      'Data center networking',
      'Structured cabling (Cat6/Cat6A/Fiber)',
      'Network assessment & optimization',
      'Wireless network design (Wi-Fi 6/6E)',
    ],
    features_ar: [
      'تصميم ونشر شبكات LAN/WAN',
      'شبكات مراكز البيانات',
      'التمديدات المهيكلة (Cat6/Cat6A/الألياف)',
      'تقييم وتحسين الشبكات',
      'تصميم الشبكات اللاسلكية (Wi-Fi 6/6E)',
    ],
  },
  'gsm-ibs-solutions': {
    icon: 'gsm',
    features_en: [
      'In-Building DAS solutions',
      'Small cell deployments',
      'RF planning & optimization',
      'Multi-operator support',
      'Coverage surveys & testing',
    ],
    features_ar: [
      'حلول أنظمة الهوائيات الموزعة داخل المباني',
      'نشر الخلايا الصغيرة',
      'تخطيط وتحسين الترددات الراديوية',
      'دعم متعدد المشغلين',
      'مسوحات واختبارات التغطية',
    ],
  },
  'fttx-osp': {
    icon: 'fiber',
    features_en: [
      'FTTH/FTTP network design',
      'Aerial & underground OSP',
      'Splicing & termination',
      'OTDR testing & documentation',
      'Project management & as-built',
    ],
    features_ar: [
      'تصميم شبكات FTTH/FTTP',
      'المنشآت الخارجية الهوائية والأرضية',
      'لحام وتوصيل الألياف',
      'اختبار OTDR والتوثيق',
      'إدارة المشاريع والمخططات التنفيذية',
    ],
  },
  'managed-services': {
    icon: 'managed',
    features_en: [
      '24/7 network monitoring (NOC)',
      'Preventive & corrective maintenance',
      'SLA-based support contracts',
      'Spare parts management',
      'Performance reporting & analytics',
    ],
    features_ar: [
      'مراقبة الشبكة على مدار الساعة (NOC)',
      'الصيانة الوقائية والتصحيحية',
      'عقود دعم مبنية على اتفاقيات مستوى الخدمة',
      'إدارة قطع الغيار',
      'تقارير الأداء والتحليلات',
    ],
  },
  'security-solutions': {
    icon: 'security',
    features_en: [
      'CCTV & video surveillance systems',
      'Access control & biometric systems',
      'Intrusion detection & alarm systems',
      'Fire detection & suppression',
      'Integrated security command centers',
    ],
    features_ar: [
      'أنظمة كاميرات المراقبة والفيديو',
      'أنظمة التحكم في الوصول والبصمة',
      'أنظمة كشف التسلل والإنذار',
      'أنظمة كشف وإطفاء الحرائق',
      'مراكز القيادة الأمنية المتكاملة',
    ],
  },
  'it-consulting': {
    icon: 'consulting',
    features_en: [
      'IT infrastructure assessment',
      'Technology roadmap planning',
      'Vendor evaluation & selection',
      'Digital transformation strategy',
      'Compliance & standards advisory',
    ],
    features_ar: [
      'تقييم البنية التحتية لتقنية المعلومات',
      'تخطيط خارطة طريق التقنية',
      'تقييم واختيار الموردين',
      'استراتيجية التحول الرقمي',
      'استشارات الامتثال والمعايير',
    ],
  },
};

/* ─── Helpers ───────────────────────────────────────────────── */

async function getServices() {
  const url = `${BASE_URL}/api/services?sort=sort_order:asc&pagination[pageSize]=20&locale=en`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GET /services failed ${res.status}: ${err}`);
  }
  const json = await res.json();
  return json.data; // array of { documentId, slug, ... }
}

async function updateService(documentId, locale, body) {
  const url =
    locale === 'en'
      ? `${BASE_URL}/api/services/${documentId}?status=published`
      : `${BASE_URL}/api/services/${documentId}?locale=${locale}&status=published`;
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: body }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PUT /services/${documentId} [${locale}] failed ${res.status}: ${err}`);
  }
  return res.json();
}

/* ─── Main ─────────────────────────────────────────────────── */

async function main() {
  console.log('🌱  Updating Services with features & icons...\n');

  console.log('🔍  Fetching existing services from Strapi...');
  const services = await getServices();
  console.log(`   Found ${services.length} services\n`);

  for (const service of services) {
    const { documentId, slug } = service;
    const update = SERVICE_UPDATES[slug];

    if (!update) {
      console.warn(`   ⚠️  No update data for slug: "${slug}" — skipping`);
      continue;
    }

    console.log(`📝  Updating: ${slug}`);

    // EN: icon (non-localized) + EN features
    try {
      await updateService(documentId, 'en', {
        icon: update.icon,
        features: update.features_en,
      });
      console.log(`   ✅  EN updated`);
    } catch (e) {
      console.error(`   ❌  EN failed:`, e.message);
      process.exit(1);
    }

    // AR: AR features only (icon is not localized, already set above)
    try {
      await updateService(documentId, 'ar', {
        features: update.features_ar,
      });
      console.log(`   ✅  AR updated`);
    } catch (e) {
      console.error(`   ❌  AR failed:`, e.message);
      process.exit(1);
    }
  }

  console.log('\n✅  Services update complete!');
  console.log('   Each service now has:');
  console.log('   - icon string (for SVG mapping on frontend)');
  console.log('   - features: 5 items (EN + AR)');
}

main().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
