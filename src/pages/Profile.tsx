import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Crown, Sun, Moon, LogOut, ChevronRight, Target, Megaphone, Sparkles } from 'lucide-react';
import { plans, getUpgradePrice } from '@/data/modules';

const Profile = () => {
  const { user, isDark, toggleTheme, logout, setObjective, upgradePlan } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleObjective = () => {
    if (user.objective === 'afiliado') {
      setObjective('gestor');
    } else if (user.objective === 'gestor') {
      setObjective('both');
    } else {
      setObjective('afiliado');
    }
  };

  const getPlanName = (planId: string | null): string => {
    const plan = plans.find(p => p.id === planId);
    return plan?.name || 'Start';
  };

  const getUpgradeTarget = (): 'fanatico' | 'pro' | null => {
    if (!user.plan) return 'fanatico';
    if (user.plan === 'iniciante') return 'fanatico';
    if (user.plan === 'fanatico') return 'pro';
    return null;
  };

  const upgradeTarget = getUpgradeTarget();

  return (
    <div className="px-4 md:px-8 py-6 max-w-lg md:max-w-2xl mx-auto space-y-4">
      <motion.div className="glass-card p-6 text-center"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
          <User size={36} className="text-primary" />
        </div>
        <h2 className="font-bold text-lg">{user.name || 'Aluno'}</h2>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          <Mail size={14} /> {user.email || 'aluno@email.com'}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${user.plan === 'pro' ? 'bg-accent/20 text-accent' : user.plan === 'fanatico' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            <Crown size={12} className="inline mr-1" />
            {getPlanName(user.plan)}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${user.objective === 'afiliado' ? 'bg-primary/15 text-primary' : user.objective === 'gestor' ? 'bg-accent/15 text-accent' : 'bg-purple-500/15 text-purple-400'}`}>
            {user.objective === 'afiliado' ? '🔗 Afiliado' : user.objective === 'gestor' ? '📣 Gestor' : '🚀 Ambos'}
          </span>
        </div>
      </motion.div>

      {/* Upgrade Banner */}
      {upgradeTarget && (
        <motion.button onClick={() => upgradePlan(upgradeTarget)}
          className="glass-card p-4 w-full text-left glow-blue border border-primary/30"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm flex items-center gap-1">
                <Sparkles size={14} className="text-accent" />
                Upgrade para {upgradeTarget === 'fanatico' ? 'Boost' : 'Master'}
              </h3>
              <p className="text-xs text-muted-foreground">
                {upgradeTarget === 'fanatico' ? 'Aulas 6-9 + Plano 30 dias' : 'Todas as 13 aulas + Feedback + Live Q&A'}
              </p>
              <p className="text-xs text-primary font-semibold mt-1">
                +{getUpgradePrice(user.plan, upgradeTarget)} MT (único)
              </p>
            </div>
            <ChevronRight size={20} className="text-primary" />
          </div>
        </motion.button>
      )}

      <div className="space-y-2">
        {/* Change objective */}
        <button onClick={toggleObjective}
          className="glass-card p-4 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {user.objective === 'afiliado' ? <Target size={20} className="text-primary" /> : user.objective === 'gestor' ? <Megaphone size={20} className="text-accent" /> : <Sparkles size={20} className="text-purple-400" />}
            <div className="text-left">
              <span className="text-sm font-medium">Mudar Objectivo</span>
              <p className="text-[10px] text-muted-foreground">Actual: {user.objective === 'afiliado' ? 'Afiliado' : user.objective === 'gestor' ? 'Gestor de Tráfego' : 'Ambos'}</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>

        <button onClick={toggleTheme}
          className="glass-card p-4 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
            <span className="text-sm font-medium">Modo {isDark ? 'Escuro' : 'Claro'}</span>
          </div>
          <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${isDark ? 'bg-primary' : 'bg-muted'}`}>
            <motion.div className="w-5 h-5 rounded-full bg-white shadow-sm"
              animate={{ x: isDark ? 16 : 0 }} transition={{ type: 'spring', stiffness: 500 }} />
          </div>
        </button>

        <button onClick={handleLogout}
          className="glass-card p-4 w-full flex items-center gap-3 text-destructive">
          <LogOut size={20} />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
