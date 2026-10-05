import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import type { Product, ProductColor } from '../types/shop';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color: ProductColor) => void;
  onDirectCheckout: (product: Product, quantity: number, color: ProductColor) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectCheckout,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Natural', hex: '#EAE6DD' });
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'care'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleInstantBuy = () => {
    onDirectCheckout(product, quantity, selectedColor);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF9F6] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto text-stone-900 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto md:overflow-visible">
          
          {/* Gallery View / Left Side */}
          <div className="relative bg-[#F3F2ED] flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-stone-200/80">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-inner flex items-center justify-center bg-stone-100">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => onToggleWishlist(product)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-3 right-3 p-2.5 rounded-full transition-all shadow-sm ${
                  isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-stone-600 hover:text-stone-900'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            {/* Edition Note */}
            {product.editionText && (
              <p className="mt-4 text-center text-xs text-stone-500 font-serif italic">
                {product.editionText}
              </p>
            )}
          </div>

          {/* Contiguous Purchase Module / Right Side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#FAF9F6]">
            <div>
              {/* Category & Designer Kicker */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 mb-2 font-medium">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.designer}</span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 mb-3 leading-tight">
                {product.name}
              </h2>

              {/* Price & Rating Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-semibold font-mono tabular-nums text-stone-950">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono line-through text-stone-400 tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-600 font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="font-semibold text-stone-950">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} collector reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Swatch Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Finish / Fabric:{' '}
                    <span className="font-normal capitalize text-stone-900">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative flex items-center justify-center p-1 rounded-full border-2 transition-all cursor-pointer ${
                            isSelected ? 'border-stone-950 scale-105' : 'border-transparent hover:border-stone-300'
                          }`}
                          title={color.name}
                        >
                          <span
                            className="w-6 h-6 rounded-full shadow-inner block border border-black/10"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-semibold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    disabled={quantity >= product.stockCount}
                    className="px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-500 font-mono">
                  {product.stockCount} available
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer ${
                    addedNotice
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-98'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleInstantBuy}
                  className="py-3.5 px-5 bg-amber-50 hover:bg-amber-100 text-stone-900 border border-stone-300 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Instant Checkout
                </button>
              </div>

              {/* Accordion Navigation Tabs */}
              <div className="border-t border-stone-200 pt-4">
                <div className="flex items-center gap-4 text-xs font-medium text-stone-600 mb-3">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 cursor-pointer transition-colors ${
                      activeTab === 'details' ? 'text-stone-900 font-bold border-b-2 border-stone-900' : 'hover:text-stone-900'
                    }`}
                  >
                    Dimensions & Origin
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-1 cursor-pointer transition-colors ${
                      activeTab === 'materials' ? 'text-stone-900 font-bold border-b-2 border-stone-900' : 'hover:text-stone-900'
                    }`}
                  >
                    Materials
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-1 cursor-pointer transition-colors ${
                      activeTab === 'care' ? 'text-stone-900 font-bold border-b-2 border-stone-900' : 'hover:text-stone-900'
                    }`}
                  >
                    Care & Lead Time
                  </button>
                </div>

                <div className="text-xs text-stone-600 leading-relaxed min-h-[48px]">
                  {activeTab === 'details' && (
                    <div>
                      <p><strong>Dimensions:</strong> {product.dimensions}</p>
                      <p className="mt-1"><strong>Story:</strong> {product.story}</p>
                    </div>
                  )}
                  {activeTab === 'materials' && (
                    <ul className="list-disc list-inside space-y-1">
                      {product.materials.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'care' && (
                    <div>
                      <p><strong>Lead Time:</strong> {product.leadTime}</p>
                      <p className="mt-1"><strong>Maintenance:</strong> {product.care}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quiet Trust Bar */}
              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  Insured Freight
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                  30-Day Return
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  5-Year Warranty
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
