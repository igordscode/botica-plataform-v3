import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star, Award, BookOpen, Clock, Phone, Mail, Instagram, ChevronRight, FileText, CheckCircle2, FlaskConical } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function DoctorProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'sobre' | 'publicacoes' | 'avaliacoes'>('sobre');

  // Dados mockados do doutor (poderia vir via API usando o ID)
  const doctor = {
    name: 'Dr. Fernando Lemos',
    role: 'Médico Nutrólogo & Pesquisador',
    crm: 'CRM 123456/SP',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?w=300&h=300&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=400&fit=crop&q=80',
    bio: 'Especialista em modulação intestinal e terapia nutracêutica avançada. Pesquisador ativo na área de psicobióticos e longevidade. Mais de 10 anos de experiência clínica em otimização metabólica e performance humana.',
    score: 9850,
    level: 'Embaixador Científico',
    clinics: [
      { name: 'Instituto de Medicina Avançada', address: 'Av. Paulista, 1000 - Bela Vista, São Paulo/SP', phone: '(11) 99999-9999' }
    ],
    social: {
      instagram: '@drfernandolemos',
      email: 'contato@drfernandolemos.com.br'
    },
    publications: [
      { id: '1', title: 'Modulação do Eixo Intestino-Cérebro através de Cepas Psicobióticas', date: '15 Mar 2026', type: 'Artigo' },
      { id: '2', title: 'Protocolo Terapêutico para Síndrome da Fadiga Crônica', date: '02 Fev 2026', type: 'Estudo de Caso' }
    ],
    reviews: [
      { id: 1, author: 'Maria S.', rating: 5, date: '10 Abril 2026', comment: 'Profissional excepcional. Minha qualidade de vida mudou da água pro vinho com a prescrição personalizada que ele montou na Guaraní.' },
      { id: 2, author: 'João P.', rating: 5, date: '25 Março 2026', comment: 'Muito atencioso e aprofundado nos exames. Excelente nutrólogo.' }
    ]
  };

  return (
    <div className="bg-[#F3F6FA] min-h-screen pb-32">
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full relative">
        <img src={doctor.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#152C60] to-transparent opacity-80" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[#152C60]/5 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center -mt-24 md:-mt-32 mb-8">
            <div className="relative">
              <img src={doctor.avatar} alt={doctor.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-white shadow-xl object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-[#2B5DB6] text-white w-12 h-12 rounded-full border-4 border-white flex items-center justify-center" title="Médico Verificado">
                <CheckCircle2 size={24} />
              </div>
            </div>
            <div className="flex-1 mt-4 md:mt-16">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-[#152C60] text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {doctor.level}
                </span>
                <span className="px-3 py-1 bg-[#F3F6FA] text-[#152C60] text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-current" /> {doctor.score} XP
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60] mb-2">{doctor.name}</h1>
              <p className="text-lg text-[#152C60]/60 font-medium">{doctor.role} • {doctor.crm}</p>
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
              <div className="text-2xl md:text-3xl font-serif font-black text-[#152C60] mb-1">12</div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Publicações</div>
            </div>
            <div className="text-center p-4 border-l border-[#152C60]/10">
              <div className="text-2xl md:text-3xl font-serif font-black text-[#152C60] mb-1">850+</div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Pacientes na Botica</div>
            </div>
            <div className="text-center p-4 border-l border-[#152C60]/10">
              <div className="text-2xl md:text-3xl font-serif font-black text-[#152C60] mb-1 flex items-center justify-center gap-1">
                5.0 <Star size={16} className="text-yellow-500 fill-current" />
              </div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Avaliação Média</div>
            </div>
            <div className="text-center p-4 border-l border-[#152C60]/10 relative group cursor-pointer">
              <div className="text-2xl md:text-3xl font-serif font-black text-[#2B5DB6] mb-1">Top 1%</div>
              <div className="text-[10px] font-bold text-[#152C60]/40 uppercase tracking-widest">Ranking Nacional</div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#152C60] text-white text-[10px] py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Baseado em aderência a tratamentos
              </div>
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
                      {doctor.bio}
                    </p>
                  </div>

                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                    <h3 className="text-xl font-serif font-black text-[#152C60] mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-[#2B5DB6]" /> Locais de Atendimento
                    </h3>
                    <div className="space-y-4">
                      {doctor.clinics.map((clinic, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-[#F3F6FA] rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                            <MapPin size={18} className="text-[#152C60]" />
                          </div>
                          <div>
                            <p className="font-bold text-[#152C60]">{clinic.name}</p>
                            <p className="text-sm text-[#152C60]/60 mt-1">{clinic.address}</p>
                            <p className="text-sm font-bold text-[#2B5DB6] mt-2 flex items-center gap-1">
                              <Phone size={14} /> {clinic.phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                    <h3 className="text-xl font-serif font-black text-[#152C60] mb-4">Contato</h3>
                    <div className="space-y-4">
                      <a href="#" className="flex items-center gap-3 text-sm text-[#152C60]/60 hover:text-[#2B5DB6] font-medium transition-colors">
                        <Instagram size={18} /> {doctor.social.instagram}
                      </a>
                      <a href="#" className="flex items-center gap-3 text-sm text-[#152C60]/60 hover:text-[#2B5DB6] font-medium transition-colors">
                        <Mail size={18} /> {doctor.social.email}
                      </a>
                      <a href="#" className="flex items-center gap-3 text-sm text-[#152C60]/60 hover:text-[#2B5DB6] font-medium transition-colors">
                        <BookOpen size={18} /> Currículo Lattes
                      </a>
                    </div>
                  </div>

                  {/* Promo Banner para Pacientes */}
                  <div className="bg-gradient-to-br from-[#152C60] to-[#2B5DB6] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                      <FlaskConical size={120} />
                    </div>
                    <h4 className="font-serif font-black text-2xl mb-2 relative z-10">Agende sua Consulta</h4>
                    <p className="text-white/70 text-sm mb-6 relative z-10">Pacientes do Dr. Fernando possuem 10% OFF em todas as fórmulas na Botica Guaraní.</p>
                    <button className="w-full py-3 bg-white text-[#152C60] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#F3F6FA] transition-colors relative z-10">
                      Entrar em Contato
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'publicacoes' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                <div className="space-y-4">
                  {doctor.publications.map(pub => (
                    <Link key={pub.id} to={`/artigo/${pub.id}`} className="block p-6 border border-[#152C60]/10 rounded-2xl hover:bg-[#F3F6FA] transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-3 py-1 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest">{pub.type}</span>
                        <span className="text-xs text-[#152C60]/40 font-bold flex items-center gap-1"><Clock size={12} /> {pub.date}</span>
                      </div>
                      <h4 className="text-lg font-serif font-black text-[#152C60] mb-2 group-hover:text-[#2B5DB6] transition-colors">{pub.title}</h4>
                      <p className="text-[#2B5DB6] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mt-4">
                        Ler Completo <ChevronRight size={14} />
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'avaliacoes' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#152C60]/5">
                <div className="space-y-6">
                  {doctor.reviews.map(review => (
                    <div key={review.id} className="p-6 bg-[#F3F6FA] rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#152C60] text-white rounded-full flex items-center justify-center font-bold">
                            {review.author[0]}
                          </div>
                          <div>
                            <p className="font-bold text-[#152C60]">{review.author}</p>
                            <p className="text-xs text-[#152C60]/40 font-medium">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#152C60]/70 text-sm leading-relaxed italic border-l-2 border-[#2B5DB6] pl-4">"{review.comment}"</p>
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
