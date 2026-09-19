import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Leaf, ShieldCheck, Zap, Heart, Award,
  FileText, Stethoscope, Microscope,
  Brain, Moon, Flame, Wind,
  Baby, Flower2, HeartPulse, UserRound, ChevronLeft, ChevronRight, Sparkles, Truck, Building2, FlaskConical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { waLink } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { FEATURED_PRODUCT_IDS } from '../data/catalogTiers';

export default function Home() {
  const { language, formatPrice } = useLanguage();
  const [activeGoal, setActiveGoal] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = language === 'pt' ? [
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
  ] : [
    { id: 'kit', tag: 'Kit completo y línea magistral', badgeIcon: Award, title: 'LA CIENCIA DE SU BIENESTAR', highlight: 'Fórmulas exclusivas', quote: '"Colección de cápsulas, sobres y cosméticos magistrales pensados para su rutina."', image: '/images/portada-hero.png', floatBadge: 'Kit Botica Guaraní', floatDesc: 'Línea magistral con control farmacéutico.', floatIcon: 'G' },
    { id: 'lab', tag: 'Biotecnología y alta precisión', badgeIcon: FlaskConical, title: 'PRECISIÓN Y BIOTECNOLOGÍA', highlight: 'Laboratorio propio', quote: '"Control riguroso de dosificación y calidad en cada preparación."', image: '/mortero-branco.svg', floatBadge: 'Control farmacéutico', floatDesc: 'Revisión de calidad y trazabilidad por lote.', floatIcon: '🔬' },
    { id: 'fachada', tag: 'Tradición y atención cercana', badgeIcon: Building2, title: 'MÁS DE 25 AÑOS DE HISTORIA', highlight: 'Atención personalizada', quote: '"Tradición magistral y ciencia moderna al servicio de cada persona."', image: '/mortero-branco.svg', floatBadge: 'Botica Guaraní', floatDesc: 'Experiencia y acompañamiento en cada pedido.', floatIcon: '🏛️' },
    { id: 'entrega', tag: 'Logística especializada', badgeIcon: Truck, title: 'ENTREGA EN TODO EL PAÍS', highlight: 'Envío seguro', quote: '"Protección y seguimiento para que su fórmula llegue correctamente."', image: '/mortero-branco.svg', floatBadge: 'Logística Botica', floatDesc: 'Preparación y envío con cuidado.', floatIcon: '📦' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goals = language === 'pt' ? [
    { id: 'focus', title: 'Foco e concentração', icon: Brain, desc: 'Explore fórmulas relacionadas a foco, memória e rotina intelectual.', href: '/loja?objetivo=foco' },
    { id: 'sleep', title: 'Sono e recuperação', icon: Moon, desc: 'Veja opções relacionadas a descanso e recuperação muscular.', href: '/loja?objetivo=sono' },
    { id: 'energy', title: 'Energia e rendimento', icon: Flame, desc: 'Encontre fórmulas para rotinas de energia e treinamento.', href: '/loja?objetivo=rendimento' },
    { id: 'stress', title: 'Pele e autocuidado', icon: Wind, desc: 'Conheça a linha de dermocosméticos e cuidados tópicos.', href: '/loja?objetivo=pele' },
  ] : [
    { id: 'focus', title: 'Foco y concentración', icon: Brain, desc: 'Explora fórmulas relacionadas con foco, memoria y rutina intelectual.', href: '/loja?objetivo=foco' },
    { id: 'sleep', title: 'Sueño y recuperación', icon: Moon, desc: 'Conoce opciones relacionadas con descanso y recuperación muscular.', href: '/loja?objetivo=sueno' },
    { id: 'energy', title: 'Energía y rendimiento', icon: Flame, desc: 'Encuentra fórmulas para rutinas de energía y entrenamiento.', href: '/loja?objetivo=rendimiento' },
    { id: 'stress', title: 'Piel y autocuidado', icon: Wind, desc: 'Conoce la línea de dermocosmética y cuidado tópico.', href: '/loja?objetivo=piel' },
  ];

  const featuredProducts = PRODUCTS.filter((product) => FEATURED_PRODUCT_IDS.includes(product.id as (typeof FEATURED_PRODUCT_IDS)[number]));

  const slide = heroSlides[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <div className="overflow-hidden bg-[#060D18] text-white selection:bg-[#2B5DB6] selection:text-white">
      {/* Hero Section - High Performance & Personalization */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-b from-[#060D18] via-[#0B192C] to-[#08101E]">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#2B5DB6]/20 rounded-full blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#133385]/30 rounded-full blur-[160px] pointer-events-none" />
        
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
                className="inline-flex items-center gap-3 pl-3 pr-1.5 py-1.5 text-[#AAB9D6] text-[10px] font-black uppercase tracking-[0.24em] border-l-2 border-[#38BDF8] mb-8"
              >
                <BadgeIcon size={14} /> {slide.tag}
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-[0.9] mb-8 tracking-tighter">
                {slide.title.split(' ').slice(0, -1).join(' ')} <br/>
                <span className="text-[#38BDF8] font-sans font-extrabold uppercase tracking-wide text-4xl md:text-5xl block mt-2">{slide.highlight}</span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-10 max-w-lg font-spectral italic border-l-4 border-[#2B5DB6] pl-6 leading-relaxed">
                {slide.quote}
              </p>
              
              <div className="flex flex-wrap gap-4 items-center mb-10">
                <Link 
                  to="/loja" 
                  className="px-10 py-5 bg-[#133385] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2B5DB6] transition-all transform hover:scale-105 shadow-2xl shadow-[#133385]/60 flex items-center gap-3 border border-white/20"
                >
                  {language === 'pt' ? 'Ver catálogo' : 'Ver catálogo'} <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/receita" 
                  className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-black text-sm uppercase tracking-widest border border-white/20 hover:bg-white hover:text-[#060D18] transition-all flex items-center gap-3"
                >
                  {language === 'pt' ? 'Enviar receita' : 'Enviar receta'} <Zap size={20} className="text-[#38BDF8]" />
                </Link>
              </div>

              {/* Carousel Navigation Bar */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="flex gap-2">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlide === idx 
                          ? 'w-8 bg-[#38BDF8]' 
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
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
              <div className="relative z-10 aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#133385] to-[#060D18] shadow-2xl shadow-black/90 border border-white/15 flex items-center justify-center group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={slide.image.endsWith('.svg') ? "w-1/2 h-1/2 object-contain opacity-90 transition-transform duration-700 group-hover:scale-110" : "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D18] via-transparent to-transparent opacity-85 pointer-events-none" />
                <div className="absolute bottom-6 left-8 right-8 text-white/80 text-xs font-mono tracking-widest uppercase flex justify-between items-center pointer-events-none">
                  <span>{language === 'pt' ? 'SLIDE' : 'DIAPOSITIVA'} 0{currentSlide + 1} / 04</span>
                  <span className="flex items-center gap-1"><Sparkles size={12} className="text-[#38BDF8]" /> BOTICA GUARANÍ</span>
                </div>
              </div>

              {/* Float Element */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-[#08101E]/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/15 z-20 hidden md:block text-white"
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
      <section className="py-20 px-6 bg-[#08101E] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <Link to="/receita" className="group block relative p-12 md:p-20 bg-gradient-to-r from-[#0B192C] via-[#133385] to-[#08101E] rounded-[4rem] text-white overflow-hidden shadow-2xl border border-white/15 transform hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-[#2B5DB6] rounded-full blur-[130px] opacity-25 group-hover:opacity-45 transition-opacity" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                  <FileText size={14} className="text-[#38BDF8]" /> {language === 'pt' ? 'Serviço expresso' : 'Servicio exprés'}
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight uppercase text-white">
                  {language === 'pt' ? <>Já possui uma <span className="text-[#38BDF8]">receita médica?</span></> : <>¿Ya tiene una <span className="text-[#38BDF8]">receta médica?</span></>}
                </h2>
                <p className="text-lg text-slate-300 font-medium">
                  {language === 'pt' ? 'Envie agora e receba seu orçamento personalizado pelo WhatsApp.' : 'Envíela y reciba su cotización personalizada por WhatsApp.'}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-[#2B5DB6] text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border border-white/20">
                  <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-200">{language === 'pt' ? 'Enviar agora' : 'Enviar ahora'}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Specialty Grid */}
      <section id="especialidades" className="py-24 px-6 bg-[#060D18] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12">
            <div className="w-14 h-1 bg-[#2B5DB6] rounded-full mb-4" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#38BDF8] font-display">Especialidades</span>
            <h2 className="font-serif font-black text-white uppercase tracking-tight mt-3 mb-4 text-4xl leading-none">
              {language === 'pt' ? 'Atendemos todas as áreas da saúde' : 'Atendemos distintas áreas de la salud'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'pt' ? 'Preparamos fórmulas magistrais personalizadas conforme a indicação do seu profissional de saúde.' : 'Preparamos fórmulas magistrales personalizadas según la indicación de su profesional de salud.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {(language === 'pt' ? [
              { Icon: Stethoscope, title: 'Dermatologia', desc: 'Cremes, géis e preparações magistrais para a pele.' },
              { Icon: Baby, title: 'Pediatria', desc: 'Suspensões, gotas e xaropes na dose indicada.' },
              { Icon: Flower2, title: 'Ginecologia', desc: 'Óvulos, géis e preparações íntimas magistrais.' },
              { Icon: HeartPulse, title: 'Cardiologia', desc: 'Fórmulas na dose indicada pelo profissional de saúde.' },
              { Icon: UserRound, title: 'Geriatria', desc: 'Preparações para tratamentos acompanhados.' },
            ] : [
              { Icon: Stethoscope, title: 'Dermatología', desc: 'Cremas, geles y preparaciones magistrales para la piel.' },
              { Icon: Baby, title: 'Pediatría', desc: 'Suspensiones, gotas y jarabes según la indicación.' },
              { Icon: Flower2, title: 'Ginecología', desc: 'Óvulos, geles y preparaciones íntimas magistrales.' },
              { Icon: HeartPulse, title: 'Cardiología', desc: 'Fórmulas según la indicación del profesional de salud.' },
              { Icon: UserRound, title: 'Geriatría', desc: 'Preparaciones para tratamientos acompañados.' },
            ]).map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#0B192C]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2B5DB6]/50 hover:bg-[#0B192C]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2B5DB6]/20 text-[#38BDF8] flex items-center justify-center mb-4 border border-[#2B5DB6]/30">
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-white text-base mb-2 leading-snug">{title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Strip */}
      <section id="como-trabajamos" className="py-24 px-6 bg-[#08101E] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12">
            <div className="w-14 h-1 bg-[#2B5DB6] rounded-full mb-4" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#38BDF8] font-display">{language === 'pt' ? 'Como trabalhamos' : 'Cómo trabajamos'}</span>
            <h2 className="font-serif font-black text-white uppercase tracking-tight mt-3 text-4xl leading-none">
              {language === 'pt' ? 'Da receita à entrega em quatro passos' : 'De la receta a la entrega en cuatro pasos'}
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 list-none p-0">
            {(language === 'pt' ? [
              { n: "01", h: "Sua Receita",   p: "Envie sua receita médica diretamente pelo nosso WhatsApp." },
              { n: "02", h: "Orçamento",    p: "Enviamos a cotação detalhada e prazo de preparação em minutos." },
              { n: "03", h: "Manipulação",  p: "Formulamos seu pedido em nosso laboratório certificado." },
              { n: "04", h: "Entrega",      p: "Avisamos quando estiver pronto para retirada ou envio expresso." },
            ] : [
              { n: '01', h: 'Su receta', p: 'Envíe su receta médica directamente por WhatsApp.' },
              { n: '02', h: 'Cotización', p: 'Enviamos el detalle y el plazo de preparación.' },
              { n: '03', h: 'Preparación', p: 'Preparamos su pedido en nuestro laboratorio.' },
              { n: '04', h: 'Entrega', p: 'Avisamos cuando esté listo para retirar o enviar.' },
            ]).map(({ n, h, p }) => (
              <li key={n} className="bg-[#0B192C]/60 border border-white/10 rounded-2xl p-6 border-t-4 border-t-[#2B5DB6]">
                <div className="font-serif font-black text-3xl text-[#38BDF8] mb-3">{n}</div>
                <h4 className="font-bold text-white text-lg mb-2">{h}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured lines and products */}
      <section className="py-24 px-6 bg-[#060D18] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#38BDF8]">{language === 'pt' ? 'Seleção Botica Guaraní' : 'Selección Botica Guaraní'}</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tighter">
                {language === 'pt' ? <>Fórmulas em <br/><span className="text-[#38BDF8]">destaque.</span></> : <>Fórmulas <br/><span className="text-[#38BDF8]">destacadas.</span></>}
              </h2>
            </div>
            <Link to="/loja" className="px-10 py-5 bg-[#133385] text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#2B5DB6] transition-all shadow-xl shadow-black/40">
              {language === 'pt' ? 'Ver todas as fórmulas' : 'Ver todas las fórmulas'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] rounded-[2.25rem] overflow-hidden bg-[#F7F2E6] border border-white/15 shadow-2xl flex flex-col"
              >
                <div className="h-[64%] w-full flex items-center justify-center overflow-hidden bg-[#F7F2E6]">
                  <img src={product.images[0]} className="w-full h-full object-contain p-8 mix-blend-multiply group-hover:scale-105 transition-all duration-700" alt={product.name} />
                </div>
                <div className="flex-1 bg-[#0B192C] px-8 py-7 space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#38BDF8]">{product.category}</p>
                   <h3 className="text-2xl font-serif font-black text-white uppercase tracking-tighter">{product.name}</h3>
                   <p className="text-sm text-slate-200">{formatPrice(product.price)}</p>
                </div>
                <Link to={`/produto/${product.id}`} aria-label={`${language === 'pt' ? 'Ver fórmula' : 'Ver fórmula'}: ${product.name}`} className="absolute inset-0 z-10" />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {(language === 'pt' ? [
              { title: 'Saúde e vida', href: '/loja?objetivo=saude' },
              { title: 'Rendimento', href: '/loja?objetivo=rendimento' },
              { title: 'Dermocosmética', href: '/loja?objetivo=pele' },
            ] : [
              { title: 'Salud y vida', href: '/loja?objetivo=salud' },
              { title: 'Rendimiento', href: '/loja?objetivo=rendimiento' },
              { title: 'Dermocosmética', href: '/loja?objetivo=piel' },
            ]).map((line) => (
              <Link key={line.title} to={line.href} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B192C]/70 px-6 py-5 text-white hover:border-[#38BDF8]/50 transition-colors">
                <span className="font-black uppercase tracking-widest text-sm">{line.title}</span>
                <ArrowRight size={18} className="text-[#38BDF8]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guided discovery */}
      <section className="py-24 px-6 bg-[#08101E] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#38BDF8]">{language === 'pt' ? 'O que você busca hoje?' : '¿Qué buscas hoy?'}</span>
             <h2 className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tighter">{language === 'pt' ? <>Encontre seu <span className="text-[#38BDF8]">objetivo.</span></> : <>Encuentra tu <span className="text-[#38BDF8]">objetivo.</span></>}</h2>
             <p className="mx-auto max-w-2xl text-sm text-slate-300">{language === 'pt' ? 'Escolha uma direção para explorar a loja. Isso não substitui orientação médica ou farmacêutica.' : 'Elige una dirección para explorar la tienda. Esto no sustituye la orientación médica o farmacéutica.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                onMouseEnter={() => setActiveGoal(goal.id)}
                className={`group relative p-8 rounded-[2rem] text-left transition-all duration-500 overflow-hidden ${
                  activeGoal === goal.id 
                    ? 'bg-gradient-to-br from-[#133385] to-[#0B192C] border border-[#38BDF8]/50 shadow-2xl scale-105' 
                    : 'bg-[#0B192C]/80 border border-white/10 hover:border-white/20'
                }`}
              >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                  activeGoal === goal.id ? 'bg-[#2B5DB6] text-white' : 'bg-white/10 text-[#38BDF8]'
                }`}>
                  <goal.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif font-black text-white uppercase tracking-tighter">
                  {goal.title}
                </h3>
                <AnimatePresence>
                  {activeGoal === goal.id && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-slate-300 mt-4 font-medium italic leading-relaxed"
                    >
                      {goal.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Link to={goal.href} className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#38BDF8]">
                  Explorar fórmulas <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Space for Prescribers (Doctors) Section */}
      <section className="py-24 px-6 bg-[#08101E] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-[#0B192C] to-[#060D18] border border-white/15 relative shadow-2xl flex items-center justify-center">
                <img
                  src="/mortero-branco.svg"
                  className="w-1/2 h-1/2 object-contain opacity-90"
                  alt="Botica Guaraní"
                />
              </div>
              
              {/* Technical Badge */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 bg-[#0B192C] p-8 rounded-[2.5rem] text-white shadow-2xl border border-white/15 space-y-3 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <Microscope className="text-[#38BDF8]" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{language === 'pt' ? 'Padrão ouro' : 'Estándar de calidad'}</span>
                </div>
                <p className="text-xs font-serif font-black italic max-w-[150px] text-slate-200">
                  {language === 'pt' ? 'Precisão em cada preparação magistral.' : 'Precisión en cada preparación magistral.'}
                </p>
              </motion.div>
            </div>

            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#38BDF8]">{language === 'pt' ? 'Área técnica' : 'Área técnica'}</span>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-[0.9] tracking-tighter uppercase">
                  {language === 'pt' ? <>ESPAÇO DO <br/><span className="text-[#38BDF8]">PRESCRITOR.</span></> : <>ESPACIO DEL <br/><span className="text-[#38BDF8]">PRESCRIPTOR.</span></>}
                </h2>
              </div>
              
              <p className="text-lg text-slate-300 font-medium leading-relaxed italic border-l-4 border-[#2B5DB6] pl-8">
                {language === 'pt' ? 'Oferecemos suporte técnico para profissionais de saúde e prescritores.' : 'Ofrecemos soporte técnico para profesionales de la salud y prescriptores.'}
              </p>

              <div className="grid gap-4">
                {(language === 'pt' ? [
                  { title: "Consultoria Farmacêutica", icon: <Stethoscope size={20} />, desc: "Canal direto com nossos farmacêuticos para ajuste de ativos." },
                  { title: "Guia de Ativos", icon: <Award size={20} />, desc: "Acesso à nossa biblioteca técnica de insumos e sinergias." },
                  { title: "Segurança de Dados", icon: <ShieldCheck size={20} />, desc: "Gestão sigilosa e ética de todas as prescrições enviadas." },
                ] : [
                  { title: 'Consultoría farmacéutica', icon: <Stethoscope size={20} />, desc: 'Canal directo con nuestros farmacéuticos para dudas sobre la preparación.' },
                  { title: 'Guía de activos', icon: <Award size={20} />, desc: 'Información técnica para apoyar la conversación con su profesional de salud.' },
                  { title: 'Seguridad de datos', icon: <ShieldCheck size={20} />, desc: 'Tratamiento confidencial y responsable de las recetas enviadas.' },
                ]).map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-[#0B192C]/80 rounded-[2rem] border border-white/10">
                    <div className="w-12 h-12 bg-[#2B5DB6]/20 text-[#38BDF8] rounded-2xl flex items-center justify-center shrink-0 border border-[#2B5DB6]/30">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xs mb-1 text-white">{item.title}</h4>
                      <p className="text-xs text-slate-300 font-medium italic leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/receita" className="inline-flex items-center gap-3 px-10 py-5 bg-[#133385] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2B5DB6] transition-all border border-white/20 shadow-xl">
                {language === 'pt' ? 'Fale com a Botica' : 'Hable con Botica'} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-[#060D18] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#38BDF8]">{language === 'pt' ? 'Nossa filosofia' : 'Nuestra filosofía'}</h3>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-[0.9] tracking-tighter uppercase">
                  {language === 'pt' ? <>MAIS QUE <br/>PÍLULAS, <br/><span className="text-[#38BDF8]">PROPÓSITO.</span></> : <>MÁS QUE <br/>PÍLDORAS, <br/><span className="text-[#38BDF8]">PROPÓSITO.</span></>}
                </h2>
              </div>
              
              <div className="grid gap-6">
                {(language === 'pt' ? [
                  { title: "Pureza Guaraní", desc: "Aproveitamos o conhecimento ancestral para extrair o melhor da natureza.", icon: <Leaf /> },
                  { title: "Precisão Moderna", desc: "Laboratórios de última geração garantem a dosagem exata para seu corpo.", icon: <ShieldCheck /> },
                  { title: "Bio-Identidade", desc: "Cada tratamento é mapeado conforme seu perfil biológico individual.", icon: <Zap /> },
                ] : [
                  { title: 'Pureza guaraní', desc: 'Valoramos el conocimiento tradicional con responsabilidad y respeto.' , icon: <Leaf /> },
                  { title: 'Precisión moderna', desc: 'Procesos cuidadosos acompañan la calidad de cada preparación.', icon: <ShieldCheck /> },
                  { title: 'Cuidado individual', desc: 'Cada persona merece una orientación adecuada a su rutina y necesidad.', icon: <Zap /> },
                ]).map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 8 }}
                    className="flex gap-6 p-6 rounded-[2rem] bg-[#0B192C]/60 border border-white/10 transition-all hover:border-[#2B5DB6]/50"
                  >
                    <div className="w-14 h-14 bg-[#2B5DB6]/20 text-[#38BDF8] rounded-2xl flex items-center justify-center shrink-0 border border-[#2B5DB6]/30">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm mb-1 text-white">{item.title}</h4>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed italic">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden bg-[#0B192C] border border-white/15 relative flex items-center justify-center shadow-2xl">
                <img
                  src="/mortero-branco.svg"
                  className="w-1/3 h-1/3 object-contain opacity-90"
                  alt="Botica Guaraní"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="w-64 h-64 border-2 border-[#38BDF8]/20 rounded-full animate-pulse" />
                   <div className="absolute w-48 h-48 border-2 border-[#2B5DB6]/20 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
                </div>
              </div>
              <div className="absolute -top-8 -right-8 p-8 bg-[#2B5DB6] text-white rounded-[2.5rem] shadow-2xl text-center space-y-1 transform rotate-6 hidden md:block border border-white/20">
                <span className="text-4xl font-serif font-black italic tracking-tighter">25+</span>
                <p className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#08101E] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#133385] via-[#0B192C] to-[#08101E] rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl border border-white/20 group">
             <div className="relative z-10 space-y-10">
                <Heart className="mx-auto text-[#38BDF8] animate-bounce" size={56} />
                <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase tracking-tighter text-white">
                  {language === 'pt' ? <>TRANSFORME SUA <br/>SAÚDE <span className="italic text-[#38BDF8]">HOJE.</span></> : <>TRANSFORME SU <br/>SALUD <span className="italic text-[#38BDF8]">HOY.</span></>}
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  <a
                    href={waLink('Hola! Quisiera hacer una consulta.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-12 py-6 bg-[#38BDF8] text-[#060D18] rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-2xl font-sans"
                  >
                    Falar por WhatsApp
                  </a>
                  <Link
                    to="/loja"
                    className="px-12 py-6 bg-[#133385] text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform border border-white/20"
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
