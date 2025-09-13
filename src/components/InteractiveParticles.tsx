import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  opacity: number;
}

interface MouseTrail {
  x: number;
  y: number;
  life: number;
}

const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouseTrail = useRef<MouseTrail[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);

  const colors = [
    '#3b82f6', // blue
    '#10b981', // emerald
    '#8b5cf6', // purple
    '#f59e0b', // amber
    '#ef4444', // red
    '#06b6d4', // cyan
  ];

  const createParticle = (x: number, y: number): Particle => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 0,
    maxLife: Math.random() * 60 + 30,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.3,
  });

  const createMouseTrail = (x: number, y: number): MouseTrail => ({
    x,
    y,
    life: 20,
  });

  const updateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particles.current = particles.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Add slight attraction to mouse
      const dx = mousePosition.current.x - particle.x;
      const dy = mousePosition.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        particle.vx += (dx / distance) * force * 0.1;
        particle.vy += (dy / distance) * force * 0.1;
      }

      return particle.life < particle.maxLife;
    });

    // Update mouse trail
    mouseTrail.current = mouseTrail.current.filter(trail => {
      trail.life--;
      return trail.life > 0;
    });
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw mouse trail
    mouseTrail.current.forEach((trail) => {
      const opacity = trail.life / 20;
      const radius = (20 - trail.life) * 2;
      
      const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, radius);
      gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw particles
    particles.current.forEach(particle => {
      const life = particle.life / particle.maxLife;
      const opacity = particle.opacity * (1 - life);
      
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = particle.color;
      
      // Add glow effect
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size * 2;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });

    // Draw connections between nearby particles (spider-like effect)
    particles.current.forEach((particle, i) => {
      particles.current.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.2;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });
  };

  const animate = () => {
    updateParticles();
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mousePosition.current = { x, y };
    
    // Add mouse trail
    mouseTrail.current.push(createMouseTrail(x, y));
    if (mouseTrail.current.length > 10) {
      mouseTrail.current.shift();
    }

    // Create particles at mouse position occasionally
    if (Math.random() < 0.3) {
      particles.current.push(createParticle(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20));
    }
  };

  const handleClick = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create burst of particles on click
    for (let i = 0; i < 15; i++) {
      particles.current.push(createParticle(
        x + (Math.random() - 0.5) * 50,
        y + (Math.random() - 0.5) * 50
      ));
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    setIsVisible(true);

    // Add initial particles
    for (let i = 0; i < 30; i++) {
      particles.current.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-10"
      style={{
        background: 'transparent',
      }}
    />
  );
};

export default InteractiveParticles;