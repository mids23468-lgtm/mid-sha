import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, Check } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const ContactSection: React.FC = () => {
  const { storeSettings } = useCurtivo();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsSent(true);
    setTimeout(() => {
      setForm({ name: '', phone: '', email: '', message: '' });
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-[#D8C7B2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold block mb-3">
            Concierge Consultation
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight mb-4">
            Connect with CURTIVO
          </h2>
          <p className="text-sm sm:text-base text-[#30251D]/75 font-light leading-relaxed">
            Whether inquiring about bespoke architectural curtain drops, fabric swatches, or measuring advice, our atelier specialists are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Maps Location (5 cols) */}
          <div className="lg:col-span-5 space-y-8 bg-[#F5EFE6] p-8 sm:p-10 border border-[#D8C7B2]">
            <div>
              <span className="font-heading text-3xl text-[#30251D] uppercase tracking-wider block mb-1">
                CURTIVO
              </span>
              <span className="font-heading italic text-base text-[#92785B] block mb-4">
                “Curtains for a Better Tomorrow”
              </span>
              <p className="text-xs text-[#30251D]/75 font-light leading-relaxed">
                Visit our private design atelier for tactile material viewings and custom drapery consultations.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-[#30251D]">
                <MapPin className="w-4 h-4 text-[#92785B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider text-[#92785B]">Atelier Address:</strong>
                  <span>{storeSettings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#30251D]">
                <Phone className="w-4 h-4 text-[#92785B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider text-[#92785B]">Phone Hotline:</strong>
                  <a href={`tel:${storeSettings.phone}`} className="hover:underline">{storeSettings.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#30251D]">
                <MessageSquare className="w-4 h-4 text-[#92785B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider text-[#92785B]">WhatsApp Direct:</strong>
                  <a href={`https://wa.me/${storeSettings.ownerWhatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:underline">
                    {storeSettings.ownerWhatsApp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#30251D]">
                <Mail className="w-4 h-4 text-[#92785B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider text-[#92785B]">Email Concierge:</strong>
                  <a href={`mailto:${storeSettings.ownerEmail}`} className="hover:underline">{storeSettings.ownerEmail}</a>
                </div>
              </div>
            </div>

            {/* Stylized Google Maps Location Representation */}
            <div className="pt-2">
              <span className="block text-[10px] uppercase tracking-wider text-[#92785B] font-semibold mb-2">
                Atelier Location Map:
              </span>
              <div className="relative aspect-[16/9] bg-stone-200 border border-[#D8C7B2] overflow-hidden rounded-xs flex items-center justify-center text-center p-4">
                {/* Architectural map background graphic */}
                <div className="absolute inset-0 bg-[#E8E1D5] opacity-90 flex flex-col justify-between p-4">
                  <div className="w-full border-b border-stone-300 grid grid-cols-4 gap-4 h-12" />
                  <div className="w-full border-b border-stone-300 grid grid-cols-3 gap-6 h-12" />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-1.5 bg-white/90 backdrop-blur-xs p-3 border border-[#D8C7B2] shadow-sm max-w-xs">
                  <MapPin className="w-5 h-5 text-[#30251D]" />
                  <span className="font-heading text-sm font-semibold text-[#30251D]">CURTIVO Flagship Atelier</span>
                  <span className="text-[10px] text-[#92785B]">Altamount Road, Mumbai, Maharashtra</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F5EFE6] p-8 sm:p-10 border border-[#D8C7B2] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#92785B] font-semibold block mb-1">
              Direct Message
            </span>
            <h3 className="font-heading text-3xl text-[#30251D] font-normal mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-[#30251D]/70 font-light mb-6">
              Our drapery consultants reply within 2 business hours with material samples and recommendations.
            </p>

            {isSent ? (
              <div className="p-8 bg-white border border-[#30251D]/20 text-center space-y-3 animate-in fade-in duration-200">
                <div className="w-10 h-10 bg-[#30251D] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-heading text-xl text-[#30251D]">Message Dispatched</h4>
                <p className="text-xs text-[#92785B] font-light">
                  Thank you for reaching out to CURTIVO. A senior interior specialist will be in touch promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhal"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98XXX XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#30251D] font-medium mb-1">
                    Message / Project Inquiries *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your room, window dimensions, or fabric queries..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#30251D] hover:bg-[#201812] text-[#F5EFE6] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
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
