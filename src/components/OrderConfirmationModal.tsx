import React from 'react';
import { Check, Compass, ShoppingBag, MessageSquare, Printer, ArrowRight } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';
import { formatWhatsAppMessage } from '../services/orderService';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    confirmedOrder, 
    setConfirmedOrder, 
    openTrackingWithId, 
    scrollToSection 
  } = useCurtivo();

  if (!confirmedOrder) return null;

  const handleTrack = () => {
    const id = confirmedOrder.orderId;
    setConfirmedOrder(null);
    openTrackingWithId(id);
  };

  const handleContinue = () => {
    setConfirmedOrder(null);
    scrollToSection('featured-products');
  };

  const whatsappUrl = `https://wa.me/?text=${formatWhatsAppMessage(confirmedOrder)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#F5EFE6] text-[#30251D] border border-[#D8C7B2] shadow-2xl p-8 sm:p-10 my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Icon and Brand Mark */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 bg-[#30251D] text-[#F5EFE6] rounded-full flex items-center justify-center mx-auto shadow-md">
            <Check className="w-8 h-8 stroke-[2]" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#92785B] font-semibold block">
            CURTIVO Atelier
          </span>

          <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight">
            Order Confirmed
          </h2>

          <p className="text-sm sm:text-base text-[#30251D]/80 font-light">
            Thank you for choosing CURTIVO.
          </p>

          <div className="inline-block bg-white px-4 py-2 border border-[#D8C7B2] text-xs mt-2">
            <span className="text-[#92785B] uppercase tracking-wider mr-2 font-medium">Order Reference:</span>
            <span className="font-mono font-bold text-[#30251D] text-sm">{confirmedOrder.orderId}</span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-[#D8C7B2]/70 p-6 space-y-5 text-xs">
          
          {/* Summary Items */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#92785B] font-semibold block mb-3">
              Commissioned Drapery
            </span>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start pb-2 border-b border-[#D8C7B2]/30">
                  <div>
                    <div className="font-semibold text-[#30251D] text-xs">{item.productName}</div>
                    <div className="text-[10px] text-[#92785B] mt-0.5">
                      {item.color} · {item.curtainType} · Size: {item.size} · Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-semibold text-[#30251D]">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Address Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#D8C7B2]/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-medium block mb-1">
                Delivery Address:
              </span>
              <p className="text-[#30251D] font-medium">{confirmedOrder.address.fullName}</p>
              <p className="text-[#30251D]/80">{confirmedOrder.address.address}</p>
              <p className="text-[#30251D]/80">
                {confirmedOrder.address.city}, {confirmedOrder.address.state} - {confirmedOrder.address.pinCode}
              </p>
              <p className="text-[#92785B] mt-1">{confirmedOrder.phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-medium block mb-1">
                Payment & Fulfillment:
              </span>
              <p className="text-[#30251D]">
                <strong className="font-medium">Method:</strong> {confirmedOrder.paymentMethod}
              </p>
              <p className="text-[#30251D]">
                <strong className="font-medium">Status:</strong> {confirmedOrder.paymentStatus}
              </p>
              <p className="text-[#30251D]">
                <strong className="font-medium">Carrier:</strong> {confirmedOrder.carrier}
              </p>
              <p className="text-[#30251D]">
                <strong className="font-medium">Estimated Delivery:</strong> {confirmedOrder.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-[#D8C7B2]/40 flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-wider text-[#92785B] font-semibold">
              Total Amount Paid / Payable:
            </span>
            <span className="font-heading text-2xl font-bold text-[#30251D]">
              ₹{confirmedOrder.total.toLocaleString()}
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleTrack}
              className="w-full py-3.5 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-widest font-semibold hover:bg-[#201812] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Track Order</span>
            </button>

            <button
              onClick={handleContinue}
              className="w-full py-3.5 bg-white text-[#30251D] border border-[#30251D] text-xs uppercase tracking-widest font-semibold hover:bg-[#F5EFE6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#92785B]" />
              <span>Continue Shopping</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#92785B] hover:text-[#30251D] transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share order receipt on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
