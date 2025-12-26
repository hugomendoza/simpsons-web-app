'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Loader2, MapPin, Navigation } from 'lucide-react';

import { PageTransition } from '@/components/custom/PageTransition';
import { locationsData } from '@/mock/data.mock';

const ITEMS_PER_PAGE = 6;

export default function LocationsHomePage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMoreLocations = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simular carga de datos
    setTimeout(() => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newLocations = locationsData.slice(startIndex, endIndex);

      if (newLocations.length === 0) {
        setHasMore(false);
      } else {
        setLocations([]);
        setPage((prev) => prev + 1);
      }

      setLoading(false);
    }, 800);
  }, [page, loading, hasMore]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMoreLocations();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          loadMoreLocations();
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
  }, [hasMore, loading, loadMoreLocations]);

  return (
    <>
      <Navigation />
      <PageTransition>
        <main className="min-h-screen pb-20">
          {/* Header */}
          <section className="bg-gradient-to-r from-secondary to-accent px-4 py-16">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mb-6 text-7xl"
              >
                🏙️
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-[family-name:var(--font-bangers)] mb-4 text-5xl text-secondary-foreground md:text-6xl"
              >
                LOCACIONES
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-secondary-foreground/90"
              >
                Explora los lugares más icónicos de Springfield
              </motion.p>
            </div>
          </section>

          {/* Locations Grid */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {locations.map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <Link href={`/locations/${1}`}>
                        <motion.div
                          whileHover={{ scale: 1.03, y: -8, rotate: 1 }}
                          whileTap={{ scale: 0.98 }}
                          className="comic-shadow group h-full overflow-hidden rounded-2xl border-4 border-foreground bg-card transition-all hover:comic-shadow-lg"
                        >
                          <div className="relative aspect-video overflow-hidden bg-secondary/10">
                            <img
                              src={'/placeholder.svg'}
                              alt={'dd'}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute left-2 top-2">
                              <span className="comic-shadow-sm flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
                                <MapPin className="h-4 w-4" />
                                {''}
                              </span>
                            </div>
                          </div>

                          <div className="p-5">
                            <h3 className="font-[family-name:var(--font-bangers)] mb-3 text-2xl text-foreground">
                              {'location.name'}
                            </h3>

                            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              {'location.description'}
                            </p>

                            <div className="mb-4 space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-bold text-primary">
                                  Dirección:
                                </span>
                                <span className="text-muted-foreground">
                                  {'location.address'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-bold text-primary">
                                  Dueño:
                                </span>
                                <span className="text-muted-foreground">
                                  {'location.owner'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t-2 border-border pt-3">
                              <span className="text-sm font-bold text-secondary">
                                Explorar →
                              </span>
                              <span className="text-2xl">🗺️</span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
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
                    className="flex items-center gap-3 rounded-full bg-secondary px-6 py-3 text-secondary-foreground"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="font-bold">
                      Cargando más locaciones...
                    </span>
                  </motion.div>
                )}
                {!hasMore && locations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="comic-shadow rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
                  >
                    ¡Has explorado todas las locaciones! 🎉
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
