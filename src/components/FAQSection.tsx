import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-[#F5EFE6] border-b border-[#D8C7B2]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Curtain Expertise & Guidance</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#30251D]/75 font-light leading-relaxed">
            Everything you need to know about measuring, bespoke sizing, master fabrics, and our white-glove delivery.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white border border-[#D8C7B2]/60 transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-xl sm:text-2xl text-[#30251D] font-normal">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center shrink-0 text-[#30251D]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-[#D8C7B2]/20 animate-in fade-in duration-200">
                    <p className="text-sm text-[#30251D]/80 font-light leading-relaxed pt-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
