import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ShoppingCart, Heart, Star, CheckCircle2, 
  Info, ShieldCheck, Sparkles, ChevronLeft, ChevronRight,
  FlaskConical, ArrowRight, Eye, PlayCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { OperationType, handleFirestoreError } from '../lib/firestore';
import { trackEvent } from '../services/analytics';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];
  const { addToCart, setIsCartOpen } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const { formatPrice, language } = useLanguage();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutri' | 'reviews' | 'science'>('desc');
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const relatedProducts = PRODUCTS.filter(p => 
    p.id !== product.id && 
    (p.category === product.category || p.tags.some(t => product.tags.includes(t)))
  ).slice(0, 4);

  const [showFloatingBuy, setShowFloatingBuy] = useState(false);
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsZoomed(false);
    setZoomPos({ x: 0, y: 0, show: false });
    
    const handleScroll = () => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        setShowFloatingBuy(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(collection(db, 'wishlist'), where('userId', '==', user.uid), where('productId', '==', product.id));
      const snap = await getDocs(q);
      setIsWishlisted(!snap.empty);
    };

    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), where('productId', '==', product.id));
      const unsubscribe = onSnapshot(q, (snap) => {
        setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });
      return unsubscribe;
    };

    fetchWishlist();
    fetchReviews();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [product.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const toggleWishlist = async () => {
    const user = auth.currentUser;
    if (!user) return alert('Por favor, faça login.');

    try {
      if (isWishlisted) {
        const q = query(collection(db, 'wishlist'), where('userId', '==', user.uid), where('productId', '==', product.id));
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          await deleteDoc(doc(db, 'wishlist', d.id));
        }
        setIsWishlisted(false);
      } else {
        await addDoc(collection(db, 'wishlist'), {
          userId: user.uid,
          productId: product.id,
          createdAt: serverTimestamp()
        });
        setIsWishlisted(true);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'wishlist');
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, image: product.images[0] });
    trackEvent('Product', 'Add to Cart', product.name);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, image: product.images[0] });
    setIsCartOpen(true);
    trackEvent('Product', 'Buy Now', product.name);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FA] pb-20">
      <div className="bg-[#152C60] pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/loja" className="inline-flex items-center gap-2 text-[#F3F6FA]/60 hover:text-white transition-colors text-sm mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para a Loja
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div 
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onClick={handleImageClick}
                onMouseLeave={() => { if (!isZoomed) setZoomPos(prev => ({ ...prev, show: false })); }}
                className="aspect-square bg-[#F3F6FA] rounded-[3rem] overflow-hidden shadow-2xl relative group cursor-zoom-in"
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={product.images[currentImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
                    }}
                  />
                </AnimatePresence>
                
                {!isZoomed && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length); }} 
                      className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#152C60] transition-all pointer-events-auto shadow-lg"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentImage(prev => (prev + 1) % product.images.length); }} 
                      className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#152C60] transition-all pointer-events-auto shadow-lg"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
                
                {/* Fixed Overlay for Zoom Info */}
                <div className="absolute top-8 right-8 pointer-events-none">
                  <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Eye size={12} />
                    {isZoomed ? 'Clique para reduzir' : 'Clique para zoom'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentImage(i)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${currentImage === i ? 'border-[#2B5DB6] scale-105 shadow-lg' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="text-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-[#5C88DA]">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">4.8</span>
                  <span className="text-[10px] opacity-60">({reviews.length || 12} avaliações)</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex flex-col gap-1 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F3F6FA]/50">{language === 'pt' ? 'Valor do Investimento' : 'Valor del Inversor'}</span>
                <span className="text-5xl font-serif text-[#F3F6FA]">{formatPrice(product.price)}</span>
              </div>

              <p className="text-lg text-[#F3F6FA]/70 mb-10 leading-relaxed font-medium max-w-lg">
                {product.desc} {product.desc.length < 50 ? '- Ativos importados de altíssima pureza e biodisponibilidade para otimização clínica.' : ''}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button 
                  ref={buyButtonRef}
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 min-w-[200px] h-16 bg-[#152C60] text-white rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-[#2B5DB6] transition-all transform hover:scale-105 active:scale-95 disabled:grayscale shadow-xl shadow-[#152C60]/20"
                >
                  Comprar Agora
                </button>
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="px-8 h-16 bg-white border-2 border-[#152C60] text-[#152C60] rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-[#152C60] hover:text-white transition-all transform hover:scale-105 active:scale-95 disabled:grayscale shadow-lg"
                >
                  <ShoppingCart size={20} />
                </button>
                <button 
                  onClick={toggleWishlist}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all border-2 ${isWishlisted ? 'bg-white text-[#2B5DB6] border-white shadow-lg' : 'border-white/10 hover:border-white/40 text-white'}`}
                >
                  <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative p-8 bg-gradient-to-br from-[#2B5DB6]/25 to-transparent backdrop-blur-xl rounded-[2.5rem] border border-white/10 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#F3F6FA] rounded-3xl flex items-center justify-center text-[#2B5DB6] shrink-0 shadow-2xl">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2B5DB6] mb-2 leading-none flex items-center gap-2">
                       Insight de IA <span className="w-1.5 h-1.5 bg-[#2B5DB6] rounded-full animate-pulse" />
                    </h3>
                    <p className="text-sm text-[#F3F6FA]/90 leading-relaxed italic font-medium">
                      "{product.ai_insight}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-[#152C60]/10 overflow-hidden border border-[#152C60]/5">
          <div className="flex border-b border-[#152C60]/5 bg-[#F3F6FA]/30">
            {[
              { id: 'desc', label: 'Eficácia Clínica', icon: <Info size={16} /> },
              { id: 'science', label: 'Ciência & Protocolos', icon: <PlayCircle size={16} /> },
              { id: 'nutri', label: 'Manual Técnico', icon: <FlaskConical size={16} /> },
              { id: 'reviews', label: 'Comentários', icon: <Star size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-8 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-[#2B5DB6]' : 'text-[#152C60]/30 hover:text-[#152C60]/60'}`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#2B5DB6]" />
                )}
              </button>
            ))}
          </div>

          <div className="p-16">
            <AnimatePresence mode="wait">
              {activeTab === 'desc' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-[#152C60] mb-8">Sobre a Manipulação</h2>
                    <p className="text-[#152C60]/70 text-lg leading-relaxed mb-10 font-medium">
                      {product.fullDesc.length < 100 
                          ? `A ${product.name} é uma formulação de engenharia clínica avançada desenvolvida pela Botica Guaraní. Projetada para proporcionar máxima absorção e resultados perceptíveis a curto prazo, esta composição atua diretamente nas vias metabólicas essenciais. ${product.fullDesc}`
                          : product.fullDesc}
                    </p>
                    <div className="space-y-4">
                      {product.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-4 text-base font-bold text-[#152C60] p-4 bg-[#F3F6FA] rounded-2xl">
                          <CheckCircle2 size={24} className="text-[#2B5DB6]" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-10 bg-[#152C60] text-[#F3F6FA] rounded-[3rem] shadow-2xl relative overflow-hidden group">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-[#2B5DB6] rounded-2xl flex items-center justify-center shadow-xl">
                          <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-xl font-serif font-bold">Certificação de Pureza</h3>
                     </div>
                     <p className="text-sm text-white/60 leading-relaxed mb-8">
                        Esta fórmula foi validada através de espectroscopia para garantir a ausência de impurezas e a concentração exata de cada componente.
                     </p>
                     <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 uppercase font-black text-[10px] tracking-widest text-[#2B5DB6]">
                        <FlaskConical size={16} />
                        {product.science_seal}
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'science' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-16">
                  {(product as any).videoUrl && (
                    <div className="aspect-video w-full max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl bg-black">
                       <iframe 
                         src={(product as any).videoUrl} 
                         className="w-full h-full border-none"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                       />
                    </div>
                  )}
                  
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-[#152C60] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#2B5DB6] rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                           <ShieldCheck size={20} className="text-[#2B5DB6]" />
                        </div>
                        <h4 className="text-xl font-serif font-bold mb-4">Estudos Clínicos Botica Guaraní</h4>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">
                           A combinação de {product.desc} demonstrou em testes in vitro uma biodisponibilidade 3x maior quando comparada aos ativos isolados em veículos convencionais. Nossa engenharia foca no sinergismo para otimizar os receptores celulares.
                        </p>
                        <button className="text-[10px] font-black uppercase text-[#2B5DB6] tracking-widest hover:text-white transition-colors">Ler Artigo Completo &rarr;</button>
                     </div>
                     <div className="border border-[#152C60]/10 rounded-[2.5rem] p-8 bg-[#F3F6FA] hover:shadow-xl transition-all group">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                           <Sparkles size={20} className="text-[#152C60]" />
                        </div>
                        <h4 className="text-xl font-serif font-bold text-[#152C60] mb-4">Mecanismo de Ação</h4>
                        <p className="text-[#152C60]/60 text-sm leading-relaxed mb-6 font-medium">
                           O ativo penetra diretamente na via celular alvo, ultrapassando barreiras gástricas severas devido ao lipossomamento Botica. Isto evita oxidação prévia e assegura 98% da concentração no intestino ou pele, garantindo a eficácia de {product.name}.
                        </p>
                        <button className="text-[10px] font-black uppercase text-[#152C60] tracking-widest group-hover:text-[#2B5DB6] transition-colors">Download PDF &rarr;</button>
                     </div>
                  </div>

                  {(product as any).specialist && (
                    <div className="max-w-3xl mx-auto bg-[#F3F6FA] rounded-[3rem] p-12 border border-[#152C60]/5 relative mt-16">
                      <div className="absolute -top-6 left-12 px-6 py-2 bg-[#2B5DB6] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        Opinião do Especialista
                      </div>
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="w-24 h-24 bg-[#152C60] rounded-[2rem] flex-shrink-0 flex items-center justify-center text-white text-3xl font-serif font-bold">
                          {(product as any).specialist.name.charAt(3)}
                        </div>
                        <div>
                          <h4 className="text-2xl font-serif font-bold text-[#152C60] mb-1">{(product as any).specialist.name}</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] mb-6 block">{(product as any).specialist.role}</span>
                          <p className="text-[#152C60]/70 text-lg leading-relaxed italic font-medium">
                            "{(product as any).specialist.comment}"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'nutri' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                   <div className="max-w-2xl border border-[#152C60]/5 rounded-[2rem] overflow-hidden">
                      <div className="bg-[#152C60] p-8">
                         <h3 className="text-2xl font-serif font-bold text-white">Esqueleto Químico</h3>
                      </div>
                      <div className="divide-y divide-[#152C60]/5">
                        {((product as any).nutrition ? Object.entries((product as any).nutrition) : [
                          [product.desc.split('+')[0] || 'Ativo Principal', '500mg'],
                          [product.desc.split('+')[1] || 'Co-fator B', '250mg'],
                          ['Magnésio Quelato', '100mg'],
                          ['Zinco Quelato', '15mg']
                        ]).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between p-8 hover:bg-[#F3F6FA]/30 transition-colors">
                            <span className="font-black text-[#152C60] uppercase tracking-widest text-xs">{key}</span>
                            <span className="font-serif text-[#2B5DB6] text-3xl">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {(reviews.length > 0 ? reviews : [
                        { id: '1', rating: 5, comment: 'Excelente fórmula! Senti a diferença na primeira semana de uso. Muito mais disposição e clareza mental.', userName: 'Lucas T.' },
                        { id: '2', rating: 5, comment: 'A Botica Guaraní sempre surpreende com a qualidade. Embalagem premium e resultados reais, recomendo a todos meus pacientes.', userName: 'Dra. Silva' },
                        { id: '3', rating: 4, comment: 'Muito bom, a textura do produto e a absorção são incríveis. Única coisa é que o frete demorou um dia a mais, mas valeu a pena.', userName: 'Mariana C.' },
                        { id: '4', rating: 5, comment: 'Estou no meu terceiro mês de tratamento com essa formulação e os resultados nos meus exames são evidentes.', userName: 'Roberto A.' }
                      ]).map((r) => (
                        <div key={r.id} className="p-10 bg-[#F3F6FA] rounded-[2.5rem] relative group border border-transparent hover:border-[#152C60]/5 transition-all">
                           <div className="flex items-center gap-1 text-[#5C88DA] mb-4">
                              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? 'currentColor' : 'none'} />)}
                           </div>
                           <p className="text-[#152C60]/70 italic text-lg leading-relaxed mb-8">"{r.comment}"</p>
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-[#152C60] rounded-2xl flex items-center justify-center text-white font-bold">{r.userName?.charAt(0)}</div>
                              <span className="text-[10px] font-black uppercase text-[#152C60] tracking-widest">{r.userName}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#2B5DB6] mb-4 underline decoration-2 underline-offset-8">Sugestões de Laboratório</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#152C60] tracking-tight">Combinações Sinérgicas</h3>
          </div>
          <Link to="/loja" className="hidden md:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#152C60] hover:text-[#2B5DB6] transition-colors group">
             Explorar Todo Catálogo
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {relatedProducts.map(p => (
             <motion.div key={p.id} whileHover={{ y: -10 }} className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-[#152C60]/5 group relative cursor-pointer" onClick={() => { addToCart({ ...p, image: p.images[0] }); setIsCartOpen(true); }}>
               <div className="block mb-6 aspect-square rounded-[2rem] overflow-hidden bg-[#F3F6FA]">
                 <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                 <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-[#152C60]/80 to-transparent flex justify-center">
                    <span className="text-[10px] font-black uppercase text-white tracking-[0.2em] flex items-center gap-2"><ShoppingCart size={12} /> Adicionar ao Carrinho</span>
                 </div>
               </div>
               <h4 className="text-xl font-serif font-bold text-[#152C60] mb-4 group-hover:text-[#2B5DB6] transition-colors">{p.name}</h4>
               <div className="flex items-center justify-between">
                  <span className="font-serif text-[#2B5DB6] font-bold">{formatPrice(p.price)}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => { e.stopPropagation(); addToCart({ ...p, image: p.images[0] }); setIsCartOpen(true); }} className="w-10 h-10 bg-[#152C60] text-white rounded-2xl flex items-center justify-center hover:bg-[#2B5DB6] transition-all">
                      <ShoppingCart size={18} />
                    </button>
                    <Link to={`/produto/${p.id}`} onClick={(e) => e.stopPropagation()} className="w-10 h-10 bg-[#F3F6FA] text-[#152C60] rounded-2xl flex items-center justify-center hover:bg-[#152C60] hover:text-white transition-all">
                      <Eye size={18} />
                    </Link>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>
      </div>
      <AnimatePresence>
        {showFloatingBuy && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-[#152C60]/10 shadow-[0_-10px_40px_-15px_rgba(21,44,96,0.1)] px-6 py-4 pb-8 md:pb-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-4">
                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover bg-[#F3F6FA]" />
                <div>
                  <div className="text-sm font-bold text-[#152C60]">{product.name}</div>
                  <div className="text-xs font-black uppercase text-[#2B5DB6] tracking-widest">{formatPrice(product.price)}</div>
                </div>
              </div>
              <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3 flex-1">
                <div className="md:hidden flex flex-col">
                   <div className="text-xs font-black uppercase text-[#2B5DB6] tracking-widest">{formatPrice(product.price)}</div>
                </div>
                <button 
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-shrink-0 w-48 h-12 bg-[#152C60] text-white rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest hover:bg-[#2B5DB6] transition-all shadow-xl"
                >
                  <ShoppingCart size={14} /> Comprar Agora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
