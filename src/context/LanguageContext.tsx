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
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.club': 'Club Guaraní',
    'nav.store': 'Tienda',
    'nav.concierge': 'GuaranIA',
    'nav.prescription': 'Receta',
    'nav.portal': 'Portal',
    'nav.wishlist': 'Favoritos',
    'nav.orders': 'Pedidos',
    'nav.menu': 'Menú',
    'nav.login': 'Entrar',
    'nav.logout': 'Salir',
    'nav.admin': 'Administración',
    'nav.account': 'Mi Cuenta',
    'nav.login_register': 'Entrar / Registrarse'
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.club': 'Clube Guaraní',
    'nav.store': 'Loja',
    'nav.concierge': 'GuaranIA',
    'nav.prescription': 'Receita',
    'nav.portal': 'Portal',
    'nav.wishlist': 'Favoritos',
    'nav.orders': 'Pedidos',
    'nav.menu': 'Menu',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',
    'nav.admin': 'Administração',
    'nav.account': 'Minha Conta',
    'nav.login_register': 'Entrar / Cadastrar'
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
