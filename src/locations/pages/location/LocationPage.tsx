'use client';

import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

import { DetailHeader } from '@/components/common/DetailHeader';
import { LocationCard } from '@/components/common/EntityCard';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageTransition } from '@/components/custom/PageTransition';
import { useLocation, useLocations } from '@/hooks/useSimpsonsApi';
import { getImageUrl } from '@/lib/simpsonsApi';
import type { ApiLocation } from '@/types';
import { getLocationEmoji } from '@/types';

export default function LocationPage() {
  const { id } = useParams();
  const locationId = Number.parseInt(id || '1', 10);
  const { data: location, isLoading, isError, error } = useLocation(locationId);
  const { data: locationsData } = useLocations();

  if (isLoading) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#88d498] to-[#78c7f0] pt-24">
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

  if (isError || !location) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#88d498] to-[#78c7f0] pt-24">
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

  const allLocations = locationsData?.pages.flatMap((page) => page.data) ?? [];
  const relatedLocations = allLocations
    .filter((l) => l.id !== location.id)
    .slice(0, 3);

  const emoji = getLocationEmoji(location.use);

  return (
    <>
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#88d498] to-[#78c7f0] pt-24 pb-20">
          <div className="container mx-auto px-4">
            <DetailHeader title="" showBackButton />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-3xl border-4 border-black shadow-[8px_8px_0_#1a1a2e]"
            >
              <div className="relative aspect-[21/9] overflow-hidden bg-gray-200">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={getImageUrl(location.image_path)}
                  alt={location.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4 inline-block rounded-full bg-[#78c7f0] border-[3px] border-black px-4 py-2 font-['Bangers'] text-sm text-black shadow-[3px_3px_0_#1a1a2e]"
                  >
                    {emoji} {location.use}
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-['Permanent_Marker'] text-5xl text-white md:text-6xl lg:text-7xl"
                  >
                    {location.name}
                  </motion.h1>
                </div>
              </div>
            </motion.div>
          </div>

          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="grid gap-8 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="rounded-2xl border-4 border-black bg-white p-8 shadow-[6px_6px_0_#1a1a2e]">
                    <h2 className="font-['Permanent_Marker'] mb-6 text-3xl text-black">
                      ACERCA DE ESTE LUGAR
                    </h2>
                    <p className="mb-6 font-['Albert_Sans'] text-lg leading-relaxed text-black/80">
                      Esta locación ha sido testigo de innumerables momentos memorables
                      en la historia de Los Simpson. Desde eventos cómicos hasta momentos
                      emotivos, {location.name} es un lugar emblemático que los fans
                      reconocen al instante.
                    </p>

                    <div className="rounded-xl border-[3px] border-black bg-[#fef3c7] p-6">
                      <h3 className="font-['Bangers'] mb-4 text-lg text-black">
                        📍 Información
                      </h3>
                      <p className="font-['Albert_Sans'] leading-relaxed text-black/80">
                        {location.town ? `Ciudad: ${location.town}` : 'Springfield'}
                        <br />
                        Tipo: {location.use}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="rounded-2xl border-4 border-black bg-[#ffde00] p-6 shadow-[6px_6px_0_#1a1a2e]"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white border-[3px] border-black">
                      <MapPin className="h-7 w-7 text-black" />
                    </div>
                    <h3 className="font-['Bangers'] mb-2 text-lg text-black">
                      Tipo de lugar
                    </h3>
                    <p className="font-['Albert_Sans'] text-black/80">
                      {location.use}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {relatedLocations.length > 0 && (
            <section className="px-4 py-12">
              <div className="container mx-auto">
                <h2 className="mb-8 text-center font-['Permanent_Marker'] text-4xl text-black">
                  MÁS LOCACIONES
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedLocations.map((relatedLocation, index) => (
                    <LocationCard
                      key={relatedLocation.id}
                      location={relatedLocation as ApiLocation}
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
