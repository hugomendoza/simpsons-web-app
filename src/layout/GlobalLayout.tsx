import { Outlet } from 'react-router';

import { Navigation } from '@/components/custom/Navigation';

export const GlobalLayout = () => {
  return (
    <div className="bg-primary">
      <Navigation />
      <Outlet />
    </div>
  );
};
