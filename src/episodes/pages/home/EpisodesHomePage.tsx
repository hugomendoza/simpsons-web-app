'use client';

import { AnimatePresence } from 'framer-motion';

import { PageHeader } from '@/components/common/DetailHeader';
import { EpisodeCard } from '@/components/common/EntityCard';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { InfiniteScrollTrigger } from '@/components/common/InfiniteScrollTrigger';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageTransition } from '@/components/custom/PageTransition';
import { END_EMOJIS,END_MESSAGES, LOADING_MESSAGES } from '@/constants/messages';
import { useEpisodes } from '@/hooks/useSimpsonsApi';

export default function EpisodesHomePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useEpisodes();

  const episodes = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#78c7f0] to-[#a55eea]/40 pt-24">
          <div className="container mx-auto px-4">
            <PageHeader emoji="📺" title="EPISODIOS" />
            <div className="flex min-h-[50vh] items-center justify-center">
              <LoadingSpinner message={LOADING_MESSAGES.episodes} variant="comic" />
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  if (isError) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#78c7f0] to-[#a55eea]/40 pt-24">
          <div className="container mx-auto px-4">
            <PageHeader emoji="📺" title="EPISODIOS" />
            <div className="flex min-h-[50vh] items-center justify-center">
              <ErrorDisplay
                title="¡D'oh! Algo salió mal"
                message={error?.message}
                emoji="📺"
              />
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <>
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#78c7f0] to-[#a55eea]/40 pt-24 pb-20">
          <div className="container mx-auto px-4">
            <PageHeader
              emoji="📺"
              title="EPISODIOS"
              subtitle="Revive los mejores momentos de la serie"
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence>
                {episodes.map((episode, index) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>

            <InfiniteScrollTrigger
              hasMore={hasNextPage}
              isLoading={isFetchingNextPage}
              onLoadMore={fetchNextPage}
              loadingMessage="Cargando más..."
              endMessage={END_MESSAGES.episodes}
              endEmoji={END_EMOJIS.episodes}
            />
          </div>
        </main>
      </PageTransition>
    </>
  );
}
