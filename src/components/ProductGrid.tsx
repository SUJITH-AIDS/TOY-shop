import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, RotateCcw, Search } from 'lucide-react';
import type { Product, ProductCategory } from '../types/shop';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceTier, setPriceTier] = useState<'all' | 'under200' | '200to600' | 'over600'>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesigner = p.designer.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesMaterial = p.materials.some((m) => m.toLowerCase().includes(query));
        if (!matchesName && !matchesDesigner && !matchesDesc && !matchesMaterial) {
          return false;
        }
      }
      // In stock
      if (inStockOnly && !p.inStock) {
        return false;
      }
      // Price tier
      if (priceTier === 'under200' && p.price >= 200) return false;
      if (priceTier === '200to600' && (p.price < 200 || p.price > 600)) return false;
      if (priceTier === 'over600' && p.price <= 600) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured maintains default order
    });
  }, [products, selectedCategory, searchQuery, inStockOnly, priceTier, sortOption]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    inStockOnly ||
    priceTier !== 'all';

  const resetAllFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
    setInStockOnly(false);
    setPriceTier('all');
    setSortOption('featured');
  };

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header & Subtitle */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1 block">
            Curated Catalog
          </span>
          <h2 className="text-3xl font-serif text-stone-900 tracking-tight">
            Architectural Objects & Furnishings
          </h2>
        </div>

        {/* Count & Reset */}
        <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
          <span>Showing <strong className="text-stone-900 font-semibold tabular-nums">{filteredProducts.length}</strong> crafted objects</span>
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 text-stone-900 underline hover:text-stone-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Controls Bar: Category Segments, Price Tiers, Sort, Stock */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Functional Category Filter Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl overflow-x-auto no-scrollbar">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => onSelectCategory('furniture')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'furniture'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Furniture
            </button>
            <button
              onClick={() => onSelectCategory('lighting')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'lighting'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Lighting
            </button>
            <button
              onClick={() => onSelectCategory('ceramics')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'ceramics'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Ceramics
            </button>
            <button
              onClick={() => onSelectCategory('objects')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'objects'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Objects
            </button>
          </div>

          {/* Secondary Controls: Price Filter, In-Stock, Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter Dropdown / Segments */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-stone-500 mr-1 hidden sm:inline">Price:</span>
              <button
                onClick={() => setPriceTier('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceTier === 'all'
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPriceTier('under200')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceTier === 'under200'
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                &lt;$200
              </button>
              <button
                onClick={() => setPriceTier('200to600')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceTier === '200to600'
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                $200–$600
              </button>
              <button
                onClick={() => setPriceTier('over600')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  priceTier === 'over600'
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                &gt;$600
              </button>
            </div>

            {/* In-stock toggle */}
            <label className="flex items-center gap-2 text-xs text-stone-700 bg-stone-100 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-stone-200 transition-colors select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-stone-900 rounded"
              />
              <span>In Stock</span>
            </label>

            {/* Sort Selection */}
            <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-transparent text-xs text-stone-900 focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

          </div>
        </div>

        {/* Active Search Chip */}
        {searchQuery.trim() && (
          <div className="flex items-center gap-2 text-xs text-stone-600 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg w-fit">
            <Search className="w-3.5 h-3.5 text-amber-700" />
            <span>Filtering by term &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
            <button
              onClick={() => onSearchChange('')}
              className="text-amber-800 hover:text-stone-950 font-bold ml-1 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-stone-100/60 rounded-2xl border border-stone-200 max-w-lg mx-auto p-8">
          <SlidersHorizontal className="w-8 h-8 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-semibold text-stone-900 mb-1">
            No matching design pieces
          </h3>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            We couldn&apos;t find any objects matching your active criteria. Try broadening your category or resetting the price filter.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
};
