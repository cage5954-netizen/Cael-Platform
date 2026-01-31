import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

type IntroOverlayProps = {
  onEnterStart: () => void;   // start audio
  onExitComplete: () => void; // App flips introComplete=true (unmount overlay)
};

type Phase = 'loading' | 'ready' | 'exiting';

const EXIT_MS = 1100;

export function IntroOverlay({
  onEnterStart,
  onExitComplete,
}: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);

  const isReady = progress >= 100;

  // Fake cinematic loading progress
  useEffect(() => {
    if (phase !== 'loading') return;

    const id = window.setInterval(() => {
      setProgress((p) => {
        const bump = p < 55 ? 3 : p < 80 ? 2 : 1;
        return Math.min(100, p + bump);
      });
    }, 55);

    return () => window.clearInterval(id);
  }, [phase]);

  // When loading finishes → ready state
  useEffect(() => {
    if (isReady && phase === 'loading') {
      setPhase('ready');
    }
  }, [isReady, phase]);

  // Status line
  const statusText = useMemo(() => {
    if (phase === 'loading') return 'Initializing space.';
    if (phase === 'ready') return 'System ready.';
    return 'Entering...';
  }, [phase]);

  // Click Enter → fade out → unmount overlay
  const handleEnter = () => {
    if (phase !== 'ready') return;

    onEnterStart(); // start audio
    setPhase('exiting');

    // Guaranteed exit after fade duration
    window.setTimeout(() => {
      onExitComplete();
    }, EXIT_MS);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: 'easeInOut' }}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Ambient Oneirism-style bloom */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_55%)]" />

      <div className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-56 right-[-200px] h-[680px] w-[680px] rounded-full bg-white/5 blur-3xl" />

       
      <div className="relative grid h-full w-full place-items-center px-6">
        <div className="w-full max-w-[860px] text-center">
          {/* Label */}
          <p className="text-[11px] tracking-[0.65em] text-gray-400">
            LOADING
          </p>

          {/* Percentage */}
          <div className="mt-4 text-7xl md:text-8xl font-semibold tabular-nums">
            {Math.round(progress)}%
          </div>

          {/* Progress Line */}
          <div className="mx-auto mt-7 h-[3px] w-full bg-white/10">
            <div
              className="h-full bg-white/70"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status */}
          <p className="mt-4 text-sm text-gray-400">
            {statusText}
          </p>

          {/* Enter Button */}
          {phase === 'ready' && (
            <button
              type="button"
              onClick={handleEnter}
              className="mx-auto mt-10 rounded-full border border-white/10 bg-white/5 px-14 py-4 text-[11px] uppercase tracking-[0.35em] text-gray-200 backdrop-blur hover:bg-white/10"
            >
              Click to enter
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
