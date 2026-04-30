import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ShieldCheck, Heart, Zap, FileText, Pill, CalendarCheck, FileSignature, ArrowRight, TrendingUp, Droplet, Brain, ChevronRight, CheckCircle2, MessageCircle, FileBarChart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'treatments' | 'exams'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const biometrics = [
    { label: 'Energia Vital', value: '85%', icon: <Zap size={18} className="text-yellow-500" />, status: 'Alto' },
    { label: 'Qualidade do Sono', value: '6H 40M', icon: <Brain size={18} className="text-purple-500" />, status: 'Regular' },
    { label: 'Hidratação', value: '2.1L', icon: <Droplet size={18} className="text-blue-500" />, status: 'Bom' },
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Activity size={14} /> Painel do Paciente
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60]">
              Central de Saúde
            </h1>
            <p className="text-[#152C60]/60 mt-2 font-medium">Acompanhe seus protocolos, prescrições e dados biológicos.</p>
          </div>
          <Link to="/receita" className="flex items-center gap-2 px-6 py-4 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B5DB6] transition-colors shadow-lg">
            <FileSignature size={16} /> Enviar Nova Receita
          </Link>
        </div>

        {/* Gamification / Membership Banner */}
        <div className="bg-gradient-to-r from-[#152C60] to-[#2B5DB6] rounded-[2.5rem] p-8 md:p-12 text-white mb-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <ShieldCheck size={200} />
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <h2 className="text-2xl font-serif font-black mb-2 flex items-center gap-3">
              Guaraní Prime <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase rounded-lg">Performance</span>
            </h2>
            <p className="text-white/70 font-medium text-sm">Seu protocolo mensal será manipulado automaticamente em 5 dias.</p>
          </div>
          <div className="relative z-10 flex gap-4 w-full md:w-auto">
            <Link to="/clube" className="flex-1 md:flex-none px-6 py-3 bg-white text-[#152C60] font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#F3F6FA] transition-colors whitespace-nowrap text-center">
              Ver Assinatura
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-[#152C60]/10 mb-8 pb-4 overflow-x-auto hide-scrollbar">
          {(['overview', 'treatments', 'exams'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
                activeTab === tab ? 'bg-[#152C60] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
              }`}
            >
              {tab === 'overview' ? 'Visão Geral' : tab === 'treatments' ? 'Rotina & Protocolos' : 'Meus Exames'}
              {activeTab === tab && (
                <motion.div layoutId="patient-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#2B5DB6] rounded-t-full" style={{ bottom: '-17px' }} />
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
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-serif font-black text-xl text-[#152C60]">Tratamentos Ativos</h3>
                      <button onClick={() => setActiveTab('treatments')} className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] hover:underline">Ver todos</button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-6 border border-[#2B5DB6]/20 bg-[#2B5DB6]/5 rounded-3xl relative">
                        <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] bg-white px-3 py-1 rounded-full shadow-sm">
                          Uso Contínuo
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#2B5DB6] border border-[#152C60]/5">
                            <Pill size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#152C60] text-lg mb-1">Modulação Hormonal (Base)</h4>
                            <p className="text-sm font-medium text-[#152C60]/60 mb-4">Prescrito por Dr. Fernando Lemos</p>
                            
                            <div className="flex items-center justify-between w-full p-4 bg-white rounded-2xl border border-[#152C60]/5">
                              <div className="flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-green-500" />
                                <span className="text-sm font-bold text-[#152C60]">Tomado hoje: 1/2 Cápsulas</span>
                              </div>
                              <button onClick={() => showToast('Consumo Registrado! +5 XP')} className="px-4 py-2 bg-[#F3F6FA] text-[#152C60] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#152C60] hover:text-white transition-colors">
                                Marcar Consumo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border border-[#152C60]/10 bg-white rounded-3xl group hover:border-[#152C60]/30 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#F3F6FA] rounded-xl flex items-center justify-center text-[#152C60]/60 group-hover:bg-[#152C60]/5">
                              <Heart size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#152C60]">Mix Adaptógenos Anti-Stress</h4>
                              <p className="text-xs font-bold text-[#152C60]/40 uppercase tracking-widest mt-1">Fórmula Clube Guaraní</p>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-[#152C60]/30 group-hover:text-[#2B5DB6] transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prescrições do Médico */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-[#F3F6FA] rounded-full flex items-center justify-center text-[#2B5DB6] shrink-0">
                         <FileText size={24} />
                       </div>
                       <div>
                         <h3 className="font-serif font-black text-xl text-[#152C60] mb-1">1 Nova Prescrição Recebida</h3>
                         <p className="text-sm text-[#152C60]/60 font-medium">Seu médico acabou de enviar o protocolo "Foco Extremo".</p>
                       </div>
                    </div>
                    <button onClick={() => showToast('Abrindo visualizador de prescrição...')} className="w-full md:w-auto px-6 py-3 bg-[#152C60] text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#2B5DB6] transition-colors whitespace-nowrap">
                      Visualizar
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Biometrics Summary */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif font-black text-xl text-[#152C60]">Biometria Diária</h3>
                      <TrendingUp size={18} className="text-[#152C60]/40" />
                    </div>
                    <div className="space-y-4">
                      {biometrics.map((bio, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-[#F3F6FA] rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
                              {bio.icon}
                            </div>
                            <span className="font-bold text-[#152C60] text-sm">{bio.label}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-[#152C60]">{bio.value}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-[#152C60]/40">{bio.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setActiveTab('exams')} className="w-full mt-6 py-3 border border-[#152C60]/10 text-[#152C60] font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#F3F6FA] transition-colors">
                      Ver Histórico Completo
                    </button>
                  </div>

                  {/* Integrações / Médicos */}
                  <div className="bg-[#152C60] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                     <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 opacity-70 flex items-center gap-2">
                       <ShieldCheck size={14} /> Equipe Médica
                     </h3>
                     
                     <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl mb-4">
                       <img src="https://images.unsplash.com/photo-1612349317150-e410f624c427?w=100&h=100&fit=crop" alt="Dr" className="w-12 h-12 rounded-full border-2 border-white/20" />
                       <div>
                         <Link to="/dr/1" className="font-bold hover:underline">Dr. Fernando Lemos</Link>
                         <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Prescritor Principal</p>
                       </div>
                     </div>

                     <Link to="/mensagens" className="w-full flex items-center justify-between p-4 border border-white/20 rounded-2xl hover:bg-white/10 transition-colors text-[10px] font-black uppercase tracking-widest">
                       Enviar Mensagem <MessageCircle size={14} />
                     </Link>
                  </div>

                  {/* Comunidade */}
                  <div className="bg-gradient-to-br from-[#2B5DB6] to-[#152C60] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                     <h3 className="font-serif font-black text-xl mb-2 relative z-10">Comunidade Guaraní</h3>
                     <p className="text-sm font-medium text-white/80 mb-6 relative z-10">Troque experiências, descubra protocolos e acompanhe os resultados de outros pacientes e médicos.</p>
                     
                     <Link to="/comunidade" className="w-full flex items-center justify-between p-4 bg-white text-[#152C60] rounded-2xl hover:bg-[#F3F6FA] transition-colors text-[10px] font-black uppercase tracking-widest relative z-10">
                       Acessar o Hub <ArrowRight size={14} />
                     </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'treatments' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#152C60]/5">
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-[#F3F6FA] text-[#152C60]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CalendarCheck size={48} />
                  </div>
                  <h3 className="text-2xl font-serif font-black text-[#152C60] mb-2">Sua Rotina de Protocolos</h3>
                  <p className="text-[#152C60]/60 font-medium max-w-md mx-auto mb-8">
                    Aqui você poderá visualizar o calendário detalhado de quando tomar as suas fórmulas e acompanhar sua aderência ao tratamento.
                  </p>
                  <button onClick={() => setActiveTab('overview')} className="px-8 py-3 border border-[#152C60]/10 text-[#152C60] font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#F3F6FA] transition-colors">
                    Voltar para Visão Geral
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#152C60]/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                  <h3 className="text-2xl font-serif font-black text-[#152C60]">Central de Exames</h3>
                  <button onClick={() => showToast('Funcionalidade de upload em desenvolvimento.')} className="px-6 py-3 bg-[#152C60] text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#2B5DB6] transition-colors flex items-center gap-2">
                    <FileBarChart size={16} /> Fazer Upload de Exame
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 border border-[#152C60]/10 rounded-2xl flex items-center justify-between hover:bg-[#F3F6FA] transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center group-hover:bg-[#2B5DB6] group-hover:text-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-[#152C60]">Exame de Sangue Completo</p>
                          <p className="text-xs text-[#152C60]/60 font-medium flex items-center gap-1 mt-1">
                            <Clock size={12} /> Realizado em 10 Abril 2026
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-[#152C60]/30 group-hover:text-[#2B5DB6] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
