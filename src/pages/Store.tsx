import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ShoppingCart, Filter, Tag, Info, Bell, X, 
  CheckCircle2, Heart, Eye, Star, ArrowRight, 
  ChevronLeft, ChevronRight, FlaskConical, Scale, FileText,
  Pill, Wind, Droplet, Flower, Activity, Dumbbell, Sparkles, Microscope
} from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PrescriptionUpload from '../components/PrescriptionUpload';
import ComparisonDrawer from '../components/ComparisonDrawer';
import ImageLightbox from '../components/ImageLightbox';
import { trackEvent } from '../services/analytics';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore';
import { PRODUCTS } from '../data/products';

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Todas');
  const [selectedTags, setSelectedSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const { addToCart, setIsCartOpen } = useCart();
  const [flyingItems, setFlyingItems] = useState<{ id: number; x: number; y: number; type: 'cart' | 'wish' }[]>([]);
  const [notifyProduct, setNotifyProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [productStates, setProductStates] = useState<Record<number, { currentImage: number }>>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, { currentImage: 0 }]))
  );
  const [quickViewProduct, setQuickViewProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [comparisonList, setComparisonList] = useState<number[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [subscribedProducts, setSubscribedProducts] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [lightboxData, setLightboxData] = useState<{ isOpen: boolean; images: string[]; initialIndex: number }>({
    isOpen: false,
    images: [],
    initialIndex: 0
  });

  useEffect(() => {
    setSelectedSubCategory('Todas');
  }, [selectedCategory]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(collection(db, 'wishlist'), where('userId', '==', user.uid));
      const snap = await getDocs(q);
      setWishlist(snap.docs.map(doc => doc.data().productId));
    };
    fetchWishlist();
  }, [auth.currentUser]);

  const toggleWishlist = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert('Por favor, faça login para salvar produtos na sua lista de desejos.');

    const rect = e.currentTarget.getBoundingClientRect();
    const newItem = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      type: 'wish' as const
    };

    try {
      if (wishlist.includes(productId)) {
        const q = query(collection(db, 'wishlist'), where('userId', '==', user.uid), where('productId', '==', productId));
        const snap = await getDocs(q);
        snap.forEach(async (d) => await deleteDoc(doc(db, 'wishlist', d.id)));
        setWishlist(prev => prev.filter(id => id !== productId));
        trackEvent('Store', 'Remove from Wishlist', productId.toString());
      } else {
        setFlyingItems(prev => [...prev, newItem]);
        setTimeout(() => setFlyingItems(prev => prev.filter(i => i.id !== newItem.id)), 800);
        
        await addDoc(collection(db, 'wishlist'), {
          userId: user.uid,
          productId,
          createdAt: serverTimestamp()
        });
        setWishlist(prev => [...prev, productId]);
        trackEvent('Store', 'Add to Wishlist', productId.toString());
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'wishlist');
    }
  };

  const handleAddToCart = (e: React.MouseEvent, p: typeof PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const newItem = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      type: 'cart' as const
    };
    setFlyingItems(prev => [...prev, newItem]);
    
    addToCart({ ...p, image: p.images[0] });

    setTimeout(() => {
      setFlyingItems(prev => prev.filter(item => item.id !== newItem.id));
    }, 800);
  };

  const handleBuyNow = (e: React.MouseEvent, p: typeof PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...p, image: p.images[0] });
    setIsCartOpen(true);
  };

  const handleNotifySub = (e: React.FormEvent, productId: number) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setSubscribedProducts(prev => [...prev, productId]);
    setNotifyEmail('');
    setNotifyProduct(null);
    alert('Pronto! Avisaremos você assim que esta fórmula estiver disponível.');
  };

  const toggleComparison = (productId: number) => {
    setComparisonList(prev => {
      if (prev.includes(productId)) return prev.filter(id => id !== productId);
      if (prev.length >= 3) {
        alert('Você pode comparar no máximo 3 fórmulas simultaneamente.');
        return prev;
      }
      return [...prev, productId];
    });
    setIsComparisonOpen(true);
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const priceNum = parseInt(p.price.replace(/[^\d]/g, ''));
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'Todas' || (p as any).subCategory === selectedSubCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(t => p.tags.includes(t));
    const matchesRating = minRating === 0 || (p as any).rating >= minRating;
    const matchesPrice = priceNum <= maxPrice;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesTags && matchesSearch && matchesRating && matchesPrice;
  }).sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
    const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'rating') return ((b as any).rating || 4.5) - ((a as any).rating || 4.5);
    return 0;
  });

  const ALL_TAGS = Array.from(new Set(PRODUCTS.flatMap(p => p.tags)));

  return (
    <div className="min-h-screen bg-[#F3F6FA] pb-32">
      {/* Header - More Abstract & Premium */}
      <div className="bg-[#152C60] pt-48 pb-40 px-6 rounded-b-[8rem] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
              <div className="w-2 h-2 bg-[#2B5DB6] rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Bio-Tech Laboratory</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-serif font-black text-white tracking-tighter uppercase leading-[0.8]">
              SUA <span className="text-[#2B5DB6]">FÓRMULA</span> <br/>DE ELITE.
            </h1>
            
            <div className="flex gap-4">
               <Link to="/receita" className="px-10 py-4 bg-[#2B5DB6] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl shadow-[#2B5DB6]/30 transition-all">
                 <FileText size={16} /> Enviar Receita Médica
               </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="space-y-16">
          {/* ULTRA CLEAN FILTER SYSTEM */}
          <div className="flex flex-col gap-6 w-full bg-white rounded-[2rem] p-4 md:p-8 shadow-xl border border-[#152C60]/5">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* Search Bar */}
              <div className="flex-1 relative group bg-[#F3F6FA] rounded-xl border border-transparent focus-within:border-[#2B5DB6]/30 transition-all">
                <input 
                  type="text" 
                  placeholder="Busque por ativo ou objetivo..."
                  className="w-full h-14 pl-14 pr-6 bg-transparent outline-none font-medium mb-0 text-sm text-[#152C60] placeholder:text-[#152C60]/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#152C60]/40 group-focus-within:text-[#2B5DB6] transition-colors" size={20} />
              </div>

              {/* Sort Dropdown */}
              <div className="w-full md:w-64 relative group bg-[#F3F6FA] rounded-xl border border-transparent focus-within:border-[#2B5DB6]/30 transition-all">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full h-14 pl-6 pr-12 bg-transparent text-[#152C60] appearance-none font-bold text-[11px] uppercase tracking-widest cursor-pointer outline-none"
                >
                  <option value="default">ORDENAR: RELEVÂNCIA</option>
                  <option value="price-asc">MENOR PREÇO</option>
                  <option value="price-desc">MAIOR PREÇO</option>
                  <option value="rating">POPULARIDADE</option>
                </select>
                <ChevronRight size={14} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#152C60]/40 pointer-events-none group-focus-within:text-[#2B5DB6]" />
              </div>
            </div>

            {/* Categories */}
            <div className="w-full pt-4 border-t border-[#152C60]/5 mb-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#152C60]/40 mb-6">Filtrar por Categoria</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  { name: 'Todas', desc: 'Catálogo Geral', icon: <Microscope size={28} />, image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Salud', desc: 'Foco & Longevidade', icon: <Pill size={28} />, image: 'https://images.unsplash.com/photo-1542868727-4a0058e59005?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Beleza', desc: 'Modulação Estética', icon: <Sparkles size={28} />, image: 'https://images.unsplash.com/photo-1498842812179-c81beecf902c?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Adelgazamiento', desc: 'Metabolismo Ativo', icon: <Scale size={28} />, image: 'https://images.unsplash.com/photo-1610404402633-8aebbfb6b0fc?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Rendimiento Fisico', desc: 'Força & Energia', icon: <Dumbbell size={28} />, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Dermocosmeticos', desc: 'Saúde da Pele', icon: <Droplet size={28} />, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Linea Home', desc: 'Aromas & Ambientes', icon: <Wind size={28} />, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Mujer', desc: 'Fórmulas Femininas', icon: <Flower size={28} />, image: 'https://images.unsplash.com/photo-1512413913041-e23f0bfcc036?auto=format&fit=crop&q=80&w=400' },
                  { name: 'Hombre', desc: 'Fórmulas Masculinas', icon: <Activity size={28} />, image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=400' }
                ].map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`relative p-5 rounded-3xl overflow-hidden transition-all text-left flex flex-col justify-between min-h-[140px] group border ${
                      selectedCategory === cat.name 
                        ? 'border-[#2B5DB6] shadow-xl shadow-[#152C60]/10 ring-4 ring-[#2B5DB6]/10' 
                        : 'border-[#152C60]/5 hover:border-[#152C60]/20'
                    }`}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-20 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                      <div className={`absolute inset-0 transition-opacity duration-500 ${
                         selectedCategory === cat.name 
                           ? 'bg-gradient-to-t from-[#152C60] to-[#152C60]/80 mix-blend-multiply' 
                           : 'bg-gradient-to-t from-white via-white/90 to-white/40'
                      }`} />
                    </div>

                    <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-sm ${
                       selectedCategory === cat.name ? 'bg-white/10 text-[#5C88DA] backdrop-blur-md' : 'bg-white/80 text-[#2B5DB6] group-hover:bg-white backdrop-blur-sm'
                    }`}>
                      {cat.icon}
                    </div>
                    <div className="relative z-10">
                      <p className={`text-[9px] uppercase font-black tracking-widest mb-1 ${selectedCategory === cat.name ? 'text-white/60' : 'text-[#152C60]/40'}`}>
                        {cat.desc}
                      </p>
                      <p className={`font-serif font-bold leading-tight ${selectedCategory === cat.name ? 'text-white' : 'text-[#152C60]'}`}>{cat.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatePresence>
              {/* Prescription Integration Card */}
              <motion.div 
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative flex flex-col h-[600px]"
              >
                <div className="h-full flex flex-col rounded-br-[8rem] rounded-tl-[4rem] rounded-tr-sm rounded-bl-sm overflow-hidden border-2 border-dashed border-[#2B5DB6]/30 bg-[#F8FAFC] p-8 text-center justify-center space-y-8 hover:bg-[#F1F5F9] transition-colors shadow-xl relative mt-4">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white border-l-2 border-b-2 border-dashed border-[#2B5DB6]/30 rounded-bl-[4rem]" />
                  <div className="w-24 h-24 bg-[#2B5DB6] rounded-t-2xl rounded-bl-2xl rounded-br-[2rem] mx-auto flex items-center justify-center text-white shadow-2xl relative z-10">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-bl-xl" />
                    <FileText size={40} />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-3xl font-serif font-black text-[#152C60] uppercase leading-tight tracking-tighter">
                      Manipule sua <br/><span className="text-[#2B5DB6]">Receita</span>
                    </h3>
                    <p className="text-xs text-[#152C60]/60 font-medium">
                      Tem uma receita? Envie agora para um orçamento magistral.
                    </p>
                  </div>
                  <Link 
                    to="/receita" 
                    className="w-full py-4 bg-[#152C60] text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#2B5DB6] transition-all shadow-lg"
                  >
                    Enviar Receita
                  </Link>
                </div>
              </motion.div>

              {filteredProducts.map((p) => {
                const isCosmetic = ['Dermocosmeticos', 'Beleza', 'Mujer'].includes(p.category);
                const isHome = p.category === 'Linea Home';
                const isTub = ['Adelgazamiento', 'Rendimiento Fisico', 'Hombre'].includes(p.category);
                const isCapsule = !isCosmetic && !isHome && !isTub;

                // Cosmetics: Flat top (tube crimp), rounded bottom (cap)
                // Home: Round top, flat bottom (spray bottle)
                // Tub: Cylinder-like jar
                // Capsule: completely pill shaped
                const cardRadius = isCosmetic ? 'rounded-t-xl rounded-b-[3rem]' :
                                   isHome ? 'rounded-t-[4rem] rounded-b-xl' :
                                   isTub ? 'rounded-[2.5rem]' :
                                   'rounded-t-[12rem] rounded-b-[12rem]';

                const topBg = isCosmetic ? 'bg-[#E3A8A1]' :
                              isHome ? 'bg-[#8E9B8E]' :
                              isTub ? 'bg-[#152C60]' :
                              'bg-[#152C60]';

                const bottomBg = isCosmetic ? 'bg-[#FEF6F5] group-hover:bg-[#FAEDED]' :
                                 isHome ? 'bg-[#F7F9F7] group-hover:bg-[#EDF2ED]' :
                                 isTub ? 'bg-[#F3F6FA] group-hover:bg-[#E2E8F0]' :
                                 'bg-white group-hover:bg-[#F3F6FA]/30';

                return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={p.id} 
                  className={`group relative flex flex-col h-[600px] overflow-hidden border border-[#152C60]/5 shadow-2xl shadow-[#152C60]/5 hover:shadow-3xl transition-all duration-500 group-hover:border-[#2B5DB6]/20 bg-white ${cardRadius}`}
                >
                  {/* Dynamic Background Layout */}
                  <div className={`absolute inset-0 transition-colors z-0 ${bottomBg}`} />
                  <div className={`absolute top-0 left-0 w-full transition-all duration-500 z-0 ${topBg} ${isCapsule ? 'h-[50%]' : 'h-[76%]'}`} />
                  <div className={`absolute top-0 left-0 w-full bg-gradient-to-t from-black/10 to-transparent z-0 pointer-events-none ${isCapsule ? 'h-[50%]' : 'h-[76%]'}`} />

                  {/* Content Wrapper */}
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* TOP HALF: IMAGE + GALLERY */}
                    <div className="relative w-full h-[50%] flex-shrink-0 flex items-center justify-center p-4 group/img">
                      <div className={`relative w-full h-full overflow-hidden bg-[#F3F6FA] shadow-inner ${
                        isCosmetic ? 'rounded-t-md rounded-b-[2rem]' :
                        isHome ? 'rounded-t-[3.5rem] rounded-b-lg' :
                        isTub ? 'rounded-2xl' :
                        'rounded-t-[10rem] rounded-b-[4rem]' 
                      }`}>
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={productStates[p.id]?.currentImage}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            src={p.images[productStates[p.id]?.currentImage || 0]} 
                            alt={p.name} 
                            className="w-full h-full object-cover mix-blend-multiply brightness-95 group-hover/img:scale-110 transition-transform duration-1000"
                            loading="lazy"
                          />
                        </AnimatePresence>
                      </div>

                      {/* Gallery Controls */}
                      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setProductStates(prev => ({ ...prev, [p.id]: { currentImage: (prev[p.id].currentImage - 1 + p.images.length) % p.images.length } })); }}
                          className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#2B5DB6] transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setProductStates(prev => ({ ...prev, [p.id]: { currentImage: (prev[p.id].currentImage + 1) % p.images.length } })); }}
                          className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#2B5DB6] transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* Floating Actions */}
                      <div className="absolute top-8 right-8 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setQuickViewProduct(p); }}
                          className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#152C60] shadow-lg hover:bg-[#2B5DB6] hover:text-white transition-all transform hover:rotate-6"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={(e) => toggleWishlist(e, p.id)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all transform hover:-rotate-6 ${
                            wishlist.includes(p.id) ? 'bg-[#2B5DB6] text-white' : 'bg-white text-[#152C60]'
                          }`}
                        >
                          <Heart size={18} fill={wishlist.includes(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    {/* BOTTOM HALF: INFO */}
                    <div className="flex-1 flex flex-col items-center justify-between px-8 py-8 text-center relative mt-4">
                      
                      {/* Rating Label exactly on the boundary */}
                      <div className={`absolute left-1/2 -translate-x-1/2 -top-6 px-4 py-1.5 rounded-full border flex items-center gap-1 shadow-sm z-30 transition-colors ${
                        isCapsule ? 'bg-[#F3F6FA] border-[#152C60]/5 text-[#152C60]' : 'bg-white/90 backdrop-blur-md border-white/20 text-[#152C60]'
                      }`}>
                        <Star size={10} className="text-[#5C88DA]" fill="currentColor" />
                        <span className="text-[10px] font-black">{(p as any).rating || 4.5}</span>
                      </div>

                      <div className={`space-y-4 ${isCapsule ? 'mt-4' : 'mt-2'}`}>
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${
                            (!isCapsule && (isTub || isHome)) ? 'text-white/60' : 'text-[#2B5DB6]'
                          }`}>
                            {p.category}
                          </span>
                          <Link to={`/produto/${p.id}`}>
                            <h4 className={`text-2xl font-serif font-black leading-tight uppercase tracking-tighter transition-colors line-clamp-2 ${
                              (!isCapsule && (isTub || isHome)) ? 'text-white group-hover:text-white/80' : 'text-[#152C60] group-hover:text-[#2B5DB6]'
                            }`}>
                              {p.name}
                            </h4>
                          </Link>
                        </div>
                      </div>
                      
                      <div className={`flex flex-col items-center gap-1 pt-6 border-t w-full mt-auto mb-4 border-[#152C60]/10`}>
                         <span className={`text-[9px] font-black uppercase tracking-widest text-[#152C60]/30`}>
                           Valor do Investimento
                         </span>
                         <span className={`text-4xl font-serif font-black tracking-tighter text-[#152C60]`}>
                           {p.price}
                         </span>
                      </div>

                      {/* Hover Actions Bar */}
                      <div className="grid grid-cols-2 gap-3 w-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 absolute bottom-6 left-0 px-8 z-30">
                        <button 
                          onClick={(e) => handleAddToCart(e, p)}
                          className="h-12 bg-[#152C60] text-white rounded-2xl flex items-center justify-center hover:bg-[#2B5DB6] transition-all font-black text-[9px] uppercase tracking-widest shadow-xl shadow-[#152C60]/10"
                        >
                          Adicionar
                        </button>
                        <button 
                          onClick={(e) => handleBuyNow(e, p)}
                          className={`h-12 rounded-2xl flex items-center justify-center transition-all font-black text-[9px] uppercase tracking-widest ${
                            (!isCapsule && (isTub || isHome)) ? 'bg-white/10 text-white hover:bg-white hover:text-[#152C60]' : 'bg-[#F3F6FA] text-[#152C60] hover:bg-[#152C60] hover:text-white border border-[#152C60]/10'
                          }`}
                        >
                          Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )})}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {flyingItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ x: item.x - 20, y: item.y - 20, scale: 1, opacity: 1 }}
            animate={{ 
              x: item.type === 'cart' ? window.innerWidth - 60 : window.innerWidth - 60, 
              y: item.type === 'cart' ? window.innerHeight - 60 : window.innerHeight - 150, 
              scale: 0.2, 
              opacity: 0,
              rotate: 360
            }}
            transition={{ duration: 0.8, ease: "circIn" }}
            className={`fixed top-0 left-0 w-12 h-12 ${item.type === 'cart' ? 'bg-[#152C60]' : 'bg-[#2B5DB6]'} rounded-full flex items-center justify-center text-white shadow-2xl z-[500]`}
          >
            {item.type === 'cart' ? <ShoppingCart size={20} /> : <Heart size={20} fill="currentColor" />}
          </motion.div>
        ))}
      </AnimatePresence>

      <QuickInfoModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={(p) => addToCart({ ...p, image: p.images[0] })} />
      <ImageLightbox {...lightboxData} onClose={() => setLightboxData(prev => ({ ...prev, isOpen: false }))} />

      {comparisonList.length > 0 && (
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          onClick={() => setIsComparisonOpen(true)}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#2B5DB6] text-white px-10 py-5 rounded-full shadow-2xl z-[150] flex items-center gap-4 font-black uppercase text-[10px] border-4 border-white hover:scale-105 transition-all"
        >
          <Scale size={20} />
          Comparar ({comparisonList.length})
        </motion.button>
      )}

      <ComparisonDrawer 
        products={PRODUCTS.filter(p => comparisonList.includes(p.id))} 
        onRemove={(id) => setComparisonList(prev => prev.filter(pId => pId !== id))}
        onClose={() => setIsComparisonOpen(false)}
        isOpen={isComparisonOpen}
      />
    </div>
  );
}

function QuickInfoModal({ product, onClose, onAddToCart }: any) {
  if (!product) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#152C60]/60 backdrop-blur-xl" />
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="relative bg-white rounded-[4rem] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <button onClick={onClose} className="absolute top-8 right-8 w-12 h-12 bg-[#F3F6FA] rounded-full flex items-center justify-center text-[#152C60] hover:bg-[#2B5DB6] hover:text-white transition-all z-10">
            <X size={24} />
          </button>
          <div className="w-full md:w-1/2 bg-white p-12 flex items-center justify-center h-80 md:h-auto overflow-hidden">
            <img src={product.images[0]} className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-110 duration-700" alt="" />
          </div>
          <div className="p-16 flex-1 flex flex-col justify-center bg-[#F3F6FA]">
            <span className="text-[10px] font-black uppercase text-[#2B5DB6] mb-4 tracking-widest">Botica Magistral</span>
            <h3 className="text-4xl font-serif font-bold text-[#152C60] mb-6">{product.name}</h3>
            <p className="text-[#152C60]/60 font-medium leading-relaxed mb-10 italic">"{product.desc}"</p>
            <div className="flex items-center justify-between pt-10 border-t border-[#152C60]/5">
              <span className="text-4xl font-serif font-bold text-[#152C60]">{product.price}</span>
              <button 
                onClick={() => { onAddToCart(product); onClose(); }}
                className="px-10 h-16 bg-[#152C60] text-white rounded-2xl font-black uppercase text-[10px] hover:bg-[#2B5DB6] shadow-xl transition-all"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
