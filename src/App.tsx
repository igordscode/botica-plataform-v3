/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import Assistant from './pages/Assistant';
import Portal from './pages/Portal';
import ArticleDetail from './pages/ArticleDetail';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Prescription from './pages/Prescription';
import About from './pages/About';
import Account from './pages/Account';
import Clube from './pages/Clube';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import DoctorProfile from './pages/DoctorProfile';
import PrescriberDashboard from './pages/PrescriberDashboard';
import RxBuilder from './pages/RxBuilder';
import PatientDashboard from './pages/PatientDashboard';
import Messages from './pages/Messages';
import Community from './pages/Community';
import Roadmap from './pages/Roadmap';
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
  const location = useLocation();
  const isAssistant = location.pathname === '/assistente';
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
    <div className={`min-h-[100dvh] bg-[#F3F6FA] text-[#152C60] font-sans selection:bg-[#2B5DB6] selection:text-white relative ${isAssistant ? '' : 'pb-20 md:pb-0'}`}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/artigo/:id" element={<ArticleDetail />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/favoritos" element={<Wishlist />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/assistente" element={<Assistant />} />
          <Route path="/receita" element={<Prescription />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/conta" element={<Account />} />
          <Route path="/clube" element={<Clube />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dr/:id" element={<DoctorProfile />} />
          <Route path="/prescritor" element={<PrescriberDashboard />} />
          <Route path="/prescritor/rx-builder" element={<RxBuilder />} />
          <Route path="/paciente" element={<PatientDashboard />} />
          <Route path="/mensagens" element={<Messages />} />
          <Route path="/comunidade" element={<Community />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/novedades" element={<Novedades />} />
        </Routes>
      </main>
      {!isAssistant && <Footer />}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {!isAssistant && <FloatingActions />}
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
