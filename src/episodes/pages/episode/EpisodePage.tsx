'use client';

import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, Film, Pen } from 'lucide-react';

import { DetailHeader } from '@/components/common/DetailHeader';
import { EpisodeCard } from '@/components/common/EntityCard';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageTransition } from '@/components/custom/PageTransition';
import { useEpisode, useEpisodes } from '@/hooks/useSimpsonsApi';
import { getImageUrl } from '@/lib/simpsonsApi';
import type { ApiEpisode } from '@/types';
import { formatSeasonEpisode,getSeasonColor } from '@/types';

export default function EpisodePage() {
  const { id } = useParams();
  const episodeId = Number.parseInt(id || '1', 10);
  const { data: episode, isLoading, isError, error } = useEpisode(episodeId);
  const { data: episodesData } = useEpisodes();

  if (isLoading) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#78c7f0] to-[#a55eea] pt-24">
          <div className="container mx-auto px-4">
            <DetailHeader title="" showBackButton />
            <div className="flex min-h-[50vh] items-center justify-center">
              <LoadingSpinner message="Cargando..." variant="comic" />
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  if (isError || !episode) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#78c7f0] to-[#a55eea] pt-24">
          <div className="container mx-auto px-4">
            <DetailHeader title="" showBackButton />
            <div className="flex min-h-[50vh] items-center justify-center">
              <ErrorDisplay
                title="¡D'oh! Error"
                message={error?.message}
                showBackButton
              />
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  const allEpisodes = episodesData?.pages.flatMap((page) => page.data) ?? [];
  const relatedEpisodes = allEpisodes
    .filter((e) => e.id !== episode.id)
    .slice(0, 4);

  const seasonColor = getSeasonColor(episode.season);
  const seasonEpisode = formatSeasonEpisode(episode.season, episode.episode_number);

  return (
    <>
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#78c7f0] to-[#a55eea] pt-24 pb-20">
          <div className="container mx-auto px-4">
            <DetailHeader title="" showBackButton />

            <div className="grid gap-8 lg:grid-cols-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="overflow-hidden rounded-3xl border-4 border-black shadow-[8px_8px_0_#1a1a2e]">
                  <div className="aspect-video overflow-hidden bg-white">
                    <motion.img
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      src={getImageUrl(episode.image_path)}
                      alt={episode.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 overflow-hidden rounded-2xl border-4 border-black bg-gradient-to-r from-[#ffde00] to-[#ff6b6b] p-6 text-center shadow-[6px_6px_0_#1a1a2e]"
                >
                  <div className="font-['Permanent_Marker'] text-4xl text-black">
                    TEMPORADA {episode.season}
                  </div>
                  <div className="mt-2 font-['Bangers'] text-2xl text-black/80">
                    Episodio {episode.episode_number}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-3"
              >
                <div className={`mb-4 inline-block rounded-full ${seasonColor.bg} border-[3px] border-black px-4 py-2 font-['Bangers'] text-sm text-black shadow-[3px_3px_0_#1a1a2e]`}>
                  {seasonEpisode}
                </div>

                <h1 className="font-['Permanent_Marker'] mb-6 text-4xl text-black md:text-5xl lg:text-6xl">
                  {episode.name}
                </h1>

                <p className="mb-8 text-xl font-['Albert_Sans'] leading-relaxed text-black/80">
                  {episode.synopsis}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 rounded-xl border-[3px] border-black bg-white p-5 shadow-[4px_4px_0_#1a1a2e]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffde00] border-[3px] border-black">
                      <Calendar className="h-7 w-7 text-black" />
                    </div>
                    <div>
                      <div className="text-xs font-['Bangers'] text-black/60">
                        Fecha de emisión
                      </div>
                      <div className="text-lg font-['Bangers'] text-black">
                        {episode.airdate || 'Desconocida'}
                      </div>
                    </div>
                  </motion.div>

                  {episode.director && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 rounded-xl border-[3px] border-black bg-white p-5 shadow-[4px_4px_0_#1a1a2e]"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#78c7f0] border-[3px] border-black">
                        <Film className="h-7 w-7 text-black" />
                      </div>
                      <div>
                        <div className="text-xs font-['Bangers'] text-black/60">
                          Director
                        </div>
                        <div className="text-lg font-['Bangers'] text-black">
                          {episode.director}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {episode.writer && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 rounded-xl border-[3px] border-black bg-white p-5 shadow-[4px_4px_0_#1a1a2e] sm:col-span-2"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f58ea8] border-[3px] border-black">
                        <Pen className="h-7 w-7 text-black" />
                      </div>
                      <div>
                        <div className="text-xs font-['Bangers'] text-black/60">
                          Guionista
                        </div>
                        <div className="text-lg font-['Bangers'] text-black">
                          {episode.writer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <section className="px-4 py-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0_#1a1a2e]"
              >
                <h2 className="font-['Permanent_Marker'] mb-6 text-3xl text-black md:text-4xl">
                  📺 SOBRE ESTE EPISODIO
                </h2>
                <p className="mb-6 font-['Albert_Sans'] text-lg leading-relaxed text-black/80">
                  Este episodio es considerado uno de los momentos más memorables de la serie.
                  Con su combinación única de humor, corazón y comentario social, captura
                  perfectamente lo que hace que Los Simpson sea tan especial después de más
                  de 35 años al aire.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Clásico', 'Comedia', 'Familia'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border-2 border-black bg-[#ffde00] px-4 py-2 font-['Bangers'] text-sm text-black shadow-[2px_2px_0_#1a1a2e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {relatedEpisodes.length > 0 && (
            <section className="px-4 py-12">
              <div className="container mx-auto">
                <h2 className="mb-8 text-center font-['Permanent_Marker'] text-4xl text-black">
                  MÁS EPISODIOS
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedEpisodes.map((relatedEpisode, index) => (
                    <EpisodeCard
                      key={relatedEpisode.id}
                      episode={relatedEpisode as ApiEpisode}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </PageTransition>
    </>
  );
}
