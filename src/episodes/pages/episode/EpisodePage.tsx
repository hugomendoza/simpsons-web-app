import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Film, Link, Navigation, Pen } from 'lucide-react';

import { PageTransition } from '@/components/custom/PageTransition';
import { episodesData } from '@/mock/data.mock';

export default function EpisodePage() {
  const id = '1';
  const episode = episodesData.find((e) => e.id === Number.parseInt(id));

  return (
    <>
      <Navigation />
      <PageTransition>
        <main className="min-h-screen pb-20">
          {/* Back Button */}
          <div className="container mx-auto px-4 pt-8">
            <Link href="/episodes">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="comic-shadow flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground transition-all hover:comic-shadow-lg"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver a Episodios
              </motion.button>
            </Link>
          </div>

          {/* Episode Hero */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="grid gap-8 lg:grid-cols-5">
                {/* Episode Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="comic-shadow overflow-hidden rounded-3xl border-4 border-foreground">
                    <div className="relative aspect-video overflow-hidden bg-accent/10">
                      <motion.img
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        src={episode?.image || ''}
                        alt={episode?.title || ''}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Episode Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="comic-shadow mt-6 rounded-2xl border-4 border-foreground bg-gradient-to-r from-primary to-accent p-6 text-center"
                  >
                    <div className="font-[family-name:var(--font-bangers)] text-4xl text-primary-foreground">
                      TEMPORADA {episode?.season || ''}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-primary-foreground/90">
                      Episodio {episode?.episode || ''}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Episode Details */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-3"
                >
                  <div className="comic-shadow-sm mb-4 inline-block rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
                    Episodio {episode?.episode || ''}
                  </div>

                  <h1 className="font-[family-name:var(--font-bangers)] mb-6 text-4xl text-foreground md:text-5xl lg:text-6xl">
                    {episode?.title || ''}
                  </h1>

                  <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                    {episode?.description || ''}
                  </p>

                  {/* Info Cards */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="comic-shadow flex items-center gap-4 rounded-xl border-2 border-foreground bg-card p-5"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                        <Calendar className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-muted-foreground">
                          Fecha de emisión
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {episode?.airDate || ''}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="comic-shadow flex items-center gap-4 rounded-xl border-2 border-foreground bg-card p-5"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                        <Film className="h-7 w-7 text-secondary-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-muted-foreground">
                          Director
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {episode?.director || ''}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="comic-shadow flex items-center gap-4 rounded-xl border-2 border-foreground bg-card p-5 sm:col-span-2"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                        <Pen className="h-7 w-7 text-accent-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-muted-foreground">
                          Guionista
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {episode?.writer || ''}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Additional Content */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="comic-shadow rounded-3xl border-4 border-foreground bg-gradient-to-br from-primary via-secondary to-accent p-8 md:p-12"
              >
                <h2 className="font-[family-name:var(--font-bangers)] mb-6 text-3xl text-primary-foreground md:text-4xl">
                  SOBRE ESTE EPISODIO
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-primary-foreground/90">
                  Este episodio es considerado uno de los momentos más
                  memorables de la serie. Con su combinación única de humor,
                  corazón y comentario social, captura perfectamente lo que hace
                  que Los Simpson sea tan especial.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="comic-shadow-sm rounded-full bg-background px-4 py-2 text-sm font-bold text-foreground">
                    Clásico
                  </span>
                  <span className="comic-shadow-sm rounded-full bg-background px-4 py-2 text-sm font-bold text-foreground">
                    Comedia
                  </span>
                  <span className="comic-shadow-sm rounded-full bg-background px-4 py-2 text-sm font-bold text-foreground">
                    Familia
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* More Episodes */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <h2 className="font-[family-name:var(--font-bangers)] mb-8 text-4xl text-foreground">
                MÁS EPISODIOS
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {episodesData
                  .filter((e) => e.id !== episode?.id)
                  .slice(0, 4)
                  .map((relatedEpisode, index) => (
                    <motion.div
                      key={relatedEpisode.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/episodes/${relatedEpisode.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="comic-shadow overflow-hidden rounded-2xl border-4 border-foreground bg-card"
                        >
                          <div className="relative aspect-video overflow-hidden bg-accent/10">
                            <img
                              src={relatedEpisode.image || '/placeholder.svg'}
                              alt={relatedEpisode.title}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute right-2 top-2">
                              <div className="comic-shadow-sm rounded-full bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
                                S{relatedEpisode.season}E
                                {relatedEpisode.episode}
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-[family-name:var(--font-bangers)] mb-1 line-clamp-2 text-lg text-foreground">
                              {relatedEpisode.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {relatedEpisode.airDate}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
    </>
  );
}
