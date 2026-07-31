'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { Globe, Palette, ArrowRight, Check, Zap, Layers } from 'lucide-react';

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const serviceCards = [
    {
      id: 'graphic-design',
      number: '01',
      title: 'Graphic Poster & Thumbnail Design',
      subtitle: 'Social Media, YouTube & Sports Artwork',
      description: 'Eye-catching graphic posters, social media banners, YouTube thumbnails, football & sports graphics, and digital promotional assets crafted with Adobe Photoshop.',
      deliverables: ['Social Media Posters', 'YouTube Thumbnails', 'Football / Sports Graphics', 'Digital Ad Creatives'],
      icon: Palette,
      tag: 'VISUAL MEDIA',
    },
    {
      id: 'web-development',
      number: '02',
      title: 'Web Software Development',
      subtitle: 'Modern Clean Web Applications',
      description: 'Building high-performance, fast, and responsive websites and web applications using HTML5, CSS3, JavaScript, Java, and modern web technologies.',
      deliverables: ['Responsive Web Apps', 'Clean Code Architecture', 'UI Integration', 'Database Connectivity'],
      icon: Globe,
      tag: 'DEVELOPMENT',
    },
  ];

  return (
    <section ref={containerRef} id="services" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111] relative">
      <SectionHeader
        number="05"
        title="SERVICES & OFFERINGS"
        subtitle="WHAT I CAN CREATE FOR YOU"
      />

      {/* Sticky Progress Indicator Sub-Bar */}
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] font-mono text-xs text-[#666666]">
        <div className="flex items-center gap-2 font-bold text-black uppercase tracking-wider">
          <Zap className="w-4 h-4 text-black animate-pulse" />
          <span>SCROLL TO EXPLORE SERVICES & OFFERINGS</span>
        </div>
        <div className="flex items-center gap-2">
          {serviceCards.map((service, idx) => (
            <a
              key={service.id}
              href={`#service-${service.id}`}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#ECECEC] text-[#111111] font-bold hover:bg-black hover:text-white transition-all text-xs"
            >
              0{idx + 1}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll-Driven Parallax Stacking Cards Container */}
      <div className="space-y-8 sm:space-y-12">
        {serviceCards.map((service, idx) => {
          const IconComp = service.icon;

          return (
            <motion.div
              id={`service-${service.id}`}
              key={service.id}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-50px', amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-10 hover:bg-white hover:border-black/40 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Subtle top accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Background watermark number */}
              <div className="absolute -bottom-6 -right-4 font-mono font-black text-8xl text-black/[0.03] select-none pointer-events-none group-hover:text-black/[0.06] transition-colors">
                {service.number}
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Info Column (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-white border border-[#ECECEC] text-[#111111] shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-7 h-7 text-current transition-colors" />
                    </div>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#ECECEC] text-[#888888] group-hover:text-black group-hover:border-black/30 transition-colors">
                      {service.tag}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-bold text-[#888888] block mb-1">
                      [ SERVICE {service.number} ]
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight group-hover:text-black transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[#666666] mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-mono text-xs font-bold hover:bg-[#333333] transition-colors group-hover:shadow-md"
                      data-cursor="INQUIRE"
                    >
                      <span>START A PROJECT</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right Deliverables Column (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ECECEC] p-6 sm:p-8 space-y-4 group-hover:border-black/20 transition-colors shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#ECECEC]">
                    <span className="font-mono text-xs font-bold text-[#888888] uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-black" />
                      <span>KEY DELIVERABLES & CAPABILITIES</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#888888] bg-[#FAFAFA] px-2.5 py-1 rounded-full border border-[#ECECEC]">
                      4 ITEMS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.deliverables.map((item, dIdx) => (
                      <motion.div
                        key={dIdx}
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAFAFA] border border-[#ECECEC] text-xs font-semibold text-[#111111] hover:bg-white hover:border-black/30 hover:shadow-sm transition-all"
                      >
                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="truncate">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
