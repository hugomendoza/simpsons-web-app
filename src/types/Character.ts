export type CharacterStatus = 'Alive' | 'Deceased' | 'Unknown';

export interface Character {
  id: number;
  name: string;
  age: string | null;
  gender: string | null;
  occupation: string | null;
  portraitPath: string;
  phrases: string[];
  status: CharacterStatus;
}

export interface ApiCharacter {
  id: number;
  age: string | null;
  birthdate: string | null;
  gender: string | null;
  name: string;
  occupation: string | null;
  portrait_path: string;
  phrases: string[];
  status: string;
}

export const mapApiCharacter = (api: ApiCharacter): Character => ({
  id: api.id,
  name: api.name,
  age: api.age,
  gender: api.gender,
  occupation: api.occupation,
  portraitPath: api.portrait_path,
  phrases: api.phrases,
  status: api.status === 'Alive' ? 'Alive' : api.status === 'Deceased' ? 'Deceased' : 'Unknown',
});

export const getCharacterStatusConfig = (status: CharacterStatus) => {
  switch (status) {
    case 'Alive':
      return { bg: 'bg-[#88d498]', emoji: '💚', label: 'Vivo' };
    case 'Deceased':
      return { bg: 'bg-[#ff6b6b]', emoji: '💀', label: 'Fallecido' };
    default:
      return { bg: 'bg-[#78c7f0]', emoji: '❓', label: 'Desconocido' };
  }
};
