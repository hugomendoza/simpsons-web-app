import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Link, Mic, Star } from 'lucide-react';

import { PageTransition } from '@/components/custom/PageTransition';
import { charactersData } from '@/mock/data.mock';

export default function CharacterPage() {
  const id = '1';
  const character = charactersData.find((c) => c.id === Number.parseInt(id));

  return (
    <>
      <PageTransition>
        <main className="min-h-screen pb-20">
          {/* Back Button */}
          <div className="container mx-auto px-4 pt-8">
            <Link href="/characters">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="comic-shadow flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-bold text-secondary-foreground transition-all hover:comic-shadow-lg"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver a Personajes
              </motion.button>
            </Link>
          </div>

          {/* Character Header */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="comic-shadow overflow-hidden rounded-3xl border-4 border-foreground"
                >
                  <div className="aspect-square overflow-hidden bg-primary/10">
                    <motion.img
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      src={character?.image || ''}
                      alt={character?.name || ''}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col justify-center"
                >
                  <div className="comic-shadow-sm mb-4 inline-block rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
                    {character?.role || ''}
                  </div>

                  <h1 className="font-[family-name:var(--font-bangers)] mb-6 text-5xl text-foreground md:text-6xl lg:text-7xl">
                    {character?.name || ''}
                  </h1>

                  <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                    {character?.description || ''}
                  </p>

                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="comic-shadow flex items-center gap-4 rounded-xl border-2 border-foreground bg-card p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                        <Calendar className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-muted-foreground">
                          Primera Aparición
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {character?.firstAppearance || ''}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="comic-shadow flex items-center gap-4 rounded-xl border-2 border-foreground bg-card p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                        <Mic className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-muted-foreground">
                          Actor de Voz
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {character?.voiceActor || ''}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Fun Facts */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="comic-shadow rounded-3xl border-4 border-foreground bg-gradient-to-r from-primary via-secondary to-accent p-8 md:p-12"
              >
                <div className="mb-6 flex items-center gap-3">
                  <Star className="h-8 w-8 text-primary-foreground" />
                  <h2 className="font-[family-name:var(--font-bangers)] text-3xl text-primary-foreground md:text-4xl">
                    DATOS CURIOSOS
                  </h2>
                </div>
                <p className="text-lg text-primary-foreground/90">
                  {character?.name || ''} es uno de los personajes más icónicos
                  de Springfield. Con más de 30 años en televisión, ha aparecido
                  en cientos de episodios y se ha convertido en un símbolo
                  cultural reconocido en todo el mundo.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Related Characters */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <h2 className="font-[family-name:var(--font-bangers)] mb-8 text-4xl text-foreground">
                MÁS PERSONAJES
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {charactersData
                  .filter((c) => c.id !== character?.id)
                  .slice(0, 4)
                  .map((relatedChar, index) => (
                    <motion.div
                      key={relatedChar.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/characters/${relatedChar.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="comic-shadow overflow-hidden rounded-2xl border-4 border-foreground bg-card"
                        >
                          <div className="relative aspect-square overflow-hidden bg-primary/10">
                            <img
                              src={relatedChar.image || '/placeholder.svg'}
                              alt={relatedChar.name}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-[family-name:var(--font-bangers)] text-xl text-foreground">
                              {relatedChar.name}
                            </h3>
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
