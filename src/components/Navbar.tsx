import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Microscope, Home, Menu, X, FileText, Sparkles, MoreHorizontal, Globe, Newspaper, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: <Home size={18} /> },
    { name: t('nav.about'), path: '/sobre', icon: <Microscope size={18} /> },
    { name: t('nav.store'), path: '/loja', icon: <ShoppingBag size={18} /> },
    { name: t('nav.prescription'), path: '/receita', icon: <FileText size={18} /> },
    { name: t('nav.novedades'), path: '/novedades', icon: <Newspaper size={18} /> },
  ];

  const mobileBottomLinks = [
    { name: t('nav.home'), path: '/', icon: <Home size={22} /> },
    { name: t('nav.store'), path: '/loja', icon: <ShoppingBag size={22} /> },
    { name: t('nav.prescription'), path: '/receita', icon: <Sparkles size={22} /> },
  ];

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <nav className="sticky top-0 z-50 bg-[#FCFAF4]/90 backdrop-blur-md border-b border-[#152C60]/10 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center group">
              <img src="/logo-azul.svg" alt="Botica Guaraní" className="h-10 md:h-12 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#2B5DB6] relative ${
                    location.pathname === link.path ? 'text-[#2B5DB6]' : 'text-[#152C60]/70'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-4">

              <button
                onClick={() => setLanguage(language === 'es' ? 'pt' : 'es')}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-[#152C60]/5 hover:bg-[#152C60]/10 text-xs font-bold text-[#152C60] transition-colors"
                title="Cambiar idioma"
              >
                <Globe size={14} className="opacity-70" />
                <span className={language === 'es' ? 'text-[#2B5DB6]' : 'opacity-50'}>ES</span>
                <span className="opacity-30">/</span>
                <span className={language === 'pt' ? 'text-[#2B5DB6]' : 'opacity-50'}>PT</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#152C60] hover:text-[#2B5DB6] transition-colors group"
                title="Carrinho"
              >
                <ShoppingCart size={22} className="md:w-5 md:h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-4 h-4 max-w-full bg-[#152C60] text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-end pt-10 pb-3 px-1 pointer-events-none">

        {/* Wave Background */}
        <div className="absolute inset-0 z-[-1] flex items-end drop-shadow-[0_-4px_25px_rgba(21,44,96,0.25)] pointer-events-auto">
          <div className="flex-1 h-[85px] bg-[#152C60] rounded-tl-3xl border-none" />
          <svg width="150" height="120" viewBox="0 0 150 120" fill="none" className="shrink-0 -mb-[1px] -mx-[1px]" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,35 L10,35 C45,35 45,0 75,0 C105,0 105,35 140,35 L150,35 L150,120 L0,120 Z"
              fill="#152C60"
            />
          </svg>
          <div className="flex-1 h-[85px] bg-[#152C60] rounded-tr-3xl border-none" />
        </div>

        {mobileBottomLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const isPrescription = link.path === '/receita';

          if (isPrescription) {
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`pointer-events-auto flex flex-col items-center justify-center w-16 -translate-y-[42px] transition-all relative z-10 ${
                  isActive ? 'text-white' : 'text-white/90'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-white text-[#152C60] shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110' : 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:scale-105 shadow-xl'
                }`}>
                  {link.icon}
                </div>
                <span className={`text-[10px] mt-1.5 font-black tracking-wide ${isActive ? 'text-white' : 'text-white/90'}`}>
                  {link.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`pointer-events-auto flex flex-col items-center justify-center w-16 py-2 transition-all relative ${
                isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {isActive && (
                <motion.div layoutId="bottom-nav-pill" className="absolute inset-0 bg-white/10 rounded-xl -z-10" />
              )}
              {link.icon}
              <span className={`text-[9px] mt-1 font-bold ${isActive ? 'uppercase tracking-widest' : ''}`}>
                {link.name}
              </span>
            </Link>
          );
        })}

        {/* Mobile Menu Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`pointer-events-auto flex flex-col items-center justify-center w-16 py-2 transition-all relative ${
            isOpen ? 'text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
           {isOpen && (
              <motion.div layoutId="bottom-nav-pill" className="absolute inset-0 bg-white/10 rounded-xl -z-10" />
           )}
           {isOpen ? <X size={22} /> : <MoreHorizontal size={22} />}
           <span className={`text-[9px] mt-1 font-bold ${isOpen ? 'uppercase tracking-widest' : ''}`}>
             {t('nav.menu')}
           </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-x-0 bottom-[72px] top-16 bg-white z-40 overflow-y-auto rounded-t-3xl shadow-2xl border-t border-[#152C60]/5"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
               <div className="w-12 h-1 bg-[#152C60]/10 rounded-full mx-auto mb-8" />

              {navLinks.filter(l => !mobileBottomLinks.find(m => m.path === l.path)).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold transition-colors ${
                    location.pathname === link.path ? 'bg-[#2B5DB6]/5 text-[#2B5DB6]' : 'text-[#152C60] hover:bg-[#F3F6FA]'
                  }`}
                >
                  <div className={`p-2 rounded-xl flex items-center justify-center ${location.pathname === link.path ? 'bg-[#2B5DB6] text-white' : 'bg-[#F3F6FA] text-[#152C60]/40'}`}>
                    {link.icon}
                  </div>
                  {link.name}
                </Link>
              ))}

              {/* Padding to allow scrolling past bottom bar */}
              <div className="h-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
