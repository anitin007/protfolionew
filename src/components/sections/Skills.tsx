'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { Code2, Palette, Cpu, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven expansion: Starts at scale 0.90 (small) and smoothly reaches scale 1.0 (normal)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.90, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 1.0]);

  const skillCategories = [
    {
      id: 'dev',
      num: '01',
      title: 'Software & Web Development',
      subtitle: 'Frontend, Backend & Databases',
      icon: <Code2 className="w-4 h-4 text-black" />,
      skills: [
        { name: 'Java', level: 'Core' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'Python', level: 'Proficient' },
        { name: 'HTML5 & CSS3', level: 'Advanced' },
        { name: 'Bootstrap', level: 'Framework' },
        { name: 'MySQL', level: 'Database' },
        { name: 'Firebase', level: 'BaaS' },
        { name: 'React.js', level: 'Learning / Building' },
        { name: 'Node.js & Express', level: 'Learning / Building' },
        { name: 'MongoDB', level: 'Database' },
      ],
    },
    {
      id: 'design',
      num: '02',
      title: 'Visual Design & Graphics',
      subtitle: 'UI/UX & Creative Assets',
      icon: <Palette className="w-4 h-4 text-black" />,
      skills: [
        { name: 'Adobe Photoshop', level: 'Advanced' },
        { name: 'Figma', level: 'UI/UX Design' },
        { name: 'Social Media Graphics', level: 'Creative' },
        { name: 'YouTube Thumbnails', level: 'Branding' },
        { name: 'Sports & Poster Design', level: 'Visuals' },
        { name: 'Brand Identity', level: 'Concept' },
      ],
    },
  ];

  return (
    <div ref={containerRef} className="relative z-20 -mt-16 sm:-mt-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.section
        id="skills"
        style={{
          scale,
          y,
          opacity,
        }}
        className="relative bg-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] rounded-b-[2rem] shadow-[0_-30px_80px_rgba(0,0,0,0.12)] border border-[#ECECEC] py-16 sm:py-24 px-6 sm:px-12 text-[#111111] transform-gpu origin-top transition-shadow duration-300"
      >
        {/* Top Sheet Drag/Indicator Bar */}
        <div className="w-10 h-1 rounded-full bg-[#E0E0E0] mx-auto -mt-10 sm:-mt-14 mb-10 opacity-75" />

        <SectionHeader
          number="02"
          title="TECHNICAL SKILLS"
          subtitle="DEVELOPMENT & DESIGN"
          titleClassName="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter uppercase leading-[0.9] text-black -mx-6 sm:-mx-12 lg:-mx-16 px-6 sm:px-12 lg:px-16 py-2 block select-none"
        />

        {/* Premium Minimal Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-8 hover:bg-white hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#ECECEC]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white border border-[#ECECEC] text-black shadow-2xs group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#666666] font-mono mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-[#888888]">
                    {cat.num}
                  </span>
                </div>

                {/* Minimal Skill Tags Cloud */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ scale: 1.04, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="group/tag flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#ECECEC] hover:border-black hover:bg-black hover:text-white transition-all duration-200 shadow-2xs cursor-default"
                    >
                      <span className="text-xs sm:text-sm font-medium tracking-tight text-[#111111] group-hover/tag:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#F4F4F5] text-[#777777] group-hover/tag:bg-neutral-800 group-hover/tag:text-neutral-300 transition-colors">
                        {skill.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Card Footer Accent */}
              <div className="mt-8 pt-4 border-t border-[#ECECEC] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE TOOLSET
                </span>
                <span className="group-hover:text-black transition-colors font-medium">
                  {cat.skills.length} TECHNOLOGIES
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Stack Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 p-5 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#555555]"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-black" />
            <span className="font-semibold text-black">CONTINUOUS LEARNING:</span>
            <span>Expanding MERN stack ecosystem (MongoDB, Express, React, Node)</span>
          </div>
          <div className="flex items-center gap-2 text-[#888888]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Clean Code & Modern UX First</span>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

