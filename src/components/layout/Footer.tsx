'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#ECECEC] bg-white py-12 px-6 sm:px-12 text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#666666]">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="font-bold text-[#111111] text-sm">K T ANITIN</span>
          <span className="hidden sm:inline text-[#ECECEC]">•</span>
          <span>DESIGNED & DEVELOPED WITH MINIMALIST PRECISION</span>
          <span className="hidden sm:inline text-[#ECECEC]">•</span>
          <span>© 2026</span>
        </div>

        {/* Center: Live Time */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-[#111111]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ERNAKULAM, IN — {timeString || 'IST'}</span>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer group"
          data-cursor="TOP"
        >
          <span className="uppercase tracking-widest">BACK TO TOP</span>
          <span className="p-2 rounded-full border border-[#ECECEC] bg-[#FAFAFA] group-hover:-translate-y-1 transition-transform">
            <ArrowUp className="w-3.5 h-3.5 text-black" />
          </span>
        </button>
      </div>
    </footer>
  );
}
