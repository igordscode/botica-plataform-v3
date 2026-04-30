import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Microscope, Home, Menu, X, LogIn, LogOut, User, LayoutDashboard, Heart, Package, ShoppingCart, BookOpen, FileText, ShieldCheck } from 'lucide-react';
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

  return (
    <nav className="sticky top-0 z-50 bg-[#F3F6FA]/80 backdrop-blur-md border-b border-[#152C60]/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex flex-col items-start gap-0.5 group">
            <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-[#152C60] leading-none">
              Botica Guaraní
            </h1>
            <p className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-bold text-[#152C60]/80">
              Laboratorio de Recetas Magistrales
            </p>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
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

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 border-r border-[#152C60]/10 pr-6 mr-2">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-[#152C60] hover:text-[#2B5DB6] transition-colors group"
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <motion.span 
                      key={cartCount}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 w-4 h-4 bg-[#152C60] text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
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

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#152C60]"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#2B5DB6] text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-[#152C60]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#F3F6FA] border-t border-[#152C60]/10 mt-4"
          >
            <div className="flex flex-col gap-4 py-6">
              {navLinks.filter(l => !l.hidden).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 text-lg font-medium ${
                    location.pathname === link.path ? 'text-[#2B5DB6]' : 'text-[#152C60]/70'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
