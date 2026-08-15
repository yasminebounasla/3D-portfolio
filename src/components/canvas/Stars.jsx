import React, { useEffect, useRef } from "react";
import { rotateX, rotateY, project } from "../../utils/wireframe3d";

// Champ d'étoiles en Canvas 2D — remplace l'ancien champ de points
// Three.js/WebGL. Points générés une fois dans une sphère, tournent
// lentement, projetés en 2D à chaque frame.
const STAR_COUNT = 500;
const stars = Array.from({ length: STAR_COUNT }, () => {
  // point aléatoire dans une sphère (pas juste sur la surface)
  const u = Math.random(), v = Math.random(), r = Math.cbrt(Math.random());
  const theta = u * Math.PI * 2;
  const phi = Math.acos(2 * v - 1);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
});

const StarsCanvas = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const rot = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;
      sizeRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    ro.observe(canvas.parentElement);

    const draw = () => {
      const { width, height } = sizeRef.current;
      if (width > 0 && height > 0) {
        rot.current.x += 0.0009;
        rot.current.y += 0.0006;

        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) * 0.9;

        for (const s of stars) {
          let p = rotateY(s, rot.current.y);
          p = rotateX(p, rot.current.x);
          const proj = project(p, { cx, cy, scale, camZ: 2.2, focal: 2.2 });
          if (proj.x < -20 || proj.x > width + 20 || proj.y < -20 || proj.y > height + 20) continue;
          const r = 0.25 + proj.depth * 0.45;
          ctx.fillStyle = `rgba(255,255,255,${0.2 + proj.depth * 0.45})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default StarsCanvas;