import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Check, 
  Truck, 
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PaymentMethod, OrderAddress, OrderItem } from '../types';
import { useCurtivo } from '../context/CurtivoContext';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    storeSettings, 
    placeOrder 
  } = useCurtivo();

  // Form fields
  const [formData, setFormData] = useState<OrderAddress>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [customizationNotes, setCustomizationNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const deliveryFee = cartSubtotal >= (storeSettings.freeShippingThreshold || 3000) 
    ? 0 
    : (storeSettings.standardShippingFee || 250);
  const totalAmount = cartSubtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in your delivery contact details.');
      return;
    }

    setIsSubmitting(true);

    const orderItems: OrderItem[] = cart.map(i => ({
      productId: i.productId,
      productName: i.productName,
      quantity: i.quantity,
      price: i.price,
      color: i.color,
      size: i.size,
      curtainType: i.curtainType,
      fabric: i.fabric,
      image: i.image,
      isCustomSize: i.isCustomSize,
      customDimensions: i.isCustomSize ? { width: String(i.width), height: String(i.height) } : undefined,
    }));

    setTimeout(() => {
      placeOrder({
        customerId: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData,
        items: orderItems,
        customizationNotes,
        subtotal: cartSubtotal,
        deliveryFee,
        total: totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Cash on Delivery' : 'Paid',
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#F5EFE6] text-[#30251D] border border-[#D8C7B2] shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#D8C7B2]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl sm:text-3xl text-[#30251D] font-normal uppercase tracking-wider">
              CURTIVO Checkout
            </span>
            <span className="hidden sm:inline text-xs text-[#92785B] uppercase tracking-widest">
              · Curtains for a Better Tomorrow
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-full bg-[#F5EFE6] hover:bg-[#D8C7B2]/40 flex items-center justify-center text-[#30251D] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
            
            {/* Left Column: Delivery & Payment Details (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Step 1: Customer Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#30251D] font-semibold border-b border-[#D8C7B2]/50 pb-2">
                  <span className="w-5 h-5 bg-[#30251D] text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  <span>Contact & Delivery Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98201 44520"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul.verma@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                    Delivery Address (Apartment / Villa, Street) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apt 1402, Signature Heights, Altamount Road"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                      Country
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formData.country}
                      className="w-full p-2.5 bg-[#F5EFE6] border border-[#D8C7B2] text-xs text-[#30251D]/70"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                    Special Tailoring Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring diameter 35mm, leave package with lobby desk"
                    value={customizationNotes}
                    onChange={(e) => setCustomizationNotes(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D8C7B2] text-xs focus:outline-none focus:border-[#30251D]"
                  />
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#30251D] font-semibold border-b border-[#D8C7B2]/50 pb-2">
                  <span className="w-5 h-5 bg-[#30251D] text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  <span>Payment Method</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['UPI', 'Card', 'Cash on Delivery', 'Online Payment'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        paymentMethod === method
                          ? 'border-[#30251D] bg-white shadow-xs'
                          : 'border-[#D8C7B2]/60 bg-white/50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        {method === 'UPI' && <Smartphone className="w-4 h-4 text-[#92785B]" />}
                        {method === 'Card' && <CreditCard className="w-4 h-4 text-[#92785B]" />}
                        {method === 'Cash on Delivery' && <Banknote className="w-4 h-4 text-[#92785B]" />}
                        {method === 'Online Payment' && <ShieldCheck className="w-4 h-4 text-[#92785B]" />}
                        {paymentMethod === method && <Check className="w-3.5 h-3.5 text-[#30251D]" />}
                      </div>
                      <span className="text-[11px] font-semibold text-[#30251D] leading-tight block">
                        {method}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Sub-panel based on payment method */}
                {paymentMethod === 'UPI' && (
                  <div className="p-3.5 bg-white border border-[#D8C7B2]/60 space-y-2 text-xs">
                    <label className="block text-[10px] uppercase tracking-wider text-[#92785B] font-medium">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-2 border border-[#D8C7B2] text-xs font-mono"
                      placeholder="e.g. yourname@okaxis"
                    />
                    <p className="text-[10px] text-[#92785B]">
                      Google Pay, PhonePe, Paytm, and BHIM UPI supported. Instant authorization.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="p-3.5 bg-white border border-[#D8C7B2]/60 space-y-2.5 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#92785B] font-medium mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 border border-[#D8C7B2] text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#92785B] font-medium mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2 border border-[#D8C7B2] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#92785B] font-medium mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2 border border-[#D8C7B2] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Cash on Delivery' && (
                  <div className="p-3.5 bg-white border border-[#D8C7B2]/60 text-xs text-[#30251D] space-y-1">
                    <p className="font-semibold">Cash on Delivery (COD)</p>
                    <p className="text-[#92785B] text-[11px]">
                      Pay in cash or UPI QR upon delivery to our white-glove logistics partner.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Online Payment' && (
                  <div className="p-3.5 bg-white border border-[#D8C7B2]/60 text-xs text-[#30251D] space-y-1">
                    <p className="font-semibold">Net Banking & Instant Gateway</p>
                    <p className="text-[#92785B] text-[11px]">
                      Redirects to 128-bit encrypted banking terminal with OTP verification.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-white border-t lg:border-t-0 lg:border-l border-[#D8C7B2]/60 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#92785B] font-semibold block mb-3">
                  Order Summary ({cart.length} unique panels)
                </span>

                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 py-2 border-b border-[#D8C7B2]/30 text-xs">
                      <div className="w-12 h-14 bg-[#F5EFE6] overflow-hidden shrink-0 border border-[#D8C7B2]/30">
                        <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#30251D] leading-tight">{item.productName}</div>
                        <div className="text-[10px] text-[#92785B] mt-0.5">
                          {item.color} · {item.curtainType} · Qty: {item.quantity}
                        </div>
                        <div className="text-[10px] text-[#92785B]">{item.size}</div>
                      </div>
                      <div className="font-semibold text-[#30251D]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#92785B]">
                    <span>Subtotal:</span>
                    <span className="text-[#30251D] font-medium">₹{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#92785B]">
                    <span>Delivery Charge:</span>
                    <span className="text-[#30251D] font-medium">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#92785B]">
                    <span>GST (12%):</span>
                    <span className="text-[#30251D] font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#30251D] pt-3 border-t border-[#D8C7B2]/50">
                    <span>Total Payable:</span>
                    <span className="font-heading text-2xl">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Owner Notification Promise */}
                <div className="mt-6 p-3 bg-[#F5EFE6] border border-[#D8C7B2]/60 text-[11px] text-[#92785B] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#30251D] shrink-0" />
                  <span>The CURTIVO owner and atelier master are immediately notified upon submission.</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#30251D] hover:bg-[#201812] text-[#F5EFE6] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming Order...' : `Place Order (₹${totalAmount.toLocaleString()})`}</span>
                </button>
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
