import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import heroImage from '../assets/images/hero_scandinavian_living_1791180838804.jpg';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Background Image Container with Measured Scrim */}
      <div className="relative min-h-[580px] lg:min-h-[680px] flex items-center">
        <img
          src={heroImage}
          alt="Sunlit architectural living room with sculpted ivory sofa and travertine table"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.82] transition-transform duration-1000 scale-[1.02]"
        />
        {/* Measured dark gradient scrim to guarantee WCAG AA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/30" />

        {/* Foreground Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            {/* Quiet Unboxed Kicker */}
            <p className="text-xs uppercase tracking-widest text-stone-300 font-medium mb-3">
              Autumn · Winter Edition 2026
            </p>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.12] mb-6 text-balance">
              Living objects shaped by architectural restraint and quiet craft.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light mb-8 max-w-xl">
              From hand-fluted Nordic ceramics to solid American walnut joinery. Each limited edition piece is crafted to bring enduring stillness to modern spaces.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#FAF9F6] text-stone-950 hover:bg-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <a
                href="#story"
                className="px-6 py-3.5 bg-stone-900/60 hover:bg-stone-900/90 text-stone-200 hover:text-white border border-stone-600/60 text-xs uppercase tracking-wider font-semibold rounded-lg backdrop-blur-sm transition-all"
              >
                The Atelier Ethos
              </a>
            </div>

            {/* Quiet Unboxed Value Props */}
            <div className="mt-12 pt-8 border-t border-stone-700/50 flex flex-wrap gap-y-3 gap-x-8 text-xs text-stone-300 font-light">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Complimentary Delivery &gt;$150</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Small Batch Editions (15-50 pcs)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0" />
                <span>30-Day Architectural Trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
