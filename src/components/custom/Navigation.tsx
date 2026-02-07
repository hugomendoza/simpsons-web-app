import { Link } from 'react-router';

import logoSimpsons from '../../assets/logo-the-simpsons.svg';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/characters', label: 'Personajes' },
  { href: '/locations', label: 'Locaciones' },
  { href: '/episodes', label: 'Episodios' },
];

export function Navigation() {
  return (
    <div className="absolute top-0 z-50 w-full">
      <div className="flex h-20 items-center justify-between container mx-auto px-4">
        <Link to="/">
          <img
            src={logoSimpsons}
            alt="The Simpsons"
            className="h-14"
          />
        </Link>
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              viewTransition
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
