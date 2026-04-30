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
                Mais de 20 anos de Tradição
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-8">
                Nossa <span className="text-[#2B5DB6]">História</span>
              </h2>
              <div className="space-y-6 text-white/80 font-medium leading-relaxed">
                <p>
                  A Botica Guaraní não é apenas um laboratório magistral; é um legado de mais de 20 anos construído por mãos humanas e muita resiliência. Nascemos da visão fundadora de Don José, aliada ao rigor técnico de Jane e à estruturação cirúrgica de Leila.
                </p>
                <p>
                  O que começou como um núcleo técnico familiar rapidamente encontrou uma vocação inabalável. Quando Leila assumiu integralmente a liderança e, posteriormente, adquiriu a marca, a Botica fundiu sua essência ao compromisso com a altíssima performance. Décadas de dedicação forjaram não apenas a solidez do negócio, mas o DNA da nossa marca: excelência científica sem concessões.
                </p>
                <p>
                  Nossas raízes geográficas refletem perfeitamente nossa solidez institucional. Estabelecidos desde o dia zero no emblemático Km 4 — um ponto estratégico de frente ao clássico Granvia e à Polícia Caminera —, fomos testemunhas e protagonistas do crescimento da cidade.
                </p>
                <p>
                  Nosso espaço físico, situado em um amplo e conveniente complexo com rotas de rápido acesso e estacionamento próprio, evoluiu junto com nossa tecnologia médica. Permanecemos firmes no mesmo ponto exato há mais de duas décadas, provando que a verdadeira vanguarda se constrói conhecendo e mantendo suas raízes.
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
                      { title: 'Tradição Incólume', desc: 'Mais de 20 anos de seriedade no mesmo endereço, entregando sempre a máxima transparência e confiabilidade.' },
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

          {/* Timeline of Achievements */}
          <div className="mt-20 border-t border-white/10 pt-20">
             <div className="text-center mb-16">
               <h3 className="text-3xl font-serif font-black uppercase tracking-tighter mb-4 text-white">O Códice Guaraní</h3>
               <p className="text-white/60 font-medium">Os marcos fundamentais da nossa consolidação magistral.</p>
             </div>

             <div className="space-y-12">
               {[
                 { year: 'A Gênese', title: 'Fundação Estratégica', desc: 'As portas de um sonho se abrem no emblemático Km 4. A visão de Don José, unida ao brilhantismo técnico da Química Farmacêutica Jane e à exímia gestão contábil de Leila, trazem a ciência da personalização molecular para a região.', img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=500&q=80' },
                 { year: 'Momento de Virada', title: 'A Era Leila', desc: 'Com resiliência admirável, Leila assume a vanguarda e anos depois oficializa a aquisição da Botica. Inicia-se um ciclo implacável de excelência e consolidação financeira.', img: 'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=500&q=80' },
                 { year: 'Expansão Clínica', title: 'Adequação Tecnológica', desc: 'Elevação extrema do nível laboratorial. Certificações rigorosas pela Vigilância Sanitária e construção de ambientes de pureza de padrão internacional.', img: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=500&q=80' },
                 { year: 'O Presente', title: 'O Padrão Ouro', desc: 'Mais de 20 anos depositando ciência em cada invólucro. Uma boutique de performance consolidada, valorizando o calor humano e aprovada por médicos exigentes.', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=500&q=80' },
                 { year: 'O Futuro', title: 'Hiper-Personalização', desc: 'A integração da Inteligência Artificial guiada pelo Concierge Guaraní. Previsibilidade metabólica e cruzamento de dados para redefinir os limites do corpo humano.', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col md:flex-row items-center gap-8 md:gap-12 group">
                   <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                     <div className="relative w-64 h-48 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#2B5DB6] transition-colors">
                       <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-0 bg-[#152C60]/40 group-hover:bg-transparent transition-colors" />
                     </div>
                   </div>
                   
                   <div className="hidden md:flex w-12 flex-col items-center relative">
                     <div className="w-4 h-4 rounded-full bg-[#2B5DB6] relative z-10 shadow-[0_0_15px_rgba(43,93,182,0.6)]" />
                     {i !== 4 && <div className="w-0.5 h-32 bg-white/10 absolute top-4 left-1/2 -translate-x-1/2" />}
                   </div>

                   <div className="w-full md:w-1/2 text-center md:text-left">
                     <span className="text-[#2B5DB6] font-black tracking-widest text-xs uppercase mb-2 block">{item.year}</span>
                     <h4 className="text-2xl font-serif font-black text-white mb-3">{item.title}</h4>
                     <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">{item.desc}</p>
                   </div>
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
