'use client';

import { AnimatePresence } from 'framer-motion';

import { PageHeader } from '@/components/common/DetailHeader';
import { LocationCard } from '@/components/common/EntityCard';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { InfiniteScrollTrigger } from '@/components/common/InfiniteScrollTrigger';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageTransition } from '@/components/custom/PageTransition';
import { END_EMOJIS,END_MESSAGES, LOADING_MESSAGES } from '@/constants/messages';
import { useLocations } from '@/hooks/useSimpsonsApi';

export default function LocationsHomePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useLocations();

  const locations = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#88d498] to-[#78c7f0]/50 pt-24">
          <div className="container mx-auto px-4">
            <PageHeader emoji="🏘️" title="LOCACIONES" />
            <div className="flex min-h-[50vh] items-center justify-center">
              <LoadingSpinner message={LOADING_MESSAGES.locations} variant="comic" />
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  if (isError) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#88d498] to-[#78c7f0]/50 pt-24">
          <div className="container mx-auto px-4">
            <PageHeader emoji="🏘️" title="LOCACIONES" />
            <div className="flex min-h-[50vh] items-center justify-center">
              <ErrorDisplay
                title="¡D'oh! Algo salió mal"
                message={error?.message}
                emoji="🏘️"
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
        <main className="min-h-screen bg-gradient-to-b from-[#88d498] to-[#78c7f0]/50 pt-24 pb-20">
          <div className="container mx-auto px-4">
            <PageHeader
              emoji="🏘️"
              title="LOCACIONES"
              subtitle="Explora los lugares más icónicos de Springfield"
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {locations.map((location, index) => (
                  <LocationCard
                    key={location.id}
                    location={location}
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
              endMessage={END_MESSAGES.locations}
              endEmoji={END_EMOJIS.locations}
            />
          </div>
        </main>
      </PageTransition>
    </>
  );
}
