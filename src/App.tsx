/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import Prescription from './pages/Prescription';
import About from './pages/About';
import Novedades from './pages/Novedades';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingActions from './components/FloatingActions';
import { SiteLoader } from './components/SiteLoader';
import { initGA, trackPageView } from './services/analytics';
import { CartProvider, useCart } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function AppContent() {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [isEntering, setIsEntering] = useState(() => {
    return sessionStorage.getItem('siteIntroShown') !== 'true';
  });

  const handleLoaderComplete = () => {
    setIsEntering(false);
    sessionStorage.setItem('siteIntroShown', 'true');
  };

  if (isEntering) {
    return <SiteLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-[100dvh] bg-[#F3F6FA] text-[#152C60] font-sans selection:bg-[#2B5DB6] selection:text-white relative pb-20 md:pb-0">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/receita" element={<Prescription />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/novedades" element={<Novedades />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <LanguageProvider>
        <CartProvider>
          <PageTracker />
          <AppContent />
        </CartProvider>
      </LanguageProvider>
    </Router>
  );
}
