'use client';

import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { Globe, Palette, Sparkles, ArrowRight, Check } from 'lucide-react';
import { FigmaIcon } from '../ui/Icons';

export default function Services() {
  const serviceCards = [
    {
      id: 'graphic-design',
      number: '01',
      title: 'Graphic Poster & Thumbnail Design',
      subtitle: 'Social Media, YouTube & Sports Artwork',
      description: 'Eye-catching graphic posters, social media banners, YouTube thumbnails, football & sports graphics, and digital promotional assets crafted with Adobe Photoshop.',
      deliverables: ['Social Media Posters', 'YouTube Thumbnails', 'Football / Sports Graphics', 'Digital Ad Creatives'],
      icon: Palette,
    },
    {
      id: 'web-development',
      number: '02',
      title: 'Web Software Development',
      subtitle: 'Modern Clean Web Applications',
      description: 'Building high-performance, fast, and responsive websites and web applications using HTML5, CSS3, JavaScript, Java, and modern web technologies.',
      deliverables: ['Responsive Web Apps', 'Clean Code Architecture', 'UI Integration', 'Database Connectivity'],
      icon: Globe,
    },
    {
      id: 'ui-ux-design',
      number: '03',
      title: 'UI/UX & Visual Prototyping',
      subtitle: 'User-Centric Digital Interfaces',
      description: 'Designing elegant user interfaces, wireframes, and interactive visual prototypes in Figma with pixel-perfect precision and minimal Apple/Linear aesthetic.',
      deliverables: ['Figma UI Prototypes', 'Wireframing', 'Design Systems', 'User Centric Layouts'],
      icon: FigmaIcon,
    },
    {
      id: 'branding-identity',
      number: '04',
      title: 'Branding & Visual Collateral',
      subtitle: 'Cohesive Identity & Media',
      description: 'Creating memorable visual brand assets, typographic guidelines, logos, vector elements, and graphic suites for personal and commercial projects.',
      deliverables: ['Logo & Brand Assets', 'Typography Systems', 'Marketing Collateral', 'Export Ready Vector Artwork'],
      icon: Sparkles,
    },
  ];

  return (
    <section id="services" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="05"
        title="SERVICES & OFFERINGS"
        subtitle="WHAT I CAN CREATE FOR YOU"
      />

      {/* Grid Cards Layout for Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceCards.map((service) => {
          const IconComp = service.icon;
          return (
            <div
              key={service.id}
              className="group relative rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-8 sm:p-10 hover:bg-white hover:border-black/30 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#ECECEC]">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#ECECEC] text-[#111111] shadow-2xs group-hover:bg-black group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6 text-current transition-colors" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#888888]">
                    [ {service.number} ]
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-extrabold text-[#111111] mb-1 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#666666] mb-4">
                  {service.subtitle}
                </p>
                <p className="text-sm text-[#666666] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Deliverables Pills */}
                <div className="space-y-2 mb-6">
                  <span className="font-mono text-[11px] text-[#888888] uppercase block">
                    DELIVERABLES INCLUDE
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#ECECEC] text-xs font-medium text-[#111111]"
                      >
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-[#ECECEC] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#111111] hover:translate-x-1 transition-transform"
                  data-cursor="INQUIRE"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] font-mono text-[#888888]">
                  CUSTOM INQUIRY
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
