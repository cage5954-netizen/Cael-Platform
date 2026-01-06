import { motion } from 'motion/react';
import { Clock, User } from 'lucide-react';
import { worlds, World } from '../data/worlds';

interface WorldBrowserProps {
  onSelectWorld: (world: World) => void;
  onBack: () => void;
}

export function WorldBrowser({ onSelectWorld, onBack }: WorldBrowserProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
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
            Available Worlds
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {worlds.length} experiences ready to explore
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {worlds.map((world, index) => (
            <motion.div
              key={world.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectWorld(world)}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden bg-zinc-900 mb-4 aspect-video">
                <img
                  src={world.thumbnail}
                  alt={world.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h2 className="text-2xl group-hover:text-gray-300 transition-colors">
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
