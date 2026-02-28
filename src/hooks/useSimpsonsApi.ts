import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { CACHE_CONFIG } from '@/constants/config';
import { simpsonsApi } from '@/lib/simpsonsApi';
import type { ApiCharacter, ApiEpisode, ApiLocation } from '@/types';
import type { PaginatedResponse } from '@/types';

export const useCharacters = () => {
  return useInfiniteQuery<PaginatedResponse<ApiCharacter>>({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1 }) => simpsonsApi.characters.getAll(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: CACHE_CONFIG.staleTime,
  });
};

export const useCharacter = (id: number) => {
  return useQuery<ApiCharacter>({
    queryKey: ['character', id],
    queryFn: () => simpsonsApi.characters.getById(id),
    staleTime: CACHE_CONFIG.staleTime,
  });
};

export const useEpisodes = () => {
  return useInfiniteQuery<PaginatedResponse<ApiEpisode>>({
    queryKey: ['episodes'],
    queryFn: ({ pageParam = 1 }) => simpsonsApi.episodes.getAll(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: CACHE_CONFIG.staleTime,
  });
};

export const useEpisode = (id: number) => {
  return useQuery<ApiEpisode>({
    queryKey: ['episode', id],
    queryFn: () => simpsonsApi.episodes.getById(id),
    staleTime: CACHE_CONFIG.staleTime,
  });
};

export const useEpisodesBySeason = (season: number) => {
  return useQuery<ApiEpisode[]>({
    queryKey: ['episodes', 'season', season],
    queryFn: () => simpsonsApi.episodes.getBySeason(season),
    staleTime: CACHE_CONFIG.staleTime,
  });
};

export const useLocations = () => {
  return useInfiniteQuery<PaginatedResponse<ApiLocation>>({
    queryKey: ['locations'],
    queryFn: ({ pageParam = 1 }) => simpsonsApi.locations.getAll(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: CACHE_CONFIG.staleTime,
  });
};

export const useLocation = (id: number) => {
  return useQuery<ApiLocation>({
    queryKey: ['location', id],
    queryFn: () => simpsonsApi.locations.getById(id),
    staleTime: CACHE_CONFIG.staleTime,
  });
};
