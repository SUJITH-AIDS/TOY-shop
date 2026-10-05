import React from 'react';
import { Compass, Hammer, Sparkles, Trees } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="border-t border-stone-200/80 bg-[#F4F3EE] text-stone-900 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2 block">
            The Atelier Ethos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-950 leading-tight text-balance mb-6">
            We reject the disposable velocity of mass production in favor of objects built to outlive us.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Founded between Copenhagen and Kyoto, Atelier V collaborates directly with independent stonemasons, ceramicists, and timber joiners. Every shape is an exercise in reduction: stripping away ornamental pretense until only material integrity and quiet function remain.
          </p>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-stone-300/60">
          <div>
            <div className="w-10 h-10 rounded-lg bg-stone-200/80 flex items-center justify-center mb-4 text-stone-900">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-950 mb-2">
              FSC-Certified Hardwoods
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We exclusively source North American Walnut and White Ash from responsibly managed regenerative forests, air-seasoned and finished with natural tung oils.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-lg bg-stone-200/80 flex items-center justify-center mb-4 text-stone-900">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-950 mb-2">
              Ancient Stone & Bronze
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              From unsealed Roman travertine to sand-cast raw bronze, our materials preserve natural mineral veining and organic patina that deepens with human touch.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-lg bg-stone-200/80 flex items-center justify-center mb-4 text-stone-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-950 mb-2">
              Mouth-Blown Triplex Glass
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Each opal lighting diffuser is blown individually by master glassmiths, producing a three-layer glass sandwich that emits gentle, shadowless 2700K illumination.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-lg bg-stone-200/80 flex items-center justify-center mb-4 text-stone-900">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-950 mb-2">
              Zero-Plastic Logistics
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              All packaging consists of unbleached molded cardboard, organic cotton dust covers, and reinforced paper tapes. White-glove installation is available worldwide.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
