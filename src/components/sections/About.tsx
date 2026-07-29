'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import InteractiveDotField from '../ui/InteractiveDotField';
import { EDUCATION } from '@/data/portfolioData';
import { GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      {/* Background Interactive 3D Responding Micro-Dots Layer (Edge-to-Edge Liquid Flow) */}
      <InteractiveDotField />

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

        {/* Education Cards Grid */}
        <div className="pt-8 mt-4 border-t border-[#ECECEC]">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-5 h-5 text-black" />
            <h3 className="text-xl font-bold text-[#111111]">Education & Training</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl bg-[#FAFAFA]/90 backdrop-blur-xs border border-[#ECECEC] p-6 hover:bg-white hover:border-black/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] font-semibold px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-[#666666]">
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#111111] mb-1 leading-snug">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-semibold text-[#666666] mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-[11px] font-mono text-[#888888] mb-3">
                    {edu.location}
                  </p>
                  <p className="text-xs text-[#666666] leading-relaxed mb-4">
                    {edu.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECECEC]">
                  <div className="flex flex-wrap gap-1">
                    {edu.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#ECECEC] text-[10px] font-mono text-[#111111]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
