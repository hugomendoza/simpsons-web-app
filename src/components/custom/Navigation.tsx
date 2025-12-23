import { motion } from 'framer-motion';
import { Home, MapPin, Tv, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/characters', label: 'Personajes', icon: Users },
  { href: '/locations', label: 'Locaciones', icon: MapPin },
  { href: '/episodes', label: 'Episodios', icon: Tv },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 w-full border-b-4 border-foreground bg-primary"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-4xl"
            >
              🍩
            </motion.div>
            <h1 className="font-[family-name:var(--font-bangers)] text-3xl tracking-wider text-primary-foreground">
              SPRINGFIELD DB
            </h1>
          </Link>

          <nav className="flex gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 rounded-lg px-4 py-2 font-bold transition-colors ${
                      isActive
                        ? 'bg-secondary text-secondary-foreground comic-shadow-sm'
                        : 'text-primary-foreground hover:bg-primary-foreground/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden md:inline">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg border-2 border-foreground"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
