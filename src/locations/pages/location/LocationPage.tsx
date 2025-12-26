import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Link,
  MapPin,
  Navigation,
  User,
} from 'lucide-react';

import { PageTransition } from '@/components/custom/PageTransition';
import { locationsData } from '@/mock/data.mock';

export default function LocationPage() {
  const id = '1';
  const location = locationsData.find((l) => l.id === Number.parseInt(id));

  return (
    <>
      <Navigation />
      <PageTransition>
        <main className="min-h-screen pb-20">
          {/* Back Button */}
          <div className="container mx-auto px-4 pt-8">
            <Link href="/locations">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="comic-shadow flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-bold text-secondary-foreground transition-all hover:comic-shadow-lg"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver a Locaciones
              </motion.button>
            </Link>
          </div>

          {/* Location Hero */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="comic-shadow overflow-hidden rounded-3xl border-4 border-foreground"
              >
                <div className="relative aspect-[21/9] overflow-hidden bg-secondary/10">
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={location?.image || ''}
                    alt={location?.name || ''}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="comic-shadow-sm mb-4 inline-block rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"
                    >
                      {location?.type || ''}
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-[family-name:var(--font-bangers)] text-5xl text-background md:text-6xl lg:text-7xl"
                    >
                      {location?.name}
                    </motion.h1>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Location Details */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Info */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="comic-shadow rounded-2xl border-4 border-foreground bg-card p-8">
                    <h2 className="font-[family-name:var(--font-bangers)] mb-6 text-3xl text-foreground">
                      ACERCA DE ESTE LUGAR
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                      {location?.description || ''}
                    </p>

                    <div className="comic-shadow rounded-xl border-2 border-border bg-muted p-6">
                      <h3 className="mb-4 font-bold text-foreground">
                        Información adicional
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        Esta locación ha sido testigo de innumerables momentos
                        memorables en la historia de Los Simpson. Desde eventos
                        cómicos hasta momentos emotivos, {location?.name || ''}{' '}
                        es un lugar emblemático que los fans reconocen al
                        instante.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Side Info Cards */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="comic-shadow rounded-2xl border-4 border-foreground bg-primary p-6"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground">
                      <MapPin className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 font-bold text-primary-foreground">
                      Dirección
                    </h3>
                    <p className="text-primary-foreground/90">
                      {location?.address || ''}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="comic-shadow rounded-2xl border-4 border-foreground bg-secondary p-6"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-foreground">
                      <User className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="mb-2 font-bold text-secondary-foreground">
                      Propietario
                    </h3>
                    <p className="text-secondary-foreground/90">
                      {location?.owner || ''}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="comic-shadow rounded-2xl border-4 border-foreground bg-accent p-6"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-foreground">
                      <Building2 className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="mb-2 font-bold text-accent-foreground">
                      Tipo
                    </h3>
                    <p className="text-accent-foreground/90">
                      {location?.type || ''}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* More Locations */}
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <h2 className="font-[family-name:var(--font-bangers)] mb-8 text-4xl text-foreground">
                MÁS LOCACIONES
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {locationsData
                  .filter((l) => l.id !== location?.id)
                  .slice(0, 3)
                  .map((relatedLocation, index) => (
                    <motion.div
                      key={relatedLocation.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/locations/${relatedLocation.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="comic-shadow overflow-hidden rounded-2xl border-4 border-foreground bg-card"
                        >
                          <div className="relative aspect-video overflow-hidden bg-secondary/10">
                            <img
                              src={relatedLocation.image || '/placeholder.svg'}
                              alt={relatedLocation.name}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-[family-name:var(--font-bangers)] mb-2 text-xl text-foreground">
                              {relatedLocation.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {relatedLocation.type}
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
