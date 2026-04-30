import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Video, FileText, Microscope, Search, 
  ChevronRight, Bookmark, Share2, PlayCircle, 
  Lock, Award, FlaskConical, Filter, Clock, User, Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

interface Article {
  id: number;
  title: string;
  author: string;
  role: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
  type: 'article' | 'video' | 'research';
}

const PORTAL_CONTENT: Article[] = [
  {
    id: 1,
    title: 'O Impacto da Ashwagandha na Modulação do Cortisol em Atletas de Elite',
    author: 'Dra. Elena Santos',
    role: 'PhD em Neurociência',
    category: 'Biohacking',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1532187875605-1ef6ac810dc3?auto=format&fit=crop&q=80&w=800',
    type: 'article',
    content: 'A suplementação com extratos padronizados de Withania somnifera tem demonstrado resultados promissores no gerenciamento do estresse adaptativo...'
  },
  {
    id: 2,
    title: 'Protocolos de Recuperação Neural Pós-Treino Intenso',
    author: 'Dr. Lucas Guarani',
    role: 'Especialista em Performance',
    category: 'Esporte',
    readTime: '45 min',
    image: 'https://images.unsplash.com/photo-1576091160550-217359f41f48?auto=format&fit=crop&q=80&w=800',
    type: 'video',
    content: ''
  },
  {
    id: 3,
    title: 'Estudo Clínico: Pureza de 99.9% em Manipulações de Creatina Micronizada',
    author: 'LabGuarani R&D',
    role: 'Equipe Técnica',
    category: 'Pesquisa',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1579165466541-74e24690554a?auto=format&fit=crop&q=80&w=800',
    type: 'research',
    content: 'Relatório técnico sobre os processos de filtragem osmótica reversa utilizados em nosso laboratório...'
  }
];

const FORMULAS_CATALOG = [
  { id: 101, name: 'Fórmula Cognitiva Alpha', desc: 'Mix de Nootrópicos e Adaptógenos para foco extremo.', tags: ['Cognição', 'Foco', 'Neuro'] },
  { id: 102, name: 'Protocolo Modulador de Sono Rx', desc: 'Associação de Melatonina slow-release, Magnésio Inositol.', tags: ['Sono', 'Recuperação'] },
  { id: 103, name: 'Sinergia Termogênica Mitocondrial', desc: 'Otimização de queima de gordura preservando massa magra.', tags: ['Metabolismo', 'Termogênico'] }
];

interface Specialist {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
}

const SPECIALISTS: Specialist[] = [
  {
    id: 1,
    name: 'Dr. Marco Aurélio',
    role: 'Endocrinologista',
    specialty: 'Metabolismo & Performance',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    bio: 'Especialista em modulação hormonal e otimização metabólica para longevidade.'
  },
  {
    id: 2,
    name: 'Profa. Juliana Silva',
    role: 'Personal Trainer',
    specialty: 'Biomecânica Aplicada',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    bio: 'Mestre em fisiologia do exercício com foco em hipertrofia e reabilitação funcional.'
  },
  {
    id: 3,
    name: 'Dr. Felipe Barros',
    role: 'Nutricionista Clínico',
    specialty: 'Nutrição Esportiva',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Especialista em dietas anti-inflamatórias e suplementação magistral personalizada.'
  }
];

export default function Portal() {
  const [activeTab, setActiveTab] = useState<'feed' | 'professional' | 'library' | 'board'>('feed');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isProfessional, setIsProfessional] = useState(false);
  const [savedArticles, setSavedArticles] = useState<number[]>([]);

  const handleToggleLibrary = (articleId: number) => {
    setSavedArticles(prev => 
      prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
    );
  };

  const isSaved = (articleId: number) => savedArticles.includes(articleId);

  return (
    <div className="min-h-screen bg-[#F3F6FA] pt-8 md:pt-28 pb-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16 border-b border-[#152C60]/10 pb-8 md:pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="px-4 py-1.5 bg-[#152C60] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full">
                Botica Guaraní Science
              </span>
              <div className="flex items-center gap-2 text-[#2B5DB6]">
                <Microscope size={16} />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Open Research Portal</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#152C60] tracking-tight leading-tight">
              O Portal da <br/><span className="text-[#2B5DB6]">Inteligência</span>
            </h1>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar estudos, fórmulas..."
                className="w-full md:w-96 h-12 md:h-14 pl-12 pr-6 bg-white rounded-2xl border-2 border-transparent focus:border-[#2B5DB6] shadow-xl shadow-[#152C60]/5 outline-none font-medium text-sm transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#152C60]/30" size={18} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 md:gap-12 mb-10 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {[
            { id: 'feed', label: 'Feed Científico', icon: <FileText size={18} /> },
            { id: 'board', label: 'Corpo Científico', icon: <User size={18} /> },
            { id: 'professional', label: 'Área do Prescritor', icon: <Award size={18} /> },
            { id: 'library', label: 'Minha Biblioteca', icon: <Bookmark size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 md:gap-3 whitespace-nowrap text-[10px] md:text-xs font-black uppercase tracking-widest relative pb-4 transition-all snap-start ${
                activeTab === tab.id ? 'text-[#2B5DB6]' : 'text-[#152C60]/40 hover:text-[#152C60]'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="portal-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#2B5DB6]" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Feed */}
            <div className="lg:col-span-8 space-y-8 md:space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#152C60]">Publicações Recentes</h2>
                <div className="flex items-center gap-4">
                  <button className="p-2 bg-white rounded-xl border border-[#152C60]/5 text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors shadow-sm">
                    <Filter size={18} />
                  </button>
                </div>
              </div>

              {PORTAL_CONTENT.map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl md:rounded-[3rem] overflow-hidden shadow-xl shadow-[#152C60]/5 border border-[#152C60]/5 group flex flex-col md:flex-row relative"
                >
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleToggleLibrary(article.id); }}
                     className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-[#152C60] hover:text-[#2B5DB6] transition-all"
                   >
                     <Bookmark size={18} className={isSaved(article.id) ? "fill-[#2B5DB6] text-[#2B5DB6]" : ""} />
                   </button>
                  <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-all duration-700" />
                    {article.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#152C60]/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <PlayCircle size={64} className="text-white" />
                      </div>
                    )}
                    <div className="absolute xl:hidden top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-[#2B5DB6]">
                      {article.category}
                    </div>
                  </div>
                  <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4 text-[9px] md:text-[10px] font-black text-[#152C60]/40 uppercase tracking-widest">
                        <User size={12} />
                        {article.author} • {article.role}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#152C60] mb-4 group-hover:text-[#2B5DB6] transition-colors leading-tight">
                        {article.title}
                      </h3>
                      {article.type === 'article' && (
                        <p className="text-xs md:text-sm text-[#152C60]/60 leading-relaxed font-medium line-clamp-3 mb-6 italic">
                          "{article.content}"
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-[#152C60]/5">
                      <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-[#152C60]/40">
                         <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
                         <span className="flex items-center gap-1.5 capitalize hidden sm:flex">{article.type}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] hover:translate-x-2 transition-transform"
                      >
                        {article.type === 'video' ? 'Assistir' : 'Ler Estudo'}
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-4 space-y-8">
               {/* Professional Access Card */}
               <div className="bg-[#152C60] p-8 md:p-10 rounded-3xl md:rounded-[3rem] text-white overflow-hidden relative group">
                 <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2B5DB6] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
                 <div className="relative z-10">
                    <div className="w-14 h-14 bg-[#F3F6FA] rounded-2xl flex items-center justify-center text-[#2B5DB6] mb-6 shadow-2xl">
                      <Lock size={28} />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">Acesso Profissional</h3>
                    <p className="text-xs text-[#F3F6FA]/60 mb-8 leading-relaxed font-medium">
                      Conteúdo exclusivo, catálogo de fórmulas magistrais e protocolos avançados para médicos e clínicos verificados.
                    </p>
                    <button 
                      onClick={() => setActiveTab('professional')}
                      className="w-full h-12 bg-white text-[#152C60] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B5DB6] hover:text-white transition-all shadow-xl"
                    >
                      Acessar Área
                    </button>
                 </div>
               </div>

               {/* Submit Study Card */}
               <div className="bg-[#F3F6FA] border-2 border-dashed border-[#152C60]/10 p-8 rounded-3xl text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#152C60]/20">
                    <FileText size={20} />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#152C60] mb-2">Envie sua Pesquisa</h4>
                  <p className="text-[10px] font-medium text-[#152C60]/40 leading-relaxed max-w-[200px] mx-auto mb-4">
                    Submeta seu TCC, tese ou estudo de caso clínico para nossa revisão técnica e publicação no portal.
                  </p>
                  <button className="text-[#2B5DB6] text-[10px] font-black uppercase tracking-widest hover:underline">
                    Ver Diretrizes
                  </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="min-h-[50vh] flex flex-col">
            <h2 className="text-2xl font-serif font-bold text-[#152C60] mb-8">Minha Biblioteca</h2>
            {savedArticles.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-20">
                <Bookmark size={48} className="mb-4 text-[#152C60]/20" />
                <h3 className="text-xl font-bold font-serif mb-2 text-[#152C60]">Nenhum estudo salvo</h3>
                <p className="text-sm font-medium">Explore o Feed Científico e salve os artigos do seu interesse.</p>
                <button onClick={() => setActiveTab('feed')} className="mt-8 px-8 py-3 bg-[#152C60] text-white rounded-xl text-xs font-bold uppercase tracking-widest">
                  Explorar Portal
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PORTAL_CONTENT.filter(art => savedArticles.includes(art.id)).map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#152C60]/5 flex"
                  >
                    <div className="w-1/3">
                      <img src={article.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#2B5DB6] mb-2 block">{article.category}</span>
                        <h4 className="font-serif font-bold text-[#152C60] leading-snug mb-2 line-clamp-2">{article.title}</h4>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <button onClick={() => setSelectedArticle(article)} className="text-[10px] font-black uppercase text-[#2B5DB6]">Ler Agora</button>
                        <button onClick={() => handleToggleLibrary(article.id)} className="text-[#152C60]/30 hover:text-red-500"><Bookmark size={16} className="fill-current" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="py-10">
            {!isProfessional ? (
              <div className="flex flex-col items-center justify-center py-20 text-center max-w-2xl mx-auto rounded-3xl bg-white border border-[#152C60]/10 shadow-xl px-6">
                 <div className="w-20 h-20 bg-[#152C60]/5 rounded-[2rem] flex items-center justify-center text-[#2B5DB6] mb-6">
                   <Award size={40} />
                 </div>
                 <h2 className="text-3xl font-serif font-bold text-[#152C60] mb-4">Acesso Exclusivo para Prescritores</h2>
                 <p className="text-sm md:text-base text-[#152C60]/60 leading-relaxed font-medium mb-10">
                   Acesse nosso Catálogo de Fórmulas prontas, sugira personalizações, estude as dosagens corretas e obtenha literaturas exclusivas para suporte às suas prescrições médicas e nutricionais.
                 </p>
                 <button 
                  onClick={() => setIsProfessional(true)}
                  className="px-8 py-4 bg-[#152C60] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B5DB6] transition-all"
                 >
                   Simular Credencial (Entrar)
                 </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-[#152C60] mb-2">Catálogo de Fórmulas Magistrais</h2>
                    <p className="text-[#152C60]/60 text-sm font-medium">Bases padronizadas pela Botica Guaraní com fundamentação em estudos recentes.</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#152C60] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-colors">
                    <Plus size={16} /> Prescrição Personalizada
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {FORMULAS_CATALOG.map(formula => (
                    <div key={formula.id} className="bg-white rounded-3xl p-8 border border-[#152C60]/10 shadow-lg hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-[#F3F6FA] text-[#2B5DB6] rounded-xl flex items-center justify-center">
                          <FlaskConical size={24} />
                        </div>
                        <button className="text-[#152C60]/30 hover:text-[#2B5DB6]"><Bookmark size={20} /></button>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[#152C60] mb-3">{formula.name}</h3>
                      <p className="text-sm text-[#152C60]/60 font-medium mb-6 leading-relaxed min-h-[40px]">{formula.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {formula.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[#F3F6FA] text-[10px] uppercase font-bold tracking-widest text-[#152C60]/60 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="w-full py-4 border border-[#2B5DB6] text-[#2B5DB6] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] hover:text-white transition-all">
                        Ver Literatura Técnica
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'board' && (
          <div className="space-y-16 py-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#152C60] mb-6">Nosso Corpo Científico</h2>
               <p className="text-base md:text-lg text-[#152C60]/50 leading-relaxed font-medium">
                 Uma equipe multidisciplinar de mestres e doutores dedicada a validar cada fórmula e a disseminar conhecimento técnico de ponta.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {SPECIALISTS.map(spec => (
                <motion.div 
                  key={spec.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl md:rounded-[3.5rem] p-8 md:p-10 border border-[#152C60]/5 shadow-xl shadow-[#152C60]/5 group"
                >
                  <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-8 relative">
                    <img src={spec.image} alt={spec.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#152C60]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] mb-2 block">{spec.specialty}</span>
                    <h3 className="text-2xl font-serif font-bold text-[#152C60] mb-2">{spec.name}</h3>
                    <p className="text-xs font-black uppercase tracking-widest text-[#152C60]/40 mb-6">{spec.role}</p>
                    <p className="text-sm text-[#152C60]/60 leading-relaxed font-medium mb-8">
                      {spec.bio}
                    </p>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] hover:translate-x-2 transition-transform">
                      Ver Publicações <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Reader Mode Modal (Kindle Inspired) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full h-full overflow-y-auto custom-scrollbar bg-[#F3F6FA]/30"
            >
              {/* Reader Header */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#152C60]/10 px-4 md:px-8 py-4 md:py-6 z-10">
                 <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors">
                      <ChevronRight size={18} className="rotate-180" /> Fechar
                    </button>
                    <div className="flex items-center gap-4 md:gap-6">
                       <button className="p-2 hover:bg-[#152C60]/5 rounded-xl transition-colors"><Share2 size={20} /></button>
                       <button 
                         onClick={() => handleToggleLibrary(selectedArticle.id)}
                         className="p-2 hover:bg-[#152C60]/5 rounded-xl transition-colors"
                       >
                         <Bookmark size={20} className={isSaved(selectedArticle.id) ? "fill-[#2B5DB6] text-[#2B5DB6]" : ""} />
                       </button>
                       <div className="w-[1px] h-6 bg-[#152C60]/10" />
                       <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#152C60]/30">{selectedArticle.readTime} Restantes</span>
                    </div>
                 </div>
              </div>

              {/* Reader Content */}
              <article className="max-w-2xl mx-auto py-12 md:py-24 px-6 md:px-0">
                 <header className="mb-12 md:mb-20 text-center">
                    <span className="inline-block px-4 py-1.5 bg-[#2B5DB6]/10 text-[#2B5DB6] text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                       {selectedArticle.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#152C60] leading-tight mb-8">
                       {selectedArticle.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                       <div className="w-12 h-12 md:w-14 md:h-14 bg-[#152C60] rounded-2xl flex items-center justify-center text-white font-serif text-xl md:text-2xl shadow-xl">{selectedArticle.author.charAt(0)}</div>
                       <div className="text-left">
                          <p className="text-xs md:text-sm font-black uppercase tracking-widest text-[#152C60]">{selectedArticle.author}</p>
                          <p className="text-[9px] md:text-[10px] font-medium text-[#152C60]/40 uppercase tracking-widest">{selectedArticle.role}</p>
                       </div>
                    </div>
                 </header>

                 <div className="aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden mb-12 md:mb-20 shadow-2xl relative group">
                    <img src={selectedArticle.image} alt="" className="w-full h-full object-cover grayscale" />
                    {selectedArticle.type === 'video' && (
                       <div className="absolute inset-0 bg-[#152C60]/40 flex items-center justify-center">
                          <PlayCircle size={64} className="text-white animate-pulse md:w-20 md:h-20" />
                       </div>
                    )}
                 </div>

                 <div className="prose prose-lg md:prose-xl prose-stone mx-auto px-2">
                    <p className="text-xl md:text-2xl font-serif text-[#152C60]/80 leading-relaxed mb-8 first-letter:text-6xl md:first-letter:text-7xl first-letter:font-serif first-letter:mr-2 md:first-letter:mr-3 first-letter:float-left first-letter:text-[#2B5DB6]">
                       {selectedArticle.content || "O conteúdo completo deste estudo está disponível sob supervisão acadêmica para garantir a integridade das informações clínicas aqui contidas."}
                    </p>
                    <p className="text-lg md:text-xl text-[#152C60]/70 leading-relaxed mb-8">
                       Historicamente, a utilização de adaptógenos na medicina guarani baseava-se na observação da resiliência vegetal sob condições extremas. A ciência moderna agora corrobora essas observações através de protocolos de extração molecular que preservam compostos instáveis como os withanolídeos tipo A.
                    </p>
                    
                    <div className="p-8 md:p-12 bg-[#F3F6FA] rounded-3xl md:rounded-[3rem] border border-[#152C60]/10 my-12 md:my-16">
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2B5DB6] rounded-xl flex items-center justify-center text-white mb-6">
                         <FlaskConical size={20} className="md:w-6 md:h-6" />
                       </div>
                       <h3 className="text-xl md:text-2xl font-serif font-bold text-[#152C60] mb-4">Nota de Rodapé Científica</h3>
                       <p className="text-sm text-[#152C60]/60 leading-relaxed italic">
                          "A biosponibilidade de compostos terpenoides em formulações magistrais é diretamente influenciada pelo carrier lipídico utilizado na manipulação." (Guarani et al., 2024).
                       </p>
                    </div>

                    <p className="text-lg md:text-xl text-[#152C60]/70 leading-relaxed mb-8">
                       Concluímos que a integração entre a sabedoria ancestral e a tecnologia farmacêutica de alta precisão não é apenas uma escolha estética, mas uma necessidade terapêutica na era da exaustão crônica.
                    </p>
                 </div>

                 <footer className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-[#152C60]/10 text-center pb-20 md:pb-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#152C60]/30 mb-8">Fim do Estudo Científico</p>
                    <div className="flex justify-center gap-6 md:gap-8">
                       <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2B5DB6]"><Share2 size={16} /> Compartilhar</button>
                       <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#152C60]"><Award size={16} /> Citar Pesquisa</button>
                    </div>
                 </footer>
              </article>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
