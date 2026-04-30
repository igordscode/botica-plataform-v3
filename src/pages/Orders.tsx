import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Package, Truck, CheckCircle2, Clock, MapPin, ChevronRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, setIsCartOpen } = useCart();

  const handleReorder = (order: any) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach((item: any) => {
        addToCart(item);
      });
      setIsCartOpen(true);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'orders'), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Clock className="text-amber-500" size={20} />;
      case 'shipped': return <Truck className="text-blue-500" size={20} />;
      case 'delivered': return <CheckCircle2 className="text-green-500" size={20} />;
      default: return <Package className="text-[#152C60]/40" size={20} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'processing': return 'Em Processamento';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F6FA]">
        <div className="w-12 h-12 border-4 border-[#2B5DB6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-24 bg-[#F3F6FA] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter mb-4 text-[#152C60]">
              MEUS <span className="text-[#2B5DB6]">TRATAMENTOS</span>
            </h1>
            <p className="text-[#152C60]/60 italic font-medium">Acompanhe seu histórico de fórmulas e protocolos.</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#152C60] to-[#2B5DB6] p-1 rounded-2xl shadow-xl w-fit">
            <div className="bg-[#152C60] px-6 py-4 rounded-xl flex items-center gap-4 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">Clube Guaraní</div>
                <div className="text-white font-bold text-sm">Nível <span className="text-amber-400">Ouro</span></div>
              </div>
            </div>
          </div>
        </header>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] p-8 border border-[#152C60]/5 shadow-xl hover:border-[#2B5DB6]/20 transition-all group relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#2B5DB6]/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 relative z-10">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#152C60]/40">Fórmula #{order.id.slice(0, 8)}</span>
                    <h3 className="text-xl font-bold text-[#152C60]">{new Date(order.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString('pt-PY', { day: '2-digit', month: 'long', year: 'numeric' })}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-3 px-6 py-3 bg-[#F3F6FA] rounded-2xl border border-[#152C60]/5">
                      {getStatusIcon(order.status)}
                      <span className="text-xs font-black uppercase tracking-widest text-[#152C60]">{getStatusLabel(order.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-center bg-[#F3F6FA]/50 p-6 rounded-3xl border border-[#152C60]/5 relative z-10">
                  <div className="md:col-span-5 flex items-center gap-4">
                    <div className="flex -space-x-4">
                      {order.items?.length > 0 ? order.items.slice(0, 3).map((item: any, idx: number) => (
                        <div key={idx} className="w-14 h-14 rounded-full border-2 border-white bg-white flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-sm">
                          <img src={item.image} alt="" className="w-full h-full object-contain p-2" />
                        </div>
                      )) : (
                        <div className="w-14 h-14 rounded-full border-2 border-white bg-[#2B5DB6]/10 text-[#2B5DB6] flex items-center justify-center shadow-sm">
                          <Package size={20} />
                        </div>
                      )}
                      {(order.items?.length || 0) > 3 && (
                        <div className="w-14 h-14 rounded-full border-2 border-white bg-[#152C60] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#152C60] mb-1">
                        {order.items?.[0]?.name || 'Fórmula Manipulada'} {(order.items?.length || 0) > 1 && `+${order.items.length - 1}`}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6]">
                        {order.total || 'R$ 0,00'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-4 flex flex-col gap-1 border-t md:border-t-0 md:border-l border-[#152C60]/10 pt-4 md:pt-0 md:pl-8">
                     <span className="text-[9px] font-black uppercase tracking-widest text-[#152C60]/40">Status Logístico</span>
                     <div className="flex items-center gap-2 text-xs font-bold text-[#152C60]">
                       <MapPin size={14} className="text-[#2B5DB6]" />
                       {order.status === 'delivered' ? 'Entregue em sua residência' :
                        order.status === 'shipped' ? 'Em rota de entrega' :
                        'Sintetizando em laboratório'}
                     </div>
                     {order.trackingCode && (
                       <span className="text-[10px] font-medium text-[#152C60]/60 mt-1">Rastreio: {order.trackingCode}</span>
                     )}
                  </div>

                  <div className="md:col-span-3 flex justify-end gap-3 mt-4 md:mt-0">
                    <button 
                      onClick={() => handleReorder(order)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-[#152C60] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] transition-all shadow-xl shadow-[#152C60]/20"
                    >
                      Repetir Fórmula
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-8 bg-white/50 rounded-[4rem] border border-[#152C60]/5">
            <div className="w-24 h-24 bg-[#152C60]/5 rounded-full flex items-center justify-center mx-auto">
              <Package size={40} className="text-[#152C60]/10" />
            </div>
            <div className="space-y-4 px-6">
              <h3 className="text-3xl font-serif font-black uppercase text-[#152C60]">Nenhum tratamento ainda</h3>
              <p className="text-[#152C60]/60 italic max-w-sm mx-auto leading-relaxed">
                Você ainda não iniciou sua jornada conosco. Comece agora sua transformação pessoal.
              </p>
            </div>
            <Link to="/loja" className="inline-flex items-center gap-3 px-8 py-4 bg-[#2B5DB6] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#5C88DA] transition-all shadow-xl shadow-[#2B5DB6]/20">
              Iniciar Primeiro Tratamento <ShoppingBag size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
