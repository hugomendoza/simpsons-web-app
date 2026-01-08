import { CardNavigation } from '@/home/components/CardNavigation';
import { StatsSection } from '@/home/components/StatsSection';
import { Hero } from '@/components/custom/Hero';
import { motion } from 'framer-motion';
import { MapPin, Tv, Users } from 'lucide-react';

import heroImage from '@/assets/los-simpsons-original_1920x1080_xtrafondos.com.jpg';

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen">
        <Hero
          desktopImage={heroImage}
          mobileImage={heroImage}
        />
        {/* Features Grid */}
        <section className="py-10">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12 text-center text-4xl text-foreground"
            >
              Explora Springfield
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-3">
              <CardNavigation
                title="Personajes"
                description="Descubre a todos los habitantes de Springfield"
                icon={Users}
                to="/characters"
                color="yellow"
              />
              <CardNavigation
                title="Locaciones"
                description="Explora los lugares icónicos de la ciudad"
                icon={MapPin}
                to="/locations"
                color="pink"
              />
              <CardNavigation
                title="Episodios"
                description="Revive los mejores momentos de la serie"
                icon={Tv}
                to="/episodes"
                color="blue"
              />
            </div>
          </div>
        </section>

        <StatsSection />
      </main>
    </>
  );
}
