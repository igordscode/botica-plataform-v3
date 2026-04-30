import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Receipt, MapPin, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: Entrega, 3: Pagamento, 4: Sucesso

  const total = cart.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-[#F3F6FA] flex flex-col items-center justify-center p-6 pb-32 pt-32">
        <Receipt size={64} className="text-[#152C60]/10 mb-6" />
        <h2 className="text-2xl font-serif font-black text-[#152C60] mb-2 uppercase">Checkout Vazio</h2>
        <p className="text-[#152C60]/60 mb-8 max-w-sm text-center">Seu cesto magistral está vazio. Adicione fórmulas antes de proceder.</p>
        <button onClick={() => navigate('/loja')} className="bg-[#152C60] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-colors">
          Explorar Fórmulas
        </button>
      </div>
    );
  }

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  return (
    <div className="bg-[#F3F6FA] min-h-screen pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        {step < 4 && (
          <Link to="/loja" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 hover:text-[#152C60] mb-8 transition-colors">
            <ArrowLeft size={14} /> Voltar para a Loja
          </Link>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 4 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[3rem] text-center shadow-xl border border-[#152C60]/5"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-4xl font-serif font-black uppercase tracking-tighter text-[#152C60] mb-4">Pedido Confirmado</h2>
                <p className="text-[#152C60]/60 mb-8 max-w-md mx-auto">Sua requisição magistral foi recebida pelo nosso laboratório. Um número de rastreio será enviado para seu e-mail.</p>
                <div className="p-6 bg-[#F3F6FA] rounded-2xl inline-block mb-8 text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 mb-1">Protocolo</p>
                  <p className="font-mono text-xl font-bold text-[#152C60]">#BG-{Math.floor(Math.random() * 100000)}</p>
                </div>
                <br />
                <button 
                  onClick={() => navigate('/')}
                  className="bg-[#152C60] text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-colors"
                >
                  Voltar ao Início
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-12">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest mb-8">
                    <span className={step >= 1 ? "text-[#2B5DB6]" : "text-[#152C60]/20"}>1. Identificação</span>
                    <span className="w-12 h-px bg-[#152C60]/10"></span>
                    <span className={step >= 2 ? "text-[#2B5DB6]" : "text-[#152C60]/20"}>2. Entrega</span>
                    <span className="w-12 h-px bg-[#152C60]/10"></span>
                    <span className={step >= 3 ? "text-[#2B5DB6]" : "text-[#152C60]/20"}>3. Pagamento</span>
                  </div>
                  <h1 className="text-4xl leading-none font-serif font-black uppercase tracking-tighter text-[#152C60]">
                    {step === 1 && "Seus Dados"}
                    {step === 2 && "Endereço de Entrega"}
                    {step === 3 && "Pagamento"}
                  </h1>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-[#152C60]/5">
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Nome Completo</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="Ex: João da Silva" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Documento (CI/CPF)</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="Número do documento" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">E-mail</label>
                        <input type="email" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="seu@email.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Telefone / WhatsApp</label>
                        <input type="tel" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="+595 9XX XXX XXX" />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">CEP / Código Postal</label>
                        <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="0000-000" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Endereço</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="Rua, Avenida..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Número</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="123" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Bairro</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="Centro" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Cidade</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="Ciudad del Este" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-[#2B5DB6] bg-[#2B5DB6]/5 text-[#152C60]">
                          <CreditCard size={24} className="text-[#2B5DB6]" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Cartão</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-[#152C60]/5 hover:border-[#152C60]/20 text-[#152C60]/40 hover:text-[#152C60] transition-colors">
                          <Receipt size={24} />
                          <span className="text-[10px] font-black uppercase tracking-widest">PIX / Transferência</span>
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Número do Cartão</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Validade</label>
                            <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="MM/AA" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">CVV</label>
                            <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60">Nome no Cartão</label>
                          <input type="text" className="w-full bg-[#F3F6FA] border-transparent focus:border-[#2B5DB6] focus:ring-0 rounded-2xl px-6 py-4 outline-none font-medium text-[#152C60] transition-colors" placeholder="Como impresso no cartão" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-12 flex justify-between items-center pt-8 border-t border-[#152C60]/5">
                    {step > 1 ? (
                      <button 
                        onClick={() => setStep(prev => prev - 1)}
                        className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 hover:text-[#152C60] transition-colors px-6 py-4"
                      >
                        Voltar
                      </button>
                    ) : (
                      <div></div>
                    )}
                    <button 
                      onClick={handleNext}
                      className="bg-[#152C60] text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-colors shadow-xl shadow-[#152C60]/10"
                    >
                      {step === 3 ? "Finalizar Pedido" : "Continuar"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Checkout SummarySidebar */}
          {step < 4 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-[#152C60]/5 sticky top-32">
                <h3 className="font-serif font-black uppercase tracking-tighter text-xl text-[#152C60] mb-6">Resumo da Ordem</h3>
                
                <div className="space-y-6 mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F3F6FA] shrink-0 border border-[#152C60]/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#152C60] leading-tight mb-1">{item.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 mb-1">Qtd: {item.quantity}</p>
                        <p className="text-xs font-bold text-[#2B5DB6]">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-[#152C60]/5">
                  <div className="flex justify-between text-sm font-medium text-[#152C60]/60">
                    <span>Subtotal</span>
                    <span>{total.toLocaleString('es-PY')} Gs</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-[#152C60]/60">
                    <span>Frete</span>
                    {step >= 2 ? <span className="text-[#152C60]">25.000 Gs</span> : <span className="text-[#152C60]/40">A calcular</span>}
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-[#152C60]/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">Total Final</span>
                    <span className="text-2xl font-serif font-black text-[#152C60]">
                      {(total + (step >= 2 ? 25000 : 0)).toLocaleString('es-PY')} Gs
                    </span>
                  </div>
                </div>

                <div className="mt-8 bg-[#F3F6FA] rounded-2xl p-4 flex gap-4 items-start">
                   <div className="text-[#2B5DB6] shrink-0 mt-0.5">
                     <Receipt size={16} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/60 leading-relaxed">
                     Ambiente de pagamento 100% seguro com encriptação AES-256. Suas informações não são armazenadas.
                   </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
