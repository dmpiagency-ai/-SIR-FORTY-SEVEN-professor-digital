import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockMessages = [
  { name: 'Carlos M.', text: 'Alguém já testou a estratégia do módulo 5?', time: '14:32', self: false },
  { name: 'Ana S.', text: 'Sim! Funcionou muito bem para mim. Fiz 3 vendas ontem.', time: '14:35', self: false },
  { name: 'Professor', text: 'Excelente Ana! Partilha os resultados com o grupo 💪', time: '14:36', self: false },
  { name: 'João P.', text: 'Preciso de ajuda com o Airtm, alguém pode ajudar?', time: '14:40', self: false },
  { name: 'Tu', text: 'Eu posso ajudar João! Acabei de completar o módulo 7.', time: '14:42', self: true },
  { name: 'Carlos M.', text: 'Esta comunidade é incrível! 🔥', time: '14:45', self: false },
];

const Community = () => {
  const { user } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const send = () => {
    if (!message.trim()) return;
    setMessages([...messages, { name: 'Tu', text: message, time: new Date().toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' }), self: true }]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] max-w-lg md:max-w-3xl mx-auto">
      <div className="px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold">Comunidade SR47</h1>
        <p className="text-xs text-muted-foreground">{messages.length} mensagens • 24 membros online</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={`max-w-[80%] ${msg.self ? 'glass-card bg-primary/10' : 'glass-card'} p-3 rounded-2xl ${msg.self ? 'rounded-br-md' : 'rounded-bl-md'}`}>
              {!msg.self && <p className="text-[10px] font-semibold text-primary mb-0.5">{msg.name}</p>}
              <p className="text-sm">{msg.text}</p>
              <p className="text-[9px] text-muted-foreground text-right mt-1">{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border flex gap-2">
        <Input value={message} onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Escreve uma mensagem..." className="flex-1 text-sm rounded-xl" />
        <button onClick={send} className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Community;
