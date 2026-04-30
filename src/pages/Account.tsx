import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, Heart, CreditCard, Settings, LogOut, ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate('/'); // Redirect to home if not logged in
      } else {
        setUser(u);
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-[#F3F6FA] text-[#152C60] font-sans">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:flex gap-12 items-start">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-80 bg-white rounded-3xl p-6 shadow-xl border border-[#152C60]/5 shrink-0 mb-8 lg:mb-0">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#152C60]/5">
            {user.photoURL ? (
              <img src={user.photoURL} alt="User avatar" className="w-16 h-16 rounded-full border-2 border-[#2B5DB6]/20 object-cover" />
            ) : (
              <div className="w-16 h-16 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full flex items-center justify-center font-serif text-2xl font-bold">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <h2 className="font-bold text-lg truncate" title={user.displayName || user.email || 'Usuário'}>
                {user.displayName || 'Usuário'}
              </h2>
              <p className="text-[10px] uppercase font-black tracking-widest text-[#152C60]/40 truncate" title={user.email || ''}>
                {user.email}
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { label: 'Visão Geral', icon: <Activity size={18} />, path: '/conta', active: true },
              { label: 'Meus Pedidos', icon: <Package size={18} />, path: '/pedidos' },
              { label: 'Fórmulas Salvas', icon: <Heart size={18} />, path: '/favoritos' },
              { label: 'Clube Guaraní', icon: <ShieldCheck size={18} />, path: '/clube' },
              { label: 'Métodos de Pagamento', icon: <CreditCard size={18} />, path: '#' },
              { label: 'Configurações', icon: <Settings size={18} />, path: '#' },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  link.active 
                    ? 'bg-[#152C60] text-white' 
                    : 'text-[#152C60]/50 hover:bg-[#F3F6FA] hover:text-[#2B5DB6]'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <div className="pt-8 mt-8 border-t border-[#152C60]/5">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} /> Sair da Conta
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content Area (Dashboard mock) */}
        <section className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-2">Painel <span className="text-[#2B5DB6]">Biológico</span></h1>
            <p className="text-[#152C60]/60 font-medium">Bom te ver novamente. Aqui está o resumo do seu status.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2B5DB6] p-8 rounded-3xl text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <Zap size={32} className="mb-6 opacity-80" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Status Metabólico</h3>
              <div className="text-3xl font-serif font-bold mb-6">Em Dia</div>
              <Link to="/loja" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
                Ver Recomendações <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#152C60]/5 hover:border-[#2B5DB6]/20 transition-all shadow-xl">
              <Package size={32} className="text-[#2B5DB6] mb-6" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#152C60]/40 mb-1">Último Pedido</h3>
              <div className="text-xl font-bold text-[#152C60] mb-2">Combo Hipertrofia X</div>
              <div className="text-sm font-bold text-[#2B5DB6] mb-6">Entregue • 12 Abr 2026</div>
              <Link to="/pedidos" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#152C60] hover:text-[#2B5DB6] hover:translate-x-2 transition-transform">
                Detalhes do Pedido <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Quick Actions / Recent Activity */}
          <div className="bg-white rounded-3xl p-8 border border-[#152C60]/5 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#152C60] mb-6 flex items-center justify-between">
              Assinaturas Ativas
              <span className="text-[10px] text-[#2B5DB6]">Gerenciar</span>
            </h3>
            <div className="flex items-center justify-between p-4 bg-[#F3F6FA] rounded-2xl border border-[#152C60]/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#2B5DB6]">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Protocolo Testo Plus</h4>
                  <p className="text-[10px] font-black uppercase text-[#152C60]/40">Renova em 5 dias</p>
                </div>
              </div>
              <div className="font-serif font-bold text-[#2B5DB6]">Ativo</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
