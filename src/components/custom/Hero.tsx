import type { PropsWithChildren } from 'react';

interface HeroProps extends PropsWithChildren {
  desktopImage: string;
  mobileImage: string;
}

export const Hero = ({ desktopImage, mobileImage, children }: HeroProps) => {
  return (
    <section className="relative w-full aspect-1/2 md:aspect-video lg:aspect-16/8 ">
      {/* Background Images */}
      <picture className="absolute inset-0 h-full w-full object-cover">
        <source
          media="(max-width: 768px)"
          srcSet={mobileImage}
        />
        <img
          src={desktopImage}
          alt="The Simpsons Web App"
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
      </picture>

      {/* Content */}
      {/* <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
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
      </div> */}
      {children}
    </section>
  );
};
