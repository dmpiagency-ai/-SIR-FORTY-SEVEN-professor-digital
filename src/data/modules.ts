export interface Module {
  id: number;
  title: string;
  description: string;
  icon: string;
  planRequired: 'iniciante' | 'fanatico' | 'pro';
  lessons: number;
  path: 'both' | 'afiliado' | 'gestor';
}

export interface Plan {
  id: 'iniciante' | 'fanatico' | 'pro';
  name: string;
  price: number;
  modules: number[];
  features: string[];
  daysPlan: number;
  highlight?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'iniciante',
    name: 'Start',
    price: 749,
    modules: [1, 2, 3, 4, 5],
    features: [
      'Aulas 1-5 completas',
      'Exercícios práticos hands-on',
      'Comunidade de alunos',
      'Plano de 14 dias com tarefas reais',
      'Meta Ads Básico',
      'TikTok Ads + Orgânico',
      'Copy Persuasiva Básica',
    ],
    daysPlan: 14,
  },
  {
    id: 'fanatico',
    name: 'Boost',
    price: 1499,
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    features: [
      'Aulas 1-9 completas',
      'Exercícios mais profundos',
      'Comunidade de alunos',
      'Plano de 30 dias acelerado',
      'Meta Ads Básico + Avançado',
      'TikTok Ads + Orgânico',
      'Afiliados Hotmart Intro',
      'Tráfego Pago para Afiliados',
      'SMS/Email Marketing',
    ],
    daysPlan: 30,
    highlight: true,
  },
  {
    id: 'pro',
    name: 'Master',
    price: 2749,
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    features: [
      'Todas as 13 aulas completas',
      'Feedback personalizado do Professor',
      'Live Q&A semanal',
      'Consultoria 1:1',
      'Review de campanhas',
      'Google Ads Avançado',
      'Afiliados escala + ROI',
      'IA + Automação',
      'Gestão clientes freelance',
      'Plano de 90 dias carreira',
      'Actualizações vitalícias',
    ],
    daysPlan: 90,
  },
];

export const modules: Module[] = [
  { id: 1, title: 'Fundamentos + Nichos MZ', description: 'Infoprodutos, serviços locais e nichos que pagam em Moçambique. Aprende fazendo nas aulas.', icon: '🎯', planRequired: 'iniciante', lessons: 5, path: 'both' },
  { id: 2, title: 'Conteúdo Visual no Celular', description: 'Posts e Reels profissionais com Canva e CapCut — só celular. Aplica já no mercado.', icon: '📱', planRequired: 'iniciante', lessons: 6, path: 'both' },
  { id: 3, title: 'Copy Persuasiva Básica', description: 'Headlines, CTAs e textos que convertem seguidores em clientes. Prática imediata.', icon: '✍️', planRequired: 'iniciante', lessons: 5, path: 'both' },
  { id: 4, title: 'Meta Ads Básico', description: 'Configuração simples — tráfego directo para WhatsApp ou link afiliado. Resultados rápidos.', icon: '📣', planRequired: 'iniciante', lessons: 6, path: 'gestor' },
  { id: 5, title: 'TikTok Ads + Orgânico', description: 'Cria conteúdo viral e anúncios no TikTok para vender. Aprende na prática.', icon: '🎵', planRequired: 'iniciante', lessons: 5, path: 'gestor' },
  { id: 6, title: 'Afiliados Hotmart Intro', description: 'Cria conta Hotmart, Braip, Monetizze — gera o teu primeiro link. Aplica já.', icon: '🔗', planRequired: 'fanatico', lessons: 7, path: 'afiliado' },
  { id: 7, title: 'Tráfego Pago pra Afiliados', description: 'Usa Meta e TikTok Ads para converter com links de afiliado. Prática real.', icon: '🚀', planRequired: 'fanatico', lessons: 6, path: 'afiliado' },
  { id: 8, title: 'SMS/Email + Primeiras Vendas', description: 'WhatsApp Business, Brevo free e funis simples de conversão. Resultados imediatos.', icon: '💬', planRequired: 'fanatico', lessons: 5, path: 'both' },
  { id: 9, title: 'Google Ads Avançado', description: 'Campanhas Google Ads rentáveis — pesquisa, display, remarketing. Domina o mercado.', icon: '🔍', planRequired: 'fanatico', lessons: 8, path: 'gestor' },
  { id: 10, title: 'Afiliados Avançado', description: 'Escala Hotmart, ROI tracking, múltiplas plataformas. Torna-te profissional.', icon: '💰', planRequired: 'pro', lessons: 6, path: 'afiliado' },
  { id: 11, title: 'Gestão Tráfego pra Clientes', description: 'Freelance: propostas, precificação e gestão de campanhas. Vende serviços.', icon: '📊', planRequired: 'pro', lessons: 5, path: 'gestor' },
  { id: 12, title: 'IA + Automação', description: 'Copy com IA, criativos automatizados, remarketing inteligente. Futuro hoje.', icon: '🤖', planRequired: 'pro', lessons: 6, path: 'both' },
  { id: 13, title: 'Mercado Trabalho + Plano 90 Dias', description: 'Vende serviços sem portfólio, templates de propostas, escala. Carreira sólida.', icon: '🏆', planRequired: 'pro', lessons: 5, path: 'both' },
];

export const getPlanForModule = (moduleId: number): 'iniciante' | 'fanatico' | 'pro' => {
  const module = modules.find(m => m.id === moduleId);
  return module?.planRequired || 'iniciante';
};

export const getUpgradePrice = (currentPlan: 'iniciante' | 'fanatico' | 'pro' | null, targetPlan: 'fanatico' | 'pro'): number => {
  if (!currentPlan) return plans.find(p => p.id === targetPlan)!.price;
  
  const currentPrice = plans.find(p => p.id === currentPlan)!.price;
  const targetPrice = plans.find(p => p.id === targetPlan)!.price;
  return targetPrice - currentPrice;
};
