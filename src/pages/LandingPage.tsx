import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Target, DollarSign, Smartphone, TrendingUp, Shield, ChevronRight, Star, AlertCircle, CheckCircle2, Sparkles, Play, Download, Wand2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useApp } from '@/contexts/AppContext';
import { Sun, Moon } from 'lucide-react';
import { plans } from '@/data/modules';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const benefits = [
  { icon: Smartphone, title: 'Só Celular', desc: 'Tudo feito no telemóvel, sem computador.' },
  { icon: DollarSign, title: 'Renda em Semanas', desc: 'Resultados reais com métodos testados em MZ.' },
  { icon: Target, title: '2 Caminhos Claros', desc: 'Afiliado Hotmart ou Gestor de Tráfego.' },
  { icon: TrendingUp, title: 'Plano de 14 Dias', desc: 'Checklist diário para primeiras vendas.' },
  { icon: Zap, title: 'Zero Enrolação', desc: 'Aulas práticas, vídeos curtos de 5-12 min.' },
  { icon: Shield, title: 'Comunidade Activa', desc: 'Suporte directo de alunos e professor.' },
];

const painPoints = [
  'Cursos longos que nunca acabas',
  'Teoria sem aplicação prática',
  'Plataformas que não pagam em MT',
  'Sem saber por onde começar',
];

const paths = [
  {
    emoji: '🔗', title: 'Caminho Afiliado',
    desc: 'Promove produtos Hotmart, Braip, Monetizze e Eduzz. Ganha comissões sem criar produto próprio.',
    highlights: ['Cria links de afiliado', 'Tráfego pago para converter', 'Escala com ROI tracking'],
  },
  {
    emoji: '📣', title: 'Caminho Gestor de Tráfego',
    desc: 'Gere anúncios Meta, Google e TikTok para marcas, produtos próprios ou clientes freelance.',
    highlights: ['Meta & TikTok Ads', 'Propostas para clientes', 'IA + Automação'],
  },
];

const testimonials = [
  { name: 'Carlos M.', text: 'Em 2 semanas fiz minha primeira comissão na Hotmart! O plano de 14 dias funciona mesmo.', plan: 'Boost' },
  { name: 'Ana S.', text: 'Aprendi a criar conteúdo profissional e anúncios só com o celular. Já tenho 3 clientes.', plan: 'Start' },
  { name: 'João P.', text: 'O módulo de Meta Ads mudou tudo. Agora faço gestão de tráfego como freelancer.', plan: 'Master' },
  { name: 'Maria L.', text: 'Comecei sem saber nada. Hoje ganho comissões todos os dias com afiliados.', plan: 'Start' },
];

const faqs = [
  { q: 'Preciso de computador?', a: 'Não! Tudo é feito no celular. Vídeos curtos de 5-12 min com foco prático.' },
  { q: 'Qual a diferença entre Afiliado e Gestor?', a: 'Afiliado promove produtos de outros e ganha comissão. Gestor gere anúncios para marcas/clientes como serviço.' },
  { q: 'Quais plataformas de afiliados?', a: 'Hotmart, Braip, Monetizze e Eduzz — plataformas reais com pagamentos verificados.' },
  { q: 'Quanto tempo leva para ver resultados?', a: 'Com o Plano de 14 Dias, muitos alunos fazem a primeira comissão/venda nas primeiras 2 semanas.' },
  { q: 'Posso fazer upgrade depois?', a: 'Sim! Começa com Start e faz upgrade para Boost ou Master a qualquer momento, pagando só a diferença.' },
  { q: 'O que inclui o feedback do Professor?', a: 'No plano Master, envias os teus anúncios e copys para revisão directa com comentários personalizados.' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useApp();
  const [headlineInput, setHeadlineInput] = useState('');
  const [generatedHeadlines, setGeneratedHeadlines] = useState<string[]>([]);

  const generateHeadlines = () => {
    if (!headlineInput.trim()) return;
    const headlines = [
      `🔥 ${headlineInput} que transforma a vida de empreendedores em MZ!`,
      `Descubre como ${headlineInput} pode mudar o teu negócio em 30 dias.`,
      `O segredo de ${headlineInput} que ninguém te conta — clica agora!`,
    ];
    setGeneratedHeadlines(headlines);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card rounded-none border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold gradient-text">SR47</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/auth')} className="text-sm font-semibold text-primary hover:underline hidden md:block">Entrar</button>
          <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-secondary transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative gradient-hero text-white px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute top-10 right-[-40px] w-40 h-40 rounded-full bg-accent/30 blur-3xl animate-liquid" />
        <div className="absolute bottom-0 left-[-30px] w-32 h-32 rounded-full bg-primary/40 blur-2xl animate-liquid" style={{ animationDelay: '2s' }} />
        <motion.div className="relative z-10 max-w-lg md:max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            SR Forty Seven<br /><span className="text-white/80 text-xl md:text-2xl font-semibold">O Professor Digital</span>
          </h1>
          <p className="text-white/80 text-sm md:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
            Experimenta grátis abaixo e vê porque a malta paga pelo curso completo. Aprende marketing digital prático com aulas do Professor, passo a passo no celular.
          </p>
          <button onClick={() => navigate('/auth')}
            className="bg-white text-navy font-bold px-8 py-3.5 rounded-2xl text-base hover:scale-105 transition-transform glow-blue">
            Começar Agora <ChevronRight className="inline ml-1" size={18} />
          </button>
        </motion.div>
      </section>

      <div className="max-w-lg md:max-w-5xl mx-auto px-4 md:px-8">
        {/* Pain Points */}
        <section className="py-10">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Cansado de... 😩</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">A maioria dos cursos falha porque não são práticos.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {painPoints.map((p, i) => (
              <motion.div key={i} className="glass-card p-4 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <AlertCircle size={20} className="text-destructive flex-shrink-0" />
                <span className="text-sm">{p}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-8">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Com SR47 tu vais... ✅</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {benefits.map((b, i) => (
              <motion.div key={i} className="glass-card-hover p-4 text-center"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <b.icon className="mx-auto mb-2 text-primary" size={28} />
                <h3 className="font-semibold text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Free Demo Section */}
        <section className="py-8">
          <motion.div className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Experimenta o que vais aprender – grátis agora! 🎁</h2>
            <p className="text-sm text-muted-foreground">Faz este exercício rápido no teu celular e vê o valor do curso na prática.</p>
          </motion.div>

          <div className="space-y-4">
            {/* Option 1: Video Demo */}
            <motion.div className="glass-card p-5 border border-border/50"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Play size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Vídeo Demo: Cria teu primeiro post top em 5 min</h3>
                  <p className="text-xs text-muted-foreground">Aprende a criar conteúdo profissional só com o celular.</p>
                </div>
              </div>
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero opacity-20" />
                <button className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play size={24} className="text-navy ml-1" />
                </button>
                <span className="absolute bottom-2 right-2 text-white/60 text-[10px] z-10">5:00</span>
              </div>
            </motion.div>

            {/* Option 2: Headline Generator */}
            <motion.div className="glass-card p-5 border border-border/50"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Wand2 size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Gera Headline Persuasivo</h3>
                  <p className="text-xs text-muted-foreground">Escreve a tua ideia e recebe 3 headlines prontos para usar.</p>
                </div>
              </div>
              <div className="space-y-3">
                <Input 
                  placeholder="Escreve a tua ideia (ex: curso de marketing digital)" 
                  value={headlineInput}
                  onChange={(e) => setHeadlineInput(e.target.value)}
                  className="text-sm"
                />
                <button 
                  onClick={generateHeadlines}
                  className="w-full py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Wand2 size={16} /> Gerar Headlines
                </button>
                {generatedHeadlines.length > 0 && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    {generatedHeadlines.map((headline, i) => (
                      <div key={i} className="glass-card p-3 text-sm">
                        {headline}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Option 3: PDF Download */}
            <motion.div className="glass-card p-5 border border-border/50"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Download size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Checklist Primeiro Anúncio Meta</h3>
                  <p className="text-xs text-muted-foreground">PDF gratuito com passo a passo para o teu primeiro anúncio.</p>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Download size={16} /> Baixar Checklist Grátis
              </button>
            </motion.div>
          </div>

          {/* Big CTA after teaser */}
          <motion.div className="mt-8 glass-card p-6 text-center glow-blue border border-primary/30"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <Sparkles size={32} className="mx-auto text-accent mb-3" />
            <h3 className="text-lg font-bold mb-2">Gostaste do grátis?</h3>
            <p className="text-sm text-muted-foreground mb-4">Quero o curso completo – Plano Start só 749 MT (acesso vitalício às aulas)</p>
            <button onClick={() => navigate('/auth?plan=iniciante')}
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-colors">
              Começar Agora <ChevronRight className="inline ml-1" size={18} />
            </button>
          </motion.div>
        </section>

        {/* Paths Preview */}
        <section className="py-8">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Dois Caminhos, Um Objectivo 💰</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Escolhe o teu na hora do onboarding.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paths.map((p, i) => (
              <motion.div key={i} className="glass-card p-5 border border-border/50"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <span className="text-3xl block mb-3">{p.emoji}</span>
                <h3 className="font-bold text-base mb-1">{p.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                <div className="space-y-1.5">
                  {p.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-center mb-6">O Que Dizem os Alunos ⭐</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="glass-card p-5 min-w-[260px] md:min-w-[300px] snap-center flex-shrink-0"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-accent fill-accent" />)}
                </div>
                <p className="text-sm mb-3 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{t.name}</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t.plan}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-8">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Escolhe o Teu Plano</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Pagamento Único, Acesso Vitalício às Aulas. Aprende com aulas práticas gravadas pelo Professor SR Forty Seven.</p>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            {plans.map((plan, i) => (
              <motion.div key={plan.id} className={`glass-card p-6 relative overflow-hidden ${plan.highlight ? 'glow-blue border border-primary/40' : 'border border-border/30'}`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, delay: i * 0.1 }}>
                {plan.highlight && (
                  <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={10} /> POPULAR
                  </span>
                )}
                <h3 className="text-lg font-bold mb-1">Plano {plan.name}</h3>
                <p className="text-3xl font-extrabold gradient-text mb-1">{plan.price} MT</p>
                <p className="text-xs text-muted-foreground mb-4">Pagamento Único • Acesso Vitalício às Aulas</p>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate(`/auth?plan=${plan.id}`)}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${plan.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
                  {plan.id === 'iniciante' ? 'Começar com Start' : plan.id === 'fanatico' ? 'Escolher Boost' : 'Escolher Master'}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 pb-12">
          <h2 className="text-xl font-bold text-center mb-6">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="glass-card p-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      {/* Sticky CTA - mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 glass-card rounded-none border-t border-border/50 md:hidden">
        <button onClick={() => navigate('/auth')}
          className="w-full max-w-lg mx-auto block py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-colors glow-blue">
          Começar Agora — 749 MT (único)
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
