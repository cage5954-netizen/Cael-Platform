import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, User } from 'lucide-react';
import { worlds, World } from '../data/worlds';

interface WorldBrowserProps {
  onSelectWorld: (world: World) => void;
  onBack: () => void;
}

export function WorldBrowser({ onSelectWorld, onBack }: WorldBrowserProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <motion.button
            className="text-gray-400 hover:text-white mb-8 flex items-center gap-2"
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ← Back
          </motion.button>
          <motion.h1
            className="text-5xl md:text-6xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Available Rooms
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {worlds.length} Rooms ready to explore
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {worlds.map((world, index) => (
            <motion.div
              key={world.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectWorld(world)}
              whileHover={isReducedMotion ? undefined : { y: -6 }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden bg-zinc-950 mb-4 aspect-video rounded-2xl border border-white/10">
                <img
                  src={world.thumbnail}
                  alt={world.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isReducedMotion ? '' : 'group-hover:scale-[1.03]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.75),transparent_65%)] mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 rounded-2xl border border-white/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
                  {world.style === 'liminalChromatic' ? 'Liminal' : 'Void'}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h2 className="text-2xl group-hover:text-gray-200 transition-colors">
                  {world.title}
                </h2>
                <p className="text-gray-400">{world.subtitle}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {world.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {world.creator}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
