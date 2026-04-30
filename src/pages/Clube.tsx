import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Microscope, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Clube() {
  return (
    <div className="bg-[#F3F6FA] text-[#152C60] font-sans pb-32">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[80%] bg-[#152C60] rounded-b-[4rem] z-0" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-[#2B5DB6] rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
            <ShieldCheck size={14} /> Assinatura Premium
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-white leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl">
            Clube <span className="text-[#2B5DB6] bg-clip-text text-transparent bg-gradient-to-r from-[#2B5DB6] to-white">Guaraní</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed italic mb-16">
            Eleve sua jornada de saúde a um novo patamar. Benefícios exclusivos, manipulação prioritária e presentes que acompanham o seu estilo de vida.
          </p>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {/* Plan 1 */}
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#152C60]/5 relative flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-black text-[#152C60] mb-2">Essencial</h3>
                <p className="text-xs font-black uppercase tracking-widest text-[#152C60]/40 mb-6 border-b border-[#152C60]/10 pb-6">Mensal</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-serif font-black text-[#152C60]">R$ 99</span>
                  <span className="text-sm font-bold text-[#152C60]/40">/mês</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {['Frete Fixo Reduzido', '5% OFF em todas as Fórmulas', 'Suporte Prioritário no WhatsApp', 'Curadoria de Nutracêuticos Mensal'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#152C60]/70">
                      <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full h-14 bg-[#F3F6FA] text-[#152C60] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60] hover:text-white transition-all">
                Assinar Essencial
              </button>
            </motion.div>

            {/* Plan 2 */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#152C60] rounded-[3rem] p-10 shadow-2xl relative transform md:-translate-y-8 flex flex-col border border-white/10">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="bg-[#2B5DB6] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Mais Escolhido</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-black text-white mb-2">Performance</h3>
                <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 border-b border-white/10 pb-6">Semestral</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-serif font-black text-white">R$ 499</span>
                  <span className="text-sm font-bold text-white/40">/semestre</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {['Frete GRÁTIS', '15% OFF em todas as Fórmulas', 'Manipulação Expressa (24h)', '1 Brinde Exclusivo a cada pedido', 'Acesso Antecipado a Lançamentos'].map((feat, i) => (
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
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#152C60]/5 relative flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-black text-[#152C60] mb-2">Prime <Star size={16} className="inline-block text-[#2B5DB6] fill-current" /></h3>
                <p className="text-xs font-black uppercase tracking-widest text-[#152C60]/40 mb-6 border-b border-[#152C60]/10 pb-6">Anual</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-serif font-black text-[#152C60]">R$ 890</span>
                  <span className="text-sm font-bold text-[#152C60]/40">/ano</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {['Frete GRÁTIS Sedex Nacional', '25% OFF em Fórmulas Constantes', 'Manipulação Ultra-Expressa (12h)', 'Kits de Brindes Sazonais Premium', 'Concierge Pessoal no WhatsApp', 'Consultoria com Farmacêutico (1x/mês)'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#152C60]/70">
                      <CheckCircle2 size={18} className="text-[#2B5DB6] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full h-14 bg-white border-2 border-[#152C60] text-[#152C60] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60] hover:text-white transition-all">
                Assinar Prime
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center space-y-16 mt-8">
        <div>
           <Microscope className="w-16 h-16 mx-auto text-[#2B5DB6] mb-6" />
           <h2 className="text-4xl font-serif font-black text-[#152C60] uppercase tracking-tighter mb-6">Por que fazer parte do Clube?</h2>
           <p className="text-lg text-[#152C60]/60 font-medium leading-relaxed max-w-2xl mx-auto">
             Não é apenas sobre comprar fórmulas. É sobre construir uma rotina biológica de alto desempenho, com o respaldo do melhor laboratório magistral do país.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
           <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-[#152C60]/5">
             <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center mb-6"><Zap size={24} /></div>
             <h4 className="text-lg font-serif font-black text-[#152C60] mb-2">Velocidade Extrema</h4>
             <p className="text-sm text-[#152C60]/60 font-medium leading-relaxed">Membros Clube pulam a fila. Suas fórmulas são manipuladas e despachadas com prioridade absoluta no laboratório.</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-[#152C60]/5">
             <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center mb-6"><Star size={24} /></div>
             <h4 className="text-lg font-serif font-black text-[#152C60] mb-2">Brindes com Propósito</h4>
             <p className="text-sm text-[#152C60]/60 font-medium leading-relaxed">Esqueça amostras genéricas. Enviamos acessórios de rotina (coqueteleiras, bags) e nutracêuticos alinhados aos seus objetivos.</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-[#152C60]/5">
             <div className="w-12 h-12 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl flex items-center justify-center mb-6"><ShieldCheck size={24} /></div>
             <h4 className="text-lg font-serif font-black text-[#152C60] mb-2">Fidelidade Real</h4>
             <p className="text-sm text-[#152C60]/60 font-medium leading-relaxed">Descontos automáticos aplicados diretamente no carrinho em todas as suas compras, além de ofertas relâmpago no WhatsApp.</p>
           </div>
        </div>
      </section>

    </div>
  );
}
