'use client';

import React, { useEffect, useRef } from 'react';

// Refined Minimalist Soft Grey Palette (Clean & Non-Messy)
const COLOR_STOPS = [
  { pos: 0.00, r: 180, g: 180, b: 180 }, // Light Soft Grey (#B4B4B4)
  { pos: 0.35, r: 140, g: 140, b: 140 }, // Medium Muted Grey (#8C8C8C)
  { pos: 0.70, r: 100, g: 100, b: 100 }, // Charcoal Slate (#646464)
  { pos: 1.00, r: 60,  g: 60,  b: 60  }, // Soft Dark Grey (#3C3C3C)
];

function getSoftGreyColor(nx: number) {
  let t = Math.max(0, Math.min(1, nx));
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const s1 = COLOR_STOPS[i];
    const s2 = COLOR_STOPS[i + 1];
    if (t >= s1.pos && t <= s2.pos) {
      const factor = (t - s1.pos) / (s2.pos - s1.pos);
      const r = Math.round(s1.r + (s2.r - s1.r) * factor);
      const g = Math.round(s1.g + (s2.g - s1.g) * factor);
      const b = Math.round(s1.b + (s2.b - s1.b) * factor);
      return { r, g, b };
    }
  }
  return { r: 120, g: 120, b: 120 };
}

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
    let mouseVx = 0;
    let mouseVy = 0;
    let mouseSpeed = 0;

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
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
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
      angle: number;
      currR: number;
      currG: number;
      currB: number;
      targetR: number;
      targetG: number;
      targetB: number;
      phase: number;
    }[] = [];

    const initGrid = () => {
      dots = [];
      const density = 48; // Clean, spacious grid alignment
      const cols = Math.ceil(width / density) + 4;
      const rows = Math.ceil(height / density) + 4;

      for (let r = -2; r < rows; r++) {
        for (let c = -2; c < cols; c++) {
          const x = c * density + (r % 2 === 0 ? 0 : density * 0.5);
          const y = r * density;
          const nx = Math.max(0, Math.min(1, x / width));
          const targetColor = getSoftGreyColor(nx);

          dots.push({
            origX: x,
            origY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            angle: 0,
            currR: targetColor.r,
            currG: targetColor.g,
            currB: targetColor.b,
            targetR: targetColor.r,
            targetG: targetColor.g,
            targetB: targetColor.b,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    handleResize();

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse velocity tracking
      const deltaX = targetMouseX - prevMouseX;
      const deltaY = targetMouseY - prevMouseY;
      mouseVx += (deltaX - mouseVx) * 0.04;
      mouseVy += (deltaY - mouseVy) * 0.04;
      mouseSpeed = Math.hypot(mouseVx, mouseVy);

      prevMouseX = targetMouseX;
      prevMouseY = targetMouseY;

      // ULTRA-SMOOTH ELEGANT MOUSE TRACKING
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // SOME BIGGER ACTIVE RADIUS (Soft, non-messy, elegant float)
      const speedExpansion = Math.min(140, mouseSpeed * 2.0);
      const staticBreathing = Math.sin(time * 1.4) * 30;

      const activeRadius = 520 + speedExpansion + staticBreathing;
      const innerRadius = 135 + Math.sin(time * 1.4) * 10;

      dots.forEach((dot) => {
        // CONTINUOUS ORGANIC FLOATING DRIFT OSCILLATION
        const liquidOscillationX = Math.sin(time * 1.0 + dot.origY * 0.01 + dot.phase) * 7.0;
        const liquidOscillationY = Math.cos(time * 1.0 + dot.origX * 0.01 + dot.phase) * 7.0;

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distToMouse = Math.hypot(dx, dy);

        let forceX = 0;
        let forceY = 0;
        let targetAngle = 0;
        let dashLength = 0;
        let dashWidth = 0;
        let alpha = 0;

        if (distToMouse < activeRadius) {
          const angleToMouse = Math.atan2(dy, dx);
          targetAngle = angleToMouse;

          // Smooth bell-curve opacity falloff for soft edges
          const outerProximity = 1 - distToMouse / activeRadius;
          const fadeAlpha = Math.sin(outerProximity * Math.PI * 0.5);

          if (distToMouse < innerRadius) {
            // --- INNER RADIUS ZONE (Micro-dots) ---
            const innerRatio = Math.max(0, distToMouse / innerRadius);
            dashLength = 1.2 + Math.pow(innerRatio, 1.6) * 2.5;
            dashWidth = 1.2 + Math.pow(innerRatio, 1.6) * 1.0;
            alpha = Math.pow(innerRatio, 1.5) * 0.55 * fadeAlpha;

            const pushForce = -(innerRadius - distToMouse) * 0.10;
            forceX = Math.cos(angleToMouse) * pushForce + liquidOscillationX;
            forceY = Math.sin(angleToMouse) * pushForce + liquidOscillationY;

            dot.targetR = 150;
            dot.targetG = 150;
            dot.targetB = 150;
          } else {
            // --- MID TO OUTER RADIUS ZONE ---
            const normDist = (distToMouse - innerRadius) / (activeRadius - innerRadius);
            const liquidWave = Math.sin(normDist * Math.PI);

            // SILKY FLOATING RIPPLE DRIFT
            const liquidFloat = Math.sin(normDist * Math.PI * 2 - time * 1.8 + dot.phase * 0.8) * 12 * liquidWave;
            forceX = Math.cos(angleToMouse) * (liquidFloat - liquidWave * 10.0) + liquidOscillationX;
            forceY = Math.sin(angleToMouse) * (liquidFloat - liquidWave * 10.0) + liquidOscillationY;

            // Sleek, refined dash dimensions
            dashLength = 3.5 + liquidWave * 3.5;
            dashWidth = 1.8 + liquidWave * 0.5;
            alpha = Math.pow(liquidWave, 0.5) * 0.65 * fadeAlpha;

            const nx = Math.max(0, Math.min(1, dot.origX / width));
            const softColor = getSoftGreyColor(nx);
            dot.targetR = softColor.r;
            dot.targetG = softColor.g;
            dot.targetB = softColor.b;
          }
        } else {
          // FAR AWAY: STRICTLY 0% OPACITY (Clean background)
          alpha = 0;
          dashLength = 0;
          dashWidth = 0;
        }

        // ULTRA-SMOOTH COLOR & ROTATION LERP
        dot.currR += (dot.targetR - dot.currR) * 0.03;
        dot.currG += (dot.targetG - dot.currG) * 0.03;
        dot.currB += (dot.targetB - dot.currB) * 0.03;

        let diffAngle = targetAngle - dot.angle;
        while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;
        while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
        dot.angle += diffAngle * 0.04;

        // VISCOUS WEIGHTLESS LIQUID PHYSICS
        dot.vx += (dot.origX + forceX - dot.x) * 0.016;
        dot.vy += (dot.origY + forceY - dot.y) * 0.016;
        dot.vx *= 0.93;
        dot.vy *= 0.93;

        dot.x += dot.vx;
        dot.y += dot.vy;

        if (alpha <= 0.005 || dashLength < 0.3) return;

        // Render Oriented Floating Liquid Dash / Pill
        ctx.save();
        ctx.translate(dot.x, dot.y);
        ctx.rotate(dot.angle);

        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(-dashLength / 2, -dashWidth / 2, dashLength, dashWidth, dashWidth / 2);
        } else {
          ctx.ellipse(0, 0, dashLength / 2, dashWidth / 2, 0, 0, Math.PI * 2);
        }

        const r = Math.round(dot.currR);
        const g = Math.round(dot.currG);
        const b = Math.round(dot.currB);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        ctx.restore();
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





