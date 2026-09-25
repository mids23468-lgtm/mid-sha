import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartCount,
    setIsCheckoutOpen,
    storeSettings
  } = useCurtivo();

  if (!isCartOpen) return null;

  const freeShippingThreshold = storeSettings.freeShippingThreshold || 3000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#F5EFE6] text-[#30251D] h-full flex flex-col shadow-2xl border-l border-[#D8C7B2] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D8C7B2]/60 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#92785B]" />
            <h2 className="font-heading text-2xl text-[#30251D] font-normal tracking-wide">
              Your Shopping Bag
            </h2>
            <span className="text-xs text-[#92785B] font-medium">({cartCount})</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-[#F5EFE6] flex items-center justify-center text-[#30251D] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="p-4 bg-white/70 border-b border-[#D8C7B2]/40 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#30251D] mb-2">
              Add <span className="font-semibold text-[#30251D]">₹{remainingForFreeShipping.toLocaleString()}</span> more for <span className="font-semibold text-[#92785B]">Complimentary White-Glove Delivery</span>
            </p>
          ) : (
            <p className="text-[#30251D] font-medium flex items-center gap-1.5 mb-2">
              <Truck className="w-4 h-4 text-[#92785B]" />
              <span>Complimentary White-Glove Delivery Unlocked!</span>
            </p>
          )}
          <div className="w-full h-1.5 bg-[#D8C7B2]/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#30251D] transition-all duration-500 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white border border-[#D8C7B2] flex items-center justify-center text-[#92785B]">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <h3 className="font-heading text-2xl text-[#30251D]">Your Bag is Empty</h3>
              <p className="text-xs text-[#92785B] max-w-xs font-light">
                Discover our artisanal collection of sheer, blackout, and Belgian linen drapes.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-3 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-widest font-semibold hover:bg-[#201812]"
              >
                Browse Curtains
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id}
                className="flex gap-4 p-4 bg-white border border-[#D8C7B2]/40 shadow-2xs relative"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-[#F5EFE6] overflow-hidden shrink-0 border border-[#D8C7B2]/30">
                  <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-heading text-base text-[#30251D] font-normal leading-snug">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#92785B] hover:text-[#30251D] p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#92785B] space-y-0.5 mt-1 font-light">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full border inline-block" style={{ backgroundColor: item.colorHex }} />
                        <span>{item.color}</span>
                        <span>·</span>
                        <span>{item.curtainType}</span>
                      </div>
                      <div>Size: {item.size}</div>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#D8C7B2]/30 mt-2">
                    <div className="flex items-center border border-[#D8C7B2] bg-[#F5EFE6]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#30251D] hover:bg-white cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#30251D] hover:bg-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-semibold text-sm text-[#30251D]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#D8C7B2]/60 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#92785B]">
                <span>Bag Subtotal:</span>
                <span className="font-semibold text-[#30251D]">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#92785B]">
                <span>Delivery:</span>
                <span className="font-semibold text-[#30251D]">
                  {cartSubtotal >= freeShippingThreshold ? 'FREE (Complimentary)' : `₹${storeSettings.standardShippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#30251D] pt-2 border-t border-[#D8C7B2]/40">
                <span>Estimated Total:</span>
                <span className="font-heading text-xl">
                  ₹{(cartSubtotal + (cartSubtotal >= freeShippingThreshold ? 0 : storeSettings.standardShippingFee)).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#30251D] text-[#F5EFE6] hover:bg-[#201812] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#92785B] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#30251D]" />
              <span>100% Secure Checkout · Direct Atelier Fulfillment</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
