import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, addToCart, decrementQuantity } = useCart();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const total = cart.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#152C60]/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#F3F6FA] shadow-2xl z-[101] flex flex-col h-screen overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#152C60]/10 flex items-center justify-between bg-white text-[#152C60] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F3F6FA] rounded-2xl flex items-center justify-center text-[#2B5DB6]">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold tracking-tight">Seu Carrinho</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} itens adicionados
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#F3E5D8] rounded-full transition-colors text-[#152C60]/40 hover:text-[#152C60]">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
              <div className="space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-[#152C60]/10 shadow-inner">
                      <ShoppingBag size={48} strokeWidth={1} />
                    </div>
                    <div>
                      <p className="font-serif text-xl italic tracking-tight text-[#152C60] mb-1">Cesto Vazio</p>
                      <p className="text-xs text-[#152C60]/40 font-medium max-w-[200px] mx-auto">
                        Sua seleção de laboratório aparecerá aqui para processamento.
                      </p>
                    </div>
                    <button 
                      onClick={onClose} 
                      className="px-8 py-4 bg-[#152C60] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#2B5DB6] transition-all shadow-xl shadow-[#152C60]/10"
                    >
                      Explorar Fórmulas
                    </button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div 
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-4 p-5 bg-white rounded-[2rem] border border-[#152C60]/5 shadow-xl shadow-[#152C60]/2 group"
                      >
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#F3F6FA]">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-bold text-[#152C60] text-sm leading-none mb-1">{item.name}</h3>
                              <p className="text-[10px] font-black text-[#152C60]/30 uppercase tracking-widest">Premium Formula</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F3F6FA] text-[#152C60]/20 hover:text-red-500 transition-all hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-[#2B5DB6]">{item.price}</span>
                            <div className="flex items-center gap-4 bg-[#F3F6FA] rounded-xl px-1 py-1">
                              <button 
                                onClick={() => decrementQuantity(item.id)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#152C60] hover:text-[#2B5DB6] transition-all shadow-sm active:scale-90"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-[10px] font-black text-[#152C60] min-w-[16px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => addToCart(item)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#152C60] hover:text-[#2B5DB6] transition-all shadow-sm active:scale-90"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-8 bg-white border-t border-[#152C60]/10 space-y-6 shrink-0 relative z-10 shadow-[0_-20px_40px_-15px_rgba(15,44,63,0.05)]">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black text-[#152C60]/40 uppercase tracking-[0.2em]">
                    <span>Subtotal Sugerido</span>
                    <span className="text-[#152C60]">{total.toLocaleString('es-PY')} Gs</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-[#152C60]/40 uppercase tracking-[0.2em]">
                    <span>Processamento</span>
                    <span className="text-green-600">Calculado no Checkout</span>
                  </div>
                  <div className="pt-5 border-t border-[#152C60]/5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-serif font-bold text-[#152C60]">Total Final</span>
                      <span className="text-3xl font-serif font-bold text-[#2B5DB6]">{total.toLocaleString('es-PY')} Gs</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full h-18 bg-[#152C60] text-white rounded-3xl flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#2B5DB6] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-[#152C60]/20 group"
                >
                  Finalizar Manipulação
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>

  );
}
