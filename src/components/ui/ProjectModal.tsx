'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Maximize2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

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

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-10 shadow-2xl text-[#111111] overscroll-contain"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-[#111111] hover:bg-black hover:text-white transition-colors cursor-pointer z-20"
              aria-label="Close modal"
              data-cursor="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-4 pr-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-black text-white font-mono text-xs font-semibold uppercase">
                  {project.category}
                </span>
                {project.duration && (
                  <span className="font-mono text-xs text-[#888888]">
                    {project.duration}
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
                {project.title}
              </h2>
              <p className="text-lg sm:text-xl font-medium text-[#666666]">
                {project.subtitle}
              </p>
            </div>

            {/* Featured Main Image (Clickable for Lightbox) */}
            {project.image && (
              <div
                onClick={() => setLightboxImage(project.image || null)}
                className="group relative my-6 rounded-2xl overflow-hidden border border-[#ECECEC] max-h-96 bg-[#FAFAFA] flex items-center justify-center cursor-zoom-in"
                title="Click to view full size image"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain max-h-96 rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Gallery Images (Clickable for Lightbox) */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="my-6">
                <h3 className="font-mono text-xs font-bold text-[#888888] uppercase mb-3">
                  WORK GALLERY (CLICK IMAGE TO EXPAND FULL SIZE)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.galleryImages.map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() => setLightboxImage(imgUrl)}
                      className="group relative rounded-xl overflow-hidden border border-[#ECECEC] bg-[#FAFAFA] aspect-square cursor-zoom-in"
                      title="Click to view full size"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery item ${imgIdx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Details */}
            <div className="my-8 space-y-6 border-t border-b border-[#ECECEC] py-6">
              <div>
                <h3 className="font-mono text-xs font-bold text-[#888888] uppercase mb-2">
                  PROJECT OVERVIEW
                </h3>
                <p className="text-base text-[#111111] leading-relaxed">
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
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] text-sm font-semibold text-[#111111]"
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
                      className="px-3.5 py-1.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-xs font-mono font-medium text-[#111111]"
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-[#111111] font-medium text-sm hover:bg-[#F3F3F3] transition-colors"
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
                  className="relative z-10 max-w-5xl max-h-[90vh] flex items-center justify-center"
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
                    className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
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
