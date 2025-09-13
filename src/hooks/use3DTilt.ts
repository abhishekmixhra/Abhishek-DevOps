import { useEffect, useRef, useState } from 'react';

interface Tilt3DOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
  easing?: string;
}

interface Tilt3DState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glareOpacity: number;
  glarePosition: { x: number; y: number };
}

export const use3DTilt = (options: Tilt3DOptions = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 300,
    glare = true,
    maxGlare = 0.3,
    easing = 'cubic-bezier(0.03,0.98,0.52,0.99)'
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [tiltState, setTiltState] = useState<Tilt3DState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareOpacity: 0,
    glarePosition: { x: 50, y: 50 }
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTiltState({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        glareOpacity: 0,
        glarePosition: { x: 50, y: 50 }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Calculate glare position (percentage)
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      // Calculate glare opacity based on distance from center
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
      const glareOpacity = glare ? (1 - distanceFromCenter / maxDistance) * maxGlare : 0;

      setTiltState({
        rotateX,
        rotateY,
        scale,
        glareOpacity,
        glarePosition: { x: glareX, y: glareY }
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxTilt, scale, glare, maxGlare]);

  const tiltStyles = {
    transform: `perspective(${perspective}px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg) scale3d(${tiltState.scale}, ${tiltState.scale}, ${tiltState.scale})`,
    transition: isHovered ? 'none' : `all ${speed}ms ${easing}`,
    transformStyle: 'preserve-3d' as const,
  };

  const glareStyles = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle at ${tiltState.glarePosition.x}% ${tiltState.glarePosition.y}%, rgba(255,255,255,${tiltState.glareOpacity}) 0%, transparent 50%)`,
    pointerEvents: 'none' as const,
    borderRadius: 'inherit',
    transition: isHovered ? 'none' : `opacity ${speed}ms ${easing}`,
  };

  return {
    elementRef,
    tiltStyles,
    glareStyles,
    isHovered,
    tiltState
  };
};

export default use3DTilt;