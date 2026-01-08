interface HeroProps {
  desktopImage: string;
  mobileImage: string;
  title?: string;
  subtitle?: string;
}

export const Hero = ({
  desktopImage,
  mobileImage,
  title,
  subtitle,
}: HeroProps) => {
  return (
    <div className="relative h-[95dvh] w-full overflow-hidden bg-slate-900">
      {/* Background Images */}
      <picture className="absolute inset-0 h-full w-full">
        <source
          media="(max-width: 768px)"
          srcSet={mobileImage}
        />
        <img
          src={desktopImage}
          alt={title}
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
      </picture>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {title && (
          <h1 className="mb-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="max-w-2xl text-white/90 text-lg font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
