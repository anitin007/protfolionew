'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        const diff = Math.floor(Math.random() * 12) + 5;
        return Math.min(100, prev + diff);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-white p-8 md:p-16 text-[#111111] select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between font-mono text-xs text-[#666666] tracking-widest uppercase">
            <span>PORTFOLIO</span>
            <span>© 2026</span>
          </div>

          {/* Center Text Animation */}
          <div className="flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[#111111] uppercase"
            >
              PORTFOLIO
            </motion.h1>
          </div>

          {/* Bottom Counter Bar */}
          <div className="flex items-end justify-between border-t border-[#ECECEC] pt-6">
            <span className="font-mono text-xs text-[#888888]">INITIALIZING EXPERIENCE...</span>
            <div className="text-6xl sm:text-8xl font-bold font-mono tracking-tighter text-[#111111]">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
