import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that tracks window cursor (x, y) using requestAnimationFrame
 * for smooth 60fps performance and returns normalized coordinates ({ nx, ny })
 * ranging from -1 (left/top) to 1 (right/bottom), with (0,0) at viewport center.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
  });

  const latestCoords = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // Initialize center values
    if (typeof window !== 'undefined') {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      latestCoords.current = { x: centerX, y: centerY };
      setPosition({
        x: centerX,
        y: centerY,
        nx: 0,
        ny: 0,
      });
    }

    const updatePosition = () => {
      const { x, y } = latestCoords.current;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      // Map [0, w] -> [-1, 1] and [0, h] -> [-1, 1]
      const nx = Math.max(-1, Math.min(1, (x / w) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, (y / h) * 2 - 1));

      setPosition({
        x,
        y,
        nx,
        ny,
      });
      rafId.current = null;
    };

    const handleMouseMove = (e) => {
      latestCoords.current = { x: e.clientX, y: e.clientY };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        latestCoords.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (!rafId.current) {
          rafId.current = requestAnimationFrame(updatePosition);
        }
      }
    };

    // Mobile Gyroscope support via deviceorientation
    const handleDeviceOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      // gamma: [-30, 30] left/right -> [-1, 1]
      const clampedGamma = Math.max(-30, Math.min(30, e.gamma || 0));
      const nx = clampedGamma / 30;

      // beta: normalized around standard handheld viewing angle of ~45 deg
      const beta = e.beta || 45;
      const clampedBeta = Math.max(-25, Math.min(25, beta - 45));
      const ny = clampedBeta / 25;

      const x = ((nx + 1) / 2) * w;
      const y = ((ny + 1) / 2) * h;

      latestCoords.current = { x, y };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return position;
}
