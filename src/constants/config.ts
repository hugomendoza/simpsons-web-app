export const API_BASE_URL = 'https://thesimpsonsapi.com/api';
export const IMAGE_CDN_URL = 'https://cdn.thesimpsonsapi.com';
export const DEFAULT_IMAGE_SIZE = '500';

export const API_ENDPOINTS = {
  characters: {
    base: '/characters',
    byId: (id: number) => `/characters/${id}`,
  },
  episodes: {
    base: '/episodes',
    byId: (id: number) => `/episodes/${id}`,
    bySeason: (season: number) => `/episodes/season/${season}`,
  },
  locations: {
    base: '/locations',
    byId: (id: number) => `/locations/${id}`,
  },
} as const;

export const CACHE_CONFIG = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  retry: 2,
  refetchOnWindowFocus: false,
} as const;
