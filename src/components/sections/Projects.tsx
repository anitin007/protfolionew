'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ProjectModal from '../ui/ProjectModal';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import { ExternalLink, ArrowUpRight, Layers, Smartphone, Globe, Palette, ArrowLeft } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  // 3-Stage Scroll Expansion:
  // 1st scroll: Rounded sheet card comes into view (scale 0.86, 4.5rem top radius)
  // 2nd scroll: Project items & filter bar display clearly inside the box (scale 0.94, 2rem top radius)
  // 3rd scroll: Section automatically expands to go ALL BLACK across the ENTIRE FULL SCREEN (scale 1.0, 0px radius)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.92], [0.86, 0.93, 0.97, 1.0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.92], [120, 45, 15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1.0]);
  const borderTopRadius = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.92], ['4.5rem', '3rem', '1.5rem', '0rem']);

  const categories = [
    { name: 'All', count: PROJECTS.length },
    { name: 'App Development', count: PROJECTS.filter(p => p.category === 'App Development').length },
    { name: 'Web Development', count: PROJECTS.filter(p => p.category === 'Web Development').length },
    { name: 'Graphic Design', count: PROJECTS.filter(p => p.category === 'Graphic Design').length },
  ];

  const categoryHubs = [
    {
      name: 'App Development',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Cross-platform mobile applications built with Flutter & Firebase backend integration.',
      count: PROJECTS.filter(p => p.category === 'App Development').length,
      projects: PROJECTS.filter(p => p.category === 'App Development'),
    },
    {
      name: 'Web Development',
      icon: <Globe className="w-5 h-5" />,
      description: 'Cinematic web experiences, interactive scroll animations & modern frontend architecture.',
      count: PROJECTS.filter(p => p.category === 'Web Development').length,
      projects: PROJECTS.filter(p => p.category === 'Web Development'),
    },
    {
      name: 'Graphic Design',
      icon: <Palette className="w-5 h-5" />,
      description: 'High-impact sports posters, football matchday key visual art & promotional media graphics.',
      count: PROJECTS.filter(p => p.category === 'Graphic Design').length,
      projects: PROJECTS.filter(p => p.category === 'Graphic Design'),
    },
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div ref={containerRef} className="w-full relative z-30 -mt-16 sm:-mt-24">
      <motion.section
        id="projects"
        style={{
          scale,
          y,
          opacity,
          borderTopLeftRadius: borderTopRadius,
          borderTopRightRadius: borderTopRadius,
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
        }}
        className="relative w-full min-h-screen bg-black shadow-[0_-15px_40px_rgba(0,0,0,0.3)] border-t border-neutral-800 pt-28 sm:pt-36 md:pt-44 pb-36 sm:pb-48 md:pb-56 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 text-white transform-gpu origin-top transition-shadow duration-300 overflow-hidden"
      >
        {/* Top Sheet Drag/Indicator Bar */}
        <div className="w-14 h-1.5 rounded-full bg-neutral-800 mx-auto -mt-16 sm:-mt-24 mb-16 opacity-80" />

        <div className="w-full max-w-[95rem] mx-auto">
          <SectionHeader
            number="03"
            title="SELECTED PROJECTS"
            subtitle="FEATURED WORK & CASE STUDIES"
            dark={true}
          />

          {/* Interactive Category Filter Option Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap items-center gap-2.5 p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`relative px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    data-cursor="SELECT"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.name.toUpperCase()}</span>
                    <span
                      className={`relative z-10 px-2 py-0.5 rounded-md text-[10px] ${
                        isActive
                          ? 'bg-neutral-200 text-black font-bold'
                          : 'bg-neutral-800 border border-neutral-700 text-neutral-400'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Back to All Categories button when inside a specific category */}
            {activeCategory !== 'All' && (
              <button
                onClick={() => setActiveCategory('All')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono font-semibold text-neutral-300 hover:text-white hover:border-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL CATEGORIES HUB</span>
              </button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {activeCategory === 'All' ? (
              /* Mode 1: When "ALL" is selected, show 3 Category Hub Boxes with Silky Smooth Entrance */
              <motion.div
                key="category-hubs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              >
                {categoryHubs.map((hub, hIdx) => (
                  <motion.div
                    key={hub.name}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.45,
                      delay: hIdx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -6,
                      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                    }}
                    onClick={() => setActiveCategory(hub.name)}
                    className="group relative rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 hover:bg-neutral-900 hover:border-neutral-600 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform-gpu text-white"
                  >
                    {/* Sleek Light Top Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Minimalist Watermark Index */}
                    <div className="absolute -bottom-4 -right-2 font-mono font-extrabold text-7xl text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-300">
                      0{hIdx + 1}
                    </div>

                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                        <div className="p-3.5 rounded-2xl bg-neutral-800 border border-neutral-700 text-white shadow-2xs group-hover:bg-white group-hover:text-black group-hover:-translate-y-1 transition-all duration-300">
                          {hub.icon}
                        </div>
                        <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-white group-hover:border-neutral-500 transition-colors shadow-2xs">
                          {hub.count} {hub.count === 1 ? 'PROJECT' : 'PROJECTS'}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-black text-white mb-2 tracking-tight">
                        {hub.name}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-medium">
                        {hub.description}
                      </p>

                      {/* Included Projects Preview */}
                      <div className="space-y-2 mb-6">
                        <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                          FEATURED IN THIS CATEGORY:
                        </span>
                        {hub.projects.map((p) => (
                          <div
                            key={p.id}
                            className="px-3 py-2 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-semibold text-neutral-200 truncate group-hover:border-neutral-700 group-hover:bg-neutral-800/90 transition-all flex items-center justify-between shadow-2xs"
                          >
                            <span className="truncate">{p.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono font-bold text-white">
                      <span>VIEW CATEGORY PROJECTS</span>
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300 text-white">
                        EXPLORE →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Mode 2: When a specific category is selected, show detailed Project Cards */
              <motion.div
                key={`category-projects-${activeCategory}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
              >
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => setSelectedProject(project)}
                    className="group relative rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 hover:bg-neutral-900 hover:border-neutral-700 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.04)] transition-all duration-500 flex flex-col justify-between cursor-pointer overflow-hidden text-white"
                    data-cursor="EXPLORE"
                  >
                    {/* Subtle top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div>
                      {/* Header row */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="p-1 rounded-md bg-white text-black text-[10px] font-extrabold">0{idx + 1}</span>
                          <span>{project.category}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                          <span>CASE STUDY</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>

                      {/* Visual Preview Container */}
                      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-neutral-950 border border-neutral-800 shadow-sm">
                        {project.image ? (
                          <div className="relative w-full h-full">
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                          </div>
                        ) : (
                          /* Tech / Architectural Card Render for Projects without hero images */
                          <div className="w-full h-full bg-gradient-to-br from-[#18181B] via-[#09090B] to-[#18181B] p-6 flex flex-col justify-between text-white">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                              </div>
                              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                                {project.techStack[0] || 'FULL STACK'}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <span className="text-xs font-mono text-neutral-400">PROTOCOL // CASE STUDY</span>
                              <h4 className="text-lg font-bold text-white tracking-tight">{project.title}</h4>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                              <span>LIVE DASHBOARD</span>
                              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                ACTIVE
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Overlaid Hover Badge */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
                          <span className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                            <Layers className="w-3.5 h-3.5" />
                            <span>VIEW FULL CASE STUDY</span>
                          </span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl font-black text-white mb-1.5 tracking-tight group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-400 mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-xs text-neutral-300 leading-relaxed mb-5 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Tech Pills & Actions */}
                    <div className="pt-4 border-t border-neutral-800 space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-[11px] font-mono text-neutral-300 group-hover:border-neutral-500 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer"
                          data-cursor="OPEN"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Case Study & Media</span>
                        </button>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-full bg-neutral-800 border border-neutral-700 text-white hover:bg-white hover:text-black transition-colors shadow-2xs"
                              data-cursor="LIVE"
                              title="View Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {project.githubUrl && project.githubUrl !== '#' && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-full bg-neutral-800 border border-neutral-700 text-white hover:bg-white hover:text-black transition-colors shadow-2xs"
                              data-cursor="CODE"
                              title="View Source Code"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Case Study Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </motion.section>
    </div>
  );
}

