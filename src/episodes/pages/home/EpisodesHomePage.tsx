import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Loader2, Tv } from 'lucide-react';

import { PageTransition } from '@/components/custom/PageTransition';
import { type Episode, episodesData } from '@/mock/data.mock';

const ITEMS_PER_PAGE = 8;

export default function EpisodesHomePage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMoreEpisodes = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simular carga de datos
    setTimeout(() => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newEpisodes = episodesData.slice(startIndex, endIndex);

      if (newEpisodes.length === 0) {
        setHasMore(false);
      } else {
        setEpisodes((prev) => [...prev, ...newEpisodes]);
        setPage((prev) => prev + 1);
      }

      setLoading(false);
    }, 800);
  }, [page, loading, hasMore]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMoreEpisodes();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          loadMoreEpisodes();
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
  }, [hasMore, loading, loadMoreEpisodes]);

  return (
    <>
      <PageTransition>
        <main className="min-h-screen pb-20">
          {/* Header */}
          <section className="bg-gradient-to-r from-accent via-primary to-secondary px-4 py-16">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 10 }}
                className="mb-6 text-7xl"
              >
                📺
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-[family-name:var(--font-bangers)] mb-4 text-5xl text-accent-foreground md:text-6xl"
              >
                EPISODIOS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-accent-foreground/90"
              >
                Revive los mejores momentos de la serie
              </motion.p>
            </div>
          </section>

          {/* Episodes Grid */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence>
                  {episodes.map((episode, index) => (
                    <motion.div
                      key={episode.id}
                      initial={{ opacity: 0, y: 50, rotateX: -15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -50, rotateX: 15 }}
                      transition={{ delay: index * 0.03, type: 'spring' }}
                      layout
                    >
                      <a href={`/episodes/${episode.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -8 }}
                          whileTap={{ scale: 0.95 }}
                          className="comic-shadow group h-full overflow-hidden rounded-2xl border-4 border-foreground bg-card transition-all hover:comic-shadow-lg"
                        >
                          {/* Episode Image */}
                          <div className="relative aspect-video overflow-hidden bg-accent/10">
                            <img
                              src={episode.image || '/placeholder.svg'}
                              alt={episode.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute right-2 top-2">
                              <div className="comic-shadow-sm rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                                S{episode.season}E{episode.episode}
                              </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/20 group-hover:opacity-100">
                              <Tv className="h-12 w-12 text-background" />
                            </div>
                          </div>

                          {/* Episode Info */}
                          <div className="p-4">
                            <h3 className="font-[family-name:var(--font-bangers)] mb-2 line-clamp-2 text-xl text-foreground">
                              {episode.title}
                            </h3>

                            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              {episode.description}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{episode.airDate}</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t-2 border-border pt-3">
                              <span className="text-sm font-bold text-accent">
                                Ver detalles →
                              </span>
                              <span className="text-xl">🎬</span>
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
                    className="flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-accent-foreground"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="font-bold">Cargando más episodios...</span>
                  </motion.div>
                )}
                {!hasMore && episodes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="comic-shadow rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
                  >
                    ¡Has visto todos los episodios disponibles! 🎉
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
