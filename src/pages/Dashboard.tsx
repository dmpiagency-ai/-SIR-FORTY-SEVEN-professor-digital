import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, DollarSign, CheckSquare, ArrowUp, Sparkles } from 'lucide-react';
import { modules, plans, getUpgradePrice } from '@/data/modules';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

const afiliadoTasks = [
  'Escolhe o teu nicho de afiliado',
  'Cria conta na Hotmart',
  'Gera o teu primeiro link de afiliado',
  'Cria 3 posts com Canva no celular',
  'Escreve 3 headlines persuasivas',
  'Configura WhatsApp Business',
  'Publica o teu primeiro conteúdo',
  'Cria primeiro anúncio Meta Ads',
  'Testa anúncio TikTok orgânico',
  'Liga link afiliado ao anúncio',
  'Analisa métricas da semana 1',
  'Optimiza o anúncio que funcionou',
  'Cria funil SMS/Email simples',
  'Revê resultados — planeja escala',
];

const gestorTasks = [
  'Define o teu serviço principal',
  'Cria portfólio mínimo (3 exemplos)',
  'Estuda Meta Ads — config básica',
  'Cria primeiro anúncio teste',
  'Configura WhatsApp Business',
  'Aprende TikTok Ads + orgânico',
  'Cria conteúdo visual com Canva',
  'Escreve copy para 3 tipos de ads',
  'Pratica targeting de público',
  'Monta proposta para cliente fictício',
  'Publica nos grupos de freelance',
  'Analisa métricas do teu anúncio',
  'Cria template de relatório',
  'Planeja os próximos 90 dias',
];

const Dashboard = () => {
  const { user, toggleTask, upgradePlan, getPlanInfo, canAccessModule } = useApp();
  const navigate = useNavigate();
  const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; targetPlan: 'fanatico' | 'pro' }>({ open: false, targetPlan: 'fanatico' });
  
  const planInfo = getPlanInfo();
  const dailyTasks = user.objective === 'gestor' ? gestorTasks : afiliadoTasks;
  const completedCount = user.completedTasks.length;
  const progressPct = Math.round((completedCount / 14) * 100);

  const recommendedModules = modules
    .filter(m => {
      if (!canAccessModule(m.id)) return false;
      return m.path === 'both' || m.path === user.objective;
    })
    .slice(0, 4);

  const getAvailableUpgrade = (): { target: 'fanatico' | 'pro' | null; price: number } => {
    if (!user.plan) return { target: 'fanatico', price: plans[0].price };
    if (user.plan === 'iniciante') return { target: 'fanatico', price: getUpgradePrice('iniciante', 'fanatico') };
    if (user.plan === 'fanatico') return { target: 'pro', price: getUpgradePrice('fanatico', 'pro') };
    return { target: null, price: 0 };
  };

  const availableUpgrade = getAvailableUpgrade();

  const handleUpgrade = () => {
    if (availableUpgrade.target) {
      upgradePlan(availableUpgrade.target);
      setUpgradeModal({ open: false, targetPlan: availableUpgrade.target });
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 max-w-lg md:max-w-5xl mx-auto space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl md:text-2xl font-bold">Olá, {user.name || 'Aluno'}! 👋</h1>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${user.plan === 'pro' ? 'bg-accent/20 text-accent' : user.plan === 'fanatico' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            Acesso Vitalício às Aulas – {planInfo?.name || 'Start'}
          </span>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${user.objective === 'afiliado' ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent'}`}>
            {user.objective === 'afiliado' ? '🔗 Afiliado' : '📣 Gestor de Tráfego'}
          </span>
        </div>
      </motion.div>

      {/* Upgrade Banner */}
      {availableUpgrade.target && (
        <motion.div className="glass-card p-4 border border-primary/30 glow-blue"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-accent" />
                <h3 className="font-semibold text-sm">Desbloqueia Mais Aulas</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Faz upgrade para {availableUpgrade.target === 'fanatico' ? 'Boost' : 'Master'} e desbloqueia {availableUpgrade.target === 'fanatico' ? 'aulas 6-9' : 'todas as 13 aulas'}.
              </p>
            </div>
            <Button onClick={() => setUpgradeModal({ open: true, targetPlan: availableUpgrade.target! })}
              size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
              <ArrowUp size={14} className="mr-1" />
              {availableUpgrade.price} MT
            </Button>
          </div>
        </motion.div>
      )}

      {/* Progress + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="glass-card p-5 flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                strokeDasharray={`${progressPct} ${100 - progressPct}`} strokeLinecap="round"
                className="transition-all duration-500" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-bold">{progressPct}%</span>
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base">Plano de {planInfo?.daysPlan || 14} Dias</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{completedCount}/14 tarefas concluídas</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Caminho: {user.objective === 'afiliado' ? 'Afiliado' : 'Gestor de Tráfego'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: BarChart3, label: 'Campanhas', value: '2' },
            { icon: DollarSign, label: 'Comissões', value: '450 MT' },
            { icon: CheckSquare, label: 'Tarefas', value: `${completedCount}` },
          ].map((s, i) => (
            <motion.div key={i} className="glass-card p-3 md:p-4 text-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <s.icon size={20} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Checklist + Recommended Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold text-base mb-3">📋 Plano de {planInfo?.daysPlan || 14} Dias</h2>
          <div className="glass-card p-4 space-y-2 max-h-60 md:max-h-80 overflow-y-auto">
            {dailyTasks.map((task, i) => {
              const done = user.completedTasks.includes(i);
              return (
                <button key={i} onClick={() => toggleTask(i)}
                  className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all text-sm ${done ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-primary border-primary' : 'border-muted-foreground/30'}`}>
                    {done && <span className="text-primary-foreground text-xs">✓</span>}
                  </div>
                  <span className={`${done ? 'line-through text-muted-foreground' : ''}`}>
                    Dia {i + 1}: {task}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-base mb-3">🎯 Recomendados para Ti</h2>
          <div className="grid grid-cols-2 gap-3">
            {recommendedModules.map((m, i) => (
              <motion.button key={m.id} onClick={() => navigate(`/modules/${m.id}`)}
                className="glass-card-hover p-4 text-left"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <span className="text-2xl mb-2 block">{m.icon}</span>
                <h3 className="font-semibold text-sm line-clamp-1">{m.title}</h3>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{m.description}</p>
                <span className={`inline-block mt-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full ${m.path === 'afiliado' ? 'bg-primary/15 text-primary' : m.path === 'gestor' ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'}`}>
                  {m.path === 'both' ? 'Ambos' : m.path === 'afiliado' ? 'Afiliado' : 'Gestor'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={upgradeModal.open} onOpenChange={(open) => setUpgradeModal({ ...upgradeModal, open })}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles size={20} className="text-accent" />
              Fazer Upgrade
            </DialogTitle>
            <DialogDescription>
              Desbloqueia mais aulas e funcionalidades avançadas.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="glass-card p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Plano actual: <span className="font-semibold text-foreground">{planInfo?.name || 'Start'}</span></p>
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

export default Dashboard;
