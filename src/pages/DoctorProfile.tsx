import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star, Award, BookOpen, Clock, Phone, Mail, Instagram, ChevronRight, FileText, CheckCircle2, FlaskConical, Activity } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'sobre' | 'publicacoes' | 'avaliacoes'>('sobre');
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<any>(null);

  useEffect(() => {
    async function fetchDoctor() {
      if (!id) return;
      try {
        const docRef = doc(db, 'doctors_profiles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDoctor(docSnap.data());
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-32 flex items-center justify-center bg-[#F3F6FA]">
        <Activity className="animate-spin text-[#2B5DB6] w-8 h-8" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen pt-24 pb-32 flex flex-col items-center justify-center bg-[#F3F6FA] text-center px-4">
        <h1 className="text-3xl font-serif font-black text-[#152C60] mb-4">Perfil não encontrado</h1>
        <p className="text-[#152C60]/60 mb-8">O prescritor que você procura não existe ou ainda não completou seu cadastro.</p>
        <Link to="/portal" className="px-6 py-3 bg-[#152C60] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-colors">Voltar ao Portal</Link>
      </div>
    );
  }

  const fallbackCover = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=400&fit=crop&q=80';

  return (
    <div className="bg-[#F3F6FA] min-h-screen pb-32">
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full relative">
        <img src={fallbackCover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#152C60] to-transparent opacity-80" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[#152C60]/5 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center -mt-24 md:-mt-32 mb-8">
            <div className="relative">
              {doctor.avatarUrl ? (
                <img src={doctor.avatarUrl} alt={doctor.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-white shadow-xl object-cover" />
              ) : (
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-white shadow-xl bg-[#2B5DB6]/10 text-[#2B5DB6] flex items-center justify-center text-4xl font-serif font-bold">
                  {doctor.name?.charAt(0) || 'D'}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-[#2B5DB6] text-white w-12 h-12 rounded-full border-4 border-white flex items-center justify-center" title="Médico Verificado">
                <CheckCircle2 size={24} />
              </div>
            </div>
            <div className="flex-1 mt-4 md:mt-16">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-[#152C60] text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {doctor.specialty || 'Prescritor'}
                </span>
                <span className="px-3 py-1 bg-[#F3F6FA] text-[#152C60] text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-current" /> Especialista
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60] mb-2">{doctor.name || 'Doutor'}</h1>
              <p className="text-lg text-[#152C60]/60 font-medium">{doctor.crm || 'CRM Pendente'}</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-24">
              <button className="px-8 py-4 bg-[#2B5DB6] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#152C60] transition-colors whitespace-nowrap">
                Solicitar Consulta
              </button>
              <button className="px-8 py-4 bg-[#F3F6FA] text-[#152C60] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60]/5 transition-colors whitespace-nowrap">
                Seguir Prescritor
              </button>
            </div>
          </div>

          {/* Gamification / Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#152C60]/10 mt-8">
            <div className="text-center p-4">
              <div className="text-2xl md:text-3xl font-serif font-black text-[#152C60] mb-1">0</div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Publicações</div>
            </div>
            <div className="text-center p-4 border-l border-[#152C60]/10">
              <div className="text-2xl md:text-3xl font-serif font-black text-[#152C60] mb-1">0</div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Pacientes na Botica</div>
            </div>
            <div className="text-center p-4 border-l border-[#152C60]/10">
              <div className="text-2xl md:text-3xl font-serif font-black text-[#152C60] mb-1 flex items-center justify-center gap-1">
                -- <Star size={16} className="text-yellow-500 fill-current" />
              </div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Avaliação Média</div>
            </div>
            <div className="text-center p-4 border-l border-[#152C60]/10 relative group cursor-pointer">
              <div className="text-2xl md:text-3xl font-serif font-black text-[#2B5DB6] mb-1">-</div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Ranking Nacional</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-[#152C60]/10 mb-8 overflow-x-auto pb-4 hide-scrollbar">
          {(['sobre', 'publicacoes', 'avaliacoes'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-[#152C60] text-white shadow-lg' 
                  : 'text-[#152C60]/40 hover:bg-[#152C60]/5 hover:text-[#152C60]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'sobre' && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                    <h3 className="text-xl font-serif font-black text-[#152C60] mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-[#2B5DB6]" /> Biografia
                    </h3>
                    <p className="text-[#152C60]/70 leading-relaxed font-medium">
                      {doctor.bio || 'Este prescritor ainda não adicionou uma biografia.'}
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                    <h3 className="text-xl font-serif font-black text-[#152C60] mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-[#2B5DB6]" /> Atendimento
                    </h3>
                    <div className="space-y-4">
                      {doctor.address ? (
                        <div className="flex gap-4 p-4 bg-[#F3F6FA] rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                            <MapPin size={18} className="text-[#152C60]" />
                          </div>
                          <div>
                            <p className="font-bold text-[#152C60]">Clínica Principal</p>
                            <p className="text-sm text-[#152C60]/60 mt-1">{doctor.address}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-[#152C60]/40">Nenhum endereço cadastrado.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Promo Banner para Pacientes */}
                  <div className="bg-gradient-to-br from-[#152C60] to-[#2B5DB6] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                      <FlaskConical size={120} />
                    </div>
                    <h4 className="font-serif font-black text-2xl mb-2 relative z-10">Agende sua Consulta</h4>
                    <p className="text-white/70 text-sm mb-6 relative z-10">Pacientes do {doctor.name || 'Doutor'} possuem 10% OFF em todas as fórmulas manipuladas na Botica Guaraní.</p>
                    <button className="w-full py-3 bg-white text-[#152C60] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#F3F6FA] transition-colors relative z-10">
                      Entrar em Contato
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'publicacoes' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                <p className="text-[#152C60]/60">Nenhuma publicação cadastrada por este profissional.</p>
              </div>
            )}

            {activeTab === 'avaliacoes' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                 <p className="text-[#152C60]/60">O profissional ainda não possui avaliações públicas.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
