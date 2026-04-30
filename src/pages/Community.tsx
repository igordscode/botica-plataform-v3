import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Trophy, Star, ShieldCheck, Flame, Medal, Award, TrendingUp, Image as ImageIcon, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Community() {
  const [activeTab, setActiveTab] = useState<'feed' | 'ranking' | 'protocols'>('feed');

  const posts = [
    {
      id: 1,
      author: {
        name: 'Carlos Mendes',
        role: 'Paciente Prime',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
        badge: <Flame size={14} className="text-orange-500" />
      },
      content: 'Mais uma semana com o protocolo "Foco Extremo" do Dr. Fernando. Minha produtividade no trabalho melhorou absurdamente e o sono finalmente regulou. Alguém mais teve resultados parecidos com a Ashwagandha + Rhodiola?',
      image: 'https://images.unsplash.com/photo-1614902157121-650058b8f331?w=800&h=400&fit=crop',
      likes: 124,
      comments: 18,
      time: '2 horas atrás',
      protocol: 'Foco Extremo'
    },
    {
      id: 2,
      author: {
        name: 'Dra. Amanda Silva',
        role: 'Embaixadora Científica',
        avatar: 'https://images.unsplash.com/photo-1594824436951-7f126107d610?w=100&h=100&fit=crop',
        badge: <ShieldCheck size={14} className="text-[#2B5DB6]" />
      },
      content: 'Acabei de publicar uma nova base de longevidade no portal. A ideia é trabalhar a proteção mitocondrial com Coenzima Q10 associada ao PQQ (Pirroloquinolina Quinona). Pacientes que já estão usando: mandem seus relatos nos comentários!',
      likes: 342,
      comments: 56,
      time: 'Ontem',
      protocol: 'Longevidade Mitocondrial'
    }
  ];

  const rankings = [
    { name: 'Dr. Fernando Lemos', points: 15420, role: 'Prescritor Master', avatar: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?w=100&h=100&fit=crop', rank: 1 },
    { name: 'Ricardo Almeida', points: 12100, role: 'Atleta Ouro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', rank: 2 },
    { name: 'Dra. Amanda Silva', points: 9850, role: 'Embaixadora', avatar: 'https://images.unsplash.com/photo-1594824436951-7f126107d610?w=100&h=100&fit=crop', rank: 3 },
    { name: 'Juliana Costa', points: 7430, role: 'Membro Prata', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', rank: 4 },
  ];

  return (
    <div className="bg-[#F3F6FA] min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Star size={14} /> Comunidade Guaraní
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60]">
              Hub de Performance
            </h1>
            <p className="text-[#152C60]/60 mt-2 font-medium">Troque experiências, descubra protocolos e suba no ranking da comunidade.</p>
          </div>
          <button className="px-6 py-4 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B5DB6] transition-colors shadow-lg">
            Compartilhar Progresso
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tabs */}
            <div className="flex gap-4 border-b border-[#152C60]/10 pb-4 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setActiveTab('feed')}
                className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
                  activeTab === 'feed' ? 'bg-[#152C60] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
                }`}
              >
                Feed Geral
              </button>
              <button 
                onClick={() => setActiveTab('ranking')}
                className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
                  activeTab === 'ranking' ? 'bg-[#152C60] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
                }`}
              >
                Ranking
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B5DB6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2B5DB6]"></span>
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('protocols')}
                className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
                  activeTab === 'protocols' ? 'bg-[#152C60] text-white' : 'text-[#152C60]/60 hover:bg-[#152C60]/5'
                }`}
              >
                Protocolos Populares
              </button>
            </div>

            {/* Create Post */}
            {activeTab === 'feed' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#152C60]/5 flex items-start gap-4">
                <div className="w-12 h-12 bg-[#152C60] rounded-full text-white flex items-center justify-center font-bold text-lg shrink-0">
                  EU
                </div>
                <div className="flex-1 space-y-4">
                  <textarea 
                    placeholder="Compartilhe seus resultados, dúvidas ou dicas de performance..." 
                    className="w-full bg-[#F3F6FA] rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-[#2B5DB6] min-h-[100px] resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors p-2 rounded-lg hover:bg-[#F3F6FA]">
                      <ImageIcon size={16} /> Adicionar Mídia
                    </button>
                    <button className="px-6 py-2 bg-[#2B5DB6] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60] transition-colors flex items-center gap-2">
                      <Send size={14} /> Publicar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Feed Posts */}
            {activeTab === 'feed' && spaceYCards(posts)}

            {/* Ranking Tab */}
            {activeTab === 'ranking' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
                <div className="text-center mb-8">
                  <Trophy size={48} className="mx-auto text-yellow-500 mb-4" />
                  <h2 className="text-3xl font-serif font-black text-[#152C60] mb-2">Ranking Global</h2>
                  <p className="text-[#152C60]/60 font-medium text-sm">Os membros mais ativos e com melhores performances da comunidade.</p>
                </div>
                <div className="space-y-4">
                  {rankings.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-[#F3F6FA] rounded-2xl hover:bg-[#152C60]/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                          idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          idx === 1 ? 'bg-gray-200 text-gray-700' : 
                          idx === 2 ? 'bg-orange-100 text-orange-700' : 
                          'bg-white text-[#152C60]'
                        }`}>
                          {idx + 1}º
                        </div>
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                        <div>
                          <div className="font-bold text-[#152C60] flex items-center gap-2">{user.name} </div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">{user.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-serif font-black text-xl text-[#2B5DB6]">{user.points}</span>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#152C60]/40">XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* User Community Stats */}
            <div className="bg-[#152C60] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
               <div className="relative z-10 text-center">
                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
                   <Medal size={32} className="text-yellow-400" />
                 </div>
                 <h3 className="text-xl font-serif font-black mb-1">Seu Impacto</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-6">Nível Ouro • 482 Seguidores</p>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-white/10 p-4 rounded-2xl">
                     <div className="text-2xl font-black mb-1">34k</div>
                     <div className="text-[9px] uppercase tracking-widest font-bold opacity-60">XP Acumulado</div>
                   </div>
                   <div className="bg-white/10 p-4 rounded-2xl">
                     <div className="text-2xl font-black mb-1">12</div>
                     <div className="text-[9px] uppercase tracking-widest font-bold opacity-60">Protocolos Divulgados</div>
                   </div>
                 </div>

                 <button className="w-full py-3 bg-white text-[#152C60] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F3F6FA] transition-colors">
                   Ver Estatísticas Completas
                 </button>
               </div>
            </div>

            {/* Trending Tags */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={20} className="text-[#2B5DB6]" />
                <h3 className="font-serif font-black text-xl text-[#152C60]">Em Alta</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['#Foco', '#Imunidade', '#Ashwagandha', '#Jejum', '#SonoProfundo', '#Nootropicos'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-[#F3F6FA] text-[#152C60] rounded-lg text-xs font-bold hover:bg-[#2B5DB6] hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Doctors */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
               <div className="flex items-center gap-3 mb-6">
                 <Award size={20} className="text-[#2B5DB6]" />
                 <h3 className="font-serif font-black text-xl text-[#152C60]">Prescritores em Destaque</h3>
               </div>
               <div className="space-y-4">
                 {[
                   { name: 'Dr. Fernando Lemos', spec: 'Endocrinologia', xp: '15.4k XP' },
                   { name: 'Dra. Amanda Silva', spec: 'Nutrologia Esp.', xp: '9.8k XP' }
                 ].map((doc, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-pointer">
                     <div>
                       <Link to="/dr/1" className="font-bold text-[#152C60] text-sm group-hover:text-[#2B5DB6] transition-colors">{doc.name}</Link>
                       <p className="text-[10px] uppercase font-black tracking-widest text-[#152C60]/40">{doc.spec}</p>
                     </div>
                     <span className="text-[10px] font-black bg-[#2B5DB6]/10 text-[#2B5DB6] px-2 py-1 rounded-lg">
                       {doc.xp}
                     </span>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-6 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors">
                 Ver todos os especialistas
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  function spaceYCards(posts: any[]) {
    return (
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[#152C60]/5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-bold text-[#152C60] flex items-center gap-2">
                    {post.author.name} {post.author.badge}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 mt-0.5">
                    {post.author.role} • {post.time}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-[#152C60]/80 mb-4 leading-relaxed">
              {post.content}
            </p>

            {post.image && (
              <img src={post.image} alt="Post content" className="w-full h-64 object-cover rounded-2xl mb-4" />
            )}

            {post.protocol && (
              <div className="bg-[#F3F6FA] p-3 rounded-xl mb-4 flex items-center justify-between border border-[#152C60]/5">
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#2B5DB6]" />
                  <span className="text-xs font-bold text-[#152C60]">Protocolo Ativo: <span className="text-[#2B5DB6]">{post.protocol}</span></span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 hover:text-[#2B5DB6] hover:underline">Ver Fórmula</button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#152C60]/5">
              <button className="flex items-center gap-2 text-[#152C60]/40 hover:text-red-500 transition-colors">
                <Heart size={18} />
                <span className="text-xs font-bold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors">
                <MessageCircle size={18} />
                <span className="text-xs font-bold">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors ml-auto text-[10px] font-black uppercase tracking-widest">
                <Share2 size={14} /> Compartilhar
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
