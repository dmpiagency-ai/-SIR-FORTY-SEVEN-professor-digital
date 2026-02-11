import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Target, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ObjectiveType = 'afiliado' | 'gestor' | 'both';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, setObjective } = useApp();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<ObjectiveType | null>(null);

  const options: { key: ObjectiveType; icon: typeof Target; title: string; desc: string; emoji: string; plan: string }[] = [
    {
      key: 'afiliado',
      icon: Target,
      title: 'Quero ser Afiliado',
      desc: 'Ganhar comissões promovendo produtos na Hotmart, Braip, Monetizze e Eduzz. Aprende fazendo.',
      emoji: '🔗',
      plan: 'Plano de 14 dias para primeiras comissões',
    },
    {
      key: 'gestor',
      icon: Users,
      title: 'Quero ser Gestor de Tráfego',
      desc: 'Gerir campanhas para empresas e clientes locais em MZ. Aprende fazendo.',
      emoji: '📊',
      plan: 'Plano de 14 dias para primeiros clientes',
    },
    {
      key: 'both',
      icon: Sparkles,
      title: 'Quero os Dois',
      desc: 'Combinar afiliação e gestão para maximizar rendimentos. Rumo certo pra quem não sabe começar.',
      emoji: '🚀',
      plan: 'Plano de 14 dias para primeiros resultados',
    },
  ];

  const handleSelect = (key: ObjectiveType) => {
    setSelected(key);
    setTimeout(() => {
      setObjective(key);
      setStep(2);
    }, 300);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 right-[-50px] w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-liquid" />
      <div className="absolute bottom-20 left-[-40px] w-36 h-36 rounded-full bg-primary/30 blur-2xl animate-liquid" style={{ animationDelay: '3s' }} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" className="w-full max-w-sm relative z-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-accent" />
                <h2 className="text-xl font-bold text-white">Personaliza o Teu Caminho</h2>
              </div>
              <p className="text-white/60 text-sm mb-6">Escolhe o teu objectivo. Rumo certo pra quem não sabe começar.</p>
              
              <div className="space-y-3">
                {options.map((opt) => (
                  <button key={opt.key} onClick={() => handleSelect(opt.key)}
                    className={`glass-card p-4 w-full text-left transition-all ${selected === opt.key ? 'glow-blue border border-primary/40' : 'border border-white/20'}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{opt.emoji}</span>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm">{opt.title}</h3>
                        <p className="text-white/60 text-xs mt-1">{opt.desc}</p>
                        <p className="text-accent text-[10px] mt-2 font-medium">{opt.plan}</p>
                      </div>
                      {selected === opt.key && <CheckCircle2 size={20} className="text-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" className="w-full max-w-sm relative z-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Caminho Definido! 🎉</h2>
              <p className="text-white/60 text-sm mb-6">
                {selected === 'afiliado' && 'Vais aprender a ganhar comissões como afiliado.'}
                {selected === 'gestor' && 'Vais aprender a gerir tráfego para clientes.'}
                {selected === 'both' && 'Vais combinar afiliação e gestão de tráfego.'}
              </p>
              <div className="glass-card p-4 mb-6 text-left">
                <p className="text-xs text-muted-foreground mb-2">📋 O teu plano de 14 dias:</p>
                <ul className="text-xs space-y-1 text-white/80">
                  <li>• Dias 1-3: Completar aulas 1-3</li>
                  <li>• Dias 4-7: Primeiros exercícios práticos</li>
                  <li>• Dias 8-10: Criar primeira campanha</li>
                  <li>• Dias 11-14: Ajustar e escalar</li>
                </ul>
              </div>
              <Button onClick={handleContinue} className="w-full bg-white text-navy hover:bg-white/90">
                Começar Agora <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
