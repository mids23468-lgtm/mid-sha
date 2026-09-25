import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-[#D8C7B2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold block mb-3">
            Voices of Refinement
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight mb-4">
            Cherished by Discerning Homes
          </h2>
          <p className="text-sm sm:text-base text-[#30251D]/75 font-light leading-relaxed">
            Read firsthand accounts from homeowners and interior designers who commissioned CURTIVO drapery.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="bg-[#F5EFE6]/50 border border-[#D8C7B2]/60 p-8 flex flex-col justify-between relative hover:border-[#92785B] transition-all duration-300"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B9A187] text-[#B9A187]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-heading italic text-lg sm:text-xl text-[#30251D] leading-snug">
                  “{t.review}”
                </p>

                <div className="text-[11px] text-[#92785B] font-light">
                  Commissioned: <strong className="font-medium text-[#30251D]">{t.curtain}</strong>
                </div>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-[#D8C7B2]/40 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-[#30251D] flex items-center gap-1.5">
                    <span>{t.name}</span>
                    {t.verified && (
                      <span title="Verified Commission">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#92785B]" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#92785B]">{t.location}</div>
                </div>

                <Quote className="w-6 h-6 text-[#D8C7B2]/70 stroke-[1.2]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
