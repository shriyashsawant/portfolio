import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
}

const COLORS = ['#00ff88', '#00d4ff', '#ff00ff', '#ffdd00'];
const MAX_PARTICLES = 80;

export default function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const createParticle = useCallback((x: number, y: number, speed: number) => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = (Math.random() * 2 + 0.5) * Math.min(speed * 0.15, 3);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const maxLife = Math.random() * 40 + 20;

    return {
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - Math.random() * 0.5,
      life: maxLife,
      maxLife,
      size: Math.random() * 3 + 1,
      color,
      opacity: 1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate mouse speed
      const dx = mouseRef.current.x - prevMouseRef.current.x;
      const dy = mouseRef.current.y - prevMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles based on mouse movement speed
      if (speed > 2 && particlesRef.current.length < MAX_PARTICLES) {
        const count = Math.min(Math.floor(speed * 0.3), 4);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(
            createParticle(
              mouseRef.current.x + (Math.random() - 0.5) * 10,
              mouseRef.current.y + (Math.random() - 0.5) * 10,
              speed
            )
          );
        }
      }

      prevMouseRef.current = { ...mouseRef.current };

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.vx *= 0.98; // friction
        p.life -= 1;
        p.opacity = p.life / p.maxLife;

        if (p.life <= 0) return false;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.opacity * 0.8;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.opacity, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow trail
        ctx.globalAlpha = p.opacity * 0.3;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.opacity * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      // Draw connecting lines between close particles
      ctx.save();
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist < 60) {
            ctx.globalAlpha = (1 - dist / 60) * Math.min(a.opacity, b.opacity) * 0.2;
            ctx.strokeStyle = a.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[60] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
