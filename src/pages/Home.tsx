import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Leaf, ShieldCheck, Zap, Heart, Award,
  MessageSquare, FileText, Stethoscope, Microscope,
  Brain, Moon, Flame, Wind,
  Baby, Flower2, HeartPulse, UserRound, ChevronLeft, ChevronRight, Sparkles, Truck, Building2, FlaskConical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { waLink } from '../constants';

export default function Home() {
  const [activeGoal, setActiveGoal] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 'kit',
      tag: 'Kit Completo & Linha Magistral',
      badgeIcon: Award,
      title: 'A CIÊNCIA DO SEU BEM-ESTAR',
      highlight: 'Fórmulas Exclusivas',
      quote: '"Coleção completa de cápsulas, sachês e cosméticos magistrais personalizados para sua biologia única."',
      image: '/images/portada-hero.png',
      floatBadge: 'Kit Botica Guaraní',
      floatDesc: 'Linha completa com certificação farmacêutica internacional.',
      floatIcon: 'G'
    },
    {
      id: 'lab',
      tag: 'Biotecnologia & Alta Precisão',
      badgeIcon: FlaskConical,
      title: 'PRECISÃO E BIOTECNOLOGIA',
      highlight: 'Laboratório Próprio',
      quote: '"Controle rigoroso de dosagem e pureza de matérias-primas importadas em ambiente esterilizado."',
      image: '/mortero-branco.svg',
      floatBadge: 'CQ Farmacêutico',
      floatDesc: 'Controle de qualidade e laudos analíticos por lote.',
      floatIcon: '🔬'
    },
    {
      id: 'fachada',
      tag: 'Tradição & Atendimento VIP',
      badgeIcon: Building2,
      title: 'MAIS DE 25 ANOS DE HISTÓRIA',
      highlight: 'Sede & Atendimento',
      quote: '"Referência máxima em manipulação de fórmulas no Paraguai, unindo tradição indígena e ciência moderna."',
      image: '/mortero-branco.svg',
      floatBadge: 'Botica Guaraní',
      floatDesc: 'Mais de 15.000 fórmulas entregues com precisão.',
      floatIcon: '🏛️'
    },
    {
      id: 'entrega',
      tag: 'Logística Especializada',
      badgeIcon: Truck,
      title: 'ENTREGA EM TODO PAÍS',
      highlight: 'Envio Garantido',
      quote: '"Embalagem térmica de segurança e rastreamento expresso para todo o Paraguai e envio para o Brasil."',
      image: '/mortero-branco.svg',
      floatBadge: 'Logística Botica',
      floatDesc: 'Proteção contra temperatura e luz para a sua fórmula.',
      floatIcon: '📦'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goals = [
    { id: 'focus', title: 'Foco & Performance', icon: Brain, color: 'bg-blue-500', desc: 'Aumente sua capacidade cognitiva e concentração.' },
    { id: 'sleep', title: 'Descanso Profundo', icon: Moon, color: 'bg-indigo-600', desc: 'Melhore a qualidade do seu sono e recuperação.' },
    { id: 'energy', title: 'Energia Vital', icon: Flame, color: 'bg-orange-500', desc: 'Disponibilidade energética constante durante o dia.' },
    { id: 'stress', title: 'Equilíbrio Zen', icon: Wind, color: 'bg-emerald-500', desc: 'Gestão de cortisol e resiliência ao estresse.' },
  ];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const slide = heroSlides[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <div className="overflow-hidden bg-[#F7F2E6]">
      {/* Hero Section - High Performance & Personalization */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-12 px-6 overflow-hidden bg-gradient-to-b from-[#0B192C] via-[#08101E] to-[#F7F2E6]/10 text-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2B5DB6]/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#133385]/30 rounded-full blur-[150px]" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={slide.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2B5DB6] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-lg shadow-[#2B5DB6]/30"
              >
                <BadgeIcon size={14} /> {slide.tag}
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-[0.9] mb-8 tracking-tighter">
                {slide.title.split(' ').slice(0, -1).join(' ')} <br/>
                <span className="text-[#ABBAD7] font-sans font-extrabold uppercase tracking-wide text-4xl md:text-5xl block mt-2 text-[#2B5DB6]">{slide.highlight}</span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-10 max-w-lg font-spectral italic border-l-4 border-[#2B5DB6] pl-6 leading-relaxed">
                {slide.quote}
              </p>
              
              <div className="flex flex-wrap gap-4 items-center mb-8">
                <Link 
                  to="/loja" 
                  className="px-10 py-5 bg-[#133385] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2B5DB6] transition-all transform hover:scale-105 shadow-2xl shadow-[#133385]/50 flex items-center gap-3 border border-white/10"
                >
                  Ver Catálogo <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/receita" 
                  className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-black text-sm uppercase tracking-widest border border-white/20 hover:bg-white hover:text-[#0B192C] transition-all flex items-center gap-3"
                >
                  Enviar Receita <Zap size={20} className="text-[#2B5DB6]" />
                </Link>
              </div>

              {/* Carousel Navigation Bar */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlide === idx 
                          ? 'w-8 bg-[#2B5DB6]' 
                          : 'w-2.5 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                    aria-label="Slide anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                    aria-label="Próximo slide"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div 
              key={slide.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative z-10 aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#133385] to-[#08101E] shadow-2xl shadow-black/80 border border-white/10 flex items-center justify-center group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={slide.image.endsWith('.svg') ? "w-1/2 h-1/2 object-contain opacity-90 transition-transform duration-700 group-hover:scale-110" : "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-8 right-8 text-white/80 text-xs font-mono tracking-widest uppercase flex justify-between items-center">
                  <span>SLIDE 0{currentSlide + 1} / 04</span>
                  <span className="flex items-center gap-1"><Sparkles size={12} className="text-[#2B5DB6]" /> BOTICA GUARANÍ</span>
                </div>
              </div>

              {/* Float Element */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-[#0B192C]/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/15 z-20 hidden md:block text-white"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-[#2B5DB6] text-white rounded-xl flex items-center justify-center font-serif text-xl font-black shadow-md">
                    {slide.floatIcon}
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-[11px] tracking-widest text-white">{slide.floatBadge}</h4>
                    <p className="text-[10px] font-bold text-[#ABBAD7] italic">Fórmulas Certificadas</p>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-300 max-w-[170px] leading-snug">
                  {slide.floatDesc}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Banner: Enviar Receita - High Intensity */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/receita" className="group block relative p-12 md:p-20 bg-[#152C60] rounded-[4rem] text-white overflow-hidden shadow-3xl transform hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-[#2B5DB6] rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  <FileText size={14} /> Serviço Expresso
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight uppercase">
                  Já possui uma <span className="text-[#2B5DB6]">receita médica?</span>
                </h2>
                <p className="text-lg text-white/60 font-medium">
                  Envie agore e receba seu orçamento personalizado em minutos via WhatsApp.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-[#2B5DB6] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Enviar Agora</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Specialty Grid */}
      <section id="especialidades" className="py-20 px-6 bg-[#FCFAF4] border-b border-[#152C60]/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <div className="w-14 h-0.5 bg-[#152C60] mb-3" />
            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#152C60] font-display">Especialidades</span>
            <h2 className="font-serif font-black text-[#152C60] uppercase tracking-tight mt-3 mb-3 text-4xl leading-none">
              Atendemos casi todas las ramas de la salud
            </h2>
            <p className="text-sm text-[#4A4A50] leading-relaxed">
              Si su especialidad no aparece en este listado, pregúntenos — preparamos fórmulas para prácticamente cualquier indicación médica.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { Icon: Stethoscope, title: "Dermatología",  desc: "Cremas, ungüentos y lociones magistrales para la piel." },
              { Icon: Baby,        title: "Pediatría",     desc: "Suspensiones, gotas y jarabes a dosis exacta para niños." },
              { Icon: Flower2,     title: "Ginecología",   desc: "Óvulos, geles y preparaciones íntimas magistrales." },
              { Icon: HeartPulse,  title: "Cardiología",   desc: "Cápsulas y suspensiones a la dosis indicada por su médico." },
              { Icon: UserRound,   title: "Geriatría",     desc: "Cápsulas a dosis fraccionada para tratamientos prolongados." },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#FCFAF4] border border-[#152C60]/[0.18] rounded-lg p-5 cursor-pointer transition-all duration-[180ms] hover:-translate-y-0.5"
                style={{ boxShadow: 'var(--shadow-1)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-2)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--shadow-1)')}
              >
                <Icon size={28} strokeWidth={1.75} className="text-[#152C60] mb-3" />
                <h3 className="font-semibold text-[#141414] text-base mb-1.5 leading-snug">{title}</h3>
                <p className="text-xs text-[#4A4A50] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Strip */}
      <section id="como-trabajamos" className="py-20 px-6 bg-[#F7F2E6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-9">
            <div className="w-14 h-0.5 bg-[#152C60] mb-3" />
            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#152C60] font-display">Cómo trabajamos</span>
            <h2 className="font-serif font-black text-[#152C60] uppercase tracking-tight mt-3 text-4xl leading-none">
              De la receta a su mano, en cuatro pasos
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-7 list-none p-0">
            {[
              { n: "01", h: "Su receta",   p: "Tráiganos su receta médica o envíela por WhatsApp." },
              { n: "02", h: "Presupuesto", p: "Le pasamos el precio y el tiempo estimado de preparación." },
              { n: "03", h: "Preparación", p: "Formulamos su pedido en nuestro laboratorio certificado." },
              { n: "04", h: "Retiro",      p: "Le avisamos cuando esté listo para retirar o despachar." },
            ].map(({ n, h, p }) => (
              <li key={n} className="border-t-2 border-[#152C60] pt-4">
                <div className="font-serif font-black text-2xl text-[#2D55D6] mb-2.5">{n}</div>
                <h4 className="font-semibold text-[#141414] text-lg mb-1.5">{h}</h4>
                <p className="text-sm text-[#4A4A50] leading-snug">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured Categories & Products */}
      <section className="py-20 px-6 bg-[#F7F2E6]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">Vitrine Magistral</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black text-[#152C60] uppercase tracking-tighter">
                Fórmulas de <br/><span className="text-[#2B5DB6]">Elite.</span>
              </h2>
            </div>
            <Link to="/loja" className="px-10 py-5 bg-white text-[#152C60] border border-[#152C60]/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#2B5DB6] hover:text-white transition-all shadow-xl shadow-[#152C60]/5">
              Ver Todas as Fórmulas
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Salud & Vida", img: "/products/salud-cardiovascular.png" },
              { title: "Rendimiento", img: "/products/aumento-de-la-masa-muscular.png" },
              { title: "Dermocosmética", img: "/products/hidratacion-profunda-antiage.png" },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] rounded-[4rem] overflow-hidden bg-[#152C60] shadow-2xl"
              >
                <img src={cat.img} className="w-full h-full object-contain p-10 group-hover:scale-105 transition-all duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152C60] via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 space-y-2">
                   <h3 className="text-3xl font-serif font-black text-white uppercase tracking-tighter">{cat.title}</h3>
                </div>
                <Link to="/loja" className="absolute inset-0 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio-Meta Goal Selector */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">O que você busca hoje?</span>
             <h2 className="text-5xl md:text-7xl font-serif font-black text-[#152C60] uppercase tracking-tighter">O SEU <span className="text-[#2B5DB6]">BIO-OBJETIVO.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {goals.map((goal) => (
              <motion.button
                key={goal.id}
                onMouseEnter={() => setActiveGoal(goal.id)}
                onClick={() => setActiveGoal(goal.id)}
                className={`group relative p-12 rounded-[4rem] text-left transition-all duration-500 overflow-hidden ${
                  activeGoal === goal.id ? 'bg-[#152C60] scale-105 shadow-3xl' : 'bg-white border border-[#152C60]/5 shadow-xl'
                }`}
              >
                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center mb-8 transition-colors ${
                  activeGoal === goal.id ? 'bg-[#2B5DB6] text-white' : 'bg-[#F3F6FA] text-[#152C60]'
                }`}>
                  <goal.icon size={32} />
                </div>
                <h3 className={`text-2xl font-serif font-black uppercase tracking-tighter transition-colors ${
                  activeGoal === goal.id ? 'text-white' : 'text-[#152C60]'
                }`}>
                  {goal.title}
                </h3>
                <AnimatePresence>
                  {activeGoal === goal.id && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-white/50 mt-4 font-medium italic leading-relaxed"
                    >
                      {goal.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
                {activeGoal === goal.id && (
                  <Link to="/loja" className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2B5DB6]">
                    Explorar Fórmulas <ArrowRight size={14} />
                  </Link>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      {/* Novidades Section */}
      <section className="py-32 px-6 bg-[#152C60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">Educação & Ciência</span>
                <h2 className="text-5xl md:text-8xl font-serif font-black text-white leading-[0.85] tracking-tighter uppercase">
                  NOVIDADES DO <br/><span className="text-[#2B5DB6]">LABORATÓRIO.</span>
                </h2>
              </div>
              <p className="text-xl text-white/40 font-medium italic border-l-2 border-[#2B5DB6] pl-8 max-w-lg">
                "Acompanhe novidades, lançamentos e conteúdo técnico da nossa equipe."
              </p>
              <Link to="/novedades" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-[#152C60] rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-[#2B5DB6] hover:text-white transition-all shadow-2xl shadow-black/20">
                Ver Novidades <MessageSquare size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Space for Prescribers (Doctors) Section */}
      <section className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden bg-gradient-to-br from-[#152C60] to-[#0E1E45] relative shadow-3xl transform -rotate-3 hover:rotate-0 transition-all duration-700 flex items-center justify-center">
                <img
                  src="/mortero-branco.svg"
                  className="w-1/2 h-1/2 object-contain opacity-90"
                  alt="Botica Guaraní"
                />
                <div className="absolute inset-0 bg-[#152C60]/10 mix-blend-overlay" />
              </div>
              
              {/* Technical Badge */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 bg-[#152C60] p-10 rounded-[3rem] text-white shadow-4xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <Microscope className="text-[#2B5DB6]" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Padrão Ouro</span>
                </div>
                <p className="text-sm font-serif font-black italic max-w-[140px]">
                  "Precisão nanométrica em cada dosagem magistral."
                </p>
              </motion.div>
            </div>

            <div className="space-y-12 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">Área Técnica</span>
                <h2 className="text-5xl md:text-8xl font-serif font-black text-[#152C60] leading-[0.85] tracking-tighter uppercase">
                  ESPAÇO DO <br/><span className="text-[#2B5DB6]">PRESCRITOR.</span>
                </h2>
              </div>
              
              <p className="text-lg text-[#152C60]/60 font-medium leading-relaxed italic border-l-4 border-[#2B5DB6] pl-8">
                Oferecemos suporte técnico especializado para médicos e profissionais de saúde, garantindo que cada fórmula seja uma ferramenta de cura precisa.
              </p>

              <div className="grid gap-6">
                {[
                  { title: "Consultoria Farmacêutica", icon: <Stethoscope size={20} />, desc: "Canal direto com nossos farmacêuticos para ajuste de ativos." },
                  { title: "Guia de Ativos", icon: <Award size={20} />, desc: "Acesso à nossa biblioteca técnica de insumos e sinergias." },
                  { title: "Segurança de Dados", icon: <ShieldCheck size={20} />, desc: "Gestão sigilosa e ética de todas as prescrições enviadas." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-[#F3F6FA]/50 rounded-[2rem] border border-[#152C60]/5">
                    <div className="w-12 h-12 bg-white text-[#2B5DB6] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xs mb-1 text-[#152C60]">{item.title}</h4>
                      <p className="text-[10px] text-[#152C60]/40 font-bold italic leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/receita" className="inline-flex items-center gap-3 px-10 py-5 bg-[#152C60] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2B5DB6] transition-all transform hover:scale-105 shadow-2xl">
                Seja um Parceiro <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">Nossa Filosofia</h3>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-[#152C60] leading-[0.9] tracking-tighter uppercase">
                  MAIS QUE <br/>PILULAS, <br/><span className="text-[#2B5DB6]">PROPÓSITO.</span>
                </h2>
              </div>
              
              <div className="grid gap-8">
                {[
                  { title: "Pureza Guarani", desc: "Aproveitamos o conhecimento ancestral para extrair o melhor da natureza.", icon: <Leaf /> },
                  { title: "Precisão Moderna", desc: "Laboratórios de última geração garantem a dosagem exata para seu corpo.", icon: <ShieldCheck /> },
                  { title: "Bio-Identidade", desc: "Cada tratamento é mapeado conforme seu perfil biológico individual.", icon: <Zap /> },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 p-6 rounded-[2rem] hover:bg-[#F3F6FA] transition-all border border-transparent hover:border-[#152C60]/5"
                  >
                    <div className="w-14 h-14 bg-[#152C60] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm mb-2 text-[#152C60]">{item.title}</h4>
                      <p className="text-xs text-[#152C60]/50 font-medium leading-relaxed italic">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[5rem] overflow-hidden bg-[#F3F6FA] relative flex items-center justify-center">
                <img
                  src="/mortero-azul.svg"
                  className="w-1/3 h-1/3 object-contain opacity-80"
                  alt="Botica Guaraní"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-64 h-64 border-2 border-[#2B5DB6]/20 rounded-full animate-pulse" />
                   <div className="absolute w-48 h-48 border-2 border-[#152C60]/10 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
                </div>
              </div>
              <div className="absolute -top-12 -right-12 p-10 bg-[#2B5DB6] text-white rounded-[3rem] shadow-3xl text-center space-y-2 transform rotate-12 hidden md:block">
                <span className="text-4xl font-serif font-black italic tracking-tighter">25+</span>
                <p className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Capsule Animation Concept */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2B5DB6] rounded-[5rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-4xl group">
             <div className="absolute inset-x-0 top-0 h-1/2 bg-white/5 group-hover:h-0 transition-all duration-700" />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/5 group-hover:h-full transition-all duration-700" />
             
             <div className="relative z-10 space-y-12">
                <Heart className="mx-auto text-white animate-bounce" size={64} />
                <h2 className="text-5xl md:text-8xl font-serif font-black leading-none uppercase tracking-tighter">
                  TRANSFORME SUA <br/>REALIDADE <span className="italic">HOJE.</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  <a
                    href={waLink('Hola! Quisiera hacer una consulta.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-12 py-6 bg-white text-[#2B5DB6] rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-2xl"
                  >
                    Falar por WhatsApp
                  </a>
                  <Link
                    to="/loja"
                    className="px-12 py-6 bg-[#152C60] text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform border border-white/20"
                  >
                    Visitar Loja
                  </Link>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
