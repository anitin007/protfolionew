'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { EDUCATION } from '@/data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="05"
        title="EDUCATION"
        subtitle="ACADEMIC BACKGROUND"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-8 hover:bg-white hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-white border border-[#ECECEC] text-black group-hover:bg-black group-hover:text-white transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-[#666666]">
                  {edu.period}
                </span>
              </div>

              {/* Degree Title & Institution */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-2 leading-snug">
                {edu.degree}
              </h3>
              <p className="text-sm font-semibold text-[#666666] mb-1">
                {edu.institution}
              </p>
              <p className="text-xs font-mono text-[#888888] mb-4">
                {edu.location}
              </p>

              {edu.grade && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-4">
                  <Award className="w-3.5 h-3.5" />
                  <span>{edu.grade}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6">
                {edu.details}
              </p>
            </div>

            {/* Core Highlights */}
            <div className="pt-4 border-t border-[#ECECEC]">
              <span className="font-mono text-[10px] text-[#888888] uppercase block mb-2">
                KEY SUBJECTS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {edu.highlights.map((item, hIdx) => (
                  <span
                    key={hIdx}
                    className="px-2.5 py-1 rounded-md bg-white border border-[#ECECEC] text-[11px] font-mono text-[#111111]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
