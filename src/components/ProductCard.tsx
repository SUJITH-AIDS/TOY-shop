import React, { useState } from 'react';
import { Heart, Eye, Plus, Check, Star } from 'lucide-react';
import type { Product } from '../types/shop';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article
      className="group relative flex flex-col bg-[#FAF9F6] border border-stone-200/70 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
    >
      {/* Visual Canvas Slot (Lead with Imagery, 4:3 or 1:1 Aspect Ratio) */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full bg-[#F3F2ED] overflow-hidden flex items-center justify-center">
        {/* Placeholder / Loading shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-200/50 animate-pulse flex items-center justify-center">
            <span className="text-xs text-stone-400 font-mono">Loading studio asset...</span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Badges (Subtle unboxed or quiet text label - max 1) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.isNew && (
            <span className="bg-stone-900/90 text-stone-100 text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded backdrop-blur-xs">
              New Arrival
            </span>
          )}
          {!product.isNew && product.isBestseller && (
            <span className="bg-[#FAF9F6]/90 text-stone-800 text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded border border-stone-300/80 backdrop-blur-xs">
              Atelier Classic
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-xs cursor-pointer ${
            isWishlisted
              ? 'bg-red-50 text-red-600 scale-105'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-red-600 scale-110' : ''}`}
          />
        </button>

        {/* Quick Actions Overlay (Desktop hover / accessible focus) */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleAdd}
            className={`py-2 px-3.5 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
            title="Quick add to bag"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 uppercase tracking-wider font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.designer}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-serif font-semibold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Quiet Product Specs */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Bottom Line: Price, Rating & Swatches */}
        <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between gap-2">
          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-stone-950 font-mono tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 text-xs text-stone-600 font-mono tabular-nums">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-semibold text-stone-900">{product.rating}</span>
            <span className="text-stone-400">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
