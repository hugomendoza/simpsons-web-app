import { Link } from 'react-router';
import { motion } from 'framer-motion';

import { getImageUrl } from '@/lib/simpsonsApi';
import type { ApiCharacter, Character } from '@/types';
import { getCharacterStatusConfig } from '@/types';

interface CharacterCardProps {
  character: Character | ApiCharacter;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function CharacterCard({ character, index = 0 }: CharacterCardProps) {
  const isApiCharacter = 'portrait_path' in character;
  
  const portraitPath = isApiCharacter 
    ? (character as ApiCharacter).portrait_path 
    : (character as Character).portraitPath;
  
  const status: 'Alive' | 'Deceased' | 'Unknown' = isApiCharacter 
    ? ((character as ApiCharacter).status === 'Alive' ? 'Alive' : (character as ApiCharacter).status === 'Deceased' ? 'Deceased' : 'Unknown')
    : (character as Character).status;
    
  const statusConfig = getCharacterStatusConfig(status);
  const phrasesList = isApiCharacter ? (character as ApiCharacter).phrases : (character as Character).phrases;
  const occupation = isApiCharacter ? (character as ApiCharacter).occupation : (character as Character).occupation;
  const charName = character.name;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Link to={`/character/${character.id}`}>
        <motion.div
          whileHover={{ 
            scale: 1.03, 
            y: -8,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          className="group h-full overflow-hidden rounded-2xl border-[3px] border-black bg-white shadow-[4px_4px_0_#1a1a2e] hover:shadow-[6px_6px_0_#1a1a2e] transition-shadow"
        >
          <div className="relative aspect-square overflow-hidden bg-[#f5f5f5]">
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              src={getImageUrl(portraitPath)}
              alt={charName}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute right-2 top-2"
            >
              <span className={`${statusConfig.bg} rounded-full border-2 border-black px-3 py-1 font-['Bangers'] text-xs text-black shadow-[2px_2px_0_#1a1a2e]`}>
                {statusConfig.emoji} {statusConfig.label}
              </span>
            </motion.div>
            <div className="absolute left-2 bottom-2">
              <span className="bg-black/70 rounded-full px-2 py-1 font-['Nunito'] text-xs font-bold text-white">
                #{character.id}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-['Bangers'] mb-1.5 text-lg text-black truncate">
              {charName}
            </h3>
            <p className="line-clamp-2 text-xs font-['Nunito'] leading-relaxed text-black/60">
              {phrasesList[0] || occupation || 'Habitante de Springfield'}
            </p>

            <motion.div 
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="mt-3 flex items-center justify-between"
            >
              <span className="font-['Bangers'] text-xs text-[#ff6b6b]">
                Ver más →
              </span>
              <span className="text-xl">🎭</span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
