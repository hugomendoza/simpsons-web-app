import { motion } from 'framer-motion';
import { MapPin, Sparkles, Tv, Users } from 'lucide-react';

import { Navigation } from '@/components/custom/Navigation';
import { PageTransition } from '@/components/custom/PageTransition';

const features = [
  {
    icon: Users,
    title: 'Personajes',
    description: 'Descubre a todos los habitantes de Springfield',
    href: '/characters',
    color: 'bg-primary',
    textColor: 'text-primary-foreground',
  },
  {
    icon: MapPin,
    title: 'Locaciones',
    description: 'Explora los lugares icónicos de la ciudad',
    href: '/locations',
    color: 'bg-secondary',
    textColor: 'text-secondary-foreground',
  },
  {
    icon: Tv,
    title: 'Episodios',
    description: 'Revive los mejores momentos de la serie',
    href: '/episodes',
    color: 'bg-accent',
    textColor: 'text-accent-foreground',
  },
];

// const floatingAnimation = {
//   y: [0, -20, 0],
//   transition: {
//     duration: 3,
//     repeat: Number.POSITIVE_INFINITY,
//     ease: 'easeInOut',
//   },
// };

export default function HomePage() {
  return (
    <>
      <Navigation />
      <PageTransition>
        <main className="min-h-screen">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-primary to-secondary px-4 py-20 md:py-32">
            <div className="container relative z-10 mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                className="mb-8"
              >
                <span className="text-8xl md:text-9xl">🍩</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-[family-name:var(--font-bangers)] mb-6 text-5xl text-primary-foreground md:text-7xl lg:text-8xl"
              >
                BIENVENIDO A SPRINGFIELD
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mx-auto mb-12 max-w-2xl text-lg text-primary-foreground/90 md:text-xl"
              >
                La base de datos más completa sobre Los Simpson. Explora
                personajes, locaciones y episodios de la serie animada más
                longeva de la televisión.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="/characters"
                  className="comic-shadow inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-accent-foreground transition-transform hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  Comenzar Exploración
                </a>
              </motion.div>
            </div>

            {/* Animated background elements */}
            <motion.div
              // animate={floatingAnimation}
              animate={''}
              className="absolute left-10 top-20 text-6xl opacity-20"
              style={{ zIndex: 0 }}
            >
              🍺
            </motion.div>
            <motion.div
              // animate={{
              //   ...floatingAnimation,
              //   transition: { ...floatingAnimation.transition, delay: 1 },
              // }}
              animate={''}
              className="absolute right-10 top-40 text-6xl opacity-20"
              style={{ zIndex: 0 }}
            >
              🎸
            </motion.div>
            <motion.div
              // animate={{
              //   ...floatingAnimation,
              //   transition: { ...floatingAnimation.transition, delay: 2 },
              // }}
              animate={''}
              className="absolute bottom-20 left-1/4 text-6xl opacity-20"
              style={{ zIndex: 0 }}
            >
              📺
            </motion.div>
          </section>

          {/* Features Grid */}
          <section className="px-4 py-20">
            <div className="container mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-[family-name:var(--font-bangers)] mb-12 text-center text-4xl text-foreground md:text-5xl"
              >
                EXPLORA SPRINGFIELD
              </motion.h2>

              <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a href={feature.href}>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`comic-shadow group h-full rounded-2xl ${feature.color} border-4 border-foreground p-8 transition-all hover:comic-shadow-lg`}
                        >
                          <div className="mb-6 flex justify-center">
                            <div className="comic-shadow-sm rounded-full bg-background p-6">
                              <Icon
                                className={`h-12 w-12 ${feature.textColor}`}
                              />
                            </div>
                          </div>

                          <h3
                            className={`font-[family-name:var(--font-bangers)] mb-3 text-center text-3xl ${feature.textColor}`}
                          >
                            {feature.title}
                          </h3>

                          <p
                            className={`text-center text-lg ${feature.textColor} opacity-90`}
                          >
                            {feature.description}
                          </p>

                          <div className="mt-6 flex justify-center">
                            <motion.div
                              whileHover={{ x: 5 }}
                              className={`text-2xl ${feature.textColor}`}
                            >
                              →
                            </motion.div>
                          </div>
                        </motion.div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-muted px-4 py-20">
            <div className="container mx-auto">
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  { number: '750+', label: 'Episodios', icon: '📺' },
                  { number: '100+', label: 'Personajes', icon: '👥' },
                  { number: '35+', label: 'Temporadas', icon: '🎬' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    className="comic-shadow rounded-2xl border-4 border-foreground bg-card p-8 text-center"
                  >
                    <div className="mb-4 text-6xl">{stat.icon}</div>
                    <div className="font-[family-name:var(--font-bangers)] mb-2 text-5xl text-primary">
                      {stat.number}
                    </div>
                    <div className="text-xl font-bold text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-4 py-20">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="comic-shadow rounded-3xl border-4 border-foreground bg-gradient-to-r from-primary via-secondary to-accent p-12 text-center"
              >
                <h2 className="font-[family-name:var(--font-bangers)] mb-6 text-4xl text-primary-foreground md:text-5xl">
                  ¿LISTO PARA EXPLORAR?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
                  Sumérgete en el universo de Los Simpson y descubre todo sobre
                  tus personajes favoritos, los lugares emblemáticos y los
                  episodios más memorables.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="/characters"
                    className="comic-shadow inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 font-bold text-foreground transition-transform hover:scale-105"
                  >
                    Ver Personajes
                  </a>
                  <a
                    href="/episodes"
                    className="comic-shadow inline-flex items-center gap-2 rounded-full border-4 border-background bg-transparent px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105"
                  >
                    Ver Episodios
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </PageTransition>
    </>
  );
}
