import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCurtivo } from '../context/CurtivoContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setActiveProductModal, 
    setQuickViewProduct,
    setIsCheckoutOpen 
  } = useCurtivo();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultType = product.curtainTypes[0] || 'Wave Fold';
    
    addToCart({
      productId: product.id,
      productName: product.name,
      price: Math.round(product.price * defaultSize.priceModifier),
      quantity: 1,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      size: defaultSize.label,
      width: defaultSize.width,
      height: defaultSize.height,
      curtainType: defaultType,
      fabric: product.fabric,
      image: product.images[0],
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleQuickAdd(e);
    setIsCheckoutOpen(true);
  };

  return (
    <div 
      className="group flex flex-col bg-white border border-[#D8C7B2]/40 hover:border-[#92785B]/60 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveProductModal(product)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5EFE6]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Bestseller / Featured quiet tag */}
        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-[#30251D] text-[#F5EFE6] text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1">
            Bestseller
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isFavorited 
              ? 'bg-[#30251D] text-white shadow-sm' 
              : 'bg-white/90 text-[#30251D] hover:bg-white hover:text-[#92785B]'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white stroke-white' : 'stroke-current'}`} />
        </button>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#30251D] py-2.5 px-3 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#92785B]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Metadata: Fabric & Opacity */}
          <div className="text-[10px] uppercase tracking-widest text-[#92785B] font-medium mb-1">
            {product.fabric} · {product.opacity.split(' ')[0]}
          </div>

          {/* Product Name */}
          <h3 className="font-heading text-xl text-[#30251D] font-normal group-hover:text-[#92785B] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-[#30251D]/65 line-clamp-1 mt-1 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c)}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedColor.name === c.name 
                  ? 'ring-1 ring-[#30251D] ring-offset-1 scale-110' 
                  : 'border-[#D8C7B2]/70 hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
          <span className="text-[10px] text-[#92785B] ml-1 font-light">
            {selectedColor.name}
          </span>
        </div>

        {/* Rating and Price Row */}
        <div className="pt-2 border-t border-[#D8C7B2]/30 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#30251D]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#92785B] line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#30251D]/70">
            <Star className="w-3.5 h-3.5 fill-[#B9A187] text-[#B9A187]" />
            <span className="font-medium text-[#30251D]">{product.rating}</span>
            <span className="text-[#92785B]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-[#F5EFE6] hover:bg-[#D8C7B2]/40 text-[#30251D] text-[10px] uppercase tracking-wider font-semibold border border-[#D8C7B2] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3 text-[#92785B]" />
            <span>Add to Cart</span>
          </button>
          
          <button
            onClick={handleBuyNow}
            className="w-full py-2.5 px-3 bg-[#30251D] hover:bg-[#201812] text-[#F5EFE6] text-[10px] uppercase tracking-wider font-semibold transition-colors text-center cursor-pointer"
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
};
