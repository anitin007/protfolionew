'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { EDUCATION } from '@/data/portfolioData';
import { GraduationCap, MapPin, Sparkles, Terminal } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative pt-20 pb-28 sm:pb-32 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="01"
        title="ABOUT ME"
        subtitle="PERSONA & EDUCATION"
      />

      {/* Main Minimalist Container */}
      <div className="space-y-8 sm:space-y-10">

        {/* Hero Bio Statement Stage with Smooth Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] space-y-5 hover:bg-white hover:border-black/40 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group transform-gpu"
        >
          {/* Top Subtle Dark Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Location Header */}
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#888888] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>K T ANITIN // BASED IN ERNAKULAM, KERALA</span>
          </div>

          {/* Main Title */}
          <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-snug">
            Software Developer & Visual Graphic Designer
          </h3>

          {/* Detailed Paragraph Content */}
          <div className="space-y-4 text-sm sm:text-base text-[#444444] font-medium leading-relaxed max-w-4xl pt-1">
            <p>
              Pursuing an <strong className="text-black font-extrabold">M.Sc. in Computer Science</strong> with a <strong className="text-black font-extrabold">B.Voc. in Software Development</strong> from St. Albert's College (Autonomous), Ernakulam. I specialize in building modern full-stack web software and crafting high-impact sports & social visual media.
            </p>

            <p className="text-[#555555]">
              My core passion lies at the intersection of clean software architecture and visual art—combining modern web frameworks (MERN Stack) with creative Adobe Photoshop design for sports artwork, matchday posters, YouTube thumbnails, and digital promotional collateral.
            </p>
          </div>
        </motion.div>

        {/* Academic Timeline Section (Untouched & Retained) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-[#ECECEC] space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-black uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-black" />
              <span>ACADEMIC TIMELINE</span>
            </span>
            <span className="font-mono text-[10px] text-[#888888] uppercase tracking-wider">
              3 QUALIFICATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group p-4.5 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] hover:bg-white hover:border-black/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-bold text-black bg-white px-2 py-0.5 rounded-md border border-[#ECECEC] group-hover:bg-black group-hover:text-white transition-colors">
                    {edu.period}
                  </span>
                  <span className="text-[10px] font-mono text-[#888888]">
                    {edu.location}
                  </span>
                </div>
                <h5 className="text-xs font-extrabold text-black truncate mb-0.5">
                  {edu.degree}
                </h5>
                <p className="text-[11px] text-[#666666] truncate font-semibold">
                  {edu.institution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}






