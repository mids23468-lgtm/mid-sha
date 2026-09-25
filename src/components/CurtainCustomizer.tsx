import React, { useState, useMemo } from 'react';
import { 
  Scissors, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Ruler, 
  Palette, 
  Sliders, 
  Info,
  Layers
} from 'lucide-react';
import { CurtainType, FabricType, CurtainColor } from '../types';
import { useCurtivo } from '../context/CurtivoContext';
import { ASSET_IMAGES } from '../data/mockData';

export const CurtainCustomizer: React.FC = () => {
  const { addToCart, setIsCheckoutOpen } = useCurtivo();

  // Selected parameters
  const [curtainType, setCurtainType] = useState<CurtainType>('Wave Fold');
  const [fabric, setFabric] = useState<FabricType>('Linen');
  const [color, setColor] = useState<string>('Soft Beige');
  const [customColorCode, setCustomColorCode] = useState('#D8C7B2');
  const [isCustomColorInput, setIsCustomColorInput] = useState(false);

  // Dimensions
  const [width, setWidth] = useState<number>(7);
  const [height, setHeight] = useState<number>(9.5);
  const [panels, setPanels] = useState<number>(2);
  const [liningOption, setLiningOption] = useState<'Standard Unlined' | 'Thermal Blackout' | 'Sateen Privacy'>('Standard Unlined');

  // Curtain type specifications
  const curtainTypes: { type: CurtainType; desc: string; fullness: string }[] = [
    { type: 'Wave Fold', desc: 'Smooth architectural S-waves with continuous fluid motion', fullness: '2.2× fullness' },
    { type: 'Pinch Pleat', desc: 'Tailored French double pleats with structured elegance', fullness: '2.5× fullness' },
    { type: 'Eyelet', desc: 'Contemporary metal grommets sliding over decorative rods', fullness: '1.8× fullness' },
    { type: 'Rod Pocket', desc: 'Classic concealed casing creating gathered top ruching', fullness: '2.0× fullness' },
    { type: 'Ring Type', desc: 'Modern brass/black hanging rings for quiet glides', fullness: '2.0× fullness' },
  ];

  // Fabrics
  const fabrics: { name: FabricType; baseRate: number; desc: string; opacity: string }[] = [
    { name: 'Linen', baseRate: 85, desc: '100% Belgian flax with airy textured slub', opacity: '55% light filtering' },
    { name: 'Cotton', baseRate: 65, desc: 'Combed organic cotton, matte finish and soft drape', opacity: '60% light filtering' },
    { name: 'Velvet', baseRate: 110, desc: 'Plush matte micro-velvet with acoustic insulation', opacity: '100% blackout' },
    { name: 'Sheer', baseRate: 50, desc: 'Featherlight ethereal weave welcoming daylight', opacity: '15% luminous sheer' },
    { name: 'Polyester', baseRate: 55, desc: 'High-density resilient blend, zero wrinkle', opacity: '70% light filtering' },
  ];

  // Colors
  const colors: { name: string; hex: string }[] = [
    { name: 'Warm Ivory', hex: '#F5EFE6' },
    { name: 'Soft Beige', hex: '#D8C7B2' },
    { name: 'Natural Sand', hex: '#B9A187' },
    { name: 'Earthy Taupe', hex: '#92785B' },
    { name: 'Deep Mocha', hex: '#30251D' },
    { name: 'Warm White', hex: '#FFFFFF' },
  ];

  // Dynamic price calculation
  const calculatedUnitPrice = useMemo(() => {
    const selectedFabricObj = fabrics.find(f => f.name === fabric) || fabrics[0];
    const sqFt = width * height;
    
    // Header complexity modifier
    const headerModifier = curtainType === 'Pinch Pleat' ? 1.2 : curtainType === 'Wave Fold' ? 1.15 : 1.0;
    
    // Lining cost
    const liningCost = liningOption === 'Thermal Blackout' ? sqFt * 25 : liningOption === 'Sateen Privacy' ? sqFt * 15 : 0;

    const baseCost = (sqFt * selectedFabricObj.baseRate * headerModifier) + liningCost;
    return Math.max(1800, Math.round(baseCost));
  }, [width, height, fabric, curtainType, liningOption]);

  const totalCalculated = calculatedUnitPrice * panels;

  const handleAddBespokeToCart = () => {
    addToCart({
      productId: 'bespoke-curtain-custom',
      productName: `CURTIVO Bespoke ${curtainType} (${fabric})`,
      price: calculatedUnitPrice,
      quantity: panels,
      color: color,
      colorHex: customColorCode,
      size: `${width}ft × ${height}ft (Bespoke)`,
      width,
      height,
      curtainType,
      fabric,
      image: fabric === 'Velvet' 
        ? ASSET_IMAGES.blackout 
        : fabric === 'Sheer' 
        ? ASSET_IMAGES.sheerBed 
        : ASSET_IMAGES.hero,
      isCustomSize: true,
    });
  };

  const handleOrderNow = () => {
    handleAddBespokeToCart();
    setIsCheckoutOpen(true);
  };

  return (
    <section id="customizer-studio" className="py-24 bg-[#EBE2D5]/50 border-b border-[#D8C7B2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold">
            <Scissors className="w-3.5 h-3.5" />
            <span>Interactive Atelier</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight mb-4">
            Curtain Customization Studio
          </h2>
          <p className="text-sm sm:text-base text-[#30251D]/75 font-light leading-relaxed">
            Configure header styles, artisan fabrics, curated colors, and exact architectural window dimensions with live dynamic pricing.
          </p>
        </div>

        {/* Studio Workspace: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Architectural Preview (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#D8C7B2] shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] uppercase tracking-widest text-[#92785B] font-semibold">
                Live Curtain Drape Simulation
              </span>
              <span className="text-xs font-semibold text-[#30251D] bg-[#F5EFE6] px-2.5 py-1">
                {width}ft × {height}ft
              </span>
            </div>

            {/* Simulated Window Frame */}
            <div className="relative aspect-[3/4] bg-[#F5EFE6] border-4 border-[#30251D]/10 overflow-hidden flex flex-col justify-between p-4">
              
              {/* Background Window Scene */}
              <div className="absolute inset-4 bg-gradient-to-b from-sky-100/40 via-amber-50/20 to-stone-100 flex items-center justify-center opacity-80">
                <div className="w-full h-full border-2 border-white/60 grid grid-cols-2 grid-rows-3" />
              </div>

              {/* Curtain Rod / Track */}
              <div className="relative z-10 w-full h-2.5 bg-[#30251D] rounded-full shadow-xs mb-1 flex items-center justify-between px-2">
                <div className="w-2 h-4 bg-[#92785B] rounded-xs -ml-2" />
                <div className="w-2 h-4 bg-[#92785B] rounded-xs -mr-2" />
              </div>

              {/* Draped Curtains (Left and Right panels) */}
              <div className="relative z-10 flex-1 flex justify-between gap-1 overflow-hidden">
                {/* Left Panel */}
                <div 
                  className="w-[46%] h-full transition-all duration-500 shadow-md flex flex-col justify-end p-2 relative"
                  style={{
                    backgroundColor: customColorCode,
                    opacity: fabric === 'Sheer' ? 0.72 : 1,
                  }}
                >
                  {/* Folds simulation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/15 pointer-events-none" />
                  <div className="relative z-10 text-[9px] uppercase tracking-wider text-black/60 bg-white/70 px-1.5 py-0.5 self-start">
                    Panel 1
                  </div>
                </div>

                {/* Center Light gap */}
                <div className="w-[8%] flex items-center justify-center">
                  <div className="w-px h-full bg-amber-400/20 shadow-lg" />
                </div>

                {/* Right Panel */}
                <div 
                  className="w-[46%] h-full transition-all duration-500 shadow-md flex flex-col justify-end p-2 relative"
                  style={{
                    backgroundColor: customColorCode,
                    opacity: fabric === 'Sheer' ? 0.72 : 1,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/20 pointer-events-none" />
                  <div className="relative z-10 text-[9px] uppercase tracking-wider text-black/60 bg-white/70 px-1.5 py-0.5 self-end">
                    Panel 2
                  </div>
                </div>
              </div>

              {/* Bottom floor line */}
              <div className="relative z-10 w-full h-3 bg-[#D8C7B2]/40 border-t border-[#B9A187]/40 mt-1" />
            </div>

            {/* Spec Sheet Summary */}
            <div className="mt-6 pt-5 border-t border-[#D8C7B2]/50 space-y-2 text-xs">
              <div className="flex justify-between text-[#92785B]">
                <span>Header Style:</span>
                <span className="font-semibold text-[#30251D]">{curtainType}</span>
              </div>
              <div className="flex justify-between text-[#92785B]">
                <span>Fabric & Finish:</span>
                <span className="font-semibold text-[#30251D]">{fabric} · {liningOption}</span>
              </div>
              <div className="flex justify-between text-[#92785B]">
                <span>Color Choice:</span>
                <span className="font-semibold text-[#30251D] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block border" style={{ backgroundColor: customColorCode }} />
                  {color}
                </span>
              </div>
              <div className="flex justify-between text-[#92785B]">
                <span>Window Dimensions:</span>
                <span className="font-semibold text-[#30251D]">{width}ft W × {height}ft H ({panels} panels)</span>
              </div>
            </div>

            {/* Dynamic Calculated Pricing Summary */}
            <div className="mt-6 p-4 bg-[#F5EFE6] border border-[#D8C7B2] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#92785B] block font-medium">
                  Dynamic Price Estimation
                </span>
                <span className="text-xs text-[#30251D]/70 font-light">
                  ₹{calculatedUnitPrice.toLocaleString()} / panel × {panels} panels
                </span>
              </div>
              <div className="font-heading text-3xl font-medium text-[#30251D]">
                ₹{totalCalculated.toLocaleString()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleAddBespokeToCart}
                className="w-full py-3 bg-white hover:bg-[#F5EFE6] text-[#30251D] border border-[#30251D] text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#92785B]" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleOrderNow}
                className="w-full py-3 bg-[#30251D] hover:bg-[#201812] text-[#F5EFE6] text-[11px] uppercase tracking-widest font-semibold transition-colors text-center cursor-pointer shadow-sm"
              >
                Order Now
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#D8C7B2] shadow-sm space-y-8">
            
            {/* 1. Curtain Type Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#30251D] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#30251D] text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  Select Curtain Header Type
                </label>
                <span className="text-xs text-[#92785B] font-medium">{curtainType}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curtainTypes.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setCurtainType(item.type)}
                    className={`p-3.5 text-left border transition-all cursor-pointer ${
                      curtainType === item.type
                        ? 'border-[#30251D] bg-[#F5EFE6] shadow-xs'
                        : 'border-[#D8C7B2]/70 hover:border-[#92785B]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#30251D]">{item.type}</span>
                      {curtainType === item.type && <Check className="w-4 h-4 text-[#30251D]" />}
                    </div>
                    <p className="text-[11px] text-[#92785B] mt-1 leading-snug">{item.desc}</p>
                    <span className="text-[10px] text-[#30251D]/60 uppercase tracking-wider mt-2 block font-medium">
                      {item.fullness}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fabric Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#30251D] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#30251D] text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  Choose Master Fabric
                </label>
                <span className="text-xs text-[#92785B] font-medium">{fabric}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {fabrics.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setFabric(item.name)}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      fabric === item.name
                        ? 'border-[#30251D] bg-[#F5EFE6] shadow-xs'
                        : 'border-[#D8C7B2]/70 hover:border-[#92785B]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#30251D]">{item.name}</div>
                    <div className="text-[10px] text-[#92785B] mt-0.5">{item.opacity}</div>
                    <div className="text-[10px] text-[#30251D]/80 font-medium mt-1">₹{item.baseRate}/sq.ft</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#30251D] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#30251D] text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                  Palette & Hue
                </label>
                <span className="text-xs text-[#92785B] font-medium">{color}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setColor(c.name);
                      setCustomColorCode(c.hex);
                      setIsCustomColorInput(false);
                    }}
                    className={`flex flex-col items-center p-2.5 border transition-all cursor-pointer ${
                      color === c.name && !isCustomColorInput
                        ? 'border-[#30251D] bg-[#F5EFE6]'
                        : 'border-[#D8C7B2]/60 hover:border-[#30251D]'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full border border-black/10 shadow-xs mb-1.5" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span className="text-[10px] text-[#30251D] font-medium text-center truncate w-full">
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Color Option */}
              <div className="mt-3 flex items-center gap-3 p-3 bg-[#F5EFE6]/60 border border-[#D8C7B2]/60">
                <Palette className="w-4 h-4 text-[#92785B]" />
                <span className="text-xs text-[#30251D] font-medium">Custom Color Match:</span>
                <input
                  type="color"
                  value={customColorCode}
                  onChange={(e) => {
                    setCustomColorCode(e.target.value);
                    setColor('Custom Shade');
                    setIsCustomColorInput(true);
                  }}
                  className="w-8 h-8 rounded border border-[#D8C7B2] cursor-pointer"
                  title="Pick custom hue"
                />
                <span className="text-xs text-[#92785B] uppercase font-mono">{customColorCode}</span>
              </div>
            </div>

            {/* 4. Custom Window Measurements */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#30251D] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#30251D] text-white rounded-full flex items-center justify-center text-[10px]">4</span>
                  Window Dimensions & Panels
                </label>
                <span className="text-xs text-[#92785B]">Quarter-inch precision</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1.5 font-medium">
                    Width (feet)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="2"
                      max="30"
                      step="0.5"
                      value={width}
                      onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full p-3 border border-[#D8C7B2] text-sm font-semibold focus:outline-none focus:border-[#30251D] bg-[#F5EFE6]/30"
                    />
                    <span className="absolute right-3 top-3 text-xs text-[#92785B]">ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1.5 font-medium">
                    Height / Drop (feet)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="3"
                      max="25"
                      step="0.5"
                      value={height}
                      onChange={(e) => setHeight(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full p-3 border border-[#D8C7B2] text-sm font-semibold focus:outline-none focus:border-[#30251D] bg-[#F5EFE6]/30"
                    />
                    <span className="absolute right-3 top-3 text-xs text-[#92785B]">ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#92785B] mb-1.5 font-medium">
                    Panels Needed
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={panels}
                      onChange={(e) => setPanels(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-3 border border-[#D8C7B2] text-sm font-semibold focus:outline-none focus:border-[#30251D] bg-[#F5EFE6]/30"
                    />
                    <span className="absolute right-3 top-3 text-xs text-[#92785B]">pairs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Lining Option */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#30251D] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#30251D] text-white rounded-full flex items-center justify-center text-[10px]">5</span>
                  Interior Lining Layer
                </label>
                <span className="text-xs text-[#92785B] font-medium">{liningOption}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['Standard Unlined', 'Thermal Blackout', 'Sateen Privacy'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setLiningOption(opt)}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      liningOption === opt
                        ? 'border-[#30251D] bg-[#F5EFE6]'
                        : 'border-[#D8C7B2]/70 hover:border-[#92785B]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#30251D]">{opt}</div>
                    <div className="text-[10px] text-[#92785B] mt-0.5">
                      {opt === 'Thermal Blackout' ? '+₹25/sq.ft' : opt === 'Sateen Privacy' ? '+₹15/sq.ft' : 'Included'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
