import { Home, BookOpen, MessageCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/modules', icon: BookOpen, label: 'Módulos' },
  { path: '/community', icon: MessageCircle, label: 'Comunidade' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-none border-t border-border/50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = pathname.startsWith(path);
          return (
            <button key={path} onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 relative px-4 py-1">
              {active && (
                <motion.div layoutId="nav-indicator"
                  className="absolute -top-1 w-8 h-1 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <Icon size={22} className={active ? 'text-primary' : 'text-muted-foreground'} />
              <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
