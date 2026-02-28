'use client';

import { Link } from 'react-router';
import { motion } from 'framer-motion';

const features = [
  {
    href: '/characters',
    title: 'PERSONAJES',
    description: 'Conoce a todos los habitantes de Springfield',
    emoji: '👨‍👩‍👧‍👦',
    color: 'bg-[#f58ea8]',
    gradient: 'from-[#f58ea8] to-[#ff9f43]',
  },
  {
    href: '/episodes',
    title: 'EPISODIOS',
    description: 'Revive los mejores momentos de la serie',
    emoji: '📺',
    color: 'bg-[#78c7f0]',
    gradient: 'from-[#78c7f0] to-[#a55eea]',
  },
  {
    href: '/locations',
    title: 'LOCACIONES',
    description: 'Explora los lugares icónicos de Springfield',
    emoji: '🏘️',
    color: 'bg-[#88d498]',
    gradient: 'from-[#88d498] to-[#78c7f0]',
  },
];

const characters = [
  { name: 'Homer', emoji: '🍩', color: 'bg-[#ffde00]', delay: 0 },
  { name: 'Bart', emoji: '🛹', color: 'bg-[#ff9f43]', delay: 0.1 },
  { name: 'Lisa', emoji: '🎷', color: 'bg-[#f58ea8]', delay: 0.2 },
  { name: 'Marge', emoji: '💇‍♀️', color: 'bg-[#78c7f0]', delay: 0.3 },
  { name: 'Maggie', emoji: '🍼', color: 'bg-[#a55eea]', delay: 0.4 },
];

const floatingEmojis = [
  { emoji: '🍩', delay: 0, x: '10%', y: '20%' },
  { emoji: '⚡', delay: 0.5, x: '85%', y: '15%' },
  { emoji: '💙', delay: 1, x: '70%', y: '60%' },
  { emoji: '🍦', delay: 1.5, x: '15%', y: '70%' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ffde00] to-[#ffde00]/80 pb-24 pt-12">
        {/* Floating Background Emojis */}
        {floatingEmojis.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0.3, 0],
              scale: [0, 1.2, 1],
              y: [0, -30, 0],
            }}
            transition={{ 
              delay: item.delay,
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute pointer-events-none select-none text-7xl md:text-9xl"
            style={{ left: item.x, top: item.y }}
          >
            {item.emoji}
          </motion.div>
        ))}

        <div className="container relative mx-auto px-4">
          {/* Main Title */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.2 }}
            className="mx-auto mb-8 max-w-4xl text-center"
          >
            <h1 className="font-['Fredoka_One'] text-6xl text-black md:text-8xl lg:text-9xl leading-tight">
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#ff6b6b]"
              >
                LOS
              </motion.span>
              <br />
              <motion.span 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                SIMPSON
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-4 font-['Nunito'] text-xl font-semibold text-black/70 md:text-2xl"
            >
              ¡D'oh! Bienvenido a Springfield
            </motion.p>
          </motion.div>

          {/* Character Badges */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {characters.map((char) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: char.delay + 0.9 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`${char.color} flex items-center gap-2 rounded-full border-[2.5px] border-black px-5 py-2.5 shadow-[3px_3px_0_#1a1a2e] cursor-pointer`}
              >
                <span className="text-2xl">{char.emoji}</span>
                <span className="font-['Bangers'] text-lg text-black">{char.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-12 text-center"
          >
            <Link to="/characters">
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '8px 8px 0 #1a1a2e' }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ['4px 4px 0 #1a1a2e', '6px 6px 0 #1a1a2e', '4px 4px 0 #1a1a2e']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-[#f58ea8] rounded-full border-[3px] border-black px-10 py-4 font-['Bangers'] text-xl text-black shadow-[4px_4px_0_#1a1a2e]"
              >
                🚀 EXPLORAR SPRINGFIELD
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Wave divider */}
        <motion.div 
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-[#ff6b6b] via-[#ffde00] to-[#78c7f0]" 
        />
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-[#fff8e7] to-[#78c7f0]/30 py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center font-['Fredoka_One'] text-4xl text-black md:text-5xl"
          >
            EXPLORA SPRINGFIELD
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -12 }}
              >
                <Link to={feature.href}>
                  <motion.div
                    whileHover={{ rotate: [0, -1, 1, 0] }}
                    transition={{ duration: 0.3 }}
                    className={`
                      ${feature.color} group relative overflow-hidden rounded-3xl border-[3px] border-black 
                      shadow-[5px_5px_0_#1a1a2e] transition-all hover:shadow-[8px_8px_0_#1a1a2e]
                    `}
                  >
                    <div className="p-8 text-center">
                      <motion.div
                        whileHover={{ rotate: [0, -15, 15, -10, 10, 0] }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 text-7xl"
                      >
                        {feature.emoji}
                      </motion.div>
                      <h3 className="font-['Bangers'] text-2xl text-black">
                        {feature.title}
                      </h3>
                      <p className="mt-2 font-['Nunito'] text-base font-medium text-black/80">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Decorative corners */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute left-2 top-2 text-xl text-black/40"
                    >
                      ✦
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute right-2 top-2 text-xl text-black/40"
                    >
                      ✦
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="bg-gradient-to-b from-[#78c7f0]/30 to-[#a55eea]/20 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl rounded-3xl border-[3px] border-black bg-white p-8 shadow-[6px_6px_0_#1a1a2e]"
          >
            <h2 className="mb-6 text-center font-['Fredoka_One'] text-3xl text-black md:text-4xl">
              💡 ¿SABÍAS QUE...?
            </h2>
            <div className="space-y-4 text-center">
              <p className="font-['Nunito'] text-lg font-semibold text-black">
                Los Simpson es el programa de televisión con más temporadas de la historia,
                llevando más de <span className="font-bold text-[#ff6b6b]">35 años</span> al aire.
              </p>
              <p className="font-['Nunito'] text-base text-black/70">
                La serie ha recibido más de <span className="font-bold text-[#78c7f0]">31 premios Emmy</span> 
                y ha sido traducida a más de <span className="font-bold text-[#88d498]">100 idiomas</span>.
              </p>
            </div>
            
            {/* Stars decoration */}
            <div className="mt-6 flex justify-center gap-1">
              {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity }}
                  className="text-xl"
                >
                  {star}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-['Bangers'] text-xl text-[#ffde00]"
          >
            ¡D'oh! © {new Date().getFullYear()} Los Simpson - Springfield
          </motion.p>
          <p className="mt-2 font-['Nunito'] text-sm text-white/50">
            Una web no oficial feita con ❤️ y 🍩
          </p>
        </div>
      </footer>
    </div>
  );
}
