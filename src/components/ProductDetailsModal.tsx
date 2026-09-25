import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Ruler, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Scissors
} from 'lucide-react';
import { Product, CurtainType, ProductColorOption, ProductSizeOption } from '../types';
import { useCurtivo } from '../context/CurtivoContext';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setIsCheckoutOpen,
    submitCustomRequest 
  } = useCurtivo();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption | null>(null);
  const [selectedType, setSelectedType] = useState<CurtainType>('Wave Fold');
  const [quantity, setQuantity] = useState(1);

  // Custom Size toggle & inputs
  const [isCustomSizeActive, setIsCustomSizeActive] = useState(false);
  const [customWidth, setCustomWidth] = useState('7');
  const [customHeight, setCustomHeight] = useState('9.5');
  const [customQuantity, setCustomQuantity] = useState(2);
  const [customSubmittedMessage, setCustomSubmittedMessage] = useState(false);

  // Accordion tabs
  const [activeAccordion, setActiveAccordion] = useState<string | null>('fabric');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedType(product.curtainTypes[0] || 'Wave Fold');
      setQuantity(1);
      setIsCustomSizeActive(false);
      setCustomSubmittedMessage(false);
    }
  }, [product]);

  if (!product || !selectedColor || !selectedSize) return null;

  const isFavorited = isWishlisted(product.id);

  // Dynamic calculated price for standard vs custom
  const calculatedUnitPrice = isCustomSizeActive 
    ? Math.round((parseFloat(customWidth) || 5) * (parseFloat(customHeight) || 7) * 70 + (product.price * 0.4))
    : Math.round(product.price * selectedSize.priceModifier);

  const totalPrice = calculatedUnitPrice * (isCustomSizeActive ? customQuantity : quantity);

  const handleAddToCart = () => {
    if (isCustomSizeActive) {
      addToCart({
        productId: product.id,
        productName: `${product.name} (Bespoke Sizing)`,
        price: calculatedUnitPrice,
        quantity: customQuantity,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
        size: `Custom ${customWidth}ft × ${customHeight}ft`,
        width: customWidth,
        height: customHeight,
        curtainType: selectedType,
        fabric: product.fabric,
        image: selectedImage,
        isCustomSize: true,
      });
    } else {
      addToCart({
        productId: product.id,
        productName: product.name,
        price: calculatedUnitPrice,
        quantity,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
        size: selectedSize.label,
        width: selectedSize.width,
        height: selectedSize.height,
        curtainType: selectedType,
        fabric: product.fabric,
        image: selectedImage,
        isCustomSize: false,
      });
    }
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCheckoutOpen(true);
  };

  const handleCustomRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCustomRequest({
      name: 'Custom Size Inquiry',
      phone: 'Follow-up requested',
      email: 'client@curtivo.com',
      roomType: 'Client Room Window',
      windowWidth: `${customWidth} ft`,
      windowHeight: `${customHeight} ft`,
      preferredFabric: product.fabric,
      preferredColor: selectedColor.name,
      quantity: customQuantity,
      additionalRequirements: `Product: ${product.name}, Header: ${selectedType}`,
    });
    setCustomSubmittedMessage(true);
    setTimeout(() => setCustomSubmittedMessage(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#F5EFE6] text-[#30251D] shadow-2xl border border-[#D8C7B2] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 hover:bg-white text-[#30251D] rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Gallery (5 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D8C7B2]/40">
            <div>
              {/* Main Image */}
              <div className="relative aspect-[4/5] bg-[#F5EFE6] overflow-hidden mb-4 border border-[#D8C7B2]/30">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#30251D] text-[#F5EFE6] text-[9px] uppercase tracking-widest px-2.5 py-1 font-medium">
                  {product.category}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img ? 'border-[#30251D]' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Guarantees bar */}
            <div className="mt-8 pt-6 border-t border-[#D8C7B2]/40 grid grid-cols-3 gap-3 text-center text-[10px] text-[#92785B] uppercase tracking-wider font-medium">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#30251D]" />
                <span>Express Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#30251D]" />
                <span>Master Grade Flax</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#30251D]" />
                <span>Perfect Fit Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Sizing & Configuration (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-6">
            
            {/* Header: Title, Reviews, Price */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#92785B] mb-1">
                <span className="uppercase tracking-[0.2em] font-medium">{product.fabric} Atelier</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#B9A187] text-[#B9A187]" />
                  <span className="font-semibold text-[#30251D]">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl text-[#30251D] font-normal leading-tight">
                {product.name}
              </h2>

              <p className="text-sm text-[#92785B] font-light mt-1 italic">
                {product.tagline}
              </p>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-semibold text-[#30251D]">
                  ₹{calculatedUnitPrice.toLocaleString()}
                </span>
                {product.originalPrice && !isCustomSizeActive && (
                  <span className="text-sm text-[#92785B] line-through">
                    ₹{Math.round(product.originalPrice * selectedSize.priceModifier).toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-[#92785B]">per panel (incl. of all taxes)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#30251D]/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* 1. Color Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-wider text-[#30251D] font-medium">Color:</span>
                <span className="text-[#92785B] font-medium">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                      selectedColor.name === c.name 
                        ? 'ring-2 ring-[#30251D] ring-offset-2 scale-110' 
                        : 'border-[#D8C7B2] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* 2. Header / Pleat Style Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-wider text-[#30251D] font-medium">Header Pleat Type:</span>
                <span className="text-[#92785B]">{selectedType}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {product.curtainTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`py-2 px-1 text-[11px] uppercase tracking-wider font-medium text-center border transition-all cursor-pointer ${
                      selectedType === t
                        ? 'bg-[#30251D] text-[#F5EFE6] border-[#30251D]'
                        : 'bg-white text-[#30251D] border-[#D8C7B2]/70 hover:border-[#30251D]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Standard Dimensions vs Custom Sizing */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-[#30251D] font-medium">Select Size:</span>
                <button
                  type="button"
                  onClick={() => setIsCustomSizeActive(!isCustomSizeActive)}
                  className="text-xs text-[#92785B] hover:text-[#30251D] font-semibold underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{isCustomSizeActive ? 'Use Standard Sizes' : 'Need a Custom Size?'}</span>
                </button>
              </div>

              {!isCustomSizeActive ? (
                /* Standard sizes selector */
                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        selectedSize.label === s.label
                          ? 'border-[#30251D] bg-white shadow-xs'
                          : 'border-[#D8C7B2]/70 bg-white/50 hover:bg-white text-[#30251D]/80'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#30251D]">{s.label}</div>
                      <div className="text-[10px] text-[#92785B] mt-0.5">
                        ₹{Math.round(product.price * s.priceModifier).toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Custom Sizing Module */
                <div className="p-4 bg-white border border-[#30251D]/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#30251D]">
                      Bespoke Tailoring Dimensions
                    </span>
                    <span className="text-[10px] bg-[#30251D] text-[#F5EFE6] px-2 py-0.5 uppercase tracking-widest">
                      Custom Fit
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                        Width (ft)
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="25"
                        step="0.5"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        className="w-full p-2 border border-[#D8C7B2] text-xs font-medium focus:outline-none focus:border-[#30251D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                        Height (ft)
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="20"
                        step="0.5"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                        className="w-full p-2 border border-[#D8C7B2] text-xs font-medium focus:outline-none focus:border-[#30251D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#92785B] mb-1 font-medium">
                        Panels
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={customQuantity}
                        onChange={(e) => setCustomQuantity(parseInt(e.target.value) || 1)}
                        className="w-full p-2 border border-[#D8C7B2] text-xs font-medium focus:outline-none focus:border-[#30251D]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#D8C7B2]/40 text-xs">
                    <span className="text-[#92785B]">Bespoke Estimated Unit Price:</span>
                    <span className="font-semibold text-sm text-[#30251D]">
                      ₹{calculatedUnitPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCustomRequestSubmit}
                      className="flex-1 py-2 text-[10px] uppercase tracking-widest font-semibold border border-[#30251D] text-[#30251D] hover:bg-[#30251D] hover:text-[#F5EFE6] transition-colors"
                    >
                      Request Custom Size
                    </button>
                  </div>

                  {customSubmittedMessage && (
                    <div className="p-2 bg-[#D8C7B2]/40 text-[11px] text-[#30251D] text-center font-medium">
                      ✓ Custom sizing request logged! You can also Add to Bag now.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-4">
                {!isCustomSizeActive && (
                  <div className="flex items-center border border-[#D8C7B2] bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-sm text-[#30251D] hover:bg-[#F5EFE6] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#30251D]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-sm text-[#30251D] hover:bg-[#F5EFE6] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                )}

                <div className="flex-1 text-right">
                  <span className="text-xs text-[#92785B] block">Total Amount:</span>
                  <span className="font-heading text-2xl font-medium text-[#30251D]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Add to Cart & Buy Now Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#F5EFE6] hover:bg-[#D8C7B2]/50 text-[#30251D] border border-[#30251D] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#92785B]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#30251D] hover:bg-[#201812] text-[#F5EFE6] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center cursor-pointer shadow-sm"
                >
                  Buy Now
                </button>
              </div>

              {/* Wishlist Link */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-full text-center text-xs text-[#92785B] hover:text-[#30251D] py-1 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#30251D] text-[#30251D]' : ''}`} />
                <span>{isFavorited ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Accordions: Fabric Details, Care Instructions, Delivery & Returns */}
            <div className="border-t border-[#D8C7B2]/50 pt-4 space-y-2 text-xs">
              
              {/* 1. Fabric Details */}
              <div className="border-b border-[#D8C7B2]/30 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs uppercase tracking-wider font-medium text-[#30251D] cursor-pointer"
                >
                  <span>Fabric Specifications</span>
                  {activeAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="pt-2 text-[#30251D]/80 space-y-1 font-light">
                    <p>{product.fabricDetails}</p>
                    <p><strong className="font-medium text-[#30251D]">Light Opacity:</strong> {product.opacity}</p>
                    <p><strong className="font-medium text-[#30251D]">Drape Finish:</strong> Lead-weighted bottom hem for clean architectural columns.</p>
                  </div>
                )}
              </div>

              {/* 2. Care Instructions */}
              <div className="border-b border-[#D8C7B2]/30 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs uppercase tracking-wider font-medium text-[#30251D] cursor-pointer"
                >
                  <span>Care Instructions</span>
                  {activeAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'care' && (
                  <ul className="pt-2 space-y-1 text-[#30251D]/80 font-light list-disc list-inside">
                    {product.careInstructions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 3. Delivery & Returns */}
              <div className="border-b border-[#D8C7B2]/30 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'delivery' ? null : 'delivery')}
                  className="w-full flex items-center justify-between text-left py-1 text-xs uppercase tracking-wider font-medium text-[#30251D] cursor-pointer"
                >
                  <span>Estimated Delivery & Returns</span>
                  {activeAccordion === 'delivery' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'delivery' && (
                  <div className="pt-2 text-[#30251D]/80 space-y-2 font-light">
                    <p>Standard delivery: 3 to 5 business days via BlueDart Express.</p>
                    <p>Custom-sized orders: 7 to 10 days hand-crafted tailoring in our atelier.</p>
                    <p>14-Day Returns & Exchanges on standard panels. Perfect Fit Guarantee on all bespoke orders.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
