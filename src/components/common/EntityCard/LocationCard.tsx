import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

import { getImageUrl } from '@/lib/simpsonsApi';
import type { ApiLocation, Location } from '@/types';
import { getLocationEmoji } from '@/types';

interface LocationCardProps {
  location: Location | ApiLocation;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -3 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: 'easeOut' as const },
  }),
};

export function LocationCard({ location, index = 0 }: LocationCardProps) {
  const isApiLocation = 'image_path' in location;
  
  const imagePath = isApiLocation ? (location as ApiLocation).image_path : (location as Location).imagePath;
  const locationUse = isApiLocation ? (location as ApiLocation).use : (location as Location).use;
  const town = isApiLocation ? (location as ApiLocation).town : (location as Location).town;
  const name = location.name;
  
  const emoji = getLocationEmoji(locationUse);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Link to={`/location/${location.id}`}>
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
            <div className="absolute left-2 top-2">
              <span className="flex items-center gap-1 rounded-full border-2 border-black bg-[#78c7f0] px-3 py-1 font-['Bangers'] text-xs text-black shadow-[2px_2px_0_#1a1a2e]">
                <MapPin className="h-3 w-3" />
                {emoji} {locationUse}
              </span>
            </div>
            <div className="absolute right-2 bottom-2">
              <span className="bg-black/70 rounded-full px-2 py-1 font-['Nunito'] text-xs font-bold text-white">
                #{location.id}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-['Bangers'] mb-2 text-xl text-black">
              {name}
            </h3>
            <p className="mb-2 text-sm font-['Nunito'] text-black/60">
              {town || 'Springfield'}
            </p>
            <motion.div 
              initial={{ opacity: 0.7 }} 
              whileHover={{ opacity: 1 }} 
              className="flex items-center justify-between"
            >
              <span className="font-['Bangers'] text-xs text-[#ff6b6b]">
                Explorar →
              </span>
              <span className="text-xl">🗺️</span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
