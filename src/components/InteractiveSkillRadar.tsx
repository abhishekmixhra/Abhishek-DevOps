import React, { useEffect, useRef, useState } from 'react';

interface SkillData {
  name: string;
  value: number;
  color: string;
  category: string;
}

interface RadarChartProps {
  skills: SkillData[];
  size?: number;
}

const InteractiveSkillRadar: React.FC<RadarChartProps> = ({ 
  skills, 
  size = 300 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number>();

  const center = size / 2;
  const maxRadius = size * 0.35;
  const levels = 5;

  const getPointPosition = (index: number, value: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = (value / 100) * maxRadius * animationProgress;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
      angle: angle * (180 / Math.PI)
    };
  };

  const drawRadar = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, size, size);

    // Draw concentric circles and grid lines
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
    ctx.lineWidth = 1;

    for (let level = 1; level <= levels; level++) {
      const radius = (level / levels) * maxRadius;
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // Draw level labels
      ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${level * 20}`, center, center - radius - 5);
    }

    // Draw radial lines
    skills.forEach((_, index) => {
      const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
      const endX = center + Math.cos(angle) * maxRadius;
      const endY = center + Math.sin(angle) * maxRadius;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });

    // Draw skill labels
    ctx.fillStyle = 'rgba(229, 231, 235, 0.9)';
    ctx.font = '12px Inter';
    skills.forEach((skill, index) => {
      const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
      const labelRadius = maxRadius + 25;
      const labelX = center + Math.cos(angle) * labelRadius;
      const labelY = center + Math.sin(angle) * labelRadius;

      ctx.textAlign = labelX > center ? 'left' : 'right';
      ctx.textBaseline = 'middle';
      
      // Highlight hovered skill
      if (hoveredSkill?.name === skill.name) {
        ctx.fillStyle = skill.color;
        ctx.font = 'bold 14px Inter';
      } else {
        ctx.fillStyle = 'rgba(229, 231, 235, 0.9)';
        ctx.font = '12px Inter';
      }
      
      ctx.fillText(skill.name, labelX, labelY);
    });

    // Draw skill area
    if (animationProgress > 0) {
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, maxRadius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();

      skills.forEach((skill, index) => {
        const point = getPointPosition(index, skill.value, skills.length);
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw skill points
      skills.forEach((skill, index) => {
        const point = getPointPosition(index, skill.value, skills.length);
        
        // Point shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(point.x + 1, point.y + 1, 6, 0, 2 * Math.PI);
        ctx.fill();

        // Point
        const isHovered = hoveredSkill?.name === skill.name;
        ctx.fillStyle = skill.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, isHovered ? 8 : 5, 0, 2 * Math.PI);
        ctx.fill();

        // Point border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow effect for hovered point
        if (isHovered) {
          ctx.shadowColor = skill.color;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setMousePosition({ x: e.clientX, y: e.clientY });

    // Check if mouse is over a skill point
    let foundSkill: SkillData | null = null;

    skills.forEach((skill, index) => {
      const point = getPointPosition(index, skill.value, skills.length);
      const distance = Math.sqrt(
        Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2)
      );

      if (distance <= 12) {
        foundSkill = skill;
      }
    });

    setHoveredSkill(foundSkill);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  const animate = () => {
    setAnimationProgress(prev => {
      if (prev < 1) {
        return Math.min(prev + 0.02, 1);
      }
      return prev;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawRadar(ctx);
  }, [skills, hoveredSkill, animationProgress]);

  useEffect(() => {
    if (animationProgress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationProgress]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Tooltip */}
      {hoveredSkill && (
        <div
          className="fixed z-50 bg-gray-900 text-white p-3 rounded-lg shadow-2xl border border-gray-700 pointer-events-none transition-opacity duration-200"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 50,
            transform: mousePosition.x > window.innerWidth - 200 ? 'translateX(-100%)' : 'none'
          }}
        >
          <div className="font-semibold text-sm text-gray-100">{hoveredSkill.name}</div>
          <div className="text-xs text-gray-400 mb-2">{hoveredSkill.category}</div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${hoveredSkill.value}%`,
                  backgroundColor: hoveredSkill.color
                }}
              />
            </div>
            <span className="text-sm font-mono" style={{ color: hoveredSkill.color }}>
              {hoveredSkill.value}%
            </span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${
              hoveredSkill?.name === skill.name
                ? 'bg-gray-800/50 scale-105'
                : 'hover:bg-gray-800/30'
            }`}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
            <span className="ml-auto text-xs font-mono text-gray-400">
              {skill.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSkillRadar;