'use client';

import React, { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import LoadingScreen from '@/components/layout/LoadingScreen';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import AnimatedScrollBanner from '@/components/ui/AnimatedScrollBanner';
import TechStackMarquee from '@/components/sections/TechStackMarquee';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <>
      {/* 1. Animated Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* 2. Global Overlay & Controls */}
      <NoiseOverlay />
      <Cursor />
      <ScrollProgress />

      {/* 3. Main Site Container */}
      <main className="relative z-10 bg-white min-h-screen">
        <Navbar />
        <Hero isLoading={isLoading} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AnimatedScrollBanner />
        <Services />
        <TechStackMarquee />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
