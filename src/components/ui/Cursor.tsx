'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if target has data-cursor attribute
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor') || '';
        setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Small Precision Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-black"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Smooth Outer Follower Circle */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border border-black/30 bg-white/10 backdrop-blur-[2px] transition-colors duration-200"
        animate={{
          x: mousePosition.x - (isHovered ? (hoverText ? 36 : 24) : 18),
          y: mousePosition.y - (isHovered ? (hoverText ? 36 : 24) : 18),
          width: isHovered ? (hoverText ? 72 : 48) : 36,
          height: isHovered ? (hoverText ? 72 : 48) : 36,
          borderColor: isHovered ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.25)',
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {hoverText && (
          <span className="text-[10px] font-semibold tracking-widest text-black uppercase">
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  );
}
