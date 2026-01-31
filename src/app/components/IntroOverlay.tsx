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
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMounted]);

  // Cinematic loading progress (smooth + deterministic)
  useEffect(() => {
    if (!isMounted) return;

    let rafId = 0;
    const startTime = performance.now();
    const duration = 2800;

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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') handleEnter();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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

  if (!isMounted) return null;

  const overlay = (
    <div
      className={`${styles.overlay} ${styles.gate} ${styles.scanlines} ${isExiting ? styles.exiting : ''}`}
      aria-live="polite"
      // extra safety: force viewport sizing even if CSS gets weird
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Subtle bloom */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_55%)]" />

      <div className="relative z-10 w-full max-w-[860px] px-8 text-center">
        <p className="text-[11px] tracking-[0.65em] text-gray-400">LOADING</p>

        <div
          className={`mt-5 text-7xl md:text-8xl font-semibold tabular-nums ${!isReducedMotion ? styles.jitter : ''}`}
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

  // Portal prevents fixed-position bugs caused by transformed ancestors.
  return createPortal(overlay, document.body);
}
