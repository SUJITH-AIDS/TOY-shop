import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import type { Product } from '../types/shop';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onMoveAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onMoveAllToCart
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <h2 className="text-lg font-serif font-bold text-stone-950">
              Saved Pieces
            </h2>
            <span className="text-xs font-mono text-stone-500">
              ({wishlistProducts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <Heart className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-base font-serif text-stone-800">Your wishlist is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Save your favorite pieces by clicking the heart icon on any object card.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/70 shadow-xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover bg-stone-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-serif font-bold text-stone-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        aria-label="Remove from wishlist"
                        className="text-stone-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-0.5 capitalize">
                      {product.category} · {product.designer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono font-semibold text-xs text-stone-950 tabular-nums">
                      ${product.price}
                    </span>

                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 bg-white border-t border-stone-200 shadow-lg">
            <button
              onClick={onMoveAllToCart}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Move All Pieces to Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
