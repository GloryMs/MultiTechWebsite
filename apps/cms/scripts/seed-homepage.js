/**
 * Multitech Homepage Seed Script
 * --------------------------------
 * Populates Strapi with homepage data matching the existing static fallbacks.
 * Run AFTER Strapi is running and you have an API token.
 *
 * Usage:
 *   STRAPI_TOKEN=<your-token> node scripts/seed-homepage.js
 *   OR create .env in apps/cms with STRAPI_SEED_TOKEN=xxx
 */

const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.STRAPI_TOKEN || process.env.STRAPI_SEED_TOKEN;

if (!TOKEN) {
  console.error('❌  No API token. Set STRAPI_TOKEN env var.');
  console.error('   Go to Strapi Admin → Settings → API Tokens → Create Full-Access token');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

// Strapi v5: locale goes as a query param, NOT in the body
async function post(endpoint, body, locale = 'en') {
  const url = `${BASE_URL}/api/${endpoint}?locale=${locale}&status=published`;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: body }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`POST /${endpoint} failed ${res.status}: ${err}`);
  }
  return res.json();
}

// Strapi v5: add localization via PUT /api/{col}/{documentId}?locale=ar
async function putLocale(endpoint, documentId, locale, body) {
  const url = `${BASE_URL}/api/${endpoint}/${documentId}?locale=${locale}&status=published`;
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: body }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PUT /${endpoint}/${documentId} [${locale}] failed ${res.status}: ${err}`);
  }
  return res.json();
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    slug: 'network-infrastructure',
    en: {
      title: 'Network Infrastructure',
      short_desc: 'Design, build, and maintain robust network infrastructure for enterprise and carrier-grade deployments.',
      full_desc: 'We design, build, and maintain world-class network infrastructure serving enterprises, telecom operators, and government entities across Saudi Arabia. From cabling to core routing, our engineers deliver reliable, scalable, and high-performance networks.',
    },
    ar: {
      title: 'البنية التحتية للشبكات',
      short_desc: 'تصميم وبناء وصيانة بنية تحتية قوية للشبكات للنشر المؤسسي وعلى مستوى شركات الاتصالات.',
      full_desc: 'نصمم ونبني ونصون بنية تحتية شبكية عالمية المستوى تخدم المؤسسات ومشغلي الاتصالات والجهات الحكومية في جميع أنحاء المملكة العربية السعودية.',
    },
    sort_order: 1,
  },
  {
    en: {
      title: 'GSM & IBS Solutions',
      short_desc: 'In-Building Solutions and GSM coverage optimization for seamless indoor connectivity.',
      full_desc: 'Our IBS and GSM teams design and deploy indoor coverage solutions for airports, malls, hospitals, hotels, and stadiums — ensuring zero dead zones and carrier-grade indoor signal quality.',
    },
    ar: {
      title: 'حلول GSM و IBS',
      short_desc: 'حلول التغطية الداخلية وتحسين تغطية GSM للاتصال السلس داخل المباني.',
      full_desc: 'يصمم فريقنا وينشر حلول التغطية الداخلية للمطارات والمراكز التجارية والمستشفيات والفنادق والملاعب — لضمان تغطية كاملة بدون مناطق فارغة.',
    },
    slug: 'gsm-ibs-solutions',
    sort_order: 2,
  },
  {
    slug: 'fttx-osp',
    en: {
      title: 'FTTx & OSP',
      short_desc: 'Fiber-to-the-X and Outside Plant engineering for next-generation broadband networks.',
      full_desc: 'We engineer and deploy fiber-optic access networks — FTTH, FTTB, FTTC — along with complete outside plant infrastructure including ducts, manholes, and aerial cables for next-generation broadband.',
    },
    ar: {
      title: 'FTTx و OSP',
      short_desc: 'هندسة الألياف الضوئية والمنشآت الخارجية لشبكات النطاق العريض من الجيل التالي.',
      full_desc: 'نهندس وننشر شبكات الوصول بالألياف الضوئية — FTTH وFTTB وFTTC — إلى جانب البنية التحتية الخارجية الكاملة بما في ذلك المواسير وغرف التفتيش والكابلات الهوائية.',
    },
    sort_order: 3,
  },
  {
    en: {
      title: 'Managed Services',
      short_desc: '24/7 network monitoring, maintenance, and operational support to keep your infrastructure running.',
      full_desc: 'Our NOC operates 24/7/365 to monitor, manage, and maintain your network infrastructure. From proactive fault detection to SLA-driven incident response, we ensure maximum uptime and performance.',
    },
    ar: {
      title: 'الخدمات المُدارة',
      short_desc: 'مراقبة وصيانة ودعم تشغيلي للشبكات على مدار الساعة للحفاظ على تشغيل بنيتك التحتية.',
      full_desc: 'يعمل مركز عمليات الشبكة لدينا على مدار الساعة طوال أيام الأسبوع لمراقبة وإدارة وصيانة بنيتك التحتية. من الكشف الاستباقي عن الأعطال إلى الاستجابة للحوادث وفق اتفاقيات مستوى الخدمة.',
    },
    slug: 'managed-services',
    sort_order: 4,
  },
  {
    slug: 'security-solutions',
    en: {
      title: 'Security Solutions',
      short_desc: 'CCTV, Access Control, Intrusion Detection, and integrated security systems for comprehensive protection.',
      full_desc: 'We design and install comprehensive electronic security systems including IP CCTV, access control, intrusion detection, video analytics, and integrated command-and-control centers.',
    },
    ar: {
      title: 'الحلول الأمنية',
      short_desc: 'كاميرات المراقبة، التحكم في الوصول، كشف التسلل، وأنظمة أمنية متكاملة للحماية الشاملة.',
      full_desc: 'نصمم وننصب أنظمة أمن إلكترونية شاملة تشمل كاميرات CCTV بروتوكول IP، والتحكم في الوصول، وكشف التسلل، وتحليل الفيديو، ومراكز القيادة والسيطرة المتكاملة.',
    },
    sort_order: 5,
  },
  {
    slug: 'it-consulting',
    en: {
      title: 'IT Consulting',
      short_desc: 'Strategic technology advisory to align your IT investments with business objectives.',
      full_desc: 'Our consultants bring deep expertise in telecom and IT to help you plan, architect, and execute technology transformation programs — from network strategy to digital infrastructure roadmaps.',
    },
    ar: {
      title: 'استشارات تقنية المعلومات',
      short_desc: 'استشارات تقنية استراتيجية لمواءمة استثماراتك في تقنية المعلومات مع أهداف أعمالك.',
      full_desc: 'يجلب مستشارونا خبرة عميقة في مجال الاتصالات وتقنية المعلومات لمساعدتك على تخطيط وتصميم وتنفيذ برامج التحول التقني — من استراتيجية الشبكة إلى خارطة طريق البنية التحتية الرقمية.',
    },
    sort_order: 6,
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    slug: 'king-abdulaziz-airport-ibs',
    en: {
      title: 'King Abdulaziz International Airport – IBS',
      category: 'GSM & IBS',
      challenge: 'Provide seamless indoor mobile coverage across 750,000 sqm of terminal space with multiple operator requirements.',
      solution: 'Deployed a multi-operator DAS (Distributed Antenna System) covering all terminals, concourses, and underground levels.',
      results: 'Achieved 99.8% indoor coverage across all terminals with zero dead zones, serving 45+ million passengers annually.',
    },
    ar: {
      title: 'مطار الملك عبدالعزيز الدولي – IBS',
      category: 'GSM و IBS',
      challenge: 'توفير تغطية هاتفية داخلية متواصلة عبر 750,000 متر مربع من مساحة المبنى مع متطلبات متعددة المشغلين.',
      solution: 'نشر نظام هوائيات موزع متعدد المشغلين يغطي جميع المحطات والممرات والطوابق السفلية.',
      results: 'تحقيق تغطية داخلية بنسبة 99.8% عبر جميع المحطات بدون مناطق فارغة، تخدم أكثر من 45 مليون مسافر سنوياً.',
    },
    client: 'GACA',
    year: 2022,
    featured: true,
    sort_order: 1,
  },
  {
    slug: 'riyadh-metro-network-infrastructure',
    en: {
      title: 'Riyadh Metro – Network Infrastructure',
      category: 'Network Infrastructure',
      challenge: 'Design and deploy a carrier-grade network infrastructure across 6 metro lines and 85 stations.',
      solution: 'Implemented a resilient fiber-optic backbone with redundant data centers and station-level LAN/WAN infrastructure.',
      results: 'Delivered on-time network infrastructure supporting real-time train control, passenger Wi-Fi, and CCTV systems.',
    },
    ar: {
      title: 'مترو الرياض – البنية التحتية للشبكات',
      category: 'البنية التحتية للشبكات',
      challenge: 'تصميم ونشر بنية تحتية شبكية على مستوى المشغلين عبر 6 خطوط مترو و85 محطة.',
      solution: 'تنفيذ عمود فقري من الألياف الضوئية مع مراكز بيانات احتياطية وبنية تحتية LAN/WAN على مستوى المحطات.',
      results: 'تسليم البنية التحتية للشبكة في الموعد المحدد تدعم التحكم في القطارات في الوقت الفعلي وشبكة Wi-Fi للركاب وكاميرات المراقبة.',
    },
    client: 'RDA',
    year: 2021,
    featured: true,
    sort_order: 2,
  },
  {
    slug: 'neom-fiber-optic-backbone',
    en: {
      title: 'NEOM – Fiber Optic Backbone',
      category: 'FTTx & OSP',
      challenge: 'Lay a high-capacity fiber-optic backbone across NEOM\'s initial development zones in challenging desert terrain.',
      solution: 'Engineered and installed 2,400 km of single-mode fiber optic cable with 96-core and 144-core counts through conduit systems.',
      results: 'Completed ahead of schedule, enabling 100Gbps+ backbone capacity to support NEOM\'s smart city infrastructure.',
    },
    ar: {
      title: 'نيوم – شبكة الألياف الضوئية الرئيسية',
      category: 'FTTx و OSP',
      challenge: 'مد شبكة ألياف ضوئية عالية السعة عبر مناطق التطوير الأولية في نيوم في تضاريس صحراوية صعبة.',
      solution: 'هندسة وتركيب 2,400 كم من كابلات الألياف الضوئية أحادية الوضع بعدد 96 و144 لياف عبر أنظمة قنوات.',
      results: 'اكتمل قبل الموعد المحدد، مما مكّن من توفير سعة عمود فقري تزيد عن 100 جيجابت في الثانية لدعم البنية التحتية للمدينة الذكية في نيوم.',
    },
    client: 'NEOM',
    year: 2023,
    featured: true,
    sort_order: 3,
  },
];

// ─── PARTNERS ─────────────────────────────────────────────────────────────────

const PARTNERS = [
  { name: 'Huawei',             tier: 'Strategic',   sort_order: 1 },
  { name: 'Cisco',              tier: 'Strategic',   sort_order: 2 },
  { name: 'Ericsson',           tier: 'Strategic',   sort_order: 3 },
  { name: 'Nokia',              tier: 'Strategic',   sort_order: 4 },
  { name: 'CommScope',          tier: 'Technology',  sort_order: 5 },
  { name: 'Corning',            tier: 'Technology',  sort_order: 6 },
  { name: 'Panduit',            tier: 'Technology',  sort_order: 7 },
  { name: 'Fortinet',           tier: 'Solution',    sort_order: 8 },
  { name: 'Hikvision',          tier: 'Solution',    sort_order: 9 },
  { name: 'Dahua',              tier: 'Solution',    sort_order: 10 },
  { name: 'Juniper Networks',   tier: 'Technology',  sort_order: 11 },
  { name: 'Dell Technologies',  tier: 'Technology',  sort_order: 12 },
  { name: 'HPE',                tier: 'Technology',  sort_order: 13 },
  { name: 'Schneider Electric', tier: 'Solution',    sort_order: 14 },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    en: {
      quote: 'Multitech delivered our in-building coverage solution ahead of schedule and with exceptional quality. Their technical expertise is unmatched in the Kingdom.',
      client_name: 'Fahad Al-Rashidi',
      company: 'Saudi Telecom Company (STC)',
    },
    ar: {
      quote: 'قدمت مالتي تكنولوجي حل التغطية الداخلية لدينا قبل الموعد المحدد وبجودة استثنائية. خبرتهم التقنية لا مثيل لها في المملكة.',
      client_name: 'فهد الرشيدي',
      company: 'شركة الاتصالات السعودية',
    },
    rating: 5,
  },
  {
    en: {
      quote: "We've partnered with Multitech for over 5 years on managed services. Their 24/7 NOC team has maintained 99.9% uptime across all our sites.",
      client_name: 'Nora Al-Shamrani',
      company: 'Mobily',
    },
    ar: {
      quote: 'تعاونا مع مالتي تكنولوجي لأكثر من 5 سنوات في الخدمات المُدارة. حافظ فريق مركز عمليات الشبكة على وقت تشغيل 99.9% في جميع مواقعنا.',
      client_name: 'نورة الشمراني',
      company: 'موبايلي',
    },
    rating: 5,
  },
  {
    en: {
      quote: "Their fiber optic installation work was meticulous. The documentation and handover process was the best we've experienced from any contractor.",
      client_name: 'Omar Badr',
      company: 'Zain KSA',
    },
    ar: {
      quote: 'كان عمل تركيب الألياف الضوئية دقيقاً للغاية. عملية التوثيق والتسليم كانت الأفضل التي شهدناها من أي مقاول.',
      client_name: 'عمر بدر',
      company: 'زين السعودية',
    },
    rating: 5,
  },
];

// ─── SEED FUNCTIONS ───────────────────────────────────────────────────────────

async function seedServices() {
  console.log('\n📡 Seeding Services...');
  for (const svc of SERVICES) {
    try {
      // Create English (default locale)
      const created = await post('services', {
        ...svc.en,
        slug: svc.slug,
        sort_order: svc.sort_order,
      }, 'en');
      const id = created.data?.documentId || created.data?.id;
      console.log(`  ✅ EN: ${svc.en.title}`);

      // Add Arabic localization (slug must be included — it's non-localized but required)
      await putLocale('services', id, 'ar', {
        ...svc.ar,
        slug: svc.slug,
      });
      console.log(`  ✅ AR: ${svc.ar.title}`);
    } catch (e) {
      console.error(`  ❌ ${svc.en.title}: ${e.message}`);
    }
  }
}

async function seedProjects() {
  console.log('\n🏗️  Seeding Projects...');
  for (const proj of PROJECTS) {
    try {
      const created = await post('projects', {
        ...proj.en,
        slug: proj.slug,
        client: proj.client,
        year: proj.year,
        featured: proj.featured,
      }, 'en');
      const id = created.data?.documentId || created.data?.id;
      console.log(`  ✅ EN: ${proj.en.title}`);

      await putLocale('projects', id, 'ar', {
        ...proj.ar,
        slug: proj.slug,
      });
      console.log(`  ✅ AR: ${proj.ar.title}`);
    } catch (e) {
      console.error(`  ❌ ${proj.en.title}: ${e.message}`);
    }
  }
}

async function seedPartners() {
  console.log('\n🤝 Seeding Partners...');
  for (const partner of PARTNERS) {
    try {
      await post('partners', { ...partner }, 'en');
      console.log(`  ✅ ${partner.name}`);
    } catch (e) {
      console.error(`  ❌ ${partner.name}: ${e.message}`);
    }
  }
}

async function seedTestimonials() {
  console.log('\n💬 Seeding Testimonials...');
  for (const t of TESTIMONIALS) {
    try {
      const created = await post('testimonials', {
        ...t.en,
        rating: t.rating,
      }, 'en');
      const id = created.data?.documentId || created.data?.id;
      console.log(`  ✅ EN: ${t.en.client_name}`);

      await putLocale('testimonials', id, 'ar', {
        ...t.ar,
        rating: t.rating,
      });
      console.log(`  ✅ AR: ${t.ar.client_name}`);
    } catch (e) {
      console.error(`  ❌ ${t.en.client_name}: ${e.message}`);
    }
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Multitech Homepage Seed');
  console.log(`   Target: ${BASE_URL}`);

  await seedServices();
  await seedProjects();
  await seedPartners();
  await seedTestimonials();

  console.log('\n✅ Seed complete! Refresh your browser to see the data.');
}

main().catch((e) => {
  console.error('\n❌ Seed failed:', e.message);
  process.exit(1);
});
