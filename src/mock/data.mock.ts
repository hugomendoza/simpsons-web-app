export interface Character {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  firstAppearance: string;
  voiceActor: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
  address: string;
  owner: string;
}

export interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  airDate: string;
  image: string;
  description: string;
  director: string;
  writer: string;
}

// Datos de ejemplo de personajes
export const charactersData: Character[] = [
  {
    id: 1,
    name: 'Homer Simpson',
    role: 'Protagonista',
    image: '/homer-simpson-cartoon-character.jpg',
    description:
      'El patriarca de la familia Simpson. Trabaja en la Planta Nuclear de Springfield como Inspector de Seguridad.',
    firstAppearance: 'Good Night (1987)',
    voiceActor: 'Dan Castellaneta',
  },
  {
    id: 2,
    name: 'Marge Simpson',
    role: 'Protagonista',
    image: '/marge-simpson-cartoon-character-blue-hair.jpg',
    description:
      'La matriarca de la familia Simpson. Conocida por su característico cabello azul alto.',
    firstAppearance: 'Good Night (1987)',
    voiceActor: 'Julie Kavner',
  },
  {
    id: 3,
    name: 'Bart Simpson',
    role: 'Protagonista',
    image: '/bart-simpson-cartoon-character-skateboard.jpg',
    description:
      'El travieso hijo mayor de la familia Simpson. Siempre causando problemas en Springfield.',
    firstAppearance: 'Good Night (1987)',
    voiceActor: 'Nancy Cartwright',
  },
  {
    id: 4,
    name: 'Lisa Simpson',
    role: 'Protagonista',
    image: '/lisa-simpson-cartoon-character-saxophone.jpg',
    description:
      'La brillante hija del medio de la familia Simpson. Toca el saxofón y es muy inteligente.',
    firstAppearance: 'Good Night (1987)',
    voiceActor: 'Yeardley Smith',
  },
  {
    id: 5,
    name: 'Maggie Simpson',
    role: 'Protagonista',
    image: '/maggie-simpson-cartoon-character-baby-pacifier.jpg',
    description: 'La bebé de la familia Simpson. Siempre con su chupete.',
    firstAppearance: 'Good Night (1987)',
    voiceActor: 'Sin voz',
  },
  {
    id: 6,
    name: 'Ned Flanders',
    role: 'Secundario',
    image: '/ned-flanders-cartoon-character-mustache.jpg',
    description: 'El vecino devoto y optimista de los Simpson.',
    firstAppearance: 'Simpsons Roasting on an Open Fire (1989)',
    voiceActor: 'Harry Shearer',
  },
  {
    id: 7,
    name: 'Mr. Burns',
    role: 'Antagonista',
    image: '/mr-burns-cartoon-character-evil-rich.jpg',
    description:
      'El malvado y anciano dueño de la Planta Nuclear de Springfield.',
    firstAppearance: 'Simpsons Roasting on an Open Fire (1989)',
    voiceActor: 'Harry Shearer',
  },
  {
    id: 8,
    name: 'Krusty el Payaso',
    role: 'Secundario',
    image: '/krusty-the-clown-cartoon-character.jpg',
    description: 'El payaso de televisión favorito de Bart y Lisa.',
    firstAppearance: 'The Krusty the Clown Show (1989)',
    voiceActor: 'Dan Castellaneta',
  },
];

// Datos de ejemplo de locaciones
export const locationsData: Location[] = [
  {
    id: 1,
    name: 'Casa de los Simpson',
    type: 'Residencia',
    image: '/742-evergreen-terrace-simpson-house.jpg',
    description:
      'El hogar icónico de la familia Simpson en 742 Evergreen Terrace.',
    address: '742 Evergreen Terrace',
    owner: 'Homer & Marge Simpson',
  },
  {
    id: 2,
    name: 'Planta Nuclear de Springfield',
    type: 'Lugar de trabajo',
    image: '/springfield-nuclear-power-plant-cooling-towers.jpg',
    description: 'La planta nuclear donde trabaja Homer Simpson.',
    address: '100 Industrial Way',
    owner: 'Charles Montgomery Burns',
  },
  {
    id: 3,
    name: 'Escuela Primaria de Springfield',
    type: 'Educación',
    image: '/springfield-elementary-school-building.jpg',
    description: 'La escuela donde estudian Bart y Lisa Simpson.',
    address: '19 Plympton Street',
    owner: 'Superintendente Chalmers',
  },
  {
    id: 4,
    name: 'Taberna de Moe',
    type: 'Bar',
    image: '/moes-tavern-bar-springfield.jpg',
    description: 'El bar favorito de Homer y sus amigos.',
    address: 'Walnut Street',
    owner: 'Moe Szyslak',
  },
  {
    id: 5,
    name: 'Kwik-E-Mart',
    type: 'Tienda de conveniencia',
    image: '/kwik-e-mart-convenience-store.jpg',
    description: 'La tienda de conveniencia de Springfield.',
    address: 'Springfield',
    owner: 'Apu Nahasapeemapetilon',
  },
  {
    id: 6,
    name: 'Mansión de Mr. Burns',
    type: 'Residencia',
    image: '/mr-burns-mansion-springfield.jpg',
    description: 'La enorme mansión del hombre más rico de Springfield.',
    address: '1000 Mammon Lane',
    owner: 'Charles Montgomery Burns',
  },
];

// Datos de ejemplo de episodios
export const episodesData: Episode[] = [
  {
    id: 1,
    title: 'Simpsons Roasting on an Open Fire',
    season: 1,
    episode: 1,
    airDate: '17 de diciembre, 1989',
    image: '/simpsons-christmas-episode-1989.jpg',
    description:
      'El episodio piloto donde la familia Simpson celebra la Navidad.',
    director: 'David Silverman',
    writer: 'Mimi Pond',
  },
  {
    id: 2,
    title: 'Bart the Genius',
    season: 1,
    episode: 2,
    airDate: '14 de enero, 1990',
    image: '/placeholder.svg?height=300&width=500',
    description:
      'Bart hace trampa en un test de inteligencia y es enviado a una escuela para genios.',
    director: 'David Silverman',
    writer: 'Jon Vitti',
  },
  {
    id: 3,
    title: "Homer's Odyssey",
    season: 1,
    episode: 3,
    airDate: '21 de enero, 1990',
    image: '/placeholder.svg?height=300&width=500',
    description: 'Homer pierde su trabajo en la planta nuclear.',
    director: 'Wes Archer',
    writer: 'Jay Kogen & Wallace Wolodarsky',
  },
  {
    id: 4,
    title: "There's No Disgrace Like Home",
    season: 1,
    episode: 4,
    airDate: '28 de enero, 1990',
    image: '/placeholder.svg?height=300&width=500',
    description:
      'Homer lleva a la familia a terapia después de avergonzarse en un picnic de la empresa.',
    director: 'Gregg Vanzo & Kent Butterworth',
    writer: 'Al Jean & Mike Reiss',
  },
  {
    id: 5,
    title: 'Bart the General',
    season: 1,
    episode: 5,
    airDate: '4 de febrero, 1990',
    image: '/placeholder.svg?height=300&width=500',
    description: 'Bart lidera una guerra contra el bully de la escuela.',
    director: 'David Silverman',
    writer: 'John Swartzwelder',
  },
  {
    id: 6,
    title: 'Moaning Lisa',
    season: 1,
    episode: 6,
    airDate: '11 de febrero, 1990',
    image: '/placeholder.svg?height=300&width=500',
    description: 'Lisa está deprimida y encuentra consuelo en el jazz.',
    director: 'Wes Archer',
    writer: 'Al Jean & Mike Reiss',
  },
  {
    id: 7,
    title: 'The Call of the Simpsons',
    season: 1,
    episode: 7,
    airDate: '18 de febrero, 1990',
    image: '/placeholder.svg?height=300&width=500',
    description:
      'La familia Simpson se va de camping y Homer es confundido con Pie Grande.',
    director: 'Wes Archer',
    writer: 'John Swartzwelder',
  },
  {
    id: 8,
    title: 'The Telltale Head',
    season: 1,
    episode: 8,
    airDate: '25 de febrero, 1990',
    image: '/placeholder.svg?height=300&width=500',
    description:
      'Bart corta la cabeza de la estatua del fundador de Springfield.',
    director: 'Rich Moore',
    writer: 'Al Jean, Mike Reiss, Sam Simon & Matt Groening',
  },
];
