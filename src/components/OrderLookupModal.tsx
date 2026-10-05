import React, { useState } from 'react';
import { X, Search, CheckCircle2, PackageCheck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import type { Order } from '../types/shop';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  defaultOrderId?: string;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  orders,
  defaultOrderId
}) => {
  const [searchId, setSearchId] = useState(defaultOrderId || '');
  const [activeOrder, setActiveOrder] = useState<Order | null>(
    orders.find((o) => o.id === defaultOrderId) || orders[0] || null
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    const match = orders.find((o) => o.id.toUpperCase() === cleanId);
    if (match) {
      setActiveOrder(match);
    } else {
      alert(`No active order found with ID "${searchId}". Try placing a sample order through checkout.`);
    }
  };

  const steps = [
    { label: 'Order Confirmed', desc: 'Payment settled & registered', done: true },
    { label: 'Artisan Workshop Assigned', desc: 'Materials curated in Nordic studio', done: true },
    { label: 'Quality & Texture Inspection', desc: '100% surface check passed', done: true },
    { label: 'In Transit via Climate-Neutral Logistics', desc: 'Tracked freight with White Glove service', done: false },
    { label: 'Scheduled Delivery', desc: 'Appointment window confirmed with courier', done: false },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF9F6] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto text-stone-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-stone-900" />
            <h3 className="text-base font-serif font-bold text-stone-950">
              Shipment Tracking & Status
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order ID Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ATV-2026-8491)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900 font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Lookup
            </button>
          </form>

          {/* Active Order Details */}
          {activeOrder ? (
            <div className="space-y-6">
              {/* Top Summary Banner */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span>Order: <strong className="text-stone-900">{activeOrder.id}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Placed {activeOrder.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-950 mt-1">
                    White Glove Scheduled Delivery
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5">
                    Estimated arrival: {activeOrder.estimatedDelivery}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Tracking Number</span>
                  <span className="text-xs font-mono font-bold text-stone-900">{activeOrder.trackingNumber}</span>
                </div>
              </div>

              {/* 5-Step Timeline */}
              <div className="space-y-4 pt-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Logistics Milestones
                </h5>
                <div className="relative pl-6 space-y-6 border-l-2 border-stone-200">
                  {steps.map((s, idx) => (
                    <div key={idx} className="relative">
                      {/* Step Indicator Node */}
                      <span
                        className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                          s.done
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-stone-300'
                        }`}
                      >
                        {s.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </span>

                      <div>
                        <h6
                          className={`text-xs font-semibold ${
                            s.done ? 'text-stone-950' : 'text-stone-400'
                          }`}
                        >
                          {s.label}
                        </h6>
                        <p className="text-[11px] text-stone-500 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Address */}
              <div className="bg-stone-100/70 p-4 rounded-xl text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <MapPin className="w-3.5 h-3.5 text-stone-600" />
                  <span>Delivery Address</span>
                </div>
                <p className="text-stone-600">
                  {activeOrder.customer.fullName} · {activeOrder.customer.address}, {activeOrder.customer.city}, {activeOrder.customer.postalCode}, {activeOrder.customer.country}
                </p>
              </div>

              {/* Items in shipment */}
              <div className="border-t border-stone-200 pt-4">
                <span className="text-xs font-semibold text-stone-700 block mb-2">
                  Enclosed Objects:
                </span>
                <div className="space-y-2">
                  {activeOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs py-1.5 px-3 bg-white rounded-lg border border-stone-200/60">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.product.image}
                          alt=""
                          className="w-9 h-9 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{item.product.name}</p>
                          <p className="text-[11px] text-stone-500">{item.selectedColor.name} · Qty {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-stone-900 tabular-nums">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-10 text-stone-500 text-xs">
              <Clock className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p>No active orders recorded in this session yet.</p>
              <p className="mt-1">Place an order through the shopping bag to track real-time delivery.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
