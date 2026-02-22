'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Config ────────────────────────────────────────────────────────────────
const REDIRECT_URL = 'https://vln.gg/about';
// Update AVATAR_URL to the actual vln.gg/about avatar if different
const AVATAR_URL = 'https://github.com/4eckd.png';
// Launch target date (UTC)
const LAUNCH_DATE = new Date('2026-04-01T00:00:00Z');

// ─── Random content pools ──────────────────────────────────────────────────
const STATUS_MESSAGES = [
  '> ESTABLISHING ENCRYPTED TUNNEL TO VLN.GG...',
  '> SYNCHRONIZING NEURAL NETWORKS... [OK]',
  '> CALIBRATING QUANTUM PROCESSORS...',
  '> LOADING CREATIVE ALGORITHMS v2.6.1...',
  '> INITIALIZING VLN PROTOCOL SUITE...',
  '> COMPILING EXPERIENCE STACK... [87%]',
  '> SCANNING FOR SIGNAL LOCK...',
  '> AUTHENTICATING AGENT CREDENTIALS...',
  '> DEPLOYING INNOVATION PAYLOAD...',
  '> MAPPING VENTURE COORDINATES...',
  '> BYPASSING LEGACY INFRASTRUCTURE...',
  '> DISTRIBUTING ACROSS 2,847 NODES...',
  '> PARSING CREATIVE DIRECTIVES...',
  '> INJECTING DESIGN TOKENS...',
  '> VECTORIZING IDENTITY ASSETS...',
  '> COMPRESSING REALITY MATRIX...',
  '> HANDSHAKE COMPLETE... STANDING BY',
  '> ROUTING THROUGH SECURED PROXY [AES-256]...',
  '> LOADING PROFILE: J.LUCUS // FOUNDER...',
  '> DECRYPTING VENTURE FILES... ACCESS GRANTED',
  '> WARMING UP CREATIVE SUITE...',
  '> SYNCING BLOCKCHAIN LEDGER... [DONE]',
  '> UPLINK STABLE — LATENCY: <1ms',
  '> VLN_CORE_v2.launch() — PENDING EXECUTION',
];

const TAGLINES = [
  'SOMETHING EPIC IS LOADING',
  'THE FUTURE IS COMPILING',
  'VENTURE UNLOCKED — STANDBY',
  'REALITY UPGRADE IN PROGRESS',
  'INNOVATION SEQUENCE INITIATED',
  'NEXT LEVEL IS BEING RENDERED',
];

const FLOATING_FRAGMENTS = [
  '0xVLN_CORE_v2',
  '01001010 01001100',
  'VLN_GENESIS.exe',
  'NAV_LOCK: ARMED',
  'FPS: 144 | PING: <1ms',
  'KERNEL v4.2.0-stable',
  'STREAM [AES-256] ACTIVE',
  '> sudo vln --launch',
  'NODE_COUNT: 2,847',
  'ENTROPY: HIGH',
  'PKT: 0x4E5A00FF',
  'SIGNAL_STRENGTH: MAX',
  'ETH_ADDR: 0x4eckd...',
  'UPLINK: SECURED',
  'VLN.BOOT.SEQUENCE[7]',
];

const CORNER_COORDS = [
  'SYS: 0x00A9FF | PROC: 99.7%',
  'LAT: 0.47ms | NODES: 2,847',
  'VLN/CORE/v2.6.1/STABLE',
  'AGENT_ID: 4ECKD_JL',
];

// ─── Countdown helpers ─────────────────────────────────────────────────────
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
  return {
    total: diff,
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff / 36e5) % 24),
    minutes: Math.floor((diff / 6e4) % 60),
    seconds: Math.floor((diff / 1e3) % 60),
  };
}

// ─── Matrix Rain Canvas ───────────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const CHARS = '01アイウエオカキ∂∑∫∞ABCDEF0123456789█▒░';
    const SIZE = 13;
    let cols = Math.floor(canvas.width / SIZE);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -80);

    const COLORS = [
      'rgba(0,217,255,0.9)',
      'rgba(0,217,255,0.45)',
      'rgba(0,217,255,0.2)',
      'rgba(255,184,0,0.5)',
      'rgba(204,255,0,0.35)',
      'rgba(255,0,110,0.3)',
    ];

    let raf: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cols = Math.floor(canvas.width / SIZE);
      while (drops.length < cols) drops.push(Math.random() * -80);

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        ctx.fillStyle = color;
        ctx.font = `${SIZE}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, i * SIZE, drops[i] * SIZE);
        if (drops[i] * SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: 0.18, zIndex: 1 }} />;
}

// ─── Glitch text ──────────────────────────────────────────────────────────
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const [shifted, setShifted] = useState(false);
  const GLITCH = 'X@#$!%&ABCDEF0123456789▒█░';

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const trigger = () => {
      setShifted(true);
      let count = 0;
      const iv = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((c) =>
              c === ' ' || c === '.'
                ? c
                : Math.random() > 0.65
                ? GLITCH[Math.floor(Math.random() * GLITCH.length)]
                : c
            )
            .join('')
        );
        count++;
        if (count > 7) {
          clearInterval(iv);
          setDisplay(text);
          setShifted(false);
        }
      }, 55);
    };
    const schedule = () => {
      timer = setTimeout(() => {
        trigger();
        schedule();
      }, 2200 + Math.random() * 3500);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        transform: shifted ? `translateX(${(Math.random() - 0.5) * 3}px) skewX(${(Math.random() - 0.5) * 1.5}deg)` : 'none',
        transition: 'transform 0.05s',
        filter: shifted ? 'blur(0.4px)' : 'none',
      }}
    >
      {display}
    </span>
  );
}

// ─── Random tagline cycler ────────────────────────────────────────────────
function RandomTagline() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * TAGLINES.length));
  useEffect(() => {
    const iv = setInterval(
      () => setIdx((p) => (p + 1) % TAGLINES.length),
      3800
    );
    return () => clearInterval(iv);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4 }}
        className="block font-mono text-xs tracking-[0.25em] uppercase"
        style={{ color: 'rgb(var(--color-text-secondary))' }}
      >
        {TAGLINES[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── Countdown digit tile ─────────────────────────────────────────────────
function DigitTile({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Digit box */}
        <div
          className="relative font-mono font-black text-4xl sm:text-5xl md:text-6xl w-[4.5rem] sm:w-[5.5rem] md:w-[6.5rem] h-[4.5rem] sm:h-[5.5rem] md:h-[6.5rem] flex items-center justify-center rounded-lg overflow-hidden"
          style={{
            background: 'rgba(0,10,18,0.95)',
            border: '1px solid rgba(0,217,255,0.25)',
            boxShadow: '0 0 12px rgba(0,217,255,0.12), inset 0 0 20px rgba(0,217,255,0.04)',
          }}
        >
          {/* Scanline inside tile */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0,217,255,0.03) 0px, rgba(0,217,255,0.03) 1px, transparent 1px, transparent 4px)',
            }}
          />
          {/* Horizontal separator */}
          <div
            className="absolute left-0 right-0 h-px"
            style={{ top: '50%', background: 'rgba(0,217,255,0.12)' }}
          />
          <AnimatePresence mode="popLayout">
            <motion.span
              key={padded}
              initial={{ opacity: 0, y: -16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ color: 'rgb(var(--color-primary))', position: 'relative', zIndex: 2 }}
            >
              {padded}
            </motion.span>
          </AnimatePresence>
          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l" style={{ borderColor: 'rgba(0,217,255,0.4)' }} />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r" style={{ borderColor: 'rgba(0,217,255,0.4)' }} />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l" style={{ borderColor: 'rgba(0,217,255,0.4)' }} />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r" style={{ borderColor: 'rgba(0,217,255,0.4)' }} />
        </div>
      </div>
      <span
        className="font-mono text-[0.6rem] uppercase tracking-[0.2em]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Floating fragment ─────────────────────────────────────────────────────
function FloatingFragment({ text, index }: { text: string; index: number }) {
  const colors = [
    'rgb(var(--color-primary))',
    'rgb(var(--color-warning))',
    'rgb(var(--color-secondary))',
    'rgb(var(--color-accent))',
  ];
  const color = colors[index % colors.length];
  const left = `${4 + ((index * 19 + 7) % 82)}%`;
  const top = `${6 + ((index * 29 + 3) % 84)}%`;
  const duration = 4 + (index % 5) * 0.8;
  const delay = index * 0.35;

  return (
    <motion.div
      className="absolute font-mono text-[0.6rem] pointer-events-none select-none whitespace-nowrap"
      style={{ left, top, color, opacity: 0.18, zIndex: 4 }}
      animate={{ y: [0, -10, 0], opacity: [0.12, 0.28, 0.12] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {text}
    </motion.div>
  );
}

// ─── Network packet notification ──────────────────────────────────────────
function PacketNotification() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');

  const PACKETS = [
    'PKT_RECV: 0x4E5A00FF — VLN_CORE',
    'SYN: 192.168.vln.0 — HANDSHAKE OK',
    'UPLINK BURST: 2.4 Gbps — SUSTAINED',
    'AGENT_PING: J.LUCUS — ONLINE',
    'STREAM_ID: 0xAF2B — SECURED',
    'NODE_SYNC: 2847/2847 — COMPLETE',
  ];

  useEffect(() => {
    const show = () => {
      setMsg(PACKETS[Math.floor(Math.random() * PACKETS.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 2600);
    };
    show();
    const iv = setInterval(show, 4500 + Math.random() * 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-16 right-6 font-mono text-[0.6rem] px-3 py-1.5 rounded"
          style={{
            background: 'rgba(0,217,255,0.06)',
            border: '1px solid rgba(0,217,255,0.2)',
            color: 'rgb(var(--color-primary))',
            zIndex: 20,
          }}
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function VLNCountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);
  const [statusIdx, setStatusIdx] = useState(0);
  const [avatarErr, setAvatarErr] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const [pingMs] = useState(() => (Math.random() * 0.9 + 0.1).toFixed(2));
  const [randomSeed] = useState(() => Math.floor(Math.random() * 1000));

  // Countdown tick
  useEffect(() => {
    const iv = setInterval(() => {
      const t = calcTimeLeft();
      setTimeLeft(t);
      if (t.total === 0 && !redirected) {
        setRedirected(true);
        window.location.href = REDIRECT_URL;
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [redirected]);

  // Status message rotation
  useEffect(() => {
    const iv = setInterval(
      () => setStatusIdx(Math.floor(Math.random() * STATUS_MESSAGES.length)),
      2800
    );
    return () => clearInterval(iv);
  }, []);

  // Progress from Feb 22 (start) to LAUNCH_DATE
  const START_TS = new Date('2026-02-22T00:00:00Z').getTime();
  const totalMs = LAUNCH_DATE.getTime() - START_TS;
  const elapsed = Date.now() - START_TS;
  const progress = Math.min(100, Math.max(0, (elapsed / totalMs) * 100));

  const handleEnter = useCallback(() => {
    window.location.href = REDIRECT_URL;
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: 'rgb(0,0,0)', zIndex: 9999 }}
    >
      {/* ── Layers ── */}
      <MatrixRain />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: `
            linear-gradient(rgba(0,217,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Floating fragments */}
      {FLOATING_FRAGMENTS.map((f, i) => (
        <FloatingFragment key={f} text={f} index={i} />
      ))}

      {/* Scanline sweep */}
      <div className="scanline" style={{ zIndex: 5 }} />

      {/* Packet notifications */}
      <PacketNotification />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-8" style={{ zIndex: 10 }}>
        {/* Top HUD bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3"
          style={{
            borderBottom: '1px solid rgba(0,217,255,0.08)',
            background: 'rgba(0,0,0,0.6)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-[0.6rem] uppercase tracking-widest" style={{ color: 'rgba(0,217,255,0.5)' }}>
              SYSTEM://VLN.GG
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 font-mono text-[0.6rem]" style={{ color: 'rgba(0,217,255,0.35)' }}>
            <span>PING: {pingMs}ms</span>
            <span>SEED: 0x{randomSeed.toString(16).toUpperCase().padStart(3, '0')}</span>
            <span>ENC: AES-256-GCM</span>
          </div>
          <div className="font-mono text-[0.6rem]" style={{ color: 'rgba(0,217,255,0.4)' }}>
            {CORNER_COORDS[Math.floor(Date.now() / 10000) % CORNER_COORDS.length]}
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl"
        >
          {/* Terminal titlebar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl"
            style={{
              background: 'rgba(0,217,255,0.04)',
              border: '1px solid rgba(0,217,255,0.2)',
              borderBottom: 'none',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgb(var(--color-error))', opacity: 0.7 }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgb(var(--color-warning))', opacity: 0.7 }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgb(var(--color-success))', opacity: 0.7 }} />
            <span
              className="font-mono text-[0.6rem] ml-2 opacity-50"
              style={{ color: 'rgb(var(--color-primary))' }}
            >
              vln_launcher — bash — 80×24
            </span>
          </div>

          {/* Card body */}
          <div
            className="flex flex-col items-center gap-5 px-6 py-8 md:px-10 md:py-10 rounded-b-xl"
            style={{
              background: 'rgba(4,8,16,0.94)',
              border: '1px solid rgba(0,217,255,0.2)',
              backdropFilter: 'blur(24px)',
              boxShadow:
                '0 0 60px rgba(0,217,255,0.08), 0 0 120px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,217,255,0.02)',
            }}
          >
            {/* Avatar + identity */}
            <div className="flex flex-col items-center gap-3">
              {/* Rotating rings + avatar */}
              <div className="relative flex items-center justify-center w-28 h-28">
                {/* Outer slow ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: '110%',
                    height: '110%',
                    border: '1px solid rgba(0,217,255,0.25)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{ background: 'rgb(var(--color-primary))', boxShadow: 'var(--shadow-neon-primary)' }}
                  />
                </motion.div>

                {/* Inner counter-ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: '120%',
                    height: '120%',
                    border: '1px dashed rgba(255,184,0,0.3)',
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: 'rgb(var(--color-warning))', boxShadow: '0 0 6px rgb(var(--color-warning))' }}
                  />
                </motion.div>

                {/* Avatar */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(0,217,255,0.5)',
                    boxShadow: '0 0 20px rgba(0,217,255,0.25)',
                  }}
                >
                  {!avatarErr ? (
                    // Replace src with actual vln.gg/about avatar URL if known
                    <img
                      src={AVATAR_URL}
                      alt="J. Lucus"
                      className="w-full h-full object-cover"
                      onError={() => setAvatarErr(true)}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center font-mono font-black text-2xl"
                      style={{ background: 'rgba(0,217,255,0.08)', color: 'rgb(var(--color-primary))' }}
                    >
                      JL
                    </div>
                  )}
                </div>

                {/* Glow halo */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 0 30px rgba(0,217,255,0.35)' }}
                />
              </div>

              <div className="text-center space-y-0.5">
                <p
                  className="font-mono text-[0.6rem] uppercase tracking-[0.25em]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  AGENT PROFILE
                </p>
                <h2
                  className="font-mono text-lg font-bold"
                  style={{ color: 'rgb(var(--color-text-primary))' }}
                >
                  J. LUCUS
                </h2>
                <p
                  className="font-mono text-[0.65rem]"
                  style={{ color: 'rgba(0,217,255,0.55)' }}
                >
                  @4eckd — VLN.GG FOUNDER
                </p>
              </div>
            </div>

            {/* VLN logo + tagline */}
            <div className="text-center space-y-2">
              <h1
                className="font-mono font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter leading-none text-neon select-none"
              >
                <GlitchText text="VLN.GG" />
              </h1>
              <RandomTagline />
            </div>

            {/* Countdown tiles */}
            <div className="flex items-start gap-2 sm:gap-4">
              <DigitTile value={timeLeft.days} label="DAYS" />
              <span
                className="font-mono font-black text-4xl sm:text-5xl md:text-6xl mt-1 animate-blink"
                style={{ color: 'rgba(0,217,255,0.5)' }}
              >
                :
              </span>
              <DigitTile value={timeLeft.hours} label="HRS" />
              <span
                className="font-mono font-black text-4xl sm:text-5xl md:text-6xl mt-1 animate-blink"
                style={{ color: 'rgba(0,217,255,0.5)', animationDelay: '0.5s' }}
              >
                :
              </span>
              <DigitTile value={timeLeft.minutes} label="MIN" />
              <span
                className="font-mono font-black text-4xl sm:text-5xl md:text-6xl mt-1 animate-blink"
                style={{ color: 'rgba(0,217,255,0.5)', animationDelay: '0.25s' }}
              >
                :
              </span>
              <DigitTile value={timeLeft.seconds} label="SEC" />
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-1.5">
              <div
                className="flex justify-between font-mono text-[0.6rem] uppercase"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                <span>MISSION PROGRESS</span>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(0,217,255,0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-warning)), rgb(var(--color-secondary)))',
                    boxShadow: '0 0 8px rgba(0,217,255,0.6)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              {/* Segmented tick marks */}
              <div className="flex justify-between">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-px h-1"
                    style={{ background: 'rgba(0,217,255,0.2)' }}
                  />
                ))}
              </div>
            </div>

            {/* Status terminal */}
            <div
              className="w-full rounded px-3 py-2.5 min-h-[2.5rem] flex items-center gap-2"
              style={{
                background: 'rgba(0,217,255,0.03)',
                border: '1px solid rgba(0,217,255,0.1)',
              }}
            >
              <span
                className="text-[0.6rem] font-mono shrink-0"
                style={{ color: 'rgba(0,217,255,0.4)' }}
              >
                SYS
              </span>
              <div className="w-px h-3" style={{ background: 'rgba(0,217,255,0.2)' }} />
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-mono text-[0.65rem] flex-1"
                  style={{ color: 'rgba(0,217,255,0.65)' }}
                >
                  {STATUS_MESSAGES[statusIdx]}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    █
                  </motion.span>
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA button */}
            <motion.button
              onClick={handleEnter}
              className="w-full font-mono font-bold text-sm uppercase tracking-[0.2em] py-3.5 px-6 rounded-lg relative overflow-hidden"
              style={{
                background: 'rgba(0,217,255,0.08)',
                border: '1px solid rgba(0,217,255,0.35)',
                color: 'rgb(var(--color-primary))',
              }}
              whileHover={{
                background: 'rgba(0,217,255,0.16)',
                boxShadow: 'var(--shadow-neon-primary)',
                scale: 1.01,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              {/* Sweep shine on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(0,217,255,0.12) 50%, transparent 70%)',
                }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              ENTER VLN.GG →
            </motion.button>
          </div>
        </motion.div>

        {/* Footer sig */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
          className="absolute bottom-3 font-mono text-[0.55rem] uppercase tracking-widest text-center"
          style={{ color: 'rgb(var(--color-text-muted))' }}
        >
          JLUCUS.DEV · BUILT WITH PURPOSE · EST. 2026
        </motion.p>
      </div>
    </div>
  );
}
