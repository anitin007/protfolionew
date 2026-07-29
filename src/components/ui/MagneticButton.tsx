'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  cursorText?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  cursorText = 'CLICK',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none cursor-pointer text-sm md:text-base px-6 py-3 md:px-8 md:py-4';

  const variantStyles = {
    primary: 'bg-[#111111] text-white hover:bg-black shadow-md hover:shadow-xl border border-black',
    secondary: 'bg-[#FAFAFA] text-[#111111] border border-[#ECECEC] hover:bg-[#F3F3F3] hover:border-black/20',
    outline: 'bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white',
    ghost: 'bg-transparent text-[#111111] hover:bg-[#F3F3F3]',
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      data-cursor={cursorText}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
