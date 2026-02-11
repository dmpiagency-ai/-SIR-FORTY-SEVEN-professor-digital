import { Sun, Moon, Home, BookOpen, MessageCircle, User } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/modules', icon: BookOpen, label: 'Módulos' },
  { path: '/community', icon: MessageCircle, label: 'Comunidade' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

const Header = () => {
  const { isDark, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 glass-card rounded-none border-b border-border/50 px-4 md:px-8 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold gradient-text">SR47</h1>

      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button onClick={toggleTheme}
        className="p-2 rounded-xl hover:bg-secondary transition-colors">
        <motion.div key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}>
          {isDark ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-foreground" />}
        </motion.div>
      </button>
    </header>
  );
};

export default Header;
