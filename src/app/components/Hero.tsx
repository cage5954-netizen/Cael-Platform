import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type HeroProps = {
  onEnter: () => void;
};

export function Hero({ onEnter }: HeroProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* ambient radial light (monochrome, no noise) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 22%, transparent 55%)',
          }}
          animate={
            isReducedMotion
              ? { opacity: 0.2, scale: 1 }
              : { opacity: [0.16, 0.22, 0.16], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* secondary bloom */}
        <motion.div
          className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-white/6 blur-[160px]"
          animate={
            isReducedMotion
              ? { opacity: 0.18 }
              : { opacity: [0.10, 0.20, 0.12], x: [-10, 18, -6], y: [0, -10, 6] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -right-48 bottom-[-60px] h-[640px] w-[640px] rounded-full bg-white/6 blur-[190px]"
          animate={
            isReducedMotion
              ? { opacity: 0.16 }
              : { opacity: [0.08, 0.18, 0.10], x: [10, -14, 8], y: [12, -8, 8] }
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.p
            className="text-gray-400 uppercase text-xs tracking-[0.45em]"
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            Rooms as identity. Presence as value.
          </motion.p>

          <motion.h1
            className="mt-6 text-7xl md:text-9xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.08, ease: 'easeOut' }}
          >
            Cael
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.22, ease: 'easeOut' }}
          >
            A rooms-based social platform. People express who they are by creating places others can enter and inhabit.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={onEnter}
              className="rounded-xl border border-white/10 bg-white text-black px-7 py-3.5 text-sm uppercase tracking-[0.25em] hover:bg-white/90"
            >
              Enter
            </button>

            <span className="text-xs text-gray-500 uppercase tracking-[0.25em]">
              System online
            </span>
          </motion.div>
        </div>
      </section>

      {/* PRESENCE */}
      <section className="relative overflow-hidden py-28">
        {/* subtle background blooms */}
        <motion.div
          className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-white/5 blur-[140px]"
          animate={
            isReducedMotion
              ? { opacity: 0.16 }
              : { opacity: [0.10, 0.18, 0.12], x: [-10, 18, -6], y: [0, -10, 6] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-white/6 blur-[160px]"
          animate={
            isReducedMotion
              ? { opacity: 0.14 }
              : { opacity: [0.08, 0.16, 0.10], x: [6, -12, 8], y: [8, -6, 4] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-start">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <p className="text-gray-400 uppercase text-xs tracking-[0.45em]">
                Presence
              </p>

              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
                The first Room is
                <span className="block text-white/80">a place to arrive.</span>
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                Move through a space that holds identity over time. Rooms are persistent, owned by their creators, and
                meant to be inhabited.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['Rooms', 'Presence', 'Build'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs tracking-[0.18em] text-gray-300 backdrop-blur hover:bg-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* soft rule (no harsh divider) */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: 'Enter a Room. Stay. Return.',
                  body: 'Connection happens through presence, not performance.',
                },
                {
                  title: 'Rooms change without resetting.',
                  body: 'A place can grow and keep its history intact.',
                },
                {
                  title: 'Build with any tool.',
                  body: 'The engine is optional. The Room is the identity.',
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-6 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  whileHover={
                    isReducedMotion
                      ? { y: 0 }
                      : { y: -6, boxShadow: '0 24px 80px rgba(0, 0, 0, 0.45)' }
                  }
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.75, delay: index * 0.08, ease: 'easeOut' }}
                >
                  {/* rim-light */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 opacity-70" />
                  {/* “light spill” */}
                  <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <p className="text-gray-100 text-lg">{card.title}</p>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Cael</p>
          <p className="text-xs text-gray-600">Rooms as identity. Presence as value.</p>
        </div>
      </footer>
    </main>
  );
}
