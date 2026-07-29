'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ProjectModal from '../ui/ProjectModal';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import { ExternalLink, ArrowUpRight, Layers } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'App Development', 'Web Development', 'Graphic Design'];

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

      {/* Project Category Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-[#FAFAFA] text-[#666666] border border-[#ECECEC] hover:bg-[#F3F3F3] hover:text-black'
            }`}
            data-cursor="SELECT"
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Projects Showcase Minimalist Grid Layout (No full images on main cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-8 hover:bg-white hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Top Preview Box (Minimalist Text & Feature Preview) */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative w-full aspect-[16/9] rounded-2xl bg-white border border-[#ECECEC] p-6 flex flex-col justify-between overflow-hidden cursor-pointer group-hover:scale-[1.01] transition-transform duration-300 mb-6 shadow-2xs"
                data-cursor="CASE STUDY"
              >
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                  <span className="font-mono text-xs font-semibold text-[#111111] uppercase">
                    0{idx + 1} // {project.category}
                  </span>
                  <span className="p-1.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Features List Preview */}
                <div className="my-auto space-y-2 py-2">
                  {project.features.slice(0, 2).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="px-3.5 py-2 rounded-xl bg-[#FAFAFA] border border-[#ECECEC] text-xs font-medium text-[#111111] truncate"
                    >
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#ECECEC] font-mono text-[11px] text-[#888888]">
                  <span>CLICK FOR CASE STUDY & IMAGES</span>
                  <span className="text-black font-semibold">EXPLORE →</span>
                </div>
              </div>

              {/* Title & Info */}
              <h3 className="text-2xl font-extrabold text-[#111111] mb-2 tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm font-semibold text-[#666666] mb-3">
                {project.subtitle}
              </p>
              <p className="text-xs text-[#666666] leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Bottom Tech Pills & Actions */}
            <div className="space-y-4 pt-4 border-t border-[#ECECEC]">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-white border border-[#ECECEC] text-[11px] font-mono text-[#111111]"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-mono font-semibold hover:bg-[#333333] transition-colors cursor-pointer shadow-2xs"
                  data-cursor="OPEN"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white border border-[#ECECEC] text-[#111111] hover:bg-black hover:text-white transition-colors"
                      data-cursor="LIVE"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white border border-[#ECECEC] text-[#111111] hover:bg-black hover:text-white transition-colors"
                      data-cursor="CODE"
                      aria-label="View Source"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
