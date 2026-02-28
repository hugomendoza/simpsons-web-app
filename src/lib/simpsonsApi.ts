import { API_BASE_URL } from '@/constants/config';
import type { ApiCharacter, ApiEpisode, ApiLocation, PaginatedResponse } from '@/types';

interface ApiPaginatedResponse<T> {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[];
}

const getPageFromUrl = (url: string | null): number | null => {
  if (!url) return null;
  const match = url.match(/page=(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
};

export const simpsonsApi = {
  characters: {
    getAll: async (page: number = 1): Promise<PaginatedResponse<ApiCharacter>> => {
      const response = await fetch(`${API_BASE_URL}/characters?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch characters');
      const data: ApiPaginatedResponse<ApiCharacter> = await response.json();
      return {
        data: data.results,
        nextPage: getPageFromUrl(data.next),
        totalPages: data.pages,
      };
    },

    getById: async (id: number): Promise<ApiCharacter> => {
      const response = await fetch(`${API_BASE_URL}/characters/${id}`);
      if (!response.ok) throw new Error('Failed to fetch character');
      return response.json();
    },
  },

  episodes: {
    getAll: async (page: number = 1): Promise<PaginatedResponse<ApiEpisode>> => {
      const response = await fetch(`${API_BASE_URL}/episodes?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch episodes');
      const data: ApiPaginatedResponse<ApiEpisode> = await response.json();
      return {
        data: data.results,
        nextPage: getPageFromUrl(data.next),
        totalPages: data.pages,
      };
    },

    getById: async (id: number): Promise<ApiEpisode> => {
      const response = await fetch(`${API_BASE_URL}/episodes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch episode');
      return response.json();
    },

    getBySeason: async (season: number): Promise<ApiEpisode[]> => {
      const response = await fetch(`${API_BASE_URL}/episodes/season/${season}`);
      if (!response.ok) throw new Error('Failed to fetch episodes by season');
      return response.json();
    },
  },

  locations: {
    getAll: async (page: number = 1): Promise<PaginatedResponse<ApiLocation>> => {
      const response = await fetch(`${API_BASE_URL}/locations?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch locations');
      const data: ApiPaginatedResponse<ApiLocation> = await response.json();
      return {
        data: data.results,
        nextPage: getPageFromUrl(data.next),
        totalPages: data.pages,
      };
    },

    getById: async (id: number): Promise<ApiLocation> => {
      const response = await fetch(`${API_BASE_URL}/locations/${id}`);
      if (!response.ok) throw new Error('Failed to fetch location');
      return response.json();
    },
  },
};

export const getImageUrl = (path: string): string => {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  const size = '500';
  const filename = path.split('/').pop() || '';
  const type = path.includes('/character/') ? 'character' : path.includes('/location/') ? 'location' : 'episode';
  return `https://cdn.thesimpsonsapi.com/${size}/${type}/${filename}`;
};
