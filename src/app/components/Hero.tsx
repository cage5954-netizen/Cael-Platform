import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="bg-black text-white">
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          }}
          animate={
            isReducedMotion
              ? { scale: 1, opacity: 0.1 }
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-7xl md:text-9xl mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Cael
          </motion.h1>

          <motion.div
            className="space-y-5 text-xl md:text-2xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p>Rooms as identity.</p>
            <p>Presence as value.</p>
            <p className="text-base md:text-lg text-gray-400 mt-8 max-w-2xl mx-auto">
              Cael is a rooms-based social platform. People express who they are by creating places others can enter
              and inhabit.
            </p>
          </motion.div>

          <motion.button
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            onClick={onEnter}
          >
            Enter
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </section>

      <section className="relative overflow-hidden py-28">
        <motion.div
          className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-white/5 blur-[140px]"
          animate={
            isReducedMotion
              ? { opacity: 0.2 }
              : { opacity: [0.15, 0.28, 0.18], x: [-10, 18, -6], y: [0, -10, 6] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-white/6 blur-[160px]"
          animate={
            isReducedMotion
              ? { opacity: 0.18 }
              : { opacity: [0.1, 0.22, 0.14], x: [6, -12, 8], y: [8, -6, 4] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <p className="text-gray-400 uppercase text-xs tracking-[0.35em]">Presence</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                The first Room is a place to arrive.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                Move through a space that holds identity over time. Rooms are persistent, owned by their creators, and
                meant to be inhabited.
              </p>
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
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/6 p-6 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  whileHover={
                    isReducedMotion
                      ? { y: 0 }
                      : { y: -6, boxShadow: '0 24px 80px rgba(0, 0, 0, 0.45)' }
                  }
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 opacity-70" />
                  <div className="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="text-gray-200 text-lg">{card.title}</p>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
