import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { CardNavigation } from './CardNavigation';

export const NavigationSection = () => {
  return (
    <section className="py-10 timeline-view animate-fade-in animate-range-contain">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-4xl text-foreground animate-slide-in">
          Explora Springfield
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {NAVIGATION_ITEMS.map((item) => (
            <CardNavigation
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
