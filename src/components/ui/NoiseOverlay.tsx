'use client';

export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[99] opacity-[0.035] mix-blend-overlay">
      <svg className="h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
