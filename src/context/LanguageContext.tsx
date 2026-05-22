import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatPrice: (priceStr: string) => string;
}

const translations = {
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.club': 'Club Guaraní',
    'nav.store': 'Tienda',
    'nav.concierge': 'GuaranIA',
    'nav.prescription': 'Receta',
    'nav.portal': 'Portal',
    'nav.novedades': 'Novedades',
    'nav.wishlist': 'Favoritos',
    'nav.orders': 'Pedidos',
    'nav.menu': 'Menú',
    'nav.login': 'Entrar',
    'nav.logout': 'Salir',
    'nav.admin': 'Administración',
    'nav.account': 'Mi Cuenta',
    'nav.login_register': 'Entrar / Registrarse',
    // Loja
    'store.title': 'Tienda',
    'store.search': 'Buscar fórmulas...',
    'store.all': 'Todos',
    'store.inStock': 'En stock',
    'store.outOfStock': 'Sin stock',
    'store.addToCart': 'Agregar',
    'store.seeMore': 'Ver más',
    'store.price': 'Precio',
    'store.category': 'Categoría',
    // Produto
    'product.benefits': 'Beneficios',
    'product.ingredients': 'Ingredientes',
    'product.howToUse': 'Modo de uso',
    'product.crossSell': 'Complementa con',
    'product.upsell': 'Versión premium',
    'product.addToCart': 'Agregar al carrito',
    'product.addToWishlist': 'Guardar',
    'product.inStock': 'Disponible',
    'product.prescription': 'Requiere consulta',
    // Checkout
    'cart.title': 'Tu carrito',
    'cart.empty': 'Tu carrito está vacío',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar pedido',
    'cart.continue': 'Seguir comprando',
    // Geral
    'common.close': 'Cerrar',
    'common.back': 'Volver',
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.success': '¡Listo!',
  },
  pt: {
    // Nav
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.club': 'Clube Guaraní',
    'nav.store': 'Loja',
    'nav.concierge': 'GuaranIA',
    'nav.prescription': 'Receita',
    'nav.portal': 'Portal',
    'nav.novedades': 'Novidades',
    'nav.wishlist': 'Favoritos',
    'nav.orders': 'Pedidos',
    'nav.menu': 'Menu',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',
    'nav.admin': 'Administração',
    'nav.account': 'Minha Conta',
    'nav.login_register': 'Entrar / Cadastrar',
    // Loja
    'store.title': 'Loja',
    'store.search': 'Buscar fórmulas...',
    'store.all': 'Todos',
    'store.inStock': 'Em estoque',
    'store.outOfStock': 'Sem estoque',
    'store.addToCart': 'Adicionar',
    'store.seeMore': 'Ver mais',
    'store.price': 'Preço',
    'store.category': 'Categoria',
    // Produto
    'product.benefits': 'Benefícios',
    'product.ingredients': 'Ingredientes',
    'product.howToUse': 'Modo de uso',
    'product.crossSell': 'Combina com',
    'product.upsell': 'Versão premium',
    'product.addToCart': 'Adicionar ao carrinho',
    'product.addToWishlist': 'Salvar',
    'product.inStock': 'Disponível',
    'product.prescription': 'Requer consulta',
    // Checkout
    'cart.title': 'Seu carrinho',
    'cart.empty': 'Seu carrinho está vazio',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar pedido',
    'cart.continue': 'Continuar comprando',
    // Geral
    'common.close': 'Fechar',
    'common.back': 'Voltar',
    'common.loading': 'Carregando...',
    'common.error': 'Ocorreu um erro',
    'common.success': 'Pronto!',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('site_language');
    if (saved === 'es' || saved === 'pt') return saved;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('pt')) return 'pt';
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('site_language', lang);
  };

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  const formatPrice = (priceStr: string) => {
    if (!priceStr) return priceStr;
    const priceNum = parseInt(priceStr.replace(/[^\d]/g, ''));
    if (isNaN(priceNum)) return priceStr;

    if (language === 'pt') {
      const brlValue = priceNum / 1350; // Conversão estimada 1 BRL = 1350 Gs
      return `R$ ${brlValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
    // Default (Spanish/Guaranies)
    if (!priceStr.includes('Gs')) {
         return `${priceNum.toLocaleString('es-PY')} Gs`;
    }
    return priceStr;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
