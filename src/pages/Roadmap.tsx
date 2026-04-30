import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Bug, Flame, TrendingUp, CheckCircle2, CircleDashed, ChevronUp, MessageSquare, Filter, Plus } from 'lucide-react';

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');

  const items = [
    {
      id: 1,
      type: 'feature',
      title: 'Integração com Apple Health / Google Fit',
      description: 'Permitir sincronizar dados de passos, sono e frequência cardíaca para que a Inteligência Guaraní possa fazer recomendações mais precisas de protocolos e horários.',
      status: 'planned',
      votes: 342,
      comments: 45,
      hasVoted: false
    },
    {
      id: 2,
      type: 'feature',
      title: 'Agentes Personalizados ("Gems")',
      description: 'Criar uma área onde pacientes e médicos possam criar seus próprios agentes com PDFs (ex: exames, estudos científicos) e instruções de sistema específicas para respostas super contextualizadas.',
      status: 'in_progress',
      votes: 512,
      comments: 89,
      hasVoted: true
    },
    {
      id: 3,
      type: 'bug',
      title: 'Atraso na notificação do Chat',
      description: 'Às vezes, quando um médico envia uma mensagem, a notificação demora cerca de 5 minutos para aparecer na tela inicial do paciente.',
      status: 'in_progress',
      votes: 124,
      comments: 12,
      hasVoted: false
    },
    {
      id: 4,
      type: 'feature',
      title: 'Notificações de Uso no WhatsApp',
      description: 'Receber lembretes automáticos no WhatsApp sobre a hora exata de tomar o encapsulado de acordo com a meia-vida do suplemento.',
      status: 'completed',
      votes: 890,
      comments: 154,
      hasVoted: true
    },
    {
      id: 5,
      type: 'feature',
      title: 'Gamificação entre Comunidade',
      description: 'Adicionar ranking, XP e emblemas baseados em compras, participação na comunidade e consistência no tratamento.',
      status: 'completed',
      votes: 620,
      comments: 34,
      hasVoted: false
    }
  ];

  const filteredItems = items.filter(item => activeTab === 'all' || item.status === activeTab);

  return (
    <div className="bg-[#F3F6FA] min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <TrendingUp size={14} /> Construído em Público
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60]">
              Mural de Evolução
            </h1>
            <p className="text-[#152C60]/60 mt-2 font-medium">Você decide o futuro da Botica Guaraní. Vote nas funcionalidades, reporte bugs e acompanhe o desenvolvimento.</p>
          </div>
          <button className="px-6 py-4 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B5DB6] transition-colors shadow-lg flex items-center gap-2">
            <Plus size={16} /> Nova Sugestão
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 border-b border-[#152C60]/10 pb-4 mb-8 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('all')}
            className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
              activeTab === 'all' ? 'bg-[#152C60] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
            }`}
          >
            Tudo
          </button>
          <button 
            onClick={() => setActiveTab('planned')}
            className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${
              activeTab === 'planned' ? 'bg-[#152C60] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
            }`}
          >
            <CircleDashed size={14} /> Planejado
          </button>
          <button 
            onClick={() => setActiveTab('in_progress')}
            className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${
              activeTab === 'in_progress' ? 'bg-[#2B5DB6] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
            }`}
          >
            <Flame size={14} className={activeTab === 'in_progress' ? '' : 'text-[#2B5DB6]'} /> Em Desenvolvimento
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${
              activeTab === 'completed' ? 'bg-green-600 text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
            }`}
          >
            <CheckCircle2 size={14} className={activeTab === 'completed' ? '' : 'text-green-600'} /> Entregue
          </button>
        </div>

        {/* List / Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
           
           {/* Column: Planned */}
           <div className="bg-[#152C60]/5 rounded-[2rem] p-4 flex flex-col gap-4">
             <div className="flex items-center gap-2 px-2 pt-2 mb-2">
               <CircleDashed size={18} className="text-[#152C60]/60" />
               <h2 className="font-black text-[#152C60] uppercase tracking-widest text-xs">Planejado</h2>
               <span className="ml-auto bg-white text-[#152C60] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">{items.filter(i => i.status === 'planned').length}</span>
             </div>
             <AnimatePresence>
               {items.filter(item => item.status === 'planned').map(item => (
                 <KanbanCard key={item.id} item={item} />
               ))}
             </AnimatePresence>
           </div>

           {/* Column: In Progress */}
           <div className="bg-[#2B5DB6]/5 rounded-[2rem] p-4 flex flex-col gap-4">
             <div className="flex items-center gap-2 px-2 pt-2 mb-2">
               <Flame size={18} className="text-[#2B5DB6]" />
               <h2 className="font-black text-[#2B5DB6] uppercase tracking-widest text-xs">Em Desenvolvimento</h2>
               <span className="ml-auto bg-white text-[#2B5DB6] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">{items.filter(i => i.status === 'in_progress').length}</span>
             </div>
             <AnimatePresence>
               {items.filter(item => item.status === 'in_progress').map(item => (
                 <KanbanCard key={item.id} item={item} />
               ))}
             </AnimatePresence>
           </div>

           {/* Column: Completed */}
           <div className="bg-green-600/5 rounded-[2rem] p-4 flex flex-col gap-4">
             <div className="flex items-center gap-2 px-2 pt-2 mb-2">
               <CheckCircle2 size={18} className="text-green-600" />
               <h2 className="font-black text-green-600 uppercase tracking-widest text-xs">Entregue</h2>
               <span className="ml-auto bg-white text-green-600 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">{items.filter(i => i.status === 'completed').length}</span>
             </div>
             <AnimatePresence>
               {items.filter(item => item.status === 'completed').map(item => (
                 <KanbanCard key={item.id} item={item} />
               ))}
             </AnimatePresence>
           </div>
        </div>

      </div>
    </div>
  );

  function KanbanCard({ item }: { item: any }) {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-white hover:border-[#2B5DB6]/30 hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-3">
          {item.type === 'feature' ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-md text-[8px] font-black uppercase tracking-widest">
              <Lightbulb size={10} /> Sugestão
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-md text-[8px] font-black uppercase tracking-widest">
              <Bug size={10} /> Bug
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-bold text-[#152C60] leading-tight mb-2 group-hover:text-[#2B5DB6] transition-colors">{item.title}</h3>
        <p className="text-[#152C60]/60 text-xs leading-relaxed mb-4 line-clamp-3">{item.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-[#152C60]/5">
          <button className={`py-1.5 px-3 rounded-lg flex items-center gap-1 font-bold text-xs transition-colors ${
            item.hasVoted 
              ? 'bg-[#2B5DB6]/10 text-[#2B5DB6]' 
              : 'bg-[#F3F6FA] text-[#152C60]/40 hover:bg-[#152C60]/10 hover:text-[#152C60]'
          }`}>
            <ChevronUp size={14} strokeWidth={3} />
            {item.votes}
          </button>
          
          <div className="flex items-center gap-1 text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors">
            <MessageSquare size={14} />
            <span className="text-[10px] font-bold">{item.comments}</span>
          </div>
        </div>
      </motion.div>
    );
  }
}
