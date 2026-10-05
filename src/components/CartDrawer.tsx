import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import type { CartItem } from '../types/shop';
import { PROMO_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string | null) => void;
}

const FREE_SHIPPING_THRESHOLD = 150;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Calculate discount
  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      discountAmount = (subtotal * promo.discountPercent) / 100;
    }
  }

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : 25;
  const tax = Math.round((subtotal - discountAmount) * 0.06);
  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const amountNeededForFreeShip = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const progressPercent = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (PROMO_CODES[cleanCode]) {
      onApplyPromo(cleanCode);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try code "WELCOME10"');
    }
  };

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
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="text-lg font-serif font-bold text-stone-950">
              Shopping Bag
            </h2>
            <span className="text-xs font-mono text-stone-500">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-stone-100 px-5 py-3 border-b border-stone-200 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium text-stone-700">
            {qualifiesForFreeShipping ? (
              <span className="text-emerald-800 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Complimentary global shipping unlocked!
              </span>
            ) : (
              <span>
                Add <strong className="font-mono text-stone-900">${amountNeededForFreeShip}</strong> more for complimentary shipping
              </span>
            )}
            <span className="font-mono text-stone-500 text-[11px]">
              ${subtotal} / ${FREE_SHIPPING_THRESHOLD}
            </span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                qualifiesForFreeShipping ? 'bg-emerald-600' : 'bg-stone-800'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-base font-serif text-stone-800">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Discover our curated selection of architectural ceramics, lighting, and tactile furniture.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
              >
                Browse Objects
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/70 shadow-xs"
              >
                {/* Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover bg-stone-100 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-serif font-bold text-stone-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Remove item"
                        className="text-stone-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-black/10 shrink-0"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <span>{item.selectedColor.name}</span>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 rounded-l cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-mono font-semibold text-stone-900 tabular-nums text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 rounded-r cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono font-semibold text-xs text-stone-950 tabular-nums">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code & Order Summary Footer */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-stone-200 shadow-lg space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-mono font-bold">{appliedPromo}</span>
                    <span className="text-emerald-700 text-[11px]">
                      ({PROMO_CODES[appliedPromo]?.description})
                    </span>
                  </div>
                  <button
                    onClick={() => onApplyPromo(null)}
                    className="text-stone-400 hover:text-stone-700 text-xs font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME10)"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{promoError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Collector Discount</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Freight</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700 font-medium">Free</strong>
                  ) : (
                    `$${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (6%)</span>
                <span className="font-mono tabular-nums">${tax}</span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-base">${total}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
