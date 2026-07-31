'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];

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
            setTimeout(onComplete, 500);
          }, 100);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 12) + 8);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-white text-[#111111] select-none overflow-hidden p-8 md:p-16"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between font-mono text-xs text-[#888888] tracking-widest uppercase">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              KT ANITIN
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              © 2026
            </motion.span>
          </div>

          {/* PORTFOLIO Letter Formation */}
          <div className="flex flex-col items-center justify-center my-auto w-full">
            <div className="flex items-center text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#111111] select-none">
              {LETTERS.map((char, index) => {
                const threshold = (index / LETTERS.length) * 85;
                const revealed = progress >= threshold;
                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{
                      opacity: revealed ? 1 : 0,
                      y: revealed ? 0 : 14,
                      filter: revealed ? 'blur(0px)' : 'blur(6px)',
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: progress >= 50 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 font-mono text-xs tracking-[0.3em] text-[#888888] uppercase"
            >
              DEVELOPMENT &amp; GRAPHIC DESIGN
            </motion.p>
          </div>

          {/* Bottom Progress */}
          <div className="flex items-end justify-between border-t border-[#ECECEC] pt-6">
            <span className="font-mono text-xs text-[#888888] tracking-widest uppercase">LOADING</span>
            <div className="text-5xl sm:text-7xl font-black font-mono tracking-tighter text-[#111111]">
              {progress}<span className="text-2xl sm:text-4xl text-[#888888] font-normal">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
