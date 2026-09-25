import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';
import { COLLECTIONS } from '../data/mockData';

export const Collections: React.FC = () => {
  const { setSelectedCategory, scrollToSection } = useCurtivo();

  const handleExplore = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    scrollToSection('featured-products');
  };

  return (
    <section id="collections" className="py-24 bg-[#F5EFE6] border-b border-[#D8C7B2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold mb-3">
              Curated Drapery Edits
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight">
              Shop by Collection
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#30251D]/70 max-w-md font-light leading-relaxed">
            Each collection is thoughtfully designed to harmonize with natural daylight, acoustic comfort, and the unique architecture of your home.
          </p>
        </div>

        {/* Collections Grid: 2 Large Feature cards on top, 3 cards on bottom */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Collection 1: Sheer Curtains (Wide 7 cols) */}
          <div className="md:col-span-7 group relative bg-[#EBE2D5] overflow-hidden cursor-pointer min-h-[440px] flex flex-col justify-end p-8 sm:p-12 transition-all duration-500 shadow-sm hover:shadow-lg"
               onClick={() => handleExplore(COLLECTIONS[0].categoryKey)}>
            <div className="absolute inset-0 z-0">
              <img
                src={COLLECTIONS[0].image}
                alt={COLLECTIONS[0].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30251D]/85 via-[#30251D]/35 to-transparent" />
            </div>

            <div className="relative z-10 text-[#F5EFE6]">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8C7B2] font-medium block mb-2">
                {COLLECTIONS[0].subtitle}
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl font-normal mb-3 text-white">
                {COLLECTIONS[0].title}
              </h3>
              <p className="text-sm text-[#F5EFE6]/90 max-w-lg mb-6 font-light leading-relaxed">
                {COLLECTIONS[0].description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExplore(COLLECTIONS[0].categoryKey);
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-[#D8C7B2] transition-colors pb-1 border-b border-white/60 group-hover:border-[#D8C7B2]"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Collection 2: Blackout Curtains (5 cols) */}
          <div className="md:col-span-5 group relative bg-[#EBE2D5] overflow-hidden cursor-pointer min-h-[440px] flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 shadow-sm hover:shadow-lg"
               onClick={() => handleExplore(COLLECTIONS[1].categoryKey)}>
            <div className="absolute inset-0 z-0">
              <img
                src={COLLECTIONS[1].image}
                alt={COLLECTIONS[1].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30251D]/85 via-[#30251D]/35 to-transparent" />
            </div>

            <div className="relative z-10 text-[#F5EFE6]">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8C7B2] font-medium block mb-2">
                {COLLECTIONS[1].subtitle}
              </span>
              <h3 className="font-heading text-3xl font-normal mb-3 text-white">
                {COLLECTIONS[1].title}
              </h3>
              <p className="text-sm text-[#F5EFE6]/90 mb-6 font-light leading-relaxed">
                {COLLECTIONS[1].description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExplore(COLLECTIONS[1].categoryKey);
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-[#D8C7B2] transition-colors pb-1 border-b border-white/60 group-hover:border-[#D8C7B2]"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Collection 3: Living Room Curtains (4 cols) */}
          <div className="md:col-span-4 group relative bg-[#EBE2D5] overflow-hidden cursor-pointer min-h-[380px] flex flex-col justify-end p-7 transition-all duration-500 shadow-sm hover:shadow-lg"
               onClick={() => handleExplore(COLLECTIONS[2].categoryKey)}>
            <div className="absolute inset-0 z-0">
              <img
                src={COLLECTIONS[2].image}
                alt={COLLECTIONS[2].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30251D]/85 via-[#30251D]/35 to-transparent" />
            </div>

            <div className="relative z-10 text-[#F5EFE6]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8C7B2] font-medium block mb-1">
                {COLLECTIONS[2].subtitle}
              </span>
              <h3 className="font-heading text-2xl font-normal mb-2 text-white">
                {COLLECTIONS[2].title}
              </h3>
              <p className="text-xs text-[#F5EFE6]/85 mb-5 font-light line-clamp-2">
                {COLLECTIONS[2].description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExplore(COLLECTIONS[2].categoryKey);
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-[#D8C7B2] transition-colors pb-0.5 border-b border-white/60"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Collection 4: Bedroom Curtains (4 cols) */}
          <div className="md:col-span-4 group relative bg-[#EBE2D5] overflow-hidden cursor-pointer min-h-[380px] flex flex-col justify-end p-7 transition-all duration-500 shadow-sm hover:shadow-lg"
               onClick={() => handleExplore(COLLECTIONS[3].categoryKey)}>
            <div className="absolute inset-0 z-0">
              <img
                src={COLLECTIONS[3].image}
                alt={COLLECTIONS[3].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30251D]/85 via-[#30251D]/35 to-transparent" />
            </div>

            <div className="relative z-10 text-[#F5EFE6]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8C7B2] font-medium block mb-1">
                {COLLECTIONS[3].subtitle}
              </span>
              <h3 className="font-heading text-2xl font-normal mb-2 text-white">
                {COLLECTIONS[3].title}
              </h3>
              <p className="text-xs text-[#F5EFE6]/85 mb-5 font-light line-clamp-2">
                {COLLECTIONS[3].description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExplore(COLLECTIONS[3].categoryKey);
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-[#D8C7B2] transition-colors pb-0.5 border-b border-white/60"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Collection 5: Luxury Collection (4 cols) */}
          <div className="md:col-span-4 group relative bg-[#EBE2D5] overflow-hidden cursor-pointer min-h-[380px] flex flex-col justify-end p-7 transition-all duration-500 shadow-sm hover:shadow-lg"
               onClick={() => handleExplore(COLLECTIONS[4].categoryKey)}>
            <div className="absolute inset-0 z-0">
              <img
                src={COLLECTIONS[4].image}
                alt={COLLECTIONS[4].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30251D]/85 via-[#30251D]/35 to-transparent" />
            </div>

            <div className="relative z-10 text-[#F5EFE6]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8C7B2] font-medium block mb-1">
                {COLLECTIONS[4].subtitle}
              </span>
              <h3 className="font-heading text-2xl font-normal mb-2 text-white">
                {COLLECTIONS[4].title}
              </h3>
              <p className="text-xs text-[#F5EFE6]/85 mb-5 font-light line-clamp-2">
                {COLLECTIONS[4].description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExplore(COLLECTIONS[4].categoryKey);
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-[#D8C7B2] transition-colors pb-0.5 border-b border-white/60"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
