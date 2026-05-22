import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, TrendingUp, Star, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

type Filter = 'todo' | 'nuevo' | 'oferta' | 'tendencia' | 'destacado';

interface Highlight {
  emoji: string;
  label: string;
  filter: Filter;
  color: string;
}

const HIGHLIGHTS: Highlight[] = [
  { emoji: '✨', label: 'Todo',       filter: 'todo',      color: '#152C60' },
  { emoji: '🆕', label: 'Nuevos',     filter: 'nuevo',     color: '#2B5DB6' },
  { emoji: '🔥', label: 'Tendencias', filter: 'tendencia', color: '#E84040' },
  { emoji: '⭐', label: 'Destacados', filter: 'destacado', color: '#D4A017' },
  { emoji: '🏷️', label: 'Ofertas',   filter: 'oferta',    color: '#2DB87A' },
];

// Lançamentos: produtos adicionados mais recentemente (IDs mais altos)
const NUEVOS_IDS   = new Set([33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]);
const TENDENCIA_IDS = new Set([6, 9, 11, 16, 20, 41, 43, 46, 52, 53, 55]);
const DESTACADOS_IDS = new Set([1, 5, 14, 15, 16, 25, 40, 43]);
const OFERTA_IDS    = new Set([33, 34, 46, 51, 52, 50]);

function getBadge(id: number): { label: string; color: string; bg: string } | null {
  if (OFERTA_IDS.has(id))     return { label: 'OFERTA',    color: '#fff', bg: '#2DB87A' };
  if (NUEVOS_IDS.has(id))     return { label: 'NUEVO',     color: '#fff', bg: '#2B5DB6' };
  if (TENDENCIA_IDS.has(id))  return { label: 'TENDENCIA', color: '#fff', bg: '#E84040' };
  if (DESTACADOS_IDS.has(id)) return { label: 'DESTACADO', color: '#fff', bg: '#D4A017' };
  return null;
}

function matchesFilter(id: number, filter: Filter): boolean {
  if (filter === 'todo')      return true;
  if (filter === 'nuevo')     return NUEVOS_IDS.has(id);
  if (filter === 'tendencia') return TENDENCIA_IDS.has(id);
  if (filter === 'destacado') return DESTACADOS_IDS.has(id);
  if (filter === 'oferta')    return OFERTA_IDS.has(id);
  return false;
}

export default function Novedades() {
  const [activeFilter, setActiveFilter] = useState<Filter>('todo');
  const { addToCart } = useCart();
  const { formatPrice } = useLanguage();

  const filtered = PRODUCTS.filter(p => matchesFilter(p.id, activeFilter));

  const filterIcon = (f: Filter) => {
    if (f === 'tendencia') return <Flame size={14} />;
    if (f === 'destacado') return <Star size={14} />;
    if (f === 'nuevo')     return <Sparkles size={14} />;
    if (f === 'oferta')    return <Tag size={14} />;
    return <TrendingUp size={14} />;
  };

  return (
    <div className="bg-[#F3F6FA] min-h-screen pt-20 md:pt-24 pb-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B5DB6]/10 text-[#2B5DB6] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Últimas novedades
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#152C60] leading-tight">
            Lo que está<br className="md:hidden" /> pasando ahora
          </h1>
          <p className="text-[#152C60]/60 mt-2 font-medium max-w-xl">
            Nuevos lanzamientos, tendencias en suplementación y los más elegidos de la semana.
          </p>
        </motion.div>
      </div>

      {/* Highlights — scroll horizontal estilo stories */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {HIGHLIGHTS.map((h) => {
            const active = activeFilter === h.filter;
            return (
              <motion.button
                key={h.filter}
                onClick={() => setActiveFilter(h.filter)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 shadow-sm"
                  style={{
                    background: active ? h.color : '#fff',
                    border: active ? `3px solid ${h.color}` : '3px solid #e5e7eb',
                    boxShadow: active ? `0 0 0 2px #fff, 0 0 0 4px ${h.color}` : undefined,
                  }}
                >
                  {h.emoji}
                </div>
                <span
                  className="text-[10px] font-black uppercase tracking-wide"
                  style={{ color: active ? h.color : '#152C60' }}
                >
                  {h.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Filter pill bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6">
        <div className="flex gap-2 flex-wrap">
          {HIGHLIGHTS.map((h) => {
            const active = activeFilter === h.filter;
            return (
              <button
                key={h.filter}
                onClick={() => setActiveFilter(h.filter)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200"
                style={{
                  background: active ? h.color : '#fff',
                  color:      active ? '#fff'   : '#152C60',
                  border: `2px solid ${active ? h.color : '#e5e7eb'}`,
                }}
              >
                {filterIcon(h.filter)} {h.label}
                {active && <span className="ml-1 opacity-70">({filtered.length})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((product, i) => {
              const badge = getBadge(product.id);
              const img = product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800';

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  {/* Imagem */}
                  <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden bg-[#F3F6FA]">
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {badge && (
                      <span
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                        style={{ background: badge.bg, color: badge.color }}
                      >
                        {badge.label}
                      </span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="p-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#2B5DB6]/70">
                      {product.category}
                    </span>
                    <Link to={`/produto/${product.id}`}>
                      <h3 className="text-[13px] font-black text-[#152C60] leading-tight mt-0.5 line-clamp-2 hover:text-[#2B5DB6] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-[#152C60]/50 mt-0.5 line-clamp-1">
                      {product.desc}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[13px] font-black text-[#152C60]">
                        {formatPrice(product.price)}
                      </span>
                      <div className="flex gap-1.5">
                        <Link
                          to={`/produto/${product.id}`}
                          className="p-1.5 rounded-lg bg-[#F3F6FA] hover:bg-[#152C60]/10 transition-colors"
                        >
                          <ArrowRight size={14} className="text-[#152C60]" />
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-1.5 rounded-lg bg-[#152C60] hover:bg-[#2B5DB6] transition-colors"
                        >
                          <ShoppingBag size={14} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#152C60]/40">
            <Sparkles size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-black uppercase tracking-widest text-[12px]">Pronto vienen más novedades</p>
          </div>
        )}
      </div>

      {/* CTA banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="bg-[#152C60] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Catálogo completo</p>
            <h2 className="text-2xl font-serif font-black text-white">
              55 fórmulas activas disponibles
            </h2>
            <p className="text-white/60 text-sm mt-1">Manipuladas con materia prima certificada en Asunción, Paraguay.</p>
          </div>
          <Link
            to="/loja"
            className="flex-shrink-0 px-8 py-4 bg-white text-[#152C60] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#F3F6FA] transition-colors flex items-center gap-2"
          >
            Ver tienda <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
