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

        {/* Hero Bio Statement Stage with Minimal Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="p-8 sm:p-12 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] space-y-5 hover:bg-white hover:border-black/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
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
              Pursuing an <strong className="text-black font-bold">M.Sc. in Computer Science</strong> after completing a <strong className="text-black font-bold">B.Voc. in Software Development</strong> from <strong className="text-black font-bold">St. Albert's College (Autonomous), Ernakulam</strong>, I specialize in <strong className="text-black font-bold">full-stack web development (MERN Stack)</strong>, building responsive and scalable web applications. I also have a strong understanding of <strong className="text-black font-bold">Artificial Intelligence (AI)</strong>, <strong className="text-black font-bold">AI-assisted development (Vibe Coding)</strong>, and <strong className="text-black font-bold">AI image generation</strong> to create modern and efficient digital solutions.
            </p>

            <p className="text-[#555555]">
              Alongside development, I am passionate about <strong className="text-black font-bold">graphic design</strong>, creating sports artwork, social media posters, YouTube thumbnails, and promotional content using <strong className="text-black font-bold">Adobe Photoshop</strong>. I enjoy combining technology, AI, and creativity to build digital experiences that are both functional and visually impactful.
            </p>
          </div>
        </motion.div>

        {/* Academic Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
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






