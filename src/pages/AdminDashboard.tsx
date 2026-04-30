import React from 'react';
import { Package, Users, Activity, ShoppingBag } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="bg-[#F3F6FA] text-[#152C60] font-sans pb-32">
      
      <main className="max-w-7xl mx-auto px-6 py-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-4">
            Painel <span className="text-[#2B5DB6]">Administrativo</span>
          </h1>
          <p className="text-[#152C60]/60 font-medium">Gestão integrada da Botica Guaraní.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Receitas Pendentes', value: '12', icon: <Activity size={24} />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Pedidos Hoje', value: '45', icon: <Package size={24} />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Assinantes Clube', value: '892', icon: <Users size={24} />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'Receita Mensal', value: 'R$ 142k', icon: <ShoppingBag size={24} />, color: 'text-green-500', bg: 'bg-green-500/10' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-[#152C60]/5 shadow-xl flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 mb-1">{stat.label}</p>
                <p className="text-2xl font-serif font-black text-[#152C60]">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#152C60]/5 shadow-xl">
          <h3 className="text-lg font-serif font-black text-[#152C60] uppercase mb-6">Últimas Solicitações</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#152C60]/5">
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">Cliente</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">Tipo</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">Data</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">Status</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#152C60]/40">Ação</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'João Silva', type: 'Envio de Receita', date: 'Hoje, 10:45', status: 'Pendente', badge: 'bg-orange-500/10 text-orange-600' },
                  { name: 'Maria Santos', type: 'Assinatura Prime', date: 'Hoje, 09:20', status: 'Ativo', badge: 'bg-green-500/10 text-green-600' },
                  { name: 'Carlos Ferreira', type: 'Pedido #4829', date: 'Ontem, 16:30', status: 'Em Preparo', badge: 'bg-blue-500/10 text-blue-600' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#152C60]/5 last:border-0">
                    <td className="py-4 font-bold text-sm">{row.name}</td>
                    <td className="py-4 text-sm text-[#152C60]/60">{row.type}</td>
                    <td className="py-4 text-sm text-[#152C60]/60">{row.date}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${row.badge}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6] hover:underline">
                        Analisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
