'use client';

import React, { useEffect, useRef } from 'react';

export default function InteractiveDotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let mouseX = -2000;
    let mouseY = -2000;
    let targetMouseX = -2000;
    let targetMouseY = -2000;
    let prevMouseX = -2000;
    let prevMouseY = -2000;
    let mouseVelocity = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = canvas.parentElement.clientHeight + 160;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initGrid();
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('resize', handleResize);

    let dots: {
      origX: number;
      origY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      phase: number;
    }[] = [];

    const initGrid = () => {
      dots = [];
      const density = 56; // Increased spacing for wide, spacious aesthetic
      const cols = Math.ceil(width / density) + 4;
      const rows = Math.ceil(height / density) + 4;

      for (let r = -2; r < rows; r++) {
        for (let c = -2; c < cols; c++) {
          const x = c * density;
          const y = r * density;
          dots.push({
            origX: x,
            origY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    handleResize();

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Butter-smooth mouse velocity & position lerping
      const distDelta = Math.hypot(targetMouseX - prevMouseX, targetMouseY - prevMouseY);
      mouseVelocity += (distDelta - mouseVelocity) * 0.15;
      prevMouseX = targetMouseX;
      prevMouseY = targetMouseY;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const activeRadius = 260 + Math.min(90, mouseVelocity * 1.6);

      dots.forEach((dot) => {
        // Soft organic floating surface wave
        const waveX = Math.sin(time + dot.origY * 0.008 + dot.phase) * 2;
        const waveY = Math.cos(time + dot.origX * 0.008 + dot.phase) * 2;

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distToMouse = Math.hypot(dx, dy);

        let forceX = 0;
        let forceY = 0;

        let dotAlpha = 0;
        let radiusY = 1.1;
        let stretchLength = 1.1;
        let angle = 0;

        if (distToMouse < activeRadius) {
          const proximity = 1 - distToMouse / activeRadius;
          angle = Math.atan2(dy, dx);

          // Viscous Liquid Ripple Force
          const liquidWave = Math.sin(proximity * Math.PI * 0.85);
          const flowSpeedFactor = 0.35 + Math.min(0.5, mouseVelocity * 0.02);
          const forceMagnitude = liquidWave * activeRadius * 0.22 * flowSpeedFactor;

          forceX = Math.cos(angle) * forceMagnitude;
          forceY = Math.sin(angle) * forceMagnitude;

          // Fade in to solid jet black smoothly
          dotAlpha = Math.pow(proximity, 1.2);

          // Liquid drop elongation
          radiusY = 1.1 + proximity * 0.9;
          stretchLength = radiusY + liquidWave * (5.0 + Math.min(5, mouseVelocity * 0.1));
        }

        // Viscous Fluid Spring Physics
        dot.vx += (dot.origX + waveX + forceX - dot.x) * 0.06;
        dot.vy += (dot.origY + waveY + forceY - dot.y) * 0.06;
        dot.vx *= 0.88;
        dot.vy *= 0.88;

        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dotAlpha > 0.005) {
          ctx.beginPath();
          ctx.ellipse(dot.x, dot.y, stretchLength, radiusY, angle, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${dotAlpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-1/2 -translate-x-1/2 -top-20 w-screen h-[calc(100%+10rem)] pointer-events-none bg-transparent z-0"
    />
  );
}
