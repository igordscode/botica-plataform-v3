/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import Assistant from './pages/Assistant';
import Portal from './pages/Portal';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Prescription from './pages/Prescription';
import About from './pages/About';
import Account from './pages/Account';
import Clube from './pages/Clube';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingActions from './components/FloatingActions';
import { initGA, trackPageView } from './services/analytics';
import { CartProvider, useCart } from './context/CartContext';

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
  
  return (
    <div className="min-h-screen bg-[#F3F6FA] text-[#152C60] font-sans selection:bg-[#2B5DB6] selection:text-white relative">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/portal" element={<Portal />} />
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
      <CartProvider>
        <PageTracker />
        <AppContent />
      </CartProvider>
    </Router>
  );
}
