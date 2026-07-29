'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      id: 'freelance-design-dev',
      role: 'Freelance Graphic Designer & Software Developer',
      company: 'Self-Employed / Independent Work',
      period: '2023 - Present',
      location: 'Ernakulam, India',
      type: 'Freelance & Contract',
      description: [
        'Designed high-engagement social media posters, YouTube thumbnails, sports/football graphics, and digital marketing banners for diverse clients.',
        'Created cohesive brand identity suites, typography systems, and promotional vector graphics using Adobe Photoshop and Figma.',
        'Developed clean web solutions, custom client websites, and cross-platform apps with modern code architecture.',
      ],
      techUsed: ['Adobe Photoshop', 'Figma', 'JavaScript', 'HTML5/CSS3', 'React/Next.js', 'Graphic Poster Design'],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="04"
        title="EXPERIENCE"
        subtitle="FREELANCE GRAPHIC DESIGN & DEVELOPMENT"
      />

      <div className="relative border-l border-[#ECECEC] ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-black group-hover:scale-125 group-hover:bg-black transition-all" />

            <div className="rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-8 md:p-10 hover:bg-white hover:border-black/30 hover:shadow-lg transition-all duration-200">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-black text-white font-mono text-xs font-semibold uppercase">
                    {exp.type}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[#666666]">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                </div>

                <span className="flex items-center gap-1.5 text-xs font-mono text-[#888888]">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </div>

              {/* Role & Company */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-1">
                {exp.role}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-[#666666] mb-6">
                {exp.company}
              </p>

              {/* Description Bullets */}
              <div className="space-y-3 mb-6">
                {exp.description.map((desc, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#666666]">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                    <span>{desc}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#ECECEC]">
                {exp.techUsed.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-xs font-mono text-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
