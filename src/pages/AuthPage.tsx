import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, PlanType } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Check, ArrowLeft, Smartphone, Sparkles } from 'lucide-react';
import { plans } from '@/data/modules';

type Step = 'signup' | 'plan' | 'payment' | 'success';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, user } = useApp();
  const [step, setStep] = useState<Step>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>((searchParams.get('plan') as PlanType) || null);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola'>('mpesa');
  const [isLogin, setIsLogin] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Login flow → go to plan selection or straight to onboarding
      login(name || 'Aluno', email || 'aluno@email.com', selectedPlan || 'iniciante');
      navigate('/onboarding');
      return;
    }
    setStep(selectedPlan ? 'payment' : 'plan');
  };

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
    setStep('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      login(name || 'Aluno', email || 'aluno@email.com', selectedPlan);
      navigate('/onboarding');
    }, 2500);
  };

  const getPlanPrice = (planId: PlanType): number => {
    const plan = plans.find(p => p.id === planId);
    return plan?.price || 0;
  };

  const getPlanName = (planId: PlanType): string => {
    const plan = plans.find(p => p.id === planId);
    return plan?.name || 'Start';
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 right-[-50px] w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-liquid" />
      <div className="absolute bottom-20 left-[-40px] w-36 h-36 rounded-full bg-primary/30 blur-2xl animate-liquid" style={{ animationDelay: '3s' }} />

      <AnimatePresence mode="wait">
        {step === 'signup' && (
          <motion.div key="signup" className="glass-card p-6 w-full max-w-sm relative z-10"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <button onClick={() => navigate('/')} className="text-white/70 mb-4 flex items-center gap-1 text-sm">
              <ArrowLeft size={16} /> Voltar
            </button>
            <h2 className="text-xl font-bold text-white mb-1">{isLogin ? 'Entrar' : 'Criar Conta'}</h2>
            <p className="text-white/60 text-sm mb-6">{isLogin ? 'Bem-vindo de volta!' : 'Começa a tua jornada digital. Aprende com aulas práticas.'}</p>
            <form onSubmit={handleSignup} className="space-y-3">
              {!isLogin && (
                <Input placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              )}
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              {!isLogin && (
                <Input placeholder="Telefone (84/85/86)" value={phone} onChange={e => setPhone(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              )}
              <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              <button type="submit" className="w-full py-3 rounded-xl bg-white text-navy font-bold hover:bg-white/90 transition-colors">
                {isLogin ? 'Entrar' : 'Continuar'}
              </button>
            </form>
            <p className="text-center text-white/50 text-sm mt-4">
              {isLogin ? 'Não tens conta? ' : 'Já tens conta? '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-white underline">
                {isLogin ? 'Criar conta' : 'Entrar'}
              </button>
            </p>
          </motion.div>
        )}

        {step === 'plan' && (
          <motion.div key="plan" className="w-full max-w-sm md:max-w-lg relative z-10 space-y-4"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-xl font-bold text-white text-center mb-2">Escolhe o Teu Plano</h2>
            <p className="text-white/60 text-sm text-center mb-4">Pagamento Único, Acesso Vitalício às Aulas. Aprende com aulas práticas gravadas pelo Professor SR Forty Seven.</p>
            <div className="space-y-3">
              {plans.map((plan) => (
                <button key={plan.id} onClick={() => handlePlanSelect(plan.id)}
                  className={`glass-card p-5 w-full text-left transition-all ${plan.highlight ? 'glow-blue border border-primary/40' : 'border border-white/20'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                      <p className="text-white/60 text-sm">{plan.features.slice(0, 2).join(' • ')}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-extrabold text-2xl">{plan.price} MT</span>
                      <p className="text-[10px] text-white/50">único</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div key="payment" className="glass-card p-6 w-full max-w-sm relative z-10"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-xl font-bold text-white mb-1">Pagamento Único – Plano {getPlanName(selectedPlan!)} {getPlanPrice(selectedPlan!)} MT</h2>
            <p className="text-white/60 text-sm mb-4">Acesso Vitalício às Aulas activado.</p>
            <div className="flex gap-2 mb-4">
              {(['mpesa', 'emola'] as const).map(m => (
                <button key={m} onClick={() => setPaymentMethod(m)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${paymentMethod === m ? 'bg-white text-navy' : 'bg-white/10 text-white/70'}`}>
                  {m === 'mpesa' ? 'M-Pesa' : 'e-Mola'}
                </button>
              ))}
            </div>
            <form onSubmit={handlePayment} className="space-y-3">
              <Input placeholder={`Número ${paymentMethod === 'mpesa' ? 'M-Pesa (84...)' : 'e-Mola (86...)'}`}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              <div className="glass-card p-3 flex items-center gap-3">
                <Smartphone size={20} className="text-accent" />
                <p className="text-white/70 text-xs">Vais receber um pedido de confirmação no teu telemóvel.</p>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-white text-navy font-bold hover:bg-white/90 transition-colors">
                Confirmar Pagamento
              </button>
            </form>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" className="text-center relative z-10"
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
            <motion.div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
              <Check size={40} className="text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Pagamento Único confirmado! 🎉</h2>
            <p className="text-white/70">Acesso Vitalício às Aulas activado. Começa o curso agora.</p>
            {[...Array(12)].map((_, i) => (
              <motion.div key={i} className="absolute w-2 h-2 rounded-full"
                style={{ background: i % 2 === 0 ? 'hsl(220,100%,50%)' : 'hsl(300,100%,44%)', left: '50%', top: '40%' }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ x: (Math.random() - 0.5) * 300 as number, y: (Math.random() - 0.5) * 300 as number, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.3 + i * 0.05 }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
