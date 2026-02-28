export interface Location {
  id: number;
  name: string;
  description?: string;
  town: string;
  use: string;
  imagePath: string;
}

export interface ApiLocation {
  id: number;
  name: string;
  description?: string;
  town: string;
  use: string;
  image_path: string;
}

export const mapApiLocation = (api: ApiLocation): Location => ({
  id: api.id,
  name: api.name,
  description: api.description,
  town: api.town,
  use: api.use,
  imagePath: api.image_path,
});

export const locationEmojis: Record<string, string> = {
  'Residential': '🏠',
  'Energy Source': '⚡',
  'Education': '🏫',
  'Convenience Store': '🏪',
  'Bar': '🍺',
  'Hospital': '🏥',
  'Square': '⛲',
  'Law enforcement': '👮',
  'Cemetery': '🪦',
  'Nursing Home': '👴',
  'Fast food chain': '🍔',
  'Media': '📺',
  'Prison': '🔒',
  'Shops and restaurants': '🛍️',
  'Beer factory': '🍺',
  'Place of Worship': '⛪',
  'Zoo': '🦁',
  'Comic shop': '📚',
};

export const getLocationEmoji = (use: string): string => {
  return locationEmojis[use] || '🏘️';
};
