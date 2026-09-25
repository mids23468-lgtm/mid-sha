import React from 'react';
import { Feather, Ruler, Sparkles, SunDim, Award } from 'lucide-react';

export const WhyCurtivo: React.FC = () => {
  const features = [
    {
      icon: Feather,
      title: 'Premium Fabrics',
      description: 'Carefully selected fabrics for lasting beauty. Organic European flax, combed cottons, and rich velvets tested for colorfastness.',
    },
    {
      icon: Ruler,
      title: 'Made for Your Space',
      description: 'Custom sizing available for your windows. Precision-tailored to the quarter-inch so headers hang with bespoke architectural grace.',
    },
    {
      icon: Sparkles,
      title: 'Timeless Design',
      description: 'Elegant styles that complement modern interiors. Soft warm neutrals that transcend seasonal trends and celebrate natural architecture.',
    },
    {
      icon: SunDim,
      title: 'Light & Privacy Control',
      description: 'Solutions for natural light, privacy and comfort. From ethereal diffused daylight to total 100% triple-weave sleep sanctuaries.',
    },
    {
      icon: Award,
      title: 'Quality You Can Feel',
      description: 'Premium finishing and attention to detail. Lead-weighted bottom hems, double blind-stitching, and handcrafted pleat headers.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-[#D8C7B2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold block mb-3">
            The Curtivo Difference
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight mb-4">
            Why CURTIVO?
          </h2>
          <p className="text-sm sm:text-base text-[#30251D]/75 font-light leading-relaxed">
            We believe window furnishings are not merely functional coverings, but the architectural soul of an elevated sanctuary.
          </p>
        </div>

        {/* 5-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-start p-6 bg-[#F5EFE6]/40 hover:bg-[#F5EFE6] border border-[#D8C7B2]/40 hover:border-[#92785B]/60 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white text-[#30251D] border border-[#D8C7B2] rounded-full flex items-center justify-center mb-6 shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.5] text-[#92785B]" />
                </div>
                
                <h3 className="font-heading text-xl text-[#30251D] font-medium mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-xs text-[#30251D]/75 font-light leading-relaxed">
                  {feature.description}
                </p>

                <div className="w-6 h-px bg-[#B9A187]/60 mt-6" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
