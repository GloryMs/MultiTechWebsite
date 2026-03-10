/**
 * Multitech About Page Seed Script
 * ----------------------------------
 * Populates the Strapi "about-page" Single Type with content matching
 * the existing static fallbacks: Company Story, Vision & Mission,
 * Timeline (6 milestones), Core Values (4), and Leadership Team (4).
 *
 * Run AFTER Strapi is running, the about-page content type is registered,
 * and you have a Full-Access API token.
 *
 * Usage (Windows PowerShell):
 *   $env:STRAPI_TOKEN="<your-token>"; node scripts/seed-about.js
 *
 * Usage (Linux/macOS):
 *   STRAPI_TOKEN=<your-token> node scripts/seed-about.js
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

// Single type: PUT without locale creates/updates the default locale.
// For other locales pass ?locale=xx.
async function putSingleType(locale, body) {
  const isDefault = locale === 'en';
  const url = isDefault
    ? `${BASE_URL}/api/about-page`
    : `${BASE_URL}/api/about-page?locale=${locale}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: body }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PUT /about-page (locale=${locale}) failed ${res.status}: ${err}`);
  }
  return res.json();
}

async function checkRoute() {
  const url = `${BASE_URL}/api/about-page`;
  const res = await fetch(url, { headers });
  console.log(`   GET /api/about-page → ${res.status}`);
  // 404 = single type exists but has no data yet (normal for first run)
  // 200 = data already exists
  // anything else = real problem
  if (res.status !== 200 && res.status !== 404) {
    const err = await res.text();
    console.error(`   ❌  Unexpected response: ${res.status} ${err}`);
    process.exit(1);
  }
  console.log(`   ✓ Route is registered (${res.status === 404 ? 'no data yet' : 'has existing data'})`);
}

/* ─── English content ──────────────────────────────────────── */

const aboutPageEN = {
  story_p1:
    'Since its founding in 2004, Multi Technology Company has grown from a small startup into one of the leading telecom and IT solutions providers in the Kingdom of Saudi Arabia.',
  story_p2:
    'We specialize in designing, building, and maintaining critical infrastructure that connects businesses and communities across the Kingdom — from telecom networks to integrated security solutions.',
  story_p3:
    'Our team of 200+ engineers and specialists drives our commitment to quality, innovation, and service excellence.',
  vision_text:
    'To be the leading provider of innovative telecom and IT infrastructure solutions in the Kingdom of Saudi Arabia.',
  mission_text:
    'Delivering reliable, cutting-edge technology solutions that empower businesses and drive digital transformation across the Kingdom.',
  timeline: [
    { year: '2004', title: 'Founded', description: 'Multi Technology Company established in Riyadh, Saudi Arabia.' },
    { year: '2008', title: 'First Major Telecom Project', description: 'Awarded first large-scale GSM network deployment project.' },
    { year: '2012', title: 'Security Division Launched', description: 'Expanded into integrated security solutions: CCTV, access control, fire systems.' },
    { year: '2016', title: 'Fiber Optic Expansion', description: 'Began FTTx and Outside Plant projects for national broadband rollout.' },
    { year: '2020', title: 'Managed Services & NOC', description: 'Launched 24/7 Network Operations Center for managed service clients.' },
    { year: '2024', title: '20 Years of Excellence', description: 'Celebrating two decades of delivering world-class infrastructure across the Kingdom.' },
  ],
  core_values: [
    { icon_name: 'shield', title: 'Reliability', description: 'Delivering on our commitments with consistency and precision.' },
    { icon_name: 'users', title: 'Customer-Centricity', description: 'Putting client needs at the heart of every solution we design.' },
    { icon_name: 'chart', title: 'Continuous Improvement', description: 'Constantly evolving our processes, skills, and technologies.' },
    { icon_name: 'bulb', title: 'Innovation', description: 'Embracing new technologies to deliver smarter, future-proof solutions.' },
  ],
  team_members: [
    { name: 'Mohammed Al-Faisal', role: 'CEO & Founder' },
    { name: 'Ahmed Hassan', role: 'CTO' },
    { name: 'Sara Al-Otaibi', role: 'VP Operations' },
    { name: 'Khalid Ibrahim', role: 'Director of Engineering' },
  ],
};

/* ─── Arabic content ───────────────────────────────────────── */

const aboutPageAR = {
  story_p1:
    'منذ تأسيسها في عام 2004، نمت شركة مالتي تكنولوجي من شركة ناشئة صغيرة إلى واحدة من الشركات الرائدة في مجال حلول الاتصالات وتقنية المعلومات في المملكة العربية السعودية.',
  story_p2:
    'نحن متخصصون في تصميم وبناء وصيانة البنية التحتية الحيوية التي تربط الأعمال والمجتمعات في جميع أنحاء المملكة، من شبكات الاتصالات إلى الحلول الأمنية المتكاملة.',
  story_p3:
    'يقود فريقنا المكون من أكثر من 200 مهندس ومتخصص التزامنا بالجودة والابتكار والتميز في الخدمة.',
  vision_text:
    'أن نكون المزود الرائد لحلول البنية التحتية المبتكرة للاتصالات وتقنية المعلومات في المملكة العربية السعودية.',
  mission_text:
    'تقديم حلول تقنية موثوقة ومتطورة تمكّن الأعمال وتدفع التحول الرقمي في جميع أنحاء المملكة.',
  timeline: [
    { year: '2004', title: 'التأسيس', description: 'تأسيس شركة مالتي تكنولوجي في الرياض، المملكة العربية السعودية.' },
    { year: '2008', title: 'أول مشروع اتصالات كبير', description: 'الحصول على أول مشروع نشر شبكة GSM واسع النطاق.' },
    { year: '2012', title: 'إطلاق قسم الحلول الأمنية', description: 'التوسع في الحلول الأمنية المتكاملة: كاميرات المراقبة، التحكم في الوصول، أنظمة الحريق.' },
    { year: '2016', title: 'التوسع في الألياف الضوئية', description: 'بدء مشاريع FTTx والمنشآت الخارجية لنشر النطاق العريض الوطني.' },
    { year: '2020', title: 'الخدمات المُدارة ومركز العمليات', description: 'إطلاق مركز عمليات الشبكة على مدار الساعة لعملاء الخدمات المُدارة.' },
    { year: '2024', title: '20 عاماً من التميز', description: 'الاحتفال بعقدين من تقديم بنية تحتية عالمية المستوى في جميع أنحاء المملكة.' },
  ],
  core_values: [
    { icon_name: 'shield', title: 'الموثوقية', description: 'الوفاء بالتزاماتنا بثبات ودقة.' },
    { icon_name: 'users', title: 'التركيز على العميل', description: 'وضع احتياجات العميل في صميم كل حل نصممه.' },
    { icon_name: 'chart', title: 'التحسين المستمر', description: 'تطوير عملياتنا ومهاراتنا وتقنياتنا باستمرار.' },
    { icon_name: 'bulb', title: 'الابتكار', description: 'تبني التقنيات الجديدة لتقديم حلول أذكى ومستدامة.' },
  ],
  team_members: [
    { name: 'محمد الفيصل', role: 'الرئيس التنفيذي والمؤسس' },
    { name: 'أحمد حسن', role: 'المدير التقني' },
    { name: 'سارة العتيبي', role: 'نائب رئيس العمليات' },
    { name: 'خالد إبراهيم', role: 'مدير الهندسة' },
  ],
};

/* ─── Main ─────────────────────────────────────────────────── */

async function main() {
  console.log('🌱  Seeding About Page...\n');

  // 0. Verify the route exists (Strapi must be restarted with the new schema)
  console.log('🔍  Checking route...');
  await checkRoute();

  // 1. Create/update EN version (default locale — no locale param)
  console.log('📝  Seeding EN about-page...');
  try {
    await putSingleType('en', aboutPageEN);
    console.log('   ✅  EN about-page saved');
  } catch (e) {
    console.error('   ❌  EN about-page failed:', e.message);
    process.exit(1);
  }

  // 2. Create/update AR version
  console.log('📝  Seeding AR about-page...');
  try {
    await putSingleType('ar', aboutPageAR);
    console.log('   ✅  AR about-page saved');
  } catch (e) {
    console.error('   ❌  AR about-page failed:', e.message);
    process.exit(1);
  }

  console.log('\n✅  About Page seeding complete!');
  console.log('   - Company Story (EN + AR)');
  console.log('   - Vision & Mission (EN + AR)');
  console.log('   - Timeline: 6 milestones (EN + AR)');
  console.log('   - Core Values: 4 values (EN + AR)');
  console.log('   - Leadership Team: 4 members (EN + AR)');
  console.log('\n   You can now edit these in Strapi Admin → Content Manager → About Page');
}

main().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
