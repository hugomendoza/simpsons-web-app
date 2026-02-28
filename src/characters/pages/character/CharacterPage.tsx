'use client';

import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, Mic, Star } from 'lucide-react';

import { DetailHeader } from '@/components/common/DetailHeader';
import { CharacterCard } from '@/components/common/EntityCard';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageTransition } from '@/components/custom/PageTransition';
import { useCharacter, useCharacters } from '@/hooks/useSimpsonsApi';
import { getImageUrl } from '@/lib/simpsonsApi';
import type { ApiCharacter } from '@/types';
import { getCharacterStatusConfig } from '@/types';

export default function CharacterPage() {
  const { id } = useParams();
  const characterId = Number.parseInt(id || '1', 10);
  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useCharacter(characterId);
  const { data: charactersData } = useCharacters();

  if (isLoading) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#ffde00] to-[#f58ea8] pt-24">
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

  if (isError || !character) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#ffde00] to-[#f58ea8] pt-24">
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

  const relatedCharacters =
    charactersData?.pages
      .flatMap((page) => page.data)
      .filter((c) => c.id !== character.id)
      .slice(0, 4) ?? [];

  const statusConfig = getCharacterStatusConfig(
    character.status === 'Alive' ? 'Alive' : character.status === 'Deceased' ? 'Deceased' : 'Unknown'
  );

  return (
    <>
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-[#ffde00] to-[#f58ea8] pt-24 pb-20">
          <div className="container mx-auto px-4">
            <DetailHeader title="" showBackButton />

            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="overflow-hidden rounded-3xl border-4 border-black shadow-[8px_8px_0_#1a1a2e]"
              >
                <div className="aspect-square overflow-hidden bg-white">
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={getImageUrl(character.portrait_path)}
                    alt={character.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col justify-center"
              >
                <div className="mb-4 inline-block rounded-full bg-[#88d498] border-[3px] border-black px-4 py-2 font-['Bangers'] text-sm text-black shadow-[3px_3px_0_#1a1a2e]">
                  {statusConfig.emoji} {statusConfig.label}
                </div>

                <h1 className="font-['Permanent_Marker'] mb-6 text-5xl text-black md:text-6xl lg:text-7xl">
                  {character.name}
                </h1>

                <p className="mb-8 text-xl font-['Albert_Sans'] leading-relaxed text-black/80">
                  {character.occupation || 'Habitante de Springfield'}
                </p>

                <div className="space-y-4">
                  {character.age && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 rounded-xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_#1a1a2e]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffde00] border-2 border-black">
                        <Calendar className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <div className="text-sm font-['Bangers'] text-black/60">
                          EDAD
                        </div>
                        <div className="text-lg font-['Bangers'] text-black">
                          {character.age} años
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {character.gender && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 rounded-xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_#1a1a2e]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#78c7f0] border-2 border-black">
                        <Mic className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <div className="text-sm font-['Bangers'] text-black/60">
                          GÉNERO
                        </div>
                        <div className="text-lg font-['Bangers'] text-black">
                          {character.gender}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {character.phrases.length > 0 && (
            <section className="px-4 py-12">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-3xl border-4 border-black bg-gradient-to-r from-[#f58ea8] via-[#ffde00] to-[#78c7f0] p-8 md:p-12 shadow-[8px_8px_0_#1a1a2e]"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <Star className="h-8 w-8 text-black" />
                    <h2 className="font-['Permanent_Marker'] text-3xl text-black md:text-4xl">
                      FRASES CÉLEBRES
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {character.phrases.slice(0, 5).map((phrase, index) => (
                      <li
                        key={index}
                        className="text-lg font-['Albert_Sans'] text-black/80 italic bg-white/50 rounded-lg px-4 py-2 border-2 border-black"
                      >
                        "{phrase}"
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>
          )}

          {relatedCharacters.length > 0 && (
            <section className="px-4 py-12">
              <div className="container mx-auto">
                <h2 className="mb-8 text-center font-['Permanent_Marker'] text-4xl text-black">
                  MÁS PERSONAJES
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedCharacters.map((relatedChar, index) => (
                    <CharacterCard
                      key={relatedChar.id}
                      character={relatedChar as ApiCharacter}
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
