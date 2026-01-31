import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Hero } from './components/Hero';
import { IntroOverlay } from './components/IntroOverlay';
import { WorldBrowser } from './components/WorldBrowser';
import { WorldDetail } from './components/WorldDetail';
import { World } from './data/worlds';

type View = 'hero' | 'browser' | 'detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('hero');
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);

  // Intro gate: if false, NOTHING else should render.
  const [introComplete, setIntroComplete] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const storedMute = localStorage.getItem('cael-muted');
    if (storedMute) setIsMuted(storedMute === 'true');

    const hasVisited = sessionStorage.getItem('cael-intro-complete') === 'true';
    setIntroComplete(hasVisited);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.muted = isMuted;
    }
    localStorage.setItem('cael-muted', String(isMuted));
  }, [isMuted]);

  // Called when user clicks "Enter" (start intro exit + audio)
  const handleIntroEnterStart = () => {
    if (audioRef.current && !isMuted) {
      void audioRef.current.play().catch(() => undefined);
    }
  };

  // Called after overlay exit animation fully completes (overlay will unmount on next render)
  const handleIntroExitComplete = () => {
    sessionStorage.setItem('cael-intro-complete', 'true');
    setIntroComplete(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  // App navigation
  const handleEnter = () => setCurrentView('browser');

  const handleSelectWorld = (world: World) => {
    setSelectedWorld(world);
    setCurrentView('detail');
  };

  const handleBack = () => {
    if (currentView === 'detail') {
      setCurrentView('browser');
      setSelectedWorld(null);
    } else {
      setCurrentView('hero');
    }
  };

  const handleToggleMute = () => setIsMuted((prev) => !prev);

  // ✅ HARD GATE: intro is exclusive; app UI cannot coexist.
  if (!introComplete) {
    return (
      <div className="size-full">
        <IntroOverlay
          onEnterStart={handleIntroEnterStart}
          onExitComplete={handleIntroExitComplete}
        />
        <audio ref={audioRef} src="/audio/ambient-loop.mp3" loop />
      </div>
    );
  }

  return (
    <div className="size-full">
      <button
        type="button"
        onClick={handleToggleMute}
        className="fixed top-6 right-6 z-50 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-gray-200 backdrop-blur hover:bg-black/60"
        aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
      >
        {isMuted ? 'Muted' : 'Sound'}
      </button>

      <audio ref={audioRef} src="/audio/ambient-loop.mp3" loop />

      <AnimatePresence mode="wait">
        {currentView === 'hero' && <Hero key="hero" onEnter={handleEnter} />}

        {currentView === 'browser' && (
          <WorldBrowser
            key="browser"
            onSelectWorld={handleSelectWorld}
            onBack={handleBack}
          />
        )}

        {currentView === 'detail' && selectedWorld && (
          <WorldDetail
            key="detail"
            world={selectedWorld}
            onClose={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
