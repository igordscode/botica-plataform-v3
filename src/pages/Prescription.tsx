import { motion } from 'motion/react';
import PrescriptionUpload from '../components/PrescriptionUpload';
import { FileText, Shield, Clock, Phone } from 'lucide-react';

export default function Prescription() {
  return (
    <div className="min-h-screen bg-[#F3F6FA] pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <FileText size={14} /> Canal de Orçamentos
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-black text-[#152C60] leading-tight"
          >
            Sua Fórmula <br/> na <span className="text-[#2B5DB6]">Velocidade da Luz</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#152C60]/60 max-w-2xl mx-auto font-medium"
          >
            Digitalize sua prescrição e receba um orçamento personalizado. 
            Nossa equipe técnica analisa cada componente para garantir a máxima eficácia.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PrescriptionUpload />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Segurança", desc: "Dados protegidos com criptografia industrial." },
            { icon: Clock, title: "Agilidade", desc: "Orçamentos em menos de 15 minutos em horário comercial." },
            { icon: Phone, title: "Suporte", desc: "Tire dúvidas diretamente com Lucas no WhatsApp." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-8 bg-white rounded-[2.5rem] border border-[#152C60]/5 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-[#F3F6FA] text-[#2B5DB6] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <item.icon size={24} />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#152C60]">{item.title}</h3>
              <p className="text-xs text-[#152C60]/50 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
