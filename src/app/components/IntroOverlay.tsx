import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type IntroOverlayProps = {
  onEnterStart: () => void;      // start audio
  onExitComplete: () => void;    // set introComplete in App
};

type Phase = 'loading' | 'ready' | 'exiting';

export function IntroOverlay({ onEnterStart, onExitComplete }: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);

  const isReady = progress >= 100;

  // Fake progress (replace later with real asset preloads if you want)
  useEffect(() => {
    if (phase !== 'loading') return;

    const id = window.setInterval(() => {
      setProgress((p) => {
        // ease-out feel: slows near the end
        const bump = p < 70 ? 3 : p < 90 ? 2 : 1;
        return Math.min(100, p + bump);
      });
    }, 60);

    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (isReady && phase === 'loading') setPhase('ready');
  }, [isReady, phase]);

  const statusText = useMemo(() => {
    if (phase === 'loading') return 'Initializing space.';
    if (phase === 'ready') return 'System ready.';
    return 'Entering...';
  }, [phase]);

  const handleEnter = () => {
    if (phase !== 'ready') return;
    onEnterStart();
    setPhase('exiting');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        // ✅ THIS is what makes it a true overlay.
        className="fixed inset-0 z-[9999] bg-black text-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        // block interaction behind it
        style={{ pointerEvents: 'auto' }}
      >
        {/* subtle vignette */}
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="absolute top-10 left-0 right-0 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.5em] text-gray-400">LOADING</p>

          <div className="mt-2 text-4xl font-semibold tabular-nums">
            {Math.round(progress)}%
          </div>

          <div className="mt-4 h-[2px] w-[420px] max-w-[70vw] bg-white/10">
            <div
              className="h-full bg-white/60"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-xs text-gray-400">{statusText}</p>

          {phase === 'ready' && (
            <button
              type="button"
              onClick={handleEnter}
              className="mt-6 rounded-full border border-white/10 bg-white/5 px-10 py-3 text-[11px] uppercase tracking-[0.35em] text-gray-200 backdrop-blur hover:bg-white/10"
            >
              Click to enter
            </button>
          )}
        </div>

        {/* IMPORTANT: call onExitComplete only after exit finishes */}
        {phase === 'exiting' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              // triggers App to switch to main UI (IntroOverlay will unmount)
              onExitComplete();
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
