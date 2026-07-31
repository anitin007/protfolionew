'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ProjectModal from '../ui/ProjectModal';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import { ExternalLink, ArrowUpRight, Layers, Smartphone, Globe, Palette, ArrowLeft } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

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
    <section id="projects" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="03"
        title="SELECTED PROJECTS"
        subtitle="FEATURED WORK & CASE STUDIES"
      />

      {/* Interactive Category Filter Option Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div className="flex flex-wrap items-center gap-2.5 p-1.5 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'text-white'
                    : 'text-[#666666] hover:text-black'
                }`}
                data-cursor="SELECT"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-black rounded-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name.toUpperCase()}</span>
                <span
                  className={`relative z-10 px-2 py-0.5 rounded-md text-[10px] ${
                    isActive
                      ? 'bg-neutral-800 text-neutral-300'
                      : 'bg-white border border-[#ECECEC] text-[#888888]'
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#ECECEC] text-xs font-mono font-semibold text-[#555555] hover:text-black hover:border-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL CATEGORIES HUB</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeCategory === 'All' ? (
          /* Mode 1: When "ALL" is selected, show 3 Category Hub Boxes */
          <motion.div
            key="category-hubs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {categoryHubs.map((hub, hIdx) => (
              <motion.div
                key={hub.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: hIdx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setActiveCategory(hub.name)}
                className="group relative rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-8 hover:bg-white hover:border-black/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#ECECEC]">
                    <div className="p-3 rounded-2xl bg-white border border-[#ECECEC] text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      {hub.icon}
                    </div>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-[#111111]">
                      {hub.count} {hub.count === 1 ? 'PROJECT' : 'PROJECTS'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-[#111111] mb-2 tracking-tight group-hover:text-black transition-colors">
                    {hub.name}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed mb-6 font-medium">
                    {hub.description}
                  </p>

                  {/* Included Projects Preview */}
                  <div className="space-y-2 mb-6">
                    <span className="font-mono text-[10px] font-semibold text-[#888888] uppercase tracking-wider block">
                      FEATURED IN THIS CATEGORY:
                    </span>
                    {hub.projects.map((p) => (
                      <div
                        key={p.id}
                        className="px-3 py-2 rounded-xl bg-white border border-[#ECECEC] text-xs font-semibold text-[#111111] truncate group-hover:border-black/20 transition-colors flex items-center justify-between"
                      >
                        <span className="truncate">{p.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#888888] group-hover:text-black shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-[#ECECEC] flex items-center justify-between text-xs font-mono font-bold text-black">
                  <span>VIEW CATEGORY PROJECTS</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-8 hover:bg-white hover:border-black/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
                data-cursor="EXPLORE"
              >
                {/* Subtle top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
                      <span className="p-1 rounded-md bg-black text-white text-[10px]">0{idx + 1}</span>
                      <span>{project.category}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#666666] group-hover:text-black transition-colors">
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  {/* Visual Preview Container */}
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-[#111111] border border-[#ECECEC] shadow-sm">
                    {project.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
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
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <span className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                        <Layers className="w-3.5 h-3.5" />
                        <span>VIEW FULL CASE STUDY</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-black text-[#111111] mb-1.5 tracking-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#666666] mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-[#555555] leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Pills & Actions */}
                <div className="pt-4 border-t border-[#ECECEC] space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#ECECEC] text-[11px] font-mono text-[#222222] group-hover:border-black/20 transition-colors"
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-mono font-bold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
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
                          className="p-2.5 rounded-full bg-white border border-[#ECECEC] text-[#111111] hover:bg-black hover:text-white transition-colors shadow-2xs"
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
                          className="p-2.5 rounded-full bg-white border border-[#ECECEC] text-[#111111] hover:bg-black hover:text-white transition-colors shadow-2xs"
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

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

