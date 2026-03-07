'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({ icon, title, description, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white p-8',
        'border border-transparent hover:border-brand-accent/30',
        'shadow-sm hover:shadow-xl hover:shadow-brand-accent/10',
        'transition-shadow duration-300'
      )}
    >
      {/* Accent bar on hover */}
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-accent transition-transform duration-300 group-hover:scale-x-100" />

      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-brand-primary">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-semibold text-brand-primary">{title}</h3>
      <p className="text-brand-text leading-relaxed">{description}</p>
    </motion.div>
  );
}
