import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Clock, User, ChevronRight } from 'lucide-react';
import { World } from '../data/worlds';

interface WorldDetailProps {
  world: World;
  onClose: () => void;
}

export function WorldDetail({ world, onClose }: WorldDetailProps) {
  const [showProcess, setShowProcess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close button */}
      <button
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="min-h-screen">
        {/* Hero section with player */}
        <div className="relative h-screen flex items-center justify-center bg-zinc-950">
          <div className="absolute inset-0">
            <img
              src={world.thumbnail}
              alt={world.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <motion.h1
              className="text-6xl md:text-8xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {world.title}
            </motion.h1>
            
            <motion.p
              className="text-2xl text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {world.subtitle}
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-6 text-gray-400 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {world.duration}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {world.creator}
              </div>
            </motion.div>

            {!isPlaying ? (
              <motion.button
                className="group px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors text-lg inline-flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsPlaying(true)}
              >
                <Play className="w-5 h-5" />
                Enter World
              </motion.button>
            ) : (
              <motion.div
                className="w-full max-w-4xl aspect-video bg-zinc-900 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">
                    In a real implementation, the Unreal Engine world would load here
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-gray-500 text-sm mb-2">Scroll to explore the process</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronRight className="w-6 h-6 text-gray-500 rotate-90" />
            </motion.div>
          </motion.div>
        </div>

        {/* Description section */}
        <div className="bg-black py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-4xl text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              About This World
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {world.description}
            </motion.p>
          </div>
        </div>

        {/* Process section */}
        <div className="bg-zinc-950 py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl text-white mb-4">The Process</h2>
              <p className="text-gray-400 text-lg">
                How this world came to be
              </p>
            </motion.div>

            <div className="space-y-16">
              {world.process.map((step, index) => (
                <motion.div
                  key={index}
                  className="grid md:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Alternate layout */}
                  <div className={`${index % 2 === 1 && 'md:order-2'}`}>
                    {step.image ? (
                      <div className="aspect-video bg-zinc-900 overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
                        <div className="text-6xl text-zinc-700">{index + 1}</div>
                      </div>
                    )}
                  </div>

                  <div className={`${index % 2 === 1 && 'md:order-1'}`}>
                    <div className="text-sm text-gray-500 mb-3">{step.timestamp}</div>
                    <h3 className="text-3xl text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black py-16 px-6 text-center">
          <button
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors text-lg"
            onClick={onClose}
          >
            Back to Worlds
          </button>
        </div>
      </div>
    </motion.div>
  );
}
