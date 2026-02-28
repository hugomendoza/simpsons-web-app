'use client';

import { AnimatePresence } from 'framer-motion';

import { PageHeader } from '@/components/common/DetailHeader';
import { CharacterCard } from '@/components/common/EntityCard';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { InfiniteScrollTrigger } from '@/components/common/InfiniteScrollTrigger';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageTransition } from '@/components/custom/PageTransition';
import { END_EMOJIS,END_MESSAGES, LOADING_MESSAGES } from '@/constants/messages';
import { useCharacters } from '@/hooks/useSimpsonsApi';

export default function CharacterHomePage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useCharacters();

  const characters = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#ffde00] to-[#f58ea8] pt-24">
          <div className="container mx-auto px-4">
            <PageHeader emoji="👨‍👩‍👧‍👦" title="PERSONAJES" />
            <div className="flex min-h-[50vh] items-center justify-center">
              <LoadingSpinner message={LOADING_MESSAGES.characters} variant="comic" />
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  if (isError) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#ffde00] to-[#f58ea8] pt-24">
          <div className="container mx-auto px-4">
            <PageHeader emoji="👨‍👩‍👧‍👦" title="PERSONAJES" />
            <div className="flex min-h-[50vh] items-center justify-center">
              <ErrorDisplay
                title="¡D'oh! Algo salió mal"
                message={error?.message}
                emoji="🍩"
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
        <main className="min-h-screen bg-gradient-to-b from-[#ffde00] to-[#f58ea8] pt-24 pb-20">
          <div className="container mx-auto px-4">
            <PageHeader
              emoji="👨‍👩‍👧‍👦"
              title="PERSONAJES"
              subtitle="Conoce a todos los habitantes de Springfield"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {characters.map((character, index) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
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
              endMessage={END_MESSAGES.characters}
              endEmoji={END_EMOJIS.characters}
            />
          </div>
        </main>
      </PageTransition>
    </>
  );
}
