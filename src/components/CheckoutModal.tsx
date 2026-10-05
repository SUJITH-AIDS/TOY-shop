import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, DollarSign, ArrowLeft, Printer } from 'lucide-react';
import type { CartItem, Order } from '../types/shop';
import { PROMO_CODES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo: string | null;
  onOrderCompleted: (order: Order) => void;
  onOpenTracking: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  onOrderCompleted,
  onOpenTracking
}) => {
  if (!isOpen) return null;

  // Form State
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      discountAmount = (subtotal * promo.discountPercent) / 100;
    }
  }
  const qualifiesForFreeShipping = subtotal >= 150;
  const shippingFee = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : 25;
  const tax = Math.round((subtotal - discountAmount) * 0.06);
  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address || !city || !postalCode) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `ATV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const deliveryDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const newOrder: Order = {
        id: generatedOrderId,
        date: orderDate,
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        tax,
        total,
        status: 'confirmed',
        trackingNumber: `EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: deliveryDate,
        customer: {
          fullName,
          email,
          phone: phone || '+1 (555) 234-5678',
          address,
          city,
          postalCode,
          country
        },
        paymentMethod
      };

      setConfirmedOrder(newOrder);
      onOrderCompleted(newOrder);
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-[#FAF9F6] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto text-stone-900 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm font-serif font-bold tracking-tight text-stone-950">
              ATELIER V
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-xs font-medium text-stone-600">
              {step === 'details' && 'Step 1: Shipping & Delivery'}
              {step === 'payment' && 'Step 2: Payment & Review'}
              {step === 'success' && 'Order Confirmed'}
            </span>
          </div>

          {step !== 'success' && (
            <button
              onClick={onClose}
              aria-label="Close checkout"
              className="p-1 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {step === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form */}
              <form onSubmit={handleDetailsSubmit} className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-serif font-semibold text-stone-900">
                  Delivery Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Email for Order Receipt *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Phone Number (For Delivery SMS)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 cursor-pointer"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Sweden</option>
                      <option>Denmark</option>
                      <option>Germany</option>
                      <option>Japan</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Street Address & Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="10001"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Continue to Payment
                </button>
              </form>

              {/* Right Column: Order Summary Preview */}
              <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-stone-200/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                    Order Summary ({items.length} items)
                  </h4>
                  <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.product.image}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span className="line-clamp-1">{item.product.name} × {item.quantity}</span>
                        </div>
                        <span className="font-mono tabular-nums font-medium">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono tabular-nums">${subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount</span>
                        <span className="font-mono tabular-nums">-${discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Freight Logistics</span>
                      <span className="font-mono tabular-nums">
                        {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span className="font-mono tabular-nums">${tax}</span>
                    </div>
                    <div className="flex justify-between text-stone-950 font-bold text-sm pt-2 border-t border-stone-200">
                      <span>Total Due</span>
                      <span className="font-mono tabular-nums">${total}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    <span>Climate-neutral insured transport</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                    <span>Bank-grade 256-bit encrypted checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Payment selection */}
              <div className="lg:col-span-7 space-y-5">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-950 mb-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to shipping address</span>
                </button>

                <h3 className="text-lg font-serif font-semibold text-stone-900">
                  Select Payment Method
                </h3>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1.5" />
                    <span className="text-xs font-semibold block">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span className="text-sm font-bold block mb-0.5"> Pay</span>
                    <span className="text-xs font-semibold block">Digital Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 mb-1.5" />
                    <span className="text-xs font-semibold block">Cash on Delivery</span>
                  </button>
                </div>

                {/* Form per payment type */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white p-5 rounded-xl border border-stone-200">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="4532 •••• •••• 8921"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="•••"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full mt-4 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing Transaction...' : `Confirm & Pay $${total}`}
                    </button>
                  </form>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div className="bg-white p-6 rounded-xl border border-stone-200 text-center space-y-4">
                    <p className="text-xs text-stone-600">
                      Click below to authorize instantaneous payment via your registered device wallet with FaceID / TouchID.
                    </p>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-black hover:bg-stone-900 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? 'Authorizing Token...' : `Pay $${total} with Apple Pay`}
                    </button>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-4">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                      <strong>Cash on Delivery (White Glove Courier):</strong> You may inspect all packaged architectural goods upon delivery and pay the exact sum of <strong>${total}</strong> directly to our vetted courier.
                    </div>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? 'Securing Courier Slot...' : `Confirm Cash on Delivery ($${total})`}
                    </button>
                  </div>
                )}
              </div>

              {/* Review Shipping Summary */}
              <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-stone-200/80">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                  Shipping To
                </h4>
                <div className="text-xs text-stone-600 leading-relaxed mb-4 pb-4 border-b border-stone-100">
                  <p className="font-semibold text-stone-900">{fullName}</p>
                  <p>{address}</p>
                  <p>{city}, {postalCode}</p>
                  <p>{country}</p>
                  <p className="mt-1 text-stone-500">{email}</p>
                </div>

                <div className="flex justify-between text-stone-950 font-bold text-sm">
                  <span>Grand Total</span>
                  <span className="font-mono tabular-nums">${total}</span>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && confirmedOrder && (
            <div className="max-w-xl mx-auto py-6 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-800 font-bold mb-1">
                  Payment Confirmed
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                  Thank you for your order
                </h3>
                <p className="text-xs text-stone-500 mt-2 font-mono">
                  Order ID: <strong className="text-stone-900 font-bold">{confirmedOrder.id}</strong> · Tracking: {confirmedOrder.trackingNumber}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-medium text-stone-800 pb-2 border-b border-stone-100">
                  <span>Estimated Delivery Window</span>
                  <span className="font-semibold text-emerald-800">{confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Recipient</span>
                  <span>{confirmedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Destination</span>
                  <span>{confirmedOrder.customer.address}, {confirmedOrder.customer.city}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Payment Method</span>
                  <span className="capitalize">{confirmedOrder.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-stone-950 font-bold pt-2 border-t border-stone-100">
                  <span>Total Settled</span>
                  <span className="font-mono tabular-nums">${confirmedOrder.total}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenTracking(confirmedOrder.id);
                  }}
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Track Shipment Timeline
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
