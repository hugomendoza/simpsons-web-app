export const LOADING_MESSAGES = {
  characters: 'Cargando personajes...',
  episodes: 'Cargando episodios...',
  locations: 'Cargando locaciones...',
  default: 'Cargando...',
} as const;

export const ERROR_MESSAGES = {
  characters: '¡D\'oh! Error al cargar personajes',
  episodes: '¡D\'oh! Error al cargar episodios',
  locations: '¡D\'oh! Error al cargar locaciones',
  default: '¡D\'oh! Algo salió mal',
  generic: 'Ha ocurrido un error inesperado',
  network: 'Error de conexión. Verifica tu internet.',
  notFound: 'No se encontró el recurso solicitado',
} as const;

export const END_MESSAGES = {
  characters: '¡Has visto todos los personajes!',
  episodes: '¡Has visto todos los episodios!',
  locations: '¡Has explorado todas las locaciones!',
  default: '¡Has visto todo el contenido!',
} as const;

export const END_EMOJIS = {
  characters: '🎉',
  episodes: '📺',
  locations: '🏘️',
  default: '🎉',
} as const;

export const ENTITY_EMOJIS = {
  characters: '👨‍👩‍👧‍👦',
  episodes: '📺',
  locations: '🏘️',
  character: '👤',
  episode: '📺',
  location: '🏠',
} as const;

export const NAVIGATION_LABELS = {
  back: 'Volver',
  explore: 'Explorar',
  seeMore: 'Ver más',
  loadMore: 'Cargando más...',
} as const;

export const FOOTER_TEXT = {
  copyright: `© {year} Los Simpson - Springfield`,
  madeWith: 'Una web no oficial feita con ❤️ y 🍩',
} as const;
