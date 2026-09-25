/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CurtivoProvider, useCurtivo } from './context/CurtivoContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { ProductGrid } from './components/ProductGrid';
import { CurtainCustomizer } from './components/CurtainCustomizer';
import { WhyCurtivo } from './components/WhyCurtivo';
import { RoomInspiration } from './components/RoomInspiration';
import { CustomCurtainService } from './components/CustomCurtainService';
import { AboutSection } from './components/AboutSection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { OwnerNotificationToast } from './components/OwnerNotificationToast';
import { SearchModal } from './components/SearchModal';

const StorefrontContent: React.FC = () => {
  const { activeProductModal, setActiveProductModal } = useCurtivo();

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#30251D] flex flex-col font-sans selection:bg-[#D8C7B2] selection:text-[#30251D]">
      
      {/* Top Sticky Header */}
      <Header />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Shop by Collection */}
        <Collections />

        {/* 3. Featured Products Grid */}
        <ProductGrid />

        {/* 4. Dedicated Curtain Customizer Studio */}
        <CurtainCustomizer />

        {/* 5. Why CURTIVO? */}
        <WhyCurtivo />

        {/* 6. Room Inspiration Lookbook */}
        <RoomInspiration />

        {/* 7. Custom Curtain Concierge Service */}
        <CustomCurtainService />

        {/* 8. About CURTIVO ("Crafting Better Spaces") */}
        <AboutSection />

        {/* 9. Customer Testimonials */}
        <Testimonials />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductDetailsModal 
        product={activeProductModal} 
        onClose={() => setActiveProductModal(null)} 
      />
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <AdminDashboard />
      <SearchModal />

      {/* Real-time Owner Order Alert Toast & Chime */}
      <OwnerNotificationToast />

    </div>
  );
};

export default function App() {
  return (
    <CurtivoProvider>
      <StorefrontContent />
    </CurtivoProvider>
  );
}
