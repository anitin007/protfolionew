'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  titleClassName?: string;
  dark?: boolean;
}

export default function SectionHeader({
  number,
  title,
  subtitle,
  centered = false,
  titleClassName,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center gap-2 mb-3 text-xs md:text-sm font-mono tracking-widest uppercase ${
          dark ? 'text-neutral-400' : 'text-[#666666]'
        }`}
      >
        <span className={`font-bold ${dark ? 'text-white' : 'text-black'}`}>[ {number} ]</span>
        {subtitle && (
          <>
            <span className={dark ? 'text-neutral-600' : 'text-gray-300'}>•</span>
            <span>{subtitle}</span>
          </>
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={
          titleClassName ||
          `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] ${
            dark ? 'text-white' : 'text-[#111111]'
          }`
        }
      >
        {title}
      </motion.h2>
    </div>
  );
}
