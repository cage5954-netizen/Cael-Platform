import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  return (
    <div className="bg-black text-white">
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
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

      <section className="bg-gradient-to-b from-black via-zinc-950 to-black py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <motion.div
              className="absolute -top-10 -left-6 h-40 w-40 rounded-full bg-white/5 blur-3xl"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-16 right-0 h-52 w-52 rounded-full bg-white/5 blur-3xl"
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <p className="text-gray-400 uppercase text-xs tracking-[0.35em]">Presence</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-white">
                The first Room is a place to arrive.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                Move through a space that holds identity over time. Rooms are persistent, owned by their creators, and
                meant to be inhabited.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="rounded-full border border-white/20 px-4 py-2">Rooms</span>
                <span className="rounded-full border border-white/20 px-4 py-2">Presence</span>
                <span className="rounded-full border border-white/20 px-4 py-2">Build</span>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-gray-200 text-lg">Enter a Room. Stay. Return.</p>
                <p className="text-gray-400 mt-2 text-sm">
                  Connection happens through presence, not performance.
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <p className="text-gray-200 text-lg">Rooms change without resetting.</p>
                <p className="text-gray-400 mt-2 text-sm">
                  A place can grow and keep its history intact.
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-gray-200 text-lg">Build with any tool.</p>
                <p className="text-gray-400 mt-2 text-sm">
                  The engine is optional. The Room is the identity.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
