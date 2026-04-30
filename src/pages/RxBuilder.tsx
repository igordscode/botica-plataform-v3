import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Trash2, Link as LinkIcon, Send, FileText, CheckCircle2, FlaskConical, Beaker, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RxBuilder() {
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [items, setItems] = useState<any[]>([{ id: 1, name: '', dosage: '', quantity: '' }]);
  const [isGenerated, setIsGenerated] = useState(false);

  const addItem = () => {
    setItems([...items, { id: items.length + 1, name: '', dosage: '', quantity: '' }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleGenerate = () => {
    if (!patientName) return alert('Preencha o nome do paciente.');
    setIsGenerated(true);
  };

  return (
    <div className="bg-[#F3F6FA] min-h-screen pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/prescritor" className="inline-flex items-center gap-2 text-sm font-bold text-[#152C60]/60 hover:text-[#2B5DB6] mb-4 transition-colors">
              <ChevronLeft size={16} /> Voltar ao Painel
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-[#152C60] flex items-center gap-3">
              <FlaskConical className="text-[#2B5DB6]" /> RX Builder
            </h1>
            <p className="text-[#152C60]/60 mt-2">Crie fórmulas magistrais personalizadas e envie diretamente ao paciente.</p>
          </div>
          {isGenerated && (
             <button className="px-6 py-3 bg-[#2B5DB6] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#152C60] transition-colors shadow-lg flex items-center gap-2">
               <Send size={16} /> Enviar Prescrição
             </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            
            {/* Patient Info */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
              <h2 className="text-lg font-black text-[#152C60] uppercase tracking-widest text-xs mb-6">1. Dados do Paciente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#152C60]/60 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-[#F3F6FA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B5DB6] border border-transparent font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#152C60]/60 mb-2">Email (Opcional)</label>
                  <input 
                    type="email" 
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="joao@email.com"
                    className="w-full bg-[#F3F6FA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B5DB6] border border-transparent font-medium" 
                  />
                </div>
              </div>
            </div>

            {/* Formula Items */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#152C60]/5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-[#152C60] uppercase tracking-widest text-xs flex items-center gap-2">
                  <Beaker size={16} className="text-[#2B5DB6]" /> 2. Composição da Fórmula
                </h2>
                <button className="text-[#2B5DB6] text-xs font-bold hover:underline flex items-center gap-1">
                  <Search size={14} /> Buscar no Catálogo
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4 items-start"
                  >
                    <div className="w-8 h-10 flex items-center justify-center font-bold text-[#152C60]/30 shrink-0">
                      {index + 1}.
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <input type="text" placeholder="Ativo (Ex: Ashwagandha KSM-66)" className="w-full bg-[#F3F6FA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B5DB6] text-sm" />
                      </div>
                      <div>
                        <input type="text" placeholder="Dose (Ex: 300mg)" className="w-full bg-[#F3F6FA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B5DB6] text-sm" />
                      </div>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Qtd (Ex: 60 cap)" className="w-full bg-[#F3F6FA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B5DB6] text-sm" />
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="w-12 shrink-0 h-full bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={addItem}
                className="mt-6 w-full py-4 border-2 border-dashed border-[#152C60]/20 rounded-xl text-[#152C60]/60 font-bold text-sm flex items-center justify-center gap-2 hover:border-[#2B5DB6] hover:text-[#2B5DB6] hover:bg-[#2B5DB6]/5 transition-all"
              >
                <Plus size={18} /> Adicionar Ativo
              </button>

              <div className="mt-8">
                <label className="block text-xs font-bold text-[#152C60]/60 mb-2">Posologia</label>
                <textarea 
                  placeholder="Ex: Tomar 1 cápsula 2x ao dia após as refeições."
                  className="w-full bg-[#F3F6FA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B5DB6] text-sm h-24 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleGenerate}
                className="px-8 py-4 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B5DB6] transition-colors shadow-xl"
              >
                Gerar Prescrição
              </button>
            </div>
          </div>

          {/* Sidebar / Preview Area */}
          <div>
            <div className="bg-[#152C60] text-white rounded-3xl p-8 sticky top-24 shadow-2xl overflow-hidden relative">
               <div className="absolute -right-10 -bottom-10 opacity-10">
                 <FileText size={200} />
               </div>

               <h3 className="font-serif font-black text-2xl mb-6 relative z-10">Preview da Receita</h3>

               {!isGenerated ? (
                 <div className="bg-white/10 rounded-2xl p-6 border border-white/10 relative z-10 text-center">
                   <p className="text-white/60 text-sm font-medium">Preencha os dados e clique em "Gerar Prescrição" para visualizar.</p>
                 </div>
               ) : (
                 <div className="space-y-6 relative z-10">
                    <div className="bg-white text-[#152C60] rounded-2xl p-6 shadow-lg">
                      <div className="flex justify-between items-start mb-6 border-b border-[#152C60]/10 pb-4">
                        <div>
                          <p className="font-black uppercase tracking-widest text-[10px] text-[#2B5DB6]">Prescrição Eletrônica</p>
                          <p className="font-serif font-bold text-lg leading-tight mt-1">{patientName}</p>
                        </div>
                        <CheckCircle2 className="text-green-500" />
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Ashwagandha</span>
                          <span className="font-bold">300mg</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Rhodiola Rosea</span>
                          <span className="font-bold">200mg</span>
                        </div>
                      </div>

                      <div className="bg-[#F3F6FA] rounded-xl p-3 mb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 mb-1">Posologia</p>
                        <p className="text-xs font-medium">Tomar 1 cápsula 2x ao dia após as refeições.</p>
                      </div>

                      <button className="w-full py-3 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2B5DB6] hover:text-white transition-colors">
                        <LinkIcon size={14} /> Copiar Link
                      </button>
                    </div>

                    <p className="text-xs text-white/50 text-center">
                      O paciente poderá finalizar a compra da fórmula diretamente pelo link gerado.
                    </p>
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
