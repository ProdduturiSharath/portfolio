import React, { useEffect, useRef, useState } from 'react';
import { useMotion } from './Motion';

const TAU = Math.PI * 2;
const normalize = vector => {
  const length = Math.hypot(...vector) || 1;
  return vector.map(value => value / length);
};
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// A true 3D trefoil tube, projected to canvas. No model downloads or WebGL dependency.
function createSculpture() {
  const rings = 180;
  const sides = 24;
  const vertices = [];
  const faces = [];
  for (let i = 0; i < rings; i++) {
    const t = i / rings * TAU;
    const radius = 1.65 + 0.56 * Math.cos(3 * t);
    const center = [radius * Math.cos(2 * t), radius * Math.sin(2 * t), 0.72 * Math.sin(3 * t)];
    const tangent = normalize([
      -1.68 * Math.sin(3 * t) * Math.cos(2 * t) - 2 * radius * Math.sin(2 * t),
      -1.68 * Math.sin(3 * t) * Math.sin(2 * t) + 2 * radius * Math.cos(2 * t),
      2.16 * Math.cos(3 * t),
    ]);
    const binormal = normalize(cross(tangent, [Math.cos(2 * t), Math.sin(2 * t), 0]));
    const normal = normalize(cross(binormal, tangent));
    for (let j = 0; j < sides; j++) {
      const angle = j / sides * TAU;
      const n = normal.map((value, k) => value * Math.cos(angle) + binormal[k] * Math.sin(angle));
      vertices.push({ position: center.map((value, k) => value + 0.42 * n[k]), normal: n });
      faces.push([i * sides + j, ((i + 1) % rings) * sides + j, ((i + 1) % rings) * sides + (j + 1) % sides, i * sides + (j + 1) % sides]);
    }
  }
  return { vertices, faces };
}

export default function NeuralSculpture() {
  const canvasRef = useRef(null);
  const angleRef = useRef(0);
  const { motionEnabled } = useMotion();
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    setCanvasReady(true);
    const { vertices, faces } = createSculpture();
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = true;
    let pointer = { x: 0, y: 0 };
    let eased = { x: 0, y: 0 };

    const draw = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.171;
      const rotate = ([x, y, z]) => {
        const ax = 0.48 + eased.y;
        const ay = angleRef.current + eased.x;
        const az = -0.36;
        const y1 = y * Math.cos(ax) - z * Math.sin(ax);
        const z1 = y * Math.sin(ax) + z * Math.cos(ax);
        const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
        const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
        return [x2 * Math.cos(az) - y1 * Math.sin(az), x2 * Math.sin(az) + y1 * Math.cos(az), z2];
      };
      const transformed = vertices.map(vertex => {
        const p = rotate(vertex.position);
        const perspective = 9 / (9 - p[2]);
        return { x: width / 2 + p[0] * scale * perspective, y: height / 2 + p[1] * scale * perspective, z: p[2], normal: rotate(vertex.normal) };
      });
      const sortedFaces = faces.map(face => ({ indices: face, depth: face.reduce((sum, index) => sum + transformed[index].z, 0) / 4 })).sort((a, b) => a.depth - b.depth);

      for (const face of sortedFaces) {
        const points = face.indices.map(index => transformed[index]);
        const normal = normalize([0, 1, 2].map(axis => points.reduce((sum, point) => sum + point.normal[axis], 0)));
        if (normal[2] < -0.12) continue;
        const diffuse = Math.max(0, normal[0] * -0.45 + normal[1] * -0.62 + normal[2] * 0.64);
        const specular = Math.pow(Math.max(0, normal[0] * -0.25 + normal[1] * -0.35 + normal[2] * 0.90), 22);
        const light = 0.16 + diffuse * 0.65;
        const color = [211, 193, 158].map(channel => Math.min(255, Math.round(channel * light + specular * 100)));
        context.beginPath();
        points.forEach((point, i) => i === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
        context.closePath();
        context.fillStyle = `rgb(${color.join(',')})`;
        context.fill();
        context.strokeStyle = `rgba(18, 20, 17, ${0.18 + diffuse * 0.22})`;
        context.lineWidth = 0.55;
        context.stroke();
      }
    };

    const tick = time => {
      frame = 0;
      if (!motionEnabled || !visible || document.hidden) return;
      if (time - lastTime >= 1000 / 30) {
        const delta = lastTime ? Math.min(time - lastTime, 64) : 0;
        angleRef.current += delta * 0.000085;
        eased.x += (pointer.x - eased.x) * 0.055;
        eased.y += (pointer.y - eased.y) * 0.055;
        draw();
        lastTime = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (motionEnabled && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const onPointerMove = event => {
      if (!motionEnabled || event.pointerType === 'touch') return;
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: ((event.clientX - bounds.left) / width - 0.5) * 0.5, y: ((event.clientY - bounds.top) / height - 0.5) * 0.3 };
    };
    const resetPointer = () => { pointer = { x: 0, y: 0 }; };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncAnimation();
    });
    observer.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', syncAnimation);
    resize();
    syncAnimation();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', resetPointer);
      document.removeEventListener('visibilitychange', syncAnimation);
    };
  }, [motionEnabled]);

  return (
    <div className="sculpture-stage" role="img" aria-label="A three-dimensional, interwoven bronze sculpture, representing connected AI systems">
      <div className="sculpture-orbit orbit-one" aria-hidden="true" />
      <div className="sculpture-orbit orbit-two" aria-hidden="true" />
      <div className="sculpture-center" aria-hidden="true" />
      {!canvasReady && <svg className="sculpture-fallback" viewBox="0 0 400 400" aria-hidden="true"><g fill="none" stroke="#c8b898" strokeWidth="1">{Array.from({ length: 18 }, (_, i) => <ellipse key={i} cx="200" cy="200" rx="145" ry="75" transform={`rotate(${i * 10} 200 200)`} />)}</g></svg>}
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="sculpture-label label-agent mono" aria-hidden="true"><i /> REASON</span>
      <span className="sculpture-label label-retrieve mono" aria-hidden="true"><i /> RETRIEVE</span>
      <span className="sculpture-label label-execute mono" aria-hidden="true"><i /> EXECUTE</span>
    </div>
  );
}
