'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { EDUCATION } from '@/data/portfolioData';
import { GraduationCap, MapPin, Code2, Palette, Sparkles, Terminal } from 'lucide-react';

export default function About() {
  const highlights = [
    { number: '01', title: 'FULL-STACK SOFTWARE', subtitle: 'MERN Stack & Web Apps', icon: Code2 },
    { number: '02', title: 'VISUAL GRAPHIC ART', subtitle: 'Photoshop, Sports & Media', icon: Palette },
    { number: '03', title: 'M.SC COMPUTER SCIENCE', subtitle: "St. Albert's College (Autonomous)", icon: GraduationCap },
  ];

  return (
    <section id="about" className="relative pt-20 pb-28 sm:pb-32 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="01"
        title="ABOUT ME"
        subtitle="MINIMAL PERSONA & EDUCATION"
      />

      {/* Main Minimalist Grid */}
      <div className="space-y-8 sm:space-y-10">

        {/* Concise Hero Statement Stage with Smooth Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] space-y-4 hover:bg-white hover:border-black/40 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group transform-gpu"
        >
          {/* Top Subtle Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#888888] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>K T ANITIN // BASED IN ERNAKULAM, KERALA</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-snug">
            Software Developer & Visual Graphic Designer
          </h3>

          <p className="text-sm sm:text-base text-[#555555] font-medium leading-relaxed max-w-3xl">
            Pursuing M.Sc. in Computer Science with a B.Voc. in Software Development. I build full-stack web software and craft high-impact sports & social visual media.
          </p>
        </motion.div>

        {/* 3 Interactive Highlight Pill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] hover:bg-white hover:border-black/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform-gpu"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#ECECEC] text-black shadow-2xs group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#888888] bg-white px-2.5 py-1 rounded-full border border-[#ECECEC] group-hover:border-black/30 transition-colors">
                    [ {item.number} ]
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-black text-black tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono font-semibold text-[#666666]">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Horizontal Education Timeline */}
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






