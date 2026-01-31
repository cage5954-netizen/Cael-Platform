import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './IntroOverlay.module.css';

interface IntroOverlayProps {
  onEnterStart: () => void;
  onExitComplete: () => void;
}

const EXIT_DURATION_MS = 600;

export function IntroOverlay({ onEnterStart, onExitComplete }: IntroOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  // Ensure we only portal on client
  useEffect(() => {
    setPortalReady(true);
  }, []);

  // Reduced motion support
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  // Lock scroll while overlay is mounted
  useEffect(() => {
    if (!isMounted) return;

    const prevOverflow = document.body.style.overflow;
    const prevBg = document.body.style.background;

    document.body.style.overflow = 'hidden';
    // Prevent any white flash behind overlay
    document.body.style.background = '#000';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.background = prevBg;
    };
  }, [isMounted]);

  // Cinematic loading progress (smooth + deterministic)
  useEffect(() => {
    if (!isMounted) return;

    let rafId = 0;
    const startTime = performance.now();
    const duration = 2800; // fixed duration for consistency

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Ease-out curve
      const eased = 1 - Math.pow(1 - t, 3);
      const nextValue = Math.round(eased * 100);

      setProgress(nextValue);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setIsComplete(true);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isMounted]);

  // Enter key support once ready
  useEffect(() => {
    if (!isComplete) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') handleEnter();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, isExiting]);

  const handleEnter = () => {
    if (!isComplete || isExiting) return;

    onEnterStart();
    setIsExiting(true);

    window.setTimeout(() => {
      setIsMounted(false);
      onExitComplete();
    }, EXIT_DURATION_MS);
  };

  const progressStyle = useMemo(() => ({ width: `${progress}%` }), [progress]);

  if (!isMounted || !portalReady) return null;

  const node = (
    <div
      className={`${styles.overlay} ${styles.gate} ${isExiting ? styles.exiting : ''}`}
      aria-live="polite"
      role="dialog"
      aria-modal="true"
    >
      {/* Subtle bloom only */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_55%)]" />

      <div className="relative z-10 w-full max-w-[860px] px-8 text-center">
        <p className="text-[11px] tracking-[0.65em] text-gray-400">LOADING</p>

        <div
          className={`mt-5 text-7xl md:text-8xl font-semibold tabular-nums ${
            !isReducedMotion ? styles.jitter : ''
          }`}
        >
          {progress}%
        </div>

        <div className="mx-auto mt-8 h-[3px] w-full bg-white/10 overflow-hidden">
          <div
            className={`h-full bg-white/70 transition-[width] duration-200 ${styles.glow}`}
            style={progressStyle}
          />
        </div>

        <p className="mt-5 text-sm text-gray-400">
          {isComplete ? 'System ready.' : 'Initializing space.'}
        </p>

        {isComplete && (
          <button
            type="button"
            onClick={handleEnter}
            className="mx-auto mt-10 rounded-full border border-white/10 bg-white/5 px-14 py-4 text-[11px] uppercase tracking-[0.35em] text-gray-200 backdrop-blur hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
          >
            Click to enter
          </button>
        )}
      </div>
    </div>
  );

  // Portal to body so "fixed" can’t be clipped by transforms higher up
  return createPortal(node, document.body);
}
