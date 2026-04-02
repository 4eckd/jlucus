'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/constants';

// ─── Config ────────────────────────────────────────────────────
const REDIRECT_URL = 'https://vln.gg/about';
const TOTAL_SECONDS = 15;

const STATUS_LINES = [
  { prefix: '$', text: './launch_portfolio.sh --env=prod' },
  { prefix: '✓', text: 'build artifacts verified' },
  { prefix: '~', text: `redirect → ${REDIRECT_URL}` },
] as const;

const RECENT_ITEMS = [
  {
    label: 'VLN.GG',
    href: REDIRECT_URL,
    tag: 'LIVE',
    tagClass: 'recent-tag--live',
  },
  {
    label: 'jlucus.dev',
    href: SITE.url,
    tag: 'BUILDING',
    tagClass: 'recent-tag--building',
  },
  {
    label: '@4eckd',
    href: SITE.github,
    tag: 'OPEN',
    tagClass: 'recent-tag--open',
  },
] as const;

// ─── Matrix Rain ───────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Read design token colors at runtime — no hardcoded values
    const style = getComputedStyle(document.documentElement);
    const primary = style.getPropertyValue('--color-primary').trim();
    const bg = style.getPropertyValue('--color-dark-950').trim();
    const [pr, pg, pb] = primary.split(' ');
    const [br, bg2, bb] = bg.split(' ');

    const CHAR_W = 16;
    const CHARS = '01アイウエオカキクケコ<>{}[]|;:!/';
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / CHAR_W);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = `rgba(${br},${bg2},${bb},0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `13px "JetBrains Mono", monospace`;

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle =
          y < 1
            ? `rgba(${pr},${pg},${pb},0.92)`
            : `rgba(${pr},${pg},${pb},0.11)`;
        ctx.fillText(char, i * CHAR_W, y * CHAR_W);
        if (y * CHAR_W > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
    };

    const id = setInterval(draw, 50);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
  );
}

// ─── Avatar hex component ──────────────────────────────────────
function AvatarHex() {
  return (
    <div className="avatar-zone">
      <div className="avatar-frame">
        {/* Animated gradient border — scaled slightly outside image */}
        <div className="avatar-hex-bg" aria-hidden="true" />

        {/* Image — clipped to hex */}
        <div className="avatar-hex-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/avatar.png"
            alt="jlucus — developer avatar"
            className="avatar-img"
          />
        </div>

        {/* Periodic scan-line sweep overlay */}
        <div className="avatar-scan" aria-hidden="true" />
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────
export default function CountdownPage() {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [redirected, setRedirected] = useState(false);
  const [numKey, setNumKey] = useState(0);

  // How many status lines to reveal progressively
  const visibleLines = Math.min(
    Math.floor(
      ((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * STATUS_LINES.length
    ) + 1,
    STATUS_LINES.length
  );

  // Progress 0 → 100 as time elapses
  const progress = ((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * 100;

  const doRedirect = useCallback(() => {
    if (redirected) return;
    setRedirected(true);
    window.location.href = REDIRECT_URL;
  }, [redirected]);

  // Lock body scroll while overlay is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Countdown tick — each tick changes numKey to re-mount countdown-number,
  // which resets the glitch-tick CSS animation automatically
  useEffect(() => {
    if (redirected) return;
    if (seconds <= 0) {
      const t = setTimeout(() => {
        doRedirect();
      }, 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setSeconds((s) => s - 1);
      setNumKey((k) => k + 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [seconds, redirected, doRedirect]);

  const displaySecs = redirected ? '00' : String(seconds).padStart(2, '0');

  return (
    <div
      className="countdown-overlay"
      role="main"
      aria-label="Portfolio launching soon"
    >
      {/* ── Background layers ──────────────────────── */}
      <MatrixRain />
      <div className="bg-grid countdown-grid-overlay" aria-hidden="true" />
      <div className="countdown-vignette" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      {/* ── Shell ─────────────────────────────────── */}
      <div className="countdown-shell">
        {/* HUD bar */}
        <div className="hud-bar" role="banner">
          <div className="hud-badge">
            <span className="hud-dot hud-dot--pulse" />
            <span>SYS&nbsp;LIVE</span>
          </div>

          <div className="hud-badge hud-badge--dim">
            <span>jlucus.dev</span>
            <span className="hud-sep">·</span>
            <span>v2.0.0</span>
          </div>

          <div className="hud-badge">
            <span className="hud-dot hud-dot--accent" />
            <span>REDIRECT&nbsp;{redirected ? 'NOW' : `${seconds}s`}</span>
          </div>
        </div>

        {/* ── Hero center ────────────────────────── */}
        <main className="hero-center">
          {/* Avatar — visual anchor, appears first */}
          <AvatarHex />

          {/* Identity — cascades in after avatar */}
          <div className="hero-identity">
            <p className="identity-handle">@4eckd</p>
            <h1 className="identity-name">jlucus</h1>
            <p className="identity-title">Engineer · Builder · Architect</p>
            <p className="identity-tagline">
              professional design meets technical excellence
            </p>
          </div>

          {/* Countdown terminal — slides up */}
          <div
            className="countdown-terminal hero-countdown"
            role="log"
            aria-live="polite"
            aria-atomic="false"
          >
            {/* Terminal titlebar */}
            <div className="terminal-titlebar" aria-hidden="true">
              <span className="terminal-dot terminal-dot--close" />
              <span className="terminal-dot terminal-dot--min" />
              <span className="terminal-dot terminal-dot--max" />
              <span className="terminal-title">$ countdown.sh --redirect</span>
            </div>

            {/* Terminal body */}
            <div className="terminal-body terminal-body--compact">
              {/* Big glitching countdown number */}
              <div className="countdown-display">
                <span
                  key={numKey}
                  className="countdown-number"
                  aria-label={`${seconds} seconds remaining`}
                >
                  {displaySecs}
                </span>
                <span className="countdown-unit" aria-hidden="true">
                  S&nbsp;E&nbsp;C&nbsp;O&nbsp;N&nbsp;D&nbsp;S
                </span>
              </div>

              {/* Progress bar */}
              <div className="progress-section">
                <div
                  className="progress-track"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="progress-ticks" aria-hidden="true">
                  <span className="progress-tick">0</span>
                  <span className="progress-tick">5s</span>
                  <span className="progress-tick">10s</span>
                  <span className="progress-tick">15s</span>
                </div>
              </div>

              {/* Progressive status log */}
              <div className="status-log" aria-label="Boot status">
                {STATUS_LINES.slice(0, visibleLines).map((line, i) => {
                  const isActive = i === visibleLines - 1 && !redirected;
                  return (
                    <div
                      key={i}
                      className={`status-line${isActive ? 'status-line--active' : ''}`}
                    >
                      <span className="status-prefix">{line.prefix}</span>
                      <span>{line.text}</span>
                      {isActive && (
                        <span className="cursor-blink" aria-hidden="true">
                          _
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA group — three actions, staggered in */}
          <div className="cta-group">
            <a
              href={REDIRECT_URL}
              className="cta-btn cta-btn--primary"
              onClick={doRedirect}
              aria-label="Enter portfolio now"
            >
              <span>{redirected ? 'REDIRECTING…' : 'ENTER PORTFOLIO'}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>

            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="cta-btn--ghost"
              aria-label="GitHub profile"
            >
              <Github size={13} aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="cta-btn--ghost"
              aria-label="Send email"
            >
              <Mail size={13} aria-hidden="true" />
              <span>Connect</span>
            </a>
          </div>

          {/* Recent — horizontal pill row */}
          <nav className="recent-row" aria-label="Recent projects">
            {RECENT_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="recent-item"
              >
                <span className="recent-arrow" aria-hidden="true">
                  ▸
                </span>
                <span className="recent-text">{item.label}</span>
                <span className={`recent-tag ${item.tagClass}`}>
                  {item.tag}
                </span>
              </a>
            ))}
          </nav>
        </main>

        {/* Footer signature */}
        <footer className="footer-sig">
          <span>built by jlucus · 2026</span>
          <span>jlucus.dev</span>
          <span>{SITE.email}</span>
        </footer>
      </div>
    </div>
  );
}
