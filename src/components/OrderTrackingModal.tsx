import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Truck, 
  Package, 
  MapPin, 
  Compass, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { useCurtivo } from '../context/CurtivoContext';

export const OrderTrackingModal: React.FC = () => {
  const { 
    isTrackingOpen, 
    setIsTrackingOpen, 
    trackingOrderId, 
    setTrackingOrderId, 
    orders 
  } = useCurtivo();

  const [inputOrderId, setInputOrderId] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (trackingOrderId) {
      setInputOrderId(trackingOrderId);
      const found = orders.find(o => o.orderId.toUpperCase() === trackingOrderId.trim().toUpperCase());
      if (found) {
        setMatchedOrder(found);
        setHasSearched(true);
      }
    }
  }, [trackingOrderId, orders]);

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanId = inputOrderId.trim().toUpperCase();
    const cleanPhone = inputPhone.trim();

    const found = orders.find(o => {
      const idMatch = o.orderId.toUpperCase() === cleanId;
      if (!cleanPhone) return idMatch;
      return idMatch && (o.phone.includes(cleanPhone) || o.email.toLowerCase().includes(cleanPhone.toLowerCase()));
    });

    setMatchedOrder(found || null);
  };

  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'NEW', label: 'Order Placed', desc: 'Order received by CURTIVO atelier' },
    { key: 'CONFIRMED', label: 'Order Confirmed', desc: 'Fabric bolts selected & inspected' },
    { key: 'PROCESSING', label: 'Processing', desc: 'Master artisans tailoring & pleating' },
    { key: 'SHIPPED', label: 'Shipped', desc: 'Dispatched via Express Courier' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Arrived at your residence' },
  ];

  const getStepStatus = (stepKey: OrderStatus, currentStatus: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['NEW', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const currentIdx = statusOrder.indexOf(currentStatus);
    const stepIdx = statusOrder.indexOf(stepKey);

    if (currentStatus === 'CANCELLED') return 'cancelled';
    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#F5EFE6] text-[#30251D] border border-[#D8C7B2] shadow-2xl p-6 sm:p-10 my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#D8C7B2]/50">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold mb-1">
              <Compass className="w-4 h-4" />
              <span>Real-Time Logistics</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#30251D] font-normal">
              Track Your Curtain Order
            </h2>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#D8C7B2]/40 flex items-center justify-center text-[#30251D] transition-colors cursor-pointer"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="py-6 border-b border-[#D8C7B2]/50">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="block text-[10px] uppercase tracking-wider text-[#92785B] font-medium mb-1">
                Order ID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CURT-2026-00124"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs font-mono uppercase focus:outline-none focus:border-[#30251D]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[10px] uppercase tracking-wider text-[#92785B] font-medium mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 9820144520"
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#30251D] hover:bg-[#201812] text-[#F5EFE6] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
          </div>
        </form>

        {/* Results Area */}
        {matchedOrder ? (
          <div className="pt-6 space-y-6 animate-in fade-in duration-300">
            
            {/* Order Status Banner */}
            <div className="bg-white p-5 border border-[#D8C7B2]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#92785B] font-semibold block">
                  Status: {matchedOrder.orderStatus}
                </span>
                <h3 className="font-heading text-2xl text-[#30251D] font-normal">
                  Order #{matchedOrder.orderId}
                </h3>
                <p className="text-xs text-[#92785B] mt-0.5 font-light">
                  Placed on {new Date(matchedOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className="text-right sm:border-l sm:border-[#D8C7B2]/40 sm:pl-6">
                <span className="text-[10px] uppercase tracking-widest text-[#92785B] font-medium block">
                  Carrier & Tracking
                </span>
                <span className="text-xs font-semibold text-[#30251D] block">
                  {matchedOrder.carrier || 'BlueDart Express'}
                </span>
                <span className="text-[11px] font-mono text-[#92785B]">
                  {matchedOrder.trackingNumber || 'BD-GEN-IN8829'}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-white p-6 border border-[#D8C7B2]/70">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#30251D] mb-6">
                Artisanal Fulfillment Timeline
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8C7B2]/50">
                {steps.map((step) => {
                  const state = getStepStatus(step.key, matchedOrder.orderStatus);
                  return (
                    <div key={step.key} className="relative flex items-start gap-4">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        state === 'completed'
                          ? 'bg-[#30251D] text-[#F5EFE6] ring-4 ring-[#F5EFE6]'
                          : state === 'active'
                          ? 'bg-[#92785B] text-white ring-4 ring-[#D8C7B2] animate-pulse'
                          : 'bg-white text-[#D8C7B2] border-2 border-[#D8C7B2]'
                      }`}>
                        {state === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        ) : state === 'active' ? (
                          <Clock className="w-3.5 h-3.5" />
                        ) : (
                          <Circle className="w-2.5 h-2.5" />
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold uppercase tracking-wider ${
                            state === 'active' || state === 'completed' ? 'text-[#30251D]' : 'text-[#92785B]'
                          }`}>
                            {step.label}
                          </span>
                          {state === 'active' && (
                            <span className="text-[9px] bg-[#92785B] text-white px-2 py-0.5 font-medium rounded-full uppercase tracking-wider">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#92785B] mt-0.5 font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Items Mini-Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white p-5 border border-[#D8C7B2]/70">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-semibold block mb-1">
                  Destination:
                </span>
                <p className="font-semibold text-[#30251D]">{matchedOrder.customerName}</p>
                <p className="text-[#30251D]/80">{matchedOrder.address.address}</p>
                <p className="text-[#30251D]/80">{matchedOrder.address.city}, {matchedOrder.address.state} - {matchedOrder.address.pinCode}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-semibold block mb-1">
                  Curtains in this consignment:
                </span>
                <div className="space-y-1">
                  {matchedOrder.items.map((i, idx) => (
                    <div key={idx} className="text-[#30251D]/80">
                      • {i.productName} ({i.quantity} panels, {i.size})
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : hasSearched ? (
          <div className="text-center py-10 bg-white border border-[#D8C7B2]/50 mt-6 p-6">
            <h4 className="font-heading text-2xl text-[#30251D] mb-1">Order Not Found</h4>
            <p className="text-xs text-[#92785B] max-w-sm mx-auto mb-4 font-light">
              We couldn't locate an order with ID "{inputOrderId}". Please verify the reference number sent on your confirmation.
            </p>
            <div className="text-xs text-[#30251D] flex items-center justify-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#92785B]" />
              <span>Need help? Contact concierge at +91 (022) 8492-3000</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-xs text-[#92785B] space-y-2">
            <p>Enter your unique CURTIVO order ID to view real-time tailoring & shipping progression.</p>
            <p className="text-[11px] font-mono">Sample reference: CURT-2026-00124</p>
          </div>
        )}

      </div>
    </div>
  );
};
