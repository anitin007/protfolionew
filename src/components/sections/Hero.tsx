'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Sparkles, FolderGit2 } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

function FadeUp({ children, delay = 0, className = '', animate }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({ isLoading = false }: { isLoading?: boolean }) {
  const show = !isLoading;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]"
    >
      {/* Top Status Pill */}
      <div className="relative z-10 flex items-center justify-between">
        <FadeUp animate={show} delay={0.05} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-xs font-mono text-[#111111] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AVAILABLE FOR FREELANCE &amp; ROLES</span>
        </FadeUp>

        <FadeUp animate={show} delay={0.1} className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#666666]">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>DEVELOPMENT &amp; GRAPHIC DESIGN</span>
        </FadeUp>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 my-auto py-12">
        <FadeUp animate={show} delay={0.12} className="mb-4">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#666666] block mb-2">
            HELLO, WORLD — I AM
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-[#111111] leading-[0.95] uppercase">
            K T ANITIN
          </h1>
        </FadeUp>

        <FadeUp animate={show} delay={0.2} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] mb-3">
              Software Developer &amp; Graphic Designer
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#666666] max-w-2xl leading-relaxed font-normal">
              Building Modern Digital Experiences &amp; Visual Media. Crafting high-performance web applications, mobile software, and striking graphic posters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <MagneticButton href="#projects" variant="primary" cursorText="WORK">
              <FolderGit2 className="w-4 h-4" />
              <span>View Projects</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary" cursorText="CONTACT">
              <Mail className="w-4 h-4" />
              <span>Contact &amp; Resume</span>
            </MagneticButton>
          </div>
        </FadeUp>
      </div>

      {/* Bottom Footer Info & Scroll Indicator */}
      <FadeUp animate={show} delay={0.28} className="relative z-10 flex items-end justify-between pt-8 border-t border-[#ECECEC] text-xs font-mono text-[#666666]">
        <div className="flex flex-col gap-0.5">
          <span className="text-[#888888]">BASED IN</span>
          <span className="text-black font-semibold">Ernakulam, Kerala, India</span>
        </div>
        <a
          href="#about"
          className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer group"
          data-cursor="SCROLL"
        >
          <span className="tracking-widest uppercase">SCROLL TO EXPLORE</span>
          <span className="p-2 rounded-full border border-[#ECECEC] bg-[#FAFAFA] group-hover:translate-y-1 transition-transform">
            <ArrowDown className="w-3.5 h-3.5 text-black" />
          </span>
        </a>
      </FadeUp>
    </section>
  );
}
