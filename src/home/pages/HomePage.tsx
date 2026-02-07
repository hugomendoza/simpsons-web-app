import heroDesktopImage from '@/assets/homer-naked-yellow-background.jpg';
import heroMobileImage from '@/assets/homer-naked-yellow-mobile.jpg';
import { Hero } from '@/components/custom/Hero';
import { NavigationSection } from '@/home/components/NavigationSection';
import { StatsSection } from '@/home/components/StatsSection';

export default function HomePage() {
  return (
    <>
      <Hero
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
      />
      <NavigationSection />
      <StatsSection />
    </>
  );
}
