export interface Episode {
  id: number;
  name: string;
  season: number;
  episodeNumber: number;
  airdate: string;
  synopsis: string;
  writer: string;
  director: string;
  imagePath: string;
}

export interface ApiEpisode {
  id: number;
  name: string;
  season: number;
  episode_number: number;
  airdate: string;
  synopsis: string;
  writer: string;
  director: string;
  image_path: string;
}

export const mapApiEpisode = (api: ApiEpisode): Episode => ({
  id: api.id,
  name: api.name,
  season: api.season,
  episodeNumber: api.episode_number,
  airdate: api.airdate,
  synopsis: api.synopsis,
  writer: api.writer,
  director: api.director,
  imagePath: api.image_path,
});

export const getSeasonColor = (season: number) => {
  const colors = [
    { bg: 'bg-[#ffde00]', name: 'yellow' },
    { bg: 'bg-[#78c7f0]', name: 'blue' },
    { bg: 'bg-[#f58ea8]', name: 'pink' },
    { bg: 'bg-[#88d498]', name: 'green' },
    { bg: 'bg-[#ff9f43]', name: 'orange' },
    { bg: 'bg-[#a55eea]', name: 'purple' },
  ];
  return colors[(season - 1) % colors.length];
};

export const formatSeasonEpisode = (season: number, episodeNumber: number): string => {
  return `S${season}E${episodeNumber}`;
};
