'use client';

import React, { useEffect, useRef } from 'react';

export default function GeometricCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Geometry Points for an Abstract Floating Wireframe Icosahedron & Ring
    class Point3D {
      x: number;
      y: number;
      z: number;
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }

    // Create Golden Ratio Icosahedron Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const radius = Math.min(width, height) * 0.18;

    const baseVertices: Point3D[] = [
      new Point3D(-1, phi, 0), new Point3D(1, phi, 0), new Point3D(-1, -phi, 0), new Point3D(1, -phi, 0),
      new Point3D(0, -1, phi), new Point3D(0, 1, phi), new Point3D(0, -1, -phi), new Point3D(0, 1, -phi),
      new Point3D(phi, 0, -1), new Point3D(phi, 0, 1), new Point3D(-phi, 0, -1), new Point3D(-phi, 0, 1)
    ].map(v => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return new Point3D((v.x / len) * radius, (v.y / len) * radius, (v.z / len) * radius);
    });

    // Edges connecting vertices
    const edges: [number, number][] = [];
    for (let i = 0; i < baseVertices.length; i++) {
      for (let j = i + 1; j < baseVertices.length; j++) {
        const dx = baseVertices[i].x - baseVertices[j].x;
        const dy = baseVertices[i].y - baseVertices[j].y;
        const dz = baseVertices[i].z - baseVertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - (radius * 1.05)) < radius * 0.2) {
          edges.push([i, j]);
        }
      }
    }

    // Floating outer orbit ring points
    const ringPoints: Point3D[] = [];
    const numRingPoints = 32;
    const ringRadius = radius * 1.55;
    for (let i = 0; i < numRingPoints; i++) {
      const angle = (i / numRingPoints) * Math.PI * 2;
      ringPoints.push(new Point3D(Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius, 0));
    }

    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const normX = (mouseX / width - 0.5) * 2;
      const normY = (mouseY / height - 0.5) * 2;

      rotX += 0.004 + normY * 0.002;
      rotY += 0.006 + normX * 0.002;
      rotZ += 0.002;

      const centerX = width / 2 + normX * 25;
      const centerY = height / 2 + normY * 25;

      // Project 3D point to 2D
      const project = (p: Point3D) => {
        // Rotate Y
        let x1 = p.x * Math.cos(rotY) + p.z * Math.sin(rotY);
        let y1 = p.y;
        let z1 = -p.x * Math.sin(rotY) + p.z * Math.cos(rotY);

        // Rotate X
        let x2 = x1;
        let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Rotate Z
        let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
        let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
        let z3 = z2;

        const fov = 400;
        const scale = fov / (fov + z3 + 100);
        return {
          x: centerX + x3 * scale,
          y: centerY + y3 * scale,
          z: z3,
          scale
        };
      };

      // Draw outer orbit ring
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.08)';
      ctx.lineWidth = 1;
      const projectedRing = ringPoints.map(p => project(p));
      for (let i = 0; i < projectedRing.length; i++) {
        const p1 = projectedRing[i];
        const p2 = projectedRing[(i + 1) % projectedRing.length];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // Project vertices
      const projected = baseVertices.map(v => project(v));

      // Draw Edges with depth gradient
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.04, Math.min(0.35, 0.2 + (avgZ / radius) * 0.15));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(17, 17, 17, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw vertex nodes
      projected.forEach(p => {
        const nodeAlpha = Math.max(0.1, Math.min(0.6, 0.3 + (p.z / radius) * 0.2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.5, 3 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(17, 17, 17, ${nodeAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
