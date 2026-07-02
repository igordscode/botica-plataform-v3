import React from 'react';
import { Microscope, Leaf, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-[#F3F6FA] text-[#152C60] font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#2B5DB6]/5 rounded-bl-[100px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              Nossa Essência
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter leading-none mb-8">
              A Arte e a Ciência da <span className="text-[#2B5DB6]">Farmacologia.</span>
            </h1>
            <p className="text-xl text-[#152C60]/60 font-medium leading-relaxed italic border-l-4 border-[#2B5DB6] pl-6 mb-12">
              "Nós não vendemos medicamentos. Nós desenvolvemos protocolos biológicos personalizados para máxima performance humana."
            </p>
          </div>
        </div>
      </section>

      {/* History and Mission Section */}
      <section className="py-24 bg-[#152C60] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                Desde 2001
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-8">
                Nossa <span className="text-[#2B5DB6]">História</span>
              </h2>
              <div className="space-y-6 text-white/80 font-medium leading-relaxed">
                <p>
                  A Botica Guaraní nasceu em 2001 no mesmo endereço até hoje: o antigo Km 4, hoje Patio Fuelpar, em Ciudad del Este. São mais de 25 anos formulando fórmulas magistrais para a região.
                </p>
                <p>
                  A farmácia é conduzida pela Química Farmacêutica Leila, responsável pela aprovação técnica de cada fórmula que sai do nosso laboratório.
                </p>
              </div>
            </div>
            
            <div className="bg-white/5 p-10 md:p-14 rounded-[3rem] border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-serif font-black uppercase tracking-tighter mb-8 text-white">Missão e Valores</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-[#2B5DB6] mb-3">Missão</h4>
                  <p className="font-medium text-white/80 leading-relaxed text-sm">
                    Elevar o potencial humano através de formulações magistrais de altíssima precisão, combinando o legado inabalável da nossa tradição com a vanguarda e a inovação tecnológica global.
                  </p>
                </div>
                
                <div className="pt-8 border-t border-white/10">
                  <h4 className="text-sm font-black uppercase tracking-widest text-[#2B5DB6] mb-4">Valores Cardeais</h4>
                  <ul className="space-y-4">
                    {[
                      { title: 'Inovação de Fronteira', desc: 'Buscamos os mais avançados e testados protocolos nutracêuticos disponíveis na literatura mundial.' },
                      { title: 'Tradição Incólume', desc: 'Mais de 25 anos de seriedade no mesmo endereço, entregando sempre a máxima transparência e confiabilidade.' },
                      { title: 'Excelência Laboratorial', desc: 'Operamos sob os mais rigorosos padrões da vigilância, com certificação absoluta em rastreabilidade biológica.' }
                    ].map((val, idx) => (
                      <li key={idx} className="flex flex-col gap-1">
                        <span className="font-bold text-white text-[13px]">{val.title}</span>
                        <span className="text-white/60 text-[12px] font-medium leading-relaxed">{val.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Facts Strip */}
          <div className="mt-20 border-t border-white/10 pt-20">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               {[
                 { value: '2001', label: 'Fundação' },
                 { value: '25+', label: 'Anos de Experiência' },
                 { value: 'CDE', label: 'Ciudad del Este, Paraguay' },
                 { value: '55', label: 'Fórmulas no Catálogo' },
               ].map((stat, i) => (
                 <div key={i}>
                   <div className="text-4xl md:text-5xl font-serif font-black text-[#2B5DB6] tracking-tighter">{stat.value}</div>
                   <p className="text-white/60 text-[11px] font-black uppercase tracking-widest mt-2">{stat.label}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Microscope size={32} />,
                title: "Precisão Laboratorial",
                desc: "Laboratórios com tecnologia de ponta, ambientes controlados e certificações internacionais para garantir pureza absoluta."
              },
              {
                icon: <Leaf size={32} />,
                title: "Ativos Premium",
                desc: "Trabalhamos exclusivamente com insumos nutracêuticos padronizados, com eficácia clínica comprovada por estudos duplo-cego."
              },
              {
                icon: <Award size={32} />,
                title: "Alta Performance",
                desc: "Atendimento voltado para quem busca romper limites biológicos com segurança, acompanhamento e personalização profunda."
              }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2rem] bg-[#F3F6FA]/50 hover:bg-[#F3F6FA] transition-all border border-[#152C60]/5">
                <div className="w-16 h-16 bg-white text-[#2B5DB6] rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#152C60] mb-4">{item.title}</h3>
                <p className="text-[#152C60]/60 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-8">
            Experimente o padrão <span className="text-[#2B5DB6]">Guaraní</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/loja" className="px-10 py-5 bg-[#152C60] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2B5DB6] transition-all transform hover:scale-105 shadow-xl shadow-[#152C60]/20 flex items-center gap-3">
              Explorar Catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/receita" className="px-10 py-5 bg-white text-[#152C60] rounded-2xl font-black text-xs uppercase tracking-widest border border-[#152C60]/10 hover:border-[#2B5DB6] transition-all flex items-center gap-3">
              Manipular Receita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
