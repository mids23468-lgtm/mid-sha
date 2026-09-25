import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';
import { ASSET_IMAGES } from '../data/mockData';

export const Hero: React.FC = () => {
  const { scrollToSection } = useCurtivo();

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center bg-[#F5EFE6] overflow-hidden">
      {/* Background Hero Image with refined gradient treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="CURTIVO Luxury Living Room Drapery"
          className="w-full h-full object-cover object-center transform scale-[1.02] transition-transform duration-1000 ease-out"
        />
        {/* Soft natural sunlight vignette & warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6]/92 via-[#F5EFE6]/70 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5EFE6] via-transparent to-transparent h-40 bottom-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          
          {/* Subtle Editorial Kicker */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold">
            <span className="w-8 h-px bg-[#B9A187]"></span>
            <span>Artisanal Drapery & Architectural Curtains</span>
          </div>

          {/* Brand Name Headline */}
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#30251D] font-normal leading-[1.05] mb-4">
            CURTIVO
          </h1>

          {/* Brand Tagline */}
          <p className="font-heading italic text-2xl sm:text-3xl lg:text-4xl text-[#92785B] tracking-wide mb-6 font-light">
            “Curtains for a Better Tomorrow”
          </p>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#30251D]/80 leading-relaxed font-light mb-10 max-w-xl">
            Elegant curtains designed to transform your spaces with comfort, character and timeless beauty. Handcrafted with European flax, organic cotton, and precision tailoring.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('featured-products')}
              className="px-8 py-4 bg-[#30251D] text-[#F5EFE6] hover:bg-[#201812] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer text-center"
            >
              Shop Curtains
            </button>
            <button
              onClick={() => scrollToSection('collections')}
              className="px-8 py-4 bg-transparent border border-[#30251D] text-[#30251D] hover:bg-[#30251D] hover:text-[#F5EFE6] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer text-center"
            >
              Explore Collection
            </button>
          </div>

          {/* Trust Attributes */}
          <div className="mt-14 pt-8 border-t border-[#D8C7B2]/60 grid grid-cols-3 gap-4 text-[#30251D]">
            <div>
              <div className="font-heading text-xl sm:text-2xl text-[#30251D] font-medium">100%</div>
              <div className="text-[11px] uppercase tracking-wider text-[#92785B] mt-0.5">European Flax</div>
            </div>
            <div>
              <div className="font-heading text-xl sm:text-2xl text-[#30251D] font-medium">Bespoke</div>
              <div className="text-[11px] uppercase tracking-wider text-[#92785B] mt-0.5">Custom Sizing</div>
            </div>
            <div>
              <div className="font-heading text-xl sm:text-2xl text-[#30251D] font-medium">14-Day</div>
              <div className="text-[11px] uppercase tracking-wider text-[#92785B] mt-0.5">Fit Guarantee</div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating editorial scroll indicator */}
      <div className="hidden md:flex absolute bottom-8 right-12 z-10 flex-col items-center gap-2 text-[#92785B]">
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold -rotate-90 origin-center mb-6">
          Scroll Down
        </span>
        <button 
          onClick={() => scrollToSection('collections')} 
          aria-label="Scroll to collections" 
          className="p-2 border border-[#B9A187]/40 rounded-full hover:border-[#30251D] transition-colors cursor-pointer"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
