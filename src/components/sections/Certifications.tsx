'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { CERTIFICATIONS } from '@/data/portfolioData';
import { Award, CheckCircle, Smartphone, Code, Layout, Cloud } from 'lucide-react';

const CERT_ICONS: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-6 h-6 text-black" />,
  Code: <Code className="w-6 h-6 text-black" />,
  Layout: <Layout className="w-6 h-6 text-black" />,
  Cloud: <Cloud className="w-6 h-6 text-black" />,
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="06"
        title="CERTIFICATIONS"
        subtitle="VERIFIED CREDENTIALS"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 hover:bg-white hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-white border border-[#ECECEC] group-hover:bg-black group-hover:text-white transition-colors">
                  {CERT_ICONS[cert.iconName] || <Award className="w-6 h-6 text-black" />}
                </div>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-[#666666]">
                  {cert.year}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#111111] mb-2 leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs font-semibold text-[#666666] mb-4">
                {cert.issuer}
              </p>
            </div>

            <div className="pt-4 border-t border-[#ECECEC] flex items-center justify-between font-mono text-[11px] text-[#888888]">
              <span className="flex items-center gap-1 text-black font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                VERIFIED
              </span>
              <span>{cert.credentialId || 'ACTIVE'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
