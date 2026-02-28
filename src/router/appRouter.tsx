import { createBrowserRouter } from 'react-router';

import CharacterPage from '@/characters/pages/character/CharacterPage';
import CharacterHomePage from '@/characters/pages/home/CharacterHomePage';
import EpisodePage from '@/episodes/pages/episode/EpisodePage';
import EpisodesHomePage from '@/episodes/pages/home/EpisodesHomePage';
import HomePage from '@/home/pages/HomePage';
import { GlobalLayout } from '@/layout/GlobalLayout';
import LocationsHomePage from '@/locations/pages/home/LocationsHomePage';
import LocationPage from '@/locations/pages/location/LocationPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/characters',
        element: <CharacterHomePage />,
      },
      {
        path: '/character/:id',
        element: <CharacterPage />,
      },
      {
        path: '/episodes',
        element: <EpisodesHomePage />,
      },
      {
        path: '/episode/:id',
        element: <EpisodePage />,
      },
      {
        path: '/locations',
        element: <LocationsHomePage />,
      },
      {
        path: '/location/:id',
        element: <LocationPage />,
      },
    ],
  },
]);
