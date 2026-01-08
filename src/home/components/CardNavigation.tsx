import { Link } from 'react-router';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface CTACardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: 'yellow' | 'pink' | 'blue';
}

const colorMap = {
  yellow: 'bg-[var(--simpsons-yellow)] text-black',
  pink: 'bg-[var(--simpsons-pink)] text-black',
  blue: 'bg-[var(--simpsons-blue)] text-black',
};

export const CardNavigation = ({
  title,
  description,
  icon: Icon,
  to,
  color = 'yellow',
}: CTACardProps) => {
  return (
    <Link
      to={to}
      className={`group relative flex flex-col justify-between rounded-2xl border-2 border-black p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${colorMap[color]}`}
    >
      <div className="relative z-10">
        <div className="mb-4 inline-block rounded-full border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Icon className="h-8 w-8 text-black" />
        </div>
        <h3 className="mb-2 text-2xl font-bold capitalize leading-tight tracking-tight">
          {title}
        </h3>
        <p className="font-medium opacity-90">{description}</p>
      </div>

      <div className="mt-3 flex items-center gap-2 font-bold uppercase tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span>Explorar</span>
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};
