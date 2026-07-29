'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { TECH_MARQUEE } from '@/data/portfolioData';
import {
  Atom,
  Zap,
  FileCode,
  Smartphone,
  Code,
  Coffee,
  Flame,
  Server,
  Wind,
  Activity,
  Image,
  Database,
  GitBranch,
  Terminal,
  Layout
} from 'lucide-react';
import { FigmaIcon } from '../ui/Icons';

const ICON_MAP: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  FileCode: <FileCode className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Code: <Code className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
  Wind: <Wind className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Figma: <FigmaIcon className="w-4 h-4" />,
  Image: <Image className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  GitBranch: <GitBranch className="w-4 h-4" />,
  Terminal: <Terminal className="w-4 h-4" />,
  Layout: <Layout className="w-4 h-4" />,
};

export default function TechStackMarquee() {
  const row1 = TECH_MARQUEE.slice(0, 8);
  const row2 = TECH_MARQUEE.slice(8);

  return (
    <section className="py-20 border-y border-[#ECECEC] bg-[#FAFAFA]/50 overflow-hidden text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-8">
        <span className="font-mono text-xs font-semibold tracking-widest text-[#888888] uppercase block">
          // CONTINUOUS TECH MATRIX
        </span>
      </div>

      {/* Row 1: Leftward Infinite Scroll */}
      <div className="flex overflow-hidden py-3 select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 shrink-0"
        >
          {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white border border-[#ECECEC] text-sm font-bold font-mono text-[#111111] shadow-2xs hover:border-black transition-colors"
            >
              <span className="p-1 rounded-full bg-[#FAFAFA] text-black">
                {ICON_MAP[item.icon] || <Code className="w-4 h-4" />}
              </span>
              <span>{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Rightward Infinite Scroll */}
      <div className="flex overflow-hidden py-3 select-none">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 shrink-0"
        >
          {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white border border-[#ECECEC] text-sm font-bold font-mono text-[#111111] shadow-2xs hover:border-black transition-colors"
            >
              <span className="p-1 rounded-full bg-[#FAFAFA] text-black">
                {ICON_MAP[item.icon] || <Code className="w-4 h-4" />}
              </span>
              <span>{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
