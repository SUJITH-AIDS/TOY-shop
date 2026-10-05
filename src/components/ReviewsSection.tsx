import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="bg-[#FAF9F6] py-20 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2 block">
            Collector & Architect Reflections
          </span>
          <h2 className="text-3xl font-serif text-stone-900 tracking-tight">
            Loved by spatial designers across the globe
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-stone-600 font-mono">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span><strong>4.92 / 5.0</strong> verified satisfaction from 180+ studio commissions</span>
          </div>
        </div>

        {/* 3 Attributable Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Collector</span>
                  </div>
                </div>

                <h4 className="text-base font-serif font-bold text-stone-900 mb-2">
                  &ldquo;{review.title}&rdquo;
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed italic mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-semibold text-stone-950">{review.author}</h5>
                  <p className="text-[11px] text-stone-500">{review.role} · {review.location}</p>
                </div>
                <span className="text-[10px] font-mono text-stone-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
