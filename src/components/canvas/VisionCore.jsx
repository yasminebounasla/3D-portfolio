import React, { useEffect, useRef } from "react";
import { buildIcosahedron, rotateX, rotateY, project } from "../../utils/wireframe3d";

const ACCENT = "34, 211, 238";

const NODES = [
  [2.1, 1.0, 0.3],
  [-1.8, -0.8, 1.0],
  [1.1, -1.5, -1.2],
];

const { vertices, edges } = buildIcosahedron();

const VisionCoreCanvas = ({ dragRotation }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const autoY = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ResizeObserver : se déclenche dès que le parent a une vraie taille
    // (fiable même si le layout n'est pas encore posé au premier rendu,
    // contrairement à une simple lecture de clientWidth dans useEffect).
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
        autoY.current += 0.006;
        const rotY = autoY.current + (dragRotation?.current || 0);
        const rotX = 0.25;

        ctx.clearRect(0, 0, width, height);

        const cx = width * 0.65;
        const cy = height * 0.5;
        const scale = Math.min(width, height) * 0.3;

        const projected = vertices.map((v) => {
          let p = rotateY(v, rotY);
          p = rotateX(p, rotX);
          return project(p, { cx, cy, scale });
        });

        for (const [a, b] of edges) {
          const pa = projected[a], pb = projected[b];
          const depth = (pa.depth + pb.depth) / 2;
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.15 + depth * 0.55})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }

        [
          { ry: 0.35, rot: rotY * 0.6, alpha: 0.25, color: ACCENT, mult: 1.4 },
          { ry: 0.55, rot: -rotY * 0.4 + 0.6, alpha: 0.12, color: "255,255,255", mult: 1.6 },
        ].forEach(({ ry, rot, alpha, color, mult }) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(0, 0, scale * mult, scale * mult * ry, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        });

        NODES.forEach((n, i) => {
          let p = rotateY(n, rotY * 0.7 + i);
          p = rotateX(p, rotX);
          const proj = project(p, { cx, cy, scale });
          const size = 10 * proj.depth;
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.4 + proj.depth * 0.4})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(proj.x - size / 2, proj.y - size / 2, size, size);
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [dragRotation]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default VisionCoreCanvas;