import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, MessageCircle, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { waLink } from '../constants';

export default function FloatingActions() {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { cart, setIsCartOpen } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsApp = () => {
    window.open(waLink('Hola! Quisiera hacer una consulta.'), '_blank', 'referrer');
  };

  return (
    <div className="fixed bottom-[100px] md:bottom-8 right-4 md:right-8 z-[100] flex flex-col items-end gap-4">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 bg-white border border-[#152C60]/10 rounded-full shadow-lg flex items-center justify-center text-[#152C60] hover:bg-[#F3F6FA] transition-colors mb-2"
      >
        <motion.div
           animate={{ rotate: isExpanded ? 0 : 180 }}
        >
          <ChevronRight size={20} className="rotate-90" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col gap-4 items-end"
          >
            {/* WhatsApp FAB */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWhatsApp}
              className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center group relative"
            >
              <MessageCircle size={24} fill="currentColor" />
              <span className="absolute right-full mr-4 px-3 py-1.5 bg-[#152C60] text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Suporte Direto
              </span>
            </motion.button>

            {/* Cart FAB */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="w-16 h-16 bg-[#152C60] text-white rounded-full shadow-2xl flex items-center justify-center relative group"
            >
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-7 h-7 bg-[#2B5DB6] text-white text-[12px] font-black rounded-full flex items-center justify-center border-4 border-[#F3F6FA]"
                >
                  {cartCount}
                </motion.span>
              )}
              <span className="absolute right-full mr-4 px-4 py-2 bg-[#152C60] text-white text-[11px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Ver Carrinho
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
