import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ShoppingCart, Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../services/analytics';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatPrice } = useLanguage();

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'wishlist'), where('userId', '==', user.uid));
        const snap = await getDocs(q);
        const productIds = snap.docs.map(d => ({ docId: d.id, productId: d.data().productId }));
        
        const filteredProducts = productIds.map(obj => {
          const product = PRODUCTS.find(p => p.id === obj.productId);
          return product ? { ...product, docId: obj.docId } : null;
        }).filter(Boolean);

        setWishlistItems(filteredProducts);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (docId: string, productId: number) => {
    try {
      await deleteDoc(doc(db, 'wishlist', docId));
      setWishlistItems(prev => prev.filter(item => item.docId !== docId));
      trackEvent('Wishlist', 'Remove', productId.toString());
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F6FA]">
        <div className="w-12 h-12 border-4 border-[#2B5DB6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-24 bg-[#F3F6FA] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter mb-4 text-[#152C60]">
            SEUS <span className="text-[#2B5DB6]">FAVORITOS</span>
          </h1>
          <p className="text-[#152C60]/60 italic font-medium">Sua lista de desejos para uma performance inigualável.</p>
        </header>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistItems.map((item) => (
                <motion.div
                  layout
                  key={item.docId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-[#152C60]/5 shadow-xl flex flex-col group"
                >
                  <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 bg-[#F3F6FA]">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-serif font-black text-[#152C60]">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-[#152C60]">{formatPrice(item.price)}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => removeFromWishlist(item.docId, item.id)}
                          className="p-3 text-[#152C60]/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <Link 
                          to="/loja"
                          className="p-3 bg-[#152C60] text-white rounded-xl hover:bg-[#2B5DB6] transition-all"
                        >
                          <ShoppingCart size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center space-y-8"
            >
              <div className="w-24 h-24 bg-[#152C60]/5 rounded-full flex items-center justify-center mx-auto">
                <Heart size={40} className="text-[#152C60]/10" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif font-black uppercase text-[#152C60]">Sua lista está vazia</h3>
                <p className="text-[#152C60]/60 italic max-w-sm mx-auto">
                  Salve os produtos que você mais gosta para encontrá-los facilmente depois.
                </p>
              </div>
              <Link to="/loja" className="inline-flex items-center gap-3 px-8 py-4 bg-[#2B5DB6] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#5C88DA] transition-all">
                Explorar Catálogo <ShoppingBag size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
