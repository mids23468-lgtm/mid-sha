import React from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    products, 
    setActiveProductModal,
    setSelectedCategory,
    scrollToSection 
  } = useCurtivo();

  if (!isSearchOpen) return null;

  const results = searchQuery.trim() 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.colors.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSelectProduct = (product: typeof products[0]) => {
    setIsSearchOpen(false);
    setActiveProductModal(product);
  };

  const handleViewAllFiltered = () => {
    setIsSearchOpen(false);
    scrollToSection('featured-products');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#F5EFE6] text-[#30251D] border border-[#D8C7B2] shadow-2xl p-6 sm:p-8 animate-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b-2 border-[#30251D] pb-3 mb-6">
          <Search className="w-5 h-5 text-[#92785B]" />
          <input
            type="text"
            autoFocus
            placeholder="Search curtains by name, fabric, room, or color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-base sm:text-lg text-[#30251D] placeholder-[#92785B] focus:outline-none font-light"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#92785B] hover:text-[#30251D] text-xs uppercase tracking-wider font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#30251D] hover:bg-[#D8C7B2] transition-colors cursor-pointer ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 mb-6 text-xs text-[#92785B] flex-wrap">
          <span className="font-medium">Suggested Searches:</span>
          {['Ivory Linen', 'Blackout', 'Sheer Voile', 'Velvet', 'Wave Fold', 'Taupe'].map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-2.5 py-1 bg-white border border-[#D8C7B2]/70 text-[#30251D] hover:border-[#30251D] transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        {searchQuery.trim() ? (
          <div>
            <div className="flex items-center justify-between text-xs text-[#92785B] mb-3">
              <span>{results.length} Curtains Found</span>
              {results.length > 0 && (
                <button
                  onClick={handleViewAllFiltered}
                  className="font-semibold text-[#30251D] hover:underline"
                >
                  View in grid →
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#92785B] bg-white border border-[#D8C7B2]/50">
                No matching curtains found for "{searchQuery}".
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-4 p-3 bg-white border border-[#D8C7B2]/50 hover:border-[#30251D] cursor-pointer transition-all"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-14 object-cover border border-[#D8C7B2]"
                    />
                    <div className="flex-1">
                      <div className="font-heading text-lg text-[#30251D] font-normal leading-tight">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-[#92785B]">
                        {product.fabric} · {product.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm text-[#30251D]">
                        ₹{product.price.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#92785B]">
                        <Star className="w-3 h-3 fill-[#B9A187] text-[#B9A187]" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-[#92785B]">
            Type a curtain style, fabric composition, or room name to filter CURTIVO's atelier inventory.
          </div>
        )}

      </div>
    </div>
  );
};
