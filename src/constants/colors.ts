export const APP_NAME = 'Los Simpson - Springfield';

export const SIMPSONS_YELLOW = '#ffde00';
export const SIMPSONS_PINK = '#f58ea8';
export const SIMPSONS_BLUE = '#78c7f0';
export const SIMPSONS_GREEN = '#88d498';
export const SIMPSONS_ORANGE = '#ff9f43';
export const SIMPSONS_PURPLE = '#a55eea';
export const SIMPSONS_RED = '#ff6b6b';
export const SIMPSONS_BLACK = '#1a1a2e';

export const COMIC_SHADOW = 'shadow-[4px_4px_0_#1a1a2e]';
export const COMIC_SHADOW_HOVER = 'hover:shadow-[6px_6px_0_#1a1a2e]';
export const COMIC_BORDER = 'border-[3px] border-black';
export const COMIC_BORDER_THIN = 'border-2 border-black';

export const SEASON_COLORS = [
  { bg: 'bg-[#ffde00]', border: 'border-black', shadow: '#1a1a2e' },
  { bg: 'bg-[#78c7f0]', border: 'border-black', shadow: '#1a1a2e' },
  { bg: 'bg-[#f58ea8]', border: 'border-black', shadow: '#1a1a2e' },
  { bg: 'bg-[#88d498]', border: 'border-black', shadow: '#1a1a2e' },
  { bg: 'bg-[#ff9f43]', border: 'border-black', shadow: '#1a1a2e' },
  { bg: 'bg-[#a55eea]', border: 'border-black', shadow: '#1a1a2e' },
];

export const getSeasonColorByIndex = (index: number) => {
  return SEASON_COLORS[index % SEASON_COLORS.length];
};
