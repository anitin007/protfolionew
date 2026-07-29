'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { Code2, Palette, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  const skillsData = [
    {
      categoryKey: 'development',
      title: 'Development',
      icon: <Code2 className="w-5 h-5" />,
      subgroups: [
        {
          groupName: 'Programming Languages',
          items: ['Java', 'JavaScript', 'Python', 'HTML5', 'CSS3'],
        },
        {
          groupName: 'Frameworks',
          items: ['Bootstrap'],
        },
        {
          groupName: 'Databases',
          items: ['MySQL', 'Firebase'],
        },
      ],
    },
    {
      categoryKey: 'design',
      title: 'Design',
      icon: <Palette className="w-5 h-5" />,
      subgroups: [
        {
          groupName: 'Design & UI/UX',
          items: ['Adobe Photoshop', 'Figma'],
        },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="02"
        title="TECHNICAL SKILLS"
        subtitle="DEVELOPMENT & DESIGN"
      />

      {/* Skills Grid without filter options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category, catIdx) => (
          <motion.div
            key={category.categoryKey}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            className="group relative rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-10 hover:bg-white hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Category Card Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ECECEC]">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white border border-[#ECECEC] text-black shadow-2xs group-hover:bg-black group-hover:text-white transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-[#888888]">
                  0{catIdx + 1}
                </span>
              </div>

              {/* Subgroups */}
              <div className="space-y-6">
                {category.subgroups.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <span className="font-mono text-xs font-semibold text-[#888888] uppercase tracking-wider block">
                      {sub.groupName}
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {sub.items.map((skillName, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#ECECEC] text-sm font-semibold text-[#111111] shadow-2xs hover:border-black transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                          <span>{skillName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-8 pt-4 border-t border-[#ECECEC] flex items-center justify-between text-xs font-mono text-[#888888]">
              <span>CORE COMPETENCY</span>
              <span className="group-hover:text-black transition-colors">VERIFIED STACK</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
