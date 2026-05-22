import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Microscope, Home, Menu, X, LogIn, LogOut, User, LayoutDashboard, Heart, Package, ShoppingCart, BookOpen, FileText, ShieldCheck, Sparkles, MoreHorizontal, Globe, Activity, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const ADMIN_EMAIL = 'idshubs@gmail.com';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const location = useLocation();
  const { cart, wishlistCount, isCartOpen, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed", error);
      alert(`Erro no login: ${error.message || 'Erro desconhecido'}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: <Home size={18} /> },
    { name: t('nav.about'), path: '/sobre', icon: <Microscope size={18} /> },
    { name: t('nav.club'), path: '/clube', icon: <ShieldCheck size={18} /> },
    { name: t('nav.store'), path: '/loja', icon: <ShoppingBag size={18} /> },
    { name: t('nav.concierge'), path: '/assistente', icon: <Sparkles size={18} /> },
    { name: t('nav.prescription'), path: '/receita', icon: <FileText size={18} /> },
    { name: t('nav.portal'), path: '/portal', icon: <BookOpen size={18} /> },
    { name: t('nav.wishlist'), path: '/favoritos', icon: <Heart size={18} />, hidden: !user },
    { name: t('nav.orders'), path: '/pedidos', icon: <Package size={18} />, hidden: !user },
  ];

  const mobileBottomLinks = [
    { name: t('nav.home'), path: '/', icon: <Home size={22} /> },
    { name: t('nav.store'), path: '/loja', icon: <ShoppingBag size={22} /> },
    { name: t('nav.concierge'), path: '/assistente', icon: <Sparkles size={22} /> },
    { name: t('nav.portal'), path: '/portal', icon: <BookOpen size={22} /> },
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
              {navLinks.filter(l => !l.hidden && l.path !== '/favoritos' && l.path !== '/pedidos').map((link) => (
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

              <div className="hidden lg:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center border-l border-[#152C60]/10 pl-6 ml-2 relative group">
                    <button className="flex items-center gap-3 p-1 pr-3 hover:bg-[#152C60]/5 rounded-full transition-all border border-transparent hover:border-[#152C60]/10">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || ''} className="w-9 h-9 rounded-full shadow-sm" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#2B5DB6]/10 flex items-center justify-center text-[#2B5DB6]">
                          <User size={18} />
                        </div>
                      )}
                      <div className="flex flex-col items-start hidden xl:flex">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#152C60] leading-none mb-0.5">{user.displayName ? user.displayName.split(' ')[0] : 'Minha Conta'}</span>
                        <span className="text-[9px] font-bold text-[#152C60]/40 leading-none">{t('nav.account')}</span>
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-12 right-0 w-64 bg-white rounded-3xl shadow-2xl border border-[#152C60]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 overflow-hidden">
                      <div className="px-6 py-5 bg-[#F3F6FA]/50 border-b border-[#152C60]/5">
                        <p className="text-sm font-black text-[#152C60] truncate">{user.displayName || 'Usuário'}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#152C60]/50 truncate mt-1">{user.email}</p>
                      </div>
                      <div className="p-2 space-y-4">
                        {/* Painéis */}
                        <div>
                          <div className="px-4 py-1 flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#152C60]/40">Dashboards</span>
                            <div className="h-px bg-[#152C60]/5 flex-1 mt-0.5"></div>
                          </div>
                          {user.email === ADMIN_EMAIL && (
                            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors">
                              <LayoutDashboard size={16} className="text-[#2B5DB6]" /> {t('nav.admin')}
                            </Link>
                          )}
                          <Link to="/paciente" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors group">
                            <Activity size={16} className="text-[#2B5DB6]" /> 
                            <span className="flex-1">Painel Paciente</span>
                          </Link>
                          <Link to="/prescritor" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors group">
                            <LayoutDashboard size={16} className="text-[#2B5DB6]" /> 
                            <span className="flex-1">Painel Prescritor</span>
                            <span className="text-[8px] uppercase font-black bg-[#2B5DB6]/10 text-[#2B5DB6] px-2 py-0.5 rounded-full">Pro</span>
                          </Link>
                        </div>

                        {/* Interação */}
                        <div>
                          <div className="px-4 py-1 flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#152C60]/40">Interação</span>
                            <div className="h-px bg-[#152C60]/5 flex-1 mt-0.5"></div>
                          </div>
                          <Link to="/mensagens" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors">
                            <MessageCircle size={16} className="text-[#2B5DB6]" /> 
                            <span className="flex-1">Mensagens</span>
                          </Link>
                          <Link to="/comunidade" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors">
                            <Globe size={16} className="text-[#2B5DB6]" /> 
                            <span className="flex-1">Comunidade</span>
                          </Link>
                          <Link to="/roadmap" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors">
                            <Sparkles size={16} className="text-[#2B5DB6]" /> 
                            <span className="flex-1">Mural de Evolução</span>
                          </Link>
                        </div>

                        {/* Loja e Conta */}
                        <div>
                          <div className="px-4 py-1 flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#152C60]/40">Sua Conta</span>
                            <div className="h-px bg-[#152C60]/5 flex-1 mt-0.5"></div>
                          </div>
                          <Link to="/conta" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors">
                            <User size={16} className="text-[#152C60]/50" /> {t('nav.account')}
                          </Link>
                          <Link to="/favoritos" className="flex items-center justify-between px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors">
                            <div className="flex items-center gap-3">
                              <Heart size={16} className="text-[#152C60]/50" /> Favoritos da Loja
                            </div>
                            {wishlistCount > 0 && <span className="bg-[#2B5DB6] text-white text-[10px] px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                          </Link>
                          <Link to="/pedidos" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F6FA] rounded-2xl text-xs font-bold text-[#152C60] transition-colors">
                            <Package size={16} className="text-[#152C60]/50" /> {t('nav.orders')}
                          </Link>
                        </div>
                      </div>
                      <div className="p-2 border-t border-[#152C60]/5">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-2xl text-xs font-bold text-red-500 transition-colors w-full text-left"
                        >
                          <LogOut size={16} /> {t('nav.logout')}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#152C60] hover:text-[#2B5DB6] transition-colors pl-4 border-l border-[#152C60]/10"
                  >
                    <LogIn size={18} /> {t('nav.login')}
                  </button>
                )}
              </div>
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
          const isAssistant = link.path === '/assistente';

          if (isAssistant) {
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
               
               {user && (
                 <div className="flex items-center gap-4 mb-8 p-4 bg-[#F3F6FA] rounded-3xl">
                   {user.photoURL ? (
                     <img src={user.photoURL} alt={user.displayName || ''} className="w-12 h-12 rounded-full border border-white shadow-sm" />
                   ) : (
                     <div className="w-12 h-12 rounded-full bg-[#2B5DB6]/10 flex items-center justify-center text-[#2B5DB6]">
                       <User size={24} />
                     </div>
                   )}
                   <div className="flex-1 overflow-hidden">
                     <p className="font-bold text-[#152C60] truncate">{user.displayName || 'Usuário'}</p>
                     <p className="text-xs text-[#152C60]/50 truncate">{user.email}</p>
                   </div>
                 </div>
               )}

              {navLinks.filter(l => !l.hidden && !mobileBottomLinks.find(m => m.path === l.path)).map((link) => (
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
                  {(link.name === t('nav.wishlist') || link.name === 'Favoritos') && wishlistCount > 0 && (
                    <span className="ml-auto bg-[#2B5DB6] text-white px-2 py-0.5 rounded-full text-xs">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              ))}

              <div className="h-px bg-[#152C60]/5 my-4" />

              {user ? (
                <>
                  {user.email === ADMIN_EMAIL && (
                     <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-[#152C60] hover:bg-[#F3F6FA] transition-colors"
                     >
                        <div className="p-2 rounded-xl bg-[#F3F6FA] text-[#152C60]/40 flex items-center justify-center">
                          <LayoutDashboard size={18} />
                        </div>
                        {t('nav.admin')}
                     </Link>
                  )}
                  <Link
                     to="/paciente"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-[#152C60] hover:bg-[#F3F6FA] transition-colors"
                  >
                     <div className="p-2 rounded-xl bg-[#F3F6FA] text-[#152C60]/40 flex items-center justify-center">
                       <Activity size={18} />
                     </div>
                     Painel Paciente
                  </Link>
                  <Link
                     to="/mensagens"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-[#152C60] hover:bg-[#F3F6FA] transition-colors"
                  >
                     <div className="p-2 rounded-xl bg-[#F3F6FA] text-[#152C60]/40 flex items-center justify-center">
                       <MessageCircle size={18} />
                     </div>
                     Mensagens
                  </Link>
                  <Link
                     to="/comunidade"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-[#152C60] hover:bg-[#F3F6FA] transition-colors"
                  >
                     <div className="p-2 rounded-xl bg-[#F3F6FA] text-[#152C60]/40 flex items-center justify-center">
                       <Globe size={18} />
                     </div>
                     Comunidade
                  </Link>
                  <Link
                     to="/roadmap"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-[#152C60] hover:bg-[#F3F6FA] transition-colors"
                  >
                     <div className="p-2 rounded-xl bg-[#F3F6FA] text-[#152C60]/40 flex items-center justify-center">
                       <Sparkles size={18} />
                     </div>
                     Mural de Evolução
                  </Link>
                  <Link
                     to="/conta"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-[#152C60] hover:bg-[#F3F6FA] transition-colors"
                  >
                     <div className="p-2 rounded-xl bg-[#F3F6FA] text-[#152C60]/40 flex items-center justify-center">
                       <User size={18} />
                     </div>
                     {t('nav.account')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <div className="p-2 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                      <LogOut size={18} />
                    </div>
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#152C60] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-all"
                >
                  <LogIn size={18} /> {t('nav.login_register')}
                </button>
              )}
              
              {/* Padding to allow scrolling past bottom bar */}
              <div className="h-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
