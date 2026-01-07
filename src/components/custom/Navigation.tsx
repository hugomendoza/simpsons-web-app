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
    <div className="container mx-auto px-4 animate__animated animate__fadeInDown">
      <div className="flex h-20 items-center justify-between">
        <Link to="/">
          <img
            src={logoSimpsons}
            alt="The Simpsons"
            className="h-12"
          />
        </Link>

        <nav className="flex gap-12 text-black">
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                to={item.href}
                viewTransition
                className="flex items-center gap-2"
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
