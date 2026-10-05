import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, PackageCheck, X } from 'lucide-react';
import type { ProductCategory } from '../types/shop';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrderLookup: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrderLookup,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Promotional Top Announcement Bar (Slim <= 40px) */}
      {showBanner && (
        <div className="bg-[#1C1917] text-[#FAF9F6] px-4 py-2 text-xs flex items-center justify-between tracking-wide">
          <div className="flex-1 text-center font-normal">
            <span>Complimentary worldwide white-glove delivery on orders over $150</span>
            <span className="mx-2 hidden md:inline text-stone-400">·</span>
            <span className="hidden md:inline text-stone-300">Code <strong className="font-semibold text-white">WELCOME10</strong> for 10% off</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss announcement"
            className="text-stone-400 hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 3-Zone Architecture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-serif font-bold tracking-tight text-stone-900 shrink-0 hover:opacity-85 transition-opacity"
        >
          ATELIER V
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors py-1 cursor-pointer ${
              selectedCategory === 'all'
                ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            All Catalog
          </button>
          <button
            onClick={() => onSelectCategory('furniture')}
            className={`transition-colors py-1 cursor-pointer ${
              selectedCategory === 'furniture'
                ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Furniture
          </button>
          <button
            onClick={() => onSelectCategory('lighting')}
            className={`transition-colors py-1 cursor-pointer ${
              selectedCategory === 'lighting'
                ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Lighting
          </button>
          <button
            onClick={() => onSelectCategory('ceramics')}
            className={`transition-colors py-1 cursor-pointer ${
              selectedCategory === 'ceramics'
                ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Ceramics
          </button>
          <button
            onClick={() => onSelectCategory('objects')}
            className={`transition-colors py-1 cursor-pointer ${
              selectedCategory === 'objects'
                ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Objects
          </button>
          <a
            href="#story"
            className="hover:text-stone-900 transition-colors py-1 cursor-pointer"
          >
            Our Story
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Search, Order Track, Wishlist, Cart Bag) */}
        <div className="flex items-center gap-3">
          {/* Search Trigger or Expandable Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-stone-100 rounded-full pl-3 pr-2 py-1.5 border border-stone-300 w-48 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-stone-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none text-xs text-stone-900 focus:outline-none w-full"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-700 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="Search catalog"
                className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
                title="Search products"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          {/* Track Order Lookup Affordance */}
          <button
            onClick={onOpenOrderLookup}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Track existing shipment"
          >
            <PackageCheck className="w-4 h-4 text-stone-500" />
            <span className="hidden md:inline">Track Order</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="View saved items"
            className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag CTA */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums">
              {cartCount}
            </span>
            {cartTotal > 0 && (
              <span className="hidden sm:inline font-mono tabular-nums text-stone-300 border-l border-stone-700 pl-2">
                ${cartTotal.toFixed(0)}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Category Quick Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-4 px-4 py-2 border-t border-stone-200/70 text-xs text-stone-600 no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`whitespace-nowrap pb-1 ${selectedCategory === 'all' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          All Catalog
        </button>
        <button
          onClick={() => onSelectCategory('furniture')}
          className={`whitespace-nowrap pb-1 ${selectedCategory === 'furniture' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Furniture
        </button>
        <button
          onClick={() => onSelectCategory('lighting')}
          className={`whitespace-nowrap pb-1 ${selectedCategory === 'lighting' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Lighting
        </button>
        <button
          onClick={() => onSelectCategory('ceramics')}
          className={`whitespace-nowrap pb-1 ${selectedCategory === 'ceramics' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Ceramics
        </button>
        <button
          onClick={() => onSelectCategory('objects')}
          className={`whitespace-nowrap pb-1 ${selectedCategory === 'objects' ? 'text-stone-900 font-semibold border-b border-stone-900' : ''}`}
        >
          Objects
        </button>
      </div>
    </header>
  );
};
