'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import FormInput from '@/components/ui/FormInput';
import FormTextArea from '@/components/ui/FormTextArea';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/* ─── Contact Info Data ───────────────────────────────────── */
const CONTACT_INFO = {
  email: 'info@multitech.com.sa',
  phone: '+966 11 XXX XXXX',
  whatsapp: '+966 5X XXX XXXX',
  address: {
    en: 'Riyadh, Kingdom of Saudi Arabia',
    ar: 'الرياض، المملكة العربية السعودية',
  },
  hours: {
    en: 'Sunday – Thursday: 8:00 AM – 5:00 PM',
    ar: 'الأحد – الخميس: 8:00 صباحاً – 5:00 مساءً',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674536278959!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ4LjgiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1709900000000',
};

/* ─── Types ───────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/* ─── SVG Icons ───────────────────────────────────────────── */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
    </svg>
  );
}

function SubjectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Contact Page ────────────────────────────────────────── */
export default function ContactPage() {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = locale === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = locale === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  const contactCards = [
    {
      icon: <MailIcon className="h-6 w-6" />,
      label: locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      label: locale === 'ar' ? 'الهاتف' : 'Phone',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
    },
    {
      icon: <LocationIcon className="h-6 w-6" />,
      label: t('address'),
      value: CONTACT_INFO.address[locale as 'ar' | 'en'],
      href: '#map',
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      label: t('workingHours'),
      value: CONTACT_INFO.hours[locale as 'ar' | 'en'],
      href: undefined,
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          title={t('sectionTitle')}
          subtitle={locale === 'ar'
            ? 'نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت.'
            : "We're here to help. Reach out and we'll get back to you promptly."
          }
          breadcrumb={[
            { label: tNav('home'), href: `/${locale}` },
            { label: t('sectionTitle') },
          ]}
        />

        {/* Contact Info Cards — overlapping the hero */}
        <section className="relative -mt-10 z-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {card.href ? (
                    <a
                      href={card.href}
                      className={cn(
                        'flex items-start gap-4 rounded-2xl bg-white p-6 shadow-lg shadow-brand-primary/5',
                        'border border-transparent transition-all duration-200',
                        'hover:border-brand-accent/20 hover:shadow-xl hover:shadow-brand-accent/10'
                      )}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                        {card.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-brand-text">{card.label}</p>
                        <p className="mt-0.5 text-base font-semibold text-brand-primary truncate">{card.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-lg shadow-brand-primary/5 border border-transparent">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                        {card.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-brand-text">{card.label}</p>
                        <p className="mt-0.5 text-base font-semibold text-brand-primary">{card.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Map Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5">

              {/* Contact Form — 3 columns */}
              <motion.div
                initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-3"
              >
                <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-primary/5 border border-brand-text/5 sm:p-10">
                  <h2 className="text-2xl font-bold text-brand-primary">
                    {locale === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
                  </h2>
                  <p className="mt-2 text-brand-text">
                    {locale === 'ar'
                      ? 'املأ النموذج أدناه وسنتواصل معك خلال 24 ساعة.'
                      : "Fill out the form below and we'll respond within 24 hours."}
                  </p>

                  {/* Status Toasts */}
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 flex items-center gap-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20 p-4"
                      >
                        <CheckCircleIcon className="h-6 w-6 text-brand-accent shrink-0" />
                        <p className="text-sm font-medium text-brand-primary">{t('success')}</p>
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 flex items-center gap-3 rounded-xl bg-brand-error/10 border border-brand-error/20 p-4"
                      >
                        <p className="text-sm font-medium text-brand-error">{t('error')}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Fields */}
                  <div className="mt-8 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormInput
                        id="name"
                        label={t('name')}
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        error={errors.name}
                        icon={<UserIcon className="h-5 w-5" />}
                        autoComplete="name"
                      />
                      <FormInput
                        id="email"
                        label={t('email')}
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        error={errors.email}
                        icon={<MailIcon className="h-5 w-5" />}
                        autoComplete="email"
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormInput
                        id="phone"
                        label={t('phone')}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        icon={<PhoneIcon className="h-5 w-5" />}
                        autoComplete="tel"
                      />
                      <FormInput
                        id="subject"
                        label={t('subject')}
                        value={formData.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        icon={<SubjectIcon className="h-5 w-5" />}
                      />
                    </div>

                    <FormTextArea
                      id="message"
                      label={t('message')}
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      error={errors.message}
                    />

                    <Button
                      size="lg"
                      loading={status === 'sending'}
                      onClick={handleSubmit}
                      className="w-full sm:w-auto"
                    >
                      {status === 'sending' ? t('sending') : t('send')}
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Map + Quick Actions — 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: locale === 'ar' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Google Map */}
                <div id="map" className="overflow-hidden rounded-3xl border border-brand-text/5 shadow-xl shadow-brand-primary/5">
                  <iframe
                    src={CONTACT_INFO.mapEmbedUrl}
                    width="100%"
                    height="320"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Multitech Office Location"
                    className="w-full"
                  />
                </div>

                {/* WhatsApp Quick Chat */}
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[\s+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-4 rounded-2xl p-6 transition-all duration-200',
                    'bg-[#25D366]/10 border border-[#25D366]/20',
                    'hover:bg-[#25D366]/20 hover:shadow-lg hover:shadow-[#25D366]/10'
                  )}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white">
                    <WhatsAppIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-primary">
                      {locale === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                    </p>
                    <p className="mt-0.5 text-sm text-brand-text">
                      {locale === 'ar' ? 'احصل على رد فوري من فريقنا' : 'Get an instant response from our team'}
                    </p>
                  </div>
                  <svg className="ms-auto h-5 w-5 text-[#25D366] rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>

                {/* Direct Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className={cn(
                    'flex items-center gap-4 rounded-2xl p-6 transition-all duration-200',
                    'bg-brand-accent/5 border border-brand-accent/15',
                    'hover:bg-brand-accent/10 hover:shadow-lg hover:shadow-brand-accent/10'
                  )}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary">
                    <MailIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-primary">
                      {locale === 'ar' ? 'راسلنا مباشرة' : 'Email Us Directly'}
                    </p>
                    <p className="mt-0.5 text-sm text-brand-text">{CONTACT_INFO.email}</p>
                  </div>
                  <svg className="ms-auto h-5 w-5 text-brand-accent rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
