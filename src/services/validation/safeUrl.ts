const ALLOWED_IMAGE_DOMAINS = [
  'thesimpsonsapi.com',
  'cdn.thesimpsonsapi.com',
];

const ALLOWED_PROTOCOLS = ['https:', 'data:'];

export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      return false;
    }
    
    if (parsed.protocol === 'https:') {
      const isAllowedDomain = ALLOWED_IMAGE_DOMAINS.some(
        domain => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
      );
      
      if (!isAllowedDomain) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
}

export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }
  
  const trimmed = url.trim();
  
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
    return '';
  }
  
  return trimmed;
}

export function validateId(id: unknown): id is number {
  return typeof id === 'number' && Number.isInteger(id) && id > 0;
}

export function validatePage(page: unknown): page is number {
  return typeof page === 'number' && Number.isInteger(page) && page >= 1;
}

export function validateSeason(season: unknown): season is number {
  return typeof season === 'number' && Number.isInteger(season) && season >= 1 && season <= 100;
}
