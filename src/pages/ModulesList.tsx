import { useApp } from '@/contexts/AppContext';
import { modules, plans, getUpgradePrice } from '@/data/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowUp, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ModulesList = () => {
  const { user, canAccessModule, upgradePlan } = useApp();
  const navigate = useNavigate();
  const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; targetPlan: 'fanatico' | 'pro' }>({ open: false, targetPlan: 'fanatico' });

  const getPathBadge = (path: string) => {
    if (path === 'afiliado') return { label: '🔗 Afiliado', cls: 'bg-primary/15 text-primary' };
    if (path === 'gestor') return { label: '📣 Gestor', cls: 'bg-accent/15 text-accent' };
    return { label: 'Ambos', cls: 'bg-muted text-muted-foreground' };
  };

  const getLockBadge = (planRequired: 'iniciante' | 'fanatico' | 'pro') => {
    if (planRequired === 'fanatico') return { label: 'Boost+', cls: 'bg-accent/20 text-accent' };
    if (planRequired === 'pro') return { label: 'Master only', cls: 'bg-primary/20 text-primary' };
    return null;
  };

  const handleUpgrade = () => {
    upgradePlan(upgradeModal.targetPlan);
    setUpgradeModal({ open: false, targetPlan: upgradeModal.targetPlan });
  };

  const getUpgradeTarget = (planRequired: 'iniciante' | 'fanatico' | 'pro'): 'fanatico' | 'pro' => {
    if (!user.plan) return planRequired === 'iniciante' ? 'fanatico' : planRequired;
    if (user.plan === 'iniciante') return planRequired === 'iniciante' ? 'fanatico' : planRequired;
    if (user.plan === 'fanatico' && planRequired === 'pro') return 'pro';
    return planRequired === 'iniciante' ? 'fanatico' : planRequired;
  };

  return (
    <div className="px-4 md:px-8 py-6 max-w-lg md:max-w-5xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-1">Aulas</h1>
      <p className="text-sm text-muted-foreground mb-5">13 aulas — Meta Ads, Afiliados, Tráfego Pago e mais. Aprende fazendo nas aulas.</p>
      <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
        {modules.map((mod, i) => {
          const locked = !canAccessModule(mod.id);
          const progress = user.moduleProgress[mod.id] || 0;
          const isRecommended = mod.path === 'both' || mod.path === user.objective;
          const badge = getPathBadge(mod.path);
          const lockBadge = getLockBadge(mod.planRequired);
          return (
            <motion.button key={mod.id}
              onClick={() => {
                if (locked) {
                  const targetPlan = getUpgradeTarget(mod.planRequired);
                  setUpgradeModal({ open: true, targetPlan });
                } else {
                  navigate(`/modules/${mod.id}`);
                }
              }}
              className={`glass-card-hover p-4 w-full text-left flex items-start gap-4 relative overflow-hidden ${locked ? 'opacity-60' : ''} ${isRecommended && !locked ? 'border border-primary/20' : ''}`}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}>
              <span className="text-2xl flex-shrink-0 mt-0.5">{mod.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm truncate">{mod.id}. {mod.title}</h3>
                  {locked && <Lock size={14} className="text-muted-foreground flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{mod.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={progress} className="h-1.5 flex-1" />
                  <span className="text-[10px] text-muted-foreground">{progress}%</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badge.cls}`}>{badge.label}</span>
                  {lockBadge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${lockBadge.cls}`}>
                      {lockBadge.label}
                    </span>
                  )}
                  {isRecommended && !locked && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      Recomendado
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Upgrade Modal */}
      <Dialog open={upgradeModal.open} onOpenChange={(open) => setUpgradeModal({ ...upgradeModal, open })}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles size={20} className="text-accent" />
              Desbloqueia Mais Aulas
            </DialogTitle>
            <DialogDescription>
              Faz upgrade para o plano {upgradeModal.targetPlan === 'fanatico' ? 'Boost' : 'Master'} e desbloqueia todas as aulas avançadas.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="glass-card p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Plano actual: <span className="font-semibold text-foreground">{user.plan ? plans.find(p => p.id === user.plan)!.name : 'Nenhum'}</span></p>
              <p className="text-sm text-muted-foreground">Plano alvo: <span className="font-semibold text-primary">{upgradeModal.targetPlan === 'fanatico' ? 'Boost' : 'Master'}</span></p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold gradient-text mb-1">
                {getUpgradePrice(user.plan, upgradeModal.targetPlan)} MT
              </p>
              <p className="text-xs text-muted-foreground">Pagamento Único • Acesso Vitalício às Aulas</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeModal({ ...upgradeModal, open: false })}>
              Cancelar
            </Button>
            <Button onClick={handleUpgrade} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowUp size={16} className="mr-2" />
              Fazer Upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModulesList;
