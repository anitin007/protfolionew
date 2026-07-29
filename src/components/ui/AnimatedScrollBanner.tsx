'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AnimatedScrollBanner() {
  return (
    <div className="py-12 my-12 border-y border-[#ECECEC] bg-[#FAFAFA] overflow-hidden select-none">
      {/* Hardware accelerated CSS marquee Row 1 */}
      <div className="flex whitespace-nowrap gap-8 mb-4 animate-marquee font-extrabold tracking-tighter text-3xl sm:text-5xl md:text-6xl text-[#111111] uppercase">
        <div className="flex items-center gap-6">
          <span>GRAPHIC POSTERS</span>
          <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 text-black shrink-0" />
          <span>CREATIVE DIRECTION</span>
          <span className="w-3 h-3 rounded-full bg-black shrink-0" />
          <span>FULL STACK DEVELOPMENT</span>
          <ArrowRight className="w-6 h-6 sm:w-10 sm:h-10 text-black shrink-0" />
          <span>SOCIAL MEDIA GRAPHICS</span>
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
        </div>
        <div className="flex items-center gap-6" aria-hidden="true">
          <span>GRAPHIC POSTERS</span>
          <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 text-black shrink-0" />
          <span>CREATIVE DIRECTION</span>
          <span className="w-3 h-3 rounded-full bg-black shrink-0" />
          <span>FULL STACK DEVELOPMENT</span>
          <ArrowRight className="w-6 h-6 sm:w-10 sm:h-10 text-black shrink-0" />
          <span>SOCIAL MEDIA GRAPHICS</span>
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
        </div>
      </div>
    </div>
  );
}
