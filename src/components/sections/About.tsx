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

        {/* Hero Bio Statement Stage (Smooth Scroll Fade-In) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E5E5] space-y-5 relative overflow-hidden"
        >
          {/* Status Location Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 font-mono text-xs font-medium text-[#777777] uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>K T ANITIN // BASED IN ERNAKULAM, KERALA</span>
          </motion.div>

          {/* Main Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl font-bold text-black tracking-tight leading-snug font-sans"
          >
            Software Developer & Visual Graphic Designer
          </motion.h3>

          {/* Detailed Minimal Paragraph Content with Staggered Scroll Fade-In */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-4xl pt-1 font-sans">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Pursuing an <strong className="text-black font-medium">M.Sc. in Computer Science</strong> after completing a <strong className="text-black font-medium">B.Voc. in Software Development</strong> from <strong className="text-black font-medium">St. Albert's College (Autonomous), Ernakulam</strong>, I specialize in <strong className="text-black font-medium">full-stack web development (MERN Stack)</strong>, building responsive and scalable web applications. I also have a strong understanding of <strong className="text-black font-medium">Artificial Intelligence (AI)</strong>, <strong className="text-black font-medium">AI-assisted development (Vibe Coding)</strong>, and <strong className="text-black font-medium">AI image generation</strong> to create modern and efficient digital solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Alongside development, I am passionate about <strong className="text-black font-medium">graphic design</strong>, creating sports artwork, social media posters, YouTube thumbnails, and promotional content using <strong className="text-black font-medium">Adobe Photoshop</strong>. I enjoy combining technology, AI, and creativity to build digital experiences that are both functional and visually impactful.
            </motion.p>
          </div>
        </motion.div>

        {/* Academic Timeline Section (Staggered Scroll Fade-In) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-4.5 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-semibold text-black bg-white px-2 py-0.5 rounded-md border border-[#E5E5E5]">
                    {edu.period}
                  </span>
                  <span className="text-[10px] font-mono text-[#888888]">
                    {edu.location}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-black truncate mb-0.5">
                  {edu.degree}
                </h5>
                <p className="text-[11px] text-[#666666] truncate font-medium">
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






