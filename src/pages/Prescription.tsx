import { motion } from 'motion/react';
import PrescriptionUpload from '../components/PrescriptionUpload';
import { FileText, Shield, Clock, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Prescription() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-[#F3F6FA] pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <FileText size={14} /> {language === 'pt' ? 'Canal de orçamentos' : 'Canal de cotizaciones'}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-black text-[#152C60] leading-tight"
          >
            {language === 'pt' ? <>Sua fórmula <br/> na <span className="text-[#2B5DB6]">velocidade da luz</span></> : <>Su fórmula <br/> a la <span className="text-[#2B5DB6]">velocidad de la luz</span></>}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#152C60]/60 max-w-2xl mx-auto font-medium"
          >
            {language === 'pt'
              ? 'Digitalize sua prescrição e receba um orçamento personalizado. Nossa equipe técnica analisa cada componente com cuidado.'
              : 'Digitalice su receta y reciba una cotización personalizada. Nuestro equipo técnico revisa cada componente con cuidado.'}
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
            ...(language === 'pt' ? [
              { icon: Shield, title: 'Segurança', desc: 'Dados tratados com cuidado e confidencialidade.' },
              { icon: Clock, title: 'Agilidade', desc: 'Retorno rápido em horário comercial.' },
              { icon: Phone, title: 'Suporte', desc: 'Tire dúvidas diretamente pelo WhatsApp.' },
            ] : [
              { icon: Shield, title: 'Seguridad', desc: 'Datos tratados con cuidado y confidencialidad.' },
              { icon: Clock, title: 'Agilidad', desc: 'Respuesta rápida en horario comercial.' },
              { icon: Phone, title: 'Soporte', desc: 'Consulte sus dudas directamente por WhatsApp.' },
            ]),
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
