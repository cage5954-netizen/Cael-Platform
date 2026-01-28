import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './IntroGate.module.css';

interface IntroGateProps {
  onEnterStart: () => void;
  onEnterComplete: () => void;
}

export function IntroGate({ onEnterStart, onEnterComplete }: IntroGateProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }

    return undefined;
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
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
  }, [isVisible]);

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
    onEnterStart();
    setIsVisible(false);
  };

  const progressStyle = useMemo(
    () => ({
      width: `${progress}%`,
    }),
    [progress],
  );

  return (
    <AnimatePresence onExitComplete={onEnterComplete}>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-[80] flex items-center justify-center bg-black text-white ${styles.gate} ${styles.scanlines}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="relative z-10 w-full max-w-lg px-8 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
