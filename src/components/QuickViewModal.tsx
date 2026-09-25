import React, { useState } from 'react';
import { X, Star, ShoppingBag, Eye, Heart, ArrowRight } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    setActiveProductModal, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    setIsCheckoutOpen 
  } = useCurtivo();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const color = product.colors[selectedColorIdx] || product.colors[0];
  const size = product.sizes[0];
  const isFavorited = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      price: Math.round(product.price * size.priceModifier),
      quantity: 1,
      color: color.name,
      colorHex: color.hex,
      size: size.label,
      width: size.width,
      height: size.height,
      curtainType: product.curtainTypes[0] || 'Wave Fold',
      fabric: product.fabric,
      image: product.images[0],
    });
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCheckoutOpen(true);
  };

  const handleFullDetails = () => {
    setQuickViewProduct(null);
    setActiveProductModal(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#F5EFE6] text-[#30251D] border border-[#D8C7B2] shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#30251D] hover:bg-[#D8C7B2] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="aspect-[3/4] bg-white border border-[#D8C7B2] overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#92785B] font-semibold">
                {product.fabric} · {product.category}
              </div>
              <h3 className="font-heading text-2xl text-[#30251D] font-normal leading-snug">
                {product.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-[#B9A187] text-[#B9A187]" />
                <span className="font-semibold text-[#30251D]">{product.rating}</span>
                <span className="text-[#92785B]">({product.reviewCount})</span>
              </div>
            </div>

            <div className="text-xl font-semibold text-[#30251D]">
              ₹{product.price.toLocaleString()}
            </div>

            <p className="text-xs text-[#30251D]/75 font-light leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#92785B] font-medium block mb-1">
                Color: {color.name}
              </span>
              <div className="flex gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                      selectedColorIdx === idx ? 'ring-2 ring-[#30251D] scale-110' : 'border-[#D8C7B2]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 bg-[#F5EFE6] border border-[#30251D] text-[#30251D] hover:bg-[#D8C7B2]/40 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#92785B]" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 bg-[#30251D] text-[#F5EFE6] hover:bg-[#201812] text-xs uppercase tracking-wider font-semibold cursor-pointer"
              >
                Buy Now
              </button>

              <button
                onClick={handleFullDetails}
                className="w-full text-center text-xs text-[#92785B] hover:text-[#30251D] font-medium underline underline-offset-4 cursor-pointer pt-1"
              >
                View Complete Specs & Custom Sizing →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
