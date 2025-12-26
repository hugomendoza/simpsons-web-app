import { RouterProvider } from 'react-router';

import { appRouter } from './router/appRouter';

function SimpsonsWebApp() {
  return <RouterProvider router={appRouter} />;
}

export default SimpsonsWebApp;
