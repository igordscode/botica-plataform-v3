import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, FileSignature, Star, Search, Plus, Filter, ChevronRight, Activity, Beaker, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrescriberDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'formulas'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const stats = [
    { label: 'Pacientes Ativos', value: '124', icon: <Users size={20} />, trend: '+12% este mês' },
    { label: 'Fórmulas Prescritas', value: '89', icon: <FileSignature size={20} />, trend: '+5% este mês' },
    { label: 'XP Acumulado', value: '9.8k', icon: <Star size={20} className="text-yellow-400" />, trend: 'Nível Embaixador' }
  ];

  const recentPrescriptions = [
    { id: '1', patient: 'Ana Silva', doc: 'Protocolo Ansiedade Ansio-Free', date: 'Hoje, 09:30', status: 'Em manipulação' },
    { id: '2', patient: 'Carlos Mendes', doc: 'Base Testo Boost', date: 'Ontem, 16:45', status: 'Entregue' }
  ];

  return (
    <div className="bg-[#F3F6FA] min-h-screen pt-24 pb-32 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#152C60] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} className="text-[#2B5DB6]" />
            <span className="text-xs font-black tracking-widest uppercase">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#152C60]/10 text-[#152C60] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Activity size={14} className="text-[#2B5DB6]" /> Painel do Prescritor
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60]">
              Bem-vindo, Dr(a).
            </h1>
            <p className="text-[#152C60]/60 mt-2 font-medium">Gerencie suas prescrições, pacientes e catálogo de fórmulas.</p>
          </div>
          <Link to="/assistente" className="flex items-center gap-2 px-6 py-4 bg-[#2B5DB6] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60] transition-colors shadow-lg">
            <Plus size={16} /> Nova Prescrição (GuaranIA)
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-[#152C60]/5 flex items-center justify-between hover:border-[#2B5DB6] transition-colors group cursor-default"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 mb-1">{stat.label}</p>
                <div className="text-3xl font-serif font-black text-[#152C60] group-hover:text-[#2B5DB6] transition-colors">{stat.value}</div>
                <p className="text-xs text-[#2B5DB6] font-bold mt-2">{stat.trend}</p>
              </div>
              <div className="w-12 h-12 bg-[#F3F6FA] text-[#152C60] rounded-2xl flex items-center justify-center group-hover:bg-[#152C60] group-hover:text-white transition-colors">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-[#152C60]/10 mb-8 pb-4 overflow-x-auto hide-scrollbar">
          {(['overview', 'patients', 'formulas'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
                activeTab === tab ? 'bg-[#152C60] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
              }`}
            >
              {tab === 'overview' ? 'Visão Geral' : tab === 'patients' ? 'Meus Pacientes' : 'Minhas Fórmulas'}
              {activeTab === tab && (
                <motion.div layoutId="prescriber-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#2B5DB6] rounded-t-full" style={{ bottom: '-17px' }} />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Atividade Recente */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif font-black text-xl text-[#152C60]">Prescrições Recentes</h3>
                      <button onClick={() => setActiveTab('patients')} className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] hover:underline">Ver todas</button>
                    </div>
                    <div className="space-y-4">
                      {recentPrescriptions.map(pres => (
                        <div key={pres.id} onClick={() => showToast(`Visualizando prescrição de ${pres.patient}...`)} className="flex items-center justify-between p-4 bg-[#F3F6FA] rounded-2xl hover:bg-[#152C60]/5 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2B5DB6] border border-[#152C60]/5">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="font-bold text-[#152C60] group-hover:text-[#2B5DB6] transition-colors">{pres.patient}</p>
                              <p className="text-xs text-[#152C60]/60">{pres.doc} • {pres.date}</p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                             <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${pres.status === 'Em manipulação' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                               {pres.status}
                             </span>
                             <ChevronRight size={16} className="text-[#152C60]/30 group-hover:text-[#2B5DB6] transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Catálogo Pessoal */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                      <h3 className="font-serif font-black text-xl text-[#152C60]">Meu Catálogo Base</h3>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#152C60]/40" />
                          <input type="text" placeholder="Buscar..." className="w-full pl-8 pr-4 py-2 bg-[#F3F6FA] rounded-full text-xs outline-none focus:ring-2 focus:ring-[#2B5DB6]" />
                        </div>
                        <button onClick={() => showToast('Abrindo construtor de fórmulas...')} className="w-8 h-8 rounded-full bg-[#152C60] text-white flex items-center justify-center hover:bg-[#2B5DB6] transition-colors shrink-0">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Exemplo de fórmula salva */}
                      <div onClick={() => showToast('Carregando fórmula Cognitiva Alpha...')} className="p-5 border border-[#152C60]/10 rounded-2xl relative group hover:border-[#2B5DB6] transition-colors cursor-pointer bg-[#F3F6FA]/50 hover:bg-white">
                        <div className="absolute top-4 right-4 bg-[#F3F6FA] p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 cursor-pointer group-hover:bg-[#2B5DB6] group-hover:text-white">
                          <ArrowRight size={14} />
                        </div>
                        <div className="w-8 h-8 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-lg flex items-center justify-center mb-4">
                          <Beaker size={16} />
                        </div>
                        <h4 className="font-bold text-[#152C60] text-sm mb-1 group-hover:text-[#2B5DB6] transition-colors">Fórmula Cognitiva Alpha</h4>
                        <p className="text-[10px] text-[#152C60]/60 uppercase tracking-widest font-bold">12 Ativos • Cápsula Gastrorresistente</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Ferramentas Rápidas */}
                  <div className="bg-[#152C60] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                     <div className="absolute -right-4 -bottom-4 opacity-10">
                       <Activity size={100} />
                     </div>
                     <h3 className="font-serif font-black text-xl mb-6 relative z-10">Acesso Rápido</h3>
                     <div className="space-y-3 relative z-10">
                       <Link to="/portal" className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                         <div className="flex items-center gap-3">
                           <FileText size={18} />
                           <span className="text-sm font-bold">Portal Científico</span>
                         </div>
                         <ChevronRight size={16} />
                       </Link>
                       <Link to="/assistente" className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                         <div className="flex items-center gap-3">
                           <Search size={18} />
                           <span className="text-sm font-bold">Checagem de Interações</span>
                         </div>
                         <ChevronRight size={16} />
                       </Link>
                     </div>
                  </div>
                  
                  {/* Gamificação / Ranking Prescritor */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
                     <div className="text-center mb-6">
                       <div className="w-16 h-16 bg-[#F3F6FA] rounded-full flex items-center justify-center text-[#2B5DB6] mx-auto mb-4 border-2 border-white shadow-xl group-hover:scale-110 transition-transform">
                         <Star size={24} className="fill-current" />
                       </div>
                       <h3 className="font-serif font-black text-xl text-[#152C60]">Embaixador Científico</h3>
                       <p className="text-xs text-[#152C60]/60 mt-1">Faltam 200XP para Nível Master</p>
                     </div>
                     
                     <div className="space-y-4">
                       <div className="flex justify-between text-xs font-bold text-[#152C60]">
                         <span>Progresso Mensal</span>
                         <span className="text-[#2B5DB6]">80%</span>
                       </div>
                       <div className="h-2 bg-[#F3F6FA] rounded-full overflow-hidden">
                         <div className="h-full w-[80%] bg-gradient-to-r from-[#152C60] to-[#2B5DB6] rounded-full" />
                       </div>
                       <button onClick={() => showToast('Abrindo programa de benefícios para prescritores...')} className="w-full mt-4 py-3 border border-[#152C60]/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#152C60] hover:bg-[#F3F6FA] transition-colors">
                         Ver Benefícios do Nível
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'patients' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#152C60]/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                  <h3 className="text-2xl font-serif font-black text-[#152C60]">Meus Pacientes Associados</h3>
                  <div className="relative w-full md:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#152C60]/40" />
                    <input type="text" placeholder="Buscar paciente..." className="w-full pl-8 pr-4 py-2 bg-[#F3F6FA] border border-[#152C60]/5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2B5DB6] focus:border-transparent transition-all" />
                  </div>
                </div>

                <div className="grid gap-4">
                  {recentPrescriptions.map(pres => (
                    <div key={pres.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-[#152C60]/10 rounded-2xl hover:bg-[#F3F6FA] transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className="w-12 h-12 bg-[#152C60] text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {pres.patient.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#152C60] text-lg">{pres.patient}</p>
                          <p className="text-sm text-[#152C60]/60 font-medium">Última prescrição: {pres.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link to="/mensagens" className="flex-1 sm:flex-none px-4 py-2 border border-[#152C60]/10 text-[#152C60] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#152C60] hover:text-white transition-colors text-center">
                          Mensagem
                        </Link>
                        <button onClick={() => showToast(`Visualizando prontuário de ${pres.patient}...`)} className="flex-1 sm:flex-none px-4 py-2 bg-[#2B5DB6] text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#152C60] transition-colors">
                          Prontuário
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'formulas' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#152C60]/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-serif font-black text-[#152C60]">Catálogo de Fórmulas</h3>
                    <p className="text-[#152C60]/60 font-medium mt-1">Gerencie suas próprias bases e acesse as padronizadas.</p>
                  </div>
                  <button onClick={() => showToast('Abrindo criador de fórmula base...')} className="w-full md:w-auto px-6 py-3 bg-[#152C60] text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#2B5DB6] transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Plus size={16} /> Nova Fórmula Base
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Example Formulas */}
                  <div className="p-6 border border-[#152C60]/10 rounded-2xl hover:shadow-lg hover:border-[#2B5DB6] transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2B5DB6] group-hover:text-white transition-colors">
                      <Beaker size={24} />
                    </div>
                    <div className="mb-6">
                      <h4 className="font-bold text-[#152C60] text-lg mb-2">Fórmula Cognitiva Alpha</h4>
                      <p className="text-xs text-[#152C60]/60 font-medium line-clamp-2">Blend de nootrópicos para foco extremo e modulação de neurotransmissores com L-Teanina, Bacopa e Lions Mane.</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#152C60]/10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">12 Ativos</span>
                      <button onClick={(e) => { e.stopPropagation(); showToast('Fórmula copiada para nova prescrição!'); }} className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] hover:underline">
                        Prescrever
                      </button>
                    </div>
                  </div>
                  
                  {/* Empty Slot / CTA */}
                  <div onClick={() => showToast('Navegando para base de fórmulas da Guaraní...')} className="p-6 border-2 border-dashed border-[#152C60]/20 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F3F6FA] hover:border-[#2B5DB6]/50 transition-colors">
                    <div className="w-12 h-12 bg-[#F3F6FA] text-[#152C60]/40 rounded-full flex items-center justify-center mb-4">
                      <Search size={24} />
                    </div>
                    <h4 className="font-bold text-[#152C60] mb-2">Explorar Portal</h4>
                    <p className="text-xs text-[#152C60]/60 font-medium px-4">Encontre e salve fórmulas baseadas em artigos científicos.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
