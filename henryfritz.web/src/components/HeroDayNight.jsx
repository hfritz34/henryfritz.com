// HeroDayNight — production React component for the henryfritz.com hero (option 9a: gentle-slope bank, 90s cycle).
// Procedural ASCII landscape on a 60s day → sunset → night → dawn cycle.
// Engine code below is extracted verbatim from the approved prototype; only the React wrapper is new.
import { useEffect, useRef } from 'react';

function perlinFactory() {
    const p = new Uint8Array(512);
    const base = [];
    for (let i = 0; i < 256; i++) base.push(i);
    let s = 1337;
    for (let i = 255; i > 0; i--) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const j = s % (i + 1);
      const t = base[i]; base[i] = base[j]; base[j] = t;
    }
    for (let i = 0; i < 512; i++) p[i] = base[i & 255];
    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + t * (b - a);
    const grad = (h, x, y) => {
      const u = (h & 1) ? -x : x, v = (h & 2) ? -y : y;
      return u + v;
    };
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

function grid(w, h, C) {
    const cols = Math.ceil(w / C), rows = Math.ceil(h / C), n = cols * rows;
    return {
      C, cols, rows, ch: new Array(n), col: new Array(n), a: new Float32Array(n), bg: null,
      clear() { this.a.fill(0); if (this.bg) this.bg.fill(null); },
      setBg(x, y, c) { const cx = Math.floor(x / C), cy = Math.floor(y / C); if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return; if (!this.bg) this.bg = new Array(n).fill(null); this.bg[cy * cols + cx] = c; },
      put(x, y, ch, col, a, force) {
        const cx = Math.floor(x / C), cy = Math.floor(y / C);
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;
        const i = cy * cols + cx;
        if (!force && a <= this.a[i]) return;
        this.a[i] = a; this.ch[i] = ch; this.col[i] = col;
      },
      draw(ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.font = '600 ' + Math.round(C * 0.95) + 'px ui-monospace, Menlo, monospace';
        ctx.textBaseline = 'top';
        let last = null;
        if (this.bg) { ctx.globalAlpha = 1; for (let i = 0; i < n; i++) { const b = this.bg[i]; if (!b) continue; if (b !== last) { ctx.fillStyle = b; last = b; } ctx.fillRect((i % cols) * C, ((i / cols) | 0) * C, C + 0.5, C + 0.5); } last = null; }
        for (let i = 0; i < n; i++) {
          const a = this.a[i];
          if (a <= 0.01) continue;
          if (this.col[i] !== last) { ctx.fillStyle = this.col[i]; last = this.col[i]; }
          ctx.globalAlpha = Math.min(1, a);
          ctx.fillText(this.ch[i], (i % cols) * C, ((i / cols) | 0) * C);
        }
        ctx.globalAlpha = 1;
      }
    };
  }

const setupCycleWith = (opts = {}) => ({ w, h, mouse, g }) => {
    const lay = opts.layout || 'orig';
    const C = g.C, cols = g.cols, rows = g.rows, n = cols * rows, noise = perlinFactory();
    const HR = Math.round(rows * 0.58), HY = HR * C, CYCLE = opts.cycle || 60;
    const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    const hx = s => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
    const conv = o => { const r = {}; for (const k in o) { const v = o[k]; r[k] = typeof v === 'number' ? v : Array.isArray(v) ? v.map(hx) : hx(v); } return r; };
    const S = a => 'rgb(' + (a[0] | 0) + ',' + (a[1] | 0) + ',' + (a[2] | 0) + ')';
    const mx3 = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
    const DAY = conv({ sky: ['#1a4fc4', '#2668dc', '#3a86ec', '#5aa4f4', '#8cc6f8', '#c8e6fb'], cl: '#ffffff', cs: '#9dbbe8', cr: '#ffffff', fl: '#9ab4ea', fs: '#5f7cc8', sn: '#f4f8ff', ml: '#3f9a80', ms: '#276a60', nl: '#2f8a4c', ns: '#1b5a38', gr: ['#1a6430', '#2a8a40', '#4cb652', '#94e070'], ed: '#c8f7a0', wa: '#2a6fd0', su: '#fff1a8', L: 1, N: 0 });
    const SET = conv({ sky: ['#24185a', '#4e2484', '#9c3488', '#e0506a', '#ff8648', '#ffc458'], cl: '#ffb070', cs: '#7a3678', cr: '#ffe49a', fl: '#d0587e', fs: '#5c2a6a', sn: '#ffc6a2', ml: '#7e3a6c', ms: '#3e1d50', nl: '#4c2a54', ns: '#26163a', gr: ['#2a1c3a', '#4a343a', '#7a5a2c', '#d0903a'], ed: '#ffbc5a', wa: '#7a3a8a', su: '#ffd27a', L: 0.55, N: 0.15 });
    const NIG = conv({ sky: ['#04071c', '#09102e', '#0e1944', '#15235a', '#1e3172', '#2a428e'], cl: '#46589a', cs: '#1c2454', cr: '#9cacea', fl: '#3c52a6', fs: '#1c2766', sn: '#cad6ff', ml: '#22306e', ms: '#131b46', nl: '#15224e', ns: '#0b1332', gr: ['#0a2828', '#103a36', '#18584a', '#2c8c6c'], ed: '#62d4a4', wa: '#122260', su: '#f4ecd0', L: 0, N: 1 });
    const DAWN = conv({ sky: ['#1c2a6a', '#483a8a', '#8a5aa8', '#d27aa8', '#f6a8a0', '#ffd8b0'], cl: '#ffd2c2', cs: '#8a6aa8', cr: '#fff0d8', fl: '#d494b4', fs: '#7a5a9a', sn: '#ffe8f0', ml: '#6a5a9a', ms: '#40386a', nl: '#3a5a6a', ns: '#243a4a', gr: ['#1e4a3a', '#2e6a48', '#5a9a5a', '#aad28a'], ed: '#daf2aa', wa: '#6a6ab0', su: '#ffe0b0', L: 0.5, N: 0.3 });
    const KF = opts.slow ? [[0, DAY], [0.17, DAY], [0.34, SET], [0.5, NIG], [0.74, NIG], [0.9, DAWN], [1, DAY]] : [[0, DAY], [0.22, DAY], [0.34, SET], [0.46, NIG], [0.8, NIG], [0.9, DAWN], [1, DAY]];
    const palAt = ph => {
      let k = 0; while (k < KF.length - 2 && ph >= KF[k + 1][0]) k++;
      const [p0, A] = KF[k], [p1, B] = KF[k + 1];
      let fr = Math.max(0, Math.min(1, (ph - p0) / (p1 - p0 || 1))); fr = fr * fr * (3 - 2 * fr);
      const P = { raw: {} };
      for (const key in A) {
        const a = A[key], b = B[key];
        if (typeof a === 'number') P[key] = a + (b - a) * fr;
        else if (Array.isArray(a[0])) { P.raw[key] = a.map((c, i) => mx3(c, b[i], fr)); P[key] = P.raw[key].map(S); }
        else { P.raw[key] = mx3(a, b, fr); P[key] = S(P.raw[key]); }
      }
      const BK = [8, 8, 12], dk = (c, f2) => S(mx3(c, BK, f2));
      P.skyBg = P.raw.sky.map(c => dk(c, 0.3)); P.grBg = P.raw.gr.map(c => dk(c, 0.55));
      P.flBg = dk(P.raw.fl, 0.5); P.fsBg = dk(P.raw.fs, 0.5); P.mlBg = dk(P.raw.ml, 0.5); P.msBg = dk(P.raw.ms, 0.5); P.nlBg = dk(P.raw.nl, 0.5); P.nsBg = dk(P.raw.ns, 0.5);
      P.snBg = dk(P.raw.sn, 0.45); P.clBg = dk(P.raw.cl, 0.3); P.csBg = dk(P.raw.cs, 0.35); P.waBg = dk(P.raw.wa, 0.5);
      return P;
    };
    const q = a => Math.ceil(Math.max(0, a) * 4) / 4;
    const hf = [], hm = [], hn = [];
    for (let cx = 0; cx < cols; cx++) {
      hf[cx] = HR - (8 + Math.pow(noise(cx * 0.028 + 1, 2.2), 2) * 44);
      hm[cx] = HR - (4 + noise(cx * 0.045 + 5, 4.1) * 18);
      hn[cx] = HR - (1 + Math.pow(noise(cx * 0.07 + 9, 6.3), 1.5) * 9);
    }
    const ridge = (hh, cx) => { const a = hh[Math.max(0, cx - 1)], b = hh[Math.min(cols - 1, cx + 1)], s = b - a; if (hh[cx] < a && hh[cx] < b) return '^'; return s < -0.7 ? '/' : s > 0.7 ? '\\' : '_'; };
    const ss = (a, b, x) => { const u = Math.max(0, Math.min(1, (x - a) / (b - a))); return u * u * (3 - 2 * u); };
    const bankTop = cx => {
      const x = cx / cols;
      if (lay === 'slope') return rows - rows * 0.3 * ss(0.4, 0.9, x) + (noise(cx * 0.09, 3.3) - 0.5) * 2.4 * ss(0.4, 0.9, x);
      if (lay === 'rolling') return rows * 0.97 - rows * 0.17 * Math.exp(-Math.pow((x - 0.84) / 0.17, 2)) - rows * 0.06 * Math.exp(-Math.pow((x - 0.5) / 0.13, 2));
      if (lay === 'none') return Infinity;
      return rows * 0.8 - Math.max(0, 1 - Math.pow((x - 0.8) / 0.25, 2)) * rows * 0.11;
    };
    const kind = new Uint8Array(n), band = new Uint8Array(n), edge = new Uint8Array(n), star = new Uint8Array(n), ph = new Float32Array(n), flower = new Int8Array(n).fill(-1);
    for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
      const i = cy * cols + cx; ph[i] = Math.random() * 6.28;
      if (cy < HR) { if (Math.random() < 0.028) star[i] = 1 + ((Math.random() * 3) | 0); continue; }
      const bt = bankTop(cx);
      if ((lay !== 'orig' || cx / cols > 0.54) && cy >= bt) { kind[i] = 5; band[i] = Math.max(0, 3 - Math.floor((cy - bt) / 2)); if (cy === Math.ceil(bt)) edge[i] = 1; if (Math.random() < 0.06 && cy > bt + 1) flower[i] = (Math.random() * 4) | 0; continue; }
      const v = cy - HR + 1, depth = v / (rows - HR);
      const nn = noise(cx * (0.055 - depth * 0.035) + 3, Math.log(v + 1) * 2.6 + 7);
      const thr = 0.44 + depth * 0.1 - (v < 3 ? 0.35 : 0);
      kind[i] = nn > thr ? 3 : 4;
      band[i] = Math.min(3, Math.max(0, Math.floor((nn - thr) * 14 + depth * 1.5)));
      if (kind[i] === 3 && Math.random() < 0.035) flower[i] = (Math.random() * 4) | 0;
    }
    for (let cy = HR + 1; cy < rows - 1; cy++) for (let cx = 0; cx < cols; cx++) {
      const i = cy * cols + cx; if (kind[i] !== 3) continue;
      if (kind[i - cols] === 4) edge[i] = 1; else if (kind[i + cols] === 4) edge[i] = 2;
    }
    const FLC = ['#ff7ab6', '#ffd23f', '#ffffff', '#c084fc'].map(hx);
    const GR = [['.', ','], [',', "'"], ['"', "'"], ['v', 'w']];
    const FAM = [['#ffd23f', '#ff9f1c'], ['#5ee08a', '#c4ff7a'], ['#5aa9ff', '#9fe4ff'], ['#c084fc', '#ff8ad8'], ['#ff7a59', '#ffd0a0']];
    const SKIN = hx('#f4c9a0'), DARK = hx('#0e1638'), WHITE = [255, 255, 255];
    const TREE = { cx: Math.round(cols * 0.93), cy: Math.round(bankTop(Math.round(cols * 0.93))) };
    const birds = []; for (let k = 0; k < 4; k++) birds.push({ x: Math.random() * w, y: HY * (0.2 + Math.random() * 0.3), s: 0.35 + Math.random() * 0.25, p: Math.random() * 6 });
    const flies = []; for (let k = 0; k < 18; k++) flies.push({ x: Math.random() * w, y: HY + Math.random() * (h - HY) * 0.6, p: Math.random() * 6, vx: 0, vy: 0 });
    const rockets = [], bursts = [], sparks = [], falls = [], glows = [], ripples = [];
    let skip = 0, flash = 0, nextLaunch = 1.5, nextFall = 0;
    const PH0 = 0.24, SEED = Math.random() * 100, SEED2 = Math.random() * 100;
    const flocks = []; let nextFlock = 1 + Math.random() * 3;
    const bz = (fl, p) => { const u = 1 - p; return { x: u * u * fl.sx + 2 * u * p * fl.cx + p * p * fl.lx, y: u * u * fl.sy + 2 * u * p * fl.cy + p * p * fl.ly }; };
    const rayCh = a => { const d = ((a % Math.PI) + Math.PI) % Math.PI; return d < 0.39 || d > 2.75 ? '-' : d < 1.18 ? '\\' : d < 1.96 ? '|' : '/'; };
    const drawFx = (t, y0, y1) => {
      const inb = y => y >= y0 && y < y1;
      for (const r of rockets) {
        r.trail.forEach((p, k) => { if (inb(p.y)) g.put(p.x, p.y, k > r.trail.length - 3 ? '|' : '.', k > r.trail.length - 3 ? '#fff4c8' : r.fam[1], q(k / r.trail.length) * 0.9, true); });
        if (inb(r.y)) g.put(r.x, r.y, '^', '#ffffff', 1, true);
      }
      for (const b of bursts) {
        const age = t - b.t0, grow = Math.min(1, age / 0.35), fade = Math.max(0, 1 - Math.max(0, age - 0.5) / 1.1);
        const rr = b.R * (1 - Math.pow(1 - grow, 3));
        for (let k = 0; k < 5; k++) {
          const a = b.a0 + k * 1.2566, ux = Math.cos(a), uy = Math.sin(a);
          for (let r = C; r <= rr; r += C * 0.8) { const x = b.x + ux * r, y = b.y + uy * r; if (inb(y)) g.put(x, y, r > rr - C ? '*' : rayCh(a), r > rr * 0.6 ? b.fam[0] : '#ffffff', q(fade * (1 - r / (b.R * 1.6))), true); }
        }
        if (inb(b.y) && fade > 0.3) g.put(b.x, b.y, '✦', '#ffffff', 1, true);
      }
      for (const rp of ripples) { const age = t - rp.t0, R = age * 34, a = Math.max(0, 1 - age / 2.2); if (!inb(rp.y)) continue; for (let k = 0; k < 28; k++) { const an = k / 28 * 6.283, x = rp.x + Math.cos(an) * R, y = rp.y + Math.sin(an) * R * 0.3; g.put(x, y, Math.abs(Math.sin(an)) > 0.7 ? '-' : '~', k % 3 ? '#9fd0ff' : rp.col, q(a) * 0.9, true); } }
      for (const s of sparks) if (inb(s.y)) g.put(s.x, s.y, s.life > 0.66 ? '*' : s.life > 0.33 ? '+' : '.', s.col, q(s.life), true);
      for (const fl of falls) {
        if (t < fl.t0) continue;
        const raw = Math.min(1, (t - fl.t0) / fl.dur), p = fl.mode === 'streak' ? raw : 1 - Math.pow(1 - raw, 2);
        let pt = Math.max(0, p - fl.tail); if (fl.hitT) pt = fl.ptHit + (1 - fl.ptHit) * Math.min(1, (t - fl.hitT) / 0.6);
        const N = Math.max(2, Math.floor((p - pt) * 40));
        let prev = bz(fl, pt);
        for (let s = 1; s <= N; s++) {
          const fr = s / N, P2 = bz(fl, pt + (p - pt) * fr), dx = P2.x - prev.x, dy = P2.y - prev.y;
          const ch = Math.abs(dx) < Math.abs(dy) * 0.4 ? '|' : Math.abs(dy) < Math.abs(dx) * 0.4 ? '-' : dx * dy > 0 ? '\\' : '/';
          if (inb(P2.y) && !(fl.mode === 'behind' && P2.y > fl.ly - C)) g.put(P2.x, P2.y, ch, fr > 0.85 ? '#e8f0ff' : fr > 0.5 ? '#8fb0ff' : '#3f63e0', q(0.2 + fr * 0.8) * (fl.hitT ? 0.8 : 1), true);
          prev = P2;
        }
        const B = bz(fl, p), bx = B.x, by = B.y;
        if (fl.mode === 'behind' && by > fl.ly - C) continue;
        if (!fl.hitT && fl.size > 1 && inb(by)) { g.put(bx - 2 * C, by, '·', fl.col, 0.6, true); g.put(bx + 2 * C, by, '·', fl.col, 0.6, true); }
        if (!fl.hitT && inb(by)) { if (Math.sin(t * 9 + fl.sx) > 0) { g.put(bx - C, by, '·', '#ffffff', 0.8, true); g.put(bx + C, by, '·', '#ffffff', 0.8, true); g.put(bx, by - C, '·', '#ffffff', 0.8, true); g.put(bx, by + C, '·', '#ffffff', 0.8, true); } g.put(bx, by, '✦', fl.col, 1, true); }
      }
    };
    const glowG = ['#4fd08a', '#8ff5c0', '#d8fff0'];
    const glowAt = (px, py) => { let best = 0; for (const gl of glows) { const dx = px - gl.x, dy = (py - gl.y) * 2.4, v = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 110) * gl.life; if (v > best) best = v; } return best; };
    return t => {
      while (mouse.clicks.length) { mouse.clicks.shift(); skip += 0.12; }
      const phase = (PH0 + t / CYCLE + skip) % 1, P = palAt(phase), L = P.L, NI = P.N;
      const dusk = phase > 0.3 && phase < 0.5;

      if (NI > 0.6 && t > nextFall && falls.length < 3) {
        const n2 = Math.random() < 0.15 ? 2 : 1;
        for (let m = 0; m < n2; m++) {
          const roll = Math.random(), mode = roll < 0.55 ? 'land' : roll < 0.75 ? 'water' : roll < 0.9 ? 'behind' : 'streak';
          let lx = Math.random() * w, ly = (HR + 3) * C;
          if (mode === 'land' || mode === 'water') {
            const want = mode === 'land' ? 3 : 4;
            for (let k = 0; k < 80; k++) { const cx = (Math.random() * cols) | 0, cy = HR + 1 + ((Math.random() * (rows - HR) * 0.55) | 0); if (kind[cy * cols + cx] === want) { lx = cx * C; ly = cy * C; break; } }
          } else if (mode === 'behind') { const cx = (Math.random() * cols) | 0; lx = cx * C; ly = Math.max(hf[cx], 4) * C + C; }
          else { ly = HY * (0.15 + Math.random() * 0.4); lx = Math.random() < 0.5 ? -60 : w + 60; }
          const side = Math.random() < 0.5 ? -1 : 1;
          const sx = mode === 'streak' ? (lx < 0 ? w * (0.5 + Math.random() * 0.5) : w * Math.random() * 0.5) : lx + side * (0.15 + Math.random() * 0.6) * w * 0.5;
          const sy = mode === 'streak' ? -20 + Math.random() * HY * 0.2 : -30 - Math.random() * 60;
          const bend = (Math.random() - 0.5) * w * 0.35;
          falls.push({ mode, sx, sy, lx, ly, cx: (sx + lx) / 2 + bend, cy: (sy + ly) / 2 - Math.random() * 40, t0: t + m * (0.15 + Math.random() * 0.5), dur: mode === 'streak' ? 1.4 + Math.random() * 1.2 : 2.5 + Math.random() * 4.5, tail: 0.15 + Math.random() * 0.25, size: Math.random() < 0.3 ? 2 : 1, col: FAM[(Math.random() * FAM.length) | 0][0], hitT: 0, ptHit: 0 });
        }
        nextFall = t + 1.8 + Math.random() * 5;
      }
      for (let k = rockets.length - 1; k >= 0; k--) { const r = rockets[k]; r.trail.push({ x: r.x, y: r.y }); if (r.trail.length > 9) r.trail.shift(); r.x += r.vx; r.y += r.vy; r.vy += 0.06; if (r.vy > -1 || r.y < 40) { burst(r, t); rockets.splice(k, 1); } }
      for (let k = bursts.length - 1; k >= 0; k--) if (t - bursts[k].t0 > 1.7) bursts.splice(k, 1);
      for (let k = sparks.length - 1; k >= 0; k--) { const s = sparks[k]; s.x += s.vx; s.y += s.vy; s.vy += 0.035; s.vx *= 0.985; s.vy *= 0.985; s.life -= s.dec; if (s.life <= 0) sparks.splice(k, 1); }
      for (let k = falls.length - 1; k >= 0; k--) {
        const fl = falls[k];
        if (!fl.hitT && t - fl.t0 >= fl.dur) {
          fl.hitT = t; fl.ptHit = Math.max(0, 1 - fl.tail);
          if (fl.mode === 'land') { glows.push({ x: fl.lx, y: fl.ly, t0: t, life: 1 }); for (let s = 0; s < 10 + fl.size * 10; s++) sparks.push({ x: fl.lx, y: fl.ly, vx: (Math.random() - 0.5) * 2.6, vy: -0.6 - Math.random() * 2.2, life: 1, dec: 0.016, col: Math.random() < 0.4 ? fl.col : '#bfffe6' }); }
          else if (fl.mode === 'water') { ripples.push({ x: fl.lx, y: fl.ly, t0: t, col: fl.col }); for (let s = 0; s < 8; s++) sparks.push({ x: fl.lx, y: fl.ly, vx: (Math.random() - 0.5) * 1.6, vy: -1 - Math.random() * 1.5, life: 0.8, dec: 0.02, col: '#cfe6ff' }); }
          else if (fl.mode === 'behind') { for (let s = 0; s < 6; s++) sparks.push({ x: fl.lx, y: fl.ly - C, vx: (Math.random() - 0.5) * 1.2, vy: -0.4 - Math.random(), life: 0.7, dec: 0.02, col: fl.col }); }
        }
        if (fl.hitT && t - fl.hitT > 0.7) falls.splice(k, 1);
      }
      for (let k = ripples.length - 1; k >= 0; k--) if (t - ripples[k].t0 > 2.2) ripples.splice(k, 1);
      for (let k = glows.length - 1; k >= 0; k--) { const gl = glows[k]; gl.life = 1 - (t - gl.t0) / 3; if (gl.life <= 0) glows.splice(k, 1); }
      flash = Math.max(0, flash - 0.035);

      const sArc = ((phase + 0.1) % 1) / 0.52, mArc = ((phase - 0.44 + 1) % 1) / 0.46;
      let lightX = w / 2, sun = null, moon = null;
      if (sArc < 1) { sun = { x: w * (0.1 + 0.8 * sArc), y: HY - Math.sin(sArc * Math.PI) * HY * 0.82 + 14 }; lightX = sun.x; }
      if (mArc < 1) { moon = { x: w * (0.15 + 0.7 * mArc), y: HY - Math.sin(mArc * Math.PI) * HY * 0.78 + 30 }; if (!sun) lightX = moon.x; }
      const lightLeft = lightX < w / 2;

      for (let cy = 0; cy < HR; cy++) for (let cx = 0; cx < cols; cx++) {
        const i = cy * cols + cx, v = cy / HR * 5.6 + (B4[(cy % 4) * 4 + (cx % 4)] / 16 - 0.5) * 1.1, idx = Math.max(0, Math.min(5, Math.floor(v)));
        g.setBg(cx * C, cy * C, P.skyBg[idx]);
        g.put(cx * C, cy * C, idx < 2 ? '.' : idx < 4 ? ':' : '=', P.sky[idx], 0.9, true);
        if (star[i] && NI > 0.25) { const a = Math.ceil((0.5 + 0.5 * Math.sin(t * (0.7 + star[i] * 0.5) + ph[i])) * 3) / 3; g.put(cx * C, cy * C, a > 0.9 && star[i] === 3 ? '+' : a > 0.5 ? '*' : '.', '#e4eaff', (0.3 + a * 0.6) * NI, true); }
      }
      for (const b of bursts) {
        const age = t - b.t0, life = Math.max(0, 1 - age / 1.5); if (life <= 0) continue;
        const R = 96;
        for (let y = b.y - R; y <= b.y + R; y += C) for (let x = b.x - R; x <= b.x + R; x += C) {
          if (y >= HY) continue;
          const d = Math.hypot(x - b.x, y - b.y) / R; if (d > 1) continue;
          const bd = Math.ceil((1 - d) * life * 3); if (bd <= 0) continue;
          g.put(x, y, bd > 2 ? ':' : '.', b.fam[1], 0.25 + bd * 0.18, true);
        }
      }
      if (sun) {
        const R = 26;
        for (let y = sun.y - R - 18; y <= sun.y + R + 18; y += C) for (let x = sun.x - R - 18; x <= sun.x + R + 18; x += C) {
          if (y >= HY) continue;
          const d = Math.hypot(x - sun.x, y - sun.y);
          if (d <= R) g.put(x, y, d < R * 0.6 ? '@' : d < R * 0.85 ? '#' : 'O', P.su, 1, true);
          else if (d < R + 16) { const a = Math.atan2(y - sun.y, x - sun.x) * 12 / 6.283 + t * 0.3; if (Math.abs(a - Math.round(a)) < 0.16) g.put(x, y, '·', P.su, 0.85, true); }
        }
      }
      if (moon) {
        const R = 22;
        for (let y = moon.y - R; y <= moon.y + R; y += C) for (let x = moon.x - R; x <= moon.x + R; x += C) {
          const dx = x - moon.x, dy = y - moon.y; if (dx * dx + dy * dy > R * R || y >= HY) continue;
          const ex = dx - R * 0.5, ey = dy + R * 0.25; if (ex * ex + ey * ey < R * R * 0.7) continue;
          g.put(x, y, Math.hypot(dx, dy) / R > 0.82 ? '#' : '@', '#f4ecd0', 0.95 * Math.max(0.3, NI), true);
        }
      }
      const cloudSpd = 0.01 + noise(t * 0.02, SEED) * 0.012, cloudThin = (noise(t * 0.015 + SEED2, 5.5) - 0.5) * 0.22;
      const CR = Math.floor(HR * 0.66), cf = new Float32Array(cols * (CR + 1));
      for (let cy = 0; cy <= CR; cy++) for (let cx = 0; cx < cols; cx++) cf[cy * cols + cx] = cy < rows * 0.13 ? 0 : noise(cx * 0.03 + t * cloudSpd + SEED, cy * 0.13 + 2 + t * 0.004) * 0.75 + noise(cx * 0.09 - t * 0.02 + SEED2, cy * 0.3 + t * 0.01) * 0.35 - 0.05 - Math.abs(cy / CR - 0.7) * 0.4 - cloudThin;
      for (let cy = 1; cy < CR; cy++) for (let cx = 0; cx < cols; cx++) {
        const v = cf[cy * cols + cx]; if (v <= 0.56) continue;
        const top = cf[(cy - 1) * cols + cx] <= 0.56, bot = cf[(cy + 1) * cols + cx] <= 0.56;
        const sideLit = lightLeft ? cf[cy * cols + Math.max(0, cx - 2)] <= 0.56 : cf[cy * cols + Math.min(cols - 1, cx + 2)] <= 0.56;
        const px = cx * C, py = cy * C;
        g.setBg(px, py, v > 0.64 || sideLit || top ? P.clBg : P.csBg);
        if (top) g.put(px, py, '-', P.cr, 1, true);
        else if (bot) g.put(px, py, '_', P.cs, 0.9, true);
        else if (v > 0.64 || sideLit) g.put(px, py, '%', P.cl, 0.95, true);
        else g.put(px, py, ':', P.cs, 0.9, true);
      }
      if (L > 0.5 && t > nextFlock) {
        const cnt = Math.random() < 0.35 ? 1 : Math.random() < 0.6 ? 2 + ((Math.random() * 3) | 0) : 5 + ((Math.random() * 5) | 0), dir = Math.random() < 0.7 ? 1 : -1;
        const y0 = HY * (0.18 + Math.random() * 0.45), sp = (0.35 + Math.random() * 0.6) * dir, v = Math.random() < 0.6;
        const members = []; for (let k = 0; k < cnt; k++) { const rank = Math.ceil(k / 2), sideK = k % 2 ? 1 : -1; members.push({ dx: v ? -rank * 14 * dir : -k * (10 + Math.random() * 18) * dir, dy: v ? rank * 7 * sideK : (Math.random() - 0.5) * 30, p: Math.random() * 6 }); }
        flocks.push({ x: dir > 0 ? -30 : w + 30, y: y0, sp, dir, members, bob: 0.8 + Math.random() * 1.2 });
        nextFlock = t + 2 + Math.random() * 9;
      }
      for (let k = flocks.length - 1; k >= 0; k--) {
        const fk = flocks[k]; fk.x += fk.sp; fk.y += Math.sin(t * 0.4 + k) * 0.08;
        if ((fk.dir > 0 && fk.x > w + 200) || (fk.dir < 0 && fk.x < -200)) { flocks.splice(k, 1); continue; }
        for (const m of fk.members) { const bx = fk.x + m.dx, by = fk.y + m.dy + Math.sin(t * fk.bob + m.p) * 3; if (by < HY) g.put(bx, by, Math.sin(t * 7 + m.p) > 0 ? 'v' : '-', '#1a2040', 0.9 * Math.max(0, (L - 0.3) / 0.7), true); }
      }
      for (let cy = 0; cy < HR; cy++) for (let cx = 0; cx < cols; cx++) {
        const lyr = cy >= hn[cx] ? 2 : cy >= hm[cx] ? 1 : cy >= hf[cx] ? 0 : -1; if (lyr < 0) continue;
        const hh = lyr === 2 ? hn : lyr === 1 ? hm : hf, px = cx * C, py = cy * C;
        const s = hh[Math.min(cols - 1, cx + 1)] - hh[Math.max(0, cx - 1)], lit = lightLeft ? s < 0 : s > 0;
        const Lc = lyr === 2 ? P.nl : lyr === 1 ? P.ml : P.fl, Sc = lyr === 2 ? P.ns : lyr === 1 ? P.ms : P.fs;
        const snowy = lyr === 0 && cy - hh[cx] < 3.5 && hh[cx] < HR - 30;
        g.setBg(px, py, snowy && lit ? P.snBg : lit ? (lyr === 2 ? P.nlBg : lyr === 1 ? P.mlBg : P.flBg) : (lyr === 2 ? P.nsBg : lyr === 1 ? P.msBg : P.fsBg));
        if (Math.ceil(hh[cx]) === cy) { g.put(px, py, ridge(hh, cx), lyr === 0 && hh[cx] < HR - 30 ? P.sn : Lc, 1, true); continue; }
        if (lyr === 0 && cy - hh[cx] < 3.5 && hh[cx] < HR - 30) { g.put(px, py, lit ? '*' : ':', P.sn, lit ? 0.95 : 0.6, true); continue; }
        if (lit) g.put(px, py, B4[(cy % 4) * 4 + (cx % 4)] < 9 ? ':' : '.', Lc, 0.9, true);
        else g.put(px, py, lyr === 2 ? '%' : '#', Sc, 0.85, true);
      }
      drawFx(t, -9999, HY);
      for (let cy = HR; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
        const i = cy * cols + cx, k = kind[i], px = cx * C, py = cy * C;
        if (k === 4) {
          const my = 2 * HR - cy - 1 + Math.round(Math.sin(t * 1.5 + cx * 0.22) * 0.7), mxx = cx + Math.round(Math.sin(t * 2 + cy * 0.8) * 1.4), j = my * cols + mxx;
          const glint = Math.sin(t * 2.6 + cx * 0.6 + cy * 1.3) > 0.85 ? 0.18 : 0;
          g.setBg(px, py, my >= 0 && my < HR && mxx >= 0 && mxx < cols && g.bg && g.bg[j] ? g.bg[j] : P.waBg);
          if (my >= 0 && my < HR && mxx >= 0 && mxx < cols && g.a[j] > 0.05) g.put(px, py, g.ch[j], g.col[j], Math.min(1, Math.max(0.35, g.a[j] * 0.72) + glint), true);
          else g.put(px, py, (cx + cy + Math.floor(t * 1.5)) % 6 === 0 ? '~' : '-', P.wa, 0.45 + glint, true);
          continue;
        }
        let ch, col, a;
        g.setBg(px, py, P.grBg[band[i]]);
        if (k === 5) { ch = edge[i] ? '=' : GR[3][(cx + cy) % 2]; col = edge[i] ? P.ed : P.gr[Math.min(3, band[i] + 1)]; a = 0.9; }
        else {
          const depth = (cy - HR) / (rows - HR), di = Math.min(3, Math.floor(depth * 4)), sway = Math.sin(t * 1.3 + cx * 0.14 - cy * 0.12 + ph[i] * 0.3) > 0.2 ? 1 : 0;
          ch = GR[di][sway]; col = P.gr[Math.min(3, band[i] + 1)]; a = 0.85;
          if (edge[i] === 1) { ch = '='; col = P.ed; a = 0.9; } else if (edge[i] === 2) { ch = '_'; col = P.gr[0]; a = 0.8; }
        }
        if (flower[i] >= 0 && L > 0.2) { ch = flower[i] % 2 ? '*' : 'o'; col = S(mx3(DARK, FLC[flower[i]], 0.35 + L * 0.65)); a = 0.95; }
        const gv = glows.length ? glowAt(px, py) : 0, gb = Math.floor(gv * 3);
        if (gb > 0) { col = glowG[gb - 1]; a = Math.min(1, a + gb * 0.15); }
        g.put(px, py, ch, col, a, true);
      }
      if (NI > 0.3) for (const fy of flies) { fy.vx += (Math.random() - 0.5) * 0.08; fy.vy += (Math.random() - 0.5) * 0.08; fy.vx *= 0.96; fy.vy *= 0.96; fy.x += fy.vx; fy.y += fy.vy; if (fy.y < HY + 8) fy.vy += 0.05; if (fy.x < 0) fy.x = w; if (fy.x > w) fy.x = 0; if (fy.y > h) fy.y = HY + 10; const b = Math.sin(t * 2.2 + fy.p); if (b > 0.2) g.put(fy.x, fy.y, b > 0.75 ? '*' : '·', '#e8ff7a', (0.4 + b * 0.6) * NI, true); }
      if (lay !== 'none') { const T = TREE, trunk = S(mx3(hx('#5a3a2a'), DARK, NI * 0.6));
        for (let r = 0; r < 3; r++) g.put(T.cx * C, (T.cy - 1 - r) * C, '|', trunk, 0.95, true);
        const R = 4.2, ccy = T.cy - 3 - R;
        for (let dy = -R; dy <= R; dy++) for (let dx = -R * 1.2; dx <= R * 1.2; dx++) {
          const d = Math.hypot(dx / 1.2, dy); if (d > R) continue;
          const lt = (lightLeft ? -dx : dx) * 0.6 - dy * 0.8 > 0.4;
          g.put((T.cx + Math.round(dx)) * C, Math.round(ccy + dy) * C, d > R - 0.8 ? (dy < 0 ? '^' : 'w') : lt ? '%' : '#', lt ? P.gr[3] : P.gr[1], 0.95, true);
        }
      }
      drawFx(t, HY, 99999);
    };
  };
const setupCycle = setupCycleWith({ layout: 'slope', cycle: 90, slow: true });

/**
 * Props
 *  cell        grid cell size in px (prototype: 8)
 *  clickToSkip clicking jumps the cycle ahead 12% (prototype review aid; default false)
 *  className / style passed to the <canvas>
 * The canvas fills its positioned parent. Parent handles scroll fade (see README).
 */
export default function HeroDayNight({ cell = 8, clickToSkip = false, className, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, visible = true, frame = null, g = null, ctx = null, t = 0, w = 0, h = 0;
    const mouse = { x: -999, y: -999, clicks: [] };
    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      if (!w || !h) return false;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      g = grid(w, h, cell);
      frame = setupCycle({ ctx, w, h, mouse, g });
      return true;
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || !frame) return;
      t += 1 / 60;
      g.clear(); frame(t); g.draw(ctx);
    };
    const onDown = () => { if (clickToSkip) mouse.clicks.push({}); };
    canvas.addEventListener('pointerdown', onDown);
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(build, 150); };
    window.addEventListener('resize', onResize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    if (build()) {
      if (reduced) { t = 8; g.clear(); frame(t); g.draw(ctx); }
      else tick();
    }
    return () => {
      cancelAnimationFrame(raf); clearTimeout(rt); io.disconnect();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, [cell, clickToSkip]);
  return <canvas ref={ref} className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', ...style }} />;
}
