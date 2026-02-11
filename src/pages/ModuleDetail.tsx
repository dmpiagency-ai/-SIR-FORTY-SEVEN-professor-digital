import { useParams, useNavigate } from 'react-router-dom';
import { modules, plans, getUpgradePrice } from '@/data/modules';
import { useApp } from '@/contexts/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Download, ExternalLink, Upload, Send, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateModuleProgress, canAccessModule, upgradePlan } = useApp();
  const mod = modules.find(m => m.id === Number(id));
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [stepperIndex, setStepperIndex] = useState(0);
  const [adCopy, setAdCopy] = useState('');
  const [feedback, setFeedback] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [adDesc, setAdDesc] = useState('');
  const [adUrl, setAdUrl] = useState('');
  const [adBudget, setAdBudget] = useState('');
  const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; targetPlan: 'fanatico' | 'pro' }>({ open: false, targetPlan: 'fanatico' });

  if (!mod) return <div className="p-6 text-center">Aula não encontrada</div>;

  const locked = !canAccessModule(mod.id);
  
  const getUpgradeTarget = (): 'fanatico' | 'pro' | null => {
    if (!user.plan) return 'fanatico';
    if (user.plan === 'iniciante') return mod.planRequired === 'pro' ? 'pro' : 'fanatico';
    if (user.plan === 'fanatico' && mod.planRequired === 'pro') return 'pro';
    return null;
  };

  const upgradeTarget = getUpgradeTarget();

  if (locked && upgradeTarget) {
    return (
      <div className="px-4 py-6 max-w-lg mx-auto text-center">
        <p className="text-4xl mb-4">🔒</p>
        <h2 className="text-lg font-bold mb-2">Aula {mod.planRequired === 'fanatico' ? 'Boost+' : 'Master only'}</h2>
        <p className="text-sm text-muted-foreground mb-4">Faz upgrade para aceder a esta aula. Aprende fazendo nas aulas.</p>
        <button onClick={() => setUpgradeModal({ open: true, targetPlan: upgradeTarget })} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 mx-auto">
          <Sparkles size={16} /> Fazer Upgrade ({getUpgradePrice(user.plan, upgradeTarget)} MT)
        </button>
        
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
              <Button onClick={() => { upgradePlan(upgradeModal.targetPlan); setUpgradeModal({ ...upgradeModal, open: false }); }} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Fazer Upgrade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  const handleQuiz = () => {
    updateModuleProgress(mod.id, Math.min(100, (user.moduleProgress[mod.id] || 0) + 25));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Quiz questions per module
  const quizQuestions: Record<number, { q: string; opts: string[]; correct: number }> = {
    1: { q: 'Qual é o primeiro passo para ganhar online em MZ?', opts: ['Comprar curso caro', 'Escolher um nicho lucrativo', 'Criar site complexo', 'Esperar sorte'], correct: 1 },
    2: { q: 'Qual app é melhor para criar posts no celular?', opts: ['Photoshop desktop', 'Canva', 'AutoCAD', 'Excel'], correct: 1 },
    3: { q: 'O que é um CTA?', opts: ['Conta de Trading', 'Call To Action', 'Copy de Texto', 'Central de Ajuda'], correct: 1 },
    4: { q: 'Meta Ads serve para anunciar em quais plataformas?', opts: ['Google e YouTube', 'Facebook e Instagram', 'TikTok e Snapchat', 'LinkedIn e Twitter'], correct: 1 },
    5: { q: 'Qual tipo de conteúdo funciona melhor no TikTok?', opts: ['Textos longos', 'Vídeos curtos e dinâmicos', 'PDFs', 'Imagens estáticas'], correct: 1 },
    6: { q: 'Qual destas é uma plataforma real de afiliados?', opts: ['AffiliateBot', 'Hotmart', 'PayAffiliate', 'CashGuru'], correct: 1 },
    7: { q: 'O que é tráfego pago?', opts: ['Visitas orgânicas', 'Pagar para mostrar anúncios', 'Marketing por email', 'SEO avançado'], correct: 1 },
    8: { q: 'Qual ferramenta é gratuita para email marketing?', opts: ['Salesforce', 'Brevo (Sendinblue)', 'HubSpot Enterprise', 'Adobe Campaign'], correct: 1 },
    9: { q: 'O que é remarketing?', opts: ['Anunciar para novos públicos', 'Re-anunciar para quem já visitou', 'Email marketing', 'SEO'], correct: 1 },
    10: { q: 'O que significa ROI?', opts: ['Rate of Interest', 'Return on Investment', 'Revenue of Income', 'Risk of Inflation'], correct: 1 },
    11: { q: 'Quanto cobrar como gestor de tráfego iniciante?', opts: ['Grátis sempre', '500-2000 MT/mês por cliente', '50.000 MT/mês', 'Só comissão'], correct: 1 },
    12: { q: 'Como a IA ajuda no marketing?', opts: ['Substitui tudo', 'Gera copy e criativos rápido', 'Não ajuda', 'Só para programadores'], correct: 1 },
    13: { q: 'Como conseguir clientes sem portfólio?', opts: ['Não é possível', 'Oferecer teste gratuito/case fictício', 'Mentir sobre experiência', 'Esperar anos'], correct: 1 },
  };

  const quiz = quizQuestions[mod.id] || quizQuestions[1];

  // Resources per module
  const resourceNames: Record<number, string[]> = {
    1: ['Guia Nichos MZ (PDF)', 'Lista Infoprodutos', 'Checklist de Pesquisa'],
    2: ['Templates Canva', 'Guia CapCut Reels', 'Checklist Post Perfeito'],
    3: ['Swipe File Headlines', 'Template CTA', 'Exercício Copy'],
    4: ['Guia Meta Ads Básico', 'Checklist Configuração', 'Template Público-Alvo'],
    5: ['Guia TikTok Ads', 'Scripts Virais', 'Checklist Conteúdo'],
    6: ['Passo-a-Passo Hotmart', 'Guia Braip/Monetizze', 'Template Link Bio'],
    7: ['Guia Tráfego p/ Afiliados', 'Template Anúncios', 'Calculadora ROI'],
    8: ['Guia WhatsApp Business', 'Templates SMS', 'Checklist Brevo'],
    9: ['Google Ads Avançado PDF', 'Template Campanhas', 'Guia Remarketing'],
    10: ['Escala Hotmart PDF', 'ROI Tracker Template', 'Multi-Plataforma Guide'],
    11: ['Template Proposta Cliente', 'Precificação Guide', 'Contrato Modelo'],
    12: ['Prompts IA Marketing', 'Automação Guide', 'Templates Criativos IA'],
    13: ['Plano 90 Dias Template', 'CV Marketing Digital', 'Proposta Freelancer'],
  };

  // References per module
  const refLinks: Record<number, string[]> = {
    1: ['Pesquisa de nichos MZ', 'Guia infoprodutos'],
    2: ['Canva.com', 'CapCut App'],
    3: ['Swipe File Online', 'Copy Hackers Blog'],
    4: ['Meta Business Suite', 'Facebook Ads Manager'],
    5: ['TikTok for Business', 'TikTok Creative Center'],
    6: ['Hotmart.com', 'Braip.com', 'Monetizze.com.br', 'Eduzz.com'],
    7: ['Meta Ads Library', 'Google Trends'],
    8: ['WhatsApp Business', 'Brevo.com'],
    9: ['Google Ads', 'Google Keyword Planner'],
    10: ['Hotmart Analytics', 'Braip Dashboard'],
    11: ['Workana.com', 'LinkedIn Jobs'],
    12: ['ChatGPT', 'Canva AI', 'Copy.ai'],
    13: ['LinkedIn Profile Tips', 'Freelancer.com'],
  };

  const resources = resourceNames[mod.id] || ['Guia PDF', 'Template', 'Checklist'];
  const refs = refLinks[mod.id] || ['Documentação', 'Tutorial'];

  return (
    <div className="px-4 md:px-8 py-4 max-w-lg md:max-w-4xl mx-auto">
      <button onClick={() => navigate('/modules')} className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <ArrowLeft size={16} /> Voltar
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{mod.icon}</span>
          <div>
            <h1 className="text-lg font-bold">{mod.title}</h1>
            <p className="text-xs text-muted-foreground">{mod.lessons} lições • {mod.path === 'both' ? 'Ambos caminhos' : mod.path === 'afiliado' ? 'Caminho Afiliado' : 'Caminho Gestor'}</p>
          </div>
        </div>

        <Tabs defaultValue="video" className="w-full">
          <TabsList className="w-full grid grid-cols-4 glass-card h-10">
            <TabsTrigger value="video" className="text-xs">Vídeo</TabsTrigger>
            <TabsTrigger value="recursos" className="text-xs">Recursos</TabsTrigger>
            <TabsTrigger value="exercicios" className="text-xs">Exercícios</TabsTrigger>
            <TabsTrigger value="refs" className="text-xs">Refs</TabsTrigger>
          </TabsList>

          {/* Video Tab */}
          <TabsContent value="video" className="mt-4">
            <div className="glass-card aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 gradient-hero opacity-30" />
              <button className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                <Play size={24} className="text-navy ml-1" />
              </button>
              <span className="absolute bottom-3 right-3 text-white/60 text-xs z-10">5-12 min</span>
            </div>
            <h3 className="font-semibold text-sm mt-3">Lição 1: Introdução a {mod.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{mod.description}</p>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="recursos" className="mt-4 space-y-3">
            {resources.map((r, i) => (
              <div key={i} className="glass-card p-3 flex items-center justify-between">
                <span className="text-sm">{r}</span>
                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercicios" className="mt-4 space-y-4">
            {/* Module 1: Niches grid */}
            {mod.id === 1 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Nichos Que Pagam em MZ</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Infoprodutos', 'Serviços Locais', 'Saúde/Fitness', 'Finanças Pessoais', 'Culinária', 'Tecnologia'].map(n => (
                    <div key={n} className="glass-card-hover p-3 text-center">
                      <span className="text-lg block mb-1">🎯</span>
                      <span className="text-xs font-medium">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Module 2: Content creator upload */}
            {mod.id === 2 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Cria o Teu Post/Reel</h3>
                <div className="glass-card p-4 border-dashed border-2 border-border text-center">
                  <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Carrega post ou reel criado com Canva/CapCut</p>
                  <input type="file" className="hidden" id="upload-content" accept="image/*,video/*" />
                  <label htmlFor="upload-content" className="mt-2 inline-block px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold cursor-pointer">
                    Escolher Ficheiro
                  </label>
                </div>
              </div>
            )}

            {/* Module 4 & 5: Ad simulator */}
            {(mod.id === 4 || mod.id === 5) && (
              <div>
                <h3 className="font-semibold text-sm mb-3">{mod.id === 4 ? 'Simulador Meta Ads' : 'Simulador TikTok Ads'}</h3>
                <div className="space-y-2">
                  <Input placeholder="Objectivo da campanha (ex: Tráfego WhatsApp)" className="text-sm" value={adCopy} onChange={e => setAdCopy(e.target.value)} />
                  <Input placeholder="Texto do anúncio" className="text-sm" />
                  <Input placeholder="Público-alvo (ex: Homens 18-35, Maputo)" className="text-sm" />
                  <Input placeholder="Orçamento diário (MT)" type="number" className="text-sm" value={adBudget} onChange={e => setAdBudget(e.target.value)} />
                  <Input placeholder="Link destino (WhatsApp ou link afiliado)" className="text-sm" />
                  <div className="glass-card p-3 border-dashed border-2 border-border text-center">
                    <Upload size={20} className="mx-auto text-muted-foreground mb-1" />
                    <p className="text-[10px] text-muted-foreground">Carrega imagem/vídeo do anúncio</p>
                  </div>
                  <div className="glass-card p-3 mt-2">
                    <p className="text-xs text-muted-foreground mb-1">📱 Pré-visualização:</p>
                    <div className="border border-border rounded-lg p-3">
                      <p className="text-xs font-medium text-primary">Patrocinado</p>
                      <div className="w-full h-24 bg-muted rounded-lg mt-1 flex items-center justify-center text-xs text-muted-foreground">Imagem do anúncio</div>
                      <p className="text-xs mt-2">{adCopy || 'Texto do teu anúncio aqui...'}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Orçamento: {adBudget || '0'} MT/dia</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Module 6: Affiliate platform stepper */}
            {mod.id === 6 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Criar Conta — Passo a Passo</h3>
                {['Hotmart', 'Braip', 'Monetizze', 'Eduzz'].map((p, i) => (
                  <motion.div key={i}
                    className={`glass-card p-4 mb-2 transition-all ${stepperIndex === i ? 'glow-blue border-primary/40' : stepperIndex > i ? 'opacity-50' : ''}`}
                    animate={{ scale: stepperIndex === i ? 1.02 : 1 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${stepperIndex > i ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'}`}>
                        {stepperIndex > i ? '✓' : i + 1}
                      </span>
                      <span className="font-semibold text-sm">{p}</span>
                    </div>
                    {stepperIndex === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                        <Input placeholder={`Email para ${p}`} className="text-sm mb-2" />
                        <Input placeholder="Senha" type="password" className="text-sm mb-2" />
                        <button onClick={() => setStepperIndex(i + 1)}
                          className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                          {i === 3 ? 'Concluir' : 'Próxima Plataforma'}
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                {stepperIndex >= 4 && (
                  <motion.div className="glass-card p-4 text-center glow-blue"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <CheckCircle2 size={40} className="mx-auto text-green-500 mb-2" />
                    <p className="font-bold text-sm">Todas as contas criadas! 🎉</p>
                    <button onClick={() => setStepperIndex(0)} className="mt-2 text-xs text-primary underline">Repetir</button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Module 7: Traffic for affiliates */}
            {mod.id === 7 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Construir Campanha Afiliado</h3>
                <div className="space-y-2">
                  <Input placeholder="Link de afiliado (Hotmart/Braip)" className="text-sm" value={adUrl} onChange={e => setAdUrl(e.target.value)} />
                  <Input placeholder="Copy do anúncio" className="text-sm" value={adCopy} onChange={e => setAdCopy(e.target.value)} />
                  <Input placeholder="Público-alvo" className="text-sm" />
                  <Input placeholder="Orçamento diário (MT)" type="number" className="text-sm" value={adBudget} onChange={e => setAdBudget(e.target.value)} />
                  <div className="glass-card p-3 mt-2">
                    <p className="text-xs text-muted-foreground mb-1">📊 Estimativa:</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div><p className="text-sm font-bold">{adBudget ? Math.round(Number(adBudget) * 15) : 0}</p><p className="text-[10px] text-muted-foreground">Impressões</p></div>
                      <div><p className="text-sm font-bold">{adBudget ? Math.round(Number(adBudget) * 1.5) : 0}</p><p className="text-[10px] text-muted-foreground">Cliques</p></div>
                      <div><p className="text-sm font-bold">{adBudget ? Math.round(Number(adBudget) * 0.15) : 0}</p><p className="text-[10px] text-muted-foreground">Conversões est.</p></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Module 8: SMS/Email */}
            {mod.id === 8 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Criar Funil SMS/Email</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, title: 'Configurar WhatsApp Business', desc: 'Catálogo, respostas rápidas' },
                    { step: 2, title: 'Criar conta Brevo (grátis)', desc: 'Email marketing básico' },
                    { step: 3, title: 'Montar sequência de follow-up', desc: 'SMS + Email automático' },
                  ].map((s, i) => (
                    <motion.div key={i}
                      className={`glass-card p-4 transition-all ${stepperIndex === i ? 'glow-blue border-primary/40' : stepperIndex > i ? 'opacity-50' : ''}`}
                      animate={{ scale: stepperIndex === i ? 1.02 : 1 }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${stepperIndex > i ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'}`}>
                          {stepperIndex > i ? '✓' : s.step}
                        </span>
                        <span className="font-semibold text-sm">{s.title}</span>
                      </div>
                      {stepperIndex === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                          <p className="text-xs text-muted-foreground mb-2">{s.desc}</p>
                          <Input placeholder={i === 0 ? 'Número WhatsApp Business' : i === 1 ? 'Email para Brevo' : 'Texto da mensagem follow-up'} className="text-sm mb-2" />
                          <button onClick={() => setStepperIndex(i + 1)}
                            className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                            {i === 2 ? 'Concluir Funil' : 'Continuar'}
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                  {stepperIndex >= 3 && (
                    <motion.div className="glass-card p-4 text-center glow-blue"
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <CheckCircle2 size={40} className="mx-auto text-green-500 mb-2" />
                      <p className="font-bold text-sm">Funil Configurado! 🎉</p>
                      <button onClick={() => setStepperIndex(0)} className="mt-2 text-xs text-primary underline">Repetir</button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Module 9: Google Ads builder */}
            {mod.id === 9 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Google Ads Builder</h3>
                <div className="space-y-2">
                  <Input placeholder="Título do anúncio (max 30 chars)" className="text-sm" value={adTitle} onChange={e => setAdTitle(e.target.value)} />
                  <Input placeholder="Descrição linha 1" className="text-sm" value={adDesc} onChange={e => setAdDesc(e.target.value)} />
                  <Input placeholder="Descrição linha 2" className="text-sm" />
                  <Input placeholder="URL de destino" className="text-sm" value={adUrl} onChange={e => setAdUrl(e.target.value)} />
                  <Input placeholder="Palavras-chave (separadas por vírgula)" className="text-sm" />
                  <Input placeholder="Orçamento diário (MT)" type="number" className="text-sm" value={adBudget} onChange={e => setAdBudget(e.target.value)} />
                  <div className="glass-card p-3 mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Pré-visualização Google:</p>
                    <div className="border border-border rounded-lg p-2">
                      <p className="text-primary text-sm font-medium">{adTitle || 'Título do Anúncio'}</p>
                      <p className="text-green-600 text-[10px]">{adUrl || 'www.example.com'}</p>
                      <p className="text-xs text-muted-foreground">{adDesc || 'Descrição do anúncio aparece aqui...'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Module 10: Affiliate scale */}
            {mod.id === 10 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">ROI Calculator</h3>
                <div className="space-y-2">
                  <Input placeholder="Investimento em ads (MT)" type="number" className="text-sm" value={adBudget} onChange={e => setAdBudget(e.target.value)} />
                  <Input placeholder="Comissão por venda (MT)" type="number" className="text-sm" value={adCopy} onChange={e => setAdCopy(e.target.value)} />
                  <Input placeholder="Vendas no período" type="number" className="text-sm" value={adDesc} onChange={e => setAdDesc(e.target.value)} />
                  <div className="glass-card p-4 mt-2">
                    <p className="text-xs text-muted-foreground mb-2">📊 Resultado:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div><p className="text-sm font-bold">{adCopy && adDesc ? Number(adCopy) * Number(adDesc) : 0} MT</p><p className="text-[10px] text-muted-foreground">Receita Total</p></div>
                      <div><p className={`text-sm font-bold ${(Number(adCopy) * Number(adDesc) - Number(adBudget)) > 0 ? 'text-green-500' : 'text-destructive'}`}>
                        {adCopy && adDesc && adBudget ? Number(adCopy) * Number(adDesc) - Number(adBudget) : 0} MT
                      </p><p className="text-[10px] text-muted-foreground">Lucro (ROI)</p></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Module 11: Client proposal */}
            {mod.id === 11 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Criar Proposta para Cliente</h3>
                <div className="space-y-2">
                  <Input placeholder="Nome do cliente/marca" className="text-sm" />
                  <Input placeholder="Serviço oferecido (ex: Gestão Meta Ads)" className="text-sm" />
                  <Input placeholder="Preço mensal (MT)" type="number" className="text-sm" />
                  <Input placeholder="Duração do contrato (meses)" type="number" className="text-sm" />
                  <textarea placeholder="Descrição do serviço e deliverables..." className="w-full text-sm p-3 rounded-xl glass-card border border-border min-h-[80px] bg-transparent resize-none" />
                </div>
              </div>
            )}

            {/* Module 12: AI tools */}
            {mod.id === 12 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">IA Copy Generator (Simulado)</h3>
                <div className="space-y-2">
                  <Input placeholder="Produto ou serviço" className="text-sm" value={adTitle} onChange={e => setAdTitle(e.target.value)} />
                  <Input placeholder="Público-alvo" className="text-sm" value={adDesc} onChange={e => setAdDesc(e.target.value)} />
                  <button onClick={() => setAdCopy(`🔥 ${adTitle || 'Produto'} que transforma a vida de ${adDesc || 'empreendedores'}! Clica agora e descobre como começar hoje. Vagas limitadas! 👇`)}
                    className="w-full py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold">
                    🤖 Gerar Copy com IA
                  </button>
                  {adCopy && (
                    <div className="glass-card p-3 mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Copy gerada:</p>
                      <p className="text-sm">{adCopy}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Module 13: 90-day plan */}
            {mod.id === 13 && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Plano 90 Dias</h3>
                <div className="space-y-2">
                  {[
                    { phase: 'Mês 1', tasks: 'Completar aulas, primeiras campanhas, 2-3 testes' },
                    { phase: 'Mês 2', tasks: 'Escalar o que funciona, buscar clientes/vendas' },
                    { phase: 'Mês 3', tasks: 'Automatizar, portfólio, renda recorrente' },
                  ].map((p, i) => (
                    <div key={i} className="glass-card p-4">
                      <h4 className="font-bold text-sm text-primary">{p.phase}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{p.tasks}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz (all modules) */}
            <div className="mt-4">
              <h3 className="font-semibold text-sm mb-3">Quiz Rápido</h3>
              <div className="glass-card p-4 space-y-3">
                <p className="text-sm font-medium">{quiz.q}</p>
                {quiz.opts.map((opt, i) => (
                  <button key={i} onClick={() => setQuizAnswers({ ...quizAnswers, 0: i })}
                    className={`w-full text-left p-2.5 rounded-xl text-sm transition-all ${quizAnswers[0] === i ? (i === quiz.correct ? 'bg-green-500/20 border border-green-500/50' : 'bg-destructive/20 border border-destructive/50') : 'glass-card hover:bg-muted'}`}>
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={handleQuiz}
                className="w-full mt-3 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                Submeter Exercícios
              </button>
            </div>

            {/* Master: Feedback */}
            {user.plan === 'pro' && (
              <div className="mt-4 glass-card p-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">💬 Feedback do Professor</h4>
                <Input placeholder="Envia o teu trabalho para revisão..." value={feedback} onChange={e => setFeedback(e.target.value)} className="text-sm mb-2" />
                <button className="px-4 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1">
                  <Send size={12} /> Enviar para Revisão
                </button>
                {feedback && (
                  <div className="mt-3 glass-card p-3 border-l-4 border-accent">
                    <p className="text-[10px] text-accent font-bold mb-1">Professor SR47:</p>
                    <p className="text-xs text-muted-foreground">Bom trabalho! Sugiro melhorar o CTA — usa urgência e benefício directo. Tenta: "Últimas vagas — garante já o teu desconto!" 💪</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* References Tab */}
          <TabsContent value="refs" className="mt-4 space-y-3">
            {refs.map((r, i) => (
              <div key={i} className="glass-card p-3 flex items-center justify-between">
                <span className="text-sm">{r}</span>
                <ExternalLink size={16} className="text-primary" />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="glass-card border-primary/30 text-center max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">
              <CheckCircle2 size={48} className="mx-auto text-green-500 mb-2" />
              Exercício Concluído! 🎉
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Progresso guardado com sucesso.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleDetail;
