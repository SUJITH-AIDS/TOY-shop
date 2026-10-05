import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF9F6] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-stone-800">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-2xl font-serif font-bold tracking-tight text-white block">
              ATELIER V
            </span>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed font-light">
              An independent studio dedicated to enduring spatial objects, tactile natural materials, and quiet architectural presence. Designed for generational longevity.
            </p>
            <div className="pt-2 text-xs text-stone-400 flex flex-wrap gap-4 font-mono">
              <span>Copenhagen · Bredgade 24</span>
              <span>·</span>
              <span>Kyoto · Higashiyama</span>
              <span>·</span>
              <span>New York · Tribeca</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 flex flex-col justify-end">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-300 mb-2">
              The Seasonal Broadsheet
            </h4>
            <p className="text-xs text-stone-400 mb-4 font-light">
              Receive private invitations to preview limited edition kiln firings, timber harvests, and architectural essays.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-stone-900 border border-emerald-500/30 px-4 py-3 rounded-xl">
                <Check className="w-4 h-4" />
                <span>You have been subscribed to our seasonal collector broadsheet.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FAF9F6] text-stone-950 hover:bg-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <h5 className="font-semibold uppercase tracking-widest text-stone-300 mb-3">
              Collections
            </h5>
            <ul className="space-y-2 text-stone-400 font-light">
              <li><a href="#catalog" className="hover:text-white transition-colors">Lounge & Dining Seating</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Architectural Lighting</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Nordic Fluted Stoneware</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Hand-Cast Bronze Objects</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Limited Edition Archives</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold uppercase tracking-widest text-stone-300 mb-3">
              Studio & Provenance
            </h5>
            <ul className="space-y-2 text-stone-400 font-light">
              <li><a href="#story" className="hover:text-white transition-colors">Craft Manifesto</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">FSC Timber Verification</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Mouth-Blown Glass Studio</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Roman Travertine Quarrying</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold uppercase tracking-widest text-stone-300 mb-3">
              Client Concierge
            </h5>
            <ul className="space-y-2 text-stone-400 font-light">
              <li><a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">White-Glove Delivery</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">30-Day Architectural Trial</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">Material & Fabric Care Guides</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">Trade & Architect Program</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold uppercase tracking-widest text-stone-300 mb-3">
              Sustainability & Trust
            </h5>
            <ul className="space-y-2 text-stone-400 font-light">
              <li><span className="text-stone-300">100% Plastic-Free Freight</span></li>
              <li><span className="text-stone-300">Carbon-Neutral Delivery Partners</span></li>
              <li><span className="text-stone-300">5-Year Structural Warranty</span></li>
              <li><span className="text-stone-300">ISO 14001 Compliant Facilities</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-4">
          <p>© 2026 Atelier V Studio ApS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Commission</span>
            <span className="hover:text-stone-300 cursor-pointer">Ethics & Sourcing</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
