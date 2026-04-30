import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Share2, BookmarkPlus, BookmarkCheck, Heart, ThumbsUp, MessagesSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ArticleDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // Exemplo de artigo hardcoded para demonstração
  const article = {
    id: id,
    title: 'Modulação do Eixo Intestino-Cérebro através de Cepas Psicobióticas: Uma Revisão Prática',
    category: 'Microbiota & Cognição',
    author: {
      name: 'Dr. Fernando Lemos',
      role: 'Médico Nutrólogo & Pesquisador',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?w=150&h=150&fit=crop&q=80'
    },
    date: '15 Março 2026',
    timeToRead: '8 min',
    likes: 124,
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=600&fit=crop&q=80',
    tags: ['Psicobióticos', 'Ansiedade', 'Microbioma'],
    content: `
      <h2>Introdução ao Eixo Intestino-Cérebro</h2>
      <p>A comunicação bidirecional entre o trato gastrointestinal e o sistema nervoso central (SNC) tem revolucionado nossa compreensão sobre distúrbios neuropsiquiátricos. Cepas específicas, conhecidas como "psicobióticos", demonstram capacidade notável de transpor barreiras fisiológicas e modular neurotransmissores.</p>

      <blockquote>"O intestino não é apenas nosso segundo cérebro, é o epicentro de nossa saúde mental e imunológica."</blockquote>

      <h2>O Mecanismo de Ação do Lactobacillus rhamnosus (JB-1)</h2>
      <p>Estudos recentes in vivo demonstraram que cepas isoladas de <i>Lactobacillus rhamnosus</i> induzem alterações na expressão de receptores GABA centrais. Esse processo ocorre mediado diretamente pelo nervo vago.</p>
      
      <div class="image-wrapper">
        <img src="https://images.unsplash.com/photo-1579154204601-01588f18d1da?w=800&fit=crop&q=80" alt="Microscopia de cepas probióticas" />
        <span class="caption">Figura 1: Aderência de cepas probióticas ao epitélio intestinal.</span>
      </div>

      <h2>Resultados Clínicos em Transtornos de Ansiedade</h2>
      <p>Em um ensaio clínico duplo-cego controlado por placebo com 150 pacientes (idade 25-55), a administração de um pool de cepas (30 Bi UFC/dia) resultou em:</p>
      <ul>
        <li>Redução de 34% nos níveis basais de cortisol salivar (p < 0.05).</li>
        <li>Melhoria nos scores do Inventário de Ansiedade de Beck (BAI) após 8 semanas.</li>
        <li>Aumento da variabilidade da frequência cardíaca (HRV) durante o sono.</li>
      </ul>

      <h2>Aplicações Magistrais</h2>
      <p>Para prescrição, sugerimos a associação de pré-bióticos (GOS/FOS) às cepas em cápsulas gastrorresistentes, garantindo viabilidade através da barreira gástrica. A associação com precursores orgânicos, como L-Triptofano, maximiza a síntese de serotonina intestinal.</p>
    `
  };

  return (
    <div className="bg-white min-h-screen pb-32 pt-20">
      {/* Header Modal-like Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#152C60]/10 px-4 py-3 flex items-center justify-between max-w-4xl mx-auto md:mt-8 md:rounded-t-3xl">
        <Link to="/portal" className="flex items-center gap-2 text-[#152C60]/60 hover:text-[#2B5DB6] transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-bold">Voltar ao Portal</span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F3F6FA] text-[#152C60] hover:bg-[#2B5DB6] hover:text-white transition-colors">
            <Share2 size={18} />
          </button>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSaved ? 'bg-[#2B5DB6] text-white' : 'bg-[#F3F6FA] text-[#152C60] hover:bg-[#2B5DB6] hover:text-white'}`}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-xs font-black uppercase tracking-widest mb-6">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60] leading-[1.1] mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#152C60]/60 font-medium">
            <div className="flex items-center gap-3">
              <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <p className="font-bold text-[#152C60]">{article.author.name}</p>
                <p className="text-xs">{article.author.role}</p>
              </div>
            </div>
            <div className="w-1 h-1 bg-[#152C60]/20 rounded-full hidden md:block" />
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {article.date} · {article.timeToRead}
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden mb-16 shadow-2xl relative">
          <img src={article.coverImage} alt={article.title} className="w-full aspect-[2/1] object-cover" />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Markdown-like Content */}
          <div 
            className="prose prose-lg prose-blue max-w-none text-[#152C60]/80
              prose-headings:font-serif prose-headings:font-black prose-headings:text-[#152C60]
              prose-p:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-[#2B5DB6] prose-blockquote:bg-[#F3F6FA] prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:text-[#152C60]
              prose-img:rounded-2xl prose-img:shadow-xl
              prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2
              [&_.caption]:block [&_.caption]:text-center [&_.caption]:text-xs [&_.caption]:text-[#152C60]/50 [&_.caption]:mt-3"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-[#F3F6FA] text-[#152C60]/70 rounded-lg text-sm font-bold shadow-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-16 py-8 border-t border-b border-[#152C60]/10 flex items-center justify-between">
            <button 
              onClick={() => setHasLiked(!hasLiked)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${hasLiked ? 'bg-[#2B5DB6] text-white' : 'bg-[#F3F6FA] text-[#152C60] hover:bg-[#152C60] hover:text-white'}`}
            >
              <ThumbsUp size={20} className={hasLiked ? "fill-current" : ""} />
              {hasLiked ? 'Você curtiu' : 'Curtir Estudo'} ({article.likes + (hasLiked ? 1 : 0)})
            </button>

            <button className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-[#152C60]/70 hover:bg-[#F3F6FA] transition-colors">
              <MessagesSquare size={20} />
              Ver Discussões (3)
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
