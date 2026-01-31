import { motion } from 'motion/react';

type HeroProps = {
  onEnter: () => void;
};

export function Hero({ onEnter }: HeroProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* background haze */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-240px] right-[-180px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-260px] left-[-180px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-24">
          <div className="max-w-3xl">
            <p className="text-gray-400 uppercase text-xs tracking-[0.35em]">
              Rooms as identity. Presence as value.
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight">
              Cael
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl">
              A rooms-based social platform. People express who they are by creating places
              others can enter and inhabit.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={onEnter}
                className="rounded-xl border border-white/10 bg-white text-black px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-white/90"
              >
                Enter
              </button>

              <span className="text-xs text-gray-500 uppercase tracking-[0.25em]">
                System online
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENCE SECTION (THIS IS YOUR CONFLICTED REGION, FIXED) */}
      <section className="relative bg-gradient-to-b from-black via-zinc-950 to-black py-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          {/* ambient blobs (kept) */}
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

          {/* main content (kept) */}
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div>
                <p className="text-gray-400 uppercase text-xs tracking-[0.35em]">
                  Presence
                </p>

                <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-white">
                  The first Room is a place to arrive.
                </h2>

                <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-2xl">
                  Move through a space that holds identity over time. Rooms are persistent, owned by
                  their creators, and meant to be inhabited.
                </p>
              </div>

              {/* tags row (single version; no duplicates) */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span className="rounded-full border border-white/20 px-4 py-2">Rooms</span>
                <span className="rounded-full border border-white/20 px-4 py-2">Presence</span>
                <span className="rounded-full border border-white/20 px-4 py-2">Build</span>
              </div>
            </div>

            {/* right column: minimal “card” to balance layout */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  What is a Room?
                </p>
                <p className="mt-3 text-gray-200 leading-relaxed">
                  A persistent space you curate over time — part gallery, part journal, part world.
                  Visitors don’t just “view”; they inhabit.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  Why it matters
                </p>
                <p className="mt-3 text-gray-200 leading-relaxed">
                  Presence compounds. Identity becomes legible through the places you maintain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Cael
          </p>
          <p className="text-xs text-gray-600">
            Rooms as identity. Presence as value.
          </p>
        </div>
      </footer>
    </main>
  );
}
