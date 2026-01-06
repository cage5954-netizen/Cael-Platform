import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Hero } from './components/Hero';
import { WorldBrowser } from './components/WorldBrowser';
import { WorldDetail } from './components/WorldDetail';
import { World } from './data/worlds';

type View = 'hero' | 'browser' | 'detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('hero');
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);

  const handleEnter = () => {
    setCurrentView('browser');
  };

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

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">
        {currentView === 'hero' && (
          <Hero key="hero" onEnter={handleEnter} />
        )}
        
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
