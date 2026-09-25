import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ShieldCheck, 
  Compass, 
  Scissors, 
  PhoneCall,
  Bell
} from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    setIsAdminOpen,
    unreadNotificationsCount,
    scrollToSection,
    setSelectedCategory,
    openCustomizerStudio,
    openTrackingWithId
  } = useCurtivo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', action: () => scrollToSection('hero') },
    { 
      label: 'Curtains', 
      action: () => {
        setSelectedCategory('All');
        scrollToSection('featured-products');
      } 
    },
    { 
      label: 'Sheer Curtains', 
      action: () => {
        setSelectedCategory('Sheer Curtains');
        scrollToSection('featured-products');
      } 
    },
    { 
      label: 'Blackout Curtains', 
      action: () => {
        setSelectedCategory('Blackout Curtains');
        scrollToSection('featured-products');
      } 
    },
    { 
      label: 'Premium Collection', 
      action: () => {
        setSelectedCategory('Luxury Collection');
        scrollToSection('featured-products');
      } 
    },
    { label: 'Custom Studio', action: openCustomizerStudio },
    { label: 'About Us', action: () => scrollToSection('about') },
    { label: 'Contact', action: () => scrollToSection('contact') },
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#30251D] text-[#F5EFE6] text-xs py-2 px-4 border-b border-[#43352A] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-[11px] md:text-xs tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="font-medium text-[#D8C7B2]">Complimentary White-Glove Measuring & Delivery</span>
            <span className="hidden sm:inline text-[#92785B]">·</span>
            <span className="hidden sm:inline text-[#D8C7B2]/80">Orders above ₹3,000</span>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => openTrackingWithId('')}
              className="text-[#D8C7B2] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
            <span className="text-[#92785B]">·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#D8C7B2] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
              title="CURTIVO Order Management & Owner Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B9A187]" />
              <span>Owner Portal</span>
              {unreadNotificationsCount > 0 && (
                <span className="bg-[#B9A187] text-[#30251D] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F5EFE6]/95 backdrop-blur-md shadow-sm border-b border-[#D8C7B2]/50 py-3.5' 
            : 'bg-[#F5EFE6] border-b border-[#D8C7B2]/30 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: CURTIVO Brand Mark & Identity */}
            <div className="flex items-center">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-left group cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-heading text-2xl sm:text-3xl tracking-[0.25em] text-[#30251D] font-medium uppercase group-hover:text-[#92785B] transition-colors">
                    CURTIVO
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[#92785B] font-semibold -mt-0.5">
                    Curtains for a Better Tomorrow
                  </span>
                </div>
              </button>
            </div>

            {/* Center Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-xs tracking-[0.14em] uppercase text-[#30251D]/80 hover:text-[#30251D] hover:underline underline-offset-8 decoration-[#B9A187] transition-all font-medium cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart, Mobile Menu) */}
            <div className="flex items-center space-x-3 sm:space-x-5 text-[#30251D]">
              
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-[#92785B] transition-colors cursor-pointer"
                aria-label="Search curtains"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  scrollToSection('featured-products');
                }}
                className="p-2 relative hover:text-[#92785B] transition-colors cursor-pointer hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#92785B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 relative hover:text-[#92785B] transition-colors cursor-pointer"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#30251D] text-[#F5EFE6] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin Dashboard shortcut icon for desktop */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 border border-[#30251D]/20 text-[11px] tracking-wider uppercase text-[#30251D] hover:bg-[#30251D] hover:text-[#F5EFE6] transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#30251D] hover:text-[#92785B] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[1.5]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[1.5]" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#F5EFE6] border-b border-[#D8C7B2] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm tracking-wider uppercase text-[#30251D] hover:text-[#92785B] border-b border-[#D8C7B2]/40 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#D8C7B2] flex flex-col gap-3">
              <button
                onClick={() => {
                  openCustomizerStudio();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#30251D] text-[#F5EFE6] py-3 text-xs tracking-widest uppercase font-medium hover:bg-[#43352A]"
              >
                <Scissors className="w-4 h-4" />
                <span>Custom Curtain Studio</span>
              </button>

              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 border border-[#30251D] text-[#30251D] py-2.5 text-xs tracking-widest uppercase font-medium hover:bg-[#30251D] hover:text-[#F5EFE6]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>CURTIVO Owner Dashboard</span>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-[#92785B] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {unreadNotificationsCount} new
                  </span>
                )}
              </button>

              <div className="flex justify-between items-center pt-2 text-xs text-[#92785B]">
                <button 
                  onClick={() => {
                    openTrackingWithId('');
                    setIsMobileMenuOpen(false);
                  }}
                  className="hover:underline flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Track Live Order
                </button>
                <a href="tel:+919820012345" className="hover:underline flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Client Concierge
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
