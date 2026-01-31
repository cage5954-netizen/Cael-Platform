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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Ambient monochrome blooms (Hero-consistent) */}
      <motion.div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 22%, transparent 55%)',
        }}
        animate={
          isReducedMotion
            ? { opacity: 0.2, scale: 1 }
            : { opacity: [0.14, 0.22, 0.14], scale: [1, 1.03, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none fixed -left-52 top-10 h-[620px] w-[620px] rounded-full bg-white/6 blur-[190px]"
        animate={
          isReducedMotion
            ? { opacity: 0.16 }
            : { opacity: [0.10, 0.18, 0.12], x: [-10, 18, -6], y: [0, -10, 6] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none fixed -right-60 bottom-[-80px] h-[720px] w-[720px] rounded-full bg-white/6 blur-[210px]"
        animate={
          isReducedMotion
            ? { opacity: 0.14 }
            : { opacity: [0.08, 0.16, 0.10], x: [10, -14, 8], y: [12, -8, 8] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <motion.button
            type="button"
            onClick={onBack}
            className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 text-sm uppercase tracking-[0.25em]"
            initial={{ opacity: 0, x: -18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            ← Back
          </motion.button>

          <motion.p
            className="text-gray-400 uppercase text-xs tracking-[0.45em]"
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Rooms
          </motion.p>

          <motion.h1
            className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            Available Rooms
          </motion.h1>

          <motion.p
            className="mt-4 text-gray-400 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          >
            {worlds.length} Rooms ready to explore
          </motion.p>

          {/* soft rule */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {worlds.map((world, index) => (
            <motion.article
              key={world.id}
              onClick={() => onSelectWorld(world)}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: index * 0.06, ease: 'easeOut' }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                whileHover={
                  isReducedMotion
                    ? {}
                    : { y: -6, boxShadow: '0 24px 90px rgba(0,0,0,0.55)' }
                }
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* rim-light */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 opacity-70" />
                {/* subtle top sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent opacity-70" />
                {/* hover light spill */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={world.thumbnail}
                    alt={world.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  {/* vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  {/* hover wash */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white/95 transition-colors group-hover:text-white">
                    {world.title}
                  </h2>

                  <p className="mt-2 text-gray-400 leading-relaxed">
                    {world.subtitle}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="tracking-[0.08em]">{world.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="tracking-[0.08em]">{world.creator}</span>
                    </div>

                    <span className="ml-auto rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gray-400">
                      Enter
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
