import couch from '@/assets/couch.png';
import donut from '@/assets/donut.png';
import tv from '@/assets/tv.png';

const stats = [
  {
    label: 'Episodios',
    value: '750+',
    image: tv,
  },
  {
    label: 'Personajes',
    value: '100+',
    image: donut,
  },
  {
    label: 'Temporadas',
    value: '35+',
    image: couch,
  },
];

export const StatsSection = () => {
  return (
    <section className="bg-simpsons-gray py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12 md:flex-row md:justify-around">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-6 text-center"
            >
              <div className="relative">
                {/* Image Scale Hover Effect */}
                <img
                  src={stat.image}
                  alt={stat.label}
                  className="h-32 w-32 object-contain transition-transform duration-300 hover:scale-110 hover:rotate-3"
                />

                {/* Glow effect behind image */}
                <div className="absolute inset-0 -z-10 bg-white/10 blur-2xl rounded-full" />
              </div>

              <div className="space-y-2">
                <h3 className="text-6xl font-black tracking-tighter text-[var(--simpsons-yellow)] drop-shadow-md">
                  {stat.value}
                </h3>
                <p className="text-2xl font-bold uppercase tracking-widest opacity-80">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
