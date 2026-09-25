import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useCurtivo } from '../context/CurtivoContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery } = useCurtivo();

  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    'All',
    'Sheer Curtains',
    'Blackout Curtains',
    'Living Room Curtains',
    'Bedroom Curtains',
    'Luxury Collection'
  ];

  const fabrics = ['All', 'Linen', 'Cotton', 'Velvet', 'Sheer', 'Blackout Linen'];

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
      
      // Fabric filter
      const matchesFabric = selectedFabric === 'All' || prod.fabric === selectedFabric;

      // Search Query filter
      const matchesSearch = !searchQuery || 
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.colors.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesFabric && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedFabric, searchQuery, sortBy]);

  return (
    <section id="featured-products" className="py-24 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#92785B] font-semibold block mb-3">
            Hand-Finished Drapery
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#30251D] font-normal tracking-tight mb-4">
            Featured Curtains
          </h2>
          <p className="text-sm sm:text-base text-[#30251D]/75 font-light leading-relaxed">
            Tailored to perfection with weighted hems, meticulous header pleating, and sustainably sourced master fibers.
          </p>
        </div>

        {/* Category Tabs (Segmented Luxury Controls) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 scrollbar-none gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#30251D] text-[#F5EFE6] shadow-xs'
                  : 'bg-white/60 text-[#30251D]/80 hover:bg-white hover:text-[#30251D] border border-[#D8C7B2]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 bg-white border border-[#D8C7B2]/50 mb-10 text-xs">
          
          {/* Fabric Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#92785B]" />
            <span className="text-[#92785B] uppercase tracking-wider font-medium">Fabric:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {fabrics.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFabric(f)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedFabric === f 
                      ? 'bg-[#D8C7B2] text-[#30251D]' 
                      : 'text-[#30251D]/70 hover:text-[#30251D]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#92785B]" />
            <span className="text-[#92785B] uppercase tracking-wider font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent border-0 text-[#30251D] font-medium focus:ring-0 cursor-pointer text-xs"
            >
              <option value="featured">Featured Curtains</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-[#D8C7B2]/40 p-8">
            <h3 className="font-heading text-2xl text-[#30251D] mb-2 font-normal">
              No Curtains Found
            </h3>
            <p className="text-sm text-[#92785B] mb-6">
              We couldn't find curtains matching your current filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedFabric('All');
              }}
              className="px-6 py-2.5 bg-[#30251D] text-[#F5EFE6] text-xs uppercase tracking-wider font-medium hover:bg-[#43352A]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
