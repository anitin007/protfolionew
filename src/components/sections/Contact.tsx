'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Mail, Phone, MapPin, Send, Copy, Check, ArrowUpRight, Download, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/Icons';
import MagneticButton from '../ui/MagneticButton';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto text-[#111111]">
      <SectionHeader
        number="08"
        title="LET'S BUILD SOMETHING AMAZING."
        subtitle="GET IN TOUCH"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Contact Info, Subtle Resume Button & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between space-y-8"
        >
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-normal">
              Have a project in mind, want to collaborate on software/design solutions, or hire me for your team? Send a message or get my resume below.
            </p>

            {/* Email Copy Card */}
            <div className="p-6 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] space-y-3">
              <span className="font-mono text-xs text-[#888888] uppercase block">
                PRIMARY EMAIL
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold text-[#111111] hover:underline truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-full bg-white border border-[#ECECEC] text-black hover:bg-black hover:text-white transition-colors shrink-0 cursor-pointer"
                  data-cursor="COPY"
                  aria-label="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Subtle Resume Access Card */}
            <div className="p-5 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#666666]" />
                <span className="text-xs font-mono font-semibold text-[#111111]">
                  RESUME / CV
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="K_T_Anitin_Resume.pdf"
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#ECECEC] text-xs font-mono font-semibold text-[#111111] hover:bg-black hover:text-white transition-colors flex items-center gap-1.5"
                  data-cursor="GET"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white border border-[#ECECEC] text-xs font-mono font-semibold text-[#666666] hover:text-black transition-colors flex items-center gap-1"
                  data-cursor="VIEW"
                >
                  <span>View</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Contact Grid Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC]">
                <span className="font-mono text-[11px] text-[#888888] uppercase block mb-1">
                  PHONE / WHATSAPP
                </span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-bold text-[#111111]">
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#ECECEC]">
                <span className="font-mono text-[11px] text-[#888888] uppercase block mb-1">
                  LOCATION
                </span>
                <span className="text-sm font-bold text-[#111111]">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-6 border-t border-[#ECECEC]">
            <span className="font-mono text-xs text-[#888888] uppercase block">
              CONNECT ON SOCIALS
            </span>
            <div className="flex flex-wrap gap-3">
              <a
                href={PERSONAL_INFO.github || 'https://github.com/anitin007'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-xs font-mono font-bold text-[#111111] hover:bg-black hover:text-white transition-colors cursor-pointer"
                data-cursor="GITHUB"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin || 'https://linkedin.com/in/anitin-k-t'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-xs font-mono font-bold text-[#111111] hover:bg-black hover:text-white transition-colors cursor-pointer"
                data-cursor="LINKEDIN"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={PERSONAL_INFO.instagram || 'https://instagram.com/va.li.ant'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAFAFA] border border-[#ECECEC] text-xs font-mono font-bold text-[#111111] hover:bg-black hover:text-white transition-colors cursor-pointer"
                data-cursor="INSTAGRAM"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] p-8 sm:p-12 shadow-xs"
        >
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-[#666666] max-w-md">
                Thank you for reaching out. I will review your message and reply as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#111111] uppercase mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ECECEC] text-sm text-[#111111] focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#111111] uppercase mb-2">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ECECEC] text-sm text-[#111111] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#111111] uppercase mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Web Development / App Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ECECEC] text-sm text-[#111111] focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#111111] uppercase mb-2">
                  YOUR MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ECECEC] text-sm text-[#111111] focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <MagneticButton
                variant="primary"
                className="w-full py-4 text-sm font-bold tracking-wide uppercase"
                cursorText="SEND"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </MagneticButton>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
