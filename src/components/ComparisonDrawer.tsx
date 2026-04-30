import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ShieldCheck, FlaskConical, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ComparisonDrawerProps {
  products: any[];
  onRemove: (id: number) => void;
  onClose: () => void;
  isOpen?: boolean;
}

export default function ComparisonDrawer({ products, onRemove, onClose, isOpen = true }: ComparisonDrawerProps) {
  const { formatPrice } = useLanguage();

  if (products.length === 0 || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="fixed inset-x-0 bottom-0 z-[110] bg-white shadow-2xl border-t border-[#152C60]/10 rounded-t-[3rem] max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-[#152C60]/5 flex items-center justify-between bg-[#152C60] text-white">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#2B5DB6] rounded-2xl flex items-center justify-center">
              <FlaskConical size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold">Laboratório de Comparação</h2>
              <p className="text-[10px] uppercase font-black tracking-widest text-[#F3F6FA]/40">Analisando {products.length} fórmulas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="min-w-max p-8">
            <div className="grid grid-cols-[200px_repeat(3,300px)] gap-8">
              {/* Labels Column */}
              <div className="space-y-12">
                <div className="h-48" /> {/* Spacer for products header */}
                <div className="space-y-32">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#152C60]/40 tracking-widest">
                    <CheckCircle2 size={14} /> Benefícios
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#152C60]/40 tracking-widest pt-12">
                    <FlaskConical size={14} /> Composição
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#152C60]/40 tracking-widest pt-12">
                    <ShieldCheck size={14} /> Certificado
                  </div>
                </div>
              </div>

              {/* Product Columns */}
              {products.map((p) => (
                <div key={p.id} className="space-y-12 relative">
                  <button 
                    onClick={() => onRemove(p.id)}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-white border border-[#152C60] rounded-full flex items-center justify-center text-[#152C60] hover:bg-red-500 hover:text-white transition-colors z-10"
                  >
                    <X size={16} />
                  </button>

                  <div className="h-48 bg-[#F3F6FA] rounded-3xl p-6 flex flex-col items-center text-center group">
                    <img src={p.images[0]} alt={p.name} className="w-24 h-24 object-cover rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all shadow-lg" />
                    <h3 className="font-serif font-bold text-[#152C60] leading-tight">{p.name}</h3>
                    <p className="text-[#2B5DB6] font-black text-xs mt-1">{formatPrice(p.price)}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="min-h-[120px] p-6 bg-[#F3F6FA]/30 rounded-2xl">
                      {p.benefits.map((b: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-[#152C60] mb-2">
                          <CheckCircle2 size={12} className="text-[#2B5DB6]" />
                          {b}
                        </div>
                      ))}
                    </div>

                    <div className="min-h-[140px] p-6 bg-[#152C60]/5 rounded-2xl">
                      {Object.entries(p.nutrition).map(([key, val]: any) => (
                        <div key={key} className="flex justify-between items-center text-[10px] font-black uppercase mb-2 last:mb-0">
                          <span className="text-[#152C60]/40">{key}</span>
                          <span className="text-[#2B5DB6]">{val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 bg-[#152C60] text-white rounded-2xl">
                      <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-[#F3F6FA]/40 mb-2">
                        <ShieldCheck size={10} /> Selo Laboratorial
                      </div>
                      <p className="text-[10px] font-medium leading-relaxed">{p.science_seal}</p>
                    </div>

                    <div className="pt-4">
                       <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                          <div className="flex items-center gap-2 text-[#2B5DB6] mb-1">
                             <Sparkles size={14} />
                             <span className="text-[10px] font-black uppercase">Sofia Insight</span>
                          </div>
                          <p className="text-[9px] text-[#152C60]/60 font-medium italic leading-relaxed">
                            "{p.ai_insight.slice(0, 80)}..."
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More Placeholder */}
              {products.length < 3 && (
                <div className="flex items-center justify-center border-2 border-dashed border-[#152C60]/10 rounded-[3rem] h-[600px] mt-12 bg-[#F3F6FA]/30">
                   <div className="text-center group cursor-pointer" onClick={onClose}>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#152C60]/20 group-hover:text-[#2B5DB6] transition-colors shadow-sm">
                        <X size={24} className="rotate-45" />
                      </div>
                      <p className="text-[10px] font-black uppercase text-[#152C60]/30 tracking-widest">Adicionar Fórmula</p>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
