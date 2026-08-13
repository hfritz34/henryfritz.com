// HeroAsciiField — Perlin noise field quantized into hard bands, drawn as monospace glyphs.
// The banding (not smooth gradients) is the point: it's cel-shading translated to 2D.

import { useEffect, useRef } from 'react';

const DEFAULTS = {
  cell: 13,          // px between glyph cells
  bands: 6,          // quantization steps — lower = chunkier/more cel-shaded
  scale: 0.011,      // noise frequency
  speed: 0.0026,     // field drift per frame
  ink: '#8f8f96',    // low/mid bands
  accent: '#a78bfa', // fallback for top band when grad is absent
  grad: ['#5b3bd4', '#8b5cf6', '#c084fc'], // bottom-left -> top-right, applied to top 2 bands
  ramp: ['·', '·', ':', '+', '=', '#'],
  cursorRadius2: 5200, // squared falloff of the cursor bump
};

function makePerlin(seed = 1337) {
  const p = new Uint8Array(512);
  const base = [];
  for (let i = 0; i < 256; i++) base.push(i);
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    const t = base[i]; base[i] = base[j]; base[j] = t;
  }
  for (let i = 0; i < 512; i++) p[i] = base[i & 255];
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + t * (b - a);
  const grad = (h, x, y) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);
  return (x, y) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = fade(x), v = fade(y);
    const A = p[X] + Y, B = p[X + 1] + Y;
    const n = lerp(
      lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
      lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u), v);
    return Math.max(0, Math.min(1, n * 0.55 + 0.5));
  };
}

export default function HeroAsciiField({ style, ...opts }) {
  const canvasRef = useRef(null);
  const cfg = { ...DEFAULTS, ...opts };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const noise = makePerlin();
    const ctx = canvas.getContext('2d');
    const mouse = { x: -999, y: -999 };
    let w = 0, h = 0, gradient = null, raf = 0, t = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gradient = ctx.createLinearGradient(0, h, w, 0);
      gradient.addColorStop(0, cfg.grad[0]);
      gradient.addColorStop(0.55, cfg.grad[1]);
      gradient.addColorStop(1, cfg.grad[2]);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      if (!reduced) t += cfg.speed;
      ctx.clearRect(0, 0, w, h);
      ctx.font = '600 11px ui-monospace, Menlo, monospace';
      for (let y = cfg.cell / 2; y < h; y += cfg.cell) {
        for (let x = cfg.cell / 2; x < w; x += cfg.cell) {
          let n = noise(x * cfg.scale + t, y * cfg.scale - t * 0.35);
          const dx = x - mouse.x, dy = y - mouse.y;
          n += Math.exp(-(dx * dx + dy * dy) / cfg.cursorRadius2) * 0.55;
          n = Math.max(0, Math.min(0.999, n));
          const band = Math.floor(n * cfg.bands);
          const lvl = band / (cfg.bands - 1);
          ctx.fillStyle = band >= cfg.bands - 2 ? gradient : (band >= cfg.bands - 1 ? cfg.accent : cfg.ink);
          ctx.globalAlpha = 0.1 + lvl * 0.8;
          ctx.fillText(cfg.ramp[Math.min(cfg.ramp.length - 1, band)], x - 3, y + 4);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        transition: 'opacity .12s linear',
        maskImage: 'linear-gradient(180deg,#000 0 62%,transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg,#000 0 62%,transparent 100%)',
        ...style,
      }}
    />
  );
}
