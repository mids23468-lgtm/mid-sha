import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  MessageSquare, 
  ArrowRight, 
  Compass, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const Footer: React.FC = () => {
  const { 
    scrollToSection, 
    setSelectedCategory, 
    openCustomizerStudio, 
    openTrackingWithId, 
    setIsAdminOpen,
    storeSettings 
  } = useCurtivo();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#241A14] text-[#F5EFE6] border-t border-[#43352A]">
      
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-col">
              <span className="font-heading text-3xl sm:text-4xl tracking-[0.25em] text-[#F5EFE6] uppercase font-normal">
                CURTIVO
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B9A187] font-semibold mt-1">
                Curtains for a Better Tomorrow
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#D8C7B2]/75 leading-relaxed font-light max-w-sm">
              Architectural curtains and bespoke drapery handcrafted from European flax and organic fibers. Transform your spaces with timeless beauty and quiet serenity.
            </p>

            <div className="pt-2 text-xs text-[#92785B] space-y-1">
              <div>{storeSettings.address}</div>
              <div>Tel: {storeSettings.phone}</div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#43352A] hover:border-[#D8C7B2] flex items-center justify-center text-[#D8C7B2] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#43352A] hover:border-[#D8C7B2] flex items-center justify-center text-[#D8C7B2] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${storeSettings.ownerWhatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#43352A] hover:border-[#D8C7B2] flex items-center justify-center text-[#D8C7B2] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D8C7B2]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8C7B2]/80 font-light">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    scrollToSection('featured-products');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Curtains
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('collections')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button 
                  onClick={openCustomizerStudio} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About CURTIVO
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Atelier
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openTrackingWithId('')} 
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Compass className="w-3 h-3 text-[#B9A187]" />
                  <span>Track Live Order</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D8C7B2]">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8C7B2]/80 font-light">
              <li>
                <button 
                  onClick={() => scrollToSection('faqs')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Lead Times
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faqs')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  14-Day Returns & Exchanges
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faqs')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('custom-curtains')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Measuring Concierge
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('inspiration')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Architectural Lookbook
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsAdminOpen(true)} 
                  className="hover:text-white text-[#B9A187] transition-colors cursor-pointer flex items-center gap-1.5 pt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin & Owner Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D8C7B2]">
              Newsletter
            </h4>
            <p className="text-xs text-[#D8C7B2]/75 font-light leading-relaxed">
              Get inspiration, new arrivals and exclusive offers directly from the CURTIVO atelier.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#30251D] border border-[#B9A187]/40 text-xs text-[#D8C7B2] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for joining our private guild.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full p-3 pr-10 bg-[#30251D] border border-[#43352A] text-xs text-white placeholder-[#92785B] focus:outline-none focus:border-[#D8C7B2]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1.5 text-[#D8C7B2] hover:text-white cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-[#92785B]">We respect your sanctuary. Unsubscribe at any time.</p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Legal Line */}
        <div className="mt-16 pt-8 border-t border-[#43352A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#92785B]">
          <p>© 2026 CURTIVO. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>White-Glove Installation Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
