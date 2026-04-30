import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Microscope, Home, Menu, X, LogIn, LogOut, User, LayoutDashboard, Heart, Package, ShoppingCart, BookOpen, FileText, ShieldCheck, Sparkles, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { useCart } from '../context/CartContext';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const ADMIN_EMAIL = 'idshubs@gmail.com';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const location = useLocation();
  const { cart, wishlistCount, isCartOpen, setIsCartOpen } = useCart();
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
    } catch (error) {
      console.error("Login failed", error);
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
    { name: 'Início', path: '/', icon: <Home size={18} /> },
    { name: 'Sobre Nós', path: '/sobre', icon: <Microscope size={18} /> },
    { name: 'Clube Guaraní', path: '/clube', icon: <ShieldCheck size={18} /> },
    { name: 'Loja', path: '/loja', icon: <ShoppingBag size={18} /> },
    
    { name: 'Receita', path: '/receita', icon: <FileText size={18} /> },
    { name: 'Portal', path: '/portal', icon: <BookOpen size={18} /> },
    { name: 'Favoritos', path: '/favoritos', icon: <Heart size={18} />, hidden: !user },
    { name: 'Pedidos', path: '/pedidos', icon: <Package size={18} />, hidden: !user },
  ];

  const mobileBottomLinks = [
    { name: 'Início', path: '/', icon: <Home size={22} /> },
    { name: 'Loja', path: '/loja', icon: <ShoppingBag size={22} /> },
    
    { name: 'Portal', path: '/portal', icon: <BookOpen size={22} /> },
  ];

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <nav className="sticky top-0 z-50 bg-[#F3F6FA]/80 backdrop-blur-md border-b border-[#152C60]/10 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex flex-col items-start gap-0.5 group">
              <h1 className="text-xl md:text-3xl font-serif font-black tracking-tight text-[#152C60] leading-none">
                Botica Guaraní
              </h1>
              <p className="text-[6px] md:text-[8px] uppercase tracking-[0.2em] font-bold text-[#152C60]/80">
                Laboratorio de Recetas Magistrales
              </p>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.filter(l => !l.hidden).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#2B5DB6] relative ${
                    location.pathname === link.path ? 'text-[#2B5DB6]' : 'text-[#152C60]/70'
                  }`}
                >
                  {link.icon}
                  {link.name}
                  {link.name === 'Favoritos' && wishlistCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-3 w-4 h-4 bg-[#2B5DB6] text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-4">
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

              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-4 border-l border-[#152C60]/10 pl-6 ml-2">
                    {user.email === ADMIN_EMAIL && (
                      <Link
                        to="/admin"
                        className="p-2 text-[#152C60]/40 hover:text-[#5C88DA] transition-colors"
                        title="Painel Administrativo"
                      >
                        <LayoutDashboard size={18} />
                      </Link>
                    )}
                    {user.photoURL ? (
                      <Link to="/conta">
                        <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-[#2B5DB6]/20 hover:scale-105 transition-transform" />
                      </Link>
                    ) : (
                      <Link to="/conta" className="w-8 h-8 rounded-full bg-[#2B5DB6]/10 flex items-center justify-center text-[#2B5DB6] hover:bg-[#2B5DB6]/20 transition-colors">
                        <User size={16} />
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors"
                      title="Sair"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#152C60] hover:text-[#2B5DB6] transition-colors pl-4 border-l border-[#152C60]/10"
                  >
                    <LogIn size={18} /> Entrar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F3F6FA]/95 backdrop-blur-xl border-t border-[#152C60]/10 z-50 px-2 pt-2 pb-5 flex justify-around items-end shadow-[0_-10px_40px_rgba(21,44,96,0.1)]">
        {mobileBottomLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center p-2 transition-all relative ${
                isActive ? 'text-[#2B5DB6] -translate-y-1' : 'text-[#152C60]/50 hover:text-[#152C60]'
              }`}
            >
              {isActive && (
                <motion.div layoutId="bottom-nav-pill" className="absolute inset-0 bg-[#2B5DB6]/10 rounded-2xl -z-10" />
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
          className={`flex flex-col items-center p-2 transition-all relative ${
            isOpen ? 'text-[#2B5DB6] -translate-y-1' : 'text-[#152C60]/50 hover:text-[#152C60]'
          }`}
        >
           {isOpen && (
              <motion.div layoutId="bottom-nav-pill" className="absolute inset-0 bg-[#2B5DB6]/10 rounded-2xl -z-10" />
           )}
           {isOpen ? <X size={22} /> : <MoreHorizontal size={22} />}
           <span className={`text-[9px] mt-1 font-bold ${isOpen ? 'uppercase tracking-widest' : ''}`}>
             Menu
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
                  {link.name === 'Favoritos' && wishlistCount > 0 && (
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
                        Administração
                     </Link>
                  )}
                  <Link
                     to="/conta"
                     onClick={() => setIsOpen(false)}
                     className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-[#152C60] hover:bg-[#F3F6FA] transition-colors"
                  >
                     <div className="p-2 rounded-xl bg-[#F3F6FA] text-[#152C60]/40 flex items-center justify-center">
                       <User size={18} />
                     </div>
                     Minha Conta
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <div className="p-2 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                      <LogOut size={18} />
                    </div>
                    Sair da Conta
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
                  <LogIn size={18} /> Entrar / Cadastrar
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
