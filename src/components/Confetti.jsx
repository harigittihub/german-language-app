import React, { useEffect, useRef } from 'react';

// ─── Palette ──────────────────────────────────────────────────────────────────
const COLORS = [
  '#ff0028', '#00ff87', '#ffb703', '#ffffff',
  '#ff6b6b', '#4ecdc4', '#ffe066', '#a8edea',
  '#ffd6e7', '#c7f2a4', '#f9ca24', '#f0932b',
  '#c56cf0', '#fd79a8', '#00cec9', '#fdcb6e',
];

// Weighted shape list — more ribbons for realistic poppers
const SHAPES = [
  'ribbon', 'ribbon', 'ribbon',   // long fluttering strips
  'rect', 'rect',                  // short confetti squares
  'circle',                        // dots
  'triangle',                      // triangles
];

const PARTICLE_COUNT = 90;   // per side — 180 total

function rand(a, b) { return a + Math.random() * (b - a); }
function pick(arr)  { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── Draw ─────────────────────────────────────────────────────────────────────
function drawParticle(ctx, p) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, p.alpha);
  ctx.fillStyle   = p.color;
  ctx.translate(p.x, p.y);

  if (p.shape === 'ribbon') {
    // Ribbon: a thin elongated rectangle that warps with a sine wave flutter
    ctx.rotate(p.angle);
    // Squish the width with a sine oscillation to simulate 3-D flutter
    const scaleX = Math.abs(Math.sin(p.flutter));
    ctx.scale(scaleX, 1);
    ctx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
  } else {
    ctx.rotate(p.angle);
    switch (p.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'rect':
        ctx.fillRect(-p.size, -p.size * 0.55, p.size * 2, p.size * 1.1);
        break;
      case 'triangle': {
        const s = p.size * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo( s * 0.866,  s * 0.5);
        ctx.lineTo(-s * 0.866,  s * 0.5);
        ctx.closePath();
        ctx.fill();
        break;
      }
      default: break;
    }
  }
  ctx.restore();
}

// ─── Particle Factory ─────────────────────────────────────────────────────────
function createParticles(W, H, side) {
  const fromLeft = side === 'left';
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Origin: tight cluster at the very bottom corner
    const originX = fromLeft
      ? rand(0, 30)
      : rand(W - 30, W);
    const originY = H + rand(0, 10); // slightly below bottom edge

    // Launch angle: upward fan spread, biased inward
    // Left side → shoots toward upper-right quadrant
    // Right side → shoots toward upper-left quadrant
    const fanMin = fromLeft ? -Math.PI * 0.82 : -Math.PI * 0.82;
    const fanMax = fromLeft ? -Math.PI * 0.08 : -Math.PI * 0.08;
    const rawAngle = rand(fanMin, fanMax);
    const launchAngle = fromLeft ? rawAngle : Math.PI - rawAngle;

    // Speed: fast initial burst — heavier particles slower
    const speed = rand(14, 32);

    const shape = pick(SHAPES);
    const isRibbon = shape === 'ribbon';

    particles.push({
      x: originX,
      y: originY,

      vx: Math.cos(launchAngle) * speed,
      vy: Math.sin(launchAngle) * speed,

      // ── spin / flutter ──
      angle:       rand(0, Math.PI * 2),
      spin:        rand(-0.14, 0.14),          // rotation speed
      flutter:     rand(0, Math.PI * 2),        // phase for ribbon 3-D effect
      flutterSpeed: rand(0.06, 0.18),           // how fast ribbon flickers

      // ── ribbon dimensions ──
      w: isRibbon ? rand(14, 22) : 0,
      h: isRibbon ? rand(5,  9)  : 0,

      // ── circle/rect/triangle size ──
      size: rand(4, 9),

      color: pick(COLORS),
      shape,
      alpha: 1,

      // ── physics ──
      // Gravity: realistic range — lighter shapes fall slower
      gravity: isRibbon ? rand(0.22, 0.38) : rand(0.30, 0.55),
      // Horizontal air drag: ribbons catch more air
      dragX: isRibbon ? rand(0.96, 0.985) : rand(0.975, 0.995),
      // Vertical drag (less — gravity dominates downward)
      dragY: rand(0.985, 0.998),
      // Horizontal oscillation (ribbon sway / Lissajous drift)
      wobbleAmp:   isRibbon ? rand(0.3, 0.9) : rand(0.0, 0.3),
      wobbleSpeed: rand(0.04, 0.11),
      wobblePhase: rand(0, Math.PI * 2),
      tick: 0,

      // ── fading ── only fade once near/past the very bottom
      // We'll track alpha based on y position, not time
    });
  }
  return particles;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Confetti({ active }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    // Slightly extend canvas height so particles land fully off-screen
    const FLOOR = H + 60;

    let particles = [
      ...createParticles(W, H, 'left'),
      ...createParticles(W, H, 'right'),
    ];

    let running = true;

    function tick() {
      if (!running) return;

      ctx.clearRect(0, 0, W, H);

      let anyVisible = false;

      for (const p of particles) {
        p.tick++;

        // ── Horizontal wobble (air turbulence) ──
        const wobble = Math.sin(p.wobblePhase + p.tick * p.wobbleSpeed) * p.wobbleAmp;
        p.vx += wobble;
        p.vx *= p.dragX;

        // ── Gravity + vertical drag ──
        p.vy += p.gravity;
        p.vy *= p.dragY;

        // ── Move ──
        p.x += p.vx;
        p.y += p.vy;

        // ── Spin & flutter ──
        p.angle  += p.spin;
        p.flutter += p.flutterSpeed;

        // ── Position-based fade: only once the particle approaches the floor ──
        const fadeZone = 80; // px above floor where fade begins
        if (p.y >= FLOOR - fadeZone) {
          // lerp alpha from 1→0 across the fade zone
          p.alpha = Math.max(0, 1 - (p.y - (FLOOR - fadeZone)) / fadeZone);
        }

        // Only draw if on screen vertically and alpha > 0
        if (p.alpha > 0 && p.y < FLOOR) {
          drawParticle(ctx, p);
          if (p.y > -200) anyVisible = true; // still in flight
        }
      }

      if (anyVisible) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, W, H);
        running = false;
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, W, H);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
