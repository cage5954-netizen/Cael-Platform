import { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    let rafId = 0;
    let startTime = performance.now();
    const duration = 3200 + Math.random() * 800;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const eased = Math.min(elapsed / duration, 1);
      const jitter = Math.random() > 0.92 ? Math.random() * 6 : 0;
      const nextValue = Math.min(100, Math.round(eased * 100 + jitter));

      setProgress((prev) => (nextValue > prev ? nextValue : prev));
      if (eased < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setIsComplete(true);
        setProgress(100);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isMounted]);

  useEffect(() => {
    if (!isComplete) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete]);

  const handleEnter = () => {
    if (isExiting) {
      return;
    }

    onEnterStart();
    setIsExiting(true);
    window.setTimeout(() => {
      setIsMounted(false);
      onExitComplete();
    }, EXIT_DURATION_MS);
  };

  const progressStyle = useMemo(
    () => ({
      width: `${progress}%`,
    }),
    [progress],
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`${styles.overlay} ${styles.gate} ${isExiting ? styles.exiting : ''}`} aria-live="polite">
      <div className="relative z-10 w-full max-w-lg px-8 text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-gray-500">Loading</div>
        <div
          className={`mt-6 text-6xl font-medium text-white ${styles.glitchText} ${
            !isReducedMotion ? styles.jitter : ''
          }`}
        >
          {progress}%
        </div>

        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-white/70 transition-[width] duration-300 ${styles.glow}`}
            style={progressStyle}
          />
        </div>

        <div className="mt-8 text-sm text-gray-400">
          {isComplete ? 'System ready.' : 'Initializing space.'}
        </div>

        {isComplete && (
          <button
            type="button"
            className="mt-6 w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
            onClick={handleEnter}
          >
            CLICK TO ENTER
          </button>
        )}
      </div>
    </div>
  );
}
