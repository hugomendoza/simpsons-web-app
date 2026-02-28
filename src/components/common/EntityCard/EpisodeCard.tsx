import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, Tv } from 'lucide-react';

import { getImageUrl } from '@/lib/simpsonsApi';
import type { ApiEpisode, Episode } from '@/types';
import { formatSeasonEpisode,getSeasonColor } from '@/types';

interface EpisodeCardProps {
  episode: Episode | ApiEpisode;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  }),
};

export function EpisodeCard({ episode, index = 0 }: EpisodeCardProps) {
  const isApiEpisode = 'episode_number' in episode;
  
  const season = isApiEpisode ? (episode as ApiEpisode).season : (episode as Episode).season;
  const episodeNumber = isApiEpisode ? (episode as ApiEpisode).episode_number : (episode as Episode).episodeNumber;
  const imagePath = isApiEpisode ? (episode as ApiEpisode).image_path : (episode as Episode).imagePath;
  const synopsis = episode.synopsis;
  const airdate = episode.airdate;
  const name = episode.name;
  
  const color = getSeasonColor(season);
  const seasonEpisode = formatSeasonEpisode(season, episodeNumber);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Link to={`/episode/${episode.id}`}>
        <motion.div 
          whileHover={{ scale: 1.03, y: -6 }} 
          whileTap={{ scale: 0.98 }} 
          className="group h-full overflow-hidden rounded-2xl border-[3px] border-black bg-white shadow-[4px_4px_0_#1a1a2e] hover:shadow-[6px_6px_0_#1a1a2e]"
        >
          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <motion.img 
              whileHover={{ scale: 1.1 }} 
              transition={{ duration: 0.3 }} 
              src={getImageUrl(imagePath)} 
              alt={name} 
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute right-2 top-2">
              <span className={`${color.bg} rounded-full border-2 border-black px-3 py-1 font-['Bangers'] text-xs text-black shadow-[2px_2px_0_#1a1a2e]`}>
                {seasonEpisode}
              </span>
            </div>
            <motion.div 
              initial={{ opacity: 0 }} 
              whileHover={{ opacity: 1 }} 
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity"
            >
              <Tv className="h-10 w-10 text-white" />
            </motion.div>
          </div>
          <div className="p-4">
            <h3 className="font-['Bangers'] mb-2 line-clamp-2 text-base text-black">
              {name}
            </h3>
            <p className="mb-2 line-clamp-2 text-xs font-['Nunito'] leading-relaxed text-black/60">
              {synopsis}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-black/50">
              <Calendar className="h-3 w-3" />
              <span className="font-['Nunito']">{airdate || 'Fecha desconocida'}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
