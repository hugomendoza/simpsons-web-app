export * from './Character';
export * from './Episode';
export * from './Location';

export interface PaginatedResponse<T> {
  data: T[];
  nextPage: number | null;
  totalPages: number;
}
