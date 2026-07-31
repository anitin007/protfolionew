'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Maximize2, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, lightboxImage, onClose]);

  const isGraphicDesign = project?.category === 'Graphic Design';
  const gallery = project?.galleryImages || (project?.image ? [project.image] : []);
  const currentActiveImage = gallery[activeImageIndex] || project?.image || '';

  const handleNextImage = () => {
    if (gallery.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const handlePrevImage = () => {
    if (gallery.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-lg cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#FAFAFA] border border-[#ECECEC] rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl text-[#111111] overscroll-contain"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white border border-[#ECECEC] text-[#111111] hover:bg-black hover:text-white transition-colors cursor-pointer z-30 shadow-md"
              aria-label="Close modal"
              data-cursor="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-3 pr-12 mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-black text-white font-mono text-xs font-semibold uppercase">
                  {project.category}
                </span>
                {project.duration && (
                  <span className="font-mono text-xs text-[#888888]">
                    {project.duration}
                  </span>
                )}
                {isGraphicDesign && gallery.length > 0 && (
                  <span className="font-mono text-xs text-black bg-white border border-[#ECECEC] px-3.5 py-1 rounded-full font-bold shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{gallery.length} HIGH-RES DESIGNS</span>
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg font-medium text-[#666666]">
                {project.subtitle}
              </p>
            </div>

            {/* GRAPHIC DESIGN EDITORIAL CINEMA & FULL-HEIGHT VERTICAL ART FEED */}
            {isGraphicDesign ? (
              <div className="my-8 space-y-10">
                {/* 1. Sleek Cinema Banner Slider Stage */}
                <div className="relative rounded-3xl bg-[#0a0a0c] border border-[#222222] overflow-hidden shadow-2xl">
                  <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] flex items-center justify-center p-4 sm:p-6 bg-[#09090b]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentActiveImage}
                        src={currentActiveImage}
                        alt={`${project.title} artwork ${activeImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                        className="w-auto h-auto max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                      />
                    </AnimatePresence>

                    {/* Left & Right Slide Controls */}
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110"
                          title="Previous Design"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110"
                          title="Next Design"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Floating Bottom Info Pill */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold flex items-center gap-3 shadow-xl">
                      <span>DESIGN {activeImageIndex + 1} / {gallery.length}</span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <button
                        onClick={() => setLightboxImage(currentActiveImage)}
                        className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>ZOOM</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Small Preview Thumbnail Ribbon directly below the main image stage */}
                {gallery.length > 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[#888888] px-1 uppercase tracking-wider">
                      <span>QUICK PREVIEW THUMBNAILS</span>
                      <span>CLICK TO SWITCH MAIN IMAGE</span>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
                      {gallery.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                            activeImageIndex === idx
                              ? 'border-black scale-105 shadow-md ring-2 ring-black/20'
                              : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'
                          }`}
                          title={`Switch to spread ${idx + 1}`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Preview ${idx + 1}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-[#0c0c0e]"
                          />
                          {activeImageIndex === idx && (
                            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black shadow-sm" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Full-Height Vertical Editorial Art Feed (Shows Every Image Uncropped) */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#ECECEC]">
                    <h3 className="font-mono text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-black" />
                      <span>COMPLETE ARTWORK PORTFOLIO FEED ({gallery.length})</span>
                    </h3>
                    <span className="font-mono text-xs text-[#888888]">FULL UNCROPPED VIEW</span>
                  </div>

                  <div className="space-y-8">
                    {gallery.map((imgUrl, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="group relative rounded-3xl bg-white border border-[#ECECEC] p-4 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Header Bar inside card */}
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ECECEC] text-xs font-mono">
                          <span className="font-bold text-black flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">
                              0{idx + 1}
                            </span>
                            <span>{project.title} · SPREAD {idx + 1}</span>
                          </span>

                          <button
                            onClick={() => setLightboxImage(imgUrl)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] hover:bg-black hover:text-white transition-colors cursor-pointer text-xs font-bold"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>FULLSCREEN</span>
                          </button>
                        </div>

                        {/* Image Canvas showing uncropped full height */}
                        <div
                          onClick={() => setLightboxImage(imgUrl)}
                          className="relative w-full rounded-2xl bg-[#0c0c0e] overflow-hidden p-2 sm:p-4 flex items-center justify-center cursor-zoom-in"
                        >
                          <img
                            src={imgUrl}
                            alt={`${project.title} spread ${idx + 1}`}
                            className="w-full h-auto max-h-[700px] object-contain rounded-xl shadow-xl group-hover:scale-[1.01] transition-transform duration-500"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* APP & WEB DEVELOPMENT FEATURED IMAGE BOX (Fixed clean container) */
              project.image && (
                <div className="relative my-6 rounded-2xl overflow-hidden border border-[#ECECEC] bg-[#111111] aspect-[16/9] flex items-center justify-center shadow-sm">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              )
            )}

            {/* Content Details */}
            <div className="my-8 space-y-6 border-t border-b border-[#ECECEC] py-6">
              <div>
                <h3 className="font-mono text-xs font-bold text-[#888888] uppercase mb-2">
                  PROJECT OVERVIEW
                </h3>
                <p className="text-base text-[#111111] leading-relaxed font-normal">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="font-mono text-xs font-bold text-[#888888] uppercase mb-3">
                  KEY HIGHLIGHTS & CAPABILITIES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-[#ECECEC] text-sm font-semibold text-[#111111]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="font-mono text-xs font-bold text-[#888888] uppercase mb-3">
                  TOOLS & STACK USED
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#ECECEC] text-xs font-mono font-medium text-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white font-medium text-sm hover:bg-[#333333] transition-colors"
                  data-cursor="LIVE"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#ECECEC] text-[#111111] font-medium text-sm hover:bg-[#F3F3F3] transition-colors"
                  data-cursor="GITHUB"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Full Size Image Lightbox Modal */}
          <AnimatePresence>
            {lightboxImage && (
              <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 sm:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxImage(null)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-lg cursor-pointer"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative z-10 max-w-6xl max-h-[92vh] flex items-center justify-center"
                >
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="absolute -top-12 right-0 p-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <img
                    src={lightboxImage}
                    alt="Full size view"
                    className="w-auto h-auto max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl border border-white/20"
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
