import { useState } from 'react';
import { Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore';

export default function PrescriptionUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    const user = auth.currentUser;
    if (!user) {
      setError("Por favor, faça login para enviar sua receita.");
      return;
    }

    setStatus('uploading');
    
    try {
      // In a real app we'd upload to Storage first, then save reference
      // For this lab, we save the record to Firestore
      await addDoc(collection(db, 'prescriptions'), {
        userId: user.uid,
        fileName: file.name,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Also create a lead automatically
      await addDoc(collection(db, 'leads'), {
        userId: user.uid,
        name: user.displayName || 'Usuário',
        phone: 'Pendente', // In real app would be requested in a form
        status: 'new',
        interest: 'Orçamento de Receita',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('idle');
      setError("Erro ao processar envio. Tente novamente.");
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-[#152C60]/5 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-serif font-black uppercase tracking-tighter leading-tight">
            ENVIE SUA <span className="text-[#2B5DB6]">RECEITA</span>
          </h2>
          <p className="text-[#152C60]/60 leading-relaxed">
            Se você já tem uma prescrição médica, envie uma foto ou PDF. Nossa equipe técnica (Dra. Elena) fará a análise e Lucas enviará o orçamento em minutos.
          </p>
          <ul className="space-y-4">
            {['Análise técnica imediata', 'Orçamento sem compromisso', 'Segurança total dos dados'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#152C60]/80 uppercase tracking-wide">
                <CheckCircle2 size={18} className="text-[#5C88DA]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <div className={`relative border-2 border-dashed rounded-[2.5rem] p-8 transition-all flex flex-col items-center justify-center text-center gap-4 ${
            file ? 'border-[#2B5DB6] bg-[#2B5DB6]/5' : 'border-[#152C60]/10 bg-[#F3F6FA]/30'
          }`}>
            <input 
              type="file" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {file ? (
              <>
                <div className="w-16 h-16 bg-[#2B5DB6] text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black truncate max-w-[200px]">{file.name}</p>
                  <button onClick={() => setFile(null)} className="text-[10px] font-bold uppercase text-[#2B5DB6] hover:underline">Remover</button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#152C60] text-white rounded-2xl flex items-center justify-center">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase">Clique ou Arraste</p>
                  <p className="text-[10px] uppercase text-[#152C60]/40 font-bold">JPG, PNG ou PDF (Max 10MB)</p>
                </div>
              </>
            )}
          </div>
          
          <button 
            disabled={!file || status !== 'idle'}
            onClick={handleSubmit}
            className="w-full mt-6 py-4 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-20 shadow-xl shadow-[#152C60]/20 active:scale-95"
          >
            {status === 'idle' ? 'Enviar para Orçamento' : status === 'uploading' ? 'Enviando...' : 'Receita Enviada!'}
          </button>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold uppercase flex items-center gap-2 border border-red-100"
              >
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#152C60] flex flex-col items-center justify-center text-center p-10 z-20"
          >
            <motion.div 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-24 h-24 bg-[#2B5DB6] text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#2B5DB6]/40"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h3 className="text-3xl font-serif font-black text-white mb-4 uppercase">RECEBEMOS SUA RECEITA!</h3>
            <p className="text-white/60 mb-10 max-w-sm">Dra. Elena já está analisando sua prescrição. Em poucos minutos Lucas entrará em contato via WhatsApp com o orçamento.</p>
            <button 
              onClick={() => {setStatus('idle'); setFile(null);}}
              className="text-[#5C88DA] font-black uppercase tracking-widest text-xs hover:underline"
            >
              Enviar outra receita
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
