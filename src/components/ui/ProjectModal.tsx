'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Maximize2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Pause, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveImageIndex(0);
    setIsAutoPlaying(true);
  }, [project]);

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

  // Automatic Image Carousel Timer (3.5 Seconds interval)
  useEffect(() => {
    if (!project || gallery.length <= 1 || !isAutoPlaying || lightboxImage) return;

    const autoSlideTimer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    }, 3500);

    return () => clearInterval(autoSlideTimer);
  }, [project, gallery.length, isAutoPlaying, lightboxImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevImage();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextImage();
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
  }, [project, lightboxImage, onClose, gallery.length]);

  const verticalFeedRef = useRef<HTMLDivElement>(null);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center p-2.5 sm:p-6 md:p-8 overflow-hidden"
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
            className="relative z-10 w-full max-w-5xl max-h-[94vh] sm:max-h-[92vh] overflow-y-auto bg-[#FAFAFA] border border-[#ECECEC] rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl text-[#111111] overscroll-contain"
          >
            {/* Sticky Header with Close Button for Mobile & Desktop */}
            <div className="sticky -top-5 sm:-top-8 md:-top-10 z-50 flex items-center justify-between bg-[#FAFAFA]/95 backdrop-blur-md pt-3 pb-3 mb-6 -mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-10 md:px-10 border-b border-[#ECECEC]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
                  CASE STUDY & DETAILS
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 px-3.5 sm:px-4"
                aria-label="Close modal"
                data-cursor="CLOSE"
              >
                <span className="font-mono text-xs font-bold">CLOSE</span>
                <X className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
            </div>

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
                <div className="relative rounded-3xl bg-[#0a0a0c] border border-[#222222] overflow-hidden shadow-2xl group/stage">
                  <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] flex items-center justify-center p-4 sm:p-6 bg-[#09090b]">
                    {/* Left Navigation Arrow Button */}
                    {gallery.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer"
                        aria-label="Previous image"
                        title="Previous image (Left Arrow)"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    )}

                    {/* Right Navigation Arrow Button */}
                    {gallery.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer"
                        aria-label="Next image"
                        title="Next image (Right Arrow)"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    )}

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

                    {/* Floating Bottom Controls Pill */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-5 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold flex items-center gap-2 sm:gap-3.5 shadow-2xl z-30">
                      {gallery.length > 1 && (
                        <button
                          onClick={handlePrevImage}
                          className="p-1 rounded-md hover:bg-white/20 transition-colors text-white cursor-pointer"
                          title="Previous Image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      )}

                      <span>DESIGN {activeImageIndex + 1} / {gallery.length}</span>

                      {gallery.length > 1 && (
                        <button
                          onClick={() => setIsAutoPlaying((prev) => !prev)}
                          className="p-1 rounded-md hover:bg-white/20 transition-colors text-amber-300 cursor-pointer"
                          title={isAutoPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
                        >
                          {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                      )}

                      {gallery.length > 1 && (
                        <button
                          onClick={handleNextImage}
                          className="p-1 rounded-md hover:bg-white/20 transition-colors text-white cursor-pointer"
                          title="Next Image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}

                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <button
                        onClick={() => setLightboxImage(currentActiveImage)}
                        className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">ZOOM</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Small Preview Thumbnail Ribbon directly below the main image stage */}
                {gallery.length > 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[#888888] px-1 uppercase tracking-wider">
                      <span>QUICK PREVIEW THUMBNAILS</span>
                      <span>CLICK OR USE ARROWS TO SWITCH IMAGE</span>
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

                {/* 2. Full-Height Vertical Editorial Art Feed with Sticky Up/Down Controls */}
                <div className="space-y-6 pt-4 relative">
                  <div className="flex items-center justify-between pb-3 border-b border-[#ECECEC]">
                    <h3 className="font-mono text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-black" />
                      <span>COMPLETE ARTWORK PORTFOLIO FEED ({gallery.length})</span>
                    </h3>

                    {/* Up Arrow & Down Arrow Scroll Control Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => verticalFeedRef.current?.scrollBy({ top: -450, behavior: 'smooth' })}
                        className="px-3 py-1.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                        title="Scroll Image Feed Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>UP</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => verticalFeedRef.current?.scrollBy({ top: 450, behavior: 'smooth' })}
                        className="px-3 py-1.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                        title="Scroll Image Feed Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                        <span>DOWN</span>
                      </button>
                    </div>
                  </div>

                  <div
                    ref={verticalFeedRef}
                    className="space-y-8 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scroll-smooth"
                  >
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
              /* APP & WEB DEVELOPMENT FEATURED IMAGE STAGE */
              gallery.length > 0 && (
                <div className="my-8 space-y-4">
                  <div className="relative rounded-3xl bg-[#0a0a0c] border border-[#222222] overflow-hidden shadow-2xl group/stage">
                    <div className="relative w-full aspect-[16/9] flex items-center justify-center p-2 sm:p-4 bg-[#09090b]">
                      {/* Left Navigation Arrow Button */}
                      {gallery.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer"
                          aria-label="Previous image"
                          title="Previous image (Left Arrow)"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      )}

                      {/* Right Navigation Arrow Button */}
                      {gallery.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer"
                          aria-label="Next image"
                          title="Next image (Right Arrow)"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      )}

                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentActiveImage}
                          src={currentActiveImage}
                          alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full object-cover rounded-2xl shadow-xl cursor-zoom-in"
                          onClick={() => setLightboxImage(currentActiveImage)}
                        />
                      </AnimatePresence>

                      {/* Floating Bottom Controls Pill */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-5 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold flex items-center gap-2 sm:gap-3.5 shadow-2xl z-30">
                        {gallery.length > 1 && (
                          <button
                            onClick={handlePrevImage}
                            className="p-1 rounded-md hover:bg-white/20 transition-colors text-white cursor-pointer"
                            title="Previous Image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        )}

                        <span>
                          {gallery.length > 1 ? `SCREENSHOT ${activeImageIndex + 1} / ${gallery.length}` : 'FEATURED PREVIEW'}
                        </span>

                        {gallery.length > 1 && (
                          <button
                            onClick={() => setIsAutoPlaying((prev) => !prev)}
                            className="p-1 rounded-md hover:bg-white/20 transition-colors text-amber-300 cursor-pointer"
                            title={isAutoPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
                          >
                            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                        )}

                        {gallery.length > 1 && (
                          <button
                            onClick={handleNextImage}
                            className="p-1 rounded-md hover:bg-white/20 transition-colors text-white cursor-pointer"
                            title="Next Image"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}

                        <span className="w-1 h-1 rounded-full bg-white/40" />

                        <button
                          onClick={() => setLightboxImage(currentActiveImage)}
                          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">FULLSCREEN</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Row for App/Web Dev gallery if multiple images */}
                  {gallery.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                      {gallery.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                            activeImageIndex === idx
                              ? 'border-black scale-105 shadow-md ring-2 ring-black/20'
                              : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'
                          }`}
                          title={`View image ${idx + 1}`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-20 h-14 object-cover rounded-lg bg-[#0c0c0e]"
                          />
                        </button>
                      ))}
                    </div>
                  )}
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
    </AnimatePresence>,
    document.body
  );
}
