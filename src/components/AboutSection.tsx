import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F5EFE6] border-b border-[#D8C7B2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Fabric & Craftsmanship Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] bg-white p-3 border border-[#D8C7B2] shadow-md">
              <img
                src={ASSET_IMAGES.fabricCraft}
                alt="CURTIVO Atelier Tailoring"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#30251D] text-[#F5EFE6] p-6 max-w-xs shadow-xl border border-[#43352A]">
                <span className="font-heading text-xl font-normal block mb-1">
                  100% Master Craftsmanship
                </span>
                <p className="text-[11px] text-[#D8C7B2] font-light leading-relaxed">
                  Every seam, pleat, and weighted corner drop is inspected by our master drapers in Mumbai and Ghent.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold block">
              Our Heritage & Philosophy
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight leading-tight">
              Crafting Better Spaces
            </h2>

            <p className="text-base text-[#30251D]/80 font-light leading-relaxed">
              At CURTIVO, we see light not as something to simply block or let in, but as an architectural medium that defines how you feel inside your sanctuary.
            </p>

            <p className="text-sm text-[#30251D]/75 font-light leading-relaxed">
              Founded on the belief that drapery should possess both sculptural elegance and effortless tactile warmth, we partner with fifth-generation European mills to harvest long-staple flax and organic combed cottons. We reject synthetic stiffness in favor of flowing drapes that soften corners and bring restful quiet to modern living.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#D8C7B2]/50 text-[#30251D]">
              <div>
                <div className="font-heading text-2xl text-[#30251D]">Bespoke Precision</div>
                <div className="text-xs text-[#92785B] mt-1 font-light">Custom tailored to quarter-inch exactitude.</div>
              </div>
              <div>
                <div className="font-heading text-2xl text-[#30251D]">Conscious Weaving</div>
                <div className="text-xs text-[#92785B] mt-1 font-light">Zero toxic coatings, 100% organic yarns.</div>
              </div>
            </div>

            <div className="pt-2">
              <div className="font-heading italic text-xl text-[#92785B]">
                “Curtains for a Better Tomorrow.”
              </div>
              <div className="text-xs uppercase tracking-widest text-[#30251D] font-medium mt-1">
                The CURTIVO Atelier Guild
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
