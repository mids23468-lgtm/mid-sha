import React, { useState } from 'react';
import { Check, Scissors, Send, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const CustomCurtainService: React.FC = () => {
  const { submitCustomRequest } = useCurtivo();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roomType: 'Living Room',
    windowWidth: '',
    windowHeight: '',
    preferredFabric: 'Linen',
    preferredColor: 'Ivory Cream',
    additionalRequirements: '',
    quantity: 2,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const features = [
    'Custom Measurements',
    'Fabric Consultation',
    'Color Selection',
    'Professional Finishing',
    'Installation Support',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitCustomRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'concierge@client.com',
        roomType: formData.roomType,
        windowWidth: formData.windowWidth ? `${formData.windowWidth} ft` : 'Custom Consultation',
        windowHeight: formData.windowHeight ? `${formData.windowHeight} ft` : 'Custom Consultation',
        preferredFabric: formData.preferredFabric,
        preferredColor: formData.preferredColor,
        additionalRequirements: formData.additionalRequirements,
        quantity: formData.quantity,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        roomType: 'Living Room',
        windowWidth: '',
        windowHeight: '',
        preferredFabric: 'Linen',
        preferredColor: 'Ivory Cream',
        additionalRequirements: '',
        quantity: 2,
      });
    }, 600);
  };

  return (
    <section id="custom-curtains" className="py-24 bg-white border-b border-[#D8C7B2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & Features (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold">
              <Scissors className="w-3.5 h-3.5" />
              <span>Bespoke Concierge Atelier</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight leading-tight">
              Your Window.<br />Your Curtain.<br />Your Way.
            </h2>

            <p className="text-base text-[#30251D]/80 font-light leading-relaxed">
              Every window is different. CURTIVO offers custom curtain sizing and personalized solutions designed specifically for your space.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 pt-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-[#30251D]">
                  <div className="w-5 h-5 rounded-full bg-[#D8C7B2]/40 text-[#30251D] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium tracking-wide">{feat}</span>
                </div>
              ))}
            </div>

            {/* Atelier Quote Callout */}
            <div className="p-5 bg-[#F5EFE6] border-l-2 border-[#30251D] space-y-2 mt-8">
              <div className="flex items-center gap-2 text-xs text-[#92785B] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#30251D]" />
                <span>Complimentary Home Consultation</span>
              </div>
              <p className="text-xs text-[#30251D]/75 leading-relaxed font-light">
                Our drapery specialists bring tactile fabric books and laser measurement gauges to your residence to ensure an immaculate hang.
              </p>
            </div>
          </div>

          {/* Right Column: Custom Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F5EFE6] p-8 sm:p-10 border border-[#D8C7B2] shadow-sm">
            
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#92785B] font-semibold block mb-1">
                Direct Atelier Inquiry
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-[#30251D] font-normal">
                Request a Custom Curtain
              </h3>
              <p className="text-xs text-[#30251D]/70 font-light mt-1">
                Fill in your initial room details. Our master draper will prepare a tailored proposal within 2 business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-white border border-[#30251D]/20 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-[#30251D] text-[#F5EFE6] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-2xl text-[#30251D]">Request Received</h4>
                <p className="text-sm text-[#30251D]/80 font-light max-w-md mx-auto">
                  Thank you! Your custom curtain specifications have been routed to the CURTIVO atelier master and owner. We will contact you via WhatsApp and phone shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-wider font-medium hover:bg-[#43352A]"
                >
                  Submit Another Window Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>
                </div>

                {/* Email & Room Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Room Type
                    </label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    >
                      <option value="Living Room">Living Room</option>
                      <option value="Master Bedroom">Master Bedroom</option>
                      <option value="Dining Room">Dining Room</option>
                      <option value="Home Theater / Media">Home Theater / Media Room</option>
                      <option value="Executive Office">Executive Office</option>
                      <option value="Entire Villa / Apartment">Entire Villa / Residence</option>
                    </select>
                  </div>
                </div>

                {/* Window Dimensions & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Window Width (ft)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10.5 ft"
                      value={formData.windowWidth}
                      onChange={(e) => setFormData({ ...formData, windowWidth: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Window Height (ft)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9.0 ft"
                      value={formData.windowHeight}
                      onChange={(e) => setFormData({ ...formData, windowHeight: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Panels Needed
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>
                </div>

                {/* Preferred Fabric & Preferred Color */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Preferred Fabric
                    </label>
                    <select
                      value={formData.preferredFabric}
                      onChange={(e) => setFormData({ ...formData, preferredFabric: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    >
                      <option value="100% Belgian Linen">100% Belgian Linen</option>
                      <option value="Organic Combed Cotton">Organic Combed Cotton</option>
                      <option value="Triple-Weave Blackout Linen">Triple-Weave Blackout Linen</option>
                      <option value="Matte Italian Velvet">Matte Italian Velvet</option>
                      <option value="Luminous Sheer Voile">Luminous Sheer Voile</option>
                      <option value="Dual Track (Sheer + Blackout)">Dual Track (Sheer + Blackout)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Preferred Color Tone
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Warm Ivory / Sand Beige / Custom"
                      value={formData.preferredColor}
                      onChange={(e) => setFormData({ ...formData, preferredColor: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                    Additional Requirements & Specifics
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Motorized track needed, floor clearance 1 inch, soundproofing preference..."
                    value={formData.additionalRequirements}
                    onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                    className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#30251D] text-[#F5EFE6] hover:bg-[#201812] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Request'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
