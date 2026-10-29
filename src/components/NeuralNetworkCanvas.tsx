import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  color: string;
}

export const NeuralNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle colors representing neural activations
    const colors = [
      'rgba(59, 130, 246, 0.6)',  // blue-500
      'rgba(99, 102, 241, 0.6)',  // indigo-500
      'rgba(14, 165, 233, 0.6)',  // sky-500
      'rgba(168, 85, 247, 0.5)',  // purple-500
    ];

    // Responsive node count
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2 + 1.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const maxDistance = 140;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Subtle scroll parallax offset
      const parallaxY = (scrollY * 0.08) % height;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Effective position with parallax
        const effectiveY = (p.y - parallaxY + height) % height;

        // Mouse proximity interaction
        const dxMouse = mouseX - p.x;
        const dyMouse = mouseY - effectiveY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 160) {
          const force = (1 - distMouse / 160) * 0.8;
          p.x += (dxMouse / distMouse) * force;
          p.y += (dyMouse / distMouse) * force;
        }

        // Pulse radius
        p.pulsePhase += 0.02;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.8;

        // Connect lines (synapses)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const effectiveY2 = (p2.y - parallaxY + height) % height;
          const dx = p.x - p2.x;
          const dy = effectiveY - effectiveY2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, effectiveY);
            ctx.lineTo(p2.x, effectiveY2);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Occasional neural transmission pulse along the line
            if (Math.sin(time * 0.003 + i + j) > 0.97) {
              const signalProgress = (Math.sin(time * 0.004 + i) + 1) / 2;
              const sx = p.x + (p2.x - p.x) * signalProgress;
              const sy = effectiveY + (effectiveY2 - effectiveY) * signalProgress;
              ctx.beginPath();
              ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
              ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
              ctx.shadowBlur = 6;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, effectiveY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{ willChange: 'transform' }}
    />
  );
};
