import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type IntroOverlayProps = {
  onEnterStart: () => void;   // start audio
  onExitComplete: () => void; // set introComplete in App (unmount overlay)
};

type Phase = 'loading' | 'ready' | 'exiting';

export function IntroOverlay({ onEnterStart, onExitComplete }: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);

  const isReady = progress >= 100;

  // Fake progress
  useEffect(() => {
    if (phase !== 'loading') return;

    const id = window.setInterval(() => {
      setProgress((p) => {
        // Ease-out: fast early, slows near end
        const bump = p < 55 ? 3 : p < 80 ? 2 : 1;
        return Math.min(100, p + bump);
      });
    }, 55);

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
        className="fixed inset-0 z-[9999] bg-black text-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        // block interaction behind it
        style={{ pointerEvents: 'auto' }}
        onAnimationComplete={(definition) => {
          // When we switch to exiting, the overlay will start exiting (fade out).
          // Once the exit finishes and the component is about to unmount, App will still be rendering it
          // until onExitComplete flips introComplete. We call onExitComplete AFTER the fade is done.
          if (phase === 'exiting' && definition === 'exit') {
            onExitComplete();
          }
        }}
      >
        {/* ambient vignette + bloom */}
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-56 right-[-200px] h-[680px] w-[680px] rounded-full bg-white/5 blur-3xl" />

        {/* ✅ TRUE CENTERING */}
        <div className="relative grid h-full w-full place-items-center px-6">
          <div className="w-full max-w-[820px] text-center">
            <p className="text-[11px] tracking-[0.6em] text-gray-400">LOADING</p>

            <div className="mt-4 text-7xl md:text-8xl font-semibold tabular-nums">
              {Math.round(progress)}%
            </div>

            <div className="mx-auto mt-7 h-[3px] w-full bg-white/10">
              <div
                className="h-full bg-white/70"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-sm text-gray-400">{statusText}</p>

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

        {/* When exiting, we trigger AnimatePresence exit by conditionally hiding content */}
        {phase === 'exiting' && (
          <motion.div
            // This invisible layer prevents click during exit and gives a subtle blur punch
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.0001 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        )}

        {/* IMPORTANT:
            We must actually remove this component from the tree for exit animation to run.
            That is handled by App: once onExitComplete() runs, App sets introComplete=true
            and stops rendering IntroOverlay entirely.
        */}
      </motion.div>
    </AnimatePresence>
  );
}

