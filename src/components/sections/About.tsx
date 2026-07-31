'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { EDUCATION } from '@/data/portfolioData';
import { GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative pt-20 pb-28 sm:pb-36 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
        <SectionHeader
          number="01"
          title="ABOUT ME"
          subtitle="BACKGROUND & EDUCATION"
        />

        {/* Bio Text with Clean Minimal Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-4xl text-sm sm:text-base text-[#444444] leading-relaxed font-normal mt-1"
        >
          <p className="text-base sm:text-lg text-[#111111] font-medium leading-snug">
            I'm <strong className="font-semibold text-black">K T Anitin</strong>, a passionate Software Developer, aspiring MERN Stack Developer, and Visual Graphic Designer based in Ernakulam, Kerala.
          </p>

          <p>
            Currently pursuing an M.Sc. in Computer Science after completing a B.Voc. in Software Development from St. Albert's College (Autonomous), I enjoy building modern, responsive, and user-focused digital experiences. I'm continuously expanding my expertise in the MERN Stack (MongoDB, Express.js, React, and Node.js) while strengthening my foundation in full-stack development.
          </p>

          <p>
            Beyond coding, I'm a creative designer with experience crafting social media campaigns, YouTube thumbnails, sports and football graphics, branding materials, and promotional visuals. I combine technical expertise with a strong design sense to create products that are functional, visually engaging, and memorable.
          </p>
        </motion.div>

        {/* Education Section Header */}
        <div className="pt-8 mt-4 border-t border-[#ECECEC]">
          <div className="flex items-center gap-2.5 mb-5">
            <GraduationCap className="w-4 h-4 text-black" />
            <h3 className="text-base font-bold text-[#111111] uppercase tracking-wider font-mono">
              Education & Qualifications
            </h3>
          </div>

          {/* Ultra Minimal Compact Education Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] p-4 hover:bg-white hover:border-black/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Period Badge & Location Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-semibold text-[#666666] uppercase tracking-wider">
                      {edu.period}
                    </span>
                    <span className="text-[10px] font-mono text-[#888888]">
                      {edu.location}
                    </span>
                  </div>

                  {/* Course Name / Degree */}
                  <h4 className="text-base font-bold text-black leading-snug mb-1">
                    {edu.degree}
                  </h4>

                  {/* Institution */}
                  <p className="text-xs text-[#555555] font-medium leading-tight">
                    {edu.institution}
                  </p>
                </div>

                {/* Minimal Tags */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#ECECEC] flex flex-wrap gap-1">
                    {edu.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#ECECEC] text-[10px] font-mono text-[#444444] group-hover:border-black/20 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}






