import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, Play, Clock, User, ChevronDown } from 'lucide-react';
import { World } from '../data/worlds';

interface WorldDetailProps {
  world: World;
  onClose: () => void;
}

export function WorldDetail({ world, onClose }: WorldDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black text-white overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ambient blooms (Hero-consistent) */}
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
        className="pointer-events-none fixed -left-56 top-10 h-[640px] w-[640px] rounded-full bg-white/6 blur-[200px]"
        animate={
          isReducedMotion
            ? { opacity: 0.16 }
            : { opacity: [0.10, 0.18, 0.12], x: [-10, 18, -6], y: [0, -10, 6] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none fixed -right-64 bottom-[-90px] h-[760px] w-[760px] rounded-full bg-white/6 blur-[220px]"
        animate={
          isReducedMotion
            ? { opacity: 0.14 }
            : { opacity: [0.08, 0.16, 0.10], x: [10, -14, 8], y: [12, -8, 8] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-gray-200 backdrop-blur hover:bg-black/60"
        aria-label="Close room details"
      >
        <span className="inline-flex items-center gap-2">
          <X className="h-4 w-4" />
          Close
        </span>
      </button>

      {/* HERO HEADER */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* background image wash */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src={world.thumbnail}
            alt={world.title}
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/75 to-black" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
          <motion.p
            className="text-gray-400 uppercase text-xs tracking-[0.45em]"
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Room
          </motion.p>

          <motion.h1
            className="mt-5 text-5xl md:text-7xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, ease: 'easeOut' }}
          >
            {world.title}
          </motion.h1>

          <motion.p
            className="mt-5 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.12, ease: 'easeOut' }}
          >
            {world.subtitle}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="tracking-[0.08em]">{world.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="tracking-[0.08em]">{world.creator}</span>
            </div>
          </motion.div>

          {/* Enter / Player */}
          <div className="mt-10">
            {!isPlaying ? (
              <motion.button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="rounded-xl border border-white/10 bg-white text-black px-7 py-3.5 text-sm uppercase tracking-[0.25em] hover:bg-white/90 inline-flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.32, ease: 'easeOut' }}
              >
                <Play className="h-4 w-4" />
                Enter Room
              </motion.button>
            ) : (
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                {/* rim-light */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 opacity-70" />
                {/* subtle top sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent opacity-70" />

                <div className="aspect-video grid place-items-center p-10">
                  <div className="text-center">
                    <div className="mx-auto mb-5 h-12 w-12 rounded-full border-2 border-white/15 border-t-white/70 animate-spin" />
                    <p className="text-sm text-gray-400">
                      Room runtime would mount here in a real implementation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Scroll cue */}
          <motion.div
            className="mt-14 flex items-center gap-3 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            <span className="text-xs uppercase tracking-[0.25em]">
              Scroll
            </span>
            <motion.div
              animate={isReducedMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.div>

          {/* soft rule */}
          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.p
            className="text-gray-400 uppercase text-xs tracking-[0.45em]"
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            About
          </motion.p>

          <motion.h2
            className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            About this Room
          </motion.h2>

          <motion.p
            className="mt-6 text-lg text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
          >
            {world.description}
          </motion.p>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.p
            className="text-gray-400 uppercase text-xs tracking-[0.45em]"
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Process
          </motion.p>

          <motion.h2
            className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            How this Room came to be
          </motion.h2>

          <div className="mt-12 space-y-10">
            {world.process.map((step, index) => (
              <motion.div
                key={`${step.title}-${index}`}
                className="grid gap-8 md:grid-cols-2 items-start"
                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.85, delay: index * 0.06, ease: 'easeOut' }}
              >
                {/* Media */}
                <div className={index % 2 === 1 ? 'md:order-2' : undefined}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 opacity-70" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent opacity-70" />

                    {step.image ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.70)]" />
                      </div>
                    ) : (
                      <div className="aspect-video grid place-items-center">
                        <div className="text-6xl text-white/10 font-semibold tabular-nums">
                          {index + 1}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Copy */}
                <div className={index % 2 === 1 ? 'md:order-1' : undefined}>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                    {step.timestamp}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white/95">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white text-black px-7 py-3.5 text-sm uppercase tracking-[0.25em] hover:bg-white/90"
          >
            Back to Rooms
          </button>
        </div>
      </section>
    </motion.div>
  );
}
