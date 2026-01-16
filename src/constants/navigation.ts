import { MapPin, Tv, Users } from 'lucide-react';

export const NAVIGATION_ITEMS = [
  {
    title: 'Personajes',
    description: 'Descubre a todos los habitantes de Springfield',
    icon: Users,
    to: '/characters',
    color: 'yellow',
  },
  {
    title: 'Locaciones',
    description: 'Explora los lugares icónicos de la ciudad',
    icon: MapPin,
    to: '/locations',
    color: 'pink',
  },
  {
    title: 'Episodios',
    description: 'Revive los mejores momentos de la serie',
    icon: Tv,
    to: '/episodes',
    color: 'blue',
  },
] as const;
