import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Package, Truck, CheckCircle2, Clock, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter mb-4 text-[#152C60]">
            MEUS <span className="text-[#2B5DB6]">PEDIDOS</span>
          </h1>
          <p className="text-[#152C60]/60 italic font-medium">Acompanhe sua jornada em direção à alta performance.</p>
        </header>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] p-8 border border-[#152C60]/5 shadow-xl hover:border-[#2B5DB6]/20 transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#152C60]/20">Pedido #{order.id.slice(0, 8)}</span>
                    <h3 className="text-xl font-bold text-[#152C60]">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString('pt-PY', { day: '2-digit', month: 'long', year: 'numeric' })}</h3>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-[#F3F6FA] rounded-2xl border border-[#152C60]/5">
                    {getStatusIcon(order.status)}
                    <span className="text-xs font-black uppercase tracking-widest text-[#152C60]">{getStatusLabel(order.status)}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-end">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                      {order.items?.slice(0, 3).map((item: any, idx: number) => (
                        <div key={idx} className="w-12 h-12 rounded-full border-2 border-white bg-[#F3F6FA] flex items-center justify-center text-[10px] font-bold overflow-hidden">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <div className="w-12 h-12 rounded-full border-2 border-white bg-[#152C60] text-white flex items-center justify-center text-[10px] font-bold">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-medium text-[#152C60]/60">
                      {order.items?.length} item(s) • <span className="font-bold text-[#152C60]">{order.total}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2B5DB6] group-hover:gap-4 transition-all">
                      Ver Detalhes <ChevronRight size={16} />
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
              <h3 className="text-3xl font-serif font-black uppercase text-[#152C60]">Nenhum pedido ainda</h3>
              <p className="text-[#152C60]/60 italic max-w-sm mx-auto leading-relaxed">
                Você ainda não realizou pedidos conosco. Comece agora sua transformação pessoal.
              </p>
            </div>
            <Link to="/loja" className="inline-flex items-center gap-3 px-8 py-4 bg-[#2B5DB6] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#5C88DA] transition-all shadow-xl shadow-[#2B5DB6]/20">
              Fazer Primeiro Pedido <ShoppingBag size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
