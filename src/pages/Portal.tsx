import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Video, FileText, Microscope, Search, 
  ChevronRight, Bookmark, Share2, PlayCircle, 
  Lock, Award, FlaskConical, Filter, Clock, User
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [isProfessional, setIsProfessional] = useState(false); // Simulado

  return (
    <div className="min-h-screen bg-[#F3F6FA] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b border-[#152C60]/10 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-[#152C60] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Botica Guaraní Science
              </span>
              <div className="flex items-center gap-2 text-[#2B5DB6]">
                <Microscope size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open Research Portal</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#152C60] tracking-tight leading-tight">
              O Portal da <br/><span className="text-[#2B5DB6]">Inteligência Biológica</span>
            </h1>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar estudos, fórmulas ou autores..."
                className="w-full md:w-96 h-14 pl-12 pr-6 bg-white rounded-2xl border-2 border-transparent focus:border-[#2B5DB6] shadow-xl shadow-[#152C60]/5 outline-none font-medium text-sm transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#152C60]/30" size={18} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-12 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { id: 'feed', label: 'Feed Científico', icon: <FileText size={18} /> },
            { id: 'board', label: 'Corpo Científico', icon: <User size={18} /> },
            { id: 'professional', label: 'Área do Prescritor', icon: <Award size={18} /> },
            { id: 'library', label: 'Minha Biblioteca', icon: <Bookmark size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 whitespace-nowrap text-xs font-black uppercase tracking-widest relative pb-4 transition-all ${
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
            <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-[#152C60]">Publicações Recentes</h2>
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
                  className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-[#152C60]/5 border border-[#152C60]/5 group flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-all duration-700" />
                    {article.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#152C60]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle size={64} className="text-white" />
                      </div>
                    )}
                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-[#2B5DB6]">
                      {article.category}
                    </div>
                  </div>
                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4 text-[10px] font-black text-[#152C60]/30 uppercase tracking-widest">
                        <User size={12} />
                        {article.author} • {article.role}
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-[#152C60] mb-6 group-hover:text-[#2B5DB6] transition-colors leading-tight">
                        {article.title}
                      </h3>
                      {article.type === 'article' && (
                        <p className="text-sm text-[#152C60]/60 leading-relaxed font-medium line-clamp-3 mb-8 italic">
                          "{article.content}"
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-[#152C60]/5">
                      <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">
                         <span className="flex items-center gap-2"><Clock size={12} /> {article.readTime}</span>
                         <span className="flex items-center gap-2 capitalize">{article.type}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#2B5DB6] hover:translate-x-2 transition-transform"
                      >
                        {article.type === 'video' ? 'Assistir Aula' : 'Ler Estudo'}
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-4 space-y-12">
               {/* Professional Access Card */}
               <div className="bg-[#152C60] p-8 rounded-[3rem] text-white overflow-hidden relative group">
                 <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2B5DB6] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-[#F3F6FA] rounded-3xl flex items-center justify-center text-[#2B5DB6] mb-8 shadow-2xl">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4">Acesso Profissional</h3>
                    <p className="text-sm text-[#F3F6FA]/60 mb-8 leading-relaxed font-medium">
                      Conteúdo exclusivo, catálogo de fórmulas magistrais e protocolos avançados para médicos e clínicos verificados.
                    </p>
                    <button className="w-full h-14 bg-white text-[#152C60] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B5DB6] hover:text-white transition-all shadow-xl">
                      Solicitar Credencial
                    </button>
                 </div>
               </div>

               {/* Trending Mentions */}
               <div className="bg-white p-10 rounded-[3rem] border border-[#152C60]/5 shadow-2xl shadow-[#152C60]/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#2B5DB6] mb-8">Tópicos Quentes</h3>
                  <div className="space-y-6">
                    {['Biofeedback', 'Ashwagandha', 'Creatina 200 Mesh', 'Nootrópicos', 'Hormese'].map(topic => (
                      <div key={topic} className="flex items-center justify-between group cursor-pointer">
                        <span className="text-sm font-bold text-[#152C60] group-hover:text-[#2B5DB6] transition-colors">{topic}</span>
                        <ChevronRight size={14} className="text-[#152C60]/20 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
               </div>

               {/* Submit Study Card */}
               <div className="bg-[#F3F6FA] border-2 border-dashed border-[#152C60]/10 p-10 rounded-[3rem] text-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#152C60]/20">
                    <FileText size={24} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#152C60] mb-3">Envie sua Pesquisa</h4>
                  <p className="text-[10px] font-medium text-[#152C60]/40 leading-relaxed max-w-[200px] mx-auto mb-6">
                    Sua pesquisa acadêmica pode ajudar milhares de profissionais. Submeta agora para revisão técnica.
                  </p>
                  <button className="text-[#2B5DB6] text-[10px] font-black uppercase tracking-widest hover:underline">
                    Ver Diretrizes
                  </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'board' && (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#152C60] mb-6">Nosso Corpo Científico</h2>
               <p className="text-lg text-[#152C60]/50 leading-relaxed font-medium">
                 Uma equipe multidisciplinar de mestres e doutores dedicada a validar cada fórmula e a disseminar conhecimento técnico de ponta.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {SPECIALISTS.map(spec => (
                <motion.div 
                  key={spec.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[3.5rem] p-10 border border-[#152C60]/5 shadow-2xl shadow-[#152C60]/5 group"
                >
                  <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden mb-8 relative">
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

            <div className="bg-[#152C60] rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               <div className="relative z-10 max-w-2xl mx-auto">
                  <h3 className="text-3xl font-serif font-bold mb-6">Quer fazer parte da equipe?</h3>
                  <p className="text-[#F3F6FA]/60 mb-10 leading-relaxed">
                    Estamos sempre em busca de pesquisadores e clínicos que compartilham nossa visão de medicina de precisão.
                  </p>
                  <button className="px-10 py-4 bg-[#2B5DB6] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#152C60] transition-all">
                    Enviar Currículo Acadêmico
                  </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="flex flex-col items-center justify-center py-32 text-center max-w-2xl mx-auto">
             <div className="w-24 h-24 bg-[#152C60]/5 rounded-[2.5rem] flex items-center justify-center text-[#152C60]/10 mb-8">
               <Award size={48} />
             </div>
             <h2 className="text-4xl font-serif font-bold text-[#152C60] mb-6">Conteúdo de Acesso Restrito</h2>
             <p className="text-lg text-[#152C60]/50 leading-relaxed font-medium mb-12">
               Este setor contém protocolos magistrais, dosagens terapêuticas avançadas e casos clínicos supervisionados. Para acessar, você deve validar sua credencial profissional (CRM, CRN, CRF).
             </p>
             <button className="px-12 py-5 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#2B5DB6] transition-all shadow-2xl shadow-[#152C60]/20">
               Validar Credencial Profissional
             </button>
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
              <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#152C60]/10 px-8 py-6 z-10">
                 <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors">
                      <ChevronRight size={18} className="rotate-180" /> Fechar Leitura
                    </button>
                    <div className="flex items-center gap-6">
                       <button className="p-2 hover:bg-[#152C60]/5 rounded-xl transition-colors"><Share2 size={20} /></button>
                       <button className="p-2 hover:bg-[#152C60]/5 rounded-xl transition-colors"><Bookmark size={20} /></button>
                       <div className="w-[1px] h-6 bg-[#152C60]/10" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/30">{selectedArticle.readTime} Restantes</span>
                    </div>
                 </div>
              </div>

              {/* Reader Content */}
              <article className="max-w-2xl mx-auto py-24 px-6">
                 <header className="mb-20 text-center">
                    <span className="inline-block px-4 py-1.5 bg-[#2B5DB6]/10 text-[#2B5DB6] text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
                       {selectedArticle.category}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#152C60] leading-tight mb-10">
                       {selectedArticle.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                       <div className="w-14 h-14 bg-[#152C60] rounded-2xl flex items-center justify-center text-white font-serif text-2xl shadow-xl">{selectedArticle.author.charAt(0)}</div>
                       <div className="text-left">
                          <p className="text-sm font-black uppercase tracking-widest text-[#152C60]">{selectedArticle.author}</p>
                          <p className="text-[10px] font-medium text-[#152C60]/40 uppercase tracking-widest">{selectedArticle.role}</p>
                       </div>
                    </div>
                 </header>

                 <div className="aspect-video rounded-[3rem] overflow-hidden mb-20 shadow-2xl relative group">
                    <img src={selectedArticle.image} alt="" className="w-full h-full object-cover grayscale" />
                    {selectedArticle.type === 'video' && (
                       <div className="absolute inset-0 bg-[#152C60]/40 flex items-center justify-center">
                          <PlayCircle size={80} className="text-white animate-pulse" />
                       </div>
                    )}
                 </div>

                 <div className="prose prose-xl prose-stone mx-auto">
                    <p className="text-2xl font-serif text-[#152C60]/80 leading-relaxed mb-8 first-letter:text-7xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#2B5DB6]">
                       {selectedArticle.content || "O conteúdo completo deste estudo está disponível sob supervisão acadêmica para garantir a integridade das informações clínicas aqui contidas."}
                    </p>
                    <p className="text-xl text-[#152C60]/70 leading-relaxed mb-8">
                       Historicamente, a utilização de adaptógenos na medicina guarani baseava-se na observação da resiliência vegetal sob condições extremas. A ciência moderna agora corrobora essas observações através de protocolos de extração molecular que preservam compostos instáveis como os withanolídeos tipo A.
                    </p>
                    
                    <div className="p-12 bg-[#F3F6FA] rounded-[3rem] border border-[#152C60]/10 my-16">
                       <div className="w-12 h-12 bg-[#2B5DB6] rounded-2xl flex items-center justify-center text-white mb-6">
                         <FlaskConical size={24} />
                       </div>
                       <h3 className="text-2xl font-serif font-bold text-[#152C60] mb-4">Nota de Rodapé Científica</h3>
                       <p className="text-sm text-[#152C60]/60 leading-relaxed italic">
                          "A biosponibilidade de compostos terpenoides em formulações magistrais é diretamente influenciada pelo carrier lipídico utilizado na manipulação." (Guarani et al., 2024).
                       </p>
                    </div>

                    <p className="text-xl text-[#152C60]/70 leading-relaxed mb-8">
                       Concluímos que a integração entre a sabedoria ancestral e a tecnologia farmacêutica de alta precisão não é apenas uma escolha estética, mas uma necessidade terapêutica na era da exaustão crônica.
                    </p>
                 </div>

                 <footer className="mt-32 pt-16 border-t border-[#152C60]/10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#152C60]/30 mb-8">Fim do Estudo Científico</p>
                    <div className="flex justify-center gap-8">
                       <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#2B5DB6]"><Share2 size={16} /> Compartilhar</button>
                       <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#152C60]"><Award size={16} /> Citar Pesquisa</button>
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
