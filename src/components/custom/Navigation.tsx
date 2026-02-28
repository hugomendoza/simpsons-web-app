import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Inicio', emoji: '🏠' },
  { href: '/characters', label: 'Personajes', emoji: '👨‍👩‍👧‍👦' },
  { href: '/locations', label: 'Locaciones', emoji: '🏘️' },
  { href: '/episodes', label: 'Episodios', emoji: '📺' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50 w-full bg-[#ffde00] border-b-[3px] border-black">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ duration: 0.6 }}
              className="text-4xl"
            >
              🍩
            </motion.div>
            <div className="flex flex-col">
              <span className="font-['Fredoka_One'] text-2xl text-black leading-none tracking-wide">
                LOS SIMPSON
              </span>
              <span className="font-['Rock_Salt'] text-[10px] text-black/60 tracking-[0.2em]">
                SPRINGFIELD
              </span>
            </div>
          </Link>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  viewTransition
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 rounded-xl font-['Bangers'] text-base tracking-wide
                      transition-all duration-150 border-[2.5px] border-black
                      ${isActive 
                        ? 'bg-[#f58ea8] shadow-[3px_3px_0_#1a1a2e]' 
                        : 'bg-white hover:bg-[#78c7f0] shadow-[2px_2px_0_#1a1a2e]'
                      }
                    `}
                  >
                    <span className="mr-1.5">{item.emoji}</span>
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      <div className="h-1.5 bg-gradient-to-r from-[#ff6b6b] via-[#ffde00] to-[#78c7f0] border-t-[2px] border-black/20" />
    </div>
  );
}
