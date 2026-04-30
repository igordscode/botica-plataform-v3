import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, Heart, CreditCard, Settings, LogOut, ArrowRight, Activity, ShieldCheck, Zap, User as UserIcon, Building, Briefcase, Plus, MapPin } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Doctor profile fields
  const [bio, setBio] = useState('');
  const [crm, setCrm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        navigate('/');
      } else {
        setUser(u);
        try {
          const userDocRef = doc(db, 'users', u.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setRole(data.role || 'patient');
            
            if (data.role === 'doctor') {
              const docProfileRef = doc(db, 'doctors_profiles', u.uid);
              const docProfileSnap = await getDoc(docProfileRef);
              if (docProfileSnap.exists()) {
                const profileData = docProfileSnap.data();
                setBio(profileData.bio || '');
                setCrm(profileData.crm || '');
                setSpecialty(profileData.specialty || '');
                setAddress(profileData.address || '');
              }
            }
          } else {
            // New user, create default patient profile
            await setDoc(userDocRef, {
              email: u.email,
              displayName: u.displayName,
              role: 'patient',
              createdAt: new Date().toISOString(),
              status: 'active'
            });
            setRole('patient');
          }
        } catch (e) {
          console.error("Error fetching user data", e);
        }
      }
      setLoading(false);
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    try {
      if (role === 'doctor') {
        const docProfileRef = doc(db, 'doctors_profiles', user.uid);
        await setDoc(docProfileRef, {
          doctorId: user.uid,
          bio,
          crm,
          specialty,
          address,
          avatarUrl: user.photoURL,
          name: user.displayName,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        
        // Ensure user doc also explicitly flags them as pending or active
        // Normally handled by admin, but we just want to save profile details here.
      } else {
        // Patient basic details saving
        // Not fully implemented in this example
      }
      
      alert('Perfil salvo com sucesso!');
    } catch (e) {
      console.error("Error saving profile", e);
      alert('Erro ao salvar perfil.');
    } finally {
      setSaving(false);
    }
  };

  const handleBecomePrescriber = async () => {
    if (!user) return;
    const confirm = window.confirm('Deseja iniciar o processo para se tornar um Médico Prescritor? Você precisará informar seu CRM.');
    if (confirm) {
      // Switch role to pending_doctor or doctor in this mock flow
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        role: 'doctor',
        status: 'pending_approval'
      }, { merge: true });
      setRole('doctor');
      setActiveTab('settings');
      alert('Seu perfil foi alterado para Prescritor. Por favor, preencha seus dados clínicos para aprovação.');
    }
  };

  if (loading) return <div className="min-h-screen pt-24 pb-32 flex items-center justify-center"><Activity className="animate-spin text-[#2B5DB6]" /></div>;
  if (!user) return null;

  return (
    <div className="bg-[#F3F6FA] min-h-screen text-[#152C60] font-sans pb-24">
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:flex gap-12 items-start mt-10">
        
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
              
              <div className="mt-2 inline-flex">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  role === 'doctor' ? 'bg-[#2B5DB6]/10 text-[#2B5DB6]' : 
                  role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-[#152C60]/10 text-[#152C60]'
                }`}>
                  {role === 'doctor' ? 'Prescritor' : role === 'admin' ? 'Administrador' : 'Paciente'}
                </span>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === 'overview' 
                  ? 'bg-[#152C60] text-white' 
                  : 'text-[#152C60]/50 hover:bg-[#F3F6FA] hover:text-[#2B5DB6]'
              }`}
            >
              <Activity size={18} /> Visão Geral
            </button>
            <Link
              to="/pedidos"
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#152C60]/50 hover:bg-[#F3F6FA] hover:text-[#2B5DB6] transition-all"
            >
              <Package size={18} /> Meus Pedidos
            </Link>
            <Link
              to="/favoritos"
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#152C60]/50 hover:bg-[#F3F6FA] hover:text-[#2B5DB6] transition-all"
            >
              <Heart size={18} /> Fórmulas Salvas
            </Link>
            <Link
              to="/clube"
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#152C60]/50 hover:bg-[#F3F6FA] hover:text-[#2B5DB6] transition-all"
            >
              <ShieldCheck size={18} /> Clube Guaraní
            </Link>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === 'settings' 
                  ? 'bg-[#152C60] text-white' 
                  : 'text-[#152C60]/50 hover:bg-[#F3F6FA] hover:text-[#2B5DB6]'
              }`}
            >
              <Settings size={18} /> Configurações
            </button>

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

        {/* Main Content Area */}
        <section className="flex-1 space-y-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-2">Painel <span className="text-[#2B5DB6]">Biológico</span></h1>
                  <p className="text-[#152C60]/60 font-medium">Bom te ver novamente. Aqui está o resumo do seu status.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {role === 'doctor' || role === 'admin' ? (
                    <div className="bg-[#2B5DB6] p-8 rounded-3xl text-white relative overflow-hidden group shadow-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      <Briefcase size={32} className="mb-6 opacity-80" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Guaraní For Doctors</h3>
                      <div className="text-3xl font-serif font-black mb-1 flex items-baseline gap-2">
                        Painel Médico
                      </div>
                      <p className="text-sm font-medium opacity-80 mb-6">Acesse seu catálogo, crie prescrições personalizadas e acompanhe seus pacientes.</p>
                      <Link to="/prescritor" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-[#152C60] px-4 py-2 rounded-lg hover:bg-[#F3F6FA] transition-colors relative z-10">
                        Acessar CRM <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-[#2B5DB6] p-8 rounded-3xl text-white relative overflow-hidden group shadow-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      <Activity size={32} className="mb-6 opacity-80" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Guaraní Care</h3>
                      <div className="text-3xl font-serif font-black mb-1 flex items-baseline gap-2">
                        Painel do Paciente
                      </div>
                      <p className="text-sm font-medium opacity-80 mb-6">Acompanhe seus dados de saúde, protocolos e exames em nossa central completa.</p>
                      <Link to="/paciente" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-[#152C60] px-4 py-2 rounded-lg hover:bg-[#F3F6FA] transition-colors relative z-10">
                        Acessar Central <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}

                  <div className="bg-white p-8 rounded-3xl border border-[#152C60]/5 hover:border-[#2B5DB6]/20 transition-all shadow-xl flex flex-col justify-between">
                    <div>
                      <Package size={32} className="text-[#2B5DB6] mb-6" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#152C60]/40 mb-1">Último Pedido</h3>
                      <div className="text-xl font-bold text-[#152C60] mb-2">Sem pedidos recentes</div>
                    </div>
                    <Link to="/loja" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#152C60] hover:text-[#2B5DB6] hover:translate-x-2 transition-transform mt-6">
                      Explorar Fórmulas <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {role === 'patient' && (
                  <div className="bg-gradient-to-r from-[#152C60] to-[#2B5DB6] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative z-10">
                      <h3 className="font-serif font-black text-2xl mb-2">Você é um Profissional da Saúde?</h3>
                      <p className="text-sm text-white/80 max-w-md">Descubra ferramentas avançadas de prescrição magistral, faturamento compartilhado e visibilidade em nossa plataforma.</p>
                    </div>
                    <button 
                      onClick={handleBecomePrescriber}
                      className="relative z-10 shrink-0 bg-white text-[#152C60] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#F3F6FA] transition-colors whitespace-nowrap"
                    >
                      Torne-se Prescritor
                    </button>
                    <div className="absolute -right-20 -bottom-20 opacity-10 blur-xl pointer-events-none">
                      <Building size={200} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-2">Configurações</h1>
                  <p className="text-[#152C60]/60 font-medium">Edite seus dados pessoais e preferências.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-[#152C60]/5 shadow-sm">
                  <h2 className="font-serif font-black text-2xl text-[#152C60] mb-6 flex items-center gap-3">
                    <UserIcon className="text-[#2B5DB6]" /> Perfil Básico
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#152C60]/60 mb-2">Nome Completo</label>
                      <input type="text" readOnly value={user.displayName || ''} className="w-full bg-[#F3F6FA] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#152C60] opacity-70 cursor-not-allowed" />
                      <p className="text-xs text-[#152C60]/40 mt-1">Sincronizado via Google Auth.</p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#152C60]/60 mb-2">E-mail de Contato</label>
                      <input type="email" readOnly value={user.email || ''} className="w-full bg-[#F3F6FA] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#152C60] opacity-70 cursor-not-allowed" />
                    </div>
                  </div>
                </div>

                {role === 'doctor' && (
                  <form onSubmit={handleSaveProfile} className="bg-white p-8 rounded-3xl border border-[#152C60]/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif font-black text-2xl text-[#152C60] flex items-center gap-3">
                        <Briefcase className="text-[#2B5DB6]" /> Perfil Clínico (Público)
                      </h2>
                      <span className="bg-yellow-100 text-yellow-700 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-yellow-200">Em Análise / Pendente</span>
                    </div>
                    <p className="text-sm text-[#152C60]/60 mb-8">Estes dados serão exibidos em seu perfil público (<Link to={`/dr/${user.uid}`} className="text-[#2B5DB6] hover:underline">/dr/{user.uid}</Link>) e estarão disponíveis para busca de pacientes.</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#152C60]/60 mb-2">Especialidade / Título</label>
                        <input 
                          type="text" 
                          required
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          placeholder="Ex: Medicina Funcional Integraiva" 
                          className="w-full bg-[#F3F6FA] border border-transparent focus:border-[#2B5DB6] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#152C60] outline-none transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#152C60]/60 mb-2">Registro Profissional (CRM/CRN)</label>
                        <input 
                          type="text" 
                          required
                          value={crm}
                          onChange={(e) => setCrm(e.target.value)}
                          placeholder="Ex: CRM-SP 123456" 
                          className="w-full bg-[#F3F6FA] border border-transparent focus:border-[#2B5DB6] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#152C60] outline-none transition-all" 
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#152C60]/60 mb-2">Endereço / Clínica (Opcional)</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#152C60]/40" />
                        <input 
                          type="text" 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Endereço da clínica física ou 'Atendimento Online'" 
                          className="w-full pl-10 pr-4 py-3 bg-[#F3F6FA] border border-transparent focus:border-[#2B5DB6] focus:bg-white rounded-xl text-sm font-medium text-[#152C60] outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#152C60]/60 mb-2">Biografia (Filosofia de Atendimento)</label>
                      <textarea 
                        rows={4}
                        required
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Descreva sua abordagem clínica, foco em longevidade, etc..."
                        className="w-full bg-[#F3F6FA] border border-transparent focus:border-[#2B5DB6] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#152C60] outline-none transition-all resize-none" 
                      />
                    </div>

                    <div className="flex justify-end pt-6 border-t border-[#152C60]/5">
                      <button 
                        type="submit"
                        disabled={saving}
                        className="bg-[#152C60] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </section>
      </main>
    </div>
  );
}

