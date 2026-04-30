import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Microscope, Heart, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'newsletter');
      setStatus('idle');
    }
  };

  return (
    <footer className="bg-[#152C60] pt-32 pb-20 px-6 text-[#F3F6FA] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2B5DB6]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2B5DB6]/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="grid lg:grid-cols-4 gap-16">
          <div className="col-span-1 lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-4xl font-serif font-black tracking-tighter">Botica Guaraní</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F3F6FA]/60">Laboratorio de Recetas Magistrales</p>
              </div>
              <p className="text-xl text-[#F3F6FA]/40 font-medium italic max-w-md leading-relaxed">
                "Elevando o padrão da medicina magistral através da precisão técnica e do cuidado humano individualizado."
              </p>
            </div>

            {/* Newsletter Integrated into Left Side */}
            <div className="max-w-md space-y-6">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">Inovação no seu e-mail</h4>
                <p className="text-xs text-white/40 font-medium">Receba protocolos de saúde e atualizações do laboratório.</p>
              </div>
              <form onSubmit={handleNewsletter} className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.bio"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#2B5DB6] focus:ring-1 focus:ring-[#2B5DB6] transition-all placeholder:text-white/20"
                />
                <button
                  disabled={status !== 'idle'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#2B5DB6] text-white rounded-xl hover:bg-white hover:text-[#2B5DB6] transition-all flex items-center justify-center disabled:opacity-50 shadow-xl"
                >
                  {status === 'success' ? <CheckCircle2 size={20} /> : <Send size={20} />}
                </button>
              </form>
            </div>
            
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#2B5DB6] hover:border-[#2B5DB6] hover:text-white transition-all text-white/40">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">Explorar</h4>
            <ul className="space-y-4">
              {[
                { label: 'Início', path: '/' },
                { label: 'Sobre Nós', path: '/sobre' },
                { label: 'Clube Guaraní', path: '/clube' },
                { label: 'Loja Boutique', path: '/loja' },
                { label: 'Envio de Receita', path: '/receita' },
                { label: 'Portal Científico', path: '/portal' }
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-bold text-white/40 hover:text-white hover:translate-x-2 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2B5DB6]">Laboratório</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start text-white/40 group">
                <MapPin size={20} className="shrink-0 group-hover:text-[#2B5DB6] transition-colors" />
                <span className="text-xs font-bold leading-relaxed">Asunción, Paraguay<br/>Calle 14 de Mayo, Nro 254</span>
              </li>
              <li className="flex gap-4 items-center text-white/40 group">
                <Phone size={20} className="shrink-0 group-hover:text-[#2B5DB6] transition-colors" />
                <span className="text-xs font-bold">+595 981 123 456</span>
              </li>
              <li className="flex gap-4 items-center text-white/40 group">
                <Mail size={20} className="shrink-0 group-hover:text-[#2B5DB6] transition-colors" />
                <span className="text-xs font-bold uppercase tracking-widest text-[9px]">contato@botica.py</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
             <Heart size={14} className="text-[#2B5DB6]" fill="currentColor" />
             <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Precisão e Cuidado em cada detalhe</span>
          </div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            © 2026 Botica Guaraní. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
