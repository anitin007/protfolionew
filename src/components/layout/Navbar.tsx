'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-6 py-3.5 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/80 backdrop-blur-md border border-[#ECECEC] shadow-md'
              : 'bg-white/50 backdrop-blur-xs border border-transparent'
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="font-black tracking-tighter text-lg md:text-xl text-[#111111] uppercase select-none"
            data-cursor="HOME"
          >
            PORTFOLIO
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 font-mono text-xs font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                  data-cursor="NAV"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#FAFAFA] border border-[#ECECEC] rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label.toUpperCase()}
                </a>
              );
            })}
          </div>

          {/* CTA Right Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-mono font-semibold hover:bg-[#333333] transition-colors shadow-2xs"
              data-cursor="TALK"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-[#111111]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden text-[#111111]"
          >
            <div className="flex flex-col gap-6 font-mono text-xl font-bold">
              {NAV_ITEMS.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#ECECEC] pb-4"
                >
                  <span className="text-[#888888] text-sm">0{idx + 1}</span>
                  <span className="uppercase">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-[#ECECEC]">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-full bg-black text-white text-center font-mono text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>LET'S BUILD SOMETHING</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
