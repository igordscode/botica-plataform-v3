import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Zap, Microscope, Star, ArrowRight, Trophy, Target, Gift, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Clube() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const xp = 850;
  const nextTarget = 1000;
  const progress = (xp / nextTarget) * 100;

  return (
    <div className="bg-[#F3F6FA] text-[#152C60] font-sans pb-32">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[80%] bg-[#152C60] rounded-b-[4rem] z-0" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-[#2B5DB6] rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
            <ShieldCheck size={14} /> Sistema de Recompensas
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-white leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl">
            Clube <span className="text-[#2B5DB6] bg-clip-text text-transparent bg-gradient-to-r from-[#2B5DB6] to-white">Guaraní</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed italic mb-16">
            Eleve sua jornada de saúde a um novo patamar. Acumule pontos, suba de nível e desbloqueie benefícios vitais.
          </p>

          {/* User Gamification Dashboard / Status */}
          {user ? (
            <div className="max-w-4xl mx-auto mb-20 bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-[#152C60]/10 text-left relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Trophy size={160} className="text-[#2B5DB6]" />
               </div>
               
               <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start md:items-center">
                 <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-sm font-black uppercase tracking-widest text-[#152C60]">Seu Nível Atual</h3>
                       <span className="text-[10px] font-black uppercase tracking-widest bg-[#F3F6FA] text-[#152C60]/50 px-3 py-1 rounded-lg">ID: {user.uid.slice(0,6)}</span>
                    </div>
                    <div className="flex items-end gap-4 mb-8">
                       <h2 className="text-5xl font-serif font-black text-[#152C60] bg-clip-text text-transparent bg-gradient-to-r from-[#152C60] to-[#2B5DB6]">Ouro</h2>
                       <p className="text-sm font-bold text-[#152C60]/50 mb-1 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Benefícios Ativos
                       </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                        <span className="text-[#2B5DB6]">{xp} XP <span className="text-[#152C60]/40 normal-case">(Acumulados)</span></span>
                        <span className="text-[#152C60]/40">Faltam {nextTarget - xp} XP para Nível Diamante</span>
                      </div>
                      <div className="h-3 w-full bg-[#F3F6FA] rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#152C60] to-[#2B5DB6] rounded-full relative"
                        >
                           <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/20 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                 </div>

                 <div className="w-full md:w-64 space-y-3">
                    <div className="p-4 bg-[#F3F6FA] rounded-2xl flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-[#152C60] text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 size={16} />
                       </div>
                       <p className="text-xs font-bold leading-tight">Frete Grátis Nacional <span className="text-[#2B5DB6]">Desbloqueado</span></p>
                    </div>
                    <div className="p-4 bg-[#F3F6FA] rounded-2xl flex items-center gap-3 opacity-50 grayscale">
                       <div className="w-8 h-8 rounded-full bg-[#152C60]/10 text-[#152C60]/40 flex items-center justify-center shrink-0">
                          <Gift size={16} />
                       </div>
                       <p className="text-xs font-bold leading-tight">Curadoria Exclusiva <span className="block text-[9px] uppercase tracking-widest mt-0.5">Em breve</span></p>
                    </div>
                 </div>
               </div>
            </div>
          ) : (
             <div className="max-w-xl mx-auto mb-20 bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20">
               <h3 className="text-2xl font-serif font-black text-white mb-2">Faça Login para ver seu Progresso</h3>
               <p className="text-white/60 text-sm font-medium mb-6">Acompanhe seus pontos e nível no Clube Guaraní.</p>
             </div>
          )}

          {/* Pricing/Tiers Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {/* Plan 1 */}
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#152C60]/5 relative flex flex-col">
              <div className="flex-1">
                <div className="w-12 h-12 bg-[#F3F6FA] rounded-2xl flex items-center justify-center mb-6">
                   <Target size={20} className="text-[#152C60]" />
                </div>
                <h3 className="text-2xl font-serif font-black text-[#152C60] mb-2">Nível Prata</h3>
                <p className="text-xs font-black uppercase tracking-widest text-[#152C60]/40 mb-6 border-b border-[#152C60]/10 pb-6">0 - 500 XP</p>
                <ul className="space-y-4 mb-10">
                  {['Toda compra gera pontos (+1XP/R$)', '5% OFF em Fórmulas da sua categoria alvo', 'Suporte Básico'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#152C60]/70">
                      <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full text-center py-4 text-[#152C60]/40 font-black uppercase tracking-widest text-[10px]">
                Categoria Inicial
              </div>
            </motion.div>

            {/* Plan 2 - Highlighted */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#152C60] rounded-[3rem] p-10 shadow-2xl relative transform md:-translate-y-8 flex flex-col border border-white/10">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="bg-[#2B5DB6] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Seu Nível Atual</span>
              </div>
              <div className="flex-1">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                   <Star size={20} className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-serif font-black text-white mb-2">Nível Ouro</h3>
                <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 border-b border-white/10 pb-6">501 - 1000 XP</p>
                <ul className="space-y-4 mb-10">
                  {['Multiplicador de XP 1.5x nas Fórmulas', 'Frete GRÁTIS Fixo', 'Manipulação Expressa Privilegiada', 'Cashback 2% em toda a loja'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-white/80">
                      <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full h-14 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#152C60] transition-all">
                Ver Meus Benefícios
              </button>
            </motion.div>

            {/* Plan 3 */}
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#152C60]/5 relative flex flex-col">
              <div className="flex-1">
                <div className="w-12 h-12 bg-[#2B5DB6]/10 rounded-2xl flex items-center justify-center mb-6">
                   <Trophy size={20} className="text-[#2B5DB6]" />
                </div>
                <h3 className="text-2xl font-serif font-black text-[#152C60] mb-2">Nível Diamante</h3>
                <p className="text-xs font-black uppercase tracking-widest text-[#152C60]/40 mb-6 border-b border-[#152C60]/10 pb-6">1001+ XP</p>
                <ul className="space-y-4 mb-10">
                  {['Benefícios Nível Ouro', 'Manipulação Ultra-Expressa', 'Curadoria de Brindes Sazonais', 'Consulta Anual com Farmacêutico', 'Cashback 5% para Fórmulas'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#152C60]/70">
                      <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full text-center py-4 bg-[#F3F6FA] text-[#152C60]/40 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                Faltam {nextTarget - xp} XP
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center space-y-16 mt-8">
        <div>
           <Zap className="w-16 h-16 mx-auto text-[#2B5DB6] mb-6" />
           <h2 className="text-4xl font-serif font-black text-[#152C60] uppercase tracking-tighter mb-6">Como subir de nível?</h2>
           <p className="text-lg text-[#152C60]/60 font-medium leading-relaxed max-w-2xl mx-auto">
             O Clube Guaraní foi criado para recompensar o comprometimento com a sua saúde. Não é uma mensalidade, é uma gamificação da sua longevidade.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
           <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-[#152C60]/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B5DB6]/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
             <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center mb-6 relative z-10"><Microscope size={24} /></div>
             <h4 className="text-lg font-serif font-black text-[#152C60] mb-2 relative z-10">Adquira Fórmulas</h4>
             <p className="text-sm text-[#152C60]/60 font-medium leading-relaxed relative z-10">Cada R$ investido em fórmulas manipuladas Guaraní gera imediatamente 1 XP na sua conta. Fórmulas recorrentes podem gerar bônus.</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-[#152C60]/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B5DB6]/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
             <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center mb-6 relative z-10"><FileText size={24} /></div>
             <h4 className="text-lg font-serif font-black text-[#152C60] mb-2 relative z-10">Envie sua Prescrição</h4>
             <p className="text-sm text-[#152C60]/60 font-medium leading-relaxed relative z-10">Ao enviar a primeira prescrição pela GuaranIA (nossa inteligência artificial), você desbloqueia uma conquista "Digital" rendendo 50 XP extras.</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-[#152C60]/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B5DB6]/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
             <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center mb-6 relative z-10"><ShieldCheck size={24} /></div>
             <h4 className="text-lg font-serif font-black text-[#152C60] mb-2 relative z-10">Mantenha-se Ativo</h4>
             <p className="text-sm text-[#152C60]/60 font-medium leading-relaxed relative z-10">Seus XP tem validade de 12 meses renováveis a cada compra. Mantenha os níveis para continuar com benefícios permanentes ativados.</p>
           </div>
        </div>
      </section>

      {/* Assinatura Section */}
      <section className="bg-white py-32 px-6 border-t border-[#152C60]/10">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3F6FA] text-[#152C60] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Star size={14} className="text-[#2B5DB6]" /> Assinatura Premium
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-[#152C60] uppercase tracking-tighter mb-6">
            Guaraní <span className="text-[#2B5DB6]">Prime</span>
          </h2>
          <p className="text-lg text-[#152C60]/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Para quem busca comodidade extrema e saúde levada a sério. Assine um de nossos planos e receba fórmulas mensalmente, conteúdo exclusivo e prioridade máxima.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
           {/* Plan 1 */}
           <motion.div whileHover={{ y: -10 }} className="bg-[#F3F6FA] rounded-[3rem] p-10 relative flex flex-col border border-[#152C60]/5">
             <div className="flex-1">
               <h3 className="text-2xl font-serif font-black text-[#152C60] mb-2">Essencial</h3>
               <p className="text-xs font-black uppercase tracking-widest text-[#152C60]/40 mb-6 border-b border-[#152C60]/10 pb-6">Mensal</p>
               <div className="flex items-baseline gap-1 mb-8">
                 <span className="text-4xl font-serif font-black text-[#152C60]">R$ 99</span>
                 <span className="text-sm font-bold text-[#152C60]/40">/mês</span>
               </div>
               <ul className="space-y-4 mb-10">
                 {['Frete Fixo Reduzido', '5% OFF extra em Fórmulas', 'Newsletter Exclusiva (Ciência Diária)', 'Acesso a 1 Masterclass / Mês'].map((feat, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#152C60]/70">
                     <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                     {feat}
                   </li>
                 ))}
               </ul>
             </div>
             <button className="w-full h-14 bg-white text-[#152C60] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60] border border-[#152C60]/10 hover:text-white transition-all shadow-sm">
               Assinar Essencial
             </button>
           </motion.div>

           {/* Plan 2 */}
           <motion.div whileHover={{ y: -10 }} className="bg-[#152C60] rounded-[3rem] p-10 relative transform md:-translate-y-8 flex flex-col shadow-2xl">
             <div className="absolute -top-4 inset-x-0 flex justify-center">
               <span className="bg-[#2B5DB6] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Mais Escolhido</span>
             </div>
             <div className="flex-1">
               <h3 className="text-2xl font-serif font-black text-white mb-2">Performance</h3>
               <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 border-b border-white/10 pb-6">Semestral (Desconto aplic.)</p>
               <div className="flex items-baseline gap-1 mb-8">
                 <span className="text-4xl font-serif font-black text-white">R$ 499</span>
                 <span className="text-sm font-bold text-white/40">/semestre</span>
               </div>
               <ul className="space-y-4 mb-10">
                 {['Frete GRÁTIS Fixo', '1 Ficha de Manipulação/Mês Inclusa', '10% OFF extra', 'Manipulação Expressa (24h)', 'Guarania PRO Liberada', 'Acesso ilimitado Masterclasses'].map((feat, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm font-bold text-white/80">
                     <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                     {feat}
                   </li>
                 ))}
               </ul>
             </div>
             <button className="w-full h-14 bg-[#2B5DB6] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#152C60] transition-all shadow-xl shadow-[#2B5DB6]/20">
               Assinar Performance
             </button>
           </motion.div>

           {/* Plan 3 */}
           <motion.div whileHover={{ y: -10 }} className="bg-[#F3F6FA] rounded-[3rem] p-10 relative flex flex-col border border-[#152C60]/5">
             <div className="flex-1">
               <h3 className="text-2xl font-serif font-black text-[#152C60] mb-2">Longevidade</h3>
               <p className="text-xs font-black uppercase tracking-widest text-[#152C60]/40 mb-6 border-b border-[#152C60]/10 pb-6">Anual</p>
               <div className="flex items-baseline gap-1 mb-8">
                 <span className="text-4xl font-serif font-black text-[#152C60]">R$ 890</span>
                 <span className="text-sm font-bold text-[#152C60]/40">/ano</span>
               </div>
               <ul className="space-y-4 mb-10">
                 {['Tudo do plano Performance', 'Frete Sedex GRÁTIS Nacional', 'Manipulação Ultra-Expressa (12h)', 'Kits Sazonais (Camisetas, Coqueteleiras)', 'Curadoria de Nutracêuticos', 'Contato Direto com Suporte Prime'].map((feat, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#152C60]/70">
                     <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                     {feat}
                   </li>
                 ))}
               </ul>
             </div>
             <button className="w-full h-14 bg-white border border-[#152C60]/10 text-[#152C60] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60] hover:text-white transition-all">
               Assinar Longevidade
             </button>
           </motion.div>
        </div>
      </section>

    </div>
  );
}

