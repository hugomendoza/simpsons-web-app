import { Link } from 'react-router';
import { Home, MapPin, Tv, Users } from 'lucide-react';

import logoSimpsons from '../../assets/logo-the-simpsons.svg';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/characters', label: 'Personajes', icon: Users },
  { href: '/locations', label: 'Locaciones', icon: MapPin },
  { href: '/episodes', label: 'Episodios', icon: Tv },
];

export function Navigation() {
  return (
    <div className="container mx-auto px-4 animate__animated animate__fadeInDown">
      <div className="flex h-20 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logoSimpsons}
            alt="The Simpsons"
            className="h-12"
          />
        </Link>

        <nav className="flex gap-4 text-white font-heading text-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                viewTransition
                className="flex items-center gap-2"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
