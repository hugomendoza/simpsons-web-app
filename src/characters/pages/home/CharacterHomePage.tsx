'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { Navigation } from '@/components/custom/Navigation';
import { PageTransition } from '@/components/custom/PageTransition';
import { type Character, charactersData } from '@/mock/data.mock';

const ITEMS_PER_PAGE = 8;

export default function CharacterHomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMoreCharacters = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simular carga de datos
    setTimeout(() => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newCharacters = charactersData.slice(startIndex, endIndex);

      if (newCharacters.length === 0) {
        setHasMore(false);
      } else {
        setCharacters((prev) => [...prev, ...newCharacters]);
        setPage((prev) => prev + 1);
      }

      setLoading(false);
    }, 800);
  }, [page, loading, hasMore]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMoreCharacters();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          loadMoreCharacters();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMoreCharacters]);

  return (
    <>
      <Navigation />
      <PageTransition>
        <main className="min-h-screen pb-20">
          {/* Header */}
          <section className="bg-gradient-to-r from-primary to-secondary px-4 py-16">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mb-6 text-7xl"
              >
                👥
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-[family-name:var(--font-bangers)] mb-4 text-5xl text-primary-foreground md:text-6xl"
              >
                PERSONAJES
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-primary-foreground/90"
              >
                Conoce a todos los habitantes de Springfield
              </motion.p>
            </div>
          </section>

          {/* Characters Grid */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence>
                  {characters.map((character, index) => (
                    <motion.div
                      key={character.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <a href={`/characters/${character.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="comic-shadow group h-full overflow-hidden rounded-2xl border-4 border-foreground bg-card transition-all hover:comic-shadow-lg"
                        >
                          <div className="relative aspect-square overflow-hidden bg-primary/10">
                            <img
                              src={character.image || '/placeholder.svg'}
                              alt={character.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute right-2 top-2">
                              <span className="comic-shadow-sm rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                                {character.role}
                              </span>
                            </div>
                          </div>

                          <div className="p-4">
                            <h3 className="font-[family-name:var(--font-bangers)] mb-2 text-2xl text-foreground">
                              {character.name}
                            </h3>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {character.description}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs font-bold text-primary">
                                Ver más →
                              </span>
                              <span className="text-2xl">🎭</span>
                            </div>
                          </div>
                        </motion.div>
                      </a>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Loading indicator */}
              <div
                ref={observerTarget}
                className="mt-12 flex justify-center"
              >
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-primary-foreground"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="font-bold">
                      Cargando más personajes...
                    </span>
                  </motion.div>
                )}
                {!hasMore && characters.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="comic-shadow rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
                  >
                    ¡Has visto todos los personajes! 🎉
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
    </>
  );
}
