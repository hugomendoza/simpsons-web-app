import { NavigationSection } from '@/home/components/NavigationSection';
import { StatsSection } from '@/home/components/StatsSection';
import { Hero } from '@/components/custom/Hero';

import heroImage from '@/assets/homer-naked-yellow-background.jpg';

export default function HomePage() {
  return (
    <>
      <Hero
        desktopImage={heroImage}
        mobileImage={heroImage}
      />
      <NavigationSection />
      <StatsSection />
    </>
  );
}
