import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Compass, ExternalLink } from 'lucide-react';
import { ROOM_INSPIRATIONS } from '../data/mockData';
import { useCurtivo } from '../context/CurtivoContext';

export const RoomInspiration: React.FC = () => {
  const { setSelectedCategory, scrollToSection } = useCurtivo();
  const [activeInspiration, setActiveInspiration] = useState<typeof ROOM_INSPIRATIONS[0] | null>(null);

  const handleShopLook = (room: typeof ROOM_INSPIRATIONS[0]) => {
    setActiveInspiration(null);
    if (room.title.includes('Living')) {
      setSelectedCategory('Living Room Curtains');
    } else if (room.title.includes('Bedroom')) {
      setSelectedCategory('Bedroom Curtains');
    } else if (room.title.includes('Minimalist')) {
      setSelectedCategory('Blackout Curtains');
    } else {
      setSelectedCategory('Luxury Collection');
    }
    scrollToSection('featured-products');
  };

  return (
    <section id="inspiration" className="py-24 bg-[#F5EFE6] border-b border-[#D8C7B2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold block mb-3">
              Architectural Lookbook
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight">
              Designed for Beautiful Spaces
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#30251D]/75 max-w-md font-light leading-relaxed">
            Witness how custom CURTIVO drapery naturally anchors sunlight, textures, and intimate residential atmospheres.
          </p>
        </div>

        {/* Editorial Masonry / Horizontal Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOM_INSPIRATIONS.map((room, idx) => (
            <div
              key={room.id}
              className={`group relative bg-white border border-[#D8C7B2]/50 overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-500 ${
                idx === 0 ? 'lg:col-span-2 md:col-span-2' : ''
              }`}
              onClick={() => setActiveInspiration(room)}
            >
              {/* Image Frame */}
              <div className={`relative overflow-hidden ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#30251D]/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#30251D] text-[10px] uppercase tracking-widest font-semibold px-3 py-1">
                  {room.tag}
                </div>

                {/* Hotspot Hover Icon */}
                <div className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#30251D] p-2.5 rounded-full shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <Sparkles className="w-4 h-4 text-[#92785B]" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-widest text-[#92785B] font-medium mb-1">
                  {room.curtainStyle}
                </div>
                <h3 className="font-heading text-2xl text-[#30251D] font-normal mb-2">
                  {room.title}
                </h3>
                <p className="text-xs text-[#30251D]/75 font-light line-clamp-2 mb-4 leading-relaxed">
                  {room.quote}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveInspiration(room);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#30251D] hover:text-[#92785B] font-semibold border-b border-[#30251D]/40 pb-0.5 group-hover:border-[#92785B] transition-colors"
                >
                  <span>Get Inspired</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lookbook Detail Modal */}
      {activeInspiration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="relative w-full max-w-3xl bg-[#F5EFE6] border border-[#D8C7B2] shadow-2xl p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveInspiration(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#30251D] hover:bg-[#D8C7B2] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[4/5] overflow-hidden bg-white border border-[#D8C7B2]">
                <img
                  src={activeInspiration.image}
                  alt={activeInspiration.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-[#92785B] font-semibold">
                  CURTIVO Interior Case Study
                </span>
                <h3 className="font-heading text-3xl text-[#30251D] font-normal">
                  {activeInspiration.title}
                </h3>
                <p className="text-xs text-[#92785B] italic">
                  Dimensions: {activeInspiration.dimensions}
                </p>
                <p className="text-sm text-[#30251D]/80 leading-relaxed font-light">
                  {activeInspiration.quote}
                </p>

                <div className="p-4 bg-white border border-[#D8C7B2]/60 space-y-1.5 text-xs">
                  <div className="text-[#92785B] font-medium uppercase text-[10px] tracking-wider">
                    Curtain Blueprint:
                  </div>
                  <div className="font-semibold text-[#30251D]">{activeInspiration.curtainStyle}</div>
                  <div className="text-[#30251D]/70 text-[11px]">
                    Tailored with weighted corner drops and quiet gliding carriers.
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleShopLook(activeInspiration)}
                    className="w-full py-3.5 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-widest font-semibold hover:bg-[#201812] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Shop Curtains for This Look</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
